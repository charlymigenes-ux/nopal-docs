---
title: Matriz de plugins
sidebar_label: Matriz de plugins
audience: reference
type: reference
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
generated: true
sidebar_position: 1
---

# Matriz de plugins

:::note
Página **generada** automáticamente. No la edites a mano: corrige la fuente y vuelve a generar.
Verificado contra `nopal@a5853dc` (2026-10-17).
:::

Plugins oficiales, con los datos de su manifiesto `nopal-plugin.json`.

| Plugin | id | Versión | Categoría | Compatibilidad | Python | Rutas | Versiones coherentes |
|---|---|---|---|---|---|---|---|
| [Matriz LED](./matriz-led.md) | `matriz-led` | 0.10.0 | Accesorios | Impresión 3D, Láser, CNC | `>=3.10` | 40 | ⚠️ |
| [Automatización de Taller](./arduino-accessories.md) | `arduino-accessories` | 2.6.0 | Accesorios | Impresión 3D, Láser, CNC | — | 43 | ⚠️ |
| [Cámaras](./camera-viewer.md) | `camera-viewer` | 1.4.0 | Producción | Impresión 3D, Láser, CNC | — | 32 | ✅ |
| [Materiales](./spoolman.md) | `spoolman` | 0.2.0 | Producción | Impresión 3D | — | 17 | ✅ |
| [Cotizador](./cotizador.md) | `cotizador` | 1.1.0 | Producción | Impresión 3D, Láser, CNC | — | 18 | ✅ |
| [Creador de formas](./shape-creator.md) | `shape-creator` | 1.2.0 | Diseño | Láser, CNC | — | sin backend | ✅ |
| [Herramientas SVG](./svg-toolkit.md) | `svg-toolkit` | 0.9.0 | Diseño | Láser, CNC | — | sin backend | ✅ |
| [Texto para fabricación](./font-library.md) | `font-library` | 0.5.1 | Diseño | Láser, CNC | — | sin backend | ⚠️ |

⚠️ = el manifiesto, el catálogo y el JS del plugin no coinciden (ver abajo).

## Desfases de versión

| Plugin | Dónde | Valor encontrado | Manifiesto |
|---|---|---|---|
| `matriz-led` | plugin_catalog.json | 0.9.0 | 0.10.0 |
| `matriz-led` | NopalPluginRegistry (JS) | 0.9.0 | 0.10.0 |
| `arduino-accessories` | plugin_catalog.json | 2.5.0 | 2.6.0 |
| `font-library` | plugin_catalog.json | 0.5.0 | 0.5.1 |

Mientras no exista una fuente única de metadatos (ver RFC), el catálogo y el JS duplican la versión del manifiesto.

## Anunciados en el catálogo (aún no disponibles)

- **Optimizador G-Code** (`gcode-optimizer`, 0.9.0) — estado: `coming_soon`. No es un plugin instalable hoy.
- **Biblioteca de materiales** (`material-library`, 0.7.0) — estado: `coming_soon`. No es un plugin instalable hoy.
