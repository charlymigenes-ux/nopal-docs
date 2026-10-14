# Auditoría 01 — Sistema de plugins de NOPAL

Fecha: 2026-10-14 · Alcance: core `nopal` + 8 plugins · Excluido: `MKS-DLC32-FIRMWARE`

**Fuentes verificadas**
- Manifiestos `nopal-plugin.json` leídos desde GitHub (rama por defecto de cada repo).
- `backend/services/plugin_loader_service.py` y `backend/static/js/app.js` del checkout local.

> **Advertencia de frescura:** el checkout local (`TUNA-Screen/repo-nopal`) va por detrás de GitHub.
> Por ejemplo, GitHub registra `python_requires` desde el 2026-10-06 y el local no lo contiene.
> La auditoría de código definitiva debe hacerse contra el `main` actual.

Estado de cada afirmación: **[V]** verificado en fuente · **[R]** según README, pendiente de verificar en código · **[?]** sin verificar.

---

## 1. Matriz de manifiestos [V]

| Plugin (id) | Nombre en UI | Versión | Categoría | Backend (`backend.entry`) | Frontend (sección) | Compatibilidad | Python |
|---|---|---|---|---|---|---|---|
| `matriz-led` | Matriz LED | 0.10.0 | Accesorios | `backend/router.py` | `matriz-led` | 3D, Láser, CNC | ≥ 3.10 |
| `arduino-accessories` | Automatización de Taller | 2.6.0 | Accesorios | `backend/router.py` | `arduino-accessories` | 3D, Láser, CNC | — |
| `camera-viewer` | Cámaras | 1.4.0 | Producción | `backend/router.py` | `camera-viewer` | 3D, Láser, CNC | — |
| `spoolman` | Materiales | 0.2.0 | Producción | `backend/router.py` | `spoolman` | 3D | — |
| `cotizador` | Cotizador | 1.1.0 | Producción | `backend/router.py` | `pricing` | 3D, Láser, CNC | — |
| `shape-creator` | Creador de formas | 1.2.0 | Diseño | **ninguno** | `shape-creator` | Láser, CNC | — |
| `svg-toolkit` | Herramientas SVG | 0.9.0 | Diseño | **ninguno** | `svg-toolkit` | Láser, CNC | — |
| `font-library` | Texto para fabricación | 0.5.1 | Diseño | **ninguno** | `font-library` | Láser, CNC | — |

Todos: `schema_version: 1`, `publisher: "NOPAL Labs"`.

Observaciones
- Tres plugins son **solo frontend** (`shape-creator`, `svg-toolkit`, `font-library`). El cargador lo trata como caso normal.
- Ninguna versión llega a 2.x salvo `arduino-accessories`; varios están en 0.x. Documentar madurez por plugin.
- `cotizador` usa la sección `pricing`, distinta de su id. Es un caso a explicar en la guía.

## 2. Contrato de manifiesto observado [V]

Campos presentes en los 8 manifiestos:

```
schema_version  id  name  version  publisher  category
description  permissions[]  compatibility[]
frontend { script, style, section }
backend  { entry }            (opcional)
python_requires               (opcional; solo matriz-led lo usa)
```

Hallazgo importante: **`permissions` son textos legibles para humanos en español** (por ejemplo
"Detectar webcams USB"), no identificadores como `devices.read`. Informan al usuario; no hay evidencia de que
el core los haga cumplir. Documentar como **declarativos**, no como un sistema de permisos.

## 3. Mecanismo de carga

### Backend [V] (`plugin_loader_service.py`)
1. En el arranque, `load_installed_plugin_routers(app)` recorre los plugins instalados **y habilitados**.
2. Lee el manifiesto y resuelve `backend.entry` dentro de `plugins/<id>/`; rechaza rutas fuera de su carpeta.
3. Registra `backend/` como paquete `nopal_plugins.<id_con_guiones_bajos>` (permite imports relativos).
4. Importa el módulo de entrada y exige una variable de módulo **`router`** (`APIRouter`).
5. Hace `app.include_router(router)`. El plugin define sus propias rutas completas (**corregido en AUDITORIA_03**: no hay prefijo común; cada plugin usa el suyo).
6. Un plugin roto se salta con un log; **no tumba el arranque**.

