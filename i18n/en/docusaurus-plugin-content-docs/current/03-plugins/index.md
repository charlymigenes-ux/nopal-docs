---
title: Plugins
sidebar_label: Plugins
audience: user
type: explanation
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
source_commit: "4346f72"
---

# Plugins

A **plugin** adds features to NOPAL without modifying the main installation. They are installed, enabled and removed from the **Plugin Gallery** (installing and removing require the administrator role).

Each plugin is its own repository with a `nopal-plugin.json` manifest. On startup, NOPAL loads the backend and the interface of installed, enabled plugins; a broken plugin is skipped without preventing NOPAL from starting.

:::warning Trust what you install
Plugins run **inside the NOPAL process**, with its same privileges, and are not isolated. See [Security](../02-administracion/seguridad.md).
:::

## Official plugins

The following pages are **generated** from each plugin's manifest and code.

- [Plugin matrix](./matriz-de-plugins.md): versions, compatibility and drift.
- [LED Matrix](./matriz-led.md)
- [Workshop Automation](./arduino-accessories.md)
- [Cameras](./camera-viewer.md)
- [Materials (Spoolman)](./spoolman.md)
- [Cotizador](./cotizador.md)
- [Shape creator](./shape-creator.md)
- [SVG tools](./svg-toolkit.md)
- [Text for fabrication](./font-library.md)

:::caution Under construction
Pending: the laser/CNC design flow that joins Shape creator, SVG tools and Text for fabrication, and a usage guide for each plugin.
:::
