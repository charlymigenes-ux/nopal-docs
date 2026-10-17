---
title: Desarrolladores
sidebar_label: Desarrolladores
audience: developer
type: explanation
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
---

# Desarrolladores

Cómo está construido NOPAL y cómo extenderlo.

## NOPAL por dentro

- [Arquitectura](./arquitectura.md)
- [Entorno de desarrollo y pruebas](./entorno-y-pruebas.md)
- [Contribuir](./contribuir.md)
- [Tutorial: tu primer plugin](./tutorial-primer-plugin.md)
- [Añadir un driver](./anadir-un-driver.md)

## Sistema de plugins

Lo que existe hoy, verificado contra el código:

1. [Estructura y manifiesto](./plugins-manifiesto.md)
2. [Backend](./plugins-backend.md)
3. [Frontend](./plugins-frontend.md)
4. [Instalación y Galería](./plugins-instalacion-y-galeria.md)
5. [Integraciones con el core y entre plugins](./plugins-integraciones.md)

Cada plugin oficial tiene además su [ficha generada](../03-plugins/index.md).

:::info Esto no es todavía un SDK
No existe una API de plugins versionada, un sistema de permisos aplicado, dependencias por plugin, un bus de eventos ni una plantilla oficial. Esas ideas están en [RFC](/07-rfc).
:::

:::caution En construcción
Pendiente: el sistema de diseño.
:::
