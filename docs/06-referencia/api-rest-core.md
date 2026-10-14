---
title: API REST del core
sidebar_label: API REST del core
audience: reference
type: reference
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
generated: true
---

# API REST del core

:::note
Página **generada** automáticamente. No la edites a mano: corrige la fuente y vuelve a generar.
Verificado contra `nopal@4346f72` (2026-10-07).
:::

Inventario de las rutas de NOPAL obtenido por **análisis estático** del código (decoradores `@router.*` y dependencias de acceso). No se ejecuta NOPAL. El acceso mostrado es el declarado en la ruta; una comprobación de rol dentro del cuerpo de una función no se detecta.

## Cómo leer el acceso

| Valor | Significado |
|---|---|
| Pública | Sin sesión. Solo login, primer arranque y la página principal. |
| Sesión (admin u operador) | Requiere sesión iniciada; el rol se relee del registro de usuarios en cada petición. |
| Solo admin | Requiere el rol `admin`. El rol de operador se guarda internamente como `operador`. |
| Política | Rutas ya migradas a la Authorization Policy (ADR-006): consultan la acción indicada antes de ejecutar. El resto usa solo el rol. |

## Resumen

| Acceso | Rutas |
|---|---:|
| Pública | 5 |
| Sesión (admin u operador) | 141 |
| Solo admin | 51 |
| **Total** | **197** |


## NOPAL Intelligence (IA)

`backend/api/ai.py` · 25 rutas

| Método | Ruta | Acceso | Política | Descripción |
|---|---|---|---|---|
| GET | `/api/ai/actions` | Sesión (admin u operador) | — | Acciones que ESTE usuario puede ejecutar por medio de la IA. |
| POST | `/api/ai/actions/{token}/cancel` | Sesión (admin u operador) | — | — |
| POST | `/api/ai/actions/{token}/confirm` | Sesión (admin u operador) | — | Ejecuta una acción de riesgo que quedó esperando confirmación. |
| POST | `/api/ai/ask` | Sesión (admin u operador) | — | Pregunta en lenguaje natural sobre el taller. |
| GET | `/api/ai/config` | Solo admin | — | Configuración vigente, sin la API key (solo si está puesta o no). |
| PUT | `/api/ai/config` | Solo admin | — | — |
| GET | `/api/ai/conversations` | Sesión (admin u operador) | — | Listado sin los mensajes: una conversación larga no tiene por qué viajar entera solo para pintar la barra lateral. |
| DELETE | `/api/ai/conversations` | Sesión (admin u operador) | `CLEAR_ALL_CONVERSATIONS` | Borrar el historial completo (C-4): operación de almacenamiento solo para admin. Afecta lo que vieron todos los usuarios, pero no da acceso… |
| GET | `/api/ai/conversations/{conversation_id}` | Sesión (admin u operador) | — | — |
| PUT | `/api/ai/conversations/{conversation_id}` | Sesión (admin u operador) | — | — |
| DELETE | `/api/ai/conversations/{conversation_id}` | Sesión (admin u operador) | — | — |
| POST | `/api/ai/enabled` | Solo admin | — | Enciende o apaga la capa sin tocar el registro de IAs guardadas. |
| GET | `/api/ai/presets` | Solo admin | — | Proveedores conocidos para poblar el selector de la interfaz. |
| GET | `/api/ai/providers` | Solo admin | — | Las IAs guardadas, sin sus claves. Marca cuál está activa. |
| POST | `/api/ai/providers` | Solo admin | — | Agrega una IA al registro. La primera que se agrega queda activa. |
| PUT | `/api/ai/providers/{provider_id}` | Solo admin | — | — |
| DELETE | `/api/ai/providers/{provider_id}` | Solo admin | — | Borrar la IA activa pasa la activación a la primera que quede; si no queda ninguna, la capa se apaga sola en vez de apuntar a la nada. |
| POST | `/api/ai/providers/{provider_id}/activate` | Solo admin | — | — |
| GET | `/api/ai/status` | Sesión (admin u operador) | — | Estado resumido para pintar el indicador de la UI. No contacta al servidor de IA (eso es /test, que sí cuesta una petición de red). |
| GET | `/api/ai/suggestions` | Sesión (admin u operador) | — | Preguntas rápidas del asistente. Lista vacía = usar las de fábrica, que el frontend traduce; las guardadas van tal cual. |
| PUT | `/api/ai/suggestions` | Solo admin | — | — |
| POST | `/api/ai/test` | Solo admin | — | Prueba la conexión contra el servidor de IA. |
| GET | `/api/ai/tiers` | Solo admin | — | Niveles del modo automático y cómo se encadenan si uno falla. La UI los pinta; los nombres de modelo salen de la configuración, no de acá. |
| GET | `/api/ai/tools` | Sesión (admin u operador) | — | Catálogo de herramientas de solo lectura que se le ofrecen al modelo. |
| POST | `/api/ai/tools/{tool_name}` | Sesión (admin u operador) | — | Ejecuta una herramienta directamente, sin pasar por el modelo. |


