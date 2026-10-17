---
title: Archivos de estado
sidebar_label: Archivos de estado
sidebar_position: 2
audience: reference
type: reference
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
---

# Archivos de estado

NOPAL no usa una base de datos externa: todo su estado vive en archivos dentro de **su propia carpeta** (por ejemplo `/home/<usuario>/nopal`). Esta página los lista, con qué guardan y si entran en los [respaldos de configuración](../02-administracion/respaldos).

:::caution Antes de tocar un archivo
Detén NOPAL antes de editar a mano cualquiera de estos archivos: el servidor también los escribe. Algunos contienen datos sensibles (hashes de contraseña, claves de API).
:::

## Usuarios y sesión

| Archivo | Qué guarda | Respaldo |
|---|---|---|
| `auth_users.json` | Usuarios, roles y hashes de contraseña (PBKDF2). **Sensible** | Grupo *Usuarios*, cifrado |
| `.session_secret` | Secreto con el que se firman las sesiones. Se genera solo | **Nunca se exporta** |

## Máquinas

| Archivo | Qué guarda | Respaldo |
|---|---|---|
| `marlin_printer_registry.json` | Impresoras Marlin dadas de alta | Grupo *Impresoras 3D* |
| `elegoo_printer_registry.json` | Impresoras Elegoo | Grupo *Impresoras 3D* |
| `flashforge_printer_registry.json` | Impresoras FlashForge | Grupo *Impresoras 3D* |
| `bambu_printer_registry.json` | Impresoras Bambu Lab | Grupo *Impresoras 3D* |
| `laser_registry.json` | Láseres y CNC dados de alta | Grupo *Láser y CNC* |
| `temperature_presets.json` | Presets de temperatura | Grupo *Presets de temperatura* |

Las máquinas Marlin y láser/CNC llevan un id interno `mch_…`. Ver [Identidad de máquinas](../02-administracion/identidad-de-maquinas). Las impresoras Klipper no tienen archivo propio: NOPAL las detecta por Moonraker.

## Trabajos

| Archivo | Qué guarda | Respaldo |
|---|---|---|
| `laser_history.json` | Historial de láser y CNC (hasta 1000 entradas) | No |
| `job_print_log.json` | Impresiones 3D enviadas desde NOPAL (hasta 2000) | No |
| `job_deletions.json` | Registro de control de los trabajos eliminados | No |
| `scheduled_prints.json` | Impresiones Klipper programadas | No |
| `gcode_bounds_cache.json` | Caché de los límites de cada G-code (para enmarcar) | No |

## Inteligencia artificial

| Archivo | Qué guarda | Respaldo |
|---|---|---|
| `ai_config.json` | IAs guardadas y su configuración. La clave de API va **en claro**. **Sensible** | Grupo *NOPAL Intelligence*, cifrado |
| `ai_conversations.json` | Conversaciones, privadas de cada usuario | **Nunca se exporta** |

## Registros y plugins

| Archivo o carpeta | Qué guarda | Respaldo |
|---|---|---|
| `logging_config.json` | Configuración de los registros (fuentes, rotación) | Grupo *Registro (logs)* |
| `logs/nopal.log` | El registro de NOPAL: rota a 5 MB con 5 copias (`nopal.log.1` … `.5`) | No |
| `data/plugins/installed.json` | Plugins instalados y habilitados | Grupo *Plugins instalados* |
| `data/plugins/<id>/` | Datos que cada plugin guarda aquí | No |
| `plugins/<id>/` | El código de cada plugin instalado | No |

El directorio de datos de los plugins se puede cambiar con la variable `NOPAL_PLUGIN_DATA_DIR` (ver [Variables de entorno y línea de comandos](./variables-y-cli)).

## Archivos de los plugins oficiales

Los plugins guardan su configuración en la raíz o en `data/`. Los que entran en los respaldos son:

| Archivo | Plugin | Grupo del respaldo |
|---|---|---|
| `accessory_registry.json`, `arduino_boards_config.json` | Automatización de Taller | *Accesorios y placas* |
| `camera_registry.json` | Cámaras | *Cámaras* |
| `pricing_config.json`, `quotes_registry.json` | Cotizador | *Cotizador (precios y cotizaciones)* |
| `spoolman_config.json`, `spoolman_printer_links.json`, `spoolman_reservations.json` | Materiales (Spoolman) | *Materiales (Spoolman)* |

Cada plugin puede tener además otros archivos propios (por ejemplo, un registro de uso o de actividad) que no entran en los respaldos.

## Carpetas

| Carpeta | Contenido |
|---|---|
| `uploads/models/` | La biblioteca de **Impresión 3D** |
| `uploads/gcode/` | La biblioteca de **Archivos** (G-code) |
| `previews/` | Vistas previas generadas (la crea el instalador) |
| `backups/` | Copias de seguridad previas a la migración de identidad de máquinas |

Para qué sirve cada cosa al actualizar, respaldar o desinstalar, ver [Actualizar y desinstalar](../02-administracion/actualizar-y-desinstalar).
