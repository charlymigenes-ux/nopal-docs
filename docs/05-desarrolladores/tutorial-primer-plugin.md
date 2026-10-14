---
title: "Tutorial: tu primer plugin (Hola NOPAL)"
sidebar_label: "Tutorial: primer plugin"
sidebar_position: 9
audience: developer
type: tutorial
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
---

# Tutorial: tu primer plugin (Hola NOPAL)

En este tutorial creas un plugin mínimo que añade una sección a NOPAL con un botón. Al pulsarlo, el plugin llama a su propio backend y muestra quién eres. Pasas por todo el contrato: manifiesto, backend, frontend, pruebas e instalación.

:::info Qué está probado y qué no
- **Pasos 1 a 5: probados.** El backend se ejecutó con el **cargador real** de NOPAL (`nopal@4346f72`) y sus dos pruebas pasan. El frontend se ejecutó en un navegador, en una página de prueba que imita los puntos de enlace del core (menú, `.content`, `switchSection`).
- **Paso 6 (instalarlo en un NOPAL real): no probado.** No se ejecutó la aplicación completa. Los pasos salen de leer el código del instalador, el cargador y la Galería. Si algo no coincide, es un defecto de esta página: repórtalo.
- La prueba se hizo con Python 3.14. NOPAL admite Python 3.9 o superior; el ejemplo no usa nada que requiera una versión nueva, pero no se ejecutó en 3.9.
:::

## Antes de empezar

Necesitas:

- Un **checkout del core** de NOPAL. Ver [Entorno y pruebas](./entorno-y-pruebas.md).
- **Python** con `pytest`, `fastapi` y `httpx` (los trae `requirements-dev.txt` del core).
- Un editor de texto.

El código completo de este tutorial está en el repositorio de la documentación, en `examples/hello-nopal/`.

## 1. Estructura

Crea esta carpeta. **El nombre de la carpeta debe ser igual al `id` del plugin**, porque NOPAL la busca en `plugins/<id>/`.

```text
hello-nopal/
├── nopal-plugin.json
├── backend/
│   └── router.py
├── frontend/
│   ├── hello-nopal.js
│   └── hello-nopal.css
└── tests/
    └── test_router.py
```

## 2. El manifiesto

```json title="nopal-plugin.json"
{
  "schema_version": 1,
  "id": "hello-nopal",
  "name": "Hola NOPAL",
  "version": "0.1.0",
  "publisher": "Tu nombre",
  "category": "Herramientas",
  "description": "Plugin de ejemplo: muestra un saludo y quién lo está viendo.",
  "permissions": [],
  "compatibility": ["Impresión 3D", "Láser", "CNC"],
  "frontend": {
    "script": "frontend/hello-nopal.js",
    "style": "frontend/hello-nopal.css",
    "section": "hello-nopal"
  },
  "backend": {
    "entry": "backend/router.py"
  }
}
```

De todos estos campos, el core solo lee `version`, `backend.entry`, `frontend.script` y `frontend.style`. El resto es descriptivo. Ver [el manifiesto](./plugins-manifiesto.md).

## 3. El backend

```python title="backend/router.py"
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
```

Puntos clave:

- La variable se llama **`router`**: el cargador la busca por ese nombre.
- Las rutas son **completas** y llevan un prefijo propio (`/api/hello-nopal/`).
- `require_auth` exige sesión; `require_role("admin")` exige el rol de administrador. Se importan del core con una ruta absoluta.

## 4. El frontend

