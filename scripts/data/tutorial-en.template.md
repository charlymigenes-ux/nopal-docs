---
title: "Tutorial: your first plugin (Hello NOPAL)"
sidebar_label: "Tutorial: first plugin"
sidebar_position: 9
audience: developer
type: tutorial
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
source_commit: "a5853dc"
---

# Tutorial: your first plugin (Hello NOPAL)

In this tutorial you create a minimal plugin that adds a section to NOPAL with a button. When pressed, the plugin calls its own backend and shows who you are. You go through the whole contract: manifest, backend, frontend, tests and installation.

:::info What is tested and what is not
- **Steps 1 to 5: tested.** The backend was run with NOPAL's **real loader** (`nopal@a5853dc`) and its two tests pass. The frontend was run in a browser, on a test page that imitates the core's hook points (menu, `.content`, `switchSection`).
- **Step 6 (installing it in a real NOPAL): not tested.** The full application was not run. The steps come from reading the code of the installer, the loader and the Gallery. If something does not match, it is a defect in this page: report it.
- The test was run with Python 3.14. NOPAL supports Python 3.9 or later; the example uses nothing that needs a newer version, but it was not run on 3.9.
:::

## Before you start

You need:

- A **checkout of the NOPAL core**. See [Environment and tests](./entorno-y-pruebas.md).
- **Python** with `pytest`, `fastapi` and `httpx` (the core's `requirements-dev.txt` provides them).
- A text editor.

The full code of this tutorial is in the documentation repository, under `examples/hello-nopal/`.

## 1. Structure

Create this folder. **The folder name must equal the plugin's `id`**, because NOPAL looks for it in `plugins/<id>/`.

```text
hello-nopal/
├── nopal-plugin.json
├── backend/
│   └── router.py
├── frontend/
│   ├── hello-nopal.js
│   └── hello-nopal.css
└── tests/
    └── test_router.py
```

## 2. The manifest

```json title="nopal-plugin.json"
{{nopal-plugin.json}}
```

Of all these fields, the core only reads `version`, `backend.entry`, `frontend.script` and `frontend.style`. The rest is descriptive. See [the manifest](./plugins-manifiesto.md).

## 3. The backend

```python title="backend/router.py"
{{backend/router.py}}
```

Key points:

- The variable is named **`router`**: the loader looks it up by that name.
- Routes are **full** and carry their own prefix (`/api/hello-nopal/`).
- `require_auth` requires a session; `require_role("admin")` requires the administrator role. They are imported from the core with an absolute path.

## 4. The frontend

```javascript title="frontend/hello-nopal.js"
{{frontend/hello-nopal.js}}
```

```css title="frontend/hello-nopal.css"
{{frontend/hello-nopal.css}}
```

Key points:

- The script is a **function that runs when loaded** and **ends by calling `mount()`**: the core does not call it for you.
- The guard at the top avoids registering the plugin twice.
- `mount()` creates the menu button in the plugins category and the section inside `.content`.
- `unmount()` undoes **everything** `mount()` did. The core calls it on uninstall.
- The `window.switchSection`, `window.applySidebarOrder` and `window.showToast` functions are internal to the core. They are used with `?.` in case they change. See [frontend](./plugins-frontend.md).
- Classes carry the `hn-` prefix so they do not clash with others.

## 5. Test the backend

```python title="tests/test_router.py"
{{tests/test_router.py}}
```

The test copies your plugin to a temporary folder, marks it as installed and calls **`load_installed_plugin_routers`**, the same function NOPAL runs at startup. It replaces `require_auth` to simulate an operator user and an administrator, without real sessions.

Run it from the plugin folder:

```bash
export NOPAL_CORE_ROOT=/path/to/the/nopal/checkout
```

```bash
pytest tests
```

**Check:** `2 passed`.

## 6. Install it in your NOPAL

:::warning Step not tested on a real installation
See the notice at the top. Do it on a test installation, not the one you use every day.
:::

Today there is no publishing mechanism for third parties, so it is installed **by hand**.

1. **Copy the folder** `hello-nopal` to `plugins/hello-nopal/`, inside the NOPAL folder.

2. **Mark it as installed.** Create or edit `data/plugins/installed.json`:

```json
{
  "hello-nopal": {
    "version": "0.1.0",
    "enabled": true,
    "installed_at": "2026-01-01T00:00:00+00:00"
  }
}
```

3. **Add a temporary catalog entry.** The plugin's interface is only handed out to plugins listed in `backend/plugin_catalog.json`. Add this object to the list, copying the fields of an existing entry (use a category that already exists):

```json
{
  "id": "hello-nopal",
  "name": "Hola NOPAL",
  "version": "0.1.0",
  "publisher": "Tu nombre",
  "category": "Producción",
  "description": "Plugin de ejemplo.",
  "long_description": "Plugin de ejemplo que muestra un saludo.",
  "icon": "grid",
  "accent": "#22c55e",
  "compatibility": ["Impresión 3D", "Láser", "CNC"],
  "permissions": [],
  "size": "Por definir",
  "featured": false,
  "availability": "available",
  "pricing": { "type": "free" },
  "repo_url": ""
}
```

:::caution Do not commit it
`plugin_catalog.json` is a versioned core file. While you have this local change, **NOPAL's automatic update will be blocked** ("Hay cambios locales sin guardar en el servidor", unsaved local changes). Remove it when you finish.
:::

4. **Restart NOPAL.** The plugin's backend is only loaded at startup:

```bash
sudo systemctl restart nopal
```

5. **Try it.** Sign in to NOPAL, find **Hello NOPAL** (or **Hola NOPAL**, depending on your language) in the plugins menu and press the button. You should see:

```text
Hola NOPAL, <your user> (admin)
```

### Remove it

1. Delete `plugins/hello-nopal/`.
2. Delete its entry from `data/plugins/installed.json`.
3. Delete the entry added to `backend/plugin_catalog.json`.
4. Restart NOPAL.

## 7. What you learned and what is missing

You went through the whole contract: a manifest, a `router`, a script that mounts itself and a test against the real loader.

What this plugin does **not** do, and what does not exist in NOPAL today:

- It declares no Python dependencies: NOPAL installs nothing from a plugin.
- Its permissions are not enforced: the manifest is informational.
- It cannot be published to the Gallery without a change to the core catalog.
- It receives no events from the core: there is no event bus.

Those ideas are in [RFC](/07-rfc). To see real plugins, see the [official plugin sheets](../03-plugins/index.md).
