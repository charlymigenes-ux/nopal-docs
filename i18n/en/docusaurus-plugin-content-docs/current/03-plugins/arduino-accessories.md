---
title: Automatización de Taller
sidebar_label: Automatización de Taller
audience: user
type: reference
status: implemented
verified_against: "nopal@b9aa473; nopal-plugin-arduino-accessories@7d81164"
generated: true
plugin_id: arduino-accessories
plugin_version: "2.6.0"
source_commit: "7d81164"
---

# Automatización de Taller

:::note
This page is **generated** automatically. Do not edit it by hand: fix the source and regenerate.
Sources: `nopal-plugin.json`, plugin code and `plugin_catalog.json` (`nopal-plugin-arduino-accessories@7d81164`, `nopal@b9aa473`).
:::

Control unificado del taller para placas Arduino/ESP32: relés, iluminación, telemetría, escenas, mapas de pines y automatizaciones por máquina.

## Summary

| Field | Value |
|---|---|
| id | `arduino-accessories` |
| Version (manifest) | 2.6.0 |
| Maturity | stable (≥ 1.0) |
| Category | Accesorios |
| Publisher | NOPAL Labs |
| Compatibility | Impresión 3D, Láser, CNC |
| Minimum Python (`python_requires`) | no own requirement (inherits the core's) |
| Backend | `backend/router.py` |
| UI | `frontend/arduino-accessories.js` · section `arduino-accessories` |
| Repository | [nopal-plugin-arduino-accessories](https://github.com/charlymigenes-ux/nopal-plugin-arduino-accessories) |
| Own tests | Yes |
| Own `docs/` folder | Yes |

## Declared permissions

These are **informational text** for whoever installs the plugin. NOPAL does not enforce them as a permission system: the plugin runs inside the NOPAL process with its same privileges.

- Detectar puertos USB
- Enviar comandos a la placa
- Flashear firmware por USB u OTA

## Version drift

The manifest should be the source of truth (Standard §6.4). Different values are found in:

| Where | Value found | Manifest |
|---|---|---|
| plugin_catalog.json | 2.5.0 | 2.6.0 |

## Plugin API

Route prefix(es): `/api/accessories` · 43 routes (Session (admin or operator): 19; Admin only: 23; Public: 1).

| Method | Route | Access | Policy | Description |
|---|---|---|---|---|
| GET | `/api/accessories` | Session (admin or operator) | — | Accesorios IoT registrados (extractores, ventiladores, bombas, etc.). |
| POST | `/api/accessories` | Admin only | — | Registra un accesorio nuevo. `config` es un JSON con los campos que pida el driver elegido (ej. para 'home_assistant': base_url, token, ent… |
| GET | `/api/accessories/{accessory_id}/firmware-status` | Session (admin or operator) | — | Prueba la placa de un accesorio WiFi con sus credenciales YA guardadas y devuelve modelo/firmware/protocolo actuales -- el paso "Buscando…… |
| GET | `/api/accessories/activity` | Session (admin or operator) | — | Historial reciente de eventos reales (encendidos, apagados, cambios de color, altas/bajas de accesorios, escenas ejecutadas) — ver activity… |
| GET | `/api/accessories/arduino/ambient-sensor` | Session (admin or operator) | — | Qué placa (si hay alguna) está marcada como sensor ambiente del taller -- ver board_pinmap_service.get_ambient_sensor_board_id(). Lo consul… |
| POST | `/api/accessories/arduino/ambient-sensor` | Admin only | — | `board_id` vacío quita la selección (ninguna placa es el sensor ambiente). Devuelve 404 si se pidió una placa que no existe, en vez de guar… |
| GET | `/api/accessories/arduino/boards` | Session (admin or operator) | — | Placas agregadas a mano (catálogo + apodo) o adoptadas por el asistente de firmware, con la función/parámetros que el usuario le asignó a c… |
| POST | `/api/accessories/arduino/boards` | Admin only | — | `pins` es el JSON {"left": [...], "right": [...]} tal cual lo arma el catálogo del frontend -- el backend no interpreta su forma, solo la p… |
| PUT | `/api/accessories/arduino/boards/{board_id}` | Admin only | — | Edita nombre/puerto USB/IP de una placa ya agregada -- ver board_pinmap_service.update_board_info. No toca sus pines. |
| DELETE | `/api/accessories/arduino/boards/{board_id}` | Admin only | — | — |
| PUT | `/api/accessories/arduino/boards/{board_id}/pins/{side}/{index}` | Admin only | — | — |
| GET | `/api/accessories/arduino/discover` | Admin only | — | Escanea los puertos USB en busca de placas ESP32 con el firmware NOPAL (firmware/nopal_accessory/) — para cada una que contesta, el puerto… |
| POST | `/api/accessories/arduino/lighting` | Admin only | — | Alta directa de una luz conectada a una placa NOPAL existente. |
| GET | `/api/accessories/arduino/list-ports` | Admin only | — | Puertos USB candidatos SIN exigir que ya respondan el handshake NOPAL (a diferencia de /discover) -- para el asistente de primer uso, donde… |
| POST | `/api/accessories/arduino/probe-wifi` | Admin only | — | Prueba una placa NOPAL por IP antes de darla de alta por WiFi (mismas credenciales OTA que ya usa el flasheo por WiFi) — mismo propósito qu… |
| POST | `/api/accessories/arduino/relay` | Admin only | — | Alta directa de un relé de una placa NOPAL existente -- misma idea que /api/accessories/arduino/lighting: la placa ya reportó cuántos relés… |
| GET | `/api/accessories/arduino/telemetry` | Session (admin or operator) | — | Estado real de las placas configuradas, por USB o WiFi. |
| GET | `/api/accessories/cluster/config` | Session (admin or operator) | — | Config de los avisos, token incluido: el usuario lo necesita para copiarlo al secrets.h de cada placa. |
| POST | `/api/accessories/cluster/config` | Admin only | — | — |
| POST | `/api/accessories/cluster/config/rotate-token` | Admin only | — | Token nuevo. Deja fuera a todas las placas hasta que se actualice su secrets.h -- es intencional, es lo que lo hace revocable. |
| POST | `/api/accessories/cluster/event` | Public | — | Aviso de la placa maestra: una placa entró (o salió) del clúster. |
| GET | `/api/accessories/drivers` | Session (admin or operator) | — | Drivers disponibles (ej. 'home_assistant', 'http_relay') — para poblar el formulario de registro sin hardcodear la lista en el frontend. |
| GET | `/api/accessories/firmware/builds` | Session (admin or operator) | — | Binarios .bin ya subidos y disponibles para flashear. |
| GET | `/api/accessories/firmware/builds/{filename}/download` | Session (admin or operator) | — | Descarga un binario .bin ya subido -- para quien prefiera subirlo a mano desde el panel OTA de la propia placa (http://&lt;ip&gt;/update) en vez… |
| POST | `/api/accessories/firmware/flash-ota` | Admin only | — | Flashea `filename` (ya subido) por red, contra el ElegantOTA que corre en la placa en `ip` (firmware 1.3+, Wi-Fi ya conectado). username/pa… |
| POST | `/api/accessories/firmware/flash-ota-for/{accessory_id}` | Admin only | — | Igual que /firmware/flash-ota, pero usando la IP y credenciales OTA YA guardadas del accesorio en vez de pedírselas de nuevo al usuario --… |
| POST | `/api/accessories/firmware/flash-usb` | Admin only | — | Flashea `filename` (ya subido, ver /firmware/upload) en la placa conectada en `device` (ej. /dev/ttyUSB1) usando esptool, offset 0x0. Suelt… |
| GET | `/api/accessories/firmware/source` | Session (admin or operator) | — | Descarga el .ino fuente del firmware actual del accesorio. |
| POST | `/api/accessories/firmware/upload` | Admin only | — | Sube un binario .bin ya compilado (Export Compiled Binary) al servidor, para poder flashearlo después por USB u OTA. |
| POST | `/api/accessories/led` | Session (admin or operator) | — | Fija el color de una tira LED (PWM o WS2812) conectada a una placa NOPAL. Solo aplica a accesorios cuyo driver soporte 'set_color' (hoy, ún… |
| GET | `/api/accessories/machine-led/config` | Session (admin or operator) | — | Configuración de alertas visuales de una máquina y destinos LED reales. |
| POST | `/api/accessories/machine-led/config` | Admin only | — | — |
| GET | `/api/accessories/machine-led/enabled` | Session (admin or operator) | — | Estado habilitado/deshabilitado de todas las máquinas configuradas, para pintar el ícono de ajustes LED en cada tarjeta sin abrir el modal. |
| POST | `/api/accessories/machine-led/state` | Session (admin or operator) | — | — |
| POST | `/api/accessories/power` | Session (admin or operator) | — | — |
| POST | `/api/accessories/remove` | Admin only | — | — |
| POST | `/api/accessories/rename` | Admin only | — | — |
| GET | `/api/accessories/scenes` | Session (admin or operator) | — | — |
| POST | `/api/accessories/scenes` | Admin only | — | — |
| PUT | `/api/accessories/scenes/{scene_id}` | Admin only | — | Igual que el POST de creación pero sobre una escena existente. |
| DELETE | `/api/accessories/scenes/{scene_id}` | Admin only | — | — |
| POST | `/api/accessories/scenes/{scene_id}/run` | Session (admin or operator) | — | — |
| GET | `/api/accessories/status` | Session (admin or operator) | — | Igual que /api/accessories pero con el estado on/off en vivo de cada uno (probeo real contra el driver) — endpoint aparte porque ese probeo… |

## Verified notes

- Only works with boards running NOPAL's generic firmware; relays or LED strips with factory firmware are not supported. <small>(evidence: `nopal-plugin-arduino-accessories/README.md`)</small>
- The NOPAL process needs read/write access to `/dev/ttyUSB*` or `/dev/ttyACM*` (usually via the `dialout` group). USB flashing requires `esptool` on the host. <small>(evidence: `nopal-plugin-arduino-accessories/README.md`)</small>
- Imports core services (`backend.services.laser_service`, `marlin_printer_service`) to skip USB ports already used by a laser/CNC or a Marlin printer. <small>(evidence: `nopal-plugin-arduino-accessories/README.md`)</small>

## More information

- [README of the plugin](https://github.com/charlymigenes-ux/nopal-plugin-arduino-accessories#readme)