```javascript title="frontend/hello-nopal.js"
(() => {
    const PLUGIN_ID = 'hello-nopal';
    if (window.NopalPluginRegistry?.[PLUGIN_ID]) return;

    const I18N = {
        es: { nav: 'Hola NOPAL', title: 'Hola NOPAL', button: 'Saludar', error: 'No se pudo obtener el saludo' },
        en: { nav: 'Hello NOPAL', title: 'Hello NOPAL', button: 'Say hello', error: 'Could not get the greeting' },
    };

    function lang() {
        const value = String(document.documentElement.lang || localStorage.getItem('language') || 'es').toLowerCase();
        return I18N[value] ? value : 'en';
    }

    function tr(key) {
        return I18N[lang()][key];
    }

    function mount() {
        if (document.getElementById('hello-nopal-section')) return;

        const navContainer = document.querySelector('.nav-category[data-group="plugins"] .nav-category-items');
        const navButton = document.createElement('button');
        navButton.type = 'button';
        navButton.className = 'nav-item';
        navButton.dataset.section = PLUGIN_ID;
        navButton.dataset.pluginNav = PLUGIN_ID;
        navButton.innerHTML = `<span>${tr('nav')}</span>`;
        navButton.addEventListener('click', () => window.switchSection?.(PLUGIN_ID));
        navContainer?.appendChild(navButton);

        const section = document.createElement('section');
        section.id = 'hello-nopal-section';
        section.className = 'content-section hn-section';
        section.innerHTML = `
            <h1>${tr('title')}</h1>
            <button type="button" class="hn-button">${tr('button')}</button>
            <p class="hn-output" aria-live="polite"></p>`;
        section.querySelector('.hn-button').addEventListener('click', saludar);
        document.querySelector('.content')?.appendChild(section);

        window.applySidebarOrder?.();
    }

    async function saludar() {
        const output = document.querySelector('#hello-nopal-section .hn-output');
        try {
            const response = await fetch('/api/hello-nopal/saludo');
            if (!response.ok) throw new Error(String(response.status));
            const data = await response.json();
            output.textContent = `${data.mensaje}, ${data.usuario} (${data.rol})`;
        } catch (error) {
            window.showToast?.(tr('error'), 'error');
        }
    }

    function unmount() {
        document.querySelector(`[data-plugin-nav="${PLUGIN_ID}"]`)?.remove();
        document.getElementById('hello-nopal-section')?.remove();
    }

    window.NopalPluginRegistry = window.NopalPluginRegistry || {};
    window.NopalPluginRegistry[PLUGIN_ID] = { mount, unmount, version: '0.1.0' };
    mount();
})();
```

```css title="frontend/hello-nopal.css"
.hn-section {
    padding: 24px;
}

.hn-section .hn-button {
    padding: 8px 16px;
    cursor: pointer;
}

.hn-section .hn-output {
    margin-top: 16px;
    font-size: 1.1rem;
}
```

Puntos clave:

- El script es una **función que se ejecuta al cargarse** y **termina llamando a `mount()`**: el core no la llama por ti.
- La guardia del principio evita registrar el plugin dos veces.
- `mount()` crea el botón del menú en la categoría de plugins y la sección dentro de `.content`.
- `unmount()` deshace **todo** lo que hizo `mount()`. El core lo llama al desinstalar.
- Las funciones `window.switchSection`, `window.applySidebarOrder` y `window.showToast` son internas del core. Se usan con `?.` por si cambian. Ver [frontend](./plugins-frontend.md).
- Las clases llevan el prefijo `hn-` para no chocar con otras.

## 5. Probar el backend

```python title="tests/test_router.py"
"""Prueba del plugin con el cargador REAL de NOPAL.

Necesita un checkout del core: indica dónde está con NOPAL_CORE_ROOT.
"""
import json
import os
import shutil
import sys
from pathlib import Path

import pytest

CORE = Path(os.environ["NOPAL_CORE_ROOT"])
sys.path.insert(0, str(CORE))

from fastapi import FastAPI
from fastapi.testclient import TestClient

import backend.services.plugin_installer_service as installer
import backend.services.plugin_loader_service as loader
from backend.auth_deps import require_auth

PLUGIN_ROOT = Path(__file__).resolve().parents[1]
ADMIN = {"user_id": "t-admin", "username": "ana", "role": "admin"}
OPERADOR = {"user_id": "t-op", "username": "beto", "role": "operador"}


@pytest.fixture
def app(tmp_path, monkeypatch):
    plugins = tmp_path / "plugins"
    plugins.mkdir()
    shutil.copytree(PLUGIN_ROOT, plugins / "hello-nopal", ignore=shutil.ignore_patterns("tests", "__pycache__"))
    monkeypatch.setattr(installer, "PLUGINS_DIR", plugins)
    monkeypatch.setattr(installer, "PLUGIN_DATA_DIR", tmp_path)
    monkeypatch.setattr(installer, "INSTALLED_FILE", tmp_path / "installed.json")
    installer.write_installed_state({"hello-nopal": {"version": "0.1.0", "enabled": True, "installed_at": "now"}})

    application = FastAPI()
    loader.load_installed_plugin_routers(application)  # el mismo camino que el arranque
    return application


def como(app, usuario):
    app.dependency_overrides[require_auth] = lambda: usuario
    return TestClient(app)


def test_saludo_para_cualquier_usuario(app):
    respuesta = como(app, OPERADOR).get("/api/hello-nopal/saludo")
    assert respuesta.status_code == 200
    assert respuesta.json() == {"mensaje": "Hola NOPAL", "usuario": "beto", "rol": "operador"}


def test_eco_solo_para_administradores(app):
    assert como(app, OPERADOR).post("/api/hello-nopal/eco", params={"texto": "x"}).status_code == 403
    admin = como(app, ADMIN).post("/api/hello-nopal/eco", params={"texto": "hola"})
    assert admin.status_code == 200 and admin.json() == {"eco": "hola"}
```

