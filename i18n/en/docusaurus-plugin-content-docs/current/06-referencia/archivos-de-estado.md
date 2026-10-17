---
title: State files
sidebar_label: State files
sidebar_position: 2
audience: reference
type: reference
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
source_commit: "a5853dc"
---

# State files

NOPAL uses no external database: all its state lives in files inside **its own folder** (for example `/home/<user>/nopal`). This page lists them, what they hold and whether they are included in the [configuration backups](../02-administracion/respaldos).

:::caution Before touching a file
Stop NOPAL before editing any of these files by hand: the server also writes to them. Some contain sensitive data (password hashes, API keys).
:::

## Users and session

| File | What it holds | Backup |
|---|---|---|
| `auth_users.json` | Users, roles and password hashes (PBKDF2). **Sensitive** | *Users* group, encrypted |
| `.session_secret` | Secret used to sign sessions. Generated automatically | **Never exported** |

## Machines

| File | What it holds | Backup |
|---|---|---|
| `marlin_printer_registry.json` | Registered Marlin printers | *3D printers* group |
| `elegoo_printer_registry.json` | Elegoo printers | *3D printers* group |
| `flashforge_printer_registry.json` | FlashForge printers | *3D printers* group |
| `bambu_printer_registry.json` | Bambu Lab printers | *3D printers* group |
| `laser_registry.json` | Registered lasers and CNC | *Laser and CNC* group |
| `temperature_presets.json` | Temperature presets | *Temperature presets* group |

Marlin and laser/CNC machines carry an internal `mch_…` id. See [Machine identity](../02-administracion/identidad-de-maquinas). Klipper printers have no file of their own: NOPAL detects them through Moonraker.

## Jobs

| File | What it holds | Backup |
|---|---|---|
| `laser_history.json` | Laser and CNC history (up to 1000 entries) | No |
| `job_print_log.json` | 3D prints sent from NOPAL (up to 2000) | No |
| `job_deletions.json` | Control log of deleted jobs | No |
| `scheduled_prints.json` | Scheduled Klipper prints | No |
| `gcode_bounds_cache.json` | Cache of each G-code's bounds (used for framing) | No |

## Artificial intelligence

| File | What it holds | Backup |
|---|---|---|
| `ai_config.json` | Saved AIs and their configuration. The API key is **in clear text**. **Sensitive** | *NOPAL Intelligence* group, encrypted |
| `ai_conversations.json` | Conversations, private to each user | **Never exported** |

## Logs and plugins

| File or folder | What it holds | Backup |
|---|---|---|
| `logging_config.json` | Log configuration (sources, rotation) | *Logs* group |
| `logs/nopal.log` | NOPAL's log: rotates at 5 MB with 5 copies (`nopal.log.1` … `.5`) | No |
| `data/plugins/installed.json` | Installed and enabled plugins | *Installed plugins* group |
| `data/plugins/<id>/` | Data each plugin stores here | No |
| `plugins/<id>/` | The code of each installed plugin | No |

The plugin data directory can be changed with the `NOPAL_PLUGIN_DATA_DIR` variable (see [Environment variables and command line](./variables-y-cli)).

## Official plugin files

Plugins keep their configuration in the root or under `data/`. The ones included in backups are:

| File | Plugin | Backup group |
|---|---|---|
| `accessory_registry.json`, `arduino_boards_config.json` | Workshop Automation | *Accessories and boards* |
| `camera_registry.json` | Cameras | *Cameras* |
| `pricing_config.json`, `quotes_registry.json` | Cotizador | *Cotizador (precios y cotizaciones)* |
| `spoolman_config.json`, `spoolman_printer_links.json`, `spoolman_reservations.json` | Materials (Spoolman) | *Materials (Spoolman)* |

Each plugin may also have other files of its own (for example, a usage or activity log) that are not included in backups.

## Folders

| Folder | Contents |
|---|---|
| `uploads/models/` | The **3D Printing** library |
| `uploads/gcode/` | The **Files** library (G-code) |
| `previews/` | Generated previews (created by the installer) |
| `backups/` | Safety copies made before the machine identity migration |

For what each item means when updating, backing up or uninstalling, see [Update and uninstall](../02-administracion/actualizar-y-desinstalar).
