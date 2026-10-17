---
title: Developers
sidebar_label: Developers
audience: developer
type: explanation
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
source_commit: "a5853dc"
---

# Developers

How NOPAL is built and how to extend it.

## NOPAL inside

- [Architecture](./arquitectura.md)
- [Development environment and tests](./entorno-y-pruebas.md)
- [Contributing](./contribuir.md)
- [Tutorial: your first plugin](./tutorial-primer-plugin.md)
- [Add a driver](./anadir-un-driver.md)

## Plugin system

What exists today, verified against the code:

1. [Structure and manifest](./plugins-manifiesto.md)
2. [Backend](./plugins-backend.md)
3. [Frontend](./plugins-frontend.md)
4. [Installation and Gallery](./plugins-instalacion-y-galeria.md)
5. [Integrations with the core and between plugins](./plugins-integraciones.md)

Each official plugin also has a [generated sheet](../03-plugins/index.md).

:::info This is not an SDK yet
There is no versioned plugin API, enforced permission system, per-plugin dependencies, event bus or official template. Those ideas are in [RFC](/07-rfc).
:::

:::caution Under construction
Pending: the design system.
:::