## Autenticación y usuarios

`backend/api/auth.py` · 9 rutas

| Método | Ruta | Acceso | Política | Descripción |
|---|---|---|---|---|
| POST | `/api/auth/login` | Pública | — | — |
| POST | `/api/auth/logout` | Pública | — | — |
| GET | `/api/auth/me` | Sesión (admin u operador) | — | — |
| POST | `/api/auth/setup` | Pública | — | Crea la cuenta admin inicial y arranca la sesión de una — solo funciona una vez, mientras auth_users.json esté vacío. |
| GET | `/api/auth/setup-required` | Pública | — | Público a propósito (todavía no puede existir ninguna sesión antes de que exista el primer usuario) — el frontend lo consulta antes de deci… |
| GET | `/api/auth/users` | Solo admin | — | — |
| POST | `/api/auth/users` | Solo admin | — | — |
| POST | `/api/auth/users/remove` | Solo admin | — | — |
| POST | `/api/auth/users/update` | Solo admin | — | Cambia el rol y/o resetea la contraseña de un usuario existente — usado desde Configuración &gt; Usuarios. |


## Impresoras Bambu Lab

`backend/api/bambu_printers.py` · 9 rutas

| Método | Ruta | Acceso | Política | Descripción |
|---|---|---|---|---|
| GET | `/api/bambu/printers` | Sesión (admin u operador) | — | Impresoras Bambu Lab registradas en NOPAL, con su status actual (leído del caché que mantiene el hilo MQTT persistente de cada una). |
| POST | `/api/bambu/printers` | Solo admin | — | Registra una impresora Bambu Lab -- valida el access code contra la impresora real (handshake MQTT) antes de guardar. |
| DELETE | `/api/bambu/printers/{printer_id}` | Solo admin | — | — |
| POST | `/api/bambu/printers/{printer_id}/cancel` | Sesión (admin u operador) | — | — |
| POST | `/api/bambu/printers/{printer_id}/pause` | Sesión (admin u operador) | — | — |
| POST | `/api/bambu/printers/{printer_id}/resume` | Sesión (admin u operador) | — | — |
| POST | `/api/bambu/printers/{printer_id}/send` | Sesión (admin u operador) | — | Sube un archivo .3mf de la biblioteca de NOPAL a la impresora y arranca la impresión. |
| POST | `/api/bambu/printers/{printer_id}/test-connection` | Sesión (admin u operador) | — | Diagnóstico bajo demanda de una impresora ya registrada -- de solo lectura, no requiere admin. |
| POST | `/api/bambu/printers/discover` | Solo admin | — | Escucha anuncios SSDP de impresoras Bambu Lab en modo LAN (pasivo, sin probe activo -- ver bambu_service.py). |


## Respaldos de configuración

`backend/api/config_backup.py` · 4 rutas

| Método | Ruta | Acceso | Política | Descripción |
|---|---|---|---|---|
| POST | `/api/config-backup/export` | Solo admin | — | — |
| GET | `/api/config-backup/groups` | Solo admin | — | Qué se puede respaldar, y cuáles existen en esta instalación. |
| POST | `/api/config-backup/import` | Solo admin | — | — |
| POST | `/api/config-backup/inspect` | Solo admin | — | Qué trae el respaldo, sin escribir nada. La persona tiene derecho a ver qué va a sobrescribir antes de aceptarlo. |


