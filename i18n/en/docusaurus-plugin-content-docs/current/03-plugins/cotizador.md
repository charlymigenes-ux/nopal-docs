---
title: Cotizador
sidebar_label: Cotizador
audience: user
type: reference
status: implemented
verified_against: "nopal@4346f72; nopal-plugin-cotizador@64d1394"
generated: true
plugin_id: cotizador
plugin_version: "1.1.0"
source_commit: "64d1394"
---

# Cotizador

:::note
This page is **generated** automatically. Do not edit it by hand: fix the source and regenerate.
Sources: `nopal-plugin.json`, plugin code and `plugin_catalog.json` (`nopal-plugin-cotizador@64d1394`, `nopal@4346f72`).
:::

Calcula el costo estimado de trabajos de impresión 3D, láser o CNC y genera cotizaciones listas para enviar.

## Summary

| Field | Value |
|---|---|
| id | `cotizador` |
| Version (manifest) | 1.1.0 |
| Maturity | stable (≥ 1.0) |
| Category | Producción |
| Publisher | NOPAL Labs |
| Compatibility | Impresión 3D, Láser, CNC |
| Minimum Python (`python_requires`) | no own requirement (inherits the core's) |
| Backend | `backend/router.py` |
| UI | `frontend/cotizador.js` · section `pricing` |
| Repository | [nopal-plugin-cotizador](https://github.com/charlymigenes-ux/nopal-plugin-cotizador) |
| Own tests | No |
| Own `docs/` folder | No |

## Declared permissions

These are **informational text** for whoever installs the plugin. NOPAL does not enforce them as a permission system: the plugin runs inside the NOPAL process with its same privileges.

- Leer archivos de la biblioteca
- Guardar catálogos de materiales y máquinas
- Guardar el historial de cotizaciones

## Plugin API

Route prefix(es): `/api/pricing`, `/cotizador/print` · 18 routes (Session (admin or operator): 18; Admin only: 0; Public: 0).

| Method | Route | Access | Policy | Description |
|---|---|---|---|---|
| GET | `/api/pricing/machines` | Session (admin or operator) | — | Catálogo de perfiles de costo por máquina (nombre, watts, tarifa/hora) — no son los dispositivos reales del registro de impresoras/láser/CN… |
| POST | `/api/pricing/machines` | Session (admin or operator) | — | — |
| POST | `/api/pricing/machines/remove` | Session (admin or operator) | — | — |
| GET | `/api/pricing/materials` | Session (admin or operator) | — | Catálogo de materiales (filamento/lámina/consumible) para el cotizador. |
| POST | `/api/pricing/materials` | Session (admin or operator) | — | Da de alta o edita (si se manda `id`) un material. `config` es un JSON con los campos específicos del tipo — filamento: density_g_cm3, diam… |
| POST | `/api/pricing/materials/remove` | Session (admin or operator) | — | — |
| POST | `/api/pricing/quote` | Session (admin or operator) | — | Cotiza un archivo ya subido (modelo/gcode) contra un material del catálogo. Sin `async` a propósito: la extracción de filamento (metadata +… |
| GET | `/api/pricing/quotes` | Session (admin or operator) | — | Historial de cotizaciones guardadas, para la tabla de 'Cotizaciones recientes' — más nuevas primero. |
| POST | `/api/pricing/quotes` | Session (admin or operator) | — | Guarda una cotización ya calculada (el JSON completo que devolvió /api/pricing/quote, más los campos de encabezado que arma el frontend: cl… |
| GET | `/api/pricing/quotes/{quote_id}` | Session (admin or operator) | — | — |
| PUT | `/api/pricing/quotes/{quote_id}` | Session (admin or operator) | — | — |
| DELETE | `/api/pricing/quotes/{quote_id}` | Session (admin or operator) | — | — |
| GET | `/api/pricing/quotes/{quote_id}/pdf` | Session (admin or operator) | — | PDF real de la cotización (tabla de costos, no una captura de la página) — `download=true` fuerza que el navegador lo baje en vez de mostra… |
| POST | `/api/pricing/quotes/{quote_id}/status` | Session (admin or operator) | — | 'Enviar cotización' desde la UI solo llama esto con status='sent' — no manda ningún correo real, no hay SMTP configurado en el proyecto. |
| GET | `/api/pricing/quotes/{quote_id}/whatsapp-link` | Session (admin or operator) | — | Devuelve el mensaje (default, o el mensaje personal configurado en Ajustes, o el `message` que mande el frontend ya editado) y la URL wa.me… |
| GET | `/api/pricing/settings` | Session (admin or operator) | — | — |
| POST | `/api/pricing/settings` | Session (admin or operator) | — | Ajustes globales del cotizador. `machine_watts_default` y `margin` son JSON (ej. `{"printer": 250, "laser": 150, "cnc": 800}` y `{"mode": "… |
| GET | `/cotizador/print/{quote_id}` | Session (admin or operator) | — | Vista imprimible de una cotización guardada — el usuario la exporta a PDF con el diálogo nativo del navegador (Ctrl+P). No hay librería de… |

## Verified notes

- Its UI section is named `pricing`, different from the plugin id (`cotizador`). <small>(evidence: `nopal-plugin-cotizador/nopal-plugin.json`)</small>

## More information

- [README of the plugin](https://github.com/charlymigenes-ux/nopal-plugin-cotizador#readme)
