---
title: Roadmap
sidebar_label: Roadmap
sidebar_position: 1
audience: reference
type: reference
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
source_commit: "a5853dc"
---

# Roadmap

:::caution Not a commitment
NOPAL is a small project with a single maintainer. What follows are **possible areas of work**, not dates or promises. The source is the *Roadmap* section of the project README ("potential future areas"), plus the technical proposals in this documentation.
:::

## Areas the project mentions

According to NOPAL's README:

- **Richer metadata for the model library**: tags, collections and search filters.
- **Better analytics and history** for print, laser and CNC jobs.
- **External storage integration.**
- **Discovering the right run-from-SD-card command** for more GRBL firmware variants (running directly from the SD card instead of streaming the G-code).

## Technical proposals

The documentation has identified gaps in the plugin system and written them up as drafts. **They are not approved**:

| RFC | Topic |
|---|---|
| [RFC-0001](/07-rfc/rfc-0001-api-de-plugins-versionada) | Versioned plugin API and lifecycle |
| [RFC-0002](/07-rfc/rfc-0002-permisos-con-aplicacion-forzada) | Enforced permissions |
| [RFC-0003](/07-rfc/rfc-0003-dependencias-por-plugin) | Per-plugin dependencies |
| [RFC-0004](/07-rfc/rfc-0004-eventos-y-tareas-de-fondo) | Events and background tasks |
| [RFC-0005](/07-rfc/rfc-0005-metadatos-y-validacion-del-manifiesto) | Single source of metadata |
| [RFC-0006](/07-rfc/rfc-0006-sdk-plantilla-y-publicacion) | SDK, template and publishing |

## Known limitations today

These are not plans, but things that **do not exist yet** and are worth knowing:

- A versioned plugin API and a way to publish third-party plugins.
- An enforced permission system for plugins.
- An action to **disable** a plugin.
- A background task scheduler for plugins.
- The project hook that the *Text for fabrication* plugin expects for "Add to project".

## How to influence it

Open an *issue* in NOPAL's repository describing the problem you want to solve, or register the hardware you own on the collaboration page. See [Contributing](/05-desarrolladores/contribuir).
