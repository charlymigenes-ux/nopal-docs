---
title: Developers
sidebar_label: Developers
audience: developer
type: explanation
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
source_commit: "4346f72"
---

# Developers

How NOPAL is built and how to extend it.

## NOPAL inside

- [Architecture](./arquitectura.md)
- [Development environment and tests](./entorno-y-pruebas.md)
- [Contributing](./contribuir.md)

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
Pending: adding a device driver, a first-plugin tutorial and the design system.
:::
