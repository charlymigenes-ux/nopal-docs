---
title: "Sistema de plugins: integraciones con el core y entre plugins"
sidebar_label: "Plugins: integraciones"
sidebar_position: 7
audience: developer
type: reference
status: convention
verified_against: "nopal@4346f72 (2026-10-07)"
---

# Sistema de plugins: integraciones con el core y entre plugins

Además del contrato básico (manifiesto, `router`, `NopalPluginRegistry`), hay acoplamientos que **funcionan hoy pero no están declarados en ningún manifiesto ni formalizados**. Esta página los describe con su estado.

| Integración | Estado |
|---|---|
| `NopalCameraCard` (core → `camera-viewer`) | `convention` |
| `AI_TOOLS` (plugin → NOPAL Intelligence) | `experimental` |
| Hooks de proyecto `NopalPluginContext` y `NopalProject.addElement` (consumidos por `font-library`) | `experimental` |
| Material compartido `spoolman:<id>` (`spoolman` → `cotizador`) | `convention` |
| Imports directos del core desde un plugin | `convention` |

## `NopalCameraCard`: el core monta un widget del plugin

**Estado: convention.** `camera-viewer` expone, además de su sección, el widget `window.NopalCameraCard` (`frontend/camera-card.js`). El **propio core** lo monta en las fichas de dispositivo de Klipper, láser, CNC y Marlin.

```js
window.NopalCameraCard?.mount(contenedor, {
    deviceType: 'klipper',      // 'klipper' | 'laser' | 'cnc' | 'marlin'
    deviceId: 'mi-impresora',
    compact: true               // opcional
});

window.NopalCameraCard?.unmount(contenedor);
```

El core lo invoca con encadenamiento opcional (`?.`): **si `camera-viewer` no está instalado, la ficha simplemente no muestra cámara**. Es la forma en que el core usa una función de un plugin sin dependerse de él. No hay contrato formal: la firma de `mount` y `unmount` es lo que hoy usa el core.

## `AI_TOOLS`: un plugin ofrece herramientas a NOPAL Intelligence

**Estado: experimental.** Si el módulo de entrada del backend de un plugin (`backend/router.py`) define una variable `AI_TOOLS`, NOPAL Intelligence la recoge y expone esas herramientas.

- Cada elemento debe ser un `Tool` de `backend.services.ai_tools`. Se importa de forma perezosa.
- Un valor inválido (no iterable, o un elemento que no es un `Tool`) se **omite con una advertencia**; nunca rompe la capa de IA.
- Solo se consideran módulos de plugins **instalados**.
- Las herramientas respetan la autorización de quien conversa: existe una prueba específica de ello en el core.

Ningún plugin oficial lo declara hoy. Puede cambiar sin aviso.

## `NopalPluginContext`: contexto de proyecto opcional

**Estado: experimental.** `font-library` consulta, de forma opcional, `window.NopalPluginContext` (con `getCurrentProject()` o una propiedad `currentProject`) y `window.__NOPAL_PROJECT_CONTEXT__` para saber el proyecto activo y su material. **Ningún repositorio revisado define ese proveedor**: el plugin funciona sin él.

### `NopalProject.addElement`: un gancho que el core no implementa

`font-library` entrega su resultado con `window.NopalProject.addElement(detalle)` y, si no existe, dispara el evento cancelable `nopal:add-project-element` en `window`. **El core no define ni uno ni otro**: hoy el botón *Agregar al proyecto* muestra un aviso de éxito pero los datos no se guardan en ningún sitio (así lo indica el README del plugin). Queda a la espera de que el core lo implemente.

## Material compartido entre `spoolman` y `cotizador`

**Estado: convention.** Un `material_id` con la forma `spoolman:<id_de_carrete>` enviado a `POST /api/pricing/quote` toma el costo desde `spoolman` en lugar de `pricing_config.json`. Spoolman sigue siendo la fuente de verdad del inventario; el plugin solo guarda identificadores de referencia. Ninguno de los dos manifiestos lo declara.

## Imports directos del core

**Estado: convention.** Los plugins con backend importan módulos del core con **imports absolutos**, por ejemplo `backend.auth_deps`. `arduino-accessories` importa además `backend.services.laser_service` y `backend.services.marlin_printer_service` para saltarse los puertos USB que ya usa un láser/CNC o una impresora Marlin.

Es un acoplamiento duro: **si el core renombra o mueve esos módulos, el plugin se rompe**, y ningún mecanismo versiona esa interfaz. Por eso las pruebas de un plugin necesitan un *checkout* del core (`NOPAL_CORE_ROOT`).