## Consola y macros

`backend/api/console.py` · 4 rutas

| Método | Ruta | Acceso | Política | Descripción |
|---|---|---|---|---|
| POST | `/api/console/command` | Sesión (admin u operador) | `SEND_CONSOLE_COMMAND` | Envía un comando de consola/G-code a la impresora indicada. |
| GET | `/api/console/messages` | Sesión (admin u operador) | — | Últimos mensajes de la consola G-code de la impresora indicada. |
| GET | `/api/macros` | Sesión (admin u operador) | — | Lista de macros configurados en la impresora indicada. |
| POST | `/api/macros/run` | Sesión (admin u operador) | `RUN_MACRO` | Ejecuta un macro por nombre en la impresora indicada. |


## Panel de control

`backend/api/dashboard.py` · 1 rutas

| Método | Ruta | Acceso | Política | Descripción |
|---|---|---|---|---|
| GET | `/api/dashboard/summary` | Sesión (admin u operador) | — | Resumen agregado para el panel de control: salud del sistema, host, conteo de dispositivos, trabajos activos y alertas — compone datos que… |


## Dispositivos

`backend/api/devices.py` · 1 rutas

| Método | Ruta | Acceso | Política | Descripción |
|---|---|---|---|---|
| GET | `/api/devices/registry` | Sesión (admin u operador) | — | Snapshot normalizado de TODAS las marcas (Klipper/Marlin/Bambu/Elegoo/ FlashForge/Láser-CNC), para la tarjeta "Todos los dispositivos" de C… |


## Impresoras Elegoo

`backend/api/elegoo_printers.py` · 9 rutas

| Método | Ruta | Acceso | Política | Descripción |
|---|---|---|---|---|
| GET | `/api/elegoo/printers` | Sesión (admin u operador) | — | Impresoras Elegoo registradas en NOPAL, con su último status conocido (SDCP empuja los cambios solo, no hace falta encuestar acá). |
| POST | `/api/elegoo/printers` | Solo admin | — | Registra una impresora Elegoo -- valida que responda por SDCP real antes de guardar (ver elegoo_service._verify_connection). |
| DELETE | `/api/elegoo/printers/{printer_id}` | Solo admin | — | — |
| POST | `/api/elegoo/printers/{printer_id}/cancel` | Sesión (admin u operador) | — | — |
| POST | `/api/elegoo/printers/{printer_id}/pause` | Sesión (admin u operador) | — | — |
| POST | `/api/elegoo/printers/{printer_id}/resume` | Sesión (admin u operador) | — | — |
| POST | `/api/elegoo/printers/{printer_id}/send` | Sesión (admin u operador) | — | Sube un archivo de la biblioteca de NOPAL a la impresora y arranca la impresión. |
| POST | `/api/elegoo/printers/{printer_id}/test-connection` | Sesión (admin u operador) | — | Diagnóstico bajo demanda de una impresora ya registrada -- de solo lectura, no requiere admin. |
| POST | `/api/elegoo/printers/discover` | Solo admin | — | Escanea la red local en busca de impresoras Elegoo (broadcast UDP). |


## Impresoras FlashForge

`backend/api/flashforge_printers.py` · 9 rutas

