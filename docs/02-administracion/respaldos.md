---
title: Respaldos de configuración
sidebar_label: Respaldos
sidebar_position: 6
audience: admin
type: how-to
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
---

# Respaldos de configuración

**Configuración → Respaldo de configuración** (solo administradores) exporta e importa la configuración de NOPAL. Sirve para levantar una instalación nueva sin reconfigurar todo, o para respaldar antes de cambiar algo.

:::warning Esto no es un respaldo de tu biblioteca
El respaldo guarda **configuración**, no archivos. La biblioteca de modelos y G-code (`uploads/`), las vistas previas y los registros **no se incluyen**. Cópialos aparte.
:::

## Grupos

Tú eliges qué grupos se exportan. Los principales:

| Grupo | Archivos |
|---|---|
| Impresoras 3D | Registros de Marlin, Elegoo, FlashForge y Bambu Lab |
| Láser y CNC | `laser_registry.json` |
| Registro (logs) | `logging_config.json` |
| Accesorios y placas | `accessory_registry.json`, `arduino_boards_config.json` |
| Cámaras | `camera_registry.json` |
| Presets de temperatura | `temperature_presets.json` |
| Cotizador | `pricing_config.json`, `quotes_registry.json` |
| Materiales (Spoolman) | `spoolman_config.json`, `spoolman_printer_links.json`, `spoolman_reservations.json` |
| Plugins instalados | `data/plugins/installed.json` |
| **Usuarios y contraseñas** (sensible) | `auth_users.json` |
| **NOPAL Intelligence** (sensible) | `ai_config.json` |

Los archivos que no existan en tu instalación se omiten sin error: quien no tiene láser no tiene `laser_registry.json`.

## Cifrado

Si eliges un grupo **sensible** (usuarios o la clave de la IA) NOPAL **exige una frase de cifrado** y cifra el archivo con **Fernet** (AES-128-CBC + HMAC), con una clave derivada de tu frase mediante **scrypt** y una sal aleatoria por archivo.

- Una frase equivocada o un archivo alterado **fallan con un error claro**: no se escribe basura encima de tu configuración.
- **Anota la frase.** Sin ella no hay forma de abrir el respaldo.

## Lo que nunca se exporta

- **`.session_secret`**: con él se podrían falsificar sesiones de esa instalación. Se regenera solo.
- **Las conversaciones con la IA** (`ai_conversations.json`): son privadas de cada usuario. Tampoco se importan.

## Importar

1. Selecciona el archivo de respaldo.
2. NOPAL lo **inspecciona** y muestra qué grupos contiene (pide la frase si está cifrado).
3. Eliges qué grupos aplicar.

Antes de sobrescribir cada archivo, NOPAL guarda una copia con el sufijo **`.pre-import.bak`**, por si necesitas volver atrás.

El grupo de **Registro** se aplica en el siguiente arranque de NOPAL.

## Mover NOPAL a otro equipo

1. En el equipo viejo, exporta los grupos que necesites (incluye *Usuarios* si quieres conservar las cuentas) y copia `uploads/` a mano.
2. En el equipo nuevo, [instala NOPAL](./instalacion) y copia `uploads/` a la carpeta de la instalación.
3. Importa el respaldo.
