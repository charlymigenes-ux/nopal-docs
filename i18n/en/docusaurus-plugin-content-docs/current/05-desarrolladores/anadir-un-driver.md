---
title: Add a driver
sidebar_label: Add a driver
sidebar_position: 8
audience: developer
type: how-to
status: convention
verified_against: "nopal@a5853dc (2026-10-17)"
source_commit: "a5853dc"
---

# Add a driver

A **driver** is the code that talks to a family of machines: Klipper, Marlin, Bambu Lab, Elegoo, FlashForge or GRBL. This guide describes how the current ones are built, so you can propose a new one.

:::caution Convention, not contract
NOPAL has **no common interface** and no stable API for third-party drivers. Drivers are function modules, not interchangeable classes, and they are added **to the core itself** through a *pull request* (see [Contributing](./contribuir)). What follows describes what the existing drivers do today; it may change.
:::

For an extension that is not a machine family (a display, a sensor, a tool), the right choice is a [plugin](./plugins-manifiesto).

## Principles

They come from the core's design document (SDD) and can be seen in the code:

| Principle | What it means for a driver |
|---|---|
| **One driver per protocol, independent of each other** | No common transport is forced. No driver imports another; the exception is `marlin_driver`, a deliberately shared protocol |
| **Router and service separated** | The router receives and responds; the logic and I/O live in the service |
| **Observed data, never invented** | An unknown value is `null` or `"unknown"`, not a guess |
| **Capabilities declared, not inferred** | What the machine does not support is not advertised |
| **Testable without hardware** | Simulated transports and isolated registries in tests |
| **Incremental evolution** | A change does not break a route the interface already uses |

## The two pieces

Each network family has a service and a router:

| Piece | Example (FlashForge) | What it contains |
|---|---|---|
| **Service** | `backend/services/flashforge_service.py` | The connection with the machine, its registry (`REGISTRY_PATH`), registration and removal, network scan, connection test and commands (pause, resume, cancel, send G-code) |
| **Router** | `backend/api/flashforge_printers.py` | The `/api/flashforge/printers` and its sub-routes routes. It validates and calls the service |

A service offers, at least, functions such as `get_registered_printers_with_status`, `register_printer`, `unregister_printer`, `scan_network`, `test_connection`, `pause_printer`, `resume_printer`, `cancel_printer` and `send_gcode_to_printer`. The exact names vary with what the family allows.

## Router rules

- **Permissions.** Listing is `require_auth`. Discovering, registering and removing are `require_role("admin")`. See [Roles by action](../06-referencia/roles-por-accion).
- **Inputs.** Validate the address with `validate_printer_ip` and the name with `sanitize_device_name`, from `backend/utils.py`, before using them.
- **Secrets.** Do not return credentials in responses (for example, FlashForge's `check_code` is filtered out of registration and listing).
- **Registration errors.** Raise `PrinterRegistrationError(code, message)`. It is an `HTTPException(400)` with a structured `error_code` in addition to the usual `detail`, which the guided wizard uses to word the message.

| `error_code` | When |
|---|---|
| `IP_INVALID` | The address is not valid |
| `CREDENTIAL_REJECTED` | The machine rejected the credentials |
| `SERVICE_REFUSED` | The machine refused the connection to the service |
| `CONNECTION_FAILED` | There was no connection |
| `PROTOCOL_INVALID` | The response does not have the expected format |
| `UNKNOWN` | Any other case |

There are no finer codes on purpose: "port blocked" and "device off" produce the same timeout and cannot be told apart without inventing a signal.

## Touch points with the rest of the core

A new driver does not live only in its service and router. Look at where `flashforge` appears in the code and you will have the list:

| Where | What to do |
|---|---|
| `backend/main.py` | Import the router and register it with `app.include_router` |
| `backend/services/dashboard_service.py` | Include the machines in the dashboard summary |
| `backend/services/ai_tools.py` | Include them in what NOPAL Intelligence can query |
| `backend/services/config_backup_service.py` | Add the registry file to a group of the [backups](../02-administracion/respaldos) |
| `backend/services/job_control_service.py` | Add its `REGISTRY_PATH` for the [job history](../01-usuario/historial-de-trabajos), and call `record_print_sent` when sending a job |
| `backend/services/logging_config_service.py` | Declare the module as a log source |
| `backend/services/printer_profiles.py` | Describe the models (brand, firmware family) |
| Interface | A section in `index.html`, logic in `app.js`, the wizard (`guided-printer-setup.js`), the texts in `translations.js` and the styles |

Interface texts go in Spanish and English; Portuguese (Brazil), French and German are generated with `scripts/generate_i18n.py`. See [Environment variables and command line](../06-referencia/variables-y-cli).

## Machine identity

Each family identifies its machines in its own way: Elegoo by `mainboard_id`, FlashForge by serial number and Bambu Lab by its id. Only Marlin and laser/CNC use the internal `mch_…` id with network and USB anchors. See [Machine identity](../02-administracion/identidad-de-maquinas).

## Tests

- Write `backend/tests/test_<family>_printers.py` (there is one per family, for example `test_flashforge_printers.py`).
- Without hardware: simulate the transport. Marlin's protocol, for example, receives an injected `MarlinTransport`.
- A fixture with `autouse=True`, `isolated_printer_registries`, redirects each brand's `REGISTRY_PATH` to a temporary folder so tests neither read nor write your real registries. **Add your service there.**

To run the tests, see [Environment and tests](./entorno-y-pruebas).
