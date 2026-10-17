---
title: "Plugin system: structure and manifest"
sidebar_label: "Plugins: manifest"
sidebar_position: 3
audience: developer
type: reference
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
source_commit: "a5853dc"
---

# Plugin system: structure and manifest

:::info Name
Today this is NOPAL's **plugin system**. The name "SDK" is reserved for when a stable contractual API and an official template exist. What does not exist yet is in [RFC](../07-rfc).
:::

## What a plugin is

A plugin is **its own git repository** that NOPAL clones into `plugins/<id>/` (a folder ignored by the core's version control). It runs **inside the NOPAL process**, with its same privileges and no isolation.

Structure of the official plugins:

```text
<plugin-repo>/
├── nopal-plugin.json      manifest (required)
├── backend/               optional
│   ├── router.py          defines `router` (APIRouter)
│   └── services/…         plugin logic (relative imports)
├── frontend/              optional
│   ├── <id>.js            registers itself in NopalPluginRegistry
│   └── <id>.css
├── tests/                 tests (recommended)
└── README.md
```

A plugin can be **frontend only** (`shape-creator`, `svg-toolkit`, `font-library`), **backend only**, or both.

## The `nopal-plugin.json` manifest

It must be at the **root** of the repository. If it is missing or not valid JSON, installation is rejected and nothing is left on disk.

Example, taken from an official plugin:

```json
{
  "schema_version": 1,
  "id": "camera-viewer",
  "name": "Cámaras",
  "version": "1.4.0",
  "publisher": "NOPAL Labs",
  "category": "Producción",
  "description": "Agrega cámaras por URL de stream MJPEG, ONVIF o webcam USB, y míralas en vivo desde el panel.",
  "permissions": ["Guardar direcciones de cámaras", "Detectar webcams USB"],
  "compatibility": ["Impresión 3D", "Láser", "CNC"],
  "frontend": {
    "script": "frontend/camera-viewer.js",
    "style": "frontend/camera-viewer.css",
    "section": "camera-viewer"
  },
  "backend": {
    "entry": "backend/router.py"
  }
}
```

### Which fields the core really uses

This table distinguishes what **the core code reads** from what is only descriptive. It was verified by searching the core for each field.

| Field | Used by the core? | What for |
|---|---|---|
| `version` | **Yes** | Stored as the installed version, shown in the Gallery and appended as `?v=` to the script and style URLs to bust the cache |
| `backend.entry` | **Yes** | Path, relative to the plugin root, of the module that defines `router`. Without this field, the plugin has no backend (a normal case, not an error) |
| `frontend.script` | **Yes** | Injected as a `<script>` in the page, from `/plugins-static/<id>/<script>` |
| `frontend.style` | **Yes** | Injected as a `<link rel="stylesheet">` |
| `python_requires` | **Yes** | Minimum Python version. See below |
| `frontend.section` | Exposed in `/api/plugins` | The core does not use it to mount anything: each plugin creates its own section. By convention it matches the `data-section` the plugin uses |
| `schema_version` | **No** | No core code reads it |
| `id`, `name`, `publisher`, `category`, `description`, `compatibility` | No (descriptive) | The official ones include them. The Gallery takes its texts from the core's **catalog**, not from the manifest |
| `permissions` | **Not enforced** | Informational text. No mechanism enforces it |

:::warning The manifest is not validated
The core only checks that the file is readable JSON. It **does not validate the schema**: a misspelled field simply has no effect. Formal validation is a proposal, not something that exists.
:::

### `python_requires`

Optional. Only the format **`>=X.Y`** or **`>=X.Y.Z`** is understood; any other expression is treated as **not met**: a plugin whose compatibility cannot be known is neither installed nor loaded.

When the server's Python is not enough, NOPAL answers (the message is in Spanish):

> Este plugin requiere Python 3.10 o superior; NOPAL corre con Python 3.9 (this plugin requires Python 3.10 or later; NOPAL runs on Python 3.9)

- The **Gallery** does not install it.
- The **loader** does not import its backend.
- Its interface is not injected either, so as not to leave it broken.

To know it **before cloning**, it must also be declared in the catalog (`plugin_catalog.json`). After cloning, the manifest's value prevails: if it demands more than the catalog, the plugin is removed instead of being left half installed.

## Version, catalog and JavaScript: three places

A plugin's version currently appears in **three places** (the manifest, the core catalog and the `version` the JS writes into `NopalPluginRegistry`). For an already installed plugin the **manifest** rules, but the other two can drift. The [plugin matrix](../03-plugins/matriz-de-plugins.md) detects those differences.
