---
title: Core REST API
sidebar_label: Core REST API
audience: reference
type: reference
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
generated: true
source_commit: "a5853dc"
---

# Core REST API

:::note
This page is **generated** automatically. Do not edit it by hand: fix the source and regenerate.
Verified against `nopal@a5853dc` (2026-10-17).
:::

Inventory of NOPAL's routes obtained by **static analysis** of the code (`@router.*` decorators and access dependencies). NOPAL is not run. The access shown is the one declared on the route; a role check inside a function body is not detected.

## How to read access

| Value | Meaning |
|---|---|
| Public | No session. Login, first-run setup and the main page only. |
| Session (admin or operator) | Requires a logged-in session; the role is re-read from the user registry on every request. |
| Admin only | Requires the `admin` role. The operator role is stored internally as `operador`. |
| Policy | Routes already migrated to the Authorization Policy (ADR-006): they check the listed action before running. The rest use the role only. |

## Summary

| Access | Routes |
|---|---:|
| Public | 5 |
| Session (admin or operator) | 150 |
| Admin only | 53 |
| **Total** | **208** |


## NOPAL Intelligence (AI)

`backend/api/ai.py` · 25 routes

| Method | Route | Access | Policy | Description |
|---|---|---|---|---|
| GET | `/api/ai/actions` | Session (admin or operator) | — | Acciones que ESTE usuario puede ejecutar por medio de la IA. |
| POST | `/api/ai/actions/{token}/cancel` | Session (admin or operator) | — | — |
| POST | `/api/ai/actions/{token}/confirm` | Session (admin or operator) | — | Ejecuta una acción de riesgo que quedó esperando confirmación. |
| POST | `/api/ai/ask` | Session (admin or operator) | — | Pregunta en lenguaje natural sobre el taller. |
| GET | `/api/ai/config` | Admin only | — | Configuración vigente, sin la API key (solo si está puesta o no). |
| PUT | `/api/ai/config` | Admin only | — | — |
| GET | `/api/ai/conversations` | Session (admin or operator) | — | Listado sin los mensajes: una conversación larga no tiene por qué viajar entera solo para pintar la barra lateral. |
| DELETE | `/api/ai/conversations` | Session (admin or operator) | `CLEAR_ALL_CONVERSATIONS` | Borrar el historial completo (C-4): operación de almacenamiento solo para admin. Afecta lo que vieron todos los usuarios, pero no da acceso… |
| GET | `/api/ai/conversations/{conversation_id}` | Session (admin or operator) | — | — |
| PUT | `/api/ai/conversations/{conversation_id}` | Session (admin or operator) | — | — |
| DELETE | `/api/ai/conversations/{conversation_id}` | Session (admin or operator) | — | — |
| POST | `/api/ai/enabled` | Admin only | — | Enciende o apaga la capa sin tocar el registro de IAs guardadas. |
| GET | `/api/ai/presets` | Admin only | — | Proveedores conocidos para poblar el selector de la interfaz. |
| GET | `/api/ai/providers` | Admin only | — | Las IAs guardadas, sin sus claves. Marca cuál está activa. |
| POST | `/api/ai/providers` | Admin only | — | Agrega una IA al registro. La primera que se agrega queda activa. |
| PUT | `/api/ai/providers/{provider_id}` | Admin only | — | — |
| DELETE | `/api/ai/providers/{provider_id}` | Admin only | — | Borrar la IA activa pasa la activación a la primera que quede; si no queda ninguna, la capa se apaga sola en vez de apuntar a la nada. |
| POST | `/api/ai/providers/{provider_id}/activate` | Admin only | — | — |
| GET | `/api/ai/status` | Session (admin or operator) | — | Estado resumido para pintar el indicador de la UI. No contacta al servidor de IA (eso es /test, que sí cuesta una petición de red). |
| GET | `/api/ai/suggestions` | Session (admin or operator) | — | Preguntas rápidas del asistente. Lista vacía = usar las de fábrica, que el frontend traduce; las guardadas van tal cual. |
| PUT | `/api/ai/suggestions` | Admin only | — | — |
| POST | `/api/ai/test` | Admin only | — | Prueba la conexión contra el servidor de IA. |
| GET | `/api/ai/tiers` | Admin only | — | Niveles del modo automático y cómo se encadenan si uno falla. La UI los pinta; los nombres de modelo salen de la configuración, no de acá. |
| GET | `/api/ai/tools` | Session (admin or operator) | — | Catálogo de herramientas de solo lectura que se le ofrecen al modelo. |
| POST | `/api/ai/tools/{tool_name}` | Session (admin or operator) | — | Ejecuta una herramienta directamente, sin pasar por el modelo. |


