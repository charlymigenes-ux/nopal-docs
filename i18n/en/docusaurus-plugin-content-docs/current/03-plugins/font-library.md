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
source_commit: "6bdbb0b"
---

# Texto para fabricación

:::note
This page is **generated** automatically. Do not edit it by hand: fix the source and regenerate.
Sources: `nopal-plugin.json`, plugin code and `plugin_catalog.json` (`nopal-plugin-font-library@6bdbb0b`, `nopal@b9aa473`).
:::

Crea texto con medidas físicas, valida su fabricación y agrégalo como trayectos editables a un proyecto NOPAL.

## Summary

| Field | Value |
|---|---|
| id | `font-library` |
| Version (manifest) | 0.5.1 |
| Maturity | preview (0.x) |
| Category | Diseño |
| Publisher | NOPAL Labs |
| Compatibility | Láser, CNC |
| Minimum Python (`python_requires`) | no own requirement (inherits the core's) |
| Backend | None (UI only) |
| UI | `frontend/font-library.js` · section `font-library` |
| Repository | [nopal-plugin-font-library](https://github.com/charlymigenes-ux/nopal-plugin-font-library) |
| Own tests | Yes |
| Own `docs/` folder | Yes |

## Declared permissions

These are **informational text** for whoever installs the plugin. NOPAL does not enforce them as a permission system: the plugin runs inside the NOPAL process with its same privileges.

- Leer tipografías locales
- Agregar elementos al proyecto actual
- Guardar SVG en la biblioteca
- Enviar diseños a la cola de producción

## Version drift

The manifest should be the source of truth (Standard §6.4). Different values are found in:

| Where | Value found | Manifest |
|---|---|---|
| plugin_catalog.json | 0.5.0 | 0.5.1 |

## Plugin API

This plugin has **no backend**: it exposes no routes.

## More information

- [README of the plugin](https://github.com/charlymigenes-ux/nopal-plugin-font-library#readme)
