#!/usr/bin/env python3
"""Extrae el inventario de rutas de NOPAL y de sus plugins por análisis estático (AST).

No importa ni ejecuta el código auditado. Solo usa la biblioteca estándar.

Uso:
    python -I scripts/extract_routes.py <directorio-de-fuentes> <salida.json>

El directorio de fuentes contiene un checkout por repositorio (`nopal`, `matriz-led`,
`nopal-plugin-*`). El alcance (rutas y archivos excluidos) sale de `scripts/data/scope.json`.

Límite conocido: no ve comprobaciones de rol hechas dentro del cuerpo de una función ni
cambios dinámicos. Lo detectado crudo queda en `raw_auth` para poder revisarlo.
"""
import ast
import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

METHODS = {"get", "post", "put", "delete", "patch", "websocket"}
HERE = Path(__file__).resolve().parent


def git(repo: Path, *args: str) -> str:
    try:
        return subprocess.run(
            ["git", "-C", str(repo), *args], capture_output=True, text=True, check=True
        ).stdout.strip()
    except Exception:
        return ""


def auth_of(fn: ast.AST) -> list:
    """Mecanismos de acceso detectados en la firma y el cuerpo de una ruta."""
    found = set()
    defaults = list(fn.args.defaults) + [d for d in fn.args.kw_defaults if d is not None]
    for d in defaults:
        s = ast.unparse(d)
        if "require_role" in s:
            m = re.search(r"require_role\(['\"](\w+)['\"]\)", s)
            found.add("role:" + (m.group(1) if m else "?"))
        elif "require_device_token" in s:
            found.add("device-token")
        elif "require_auth" in s:
            found.add("auth")
        elif "Depends" in s:
            found.add(s)
    body = ast.unparse(fn)
    for m in re.finditer(r"ensure_authorized\([^,]+,\s*([\w\.]+)", body):
        found.add("policy:" + m.group(1))
    if "require_role(" in body and not any(x.startswith("role:") for x in found):
        m = re.search(r"require_role\(['\"](\w+)['\"]\)", body)
        if m:
            found.add("role:" + m.group(1))
    return sorted(found)


def access_of(raw: list) -> str:
    if not raw:
        return "public"
    if any(x == "role:admin" for x in raw):
        return "admin"
    if "device-token" in raw:
        return "device"
    return "session"


def router_prefix(tree: ast.AST) -> str:
    """Prefijo de `router = APIRouter(prefix=...)` a nivel de módulo (vacío si no hay)."""
    for node in getattr(tree, 'body', []):
        if (
            isinstance(node, ast.Assign)
            and isinstance(node.value, ast.Call)
            and getattr(node.value.func, 'id', None) == 'APIRouter'
        ):
            for kw in node.value.keywords:
                if kw.arg == 'prefix' and isinstance(kw.value, ast.Constant):
                    return str(kw.value.value)
    return ''


def scan_file(repo: str, root: Path, pyfile: Path, rows: list) -> None:
    try:
        tree = ast.parse(pyfile.read_text(encoding="utf-8"))
    except Exception as e:  # archivo ilegible: se informa, no se aborta
        print(f"AVISO no se pudo analizar {pyfile}: {e}", file=sys.stderr)
        return
    prefix = router_prefix(tree)
    for fn in ast.walk(tree):
        if not isinstance(fn, (ast.FunctionDef, ast.AsyncFunctionDef)):
            continue
        for dec in fn.decorator_list:
            if not (
                isinstance(dec, ast.Call)
                and isinstance(dec.func, ast.Attribute)
                and dec.func.attr in METHODS
                and dec.args
            ):
                continue
            arg = dec.args[0]
            path = arg.value if isinstance(arg, ast.Constant) else ast.unparse(arg)
            path = prefix + path
            doc = (ast.get_docstring(fn) or "").strip().split("\n\n")[0].replace("\n", " ")
            raw = auth_of(fn)
            rows.append(
                {
                    "repo": repo,
                    "file": pyfile.relative_to(root).as_posix(),
                    "method": dec.func.attr.upper(),
                    "path": path,
                    "function": fn.name,
                    "summary": re.sub(r"\s+", " ", doc),
                    "access": access_of(raw),
                    "policy": [x[7:] for x in raw if x.startswith("policy:")],
                    "raw_auth": raw,
                }
            )


def main() -> int:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    include_all = "--all" in sys.argv  # solo para auditoría interna: no aplica exclusiones de alcance
    if len(args) != 2:
        print(__doc__)
        return 2
    sources = Path(args[0]).resolve()
    out = Path(args[1])
    scope = json.loads((HERE / "data" / "scope.json").read_text(encoding="utf-8"))
    forbidden = set(scope["forbidden_token_hashes"])

    def is_excluded(text: str) -> bool:
        toks = re.split(r"[^a-z0-9]+", text.lower())
        return any(hashlib.sha256(t.encode()).hexdigest() in forbidden for t in toks if t)

    rows: list = []
    repos: dict = {}
    for repo_dir in sorted(p for p in sources.iterdir() if p.is_dir()):
        name = repo_dir.name
        if name not in scope["included_repos"]:
            continue
        repos[name] = {
            "commit": git(repo_dir, "rev-parse", "--short", "HEAD"),
            "date": git(repo_dir, "log", "-1", "--format=%cs"),
        }
        backend = repo_dir / "backend"
        if not backend.exists():
            continue
        if name == "nopal":
            files = list((backend / "api").glob("*.py")) + [backend / "main.py"]
        else:
            files = list(backend.rglob("*.py"))
        for f in sorted(files):
            if "tests" in f.parts or "__pycache__" in f.parts:
                continue
            if name == "nopal" and is_excluded(f.name) and not include_all:
                continue
            scan_file(name, repo_dir, f, rows)

    if not include_all:
        rows = [r for r in rows if not is_excluded(r["path"])]
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(
        json.dumps({"repos": repos, "routes": rows}, ensure_ascii=False, indent=1),
        encoding="utf-8",
    )
    print(f"{len(rows)} rutas (alcance aplicado: scripts/data/scope.json) en {out}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
