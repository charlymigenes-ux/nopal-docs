---
title: Environment variables and command line
sidebar_label: Variables and commands
sidebar_position: 4
audience: reference
type: reference
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
source_commit: "a5853dc"
---

# Environment variables and command line

## Environment variables

| Variable | Where it is used | What it does | Default |
|---|---|---|---|
| `NOPAL_PORT` | `install.sh` | Port of the service the installer creates | `8420` |
| `NOPAL_KLIPPER_PORTS` | The server | Additional Moonraker ports, comma-separated. An invalid or out-of-range value is ignored with a warning in the log | None (7125 to 7127 are searched) |
| `NOPAL_PLUGIN_DATA_DIR` | The server | Folder where plugin data and `installed.json` are stored | `data/plugins` |
| `NOPAL_CORE_ROOT` | Plugin tests | Path to the core checkout, needed to run a plugin's tests with the real loader | Required in tests |

### NOPAL Intelligence

These variables **override** what is saved in `ai_config.json`. An invalid value is ignored with a warning in the log.

| Variable | Setting | Default |
|---|---|---|
| `NOPAL_AI_ENABLED` | Enables the AI layer | `false` |
| `NOPAL_AI_PROVIDER` | Provider type | `openai-compatible` |
| `NOPAL_AI_BASE_URL` | Server address, ending in `/v1` | Empty |
| `NOPAL_AI_MODEL` | Model | Empty |
| `NOPAL_AI_API_KEY` | API key | Empty |
| `NOPAL_AI_TIMEOUT` | Maximum wait time, in seconds | `60` |
| `NOPAL_AI_MAX_TOKENS` | Maximum response length | `512` |
| `NOPAL_AI_TEMPERATURE` | Sampling temperature | `0.2` |
| `NOPAL_AI_TOOL_MODE` | `native`, `context` or `auto`: how tools are given to the model | `auto` |
| `NOPAL_AI_TOOL_PROFILE` | Tool profile | `full` |
| `NOPAL_AI_MODEL_MODE` | `fixed` (one model) or `auto` (chooses by the question) | `fixed` |
| `NOPAL_AI_ACTIONS_ENABLED` | Lets the AI act | `false` |
| `NOPAL_AI_MAX_TOOL_ITERATIONS` | Cap on tool calls per question | `4` |
| `NOPAL_AI_ALLOW_PUBLIC_ENDPOINT` | Allows a public server | `false` |

`NOPAL_AI_MODEL_MODE=fixed` is useful on headless installs to force a single model. See [NOPAL Intelligence](../01-usuario/nopal-intelligence).

## Commands

### Install, update and remove

| Command | What it does |
|---|---|
| `./install.sh` | Installs NOPAL as a service. See [Installation](../02-administracion/instalacion) |
| `./uninstall.sh` | Removes the service and the virtual environment and **keeps your data** |
| `./uninstall.sh --purgar` | Also deletes the library, registries and credentials |
| `./uninstall.sh --dry-run` | Only shows what it would do |
| `./uninstall.sh --si` | Does not ask. Requires `--purgar` separately to delete data |

See [Update and uninstall](../02-administracion/actualizar-y-desinstalar).

### Start by hand

```bash
.venv/bin/uvicorn backend.main:app --host 0.0.0.0 --port 8420
```

### Scripts in `scripts/`

| Script | What it is for |
|---|---|
| `migrate_machine_identity.py` | One-time migration to stable machine identity. Dry run by default; `--apply` writes and `--esp420` queries the Chip ID. See [Machine identity](../02-administracion/identidad-de-maquinas) |
| `generate_i18n.py` | Generates the Portuguese (Brazil), French and German languages from the English catalog. It is a development tool: NOPAL does not translate at runtime |
| `check_plugins_compat.py` | Checks that the catalog's plugins work with the Python version running it. Used by continuous integration |

### Tests

```bash
pytest
```

Runs the core's tests. For a plugin: `NOPAL_CORE_ROOT=/path/to/core pytest plugins/<id>/tests`. See [Environment and tests](../05-desarrolladores/entorno-y-pruebas).
