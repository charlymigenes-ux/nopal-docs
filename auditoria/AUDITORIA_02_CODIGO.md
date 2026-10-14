# Auditoría 02 — Código vigente (GitHub `main`, 2026-10-14)

Fuente: clones superficiales de `nopal`, `nopal-demo`, `matriz-led` y los 7 repos `nopal-plugin-*`.
Los clones están en el directorio temporal de la sesión; no se ejecutó código.
Leyenda: **[V]** verificado en código · **[?]** pendiente.

Esta auditoría **corrige y completa** AUDITORIA_01 (que se basaba en un checkout local desactualizado).

## 1. Contrato frontend de un plugin [V]

Todos los plugins con UI terminan con el mismo patrón:

```js
window.NopalPluginRegistry = window.NopalPluginRegistry || {};
window.NopalPluginRegistry[PLUGIN_ID] = { mount, unmount, version };
```

- Guardia de doble carga al inicio: `if (window.NopalPluginRegistry?.[PLUGIN_ID]) return;`
- `mount()` sin argumentos en los plugins de sección (cotizador, shape-creator, font-library, etc.). Es *auto-montaje*.
- `unmount()` lo invoca el core al deshabilitar (`app.js`, `unloadPluginModule`).
- El core carga `<script>` y `<link>` con `?v=<version del manifiesto>`.

**Segundo contrato, distinto:** `camera-viewer` expone además `window.NopalCameraCard` (`camera-card.js`),
un *widget embebible* con `mount(container, {deviceType, deviceId, compact})` / `unmount(container)`.
El core lo usa en tarjetas de Klipper, láser, CNC y Marlin. Es una **integración core → plugin no declarada en el manifiesto**.

Inconsistencias a corregir o documentar:
- `matriz-led`: manifiesto 0.10.0, catálogo 0.9.0 y registro JS con `version: '0.9.0'` literal.
- Algunos plugins escriben la versión a mano (`'1.2.0'`), otros usan constante. No hay fuente única.

## 2. Contrato backend [V]

- `backend/router.py` con `router = APIRouter()` **sin prefijo**.
- Cada ruta declara su ruta completa. **Corrección (AUDITORIA_03): no existe prefijo común.** matriz-led usa `/api/plugins/matriz-led`; arduino-accessories `/api/accessories`; camera-viewer `/api/cameras`; cotizador `/api/pricing` (+ `/cotizador/print`); spoolman `/api/spoolman`.
- Endpoints por plugin (decoradores `@router.*`): matriz-led 40 · arduino-accessories 43 · camera-viewer 32 · cotizador 18 · spoolman 17. Los 3 de diseño: 0 (solo frontend).
- Extensión opcional `AI_TOOLS` → NOPAL Intelligence. Hay prueba de autorización (`test_ai_plugin_tools_authorization.py`), con la regla de que un módulo ajeno a un plugin instalado se omite. **Estado: Experimental.**
- `python_requires`: lo respeta la Galería (no instala) y el cargador (no carga). Hay CI de compatibilidad con Python 3.9 (`scripts/check_plugins_compat.py`).

## 3. Catálogo `plugin_catalog.json` [V]

El catálogo es **más rico que el manifiesto**. Campos extra: `long_description`, `icon`, `accent`, `size`, `featured`,
`availability` (`available` / "coming soon"), `pricing {type}`, `repo_url`, `banner_image`.
Duplica `version`, `permissions`, `compatibility`, `python_requires`, lo que produce desfases (ver 1).
**Decisión pendiente para el estándar:** qué campo es fuente de verdad (propuesta: el manifiesto del plugin).

## 4. API del core [V]

214 decoradores de ruta en `backend/api/`:

| Archivo | Rutas | Área |
|---|---|---|
| laser.py | 42 | GRBL láser/CNC (incluye websocket de estado en vivo) |
| marlin_printers.py | 26 | Marlin standalone |
| ai.py | 25 | NOPAL Intelligence |
| tunascreen.py | 20 | Contrato TUNA-Screen (+ `/ws/tunascreen`, stream MJPEG) |
| printers.py | 20 | Klipper/Moonraker |
| status.py | 11 | Estado |
| models.py | 10 | Biblioteca de modelos |
| bambu / elegoo / flashforge | 9 c/u | Drivers por marca |
| auth.py | 9 | Sesión, usuarios y roles |
| system, console, config_backup, plugins | 5, 4, 4, 4 | Administración |
| logging_config, logs, upload, notifications, devices, dashboard | 2, 1, 1, 1, 1, 1 | Varios |