## Authentication and users

`backend/api/auth.py` · 9 routes

| Method | Route | Access | Policy | Description |
|---|---|---|---|---|
| POST | `/api/auth/login` | Public | — | — |
| POST | `/api/auth/logout` | Public | — | — |
| GET | `/api/auth/me` | Session (admin or operator) | — | — |
| POST | `/api/auth/setup` | Public | — | Crea la cuenta admin inicial y arranca la sesión de una — solo funciona una vez, mientras auth_users.json esté vacío. |
| GET | `/api/auth/setup-required` | Public | — | Público a propósito (todavía no puede existir ninguna sesión antes de que exista el primer usuario) — el frontend lo consulta antes de deci… |
| GET | `/api/auth/users` | Admin only | — | — |
| POST | `/api/auth/users` | Admin only | — | — |
| POST | `/api/auth/users/remove` | Admin only | — | — |
| POST | `/api/auth/users/update` | Admin only | — | Cambia el rol y/o resetea la contraseña de un usuario existente — usado desde Configuración &gt; Usuarios. |


## Bambu Lab printers

`backend/api/bambu_printers.py` · 9 routes

| Method | Route | Access | Policy | Description |
|---|---|---|---|---|
| GET | `/api/bambu/printers` | Session (admin or operator) | — | Impresoras Bambu Lab registradas en NOPAL, con su status actual (leído del caché que mantiene el hilo MQTT persistente de cada una). |
| POST | `/api/bambu/printers` | Admin only | — | Registra una impresora Bambu Lab -- valida el access code contra la impresora real (handshake MQTT) antes de guardar. |
| DELETE | `/api/bambu/printers/{printer_id}` | Admin only | — | — |
| POST | `/api/bambu/printers/{printer_id}/cancel` | Session (admin or operator) | — | — |
| POST | `/api/bambu/printers/{printer_id}/pause` | Session (admin or operator) | — | — |
| POST | `/api/bambu/printers/{printer_id}/resume` | Session (admin or operator) | — | — |
| POST | `/api/bambu/printers/{printer_id}/send` | Session (admin or operator) | — | Sube un archivo .3mf de la biblioteca de NOPAL a la impresora y arranca la impresión. |
| POST | `/api/bambu/printers/{printer_id}/test-connection` | Session (admin or operator) | — | Diagnóstico bajo demanda de una impresora ya registrada -- de solo lectura, no requiere admin. |
| POST | `/api/bambu/printers/discover` | Admin only | — | Escucha anuncios SSDP de impresoras Bambu Lab en modo LAN (pasivo, sin probe activo -- ver bambu_service.py). |


## Configuration backups

`backend/api/config_backup.py` · 4 routes

| Method | Route | Access | Policy | Description |
|---|---|---|---|---|
| POST | `/api/config-backup/export` | Admin only | — | — |
| GET | `/api/config-backup/groups` | Admin only | — | Qué se puede respaldar, y cuáles existen en esta instalación. |
| POST | `/api/config-backup/import` | Admin only | — | — |
| POST | `/api/config-backup/inspect` | Admin only | — | Qué trae el respaldo, sin escribir nada. La persona tiene derecho a ver qué va a sobrescribir antes de aceptarlo. |


## Console and macros

`backend/api/console.py` · 4 routes

| Method | Route | Access | Policy | Description |
|---|---|---|---|---|
| POST | `/api/console/command` | Session (admin or operator) | `SEND_CONSOLE_COMMAND` | Envía un comando de consola/G-code a la impresora indicada. |
| GET | `/api/console/messages` | Session (admin or operator) | — | Últimos mensajes de la consola G-code de la impresora indicada. |
| GET | `/api/macros` | Session (admin or operator) | — | Lista de macros configurados en la impresora indicada. |
| POST | `/api/macros/run` | Session (admin or operator) | `RUN_MACRO` | Ejecuta un macro por nombre en la impresora indicada. |


