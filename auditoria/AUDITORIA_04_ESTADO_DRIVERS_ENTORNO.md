# Auditoría 04 — Estado, drivers, entorno, demo, TUNA-Screen y sitios

Fecha: 2026-10-14 · Base: `nopal@main`, 7 repos de plugin, `nopal-demo`, y carpetas locales de TUNA-Screen y del sitio web
Excluido: `MKS-DLC32-FIRMWARE`. Cierra los pendientes **B, D, E y G** de AUDITORIA_02. Leyenda: **[V]** verificado · **[?]** pendiente.

## 1. Archivos de estado y configuración [V]

Rutas **relativas al directorio de trabajo** del servicio (los nombres sin carpeta están en la raíz de la instalación, junto a `backend/`).
Todos están en el `.gitignore` del core: son estado por instalación, no código. **Ningún esquema interno está documentado**; hay que leer cada servicio para describirlos [?].

### Core
| Archivo | Propósito | Servicio |
|---|---|---|
| `auth_users.json` | Usuarios, hashes de contraseña (PBKDF2-HMAC-SHA256), rol | `auth_service` |
| `tunascreen_devices.json` | Dispositivos TUNA-Screen emparejados (token con hash) | `tunascreen_service` |
| `laser_registry.json`, `laser_history.json` | Láser/CNC registrados e historial de trabajos | `laser_service` |
| `marlin_printer_registry.json` | Impresoras Marlin | `marlin_printer_service` |
| `bambu_printer_registry.json` · `elegoo_printer_registry.json` · `flashforge_printer_registry.json` | Registro por marca | `*_service` |
| `scheduled_prints.json` | Impresiones programadas (Klipper) | `klipper_service` |
| `temperature_presets.json` | Preajustes de temperatura | `api/status.py` |
| `ai_config.json` | Config. de NOPAL Intelligence; **puede contener la API key del proveedor** (el SDD indica permisos 0644) | `ai_config_service` |
| `ai_conversations.json` | Historial de conversaciones con la IA | `ai_conversations_service` |
| `logging_config.json` | Niveles y almacenamiento de logs | `logging_config_service` |
| `gcode_bounds_cache.json` | Caché de límites de G-code | `gcode_bounds` |
| `data/plugins/installed.json` | Plugins instalados y habilitados (`NOPAL_PLUGIN_DATA_DIR`) | `plugin_installer_service` |
| `backend/plugin_catalog.json` | Catálogo de la Galería (**versionado**, no es estado) | core |
| `logs/nopal.log` (+ rotados `.1`–`.5`, 5 MB c/u) | Registro de la aplicación | `config.py` |

Carpetas de datos de usuario (también ignoradas): `uploads/`, `previews/`, `backups/`, `database/`, `logs/`, `camera_captures/`.

### Plugins
| Plugin | Archivos |
|---|---|
| arduino-accessories | `accessory_registry.json`, `arduino_boards_config.json`, `data/accessories/{scenes,activity_log,cluster_events,machine_led_rules}.json` |
| camera-viewer | `camera_registry.json` |
| cotizador | `pricing_config.json`, `quotes_registry.json` |
| spoolman | `spoolman_config.json`, `spoolman_printer_links.json`, `spoolman_reservations.json`, `spoolman_usage_log.json` |
| matriz-led | `data/plugins/matriz-led/{config,announcements,last_sent,last_sent_history,machine_alerts,fk8wa,fk8wa_message,fk8wa_effects_tested}.json` |

Hay **dos convenciones de ubicación** para los plugins (archivos en la raíz como `camera_registry.json` frente a `data/<plugin>/…`). No hay regla;
documentar por plugin. `scripts/migrate_machine_identity.py` y `machine_identity_migration.py` actualizan varios de estos archivos al migrar identidades de máquina.

## 2. Variables de entorno y parámetros [V]

| Variable | Uso | Valor por defecto |
|---|---|---|
| `NOPAL_PORT` | Puerto del servicio (en `install.sh`) | `8420` |
| `NOPAL_USER` | Usuario del servicio systemd (en `install.sh`) | usuario actual [?] |
| `NOPAL_KLIPPER_PORTS` | Puertos adicionales de Moonraker | vacío |
| `NOPAL_PLUGIN_DATA_DIR` | Directorio de estado de plugins | `data/plugins` |
| `NOPAL_CORE_ROOT` | Ruta del core al ejecutar tests de un plugin | — |
| `NOPAL_AI_ENABLED`, `NOPAL_AI_PROVIDER`, `NOPAL_AI_BASE_URL`, `NOPAL_AI_MODEL`, `NOPAL_AI_MODEL_MODE`, `NOPAL_AI_TIMEOUT`, `NOPAL_AI_TEMPERATURE`, `NOPAL_AI_MAX_TOKENS`, `NOPAL_AI_MAX_TOOL_ITERATIONS`, `NOPAL_AI_TOOL_PROFILE`, `NOPAL_AI_TOOL_MODE` | NOPAL Intelligence | ver `ai_config_service` [?] |

