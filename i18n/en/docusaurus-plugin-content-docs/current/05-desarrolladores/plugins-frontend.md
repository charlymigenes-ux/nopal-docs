---
title: "Plugin system: frontend"
sidebar_label: "Plugins: frontend"
sidebar_position: 5
audience: developer
type: reference
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
source_commit: "a5853dc"
---

# Plugin system: frontend

A plugin's frontend is a JavaScript script (and, optionally, a stylesheet) that adds a section to NOPAL's interface.

## How it is loaded

1. `GET /api/plugins` returns, for each installed, enabled plugin that has `frontend`, the URLs of its script and style: `/plugins-static/<id>/<path>`. If the server's Python is not enough for the plugin, `frontend` is not included.
2. The core injects a `<link>` and a `<script defer>` with `id` `plugin-style-<id>` and `plugin-script-<id>`. It appends `?v=<version>` to the URLs to bust the cache.
3. **The script runs and mounts itself.** The core **does not call `mount()`**: the plugin itself does it at the end of its script.

:::warning Catalog plugins only
The `/api/plugins` list is built from the core's **curated catalog** (`plugin_catalog.json`). A plugin not in the catalog does not receive its interface, even if its backend does load. See [installation and Gallery](./plugins-instalacion-y-galeria.md).
:::

## The `NopalPluginRegistry` contract

```js
(() => {
    const PLUGIN_ID = 'my-plugin';
    if (window.NopalPluginRegistry?.[PLUGIN_ID]) return;   // avoid loading twice

    function mount() { /* creates the menu entry and the section */ }
    function unmount() { /* undoes everything mount() did */ }

    window.NopalPluginRegistry = window.NopalPluginRegistry || {};
    window.NopalPluginRegistry[PLUGIN_ID] = { mount, unmount, version: '1.0.0' };
    mount();
})();
```

| Part | Who uses it | Behavior |
|---|---|---|
| `window.NopalPluginRegistry` | Core and plugin | Global object the core creates if it does not exist |
| `[PLUGIN_ID]` | Core | Used as the key. The core avoids reloading a plugin that is already registered |
| `mount()` | **The plugin** | Called by the script itself when it finishes. The core does not invoke it |
| `unmount()` | **The core** | Called when the plugin is **uninstalled**. It must remove the menu item, the section, observers and listeners |
| `version` | Informational | The official ones write it by hand; it can drift from the manifest |

On uninstall, the core runs `unmount()`, deletes the registry entry and removes the plugin's `<script>` and `<link>`.

:::caution There is no disable action
The Gallery API only **installs, updates and uninstalls**. The `enabled` flag in `data/plugins/installed.json` is set to `true` on install and only changes if you edit the file by hand. Loading filters by installed **and enabled** plugins; the core unloads a plugin only when it is uninstalled.
:::

## What `mount()` does in the official plugins

They all follow the same recipe. There is no API that does it for you: the plugin manipulates the DOM directly.

1. **Adds a menu button** in `.nav-category[data-group="plugins"] .nav-category-items`, with `data-section="<id>"` and `data-plugin-nav="<id>"`, which calls `window.switchSection('<id>')` on click.
2. **Inserts its section** in the `.content` container (`shape-creator`, for example, places it before `#gcode-editor-section`).
3. Binds events and loads its data.
4. Calls `window.applySidebarOrder()` so the menu respects the order chosen by the user.

`unmount()` does the reverse: it removes the button (`[data-plugin-nav="<id>"]`) and the section.

## Core global functions the plugins use

The official plugins call these **global** functions from `app.js`:

| Function | Use |
|---|---|
| `window.switchSection(name)` | Switches section |
| `window.applySidebarOrder()` | Reapplies the side menu order |
| `window.showToast(message, tone)` | Shows a notice (`tone`: `success` by default) |
| `window.appConfirm(message, title, type)` | Confirmation dialog (returns a promise) |
| `window.appAlert(message, title, type)` | Alert dialog |
| `window.escapeHtml(value)` | Escapes text to insert into HTML |
| `window.loadModelsFolder(path)` | Reloads the model library (used by plugins that save files) |

Some plugins depend on **more** internal functions. The Cotizador, for example, reuses the core's thumbnail viewer and library file explorer (`loadRealGcodeThumbnail`, `renderStandardModelPreview`, `renderCncGcodeThumbnail`, `formatSize`, `isGcodeFile`, `stripSectionPrefix`) and several widgets (`createOptionSwitch`, `wireTopbarDropdown`, `closeAllTopbarDropdowns`). That is why it must run alongside a version of `app.js` that still defines them.

:::warning This is not a stable API
These are internal `app.js` functions the plugins **take for granted**. They are not versioned or documented by the core, and may change without notice. Be defensive: use `window.showToast?.(...)` with optional chaining, as the official plugins do.
:::

## Language

The core **does not pass the language to the plugin**. Each plugin carries **its own dictionary** (`I18N`) and decides the language like this:

```js
function lang() {
    let value = document.documentElement.lang || localStorage.getItem('language') || 'es';
    // …
}
```

The language is read from the document's `lang` attribute or from `localStorage['language']`. `shape-creator`, for example, keeps one dictionary per language and **falls back to English** when it lacks the active language.

## Styles

The `frontend.style` sheet is injected into the page. The official plugins **prefix their classes** (`sc-` in `shape-creator`, `fl-` in `font-library`) so they do not clash with the core's or other plugins'. Do the same.

## Integration from the core: `NopalCameraCard`

`camera-viewer` also publishes the `window.NopalCameraCard` widget, which the core itself mounts on the device cards. See [Integrations with the core](./plugins-integraciones.md).
