---
title: Añadir un driver
sidebar_label: Añadir un driver
sidebar_position: 8
audience: developer
type: how-to
status: convention
verified_against: "nopal@a5853dc (2026-10-17)"
---

# Añadir un driver

Un **driver** es el código que habla con una familia de máquinas: Klipper, Marlin, Bambu Lab, Elegoo, FlashForge o GRBL. Esta guía describe cómo están hechos los actuales, para que puedas proponer uno nuevo.

:::caution Convención, no contrato
NOPAL **no tiene una interfaz común** ni una API estable para drivers de terceros. Los drivers son módulos de funciones, no clases intercambiables, y se añaden **al propio core** mediante un *pull request* (ver [Contribuir](./contribuir)). Lo que sigue describe lo que hacen hoy los drivers existentes; puede cambiar.
:::

Para una extensión que no sea una familia de máquinas (una pantalla, un sensor, una herramienta), lo adecuado es un [plugin](./plugins-manifiesto).

## Principios

Vienen del documento de diseño del core (SDD) y se ven en el código:

| Principio | Qué significa para un driver |
|---|---|
| **Un driver por protocolo, independientes entre sí** | No se fuerza un transporte común. Ningún driver importa a otro; la excepción es `marlin_driver`, un protocolo compartido a propósito |
| **Router y servicio separados** | El router recibe y responde; la lógica y la E/S viven en el servicio |
| **Datos observados, nunca inventados** | Un valor desconocido es `null` o `"unknown"`, no una suposición |
| **Capacidades declaradas, no inferidas** | Lo que la máquina no soporta no se anuncia |
| **Testeable sin hardware** | Transportes simulados y registros aislados en las pruebas |
| **Evolución incremental** | Un cambio no rompe una ruta que ya use la interfaz |

## Las dos piezas

Cada familia de red tiene un servicio y un router:

| Pieza | Ejemplo (FlashForge) | Qué contiene |
|---|---|---|
| **Servicio** | `backend/services/flashforge_service.py` | La conexión con la máquina, su registro (`REGISTRY_PATH`), el alta y la baja, el escaneo de red, la prueba de conexión y las órdenes (pausar, reanudar, cancelar, enviar G-code) |
| **Router** | `backend/api/flashforge_printers.py` | Las rutas `/api/flashforge/printers…`. Valida y llama al servicio |

Un servicio ofrece, como mínimo, funciones como `get_registered_printers_with_status`, `register_printer`, `unregister_printer`, `scan_network`, `test_connection`, `pause_printer`, `resume_printer`, `cancel_printer` y `send_gcode_to_printer`. Los nombres exactos varían según lo que la familia permita.

## Reglas del router

- **Permisos.** Listar es `require_auth`. Descubrir, dar de alta y de baja son `require_role("admin")`. Ver [Roles por acción](../06-referencia/roles-por-accion).
- **Entradas.** Valida la dirección con `validate_printer_ip` y el nombre con `sanitize_device_name`, de `backend/utils.py`, antes de usarlos.
- **Secretos.** No devuelvas credenciales en las respuestas (por ejemplo, el `check_code` de FlashForge se filtra del alta y del listado).
- **Errores de alta.** Lanza `PrinterRegistrationError(código, mensaje)`. Es un `HTTPException(400)` con un `error_code` estructurado además del `detail` de siempre, que el asistente guiado usa para redactar el mensaje.

| `error_code` | Cuándo |
|---|---|
| `IP_INVALID` | La dirección no es válida |
| `CREDENTIAL_REJECTED` | La máquina rechazó las credenciales |
| `SERVICE_REFUSED` | La máquina rechazó la conexión al servicio |
| `CONNECTION_FAILED` | No hubo conexión |
| `PROTOCOL_INVALID` | La respuesta no tiene el formato esperado |
| `UNKNOWN` | Cualquier otro caso |

No hay códigos más finos a propósito: «puerto bloqueado» y «equipo apagado» producen el mismo tiempo de espera y no se pueden distinguir sin inventar una señal.

## Los puntos de contacto con el resto del core

Un driver nuevo no vive solo en su servicio y su router. Mira dónde aparece `flashforge` en el código y tendrás la lista:

| Dónde | Qué hay que hacer |
|---|---|
| `backend/main.py` | Importar el router y registrarlo con `app.include_router` |
| `backend/services/dashboard_service.py` | Incluir las máquinas en el resumen del panel de control |
| `backend/services/ai_tools.py` | Incluirlas en lo que NOPAL Intelligence puede consultar |
| `backend/services/config_backup_service.py` | Añadir el archivo de registro a un grupo de los [respaldos](../02-administracion/respaldos) |
| `backend/services/job_control_service.py` | Añadir su `REGISTRY_PATH` para el [historial de trabajos](../01-usuario/historial-de-trabajos), y llamar a `record_print_sent` al enviar un trabajo |
| `backend/services/logging_config_service.py` | Declarar el módulo como fuente de log |
| `backend/services/printer_profiles.py` | Describir los modelos (marca, familia de firmware) |
| Interfaz | Sección en `index.html`, lógica en `app.js`, el asistente (`guided-printer-setup.js`), los textos de `translations.js` y los estilos |

Los textos de la interfaz van en español e inglés; el portugués (Brasil), el francés y el alemán se generan con `scripts/generate_i18n.py`. Ver [Variables de entorno y línea de comandos](../06-referencia/variables-y-cli).

## Identidad de la máquina

Cada familia identifica sus máquinas a su manera: Elegoo por `mainboard_id`, FlashForge por número de serie y Bambu Lab por su id. Solo Marlin y láser/CNC usan el id interno `mch_…` con anclas de red y USB. Ver [Identidad de máquinas](../02-administracion/identidad-de-maquinas).

## Pruebas

- Escribe `backend/tests/test_<familia>_printers.py` (hay uno por familia, por ejemplo `test_flashforge_printers.py`).
- Sin hardware: simula el transporte. El protocolo de Marlin, por ejemplo, recibe un `MarlinTransport` inyectado.
- Un *fixture* con `autouse=True`, `isolated_printer_registries`, redirige el `REGISTRY_PATH` de cada marca a una carpeta temporal para que las pruebas no lean ni escriban tus registros reales. **Añade tu servicio ahí.**

Para ejecutar las pruebas, ver [Entorno y pruebas](./entorno-y-pruebas).
