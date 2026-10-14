# Auditoría 03 — API, autenticación y roles

Fecha: 2026-10-14 · Base: `nopal@main` y los 7 repos de plugin clonados el mismo día · Excluido: `MKS-DLC32-FIRMWARE`
Inventario completo: [`data/rutas.csv`](data/rutas.csv) (367 rutas). Cierra los pendientes **A** y **C** de AUDITORIA_02.

**Método.** Análisis estático (AST de Python) de los decoradores `@router.get|post|put|delete|patch|websocket` y de las dependencias
`Depends(...)` de cada función. No se ejecutó código. **Límite:** no ve comprobaciones de rol hechas *dentro* del cuerpo de una función
(`if user["role"] != ...`) ni cambios dinámicos; el campo `mecanismo_crudo` del CSV conserva lo detectado para revisarlo.

## 1. Totales

| Componente | Rutas | Sesión (admin u operador) | Solo admin | Token de dispositivo | Públicas |
|---|---:|---:|---:|---:|---:|
| Core (`backend/api` + `main.py`) | 217 | 141 | 56 | 12 | 8 |
| Plugins (5 con backend) | 150 | 96 | 53 | — | 1 |
| **Total** | **367** | **237** | **109** | **12** | **9** |

Por plugin: matriz-led 40 · arduino-accessories 43 · camera-viewer 32 · cotizador 18 · spoolman 17.
Plugins sin backend: shape-creator, svg-toolkit, font-library.

## 2. Mecanismos de autenticación y autorización [V]

| Mecanismo | Dónde | Efecto |
|---|---|---|
| `require_auth` | `backend/auth_deps.py` | Exige sesión de cookie; **relee el rol del registro en cada petición** (degradar o borrar un usuario surte efecto al instante). 401 si no hay sesión |
| `require_role("admin")` | `backend/auth_deps.py` | Igualdad de rol, sin jerarquía. 403 "Permiso insuficiente" |
| `ensure_authorized(user, Action, Resource)` | `backend/auth_deps.py` + `authorization_policy.py` | Consulta la **Authorization Policy (ADR-006)**; 403 si DENY. Hoy en 24 rutas |
| `require_device_token` | `tunascreen.py` | Bearer de dispositivo TUNA-Screen en 12 rutas |
| Token compartido `X-NOPAL-Token` | `arduino-accessories` | Autentica al firmware ESP32 en `POST /api/accessories/cluster/event` |

Roles reales: `admin` y `operador` (el valor interno es **`operador`**, no `operator`). Dispositivos TUNA-Screen: principal propio, perfil fijo operador + *scope*.

## 3. Estado de la Authorization Policy (ADR-006)

El propio módulo lo declara: la tabla `POLICY` implementa la matriz **TARGET**; el comportamiento real sigue siendo **CURRENT** hasta migrar cada canal.
Rutas ya migradas (`ensure_authorized`), por acción:

| Acción | Rutas |
|---|---|
| `SEND_CONSOLE_COMMAND` | `/api/console/command`, `/api/laser/console`, `/api/marlin-printers/console` |
| `VIEW_STATUS` | `/api/marlin-printers/status`, `/temperatures`, `/print/status` |
| `START_JOB` | `/api/marlin-printers/print/start`, `/sd/print/start`, `/sd/upload-and-print` |
| `SET_TEMPERATURE` | `/api/marlin-printers/temperature-target`, `/api/system/temperature-target` |
| `MOVE`, `HOME` | `/api/marlin-printers/jog`, `/home` |
| `PAUSE`, `RESUME`, `CANCEL` | `/api/marlin-printers/print/*` |
| `RUN_MACRO` | `/api/macros/run` |
| `GRBL_SETTINGS` | `/api/laser/settings` |
| acción variable | `/api/laser/command` |
| `RESTART_KLIPPER`, `FIRMWARE_RESTART`, `PRINTER_CONFIG` | `/api/printers/{port}/restart`, `/firmware-restart`, `/config-files/content` |
| `SYSTEM_CONTROL` | `PUT /api/logs/config` |
| `CLEAR_ALL_CONVERSATIONS` | `DELETE /conversations` (IA) |

**Consecuencia para la documentación:** la matriz de permisos que se publique debe ser la **real por ruta** (el CSV), con el estado de migración,
y no la matriz TARGET del SDD ni la del código de la política. Los *Alias* de acciones están en el docstring de `authorization_policy.py`.

## 4. Rutas sin autenticación de sesión (9) [V]

