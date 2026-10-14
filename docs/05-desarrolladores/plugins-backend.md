---
title: "Sistema de plugins: backend"
sidebar_label: "Plugins: backend"
sidebar_position: 4
audience: developer
type: reference
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
---

# Sistema de plugins: backend

El backend de un plugin es un módulo de Python que expone un `APIRouter`. El core lo importa al arrancar y lo registra en la aplicación.

## Contrato

1. El manifiesto declara `backend.entry`, por ejemplo `"backend/router.py"`.
2. Ese archivo define una **variable de módulo llamada `router`** (un `fastapi.APIRouter`).
3. El plugin declara en `router` sus **rutas completas**.

```python
# backend/router.py
from fastapi import APIRouter, Depends

from backend.auth_deps import require_auth, require_role

router = APIRouter()


@router.get("/api/mi-plugin/estado")
async def estado(user: dict = Depends(require_auth)):
    return {"ok": True}


@router.post("/api/mi-plugin/ajustes")
async def guardar_ajustes(user: dict = Depends(require_role("admin"))):
    return {"ok": True}
```

:::note Ejemplo ilustrativo
El ejemplo muestra la forma mínima del contrato. No es un plugin publicado.
:::

## Cómo lo carga el core

En el evento de arranque de `backend/main.py`, `load_installed_plugin_routers(app)` recorre los plugins instalados y habilitados (`data/plugins/installed.json`) y, por cada uno:

1. Lee su manifiesto. Si no es legible, lo omite con un aviso.
2. Resuelve `backend.entry` y comprueba que quede **dentro de la carpeta del plugin**. Si apunta fuera, lo omite.
3. Registra la carpeta `backend/` como un **paquete de Python** con el nombre `nopal_plugins.<id>` (los guiones del id pasan a guiones bajos). Por eso funcionan los **imports relativos** dentro del plugin: `from .services.mi_servicio import ...`.
4. Importa el módulo de entrada y toma su variable `router`. Si no existe, lo omite con un aviso.
5. Llama a `app.include_router(router)`.

**Un plugin roto nunca impide que NOPAL arranque.** Un manifiesto inválido, un punto de entrada ausente o una excepción al importar se registran como aviso con el id entre corchetes, y se sigue con el resto.

:::warning El backend solo se carga al arrancar
El backend de un plugin **se importa una vez, al iniciar NOPAL**. Instalar, habilitar o actualizar un plugin con backend no lo activa hasta reiniciar NOPAL. La interfaz sí se carga al momento. Cuando una actualización cambia `backend/`, NOPAL muestra un aviso para reiniciar.
:::

## Rutas: reglas y riesgos

- **No hay prefijo común.** Cada router declara sus rutas completas. Los oficiales usan `/api/plugins/matriz-led`, `/api/accessories`, `/api/cameras`, `/api/pricing` y `/api/spoolman`.
- **Nada impide colisiones.** Los plugins se registran después de los routers del core: dos rutas iguales se resuelven por orden de registro. Elige un prefijo propio y claro.
- El prefijo `/api/plugins` lo usa también el router de la Galería del core (`GET /api/plugins`, `POST /api/plugins/{id}/install`…). Evita rutas que puedan confundirse con ellas.

## Autenticación y roles

Usa las mismas dependencias que el core, con **import absoluto**:

| Dependencia | Efecto |
|---|---|
| `require_auth` | Exige sesión (administrador u operador) |
| `require_role("admin")` | Exige el rol de administrador |

Los plugins oficiales importan `backend.auth_deps`. Es un acoplamiento duro e intencional con el core.

Una ruta pensada para que la llame **firmware** (sin cookies) puede autenticarse con otro mecanismo, como el token compartido en cabecera que usa `arduino-accessories` en `POST /api/accessories/cluster/event`.

## Tareas en segundo plano

El core **no ofrece una API para que un plugin registre tareas periódicas**. Los únicos bucles de fondo son los propios del core (por ejemplo, las impresiones programadas). `matriz-led`, por ejemplo, lo resuelve sondeando desde el navegador, por lo que algunas de sus funciones requieren que el panel esté abierto en alguna pestaña; su README lo señala como limitación.

## Dependencias de Python

**No existe un mecanismo de dependencias por plugin.** NOPAL no instala nada desde el plugin. Si tu plugin necesita una biblioteca, el usuario debe instalarla a mano en el entorno de NOPAL (como `pypixelcolor` en `matriz-led`). Documéntalo en el README de tu plugin.

## Estado y archivos

El plugin guarda su estado con sus propias rutas. Los oficiales usan dos convenciones distintas: archivos JSON en la raíz de la instalación (`camera_registry.json`) o bajo `data/` (`data/plugins/matriz-led/…`, `data/accessories/…`). No hay una regla; elige una y documéntala.

## Ejemplo de estructura con servicios

```text
backend/
├── __init__.py            opcional; si existe, se ejecuta como paquete
├── router.py              define `router`
└── services/
    └── mi_servicio.py     importado como `from .services.mi_servicio import ...`
```