### Puntos de extensión adicionales [V]
- **`AI_TOOLS`**: si el módulo de entrada define esta lista de `backend.services.ai_tools.Tool`, se exponen a NOPAL Intelligence.
  *No estaba en ninguna documentación revisada. Candidato a página propia; estado: Experimental hasta confirmar.*
- **`get_loaded_plugin_module(id, "services.x")`**: el core puede leer, de forma opcional, un submódulo de un plugin
  (usado p. ej. para notificaciones de accesorios). Es convención interna, **no API pública**.

### Frontend [V] (`app.js`)
- `window.NopalPluginRegistry` es un objeto global; cada plugin se registra con su `id` como clave.
- El core inyecta `<link>` y `<script>` por plugin, con `?v=<version>` para invalidar caché.
- Solo se cargan plugins `installed && enabled && frontend`.
- Al deshabilitar: llama `module.unmount()` si existe, borra la entrada y quita script y estilo.
- Hallazgo: existe un **ciclo de vida implícito** (`mount`? / `unmount`). La firma exacta de lo que cada plugin registra
  **[?]** debe leerse de `camera-viewer.js` y similares antes de documentarse.

### Instalación [V/R]
- Galería → `plugin_installer_service` hace `git clone` del repo en `plugins/<id>/`; también `update` y `remove`.
- Estado en `data/plugins/installed.json` [R]. Catálogo en `backend/plugin_catalog.json`.
- Sin gestión de dependencias por plugin [R]: `matriz-led` exige instalar `pypixelcolor` a mano.
- Ejecución **en proceso, sin sandbox** [R]; los plugins importan `backend.auth_deps` del core.

## 4. Acoplamientos entre componentes [R]

| Origen | Destino | Mecanismo |
|---|---|---|
| `spoolman` | `cotizador` | `material_id = "spoolman:<spool_id>"` en `POST /api/pricing/quote` |
| `arduino-accessories` | core | importa `laser_service` y `marlin_printer_service` para saltar puertos USB ocupados |
| `matriz-led` | `arduino-accessories` | ESP32 con `Nopal_FF.ino` como puente BLE (hardware) |
| plugins con tests | core | tests requieren checkout del core (`NOPAL_CORE_ROOT`) |

Los dos últimos son **dependencias duras no declaradas**: el manifiesto no las expresa.

## 5. Lo que NO existe hoy (no documentar como real)

- Versión de API de plugins y rangos de compatibilidad con el core.
- Permisos aplicados por el sistema o sandbox.
- Dependencias Python por plugin.
- Eventos publicados/suscritos entre core y plugins [?: confirmar; no apareció ninguno].
- SDK formal o plantilla oficial de plugin.

Estos puntos van a la sección **RFC**.

## 6. Pendientes de la auditoría

| # | Tarea | Fuente |
|---|---|---|
| 1 | Clonar/actualizar `nopal` `main` y leer el cargador y el instalador vigentes | repo |
| 2 | Contrato real de `NopalPluginRegistry[id] = {...}` (mount, unmount, otros) | `*.js` de 3 plugins |
| 3 | Inventario de endpoints por plugin (`@router.get/post…`) | `router.py` |
| 4 | Esquema de `plugin_catalog.json` y diferencias con el manifiesto | core |
| 5 | Inventario de endpoints del core + OpenAPI | `backend/api/*.py` |
| 6 | Eventos y WebSocket del core | `backend/` |
| 7 | Configuración y archivos JSON de estado | raíz del core |
| 8 | Roles, auth y límites Admin/Operator | `auth_deps.py` |
| 9 | Contrato API de TUNA-Screen (6 dígitos, kiosko) | `docs/TUNASCREEN_API.md` + app |
| 10 | Help Center: ubicación de fuentes y formato | `backend/static`, i18n |
| 11 | Hardware que NOPAL controla (drivers, protocolos) | `services/*` |
