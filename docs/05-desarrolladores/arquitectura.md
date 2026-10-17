---
title: Arquitectura de NOPAL
sidebar_label: Arquitectura
sidebar_position: 1
audience: developer
type: explanation
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
---

# Arquitectura de NOPAL

Esta página explica cómo está construido el core de NOPAL y por qué. Descríbe lo que **existe hoy**; las ideas futuras están en [RFC](../07-rfc).

## Vista general

```text
Navegador ── HTTP ──► FastAPI (uvicorn, puerto 8420)
                        ├─ backend/api/*.py        routers delgados
                        ├─ backend/services/*.py   lógica, persistencia y E/S
                        ├─ plugins/<id>/backend    routers de plugins (carga dinámica)
                        └─ archivos JSON           estado, sin base de datos
                              │
Máquinas ◄── HTTP / WS / MQTT / serie / TCP ──────────┘
```

- **Backend:** Python con FastAPI y Uvicorn.
- **Frontend:** una sola página servida por Jinja2 (`backend/templates/index.html`), JavaScript sin *build step* (`backend/static/js/app.js`) y una hoja de estilos. Three.js, incluido en el repositorio, dibuja las vistas previas 3D y de G-code.
- **Persistencia:** archivos JSON en el directorio de trabajo. No hay base de datos externa. La documentación de cada archivo de estado está pendiente en [Referencia](../06-referencia/index.md).
- **Sin *bundler* ni linter** en el repositorio.

## Punto de entrada

`backend/main.py` es la aplicación real: crea la instancia de FastAPI, el middleware de sesión, registra los routers y define los eventos de arranque:

| Al arrancar | Qué hace |
|---|---|
| Configurar registros | Aplica `logging_config_service.apply_config()` antes que nada |
| Cargar plugins | `load_installed_plugin_routers(app)`: importa y registra el backend de los plugins instalados y habilitados |
| Capturar el *event loop* | Para que los hilos de lectura serie reenvíen datos de forma segura |
| Impresiones programadas | Un bucle revisa cada 30 segundos si alguna llegó a su hora |

También monta `/static` y `/plugins-static` (ver [Seguridad](../02-administracion/seguridad.md)) y sirve `/uploads/...` solo a usuarios autenticados.

:::caution Archivos vacíos
`backend/app.py`, `backend/routes.py` y `backend/database.py` están vacíos a propósito. No añadas código ahí ni los importes esperando contenido.
:::

## Pares `api/` y `services/`

Cada área funcional es un par:

- `backend/api/<nombre>.py`: un `APIRouter` **delgado** que recibe la petición y devuelve la respuesta.
- `backend/services/<nombre>_service.py`: la **lógica de negocio**, la persistencia y la E/S externa.

Para algo nuevo, sigue esta separación en lugar de poner lógica en el router.

## Las marcas de impresora son módulos paralelos

Klipper, Marlin, Bambu Lab, Elegoo y FlashForge **no comparten una abstracción**. Cada una tiene su servicio, su router y su registro `*_registry.json`. Es deliberado: su transporte es fundamentalmente distinto.

| Familia | Servicio | Transporte |
|---|---|---|
| Klipper / Moonraker | `klipper_service.py` | HTTP REST, con sondeo periódico |
| Marlin independiente | `marlin_printer_service.py`, `marlin_driver.py` | USB serie, o puente TCP de un módulo MKS WiFi (`mks_wifi_transport.py`) |
| Bambu Lab | `bambu_service.py` | MQTT sobre TLS (`paho-mqtt`), en hilos propios, no en asyncio |
| Elegoo | `elegoo_service.py` | SDCP sobre una conexión WebSocket persistente; la impresora empuja su estado |
| FlashForge | `flashforge_service.py` | HTTP petición/respuesta, sin conexión persistente |
| GRBL láser/CNC | `laser_service.py` | HTTP + WebSocket (red) y serie (USB), cada máquina con su propia conexión y estado |

**Al añadir o tocar una marca, respeta el patrón de transporte que ya usa**, en vez de intentar unificarlas. Los códigos de estado observados en hardware real se documentan en el docstring de cada servicio, y los valores sin mapear caen en `"unknown"` en vez de adivinarse.

`printer_profiles.py` es un catálogo estático de capacidades por modelo (volumen, variantes de placa, extrusores): metadatos para la interfaz, no estado en vivo.

### Identidad de máquinas

Los láseres/CNC y las Marlin tienen un identificador interno estable. Se reencuentran por su **ubicación USB** (topología bus-hub-puerto) o por su **dirección MAC**, no por `/dev/ttyUSBx` ni por IP, que cambian. Lo gestiona `machine_identity.py`, con una migración en `machine_identity_migration.py`.

## Autenticación y autorización

Hay dos mecanismos que conviven:

1. **Roles directos:** `require_auth` y `require_role("admin")` (`backend/auth_deps.py`) como dependencias de FastAPI.
2. **Authorization Policy (ADR-006):** `authorize(principal, action, resource)` en `backend/services/authorization_policy.py`, aplicada con `ensure_authorized`. Deniega por defecto todo lo que no reconoce.

La política implementa una matriz **objetivo**; el comportamiento real sigue el estado actual hasta que cada ruta migre. Detalle por ruta en la [referencia de la API](../06-referencia/api-rest-core.md).

## Frontend

- Un solo `index.html` y `app.js` en JavaScript puro.
- **Temas:** una clase en `<body>` (`dark`, `green`, `red`, `custom`; el claro es la ausencia de clase) redefine un conjunto fijo de variables CSS. El sistema de diseño está en `NOPAL_DESIGN_SYSTEM_v1.md`, en el repositorio del core.
- **Idiomas:** `translations.js` contiene español e inglés; `translations-de.js`, `translations-fr.js` y `translations-pt-BR.js` se **regeneran** con `scripts/generate_i18n.py`.
- Los plugins añaden su interfaz en tiempo de ejecución; ver [Plugins: frontend](./plugins-frontend.md).

## Convenciones

- Los textos para el usuario, los comentarios del código y los mensajes de registro están en **español de México**. Los identificadores (variables, funciones) van en inglés.
- Los módulos con una constante tipo `REGISTRY_PATH` respaldada por un archivo deben **redirigirse a un directorio temporal en las pruebas**. Ver [Entorno y pruebas](./entorno-y-pruebas.md).

## Lo que no existe

- Una abstracción común de «impresora» entre marcas.
- Una API de eventos entre el core y los plugins (ver [RFC](../07-rfc)).
- Una base de datos. El diseño elige archivos JSON.
