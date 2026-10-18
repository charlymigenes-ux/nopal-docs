---
title: Plugin matrix
sidebar_label: Plugin matrix
audience: reference
type: reference
status: implemented
verified_against: "nopal@d6d86a5 (2026-10-17)"
generated: true
sidebar_position: 1
source_commit: "d6d86a5"
---

# Plugin matrix

:::note
This page is **generated** automatically. Do not edit it by hand: fix the source and regenerate.
Verified against `nopal@d6d86a5` (2026-10-17).
:::

Official plugins, with the data from their `nopal-plugin.json` manifest.

| Plugin | id | Version | Category | Compatibility | Python | Routes | Versions consistent |
|---|---|---|---|---|---|---|---|
| [Matriz LED](./matriz-led.md) | `matriz-led` | 0.10.0 | Accesorios | Impresión 3D, Láser, CNC | `>=3.10` | 40 | ⚠️ |
| [Automatización de Taller](./arduino-accessories.md) | `arduino-accessories` | 2.6.0 | Accesorios | Impresión 3D, Láser, CNC | — | 43 | ⚠️ |
| [Cámaras](./camera-viewer.md) | `camera-viewer` | 1.4.0 | Producción | Impresión 3D, Láser, CNC | — | 32 | ✅ |
| [Materiales](./spoolman.md) | `spoolman` | 0.2.0 | Producción | Impresión 3D | — | 17 | ✅ |
| [Cotizador](./cotizador.md) | `cotizador` | 1.1.0 | Producción | Impresión 3D, Láser, CNC | — | 18 | ✅ |
| [Creador de formas](./shape-creator.md) | `shape-creator` | 1.2.0 | Diseño | Láser, CNC | — | no backend | ✅ |
| [Herramientas SVG](./svg-toolkit.md) | `svg-toolkit` | 0.9.0 | Diseño | Láser, CNC | — | no backend | ✅ |
| [Texto para fabricación](./font-library.md) | `font-library` | 0.5.1 | Diseño | Láser, CNC | — | no backend | ⚠️ |

⚠️ = the manifest, the catalog and the plugin JS do not match (see below).

## Version drift

| Plugin | Where | Value found | Manifest |
|---|---|---|---|
| `matriz-led` | plugin_catalog.json | 0.9.0 | 0.10.0 |
| `matriz-led` | NopalPluginRegistry (JS) | 0.9.0 | 0.10.0 |
| `arduino-accessories` | plugin_catalog.json | 2.5.0 | 2.6.0 |
| `font-library` | plugin_catalog.json | 0.5.0 | 0.5.1 |

Until a single source of metadata exists (see RFC), the catalog and the JS duplicate the manifest version.

## Listed in the catalog (not yet available)

- **Optimizador G-Code** (`gcode-optimizer`, 0.9.0) — status: `coming_soon`. Not an installable plugin today.
- **Biblioteca de materiales** (`material-library`, 0.7.0) — status: `coming_soon`. Not an installable plugin today.
