---
title: Texto para fabricación
sidebar_label: Texto para fabricación
audience: user
type: reference
status: implemented
verified_against: "nopal@b9aa473; nopal-plugin-font-library@6bdbb0b"
generated: true
plugin_id: font-library
plugin_version: "0.5.1"
---

# Texto para fabricación

:::note
Página **generada** automáticamente. No la edites a mano: corrige la fuente y vuelve a generar.
Fuentes: `nopal-plugin.json`, código del plugin y `plugin_catalog.json` (`nopal-plugin-font-library@6bdbb0b`, `nopal@b9aa473`).
:::

Crea texto con medidas físicas, valida su fabricación y agrégalo como trayectos editables a un proyecto NOPAL.

## Ficha

| Campo | Valor |
|---|---|
| id | `font-library` |
| Versión (manifiesto) | 0.5.1 |
| Madurez | preliminar (0.x) |
| Categoría | Diseño |
| Publicador | NOPAL Labs |
| Compatibilidad | Láser, CNC |
| Python mínimo (`python_requires`) | sin requisito propio (hereda el del core) |
| Backend | No tiene (solo interfaz) |
| Interfaz | `frontend/font-library.js` · sección `font-library` |
| Repositorio | [nopal-plugin-font-library](https://github.com/charlymigenes-ux/nopal-plugin-font-library) |
| Pruebas propias | Sí |
| Carpeta `docs/` propia | Sí |

## Permisos declarados

Son **texto informativo** para quien instala el plugin. NOPAL no los aplica como un sistema de permisos: el plugin se ejecuta dentro del proceso de NOPAL con sus mismos privilegios.

- Leer tipografías locales
- Agregar elementos al proyecto actual
- Guardar SVG en la biblioteca
- Enviar diseños a la cola de producción

## Desfase de versiones

El manifiesto debería ser la fuente de verdad (Standard §6.4). Se detectan valores distintos en:

| Dónde | Valor encontrado | Manifiesto |
|---|---|---|
| plugin_catalog.json | 0.5.0 | 0.5.1 |

## API del plugin

Este plugin **no tiene backend**: no expone rutas.

## Más información

- [README del plugin](https://github.com/charlymigenes-ux/nopal-plugin-font-library#readme)
