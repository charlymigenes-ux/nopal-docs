---
title: "Plugin system: installation and Gallery"
sidebar_label: "Plugins: installation and Gallery"
sidebar_position: 6
audience: developer
type: reference
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
source_commit: "4346f72"
---

# Plugin system: installation and Gallery

How NOPAL installs, updates and removes a plugin, and what it takes to appear in the Gallery.

## The curated catalog

The Gallery shows the plugins in `backend/plugin_catalog.json`, a **project-curated** file that lives in the core. Each entry describes a plugin for the Gallery and points to its repository:

| Field | Use |
|---|---|
| `id` | Identifier; it is the name of the `plugins/<id>/` folder |
| `name`, `description`, `long_description`, `publisher`, `category` | Card texts |
| `icon`, `accent`, `banner_image` | Card appearance |
| `compatibility`, `permissions` | Displayed tags and permissions |
| `version` | Announced version. For an installed plugin the manifest's wins |
| `python_requires` | Optional. Lets the requirement be known **before cloning** |
| `availability` | `available` (installable) or `coming_soon` (not installable) |
| `pricing` | `{"type": "free"}`. Any other type is rejected |
| `repo_url` | Git repository that is cloned |
| `featured`, `size` | Featured flag and displayed size |

Gallery texts can be translated with `pluginCatalog_<id>_<field>` keys (hyphens in the id become underscores, for example `pluginCatalog_matriz_led_name`) in the core's translation files; if the key does not exist, the catalog text is used.

:::info The catalog announces plugins that do not exist yet
Two entries are listed as `coming_soon` (`gcode-optimizer`, `material-library`). They are **announcements**, not installable plugins.
:::

## Install (administrators only)

`POST /api/plugins/{id}/install`. NOPAL checks, in this order:

1. That the plugin is **in the catalog**. If not, it answers 404.
2. That `availability` is `available`. If not, 409.
3. That `pricing.type` is `free`. Paid plugins answer 501: *the license server does not exist yet*.
4. That there is a `repo_url`.
5. That the server's Python meets the catalog's `python_requires` (409 if not).
6. That the plugin is not already installed (409).

Then it runs `git clone --depth 1 <repo_url> plugins/<id>` (with a 60 s limit) and:

- If the repository **has no valid `nopal-plugin.json`** at the root, it deletes what was cloned and fails. It does not leave half-installed folders.
- If the manifest demands more Python than the server has, it **removes the plugin** and fails.
- If all goes well, it records the plugin in `data/plugins/installed.json` with its version, `enabled: true` and the date.

## Update (administrators only)

`POST /api/plugins/{id}/update` runs `git fetch` and `git pull --ff-only` on the plugin's current branch, and compares the SHA before and after.

- If `ff-only` fails (local changes or diverged history), it is not updated.
- If something under `backend/` changed, the response carries `backend_changed: true` and the interface warns that **NOPAL must be restarted** to load the new code.
- If only the frontend changed, the interface reloads the page.

## Uninstall (administrators only)

`DELETE /api/plugins/{id}` deletes the entry from `installed.json` and the `plugins/<id>/` folder. The interface also runs the plugin's `unmount()` and removes its script and style.

The **state the plugin saved** (for example `camera_registry.json` or `data/accessories/…`) **is not deleted**.

## Manual installation for development

To try a plugin without going through the Gallery:

1. Copy (or clone) your plugin into `plugins/<id>/`, in the NOPAL folder.
2. Add its entry to `data/plugins/installed.json`:

```json
{
  "my-plugin": {
    "version": "0.1.0",
    "enabled": true,
    "installed_at": "2026-01-01T00:00:00+00:00"
  }
}
```

3. **Restart NOPAL.** The backend is loaded at startup.

:::warning The frontend requires a catalog entry
The backend is loaded from `installed.json`. But the list that hands out the plugins' interface comes from the **catalog**: a plugin with no entry in `plugin_catalog.json` **does not receive its frontend**. To develop it locally, temporarily add an entry to the catalog with the same `id`.
:::

## Publish a plugin in the Gallery

**Today there is no publishing mechanism for third parties.** For a plugin to appear in the Gallery, its entry must be **added to the core's `backend/plugin_catalog.json`**, that is, a change accepted by the project. An open publishing system and paid plugins (which require a license server) are proposals, not existing features.

Practical requirements for a plugin to be installable:

- An accessible git repository, with `nopal-plugin.json` at the root.
- `availability: "available"` and `pricing.type: "free"`.
- Compatibility with the **core's minimum Python version** (3.9), or a `python_requires` that declares it.

## Compatibility check in CI

The core CI's `plugins-compat` job clones the tip of each catalog plugin's default branch, runs its tests with Python 3.9 and checks that its backend loads with the real loader. A plugin whose `python_requires` is incompatible with that Python is marked `N/A`.