## Dashboard

`backend/api/dashboard.py` · 1 routes

| Method | Route | Access | Policy | Description |
|---|---|---|---|---|
| GET | `/api/dashboard/summary` | Session (admin or operator) | — | Resumen agregado para el panel de control: salud del sistema, host, conteo de dispositivos, trabajos activos y alertas — compone datos que… |


## Devices

`backend/api/devices.py` · 1 routes

| Method | Route | Access | Policy | Description |
|---|---|---|---|---|
| GET | `/api/devices/registry` | Session (admin or operator) | — | Snapshot normalizado de TODAS las marcas (Klipper/Marlin/Bambu/Elegoo/ FlashForge/Láser-CNC), para la tarjeta "Todos los dispositivos" de C… |


## Elegoo printers

`backend/api/elegoo_printers.py` · 9 routes

| Method | Route | Access | Policy | Description |
|---|---|---|---|---|
| GET | `/api/elegoo/printers` | Session (admin or operator) | — | Impresoras Elegoo registradas en NOPAL, con su último status conocido (SDCP empuja los cambios solo, no hace falta encuestar acá). |
| POST | `/api/elegoo/printers` | Admin only | — | Registra una impresora Elegoo -- valida que responda por SDCP real antes de guardar (ver elegoo_service._verify_connection). |
| DELETE | `/api/elegoo/printers/{printer_id}` | Admin only | — | — |
| POST | `/api/elegoo/printers/{printer_id}/cancel` | Session (admin or operator) | — | — |
| POST | `/api/elegoo/printers/{printer_id}/pause` | Session (admin or operator) | — | — |
| POST | `/api/elegoo/printers/{printer_id}/resume` | Session (admin or operator) | — | — |
| POST | `/api/elegoo/printers/{printer_id}/send` | Session (admin or operator) | — | Sube un archivo de la biblioteca de NOPAL a la impresora y arranca la impresión. |
| POST | `/api/elegoo/printers/{printer_id}/test-connection` | Session (admin or operator) | — | Diagnóstico bajo demanda de una impresora ya registrada -- de solo lectura, no requiere admin. |
| POST | `/api/elegoo/printers/discover` | Admin only | — | Escanea la red local en busca de impresoras Elegoo (broadcast UDP). |


## FlashForge printers

`backend/api/flashforge_printers.py` · 9 routes

