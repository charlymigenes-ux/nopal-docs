---
title: Materiales
sidebar_label: Materiales
audience: user
type: reference
status: implemented
verified_against: "nopal@b9aa473; nopal-plugin-spoolman@255486c"
generated: true
plugin_id: spoolman
plugin_version: "0.3.0"
---

# Materiales

:::note
Página **generada** automáticamente. No la edites a mano: corrige la fuente y vuelve a generar.
Fuentes: `nopal-plugin.json`, código del plugin y `plugin_catalog.json` (`nopal-plugin-spoolman@255486c`, `nopal@b9aa473`).
:::

Conecta NOPAL con un servidor Spoolman para ver tu inventario real de spools de filamento, asignarlos a tus impresoras Klipper y usar sus costos reales en el Cotizador.

## Ficha

| Campo | Valor |
|---|---|
| id | `spoolman` |
| Versión (manifiesto) | 0.3.0 |
| Madurez | preliminar (0.x) |
| Categoría | Producción |
| Publicador | NOPAL Labs |
| Compatibilidad | Impresión 3D |
| Python mínimo (`python_requires`) | sin requisito propio (hereda el del core) |
| Backend | `backend/router.py` |
| Interfaz | `frontend/spoolman.js` · sección `spoolman` |
| Repositorio | [nopal-plugin-spoolman](https://github.com/charlymigenes-ux/nopal-plugin-spoolman) |
| Pruebas propias | Sí |
| Carpeta `docs/` propia | Sí |

## Permisos declarados

Son **texto informativo** para quien instala el plugin. NOPAL no los aplica como un sistema de permisos: el plugin se ejecuta dentro del proceso de NOPAL con sus mismos privilegios.

- Conectar con un servidor Spoolman en tu red
- Guardar qué spool está cargado en cada impresora
- Guardar reservas de material para producción
- Modificar el inventario de Spoolman (solo administradores): pesar, registrar uso, mover y archivar carretes
- Pedir a Spoolman una copia de su base de datos (solo administradores)
- Ofrecer a NOPAL Intelligence consultas de solo lectura del inventario

## Desfase de versiones

El manifiesto debería ser la fuente de verdad (Standard §6.4). Se detectan valores distintos en:

| Dónde | Valor encontrado | Manifiesto |
|---|---|---|
| plugin_catalog.json | 0.2.0 | 0.3.0 |

## NOPAL Intelligence

Este plugin declara `AI_TOOLS` (punto de extensión **experimental**).

## API del plugin

Prefijo(s) de ruta: `/api/spoolman` · 25 rutas (Sesión (admin u operador): 14; Solo admin: 11; Pública: 0).

| Método | Ruta | Acceso | Política | Descripción |
|---|---|---|---|---|
| GET | `/api/spoolman/alerts` | Sesión (admin u operador) | — | — |
| POST | `/api/spoolman/backup` | Solo admin | — | Pide a Spoolman una copia de su base de datos (la guarda él, en su propio equipo; NOPAL no la descarga). |
| GET | `/api/spoolman/changes` | Sesión (admin u operador) | — | Huella barata del inventario, para que el panel sepa si algo cambió (por Spoolman, por Moonraker al terminar una impresión, por otra person… |
| GET | `/api/spoolman/config` | Sesión (admin u operador) | — | — |
| POST | `/api/spoolman/config` | Solo admin | — | — |
| DELETE | `/api/spoolman/config` | Solo admin | — | — |
| GET | `/api/spoolman/consumption/monthly` | Sesión (admin u operador) | — | — |
| GET | `/api/spoolman/discover` | Sesión (admin u operador) | — | Sondea localhost y la red local en busca de servidores Spoolman reales, para ofrecerlos como opción antes de forzar tipear host/puerto. |
| GET | `/api/spoolman/filaments` | Sesión (admin u operador) | — | — |
| GET | `/api/spoolman/locations` | Sesión (admin u operador) | — | — |
| GET | `/api/spoolman/moonraker-check` | Sesión (admin u operador) | — | Por cada impresora Klipper con un carrete vinculado en NOPAL, revisa si Moonraker (no NOPAL) tiene su propio componente [spoolman] activo. |
| GET | `/api/spoolman/printers/{port}/active-spool` | Sesión (admin u operador) | — | — |
| POST | `/api/spoolman/printers/{port}/active-spool` | Solo admin | — | Asigna el carrete que la ficha de NOPAL muestra para esta impresora. |
| DELETE | `/api/spoolman/printers/{port}/active-spool` | Solo admin | — | — |
| GET | `/api/spoolman/printers/active-spools` | Sesión (admin u operador) | — | Qué carrete tiene cargado cada impresora. |
| GET | `/api/spoolman/reservations` | Sesión (admin u operador) | — | — |
| POST | `/api/spoolman/reservations` | Solo admin | — | — |
| DELETE | `/api/spoolman/reservations/{reservation_id}` | Solo admin | — | — |
| GET | `/api/spoolman/spools` | Sesión (admin u operador) | — | — |
| POST | `/api/spoolman/spools` | Solo admin | — | — |
| GET | `/api/spoolman/spools/{spool_id}` | Sesión (admin u operador) | — | — |
| PATCH | `/api/spoolman/spools/{spool_id}` | Solo admin | — | Solo ubicación, archivado y comentario: lo que el panel necesita. El resto de los campos se edita en la interfaz de Spoolman. |
| PUT | `/api/spoolman/spools/{spool_id}/measure` | Solo admin | — | Peso bruto medido en la báscula (carrete + filamento); Spoolman descuenta el peso del carrete vacío y calcula lo que queda. |
| PUT | `/api/spoolman/spools/{spool_id}/use` | Solo admin | — | — |
| GET | `/api/spoolman/summary` | Sesión (admin u operador) | — | — |

## Notas verificadas

- Integración opcional con el Cotizador: un `material_id` con la forma `spoolman:<id_de_carrete>` enviado a `POST /api/pricing/quote` toma el costo de este plugin en lugar de `pricing_config.json`. Spoolman sigue siendo la fuente de verdad del inventario. <small>(evidencia: `nopal-plugin-spoolman/README.md`)</small>
- Requiere un servidor Spoolman accesible en la red por HTTP plano, sin credenciales ni subruta (la guía de Spoolman recomienda Docker Compose, con el puerto 7912). Ver la guía de instalación del plugin. <small>(evidencia: `nopal-plugin-spoolman/README.md`)</small>
- Desde la versión 0.3.0, un administrador puede pesar, registrar uso, mover y archivar carretes desde NOPAL (cada acción pide confirmación y la ejecuta Spoolman) y pedir una copia de la base de datos de Spoolman. Las herramientas de NOPAL Intelligence `find_spools` y `get_printer_spools` son de solo lectura. El panel consulta cada 10 segundos si el inventario cambió; no hay canal push. <small>(evidencia: `nopal-plugin-spoolman/docs/overview.md`)</small>

## Más información

- [README del plugin](https://github.com/charlymigenes-ux/nopal-plugin-spoolman#readme)