La prueba copia tu plugin a una carpeta temporal, lo marca como instalado y llama a **`load_installed_plugin_routers`**, la misma función que NOPAL ejecuta al arrancar. Sustituye `require_auth` para simular un usuario con rol de operador y otro de administrador, sin sesiones reales.

Ejecútala desde la carpeta del plugin:

```bash
export NOPAL_CORE_ROOT=/ruta/al/checkout/de/nopal
```

```bash
pytest tests
```

**Comprueba:** `2 passed`.

## 6. Instalarlo en tu NOPAL

:::warning Paso no probado en una instalación real
Ver el aviso del principio. Hazlo en una instalación de pruebas, no en la que usas a diario.
:::

Hoy no hay un mecanismo de publicación para terceros, así que se instala **a mano**.

1. **Copia la carpeta** `hello-nopal` a `plugins/hello-nopal/`, dentro de la carpeta de NOPAL.

2. **Márcalo como instalado.** Crea o edita `data/plugins/installed.json`:

```json
{
  "hello-nopal": {
    "version": "0.1.0",
    "enabled": true,
    "installed_at": "2026-01-01T00:00:00+00:00"
  }
}
```

3. **Añade una entrada temporal al catálogo.** La interfaz del plugin solo se reparte a los plugins que figuran en `backend/plugin_catalog.json`. Añade este objeto a la lista, copiando los campos de una entrada existente (usa una categoría que ya exista):

```json
{
  "id": "hello-nopal",
  "name": "Hola NOPAL",
  "version": "0.1.0",
  "publisher": "Tu nombre",
  "category": "Producción",
  "description": "Plugin de ejemplo.",
  "long_description": "Plugin de ejemplo que muestra un saludo.",
  "icon": "grid",
  "accent": "#22c55e",
  "compatibility": ["Impresión 3D", "Láser", "CNC"],
  "permissions": [],
  "size": "Por definir",
  "featured": false,
  "availability": "available",
  "pricing": { "type": "free" },
  "repo_url": ""
}
```

:::caution No lo subas
`plugin_catalog.json` es un archivo versionado del core. Mientras tengas este cambio local, la **actualización automática de NOPAL se bloqueará** ("Hay cambios locales sin guardar en el servidor"). Quítalo al terminar.
:::

4. **Reinicia NOPAL.** El backend del plugin solo se carga al arrancar:

```bash
sudo systemctl restart nopal
```

5. **Pruébalo.** Entra en NOPAL, busca **Hola NOPAL** en el menú de plugins y pulsa **Saludar**. Debes ver:

```text
Hola NOPAL, <tu usuario> (admin)
```

### Quitarlo

1. Borra `plugins/hello-nopal/`.
2. Borra su entrada de `data/plugins/installed.json`.
3. Borra la entrada añadida en `backend/plugin_catalog.json`.
4. Reinicia NOPAL.

## 7. Qué has aprendido y qué falta

Has recorrido el contrato completo: un manifiesto, un `router`, un script que se monta solo y una prueba contra el cargador real.

Lo que este plugin **no** hace, y que hoy no existe en NOPAL:

- No declara dependencias de Python: NOPAL no instala nada desde un plugin.
- Sus permisos no se aplican: el manifiesto es informativo.
- No puede publicarse en la Galería sin un cambio en el catálogo del core.
- No recibe eventos del core: no hay bus de eventos.

Esas ideas están en [RFC](/07-rfc). Para ver plugins reales, consulta las [fichas de los plugins oficiales](../03-plugins/index.md).