Los valores por defecto de las variables de IA no se verificaron; el resto de coincidencias de `NOPAL_*` son constantes de color del sistema de diseño, no entorno.

## 3. Instalación y despliegue [V]

- `install.sh`: instala `python3-venv` y `python3-pip` con `apt`, crea `.venv`, genera **`<SERVICE_NAME>.service`** en `/etc/systemd/system/` y arranca con
  `uvicorn backend.main:app --host 0.0.0.0 --port ${NOPAL_PORT:-8420}`. Solo Debian/Ubuntu y derivados (usa `apt-get`).
- **Sin TLS** en el servicio. El README recomienda proxy inverso para exponer fuera de la LAN.
- `uninstall.sh`: conserva datos por defecto; `--purgar` los borra tras confirmación y crea respaldo (según README) [?: verificar el script].
- Autoactualización desde la interfaz (solo admin): `git pull --ff-only` + `pip install -r requirements.txt`; se bloquea con trabajos activos o cambios locales (SDD §17.1).
- Python mínimo **3.9** (CI con 3.9 y 3.11). `matriz-led` exige ≥ 3.10.
- Dependencias (`requirements.txt`): fastapi 0.128.8, uvicorn 0.39.0, jinja2, python-multipart, aiofiles, pillow, requests, requests-toolbelt, websockets, pyserial,
  itsdangerous, xhtml2pdf, esptool, paho-mqtt, httpx, cryptography.
- **Respaldos de configuración**: cifrados con Fernet y clave derivada de una frase del usuario (pueden incluir hashes y la API key de IA). Ver `config_backup_service`.

## 4. Drivers: protocolos y capacidades [V por código/docstrings]

| Familia | Protocolo y puerto | Modelo de conexión | Capacidades expuestas por API | Notas verificadas |
|---|---|---|---|---|
| **Klipper / Moonraker** | HTTP REST (Moonraker, puerto por defecto 7125 [?]) | Poll de REST | Estado, pausa/reanudar/cancelar, reinicio de Klipper y firmware, edición de `printer.cfg`, cola, programación, envío de archivos | Puertos extra con `NOPAL_KLIPPER_PORTS`. Moonraker no se autentica en la LAN (SDD) |
| **Marlin** | USB serie y **MKS WiFi** (UDP 8989 de descubrimiento + puente TCP 8080) | Poll `M105/M114` | Estado, temperaturas, jog, home, consola, impresión por G-code y desde SD, pausa/reanudar/cancelar | La subida rápida propietaria a la SD de MKS **no** está soportada |
| **Bambu Lab** | MQTT sobre TLS **8883** + FTPS para subir | MQTT persistente (un hilo por impresora) | Alta/descubrir/probar, pausa, reanudar, cancelar, enviar | Autenticación con *access code* (usuario `bblp`) |
| **Elegoo (SDCP)** | WebSocket | WS persistente; la impresora empuja el estado | Alta/descubrir/probar, pausa, reanudar, cancelar, enviar | Centauri Carbon/Carbon 2, Neptune 4, OrangeStorm Giga. **No** se usa el SDK oficial ni MQTT de resina |
| **FlashForge** | HTTP REST, puerto **8898**, `serialNumber+checkCode` | Petición/respuesta sin estado | Alta/descubrir/probar, pausa, reanudar, cancelar, enviar | Adventurer 5M/5M Pro, AD5X, Creator 5/5 Pro. **No** soporta Adventurer 3/4 (TCP 8899, sesión exclusiva) |
| **GRBL láser/CNC** | WebSocket persistente + HTTP (subida a SD) [?: confirmar USB directo] | WS persistente | 42 rutas: estado en vivo, jog, home, trabajos, encuadre, cola, SD (subir/borrar/formatear), ajustes `$` | Varias máquinas independientes; el "host activo global" se retiró (D4) |

Las capacidades de la matriz de compatibilidad **deben salir de la API real de cada driver**, no de la marca. Los modelos concretos probados no constan en el código;
**no se declaran como "compatibles" sin confirmación del autor** (Standard §13) [?].

## 5. TUNA-Screen — DIFERIDA (repo privado) [V parcial]

> Por decisión del responsable (2026-10-14), TUNA-Screen **no entra en la documentación hasta nueva orden**. Esta sección es solo evidencia interna de la auditoría y **no debe usarse para redactar páginas**.

