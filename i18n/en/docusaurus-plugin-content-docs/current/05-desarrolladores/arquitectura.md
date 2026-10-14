---
title: NOPAL architecture
sidebar_label: Architecture
sidebar_position: 1
audience: developer
type: explanation
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
source_commit: "4346f72"
---

# NOPAL architecture

This page explains how the NOPAL core is built and why. It describes what **exists today**; future ideas are in [RFC](../07-rfc).

## Overview

```text
Browser ── HTTP ──► FastAPI (uvicorn, port 8420)
                      ├─ backend/api/*.py        thin routers
                      ├─ backend/services/*.py   logic, persistence and I/O
                      ├─ plugins/<id>/backend    plugin routers (dynamic loading)
                      └─ JSON files              state, no database
                            │
Machines ◄── HTTP / WS / MQTT / serial / TCP ─────┘
```

- **Backend:** Python with FastAPI and Uvicorn.
- **Frontend:** a single page served by Jinja2 (`backend/templates/index.html`), JavaScript with no build step (`backend/static/js/app.js`) and one stylesheet. Three.js, bundled in the repository, draws the 3D and G-code previews.
- **Persistence:** JSON files in the working directory. No external database. Documentation of each state file is pending in [Reference](../06-referencia/index.md).
- **No bundler or linter** in the repository.

## Entry point

`backend/main.py` is the real application: it creates the FastAPI instance and the session middleware, registers the routers and defines the startup events:

| On startup | What it does |
|---|---|
| Configure logging | Applies `logging_config_service.apply_config()` first of all |
| Load plugins | `load_installed_plugin_routers(app)`: imports and registers the backend of installed, enabled plugins |
| Capture the event loop | So serial reader threads can forward data safely |
| Scheduled prints | A loop checks every 30 seconds whether any has reached its time |

It also mounts `/static` and `/plugins-static` (see [Security](../02-administracion/seguridad.md)) and serves `/uploads/...` only to authenticated users.

:::caution Empty files
`backend/app.py`, `backend/routes.py` and `backend/database.py` are empty on purpose. Do not add code there or import them expecting content.
:::

## `api/` and `services/` pairs

Each functional area is a pair:

- `backend/api/<name>.py`: a **thin** `APIRouter` that receives the request and returns the response.
- `backend/services/<name>_service.py`: the **business logic**, persistence and external I/O.

For anything new, follow this separation instead of putting logic in the router.

## Printer brands are parallel modules

Klipper, Marlin, Bambu Lab, Elegoo and FlashForge **do not share an abstraction**. Each has its own service, router and `*_registry.json`. This is deliberate: their transport is fundamentally different.

| Family | Service | Transport |
|---|---|---|
| Klipper / Moonraker | `klipper_service.py` | HTTP REST, with periodic polling |
| Standalone Marlin | `marlin_printer_service.py`, `marlin_driver.py` | USB serial, or the TCP bridge of an MKS WiFi module (`mks_wifi_transport.py`) |
| Bambu Lab | `bambu_service.py` | MQTT over TLS (`paho-mqtt`), on its own threads, not asyncio |
| Elegoo | `elegoo_service.py` | SDCP over a persistent WebSocket connection; the printer pushes its status |
| FlashForge | `flashforge_service.py` | HTTP request/response, no persistent connection |
| GRBL laser/CNC | `laser_service.py` | HTTP + WebSocket (network) and serial (USB), each machine with its own connection and state |

**When adding or touching a brand, respect the transport pattern it already uses**, instead of trying to unify them. Status codes observed on real hardware are documented in each service's docstring, and unmapped values fall back to `"unknown"` instead of being guessed.

`printer_profiles.py` is a static catalog of per-model capabilities (volume, board variants, extruders): metadata for the interface, not live state.

### Machine identity

Lasers/CNC and Marlin printers have a stable internal identifier. They are found again by their **USB location** (bus-hub-port topology) or their **MAC address**, not by `/dev/ttyUSBx` or IP, which change. `machine_identity.py` handles it, with a migration in `machine_identity_migration.py`.

## Authentication and authorization

Two mechanisms coexist:

1. **Direct roles:** `require_auth` and `require_role("admin")` (`backend/auth_deps.py`) as FastAPI dependencies.
2. **Authorization Policy (ADR-006):** `authorize(principal, action, resource)` in `backend/services/authorization_policy.py`, applied with `ensure_authorized`. It denies by default anything it does not recognize.

The policy implements a **target** matrix; real behavior follows the current state until each route migrates. Per-route detail is in the [API reference](../06-referencia/api-rest-core.md).

## Frontend

- A single `index.html` and `app.js` in plain JavaScript.
- **Themes:** a class on `<body>` (`dark`, `green`, `red`, `custom`; light is the absence of a class) redefines a fixed set of CSS variables. The design system is in `NOPAL_DESIGN_SYSTEM_v1.md`, in the core repository.
- **Languages:** `translations.js` holds Spanish and English; `translations-de.js`, `translations-fr.js` and `translations-pt-BR.js` are **regenerated** with `scripts/generate_i18n.py`.
- Plugins add their interface at run time; see [Plugins: frontend](./plugins-frontend.md).

## Conventions

- User-facing text, code comments and log messages are in **Mexican Spanish**. Identifiers (variables, functions) are in English.
- Modules with a `REGISTRY_PATH`-style constant backed by a file must be **redirected to a temporary directory in tests**. See [Environment and tests](./entorno-y-pruebas.md).

## What does not exist

- A common «printer» abstraction across brands.
- An event API between the core and plugins (see [RFC](../07-rfc)).
- A database. The design chooses JSON files.
