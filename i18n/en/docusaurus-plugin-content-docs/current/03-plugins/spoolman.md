---
title: Materiales
sidebar_label: Materiales
audience: user
type: reference
status: implemented
verified_against: "nopal@b9aa473; nopal-plugin-spoolman@255486c"
generated: true
plugin_id: spoolman
plugin_version: "0.3.0"
source_commit: "255486c"
---

# Materiales

:::note
This page is **generated** automatically. Do not edit it by hand: fix the source and regenerate.
Sources: `nopal-plugin.json`, plugin code and `plugin_catalog.json` (`nopal-plugin-spoolman@255486c`, `nopal@b9aa473`).
:::

Conecta NOPAL con un servidor Spoolman para ver tu inventario real de spools de filamento, asignarlos a tus impresoras Klipper y usar sus costos reales en el Cotizador.

## Summary

| Field | Value |
|---|---|
| id | `spoolman` |
| Version (manifest) | 0.3.0 |
| Maturity | preview (0.x) |
| Category | Producción |
| Publisher | NOPAL Labs |
| Compatibility | Impresión 3D |
| Minimum Python (`python_requires`) | no own requirement (inherits the core's) |
| Backend | `backend/router.py` |
| UI | `frontend/spoolman.js` · section `spoolman` |
| Repository | [nopal-plugin-spoolman](https://github.com/charlymigenes-ux/nopal-plugin-spoolman) |
| Own tests | Yes |
| Own `docs/` folder | Yes |

## Declared permissions

These are **informational text** for whoever installs the plugin. NOPAL does not enforce them as a permission system: the plugin runs inside the NOPAL process with its same privileges.

- Conectar con un servidor Spoolman en tu red
- Guardar qué spool está cargado en cada impresora
- Guardar reservas de material para producción
- Modificar el inventario de Spoolman (solo administradores): pesar, registrar uso, mover y archivar carretes
- Pedir a Spoolman una copia de su base de datos (solo administradores)
- Ofrecer a NOPAL Intelligence consultas de solo lectura del inventario

## Version drift

The manifest should be the source of truth (Standard §6.4). Different values are found in:

| Where | Value found | Manifest |
|---|---|---|
| plugin_catalog.json | 0.2.0 | 0.3.0 |

## NOPAL Intelligence

This plugin declares `AI_TOOLS` (**experimental** extension point).

## Plugin API

Route prefix(es): `/api/spoolman` · 25 routes (Session (admin or operator): 14; Admin only: 11; Public: 0).

| Method | Route | Access | Policy | Description |
|---|---|---|---|---|
| GET | `/api/spoolman/alerts` | Session (admin or operator) | — | — |
| POST | `/api/spoolman/backup` | Admin only | — | Pide a Spoolman una copia de su base de datos (la guarda él, en su propio equipo; NOPAL no la descarga). |
| GET | `/api/spoolman/changes` | Session (admin or operator) | — | Huella barata del inventario, para que el panel sepa si algo cambió (por Spoolman, por Moonraker al terminar una impresión, por otra person… |
| GET | `/api/spoolman/config` | Session (admin or operator) | — | — |
| POST | `/api/spoolman/config` | Admin only | — | — |
| DELETE | `/api/spoolman/config` | Admin only | — | — |
| GET | `/api/spoolman/consumption/monthly` | Session (admin or operator) | — | — |
| GET | `/api/spoolman/discover` | Session (admin or operator) | — | Sondea localhost y la red local en busca de servidores Spoolman reales, para ofrecerlos como opción antes de forzar tipear host/puerto. |
| GET | `/api/spoolman/filaments` | Session (admin or operator) | — | — |
| GET | `/api/spoolman/locations` | Session (admin or operator) | — | — |
| GET | `/api/spoolman/moonraker-check` | Session (admin or operator) | — | Por cada impresora Klipper con un carrete vinculado en NOPAL, revisa si Moonraker (no NOPAL) tiene su propio componente [spoolman] activo. |
| GET | `/api/spoolman/printers/{port}/active-spool` | Session (admin or operator) | — | — |
| POST | `/api/spoolman/printers/{port}/active-spool` | Admin only | — | Asigna el carrete que la ficha de NOPAL muestra para esta impresora. |
| DELETE | `/api/spoolman/printers/{port}/active-spool` | Admin only | — | — |
| GET | `/api/spoolman/printers/active-spools` | Session (admin or operator) | — | Qué carrete tiene cargado cada impresora. |
| GET | `/api/spoolman/reservations` | Session (admin or operator) | — | — |
| POST | `/api/spoolman/reservations` | Admin only | — | — |
| DELETE | `/api/spoolman/reservations/{reservation_id}` | Admin only | — | — |
| GET | `/api/spoolman/spools` | Session (admin or operator) | — | — |
| POST | `/api/spoolman/spools` | Admin only | — | — |
| GET | `/api/spoolman/spools/{spool_id}` | Session (admin or operator) | — | — |
| PATCH | `/api/spoolman/spools/{spool_id}` | Admin only | — | Solo ubicación, archivado y comentario: lo que el panel necesita. El resto de los campos se edita en la interfaz de Spoolman. |
| PUT | `/api/spoolman/spools/{spool_id}/measure` | Admin only | — | Peso bruto medido en la báscula (carrete + filamento); Spoolman descuenta el peso del carrete vacío y calcula lo que queda. |
| PUT | `/api/spoolman/spools/{spool_id}/use` | Admin only | — | — |
| GET | `/api/spoolman/summary` | Session (admin or operator) | — | — |

## Verified notes

- Optional Cotizador integration: a `material_id` of the form `spoolman:<spool_id>` sent to `POST /api/pricing/quote` takes its cost from this plugin instead of `pricing_config.json`. Spoolman remains the source of truth for inventory. <small>(evidence: `nopal-plugin-spoolman/README.md`)</small>
- Requires a Spoolman server reachable on the network over plain HTTP, with no credentials or sub-path (Spoolman's guide recommends Docker Compose, on port 7912). See the plugin's installation guide. <small>(evidence: `nopal-plugin-spoolman/README.md`)</small>
- Since version 0.3.0, an administrator can weigh, log usage, move and archive spools from NOPAL (each action asks for confirmation and Spoolman runs it) and ask for a copy of the Spoolman database. The NOPAL Intelligence tools `find_spools` and `get_printer_spools` are read-only. The panel checks every 10 seconds whether the inventory changed; there is no push channel. <small>(evidence: `nopal-plugin-spoolman/docs/overview.md`)</small>

## More information

- [README of the plugin](https://github.com/charlymigenes-ux/nopal-plugin-spoolman#readme)
