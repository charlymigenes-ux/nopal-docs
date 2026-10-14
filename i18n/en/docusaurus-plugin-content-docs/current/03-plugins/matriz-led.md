---
title: Matriz LED
sidebar_label: Matriz LED
audience: user
type: reference
status: implemented
verified_against: "nopal@4346f72; matriz-led@e6c62d8"
generated: true
plugin_id: matriz-led
plugin_version: "0.10.0"
source_commit: "e6c62d8"
---

# Matriz LED

:::note
This page is **generated** automatically. Do not edit it by hand: fix the source and regenerate.
Sources: `nopal-plugin.json`, plugin code and `plugin_catalog.json` (`matriz-led@e6c62d8`, `nopal@4346f72`).
:::

Panel principal + Editor de Anuncios para una pantalla LED matriz BLE (tipo iPixel Color) y un panel FK-8Wa de 96x16 por red: escenas rápidas, automatizaciones reales (inactividad, material bajo) y alertas por máquina, además de dibujar patrones a color y guardarlos como anuncios reutilizables.

## Summary

| Field | Value |
|---|---|
| id | `matriz-led` |
| Version (manifest) | 0.10.0 |
| Maturity | preview (0.x) |
| Category | Accesorios |
| Publisher | NOPAL Labs |
| Compatibility | Impresión 3D, Láser, CNC |
| Minimum Python (`python_requires`) | `>=3.10` |
| Backend | `backend/router.py` |
| UI | `frontend/matriz-led.js` · section `matriz-led` |
| Repository | [matriz-led](https://github.com/charlymigenes-ux/matriz-led) |
| Own tests | Yes |
| Own `docs/` folder | No |

## Declared permissions

These are **informational text** for whoever installs the plugin. NOPAL does not enforce them as a permission system: the plugin runs inside the NOPAL process with its same privileges.

- Enviar mensajes por Bluetooth a través de un accesorio ESP32

## Version drift

The manifest should be the source of truth (Standard §6.4). Different values are found in:

| Where | Value found | Manifest |
|---|---|---|
| plugin_catalog.json | 0.9.0 | 0.10.0 |
| NopalPluginRegistry (JS) | 0.9.0 | 0.10.0 |

## Plugin API

Route prefix(es): `/api/plugins` · 40 routes (Session (admin or operator): 35; Admin only: 5; Public: 0).

| Method | Route | Access | Policy | Description |
|---|---|---|---|---|
| GET | `/api/plugins/matriz-led/announcements` | Session (admin or operator) | — | — |
| POST | `/api/plugins/matriz-led/announcements` | Session (admin or operator) | — | — |
| GET | `/api/plugins/matriz-led/announcements/{announcement_id}` | Session (admin or operator) | — | — |
| PUT | `/api/plugins/matriz-led/announcements/{announcement_id}` | Session (admin or operator) | — | — |
| DELETE | `/api/plugins/matriz-led/announcements/{announcement_id}` | Session (admin or operator) | — | — |
| POST | `/api/plugins/matriz-led/announcements/{announcement_id}/send` | Session (admin or operator) | — | — |
| GET | `/api/plugins/matriz-led/config` | Session (admin or operator) | — | — |
| POST | `/api/plugins/matriz-led/config` | Admin only | — | — |
| GET | `/api/plugins/matriz-led/device-info` | Session (admin or operator) | — | — |
| POST | `/api/plugins/matriz-led/fk8wa/brightness` | Admin only | — | — |
| GET | `/api/plugins/matriz-led/fk8wa/config` | Session (admin or operator) | — | — |
| PUT | `/api/plugins/matriz-led/fk8wa/config` | Admin only | — | — |
| GET | `/api/plugins/matriz-led/fk8wa/effects` | Session (admin or operator) | — | Catálogo de efectos de entrada (con cuáles están probados) y las situaciones. |
| POST | `/api/plugins/matriz-led/fk8wa/effects/test` | Admin only | — | "Probar en mi panel": manda un ejemplo con el efecto unos segundos y luego restaura. |
| GET | `/api/plugins/matriz-led/fk8wa/frames` | Session (admin or operator) | — | Páginas del panel como datos (1 bit por LED) para dibujarlas en la pestaña. |
| GET | `/api/plugins/matriz-led/fk8wa/machines` | Session (admin or operator) | — | Máquinas conocidas con su nombre corto para el panel. |
| GET | `/api/plugins/matriz-led/fk8wa/message` | Session (admin or operator) | — | — |
| POST | `/api/plugins/matriz-led/fk8wa/message` | Session (admin or operator) | — | Texto libre o un anuncio (se muestra su nombre). Operador y admin. |
| DELETE | `/api/plugins/matriz-led/fk8wa/message` | Session (admin or operator) | — | — |
| GET | `/api/plugins/matriz-led/fk8wa/preview` | Session (admin or operator) | — | — |
| GET | `/api/plugins/matriz-led/fk8wa/scroll-preview` | Session (admin or operator) | — | Cómo correría un texto, para la prueba de la pestaña (no toca el panel). |
| GET | `/api/plugins/matriz-led/fk8wa/status` | Session (admin or operator) | — | — |
| POST | `/api/plugins/matriz-led/fk8wa/test` | Admin only | — | Solo lectura (01 09): IP, puerto y tamaño. Nunca SSID ni claves. |
| POST | `/api/plugins/matriz-led/image` | Session (admin or operator) | — | Manda el patrón dibujado en el editor de píxeles del panel tal cual (ver send_matrix en screen_service.py) -- a diferencia de /text, esto n… |
| GET | `/api/plugins/matriz-led/last-error` | Session (admin or operator) | — | — |
| GET | `/api/plugins/matriz-led/last-sent` | Session (admin or operator) | — | — |
| GET | `/api/plugins/matriz-led/last-sent-history` | Session (admin or operator) | — | Quién mandó los últimos envíos a la pantalla (nombre de máquina o de anuncio) -- para el "ticker" del dock del Panel de Control en el core.… |
| GET | `/api/plugins/matriz-led/machine-alerts` | Session (admin or operator) | — | — |
| GET | `/api/plugins/matriz-led/machine-alerts/{machine_id}` | Session (admin or operator) | — | — |
| PUT | `/api/plugins/matriz-led/machine-alerts/{machine_id}` | Session (admin or operator) | — | — |
| GET | `/api/plugins/matriz-led/machines` | Session (admin or operator) | — | Snapshot normalizado de todas las máquinas -- el propio JS del plugin lo consulta para detectar solo, del lado del navegador, cuándo avisar… |
| GET | `/api/plugins/matriz-led/rules` | Session (admin or operator) | — | — |
| POST | `/api/plugins/matriz-led/rules` | Session (admin or operator) | — | — |
| PUT | `/api/plugins/matriz-led/rules/{rule_id}` | Session (admin or operator) | — | — |
| DELETE | `/api/plugins/matriz-led/rules/{rule_id}` | Session (admin or operator) | — | — |
| POST | `/api/plugins/matriz-led/rules/{rule_id}/run` | Session (admin or operator) | — | — |
| GET | `/api/plugins/matriz-led/stats` | Session (admin or operator) | — | — |
| GET | `/api/plugins/matriz-led/status` | Session (admin or operator) | — | — |
| POST | `/api/plugins/matriz-led/text` | Session (admin or operator) | — | — |
| GET | `/api/plugins/matriz-led/text-sizes` | Session (admin or operator) | — | Alturas de carácter soportadas por las fuentes de pypixelcolor, para el selector de tamaño del panel -- ver el comentario de SUPPORTED_CHAR… |

## Verified notes

- The `pypixelcolor` library must be installed manually in NOPAL's Python environment: there is no per-plugin dependency mechanism. <small>(evidence: `matriz-led/README.md`)</small>
- The iPixel Color panel (BLE) is reached through an ESP32 running `Nopal_FF.ino` from NOPAL's repository; the FK-8Wa panel is driven over TCP (port 5858) on the same network. <small>(evidence: `matriz-led/README.md`)</small>

## More information

- [README of the plugin](https://github.com/charlymigenes-ux/matriz-led#readme)
