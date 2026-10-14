---
title: "Plugin system: integrations with the core and between plugins"
sidebar_label: "Plugins: integrations"
sidebar_position: 7
audience: developer
type: reference
status: convention
verified_against: "nopal@4346f72 (2026-10-07)"
source_commit: "4346f72"
---

# Plugin system: integrations with the core and between plugins

Besides the basic contract (manifest, `router`, `NopalPluginRegistry`), there are couplings that **work today but are not declared in any manifest nor formalized**. This page describes them with their status.

| Integration | Status |
|---|---|
| `NopalCameraCard` (core → `camera-viewer`) | `convention` |
| `AI_TOOLS` (plugin → NOPAL Intelligence) | `experimental` |
| Project hooks `NopalPluginContext` and `NopalProject.addElement` (consumed by `font-library`) | `experimental` |
| Shared material `spoolman:<id>` (`spoolman` → `cotizador`) | `convention` |
| Direct core imports from a plugin | `convention` |

## `NopalCameraCard`: the core mounts a plugin widget

**Status: convention.** `camera-viewer` exposes, besides its own section, the `window.NopalCameraCard` widget (`frontend/camera-card.js`). The **core itself** mounts it on the Klipper, laser, CNC and Marlin device cards.

```js
window.NopalCameraCard?.mount(container, {
    deviceType: 'klipper',      // 'klipper' | 'laser' | 'cnc' | 'marlin'
    deviceId: 'my-printer',
    compact: true               // optional
});

window.NopalCameraCard?.unmount(container);
```

The core calls it with optional chaining (`?.`): **if `camera-viewer` is not installed, the card simply shows no camera**. It is how the core uses a plugin feature without depending on it. There is no formal contract: the `mount` and `unmount` signature is what the core uses today.

## `AI_TOOLS`: a plugin offers tools to NOPAL Intelligence

**Status: experimental.** If the entry module of a plugin's backend (`backend/router.py`) defines an `AI_TOOLS` variable, NOPAL Intelligence picks it up and exposes those tools.

- Each element must be a `Tool` from `backend.services.ai_tools`. It is imported lazily.
- An invalid value (not iterable, or an element that is not a `Tool`) is **skipped with a warning**; it never breaks the AI layer.
- Each `Tool` must declare `policy_action` (`Action.USE_PLUGIN` or `Action.CONFIGURE_PLUGIN`) and whether it is `read_only`. Non-conforming tools are skipped with a warning in the log.
- There is no auto-confirm flow: identity always comes from the session of whoever is chatting.
- Only modules of **installed** plugins are considered.
- The tools respect the authorization of whoever is chatting: the core has a specific test for it.

No official plugin declares it today. It may change without notice.

## `NopalPluginContext`: optional project context

**Status: experimental.** `font-library` optionally queries `window.NopalPluginContext` (with `getCurrentProject()` or a `currentProject` property) and `window.__NOPAL_PROJECT_CONTEXT__` to learn the active project and its material. **No reviewed repository defines that provider**: the plugin works without it.

### `NopalProject.addElement`: a hook the core does not implement

`font-library` delivers its result with `window.NopalProject.addElement(detail)` and, if that does not exist, dispatches the cancelable `nopal:add-project-element` event on `window`. **The core defines neither**: today the *Add to project* button shows a success notice but the data is not saved anywhere (as the plugin's README states). It waits for the core to implement it.

## Shared material between `spoolman` and `cotizador`

**Status: convention.** A `material_id` of the form `spoolman:<spool_id>` sent to `POST /api/pricing/quote` takes its cost from `spoolman` instead of `pricing_config.json`. Spoolman remains the source of truth for inventory; the plugin only stores reference identifiers. Neither manifest declares it.

## Direct core imports

**Status: convention.** Plugins with a backend import core modules with **absolute imports**, for example `backend.auth_deps`. `arduino-accessories` also imports `backend.services.laser_service` and `backend.services.marlin_printer_service` to skip USB ports already used by a laser/CNC or a Marlin printer.

It is a hard coupling: **if the core renames or moves those modules, the plugin breaks**, and no mechanism versions that interface. That is why a plugin's tests need a checkout of the core (`NOPAL_CORE_ROOT`).
