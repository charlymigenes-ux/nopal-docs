---
title: Creador de formas
sidebar_label: Creador de formas
audience: user
type: reference
status: implemented
verified_against: "nopal@a5853dc; nopal-plugin-shape-creator@bbf1157"
generated: true
plugin_id: shape-creator
plugin_version: "1.2.0"
---

# Creador de formas

:::note
Página **generada** automáticamente. No la edites a mano: corrige la fuente y vuelve a generar.
Fuentes: `nopal-plugin.json`, código del plugin y `plugin_catalog.json` (`nopal-plugin-shape-creator@bbf1157`, `nopal@a5853dc`).
:::

Crea rectángulos, círculos, polígonos y formas paramétricas listas para láser o CNC.

## Ficha

| Campo | Valor |
|---|---|
| id | `shape-creator` |
| Versión (manifiesto) | 1.2.0 |
| Madurez | estable (≥ 1.0) |
| Categoría | Diseño |
| Publicador | NOPAL Labs |
| Compatibilidad | Láser, CNC |
| Python mínimo (`python_requires`) | sin requisito propio (hereda el del core) |
| Backend | No tiene (solo interfaz) |
| Interfaz | `frontend/shape-creator.js` · sección `shape-creator` |
| Repositorio | [nopal-plugin-shape-creator](https://github.com/charlymigenes-ux/nopal-plugin-shape-creator) |
| Pruebas propias | No |
| Carpeta `docs/` propia | Sí |

## Permisos declarados

Son **texto informativo** para quien instala el plugin. NOPAL no los aplica como un sistema de permisos: el plugin se ejecuta dentro del proceso de NOPAL con sus mismos privilegios.

- Guardar archivos en la biblioteca

## API del plugin

Este plugin **no tiene backend**: no expone rutas.

## Más información

- [README del plugin](https://github.com/charlymigenes-ux/nopal-plugin-shape-creator#readme)