- **Repositorio privado** (no aparece entre los 11 repos públicos); existe en la carpeta local `TUNA-Screen/repo` (Kotlin + Jetpack Compose, `README.md`, `HANDOFF.md`).
  La carpeta `TUNA-S` (Flutter) **queda fuera de NOPAL** por decisión del responsable (2026-10-14).
- El README de la app describe: pantalla completa horizontal, **descubrimiento por NSD y conexión manual por IP**, emparejamiento con código temporal y token persistente,
  perfiles por tamaño de pantalla (3.5"/4.3", 5", 7", 10", PC), estado en vivo por WebSocket, acciones según `machine.actions`.
- **Discrepancia:** la hoja de ruta del README del core menciona mDNS como pendiente, mientras la app ya usa NSD. Hay que fijar qué es cierto antes de publicar [?].
- El contrato API v1 está en `docs/TUNASCREEN_API.md` y en `tunascreen.py` (20 rutas: 12 con token de dispositivo, 5 solo admin, 3 públicas).
- Distribución e instalación: sin definir; **no se documenta** mientras esté diferida.

## 6. `nopal-demo` [V]

- Es **una build, no un fork**: todo se copia del core salvo `static/js/demo-data.js`, que intercepta `window.fetch` y responde desde un taller simulado en memoria.
- Compilada desde el commit **`92e5443`** del core (v1.2.0-alpha.1, **2026-08-19**). El core ha cambiado mucho desde entonces (20 commits solo entre el 3 y el 7 de octubre).
- **Consecuencia:** las capturas tomadas de la demo **no** reflejarán la interfaz actual (tarjeta de dispositivo unificada de Marlin, visor de logs, tarjeta de acceso TUNA-Screen, centro de ayuda). Decisión de arquitectura: capturar desde una instancia
  local del core `main` con datos de prueba, o reconstruir la demo antes de capturar. *(Ajusta la decisión 4 de ARCHITECTURE §12.)*
- Simula 2 impresoras 3D, 1 láser, 1 CNC, bobinas, cámaras, galería, historial, biblioteca y el asistente de IA.

## 7. Sitio web y landing (carpetas locales) [V parcial]

| Carpeta | Contenido | Observación |
|---|---|---|
| `nopal_sitio_web/nopal_site` | `index.html`, `assets/`, `images/`, `manual/` (PDF del manual de usuario y logo), `COMO_PUBLICAR.md` | Sitio estático de presentación para GitHub Pages. Copia un manual en PDF: **riesgo de duplicado desactualizado** frente al nuevo sitio |
| `@LANDING_PAGE_AYUDA@` | `collab-admin.html`, `collab-admin-assets/`, `abrir-panel.bat` | Panel de colaboración/ayuda [?: propósito exacto] |
| `core: docs/index.html`, `docs/nopal-landing.html`, `docs/colabora/` | Páginas estáticas dentro del core | [?: relación con `nopal_site`] |

**Decisión pendiente:** qué hace el nuevo `nopal-docs` frente a la landing existente (¿se enlaza desde ella, la reemplaza, o conviven con dominios distintos?).
`@PLUGIN TIPOGRAFIA@` está vacía.

## 8. Elementos locales fuera de alcance

- `purecutcnc-main`: **no forma parte de NOPAL** (confirmado por el responsable, 2026-10-14). Excluido.
- `TUNA-S` (Flutter): **excluido** (confirmado, 2026-10-14).
- `@PLUGIN TIPOGRAFIA@`: **excluida** (confirmado, 2026-10-14).

## 9. Hallazgos que cambian el plan

1. **Las capturas no pueden venir de la demo actual** (§6): requieren una instancia del core `main`.
2. **No existe un esquema documentado de los archivos de estado**; la página de referencia será trabajo de lectura de código, no de recopilación.
3. **Hay dos convenciones de ubicación de datos en plugins** y un problema latente de colisión de rutas (AUDITORIA_03).
4. **TUNA-Screen es privada y está diferida**: sin guía, sin contrato publicado y sin mención en páginas públicas.
5. **El sitio estático existente (`nopal_site`) incluye un PDF del manual**: hay que decidir cómo convive.
6. **El instalador solo cubre Debian/Ubuntu y derivados**: la guía de instalación debe decirlo con claridad.

## 10. Pendientes que quedan (candidatos a F2 bis o a F4)

| # | Tarea |
|---|---|
| 4.1 | Documentar el esquema de cada archivo de estado (leyendo los servicios) |
| 4.2 | Confirmar: puerto por defecto de Moonraker, USB directo en GRBL, valores por defecto de las variables de IA |
| 4.3 | Revisar `uninstall.sh` (`--purgar`) y el flujo de autoactualización |
| 4.4 | Leer `SDD.md` §5–21 y `AGENTS.md` completos para separar actual/propuesto (pendiente **F**) |
| 4.5 | Listado de modelos de hardware realmente probados (lo aporta el autor) |