| Method | Route | Access | Policy | Description |
|---|---|---|---|---|
| GET | `/api/flashforge/printers` | Session (admin or operator) | — | Impresoras FlashForge registradas en NOPAL, con su status actual (acá sí se hace un /detail real por impresora, a diferencia de Elegoo). |
| POST | `/api/flashforge/printers` | Admin only | — | Registra una impresora FlashForge -- valida serialNumber/checkCode contra la impresora real antes de guardar (a diferencia de Elegoo, acá s… |
| DELETE | `/api/flashforge/printers/{printer_id}` | Admin only | — | — |
| POST | `/api/flashforge/printers/{printer_id}/cancel` | Session (admin or operator) | — | — |
| POST | `/api/flashforge/printers/{printer_id}/pause` | Session (admin or operator) | — | — |
| POST | `/api/flashforge/printers/{printer_id}/resume` | Session (admin or operator) | — | — |
| POST | `/api/flashforge/printers/{printer_id}/send` | Session (admin or operator) | — | Sube un archivo de la biblioteca de NOPAL a la impresora y arranca la impresión. |
| POST | `/api/flashforge/printers/{printer_id}/test-connection` | Session (admin or operator) | — | Diagnóstico bajo demanda de una impresora ya registrada -- de solo lectura, no requiere admin. |
| POST | `/api/flashforge/printers/discover` | Admin only | — | Escanea la red local en busca de impresoras FlashForge modernas (5M/5M Pro/AD5X/Creator 5). |


## jobs.py

`backend/api/jobs.py` · 5 routes

| Method | Route | Access | Policy | Description |
|---|---|---|---|---|
| GET | `/api/jobs/deletions` | Admin only | — | Registro de control: los trabajos dados de baja, con quién, cuándo y por qué. |
| GET | `/api/jobs/history` | Session (admin or operator) | — | — |
| POST | `/api/jobs/history/delete` | Admin only | — | — |
| GET | `/api/jobs/history/export` | Session (admin or operator) | — | Resumen de la lista que se está viendo (mismos filtros), en XML o PDF. |
| POST | `/api/jobs/reprint-klipper` | Session (admin or operator) | — | Vuelve a imprimir, en la misma impresora Klipper, un archivo que ya está en su carpeta de G-code. |


## Laser and CNC (GRBL)

`backend/api/laser.py` · 46 routes

| Method | Route | Access | Policy | Description |
|---|---|---|---|---|
| POST | `/api/laser/command` | Session (admin or operator) | `action` | Envía un comando GRBL suelto (jog, $H, $X, etc.). |
| GET | `/api/laser/console` | Session (admin or operator) | — | Últimos mensajes transmitidos por el láser (consola en vivo). |
| POST | `/api/laser/console` | Session (admin or operator) | `SEND_CONSOLE_COMMAND` | Envía un comando desde la consola del láser. |
| GET | `/api/laser/history` | Session (admin or operator) | — | Historial de trabajos láser (completados, cancelados o con error), más recientes primero. |
| POST | `/api/laser/history/snapshot` | Session (admin or operator) | — | Adjunta la captura del grill (figura trazada) al trabajo más reciente de ese host. |
| POST | `/api/laser/home` | Session (admin or operator) | — | Inicia el ciclo de home ($H en GRBL, G28 en Marlin). |
| GET | `/api/laser/info` | Session (admin or operator) | — | Información estática de la placa controladora (chip, firmware, red). |
| POST | `/api/laser/job/cancel` | Session (admin or operator) | — | — |
| POST | `/api/laser/job/frame` | Session (admin or operator) | — | Recorre el rectángulo que ocupa un trabajo, sin cortarlo. |
| GET | `/api/laser/job/last` | Session (admin or operator) | — | Último trabajo terminado (error/cancelado/completado) de esa placa, o {"job": null}. Lo usa la tarjeta TRABAJO de CNC para avisar cómo acab… |
| POST | `/api/laser/job/pause` | Session (admin or operator) | — | — |
| POST | `/api/laser/job/resume` | Session (admin or operator) | — | — |
| POST | `/api/laser/job/start` | Session (admin or operator) | — | Inicia el envío de un archivo G-code (de la biblioteca) al láser. |
| POST | `/api/laser/job/start-sd` | Session (admin or operator) | — | Corre un archivo de la biblioteca DESDE la SD de la placa: lo sube y lo arranca ahí. Es más firme que el envío línea por línea por WiFi (el… |
| GET | `/api/laser/job/status` | Session (admin or operator) | — | — |
| POST | `/api/laser/job/z-offset` | Session (admin or operator) | — | Ajuste de Z en vivo (plotter): suma `delta` mm a la Z de lápiz abajo para los trazos que faltan. |
| GET | `/api/laser/jobs/active` | Session (admin or operator) | — | Todos los hosts con un trabajo propio en curso ahora mismo — para que el frontend no pierda de vista un corte activo aunque el usuario esté… |
| POST | `/api/laser/jog` | Session (admin or operator) | — | Mueve un eje en relativo. La secuencia real (jog GRBL vs. G91/G1/G90 de Marlin) se arma en el backend según el firmware registrado para ese… |
| GET | `/api/laser/parser-state` | Session (admin or operator) | — | Sistema de coordenadas activo (G54/G55/...) vía '$G'. |
| GET | `/api/laser/profiles` | Session (admin or operator) | — | Catálogo de perfiles de láser/CNC conocidos (ver printer_profiles.py) -- para poblar el selector de modelo del alta, mismo criterio que /ap… |
| GET | `/api/laser/queue` | Session (admin or operator) | — | Trabajos en espera para enviarse al láser. |
| POST | `/api/laser/queue/add` | Session (admin or operator) | — | Agrega un archivo G-code de la biblioteca a la cola del láser o del CNC (`kind` decide en qué ficha aparece — ver add_to_queue). |
| POST | `/api/laser/queue/remove` | Session (admin or operator) | — | Quita un trabajo de la cola sin enviarlo. |
| POST | `/api/laser/queue/start` | Session (admin or operator) | — | Saca un trabajo de la cola y lo transmite línea por línea al láser. |
| GET | `/api/laser/registry` | Session (admin or operator) | — | Placas láser registradas en NOPAL (red y USB). |
| POST | `/api/laser/registry` | Admin only | — | Registra una placa (red o USB) como láser o CNC disponible en NOPAL. |
| POST | `/api/laser/registry/remove` | Admin only | — | Quita una placa registrada. |
| GET | `/api/laser/registry/status` | Session (admin or operator) | — | Igual que /api/laser/registry pero con un campo "online" agregado por placa (USB: existe el puerto ahora; red: probe puntual a ese host) —… |
| GET | `/api/laser/scan` | Admin only | — | Escanea la red local en busca de otras placas láser (ESP3D) disponibles. |
| GET | `/api/laser/scan-ip` | Admin only | — | Prueba una IP puntual en vez de barrer toda la subred — para placas fuera del rango detectado automáticamente (otra subred, modo Punto de A… |
| GET | `/api/laser/sd/available` | Session (admin or operator) | — | Indica si la placa activa tiene una tarjeta SD navegable. |
| POST | `/api/laser/sd/delete` | Session (admin or operator) | — | Elimina un archivo o carpeta de la tarjeta SD. |
| GET | `/api/laser/sd/files` | Session (admin or operator) | — | Lista archivos/carpetas de la tarjeta SD insertada en la placa (ESP3D). |
| POST | `/api/laser/sd/folder` | Session (admin or operator) | — | Crea una carpeta en la tarjeta SD. |
| POST | `/api/laser/sd/format` | Admin only | — | Formatea la tarjeta SD -- borra TODO su contenido, sin vuelta atrás. Admin-only server-side (no solo oculto en el frontend). Ver el comenta… |
| POST | `/api/laser/sd/run` | Session (admin or operator) | — | Corre directamente un archivo que ya está en la SD, sin volver a subirlo. |
| GET | `/api/laser/sd/status` | Session (admin or operator) | — | ¿La placa tiene una tarjeta SD lista? (la pantalla ofrece correr desde la SD si la hay). |
| POST | `/api/laser/sd/upload` | Session (admin or operator) | — | Sube un archivo (desde tu computadora) directo a la tarjeta SD de la placa. No espera a que termine: el tramo lento de verdad es NOPAL-&gt;pla… |
| POST | `/api/laser/sd/upload-from-library` | Session (admin or operator) | — | Envía un archivo ya subido a la biblioteca de G-code de NOPAL directo a la SD de la placa -- mismo criterio de segundo plano + upload_id qu… |
| GET | `/api/laser/sd/upload-progress/{upload_id}` | Session (admin or operator) | — | Estado real de una subida en curso (ver sd_upload_file_tracked). Cuando status ya es "done"/"error" el frontend deja de sondear y llama a e… |
| POST | `/api/laser/sd/upload-progress/{upload_id}/clear` | Session (admin or operator) | — | — |
| GET | `/api/laser/settings` | Session (admin or operator) | — | Parámetros $$ actuales de la placa GRBL. |
| POST | `/api/laser/settings` | Session (admin or operator) | `GRBL_SETTINGS` | Actualiza un parámetro $$ individual. |
| GET | `/api/laser/status` | Session (admin or operator) | — | Estado en vivo del láser (posición, estado GRBL) vía websocket. |
| GET | `/api/laser/usb-ports` | Session (admin or operator) | — | Puertos serie USB conectados que coinciden con chips de controladoras láser. |
| POST | `/api/laser/usb-ports/test` | Admin only | — | Prueba si el puerto USB indicado responde al protocolo GRBL (envía '?'). |


## Logging configuration

`backend/api/logging_config.py` · 2 routes

| Method | Route | Access | Policy | Description |
|---|---|---|---|---|
| GET | `/api/logs/config` | Session (admin or operator) | — | — |
| PUT | `/api/logs/config` | Session (admin or operator) | `SYSTEM_CONTROL` | — |


## Logs (viewer)

`backend/api/logs.py` · 1 routes

| Method | Route | Access | Policy | Description |
|---|---|---|---|---|
| GET | `/api/logs` | Session (admin or operator) | — | — |


## Application (root)

`backend/main.py` · 3 routes

| Method | Route | Access | Policy | Description |
|---|---|---|---|---|
| GET | `/` | Public | — | — |
| GET | `/uploads/{filename:path}` | Session (admin or operator) | — | Sirve archivos de la biblioteca solo a usuarios autenticados. |
| GET | `/view/{filename:path}` | Session (admin or operator) | — | — |


## Marlin printers

`backend/api/marlin_printers.py` · 26 routes

| Method | Route | Access | Policy | Description |
|---|---|---|---|---|
| GET | `/api/marlin-printers/console` | Session (admin or operator) | — | — |
| POST | `/api/marlin-printers/console` | Session (admin or operator) | `SEND_CONSOLE_COMMAND` | — |
| GET | `/api/marlin-printers/discover` | Admin only | — | Puertos USB conectados que podrían ser una impresora Marlin (aún no registrados). |
| POST | `/api/marlin-printers/home` | Session (admin or operator) | `HOME` | — |
| GET | `/api/marlin-printers/jobs/active` | Session (admin or operator) | — | — |
| POST | `/api/marlin-printers/jog` | Session (admin or operator) | `MOVE` | — |
| GET | `/api/marlin-printers/mks-wifi/discover` | Admin only | — | Descubre módulos oficiales MKS WiFi mediante broadcast UDP 8989. |
| POST | `/api/marlin-printers/mks-wifi/test` | Admin only | — | — |
| POST | `/api/marlin-printers/print/cancel` | Session (admin or operator) | `CANCEL` | — |
| POST | `/api/marlin-printers/print/pause` | Session (admin or operator) | `PAUSE` | — |
| POST | `/api/marlin-printers/print/resume` | Session (admin or operator) | `RESUME` | — |
| POST | `/api/marlin-printers/print/start` | Session (admin or operator) | `START_JOB` | Inicia el envío de un archivo G-code (de la biblioteca) a la impresora. |
| GET | `/api/marlin-printers/print/status` | Session (admin or operator) | `VIEW_STATUS` | — |
| GET | `/api/marlin-printers/profiles` | Session (admin or operator) | — | Catálogo de perfiles de impresora conocidos (ver printer_profiles.py) -- para poblar el selector de modelo del alta. Vacío para una placa M… |
| GET | `/api/marlin-printers/registry` | Session (admin or operator) | — | — |
| POST | `/api/marlin-printers/registry` | Admin only | — | Registra una impresora Marlin por USB o por el puente TCP de MKS WiFi. El handshake es obligatorio server-side (no solo confiar en que el f… |
| POST | `/api/marlin-printers/registry/remove` | Admin only | — | — |
| GET | `/api/marlin-printers/registry/status` | Session (admin or operator) | — | — |
| GET | `/api/marlin-printers/sd/available` | Session (admin or operator) | — | M21 -- si la placa reporta una tarjeta SD insertada. Usado por el modal "Enviar a impresora" para decidir si ofrece la opción de SD. |
| GET | `/api/marlin-printers/sd/files` | Session (admin or operator) | — | Lista G-code directamente desde la SD de la impresora (M20). |
| POST | `/api/marlin-printers/sd/print/start` | Session (admin or operator) | `START_JOB` | Arranca el archivo dentro de la SD con M23/M24, sin copia local. |
| POST | `/api/marlin-printers/sd/upload-and-print` | Session (admin or operator) | `START_JOB` | Sube un archivo de la biblioteca a la SD de la impresora (M28/M29) y arranca la impresión (M23/M24) -- opcionalmente precalentando primero… |
| GET | `/api/marlin-printers/status` | Session (admin or operator) | `VIEW_STATUS` | — |
| POST | `/api/marlin-printers/temperature-target` | Session (admin or operator) | `SET_TEMPERATURE` | — |
| GET | `/api/marlin-printers/temperatures` | Session (admin or operator) | `VIEW_STATUS` | — |
| POST | `/api/marlin-printers/usb-ports/test` | Admin only | — | Prueba si el puerto USB indicado responde al protocolo Marlin. Si no se manda `baud`, autodetecta probando 115200 y 250000 en orden (ver pr… |


## Model and G-code library

`backend/api/models.py` · 10 routes

| Method | Route | Access | Policy | Description |
|---|---|---|---|---|
| GET | `/api/browse` | Session (admin or operator) | — | Contenido (carpetas + archivos) de una carpeta dentro de la sección indicada. |
| PATCH | `/api/files` | Session (admin or operator) | — | Renombra un archivo existente (conserva la extensión). |
| DELETE | `/api/files` | Session (admin or operator) | — | Elimina un archivo de la sección indicada. |
| POST | `/api/files/move` | Session (admin or operator) | — | Mueve un archivo a otra carpeta dentro de la misma sección. |
| POST | `/api/folders` | Session (admin or operator) | — | Crea una subcarpeta dentro de la sección indicada. |
| PATCH | `/api/folders` | Session (admin or operator) | — | Renombra una subcarpeta existente. |
| DELETE | `/api/folders` | Session (admin or operator) | — | Elimina una subcarpeta (y su contenido) de la sección indicada. |
| GET | `/api/gcode/thumbnail` | Session (admin or operator) | — | Miniatura 2D generada por NOPAL a partir de la trayectoria real del G-code (para la galería de archivos CNC/láser) — a diferencia de /api/m… |
| GET | `/api/models` | Session (admin or operator) | — | Listado plano y recursivo de todos los archivos (usado por estadísticas). |
| GET | `/api/models/thumbnail` | Session (admin or operator) | — | Miniatura PNG incrustada por el slicer en el propio G-code (thumbnail begin/end). 404 si el archivo no trae ninguna incrustada. |


## Notifications

`backend/api/notifications.py` · 1 routes

| Method | Route | Access | Policy | Description |
|---|---|---|---|---|
| GET | `/api/notifications` | Session (admin or operator) | — | Cuenta de problemas activos ahora mismo (impresoras/láser/CNC/ accesorios desconectados, trabajos con error, actualización disponible) — no… |


## plotter.py

`backend/api/plotter.py` · 2 routes

| Method | Route | Access | Policy | Description |
|---|---|---|---|---|
| POST | `/api/plotter/generate` | Session (admin or operator) | — | Genera el G-code de plotter y lo guarda en la raíz de la Biblioteca (G-code). |
| POST | `/api/plotter/preview` | Session (admin or operator) | — | Trazos en mm (origen abajo a la izquierda) para dibujar la vista previa, sus números y los avisos de la imagen (`notes`). |


## Plugin gallery

`backend/api/plugins.py` · 4 routes

| Method | Route | Access | Policy | Description |
|---|---|---|---|---|
| GET | `/api/plugins` | Session (admin or operator) | — | — |
| DELETE | `/api/plugins/{plugin_id}` | Admin only | — | — |
| POST | `/api/plugins/{plugin_id}/install` | Admin only | — | — |
| POST | `/api/plugins/{plugin_id}/update` | Admin only | — | — |


## Klipper / Moonraker printers

`backend/api/printers.py` · 20 routes

| Method | Route | Access | Policy | Description |
|---|---|---|---|---|
| GET | `/api/printers` | Session (admin or operator) | — | Obtener lista de impresoras detectadas |
| POST | `/api/printers/{port}/cancel` | Session (admin or operator) | — | — |
| GET | `/api/printers/{port}/config-files` | Session (admin or operator) | — | — |
| GET | `/api/printers/{port}/config-files/content` | Session (admin or operator) | — | — |
| POST | `/api/printers/{port}/config-files/content` | Session (admin or operator) | `PRINTER_CONFIG` | — |
| POST | `/api/printers/{port}/firmware-restart` | Session (admin or operator) | `FIRMWARE_RESTART` | Reinicia el firmware del MCU (equivalente a FIRMWARE_RESTART). |
| POST | `/api/printers/{port}/pause` | Session (admin or operator) | — | — |
| GET | `/api/printers/{port}/queue` | Session (admin or operator) | — | — |
| DELETE | `/api/printers/{port}/queue/{job_id}` | Session (admin or operator) | — | — |
| POST | `/api/printers/{port}/queue/start` | Session (admin or operator) | — | — |
| POST | `/api/printers/{port}/restart` | Session (admin or operator) | `RESTART_KLIPPER` | Reinicia el proceso de Klipper (equivalente a RESTART). |
| POST | `/api/printers/{port}/resume` | Session (admin or operator) | — | — |
| POST | `/api/printers/{port}/send` | Session (admin or operator) | — | Sube un archivo de la biblioteca de NOPAL al firmware y lo imprime de inmediato o lo agrega a la cola nativa de Moonraker. |
| GET | `/api/printers/{printer_name}/status` | Session (admin or operator) | — | Obtener estado de una impresora específica |
| GET | `/api/printers/queue/count` | Session (admin or operator) | — | Total de trabajos esperando turno entre todas las impresoras — para el badge del sidebar. |
| GET | `/api/printers/recent-files` | Session (admin or operator) | — | Últimos 3 archivos impresos en cada impresora detectada |
| GET | `/api/printers/schedule` | Session (admin or operator) | — | — |
| POST | `/api/printers/schedule` | Session (admin or operator) | — | — |
| DELETE | `/api/printers/schedule/{schedule_id}` | Session (admin or operator) | — | — |
| GET | `/api/printers/status` | Session (admin or operator) | — | Obtener estado de todas las impresoras |


## Status and presets

`backend/api/status.py` · 11 routes

| Method | Route | Access | Policy | Description |
|---|---|---|---|---|
| GET | `/api/status` | Session (admin or operator) | — | — |
| GET | `/api/storage` | Session (admin or operator) | — | Get disk storage information |
| GET | `/api/system/diagnostics` | Session (admin or operator) | — | Info de "Acerca de NOPAL": versión, commit/rama de git (si el checkout es un repo git; si no, "unavailable" -- NOPAL puede correr desde un… |
| GET | `/api/system/stats` | Session (admin or operator) | — | Estadísticas de hardware (MCU + host) de la impresora indicada. |
| GET | `/api/system/temperature-presets` | Session (admin or operator) | — | Perfiles de precalentamiento por material para Klipper y Marlin. |
| POST | `/api/system/temperature-presets` | Admin only | — | Guarda perfiles: {active, materials:[{id,name,heater_bed,extruder}]} |
| POST | `/api/system/temperature-target` | Session (admin or operator) | `SET_TEMPERATURE` | Actualiza la temperatura objetivo de un heater (extruder, heater_bed, etc.). |
| GET | `/api/system/temperatures` | Session (admin or operator) | — | Temperaturas actuales/objetivo e historial de la impresora indicada. |
| GET | `/api/system/toolhead` | Session (admin or operator) | — | Posición actual del cabezal, ejes homeados, factor de velocidad y offset Z. |
| POST | `/api/system/update` | Admin only | — | Aplica `git pull --ff-only` para traer la última versión del repositorio. |
| GET | `/api/system/version` | Session (admin or operator) | — | Versión actual (commit de git) y si hay una actualización disponible en el remoto. |


## System

`backend/api/system.py` · 5 routes

| Method | Route | Access | Policy | Description |
|---|---|---|---|---|
| POST | `/api/system/host/reboot` | Admin only | — | — |
| POST | `/api/system/host/shutdown` | Admin only | — | — |
| POST | `/api/system/nopal/restart` | Admin only | — | Reinicia el propio panel NOPAL (no el host ni Klipper). No afecta impresiones ni conexiones de Klipper/Moonraker -- solo el panel queda ina… |
| GET | `/api/system/services` | Admin only | — | Servicios systemd de Klipper/Moonraker/Crowsnest detectados en el host. |
| POST | `/api/system/services/{action}` | Admin only | — | — |


## File upload

`backend/api/upload.py` · 1 routes

| Method | Route | Access | Policy | Description |
|---|---|---|---|---|
| POST | `/api/upload` | Session (admin or operator) | — | — |
