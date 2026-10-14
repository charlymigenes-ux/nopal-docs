from fastapi import APIRouter, Depends

from backend.auth_deps import require_auth, require_role

router = APIRouter()


@router.get("/api/hello-nopal/saludo")
async def saludo(user: dict = Depends(require_auth)):
    """Cualquier usuario con sesión (administrador u operador)."""
    return {"mensaje": "Hola NOPAL", "usuario": user["username"], "rol": user["role"]}


@router.post("/api/hello-nopal/eco")
async def eco(texto: str, user: dict = Depends(require_role("admin"))):
    """Solo administradores."""
    return {"eco": texto}