- `FastAPI(title="NOPAL", description="Biblioteca inteligente para modelos 3D y G-code")`: la descripción está **desactualizada** respecto al producto actual.
- OpenAPI/`/docs` de FastAPI está activo por defecto [?: confirmar que no se desactiva] → base para la referencia automática.
- Autenticación: `require_auth` y `require_role` en `auth_deps.py`; sesión por cookie, TUNA-Screen por Bearer token de dispositivo.
- **Eventos:** no hay bus de eventos del core hacia plugins. Los únicos canales en tiempo real son el websocket del láser y `/ws/tunascreen`. **No existe un catálogo de eventos que documentar**; es candidato a RFC.

## 5. Documentación ya existente [V]

| Archivo | Líneas | Estado / uso |
|---|---|---|
| `docs/SDD.md` | 2106 | Software Design Document v0.44, "Draft / Proposed Architecture". Fuente muy valiosa, pero mezcla actual y propuesto |
| `docs/manual/NOPAL_Manual_Usuario.md` (+PDF) | 445 | Base del manual de usuario |
| `docs/TUNASCREEN_API.md` | 122 | Contrato v1, buen modelo de referencia |
| `docs/NOPAL_INTELLIGENCE.md` / `MODO_IA_PLAN.md` | 292 / 215 | IA; el segundo es plan, no realidad |
| `AGENTS.md` | 662 | Guía para agentes; contiene mucho conocimiento de arquitectura |
| `README.md` / `README.es.md` | 363 / 339 | Duplicados ES/EN |
| `NOPAL_DESIGN_SYSTEM_v1.md` | 169 | Base para el estilo visual del sitio |
| `CHANGELOG.md` | 7 | **Vacío en la práctica**: "no tagged release yet" |
| `SECURITY.md` | 26 | Mínimo |

Nombre completo del proyecto según SDD: *Network Operating Platform for Automation & Libraries*.
Versión: `1.2.0-alpha.1`, sin tags de git.

## 6. Help Center [V] — impacto directo en la decisión de "fuente compartida"

El Help Center **no está en Markdown**. Vive dentro de la app:
- Estructura en `app.js` (`HELP_CATEGORIES`, con iconos SVG, tags y claves de i18n).
- Texto en archivos de traducción `translations*.js` (es, en, de, fr, pt-BR), generados con `scripts/generate_i18n.py`.

Consecuencia: compartir fuente exige **una de dos vías**: (a) migrar el contenido del Help Center a Markdown y generar los
`translations*.js` desde ahí; o (b) mantener ambos y generar páginas del sitio desde las claves. La (a) es más limpia y
más costosa. Requiere decisión del usuario antes de construir el repo.

## 7. Hallazgos para el Documentation Standard

1. Marcar cada página con estado: Implemented / Convention / Experimental / RFC / Deprecated.
2. Separar el SDD en actual (a las páginas oficiales) y propuesto (a RFC).
3. Elegir fuente de verdad única para versión y metadatos de plugin.
4. Documentar `NopalCameraCard` como contrato core↔plugin informal.
5. `CHANGELOG` real: comenzar por `1.2.0-alpha.1` y las fusiones recientes.
6. Rutas de plugin por convención, no por mecanismo: documentar como "Documented convention".

## 8. Pendientes

| # | Tarea |
|---|---|
| A | Inventario detallado de endpoints (método, ruta, rol) → tabla de referencia por plugin y core |
| B | Mapa de archivos JSON de estado y configuración del core y de cada plugin |
| C | Matriz de roles (Admin/Operator) por endpoint |
| D | Drivers: protocolos y capacidades por marca (para la matriz de compatibilidad) |
| E | Revisar `nopal-demo` (simulación) y cómo se mantiene en paridad con el core |
| F | Leer SDD.md y AGENTS.md completos para separar actual/propuesto |
| G | Auditar `nopal_sitio_web` y `LANDING_PAGE_AYUDA` (carpetas locales) |