| Método | Ruta | Acceso | Política | Descripción |
|---|---|---|---|---|
| GET | `/api/flashforge/printers` | Sesión (admin u operador) | — | Impresoras FlashForge registradas en NOPAL, con su status actual (acá sí se hace un /detail real por impresora, a diferencia de Elegoo). |
| POST | `/api/flashforge/printers` | Solo admin | — | Registra una impresora FlashForge -- valida serialNumber/checkCode contra la impresora real antes de guardar (a diferencia de Elegoo, acá s… |
| DELETE | `/api/flashforge/printers/{printer_id}` | Solo admin | — | — |
| POST | `/api/flashforge/printers/{printer_id}/cancel` | Sesión (admin u operador) | — | — |
| POST | `/api/flashforge/printers/{printer_id}/pause` | Sesión (admin u operador) | — | — |
| POST | `/api/flashforge/printers/{printer_id}/resume` | Sesión (admin u operador) | — | — |
| POST | `/api/flashforge/printers/{printer_id}/send` | Sesión (admin u operador) | — | Sube un archivo de la biblioteca de NOPAL a la impresora y arranca la impresión. |
| POST | `/api/flashforge/printers/{printer_id}/test-connection` | Sesión (admin u operador) | — | Diagnóstico bajo demanda de una impresora ya registrada -- de solo lectura, no requiere admin. |
| POST | `/api/flashforge/printers/discover` | Solo admin | — | Escanea la red local en busca de impresoras FlashForge modernas (5M/5M Pro/AD5X/Creator 5). |


## Láser y CNC (GRBL)

`backend/api/laser.py` · 42 rutas

| Método | Ruta | Acceso | Política | Descripción |
|---|---|---|---|---|
| POST | `/api/laser/command` | Sesión (admin u operador) | `action` | Envía un comando GRBL suelto (jog, $H, $X, etc.). |
| GET | `/api/laser/console` | Sesión (admin u operador) | — | Últimos mensajes transmitidos por el láser (consola en vivo). |
| POST | `/api/laser/console` | Sesión (admin u operador) | `SEND_CONSOLE_COMMAND` | Envía un comando desde la consola del láser. |
| GET | `/api/laser/history` | Sesión (admin u operador) | — | Historial de trabajos láser (completados, cancelados o con error), más recientes primero. |
| POST | `/api/laser/history/snapshot` | Sesión (admin u operador) | — | Adjunta la captura del grill (figura trazada) al trabajo más reciente de ese host. |
| POST | `/api/laser/home` | Sesión (admin u operador) | — | Inicia el ciclo de home ($H en GRBL, G28 en Marlin). |
| GET | `/api/laser/info` | Sesión (admin u operador) | — | Información estática de la placa controladora (chip, firmware, red). |
| POST | `/api/laser/job/cancel` | Sesión (admin u operador) | — | — |
| POST | `/api/laser/job/frame` | Sesión (admin u operador) | — | Recorre el rectángulo que ocupa un trabajo, sin cortarlo. |
| POST | `/api/laser/job/pause` | Sesión (admin u operador) | — | — |
| POST | `/api/laser/job/resume` | Sesión (admin u operador) | — | — |
| POST | `/api/laser/job/start` | Sesión (admin u operador) | — | Inicia el envío de un archivo G-code (de la biblioteca) al láser. |
| GET | `/api/laser/job/status` | Sesión (admin u operador) | — | — |
| GET | `/api/laser/jobs/active` | Sesión (admin u operador) | — | Todos los hosts con un trabajo propio en curso ahora mismo — para que el frontend no pierda de vista un corte activo aunque el usuario esté… |
| POST | `/api/laser/jog` | Sesión (admin u operador) | — | Mueve un eje en relativo. La secuencia real (jog GRBL vs. G91/G1/G90 de Marlin) se arma en el backend según el firmware registrado para ese… |
| GET | `/api/laser/parser-state` | Sesión (admin u operador) | — | Sistema de coordenadas activo (G54/G55/...) vía '$G'. |
| GET | `/api/laser/profiles` | Sesión (admin u operador) | — | Catálogo de perfiles de láser/CNC conocidos (ver printer_profiles.py) -- para poblar el selector de modelo del alta, mismo criterio que /ap… |
| GET | `/api/laser/queue` | Sesión (admin u operador) | — | Trabajos en espera para enviarse al láser. |
| POST | `/api/laser/queue/add` | Sesión (admin u operador) | — | Agrega un archivo G-code de la biblioteca a la cola del láser o del CNC (`kind` decide en qué ficha aparece — ver add_to_queue). |
| POST | `/api/laser/queue/remove` | Sesión (admin u operador) | — | Quita un trabajo de la cola sin enviarlo. |
| POST | `/api/laser/queue/start` | Sesión (admin u operador) | — | Saca un trabajo de la cola y lo transmite línea por línea al láser. |
| GET | `/api/laser/registry` | Sesión (admin u operador) | — | Placas láser registradas en NOPAL (red y USB). |
| POST | `/api/laser/registry` | Solo admin | — | Registra una placa (red o USB) como láser o CNC disponible en NOPAL. |
| POST | `/api/laser/registry/remove` | Solo admin | — | Quita una placa registrada. |
| GET | `/api/laser/registry/status` | Sesión (admin u operador) | — | Igual que /api/laser/registry pero con un campo "online" agregado por placa (USB: existe el puerto ahora; red: probe puntual a ese host) —… |
| GET | `/api/laser/scan` | Solo admin | — | Escanea la red local en busca de otras placas láser (ESP3D) disponibles. |
| GET | `/api/laser/scan-ip` | Solo admin | — | Prueba una IP puntual en vez de barrer toda la subred — para placas fuera del rango detectado automáticamente (otra subred, modo Punto de A… |
| GET | `/api/laser/sd/available` | Sesión (admin u operador) | — | Indica si la placa activa tiene una tarjeta SD navegable. |
| POST | `/api/laser/sd/delete` | Sesión (admin u operador) | — | Elimina un archivo o carpeta de la tarjeta SD. |
| GET | `/api/laser/sd/files` | Sesión (admin u operador) | — | Lista archivos/carpetas de la tarjeta SD insertada en la placa (ESP3D). |
| POST | `/api/laser/sd/folder` | Sesión (admin u operador) | — | Crea una carpeta en la tarjeta SD. |
| POST | `/api/laser/sd/format` | Solo admin | — | Formatea la tarjeta SD -- borra TODO su contenido, sin vuelta atrás. Admin-only server-side (no solo oculto en el frontend). Ver el comenta… |
| POST | `/api/laser/sd/run` | Sesión (admin u operador) | — | Corre directamente un archivo que ya está en la SD, sin volver a subirlo. |
| POST | `/api/laser/sd/upload` | Sesión (admin u operador) | — | Sube un archivo (desde tu computadora) directo a la tarjeta SD de la placa. No espera a que termine: el tramo lento de verdad es NOPAL-&gt;pla… |
| POST | `/api/laser/sd/upload-from-library` | Sesión (admin u operador) | — | Envía un archivo ya subido a la biblioteca de G-code de NOPAL directo a la SD de la placa -- mismo criterio de segundo plano + upload_id qu… |
| GET | `/api/laser/sd/upload-progress/{upload_id}` | Sesión (admin u operador) | — | Estado real de una subida en curso (ver sd_upload_file_tracked). Cuando status ya es "done"/"error" el frontend deja de sondear y llama a e… |
| POST | `/api/laser/sd/upload-progress/{upload_id}/clear` | Sesión (admin u operador) | — | — |
| GET | `/api/laser/settings` | Sesión (admin u operador) | — | Parámetros $$ actuales de la placa GRBL. |
| POST | `/api/laser/settings` | Sesión (admin u operador) | `GRBL_SETTINGS` | Actualiza un parámetro $$ individual. |
| GET | `/api/laser/status` | Sesión (admin u operador) | — | Estado en vivo del láser (posición, estado GRBL) vía websocket. |
| GET | `/api/laser/usb-ports` | Sesión (admin u operador) | — | Puertos serie USB conectados que coinciden con chips de controladoras láser. |
| POST | `/api/laser/usb-ports/test` | Solo admin | — | Prueba si el puerto USB indicado responde al protocolo GRBL (envía '?'). |


## Configuración de registros

`backend/api/logging_config.py` · 2 rutas

| Método | Ruta | Acceso | Política | Descripción |
|---|---|---|---|---|
| GET | `/api/logs/config` | Sesión (admin u operador) | — | — |
| PUT | `/api/logs/config` | Sesión (admin u operador) | `SYSTEM_CONTROL` | — |


## Registros (visor)

`backend/api/logs.py` · 1 rutas

| Método | Ruta | Acceso | Política | Descripción |
|---|---|---|---|---|
| GET | `/api/logs` | Sesión (admin u operador) | — | — |


## Aplicación (raíz)

`backend/main.py` · 3 rutas

| Método | Ruta | Acceso | Política | Descripción |
|---|---|---|---|---|
| GET | `/` | Pública | — | — |
| GET | `/uploads/{filename:path}` | Sesión (admin u operador) | — | Sirve archivos de la biblioteca solo a usuarios autenticados. |
| GET | `/view/{filename:path}` | Sesión (admin u operador) | — | — |


## Impresoras Marlin

`backend/api/marlin_printers.py` · 26 rutas

| Método | Ruta | Acceso | Política | Descripción |
|---|---|---|---|---|
| GET | `/api/marlin-printers/console` | Sesión (admin u operador) | — | — |
| POST | `/api/marlin-printers/console` | Sesión (admin u operador) | `SEND_CONSOLE_COMMAND` | — |
| GET | `/api/marlin-printers/discover` | Solo admin | — | Puertos USB conectados que podrían ser una impresora Marlin (aún no registrados). |
| POST | `/api/marlin-printers/home` | Sesión (admin u operador) | `HOME` | — |
| GET | `/api/marlin-printers/jobs/active` | Sesión (admin u operador) | — | — |
| POST | `/api/marlin-printers/jog` | Sesión (admin u operador) | `MOVE` | — |
| GET | `/api/marlin-printers/mks-wifi/discover` | Solo admin | — | Descubre módulos oficiales MKS WiFi mediante broadcast UDP 8989. |
| POST | `/api/marlin-printers/mks-wifi/test` | Solo admin | — | — |
| POST | `/api/marlin-printers/print/cancel` | Sesión (admin u operador) | `CANCEL` | — |
| POST | `/api/marlin-printers/print/pause` | Sesión (admin u operador) | `PAUSE` | — |
| POST | `/api/marlin-printers/print/resume` | Sesión (admin u operador) | `RESUME` | — |
| POST | `/api/marlin-printers/print/start` | Sesión (admin u operador) | `START_JOB` | Inicia el envío de un archivo G-code (de la biblioteca) a la impresora. |
| GET | `/api/marlin-printers/print/status` | Sesión (admin u operador) | `VIEW_STATUS` | — |
| GET | `/api/marlin-printers/profiles` | Sesión (admin u operador) | — | Catálogo de perfiles de impresora conocidos (ver printer_profiles.py) -- para poblar el selector de modelo del alta. Vacío para una placa M… |
| GET | `/api/marlin-printers/registry` | Sesión (admin u operador) | — | — |
| POST | `/api/marlin-printers/registry` | Solo admin | — | Registra una impresora Marlin por USB o por el puente TCP de MKS WiFi. El handshake es obligatorio server-side (no solo confiar en que el f… |
| POST | `/api/marlin-printers/registry/remove` | Solo admin | — | — |
| GET | `/api/marlin-printers/registry/status` | Sesión (admin u operador) | — | — |
| GET | `/api/marlin-printers/sd/available` | Sesión (admin u operador) | — | M21 -- si la placa reporta una tarjeta SD insertada. Usado por el modal "Enviar a impresora" para decidir si ofrece la opción de SD. |
| GET | `/api/marlin-printers/sd/files` | Sesión (admin u operador) | — | Lista G-code directamente desde la SD de la impresora (M20). |
| POST | `/api/marlin-printers/sd/print/start` | Sesión (admin u operador) | `START_JOB` | Arranca el archivo dentro de la SD con M23/M24, sin copia local. |
| POST | `/api/marlin-printers/sd/upload-and-print` | Sesión (admin u operador) | `START_JOB` | Sube un archivo de la biblioteca a la SD de la impresora (M28/M29) y arranca la impresión (M23/M24) -- opcionalmente precalentando primero… |
| GET | `/api/marlin-printers/status` | Sesión (admin u operador) | `VIEW_STATUS` | — |
| POST | `/api/marlin-printers/temperature-target` | Sesión (admin u operador) | `SET_TEMPERATURE` | — |
| GET | `/api/marlin-printers/temperatures` | Sesión (admin u operador) | `VIEW_STATUS` | — |
| POST | `/api/marlin-printers/usb-ports/test` | Solo admin | — | Prueba si el puerto USB indicado responde al protocolo Marlin. Si no se manda `baud`, autodetecta probando 115200 y 250000 en orden (ver pr… |


## Biblioteca de modelos y G-code

`backend/api/models.py` · 10 rutas

| Método | Ruta | Acceso | Política | Descripción |
|---|---|---|---|---|
| GET | `/api/browse` | Sesión (admin u operador) | — | Contenido (carpetas + archivos) de una carpeta dentro de la sección indicada. |
| PATCH | `/api/files` | Sesión (admin u operador) | — | Renombra un archivo existente (conserva la extensión). |
| DELETE | `/api/files` | Sesión (admin u operador) | — | Elimina un archivo de la sección indicada. |
| POST | `/api/files/move` | Sesión (admin u operador) | — | Mueve un archivo a otra carpeta dentro de la misma sección. |
| POST | `/api/folders` | Sesión (admin u operador) | — | Crea una subcarpeta dentro de la sección indicada. |
| PATCH | `/api/folders` | Sesión (admin u operador) | — | Renombra una subcarpeta existente. |
| DELETE | `/api/folders` | Sesión (admin u operador) | — | Elimina una subcarpeta (y su contenido) de la sección indicada. |
| GET | `/api/gcode/thumbnail` | Sesión (admin u operador) | — | Miniatura 2D generada por NOPAL a partir de la trayectoria real del G-code (para la galería de archivos CNC/láser) — a diferencia de /api/m… |
| GET | `/api/models` | Sesión (admin u operador) | — | Listado plano y recursivo de todos los archivos (usado por estadísticas). |
| GET | `/api/models/thumbnail` | Sesión (admin u operador) | — | Miniatura PNG incrustada por el slicer en el propio G-code (thumbnail begin/end). 404 si el archivo no trae ninguna incrustada. |


## Notificaciones

`backend/api/notifications.py` · 1 rutas

| Método | Ruta | Acceso | Política | Descripción |
|---|---|---|---|---|
| GET | `/api/notifications` | Sesión (admin u operador) | — | Cuenta de problemas activos ahora mismo (impresoras/láser/CNC/ accesorios desconectados, trabajos con error, actualización disponible) — no… |


## Galería de plugins

`backend/api/plugins.py` · 4 rutas

| Método | Ruta | Acceso | Política | Descripción |
|---|---|---|---|---|
| GET | `/api/plugins` | Sesión (admin u operador) | — | — |
| DELETE | `/api/plugins/{plugin_id}` | Solo admin | — | — |
| POST | `/api/plugins/{plugin_id}/install` | Solo admin | — | — |
| POST | `/api/plugins/{plugin_id}/update` | Solo admin | — | — |


## Impresoras Klipper / Moonraker

`backend/api/printers.py` · 20 rutas

| Método | Ruta | Acceso | Política | Descripción |
|---|---|---|---|---|
| GET | `/api/printers` | Sesión (admin u operador) | — | Obtener lista de impresoras detectadas |
| POST | `/api/printers/{port}/cancel` | Sesión (admin u operador) | — | — |
| GET | `/api/printers/{port}/config-files` | Sesión (admin u operador) | — | — |
| GET | `/api/printers/{port}/config-files/content` | Sesión (admin u operador) | — | — |
| POST | `/api/printers/{port}/config-files/content` | Sesión (admin u operador) | `PRINTER_CONFIG` | — |
| POST | `/api/printers/{port}/firmware-restart` | Sesión (admin u operador) | `FIRMWARE_RESTART` | Reinicia el firmware del MCU (equivalente a FIRMWARE_RESTART). |
| POST | `/api/printers/{port}/pause` | Sesión (admin u operador) | — | — |
| GET | `/api/printers/{port}/queue` | Sesión (admin u operador) | — | — |
| DELETE | `/api/printers/{port}/queue/{job_id}` | Sesión (admin u operador) | — | — |
| POST | `/api/printers/{port}/queue/start` | Sesión (admin u operador) | — | — |
| POST | `/api/printers/{port}/restart` | Sesión (admin u operador) | `RESTART_KLIPPER` | Reinicia el proceso de Klipper (equivalente a RESTART). |
| POST | `/api/printers/{port}/resume` | Sesión (admin u operador) | — | — |
| POST | `/api/printers/{port}/send` | Sesión (admin u operador) | — | Sube un archivo de la biblioteca de NOPAL al firmware y lo imprime de inmediato o lo agrega a la cola nativa de Moonraker. |
| GET | `/api/printers/{printer_name}/status` | Sesión (admin u operador) | — | Obtener estado de una impresora específica |
| GET | `/api/printers/queue/count` | Sesión (admin u operador) | — | Total de trabajos esperando turno entre todas las impresoras — para el badge del sidebar. |
| GET | `/api/printers/recent-files` | Sesión (admin u operador) | — | Últimos 3 archivos impresos en cada impresora detectada |
| GET | `/api/printers/schedule` | Sesión (admin u operador) | — | — |
| POST | `/api/printers/schedule` | Sesión (admin u operador) | — | — |
| DELETE | `/api/printers/schedule/{schedule_id}` | Sesión (admin u operador) | — | — |
| GET | `/api/printers/status` | Sesión (admin u operador) | — | Obtener estado de todas las impresoras |


## Estado y preajustes

`backend/api/status.py` · 11 rutas

| Método | Ruta | Acceso | Política | Descripción |
|---|---|---|---|---|
| GET | `/api/status` | Sesión (admin u operador) | — | — |
| GET | `/api/storage` | Sesión (admin u operador) | — | Get disk storage information |
| GET | `/api/system/diagnostics` | Sesión (admin u operador) | — | Info de "Acerca de NOPAL": versión, commit/rama de git (si el checkout es un repo git; si no, "unavailable" -- NOPAL puede correr desde un… |
| GET | `/api/system/stats` | Sesión (admin u operador) | — | Estadísticas de hardware (MCU + host) de la impresora indicada. |
| GET | `/api/system/temperature-presets` | Sesión (admin u operador) | — | Perfiles de precalentamiento por material para Klipper y Marlin. |
| POST | `/api/system/temperature-presets` | Solo admin | — | Guarda perfiles: {active, materials:[{id,name,heater_bed,extruder}]} |
| POST | `/api/system/temperature-target` | Sesión (admin u operador) | `SET_TEMPERATURE` | Actualiza la temperatura objetivo de un heater (extruder, heater_bed, etc.). |
| GET | `/api/system/temperatures` | Sesión (admin u operador) | — | Temperaturas actuales/objetivo e historial de la impresora indicada. |
| GET | `/api/system/toolhead` | Sesión (admin u operador) | — | Posición actual del cabezal, ejes homeados, factor de velocidad y offset Z. |
| POST | `/api/system/update` | Solo admin | — | Aplica `git pull --ff-only` para traer la última versión del repositorio. |
| GET | `/api/system/version` | Sesión (admin u operador) | — | Versión actual (commit de git) y si hay una actualización disponible en el remoto. |


## Sistema

`backend/api/system.py` · 5 rutas

| Método | Ruta | Acceso | Política | Descripción |
|---|---|---|---|---|
| POST | `/api/system/host/reboot` | Solo admin | — | — |
| POST | `/api/system/host/shutdown` | Solo admin | — | — |
| POST | `/api/system/nopal/restart` | Solo admin | — | Reinicia el propio panel NOPAL (no el host ni Klipper). No afecta impresiones ni conexiones de Klipper/Moonraker -- solo el panel queda ina… |
| GET | `/api/system/services` | Solo admin | — | Servicios systemd de Klipper/Moonraker/Crowsnest detectados en el host. |
| POST | `/api/system/services/{action}` | Solo admin | — | — |


## Subida de archivos

`backend/api/upload.py` · 1 rutas

| Método | Ruta | Acceso | Política | Descripción |
|---|---|---|---|---|
| POST | `/api/upload` | Sesión (admin u operador) | — | — |
