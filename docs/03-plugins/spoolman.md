---
title: Materiales
sidebar_label: Materiales
audience: user
type: reference
status: implemented
verified_against: "nopal@4346f72; nopal-plugin-spoolman@26fea1b"
generated: true
plugin_id: spoolman
plugin_version: "0.2.0"
---

# Materiales

:::note
Página **generada** automáticamente. No la edites a mano: corrige la fuente y vuelve a generar.
Fuentes: `nopal-plugin.json`, código del plugin y `plugin_catalog.json` (`nopal-plugin-spoolman@26fea1b`, `nopal@4346f72`).
:::

Conecta NOPAL con un servidor Spoolman para ver tu inventario real de spools de filamento, asignarlos a tus impresoras Klipper y usar sus costos reales en el Cotizador.

## Ficha

| Campo | Valor |
|---|---|
| id | `spoolman` |
| Versión (manifiesto) | 0.2.0 |
| Madurez | preliminar (0.x) |
| Categoría | Producción |
| Publicador | NOPAL Labs |
| Compatibilidad | Impresión 3D |
| Python mínimo (`python_requires`) | sin requisito propio (hereda el del core) |
| Backend | `backend/router.py` |
| Interfaz | `frontend/spoolman.js` · sección `spoolman` |
| Repositorio | [nopal-plugin-spoolman](https://github.com/charlymigenes-ux/nopal-plugin-spoolman) |
| Pruebas propias | Sí |
| Carpeta `docs/` propia | No |

## Permisos declarados

Son **texto informativo** para quien instala el plugin. NOPAL no los aplica como un sistema de permisos: el plugin se ejecuta dentro del proceso de NOPAL con sus mismos privilegios.

- Conectar con un servidor Spoolman en tu red
- Guardar qué spool está cargado en cada impresora
- Guardar reservas de material para producción

## API del plugin

Prefijo(s) de ruta: `/api/spoolman` · 17 rutas (Sesión (admin u operador): 11; Solo admin: 6; Pública: 0).

| Método | Ruta | Acceso | Política | Descripción |
|---|---|---|---|---|
| GET | `/api/spoolman/alerts` | Sesión (admin u operador) | — | — |
| GET | `/api/spoolman/config` | Sesión (admin u operador) | — | — |
| POST | `/api/spoolman/config` | Solo admin | — | — |
| DELETE | `/api/spoolman/config` | Solo admin | — | — |
| GET | `/api/spoolman/consumption/monthly` | Sesión (admin u operador) | — | — |
| GET | `/api/spoolman/discover` | Sesión (admin u operador) | — | Sondea localhost y la red local en busca de servidores Spoolman reales, para ofrecerlos como opción antes de forzar tipear host/puerto. |
| GET | `/api/spoolman/moonraker-check` | Sesión (admin u operador) | — | Por cada impresora Klipper con un carrete vinculado en NOPAL, revisa si Moonraker (no NOPAL) tiene su propio componente [spoolman] activo. |
| GET | `/api/spoolman/printers/{port}/active-spool` | Sesión (admin u operador) | — | — |
| POST | `/api/spoolman/printers/{port}/active-spool` | Solo admin | — | Asigna el carrete que la ficha de NOPAL muestra para esta impresora. |
| DELETE | `/api/spoolman/printers/{port}/active-spool` | Solo admin | — | — |
| GET | `/api/spoolman/printers/active-spools` | Sesión (admin u operador) | — | Qué carrete tiene cargado cada impresora. |
| GET | `/api/spoolman/reservations` | Sesión (admin u operador) | — | — |
| POST | `/api/spoolman/reservations` | Solo admin | — | — |
| DELETE | `/api/spoolman/reservations/{reservation_id}` | Solo admin | — | — |
| GET | `/api/spoolman/spools` | Sesión (admin u operador) | — | — |
| GET | `/api/spoolman/spools/{spool_id}` | Sesión (admin u operador) | — | — |
| GET | `/api/spoolman/summary` | Sesión (admin u operador) | — | — |

## Notas verificadas

- Integración opcional con el Cotizador: un `material_id` con la forma `spoolman:<id_de_carrete>` enviado a `POST /api/pricing/quote` toma el costo de este plugin en lugar de `pricing_config.json`. Spoolman sigue siendo la fuente de verdad del inventario. <small>(evidencia: `nopal-plugin-spoolman/README.md`)</small>
- Requiere un servidor Spoolman accesible en la red (el README propone ejecutarlo con Docker en el puerto 7912). <small>(evidencia: `nopal-plugin-spoolman/README.md`)</small>

## Más información

- [README del plugin](https://github.com/charlymigenes-ux/nopal-plugin-spoolman#readme)
