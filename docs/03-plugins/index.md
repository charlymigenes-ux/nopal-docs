---
title: Plugins
sidebar_label: Plugins
audience: user
type: explanation
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
---

# Plugins

Un **plugin** añade funciones a NOPAL sin modificar la instalación principal. Se instalan, habilitan y quitan desde la **Galería de plugins** (la instalación y la baja requieren rol de administrador).

Cada plugin es un repositorio propio con un manifiesto `nopal-plugin.json`. Al arrancar, NOPAL carga el backend y la interfaz de los plugins instalados y habilitados; un plugin roto se omite sin impedir que NOPAL arranque.

:::warning Confía en lo que instalas
Los plugins se ejecutan **dentro del proceso de NOPAL**, con sus mismos privilegios, y no están aislados. Ver [Seguridad](../02-administracion/seguridad.md).
:::

## Plugins oficiales

Las páginas siguientes se **generan** desde el manifiesto y el código de cada plugin.

- [Matriz de plugins](./matriz-de-plugins.md): versiones, compatibilidad y desfases.
- [Matriz LED](./matriz-led.md)
- [Automatización de Taller](./arduino-accessories.md)
- [Cámaras](./camera-viewer.md)
- [Materiales (Spoolman)](./spoolman.md)
- [Cotizador](./cotizador.md)
- [Creador de formas](./shape-creator.md)
- [Herramientas SVG](./svg-toolkit.md)
- [Texto para fabricación](./font-library.md)

:::caution En construcción
Pendiente: el flujo de diseño para láser/CNC que une Creador de formas, Herramientas SVG y Texto para fabricación, y la guía de uso de cada plugin.
:::
