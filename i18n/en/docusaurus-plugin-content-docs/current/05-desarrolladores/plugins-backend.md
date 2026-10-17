---
title: "Plugin system: backend"
sidebar_label: "Plugins: backend"
sidebar_position: 4
audience: developer
type: reference
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
source_commit: "a5853dc"
---

# Plugin system: backend

A plugin's backend is a Python module that exposes an `APIRouter`. The core imports it at startup and registers it in the application.

## Contract

1. The manifest declares `backend.entry`, for example `"backend/router.py"`.
2. That file defines a **module-level variable named `router`** (a `fastapi.APIRouter`).
3. The plugin declares its **full routes** on `router`.

```python
# backend/router.py
from fastapi import APIRouter, Depends

from backend.auth_deps import require_auth, require_role

router = APIRouter()


@router.get("/api/my-plugin/status")
async def status(user: dict = Depends(require_auth)):
    return {"ok": True}


@router.post("/api/my-plugin/settings")
async def save_settings(user: dict = Depends(require_role("admin"))):
    return {"ok": True}
```

:::note Illustrative example
The example shows the minimal shape of the contract. It is not a published plugin.
:::

## How the core loads it

In the startup event of `backend/main.py`, `load_installed_plugin_routers(app)` walks the installed, enabled plugins (`data/plugins/installed.json`) and, for each one:

1. Reads its manifest. If it is unreadable, skips it with a warning.
2. Resolves `backend.entry` and checks it stays **inside the plugin's folder**. If it points outside, skips it.
3. Registers the `backend/` folder as a **Python package** named `nopal_plugins.<id>` (hyphens in the id become underscores). That is why **relative imports** work inside the plugin: `from .services.my_service import ...`.
4. Imports the entry module and takes its `router` variable. If it does not exist, skips it with a warning.
5. Calls `app.include_router(router)`.

**A broken plugin never prevents NOPAL from starting.** An invalid manifest, a missing entry point or an exception on import are logged as a warning with the id in brackets, and the rest carries on.

:::warning The backend is only loaded at startup
A plugin's backend is imported **once, when NOPAL starts**. Installing, enabling or updating a plugin with a backend does not activate it until NOPAL is restarted. The interface does load immediately. When an update changes `backend/`, NOPAL shows a warning to restart.
:::

## Routes: rules and risks

- **There is no common prefix.** Each router declares its full routes. The official ones use `/api/plugins/matriz-led`, `/api/accessories`, `/api/cameras`, `/api/pricing` and `/api/spoolman`.
- **Nothing prevents collisions.** Plugins are registered after the core's routers: two identical routes are resolved by registration order. Choose a clear prefix of your own.
- The `/api/plugins` prefix is also used by the core's Gallery router (`GET /api/plugins`, `POST /api/plugins/{id}/install`…). Avoid routes that could be confused with them.

## Authentication and roles

Use the same dependencies as the core, with **absolute imports**:

| Dependency | Effect |
|---|---|
| `require_auth` | Requires a session (administrator or operator) |
| `require_role("admin")` | Requires the administrator role |

The official plugins import `backend.auth_deps`. It is a hard, intentional coupling with the core.

A route meant to be called by **firmware** (no cookies) can authenticate with another mechanism, such as the shared header token that `arduino-accessories` uses on `POST /api/accessories/cluster/event`.

## Background tasks

The core **does not offer an API to register periodic tasks**, but it does offer **optional lifecycle hooks**. If the backend entry module defines `on_startup()` or `on_shutdown()` (sync or `async`), the core calls them:

| Hook | When it is called |
|---|---|
| `on_startup()` | When NOPAL starts, after the plugins are loaded |
| `on_shutdown()` | When NOPAL stops, in reverse load order |

- Each hook has a **5-second** limit: if it takes longer, the core logs a warning and carries on without waiting.
- A hook that fails **never prevents** NOPAL from starting or other plugins from loading; the error goes to the log.
- They are optional, like `router` and `AI_TOOLS`.

With `on_startup()` a plugin can launch its own background task. This is what `matriz-led` uses to update the FK-8Wa panel without NOPAL needing to be open in a browser. The core's own background loops, such as scheduled prints, are independent of this mechanism.

## Python dependencies

**There is no per-plugin dependency mechanism.** NOPAL installs nothing from the plugin. If your plugin needs a library, the user must install it by hand in NOPAL's environment (like `pypixelcolor` in `matriz-led`). Document it in your plugin's README.

## State and files

The plugin stores its state at its own paths. The official ones use two different conventions: JSON files at the installation root (`camera_registry.json`) or under `data/` (`data/plugins/matriz-led/…`, `data/accessories/…`). There is no rule; pick one and document it.

## Example structure with services

```text
backend/
├── __init__.py            optional; if present, it is executed as the package
├── router.py              defines `router`
└── services/
    └── my_service.py      imported as `from .services.my_service import ...`
```
