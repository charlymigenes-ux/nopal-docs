---
title: Materiales
sidebar_label: Materiales
audience: user
type: reference
status: implemented
verified_against: "nopal@4346f72; nopal-plugin-spoolman@09621fd"
generated: true
plugin_id: spoolman
plugin_version: "0.2.0"
source_commit: "09621fd"
---

# Materiales

:::note
This page is **generated** automatically. Do not edit it by hand: fix the source and regenerate.
Sources: `nopal-plugin.json`, plugin code and `plugin_catalog.json` (`nopal-plugin-spoolman@09621fd`, `nopal@4346f72`).
:::

Conecta NOPAL con un servidor Spoolman para ver tu inventario real de spools de filamento, asignarlos a tus impresoras Klipper y usar sus costos reales en el Cotizador.

## Summary

| Field | Value |
|---|---|
| id | `spoolman` |
| Version (manifest) | 0.2.0 |
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

## Plugin API

Route prefix(es): `/api/spoolman` · 17 routes (Session (admin or operator): 11; Admin only: 6; Public: 0).

| Method | Route | Access | Policy | Description |
|---|---|---|---|---|
| GET | `/api/spoolman/alerts` | Session (admin or operator) | — | — |
| GET | `/api/spoolman/config` | Session (admin or operator) | — | — |
| POST | `/api/spoolman/config` | Admin only | — | — |
| DELETE | `/api/spoolman/config` | Admin only | — | — |
| GET | `/api/spoolman/consumption/monthly` | Session (admin or operator) | — | — |
| GET | `/api/spoolman/discover` | Session (admin or operator) | — | Sondea localhost y la red local en busca de servidores Spoolman reales, para ofrecerlos como opción antes de forzar tipear host/puerto. |
| GET | `/api/spoolman/moonraker-check` | Session (admin or operator) | — | Por cada impresora Klipper con un carrete vinculado en NOPAL, revisa si Moonraker (no NOPAL) tiene su propio componente [spoolman] activo. |
| GET | `/api/spoolman/printers/{port}/active-spool` | Session (admin or operator) | — | — |
| POST | `/api/spoolman/printers/{port}/active-spool` | Admin only | — | Asigna el carrete que la ficha de NOPAL muestra para esta impresora. |
| DELETE | `/api/spoolman/printers/{port}/active-spool` | Admin only | — | — |
| GET | `/api/spoolman/printers/active-spools` | Session (admin or operator) | — | Qué carrete tiene cargado cada impresora. |
| GET | `/api/spoolman/reservations` | Session (admin or operator) | — | — |
| POST | `/api/spoolman/reservations` | Admin only | — | — |
| DELETE | `/api/spoolman/reservations/{reservation_id}` | Admin only | — | — |
| GET | `/api/spoolman/spools` | Session (admin or operator) | — | — |
| GET | `/api/spoolman/spools/{spool_id}` | Session (admin or operator) | — | — |
| GET | `/api/spoolman/summary` | Session (admin or operator) | — | — |

## Verified notes

- Optional Cotizador integration: a `material_id` of the form `spoolman:<spool_id>` sent to `POST /api/pricing/quote` takes its cost from this plugin instead of `pricing_config.json`. Spoolman remains the source of truth for inventory. <small>(evidence: `nopal-plugin-spoolman/README.md`)</small>
- Requires a Spoolman server reachable on the network (the README suggests running it with Docker on port 7912). <small>(evidence: `nopal-plugin-spoolman/README.md`)</small>

## More information

- [README of the plugin](https://github.com/charlymigenes-ux/nopal-plugin-spoolman#readme)