| Ruta | Motivo |
|---|---|
| `GET /` | Página principal (HTML de la app) |
| `GET /api/auth/setup-required`, `POST /api/auth/setup` | Primer arranque: crear el primer admin (solo sin usuarios) |
| `POST /api/auth/login`, `POST /api/auth/logout` | Sesión |
| `GET /api/tunascreen/info` | Descubrimiento público del servidor |
| `POST /api/tunascreen/pair/confirm` | Canje del código de emparejamiento por un token |
| `WS /ws/tunascreen` | Autentica por cabecera `Authorization: Bearer` y cierra con código **4401** si falla |
| `POST /api/accessories/cluster/event` | Firmware ESP32; autentica con `X-NOPAL-Token` (401 si inválido) |

Además hay un montaje **sin autenticación**: `app.mount("/plugins-static", StaticFiles(directory="plugins"))` (`main.py:96`). Sirve
**todo** el directorio `plugins/` a cualquiera que alcance el puerto, incluido el código de los plugins y su carpeta `.git` si existe.
El SDD lo registra como riesgo **D-8**. Debe documentarse en *Administración → Seguridad* como hecho verificado, junto a la recomendación de
no exponer NOPAL fuera de la LAN sin proxy inverso con autenticación. *(Posible hallazgo para el responsable del proyecto: ver §8.)*

## 5. Rutas del core solo-admin [V], por área

| Área | Rutas solo admin |
|---|---|
| Respaldo de configuración (`config_backup.py`) | 4 (todas) |
| Sistema (`system.py`) | 5 (todas) |
| IA (`ai.py`) | 12 de 25 (configuración, proveedor, acciones) |
| Láser/CNC (`laser.py`) | 6 de 42 |
| Marlin (`marlin_printers.py`) | 6 de 26 (alta/baja del registro, etc.) |
| Bambu, Elegoo, FlashForge | 3 de 9 en cada una (alta/baja y pruebas) |
| Plugins (`plugins.py`) | 3 de 4 (instalar, actualizar, quitar) |
| Autenticación (`auth.py`) | 4 de 9 (gestión de usuarios) |
| Estado (`status.py`) | 2 de 11 |
| TUNA-Screen (`tunascreen.py`) | 5 (emparejar y gestionar dispositivos) |

El detalle método a método está en el CSV (columna `acceso`).

## 6. Hallazgos para la documentación

1. **Rol real `operador`**: la interfaz dice "Operator"; el valor en `auth_users.json` y en la API es `operador`. Documentar ambos.
2. **Autorización en transición**: dos mecanismos conviven (`require_*` y la política). Cada página de referencia debe indicar de cuál depende la ruta.
3. **El OpenAPI de FastAPI no refleja el rol** (se inyecta con `Depends`); por eso el rol de cada ruta debe venir de este inventario y no solo del OpenAPI generado.
4. **No hay prefijo de ruta común en los plugins** [V]: matriz-led `/api/plugins/matriz-led` (40); arduino-accessories `/api/accessories` (43); camera-viewer `/api/cameras` (32); cotizador `/api/pricing` (17) y `/cotizador/print` (1); spoolman `/api/spoolman` (17). Riesgo real: nada impide que dos plugins registren la misma ruta, ni que un plugin pise una ruta del core. Candidato a RFC (API de plugins versionada).
5. **Autenticación de firmware** [V]: el token de clúster se compara en tiempo constante (`secrets.compare_digest`) con el token de `data/accessories/cluster_events.json`. Falta documentar cómo se genera y rota [?].
6. **Límite de intentos de login** [V]: `LOGIN_MAX_FAILURES = 5` en `LOGIN_WINDOW_SECONDS = 300` (`auth.py:20-21`); en memoria según el SDD §17.1 [?: confirmar que no persiste].

## 7. Pendientes de esta línea

| # | Tarea |
|---|---|
| 3.1 | Verificar manualmente las rutas marcadas `sesion` que podrían restringir por rol en el cuerpo de la función |
| 3.2 | Confirmar la política de contraseñas (el límite de intentos ya está verificado) |
| 3.3 | Mapear cada `Action` de la política a su descripción (para la página de roles) |
| 3.4 | Documentar el modelo de *scope* de TUNA-Screen (hoy "solo se recibe como dato", sin almacenamiento) |

## 8. Para el responsable del proyecto (no es parte de la documentación)

El servicio estático de `/plugins-static` sin autenticación y la presencia potencial de `.git` dentro de cada plugin clonado son un hecho de diseño ya
registrado como D-8. Se señala aquí porque, al documentarlo como "comportamiento actual", conviene decidir si se corrige antes de publicar la guía de seguridad.
