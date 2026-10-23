---
title: Herramientas SVG
sidebar_label: Herramientas SVG
audience: user
type: reference
status: implemented
verified_against: "nopal@b9aa473; nopal-plugin-svg-toolkit@f78ba10"
generated: true
plugin_id: svg-toolkit
plugin_version: "0.9.0"
---

# Herramientas SVG

:::note
Página **generada** automáticamente. No la edites a mano: corrige la fuente y vuelve a generar.
Fuentes: `nopal-plugin.json`, código del plugin y `plugin_catalog.json` (`nopal-plugin-svg-toolkit@f78ba10`, `nopal@b9aa473`).
:::

Limpia, une y simplifica trazos SVG antes de enviarlos a producción.

## Ficha

| Campo | Valor |
|---|---|
| id | `svg-toolkit` |
| Versión (manifiesto) | 0.9.0 |
| Madurez | preliminar (0.x) |
| Categoría | Diseño |
| Publicador | NOPAL Labs |
| Compatibilidad | Láser, CNC |
| Python mínimo (`python_requires`) | sin requisito propio (hereda el del core) |
| Backend | No tiene (solo interfaz) |
| Interfaz | `frontend/svg-toolkit.js` · sección `svg-toolkit` |
| Repositorio | [nopal-plugin-svg-toolkit](https://github.com/charlymigenes-ux/nopal-plugin-svg-toolkit) |
| Pruebas propias | Sí |
| Carpeta `docs/` propia | Sí |

## Permisos declarados

Son **texto informativo** para quien instala el plugin. NOPAL no los aplica como un sistema de permisos: el plugin se ejecuta dentro del proceso de NOPAL con sus mismos privilegios.

- Leer y guardar archivos SVG

## API del plugin

Este plugin **no tiene backend**: no expone rutas.

## Más información

- [README del plugin](https://github.com/charlymigenes-ux/nopal-plugin-svg-toolkit#readme)
