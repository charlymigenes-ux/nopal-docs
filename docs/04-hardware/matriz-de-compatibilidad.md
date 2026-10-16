---
title: Matriz de compatibilidad
sidebar_label: Matriz de compatibilidad
sidebar_position: 1
audience: reference
type: reference
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
---

# Matriz de compatibilidad

Esta página separa dos cosas que no deben confundirse:

1. **Qué puede hacer NOPAL con cada familia de máquina.** Sale del código: los drivers y las rutas de la API. Es **verificable**.
2. **Qué modelos concretos se han probado.** No consta en el código. Mientras no haya reportes de pruebas reales, ningún modelo se declara "compatible": se marca **no verificado**.

## 1. Capacidades por familia

Datos de los drivers y de la [API REST del core](../06-referencia/api-rest-core).

| Función | Klipper / Moonraker | Marlin | GRBL láser / CNC | Bambu Lab | Elegoo | FlashForge |
|---|:-:|:-:|:-:|:-:|:-:|:-:|
| Estado en vivo | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Pausar / reanudar / cancelar | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Iniciar un trabajo desde NOPAL | ✅ | ✅ | ✅ | ✅ (enviar archivo) | ✅ (enviar archivo) | ✅ (enviar archivo) |
| Mover el cabezal (jog) y *home* | ✅ (mediante G-code) | ✅ | ✅ | ❌ | ❌ | ❌ |
| Consola de comandos | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Temperatura objetivo | ✅ | ✅ | — | ❌ | ❌ | ❌ |
| Impresión desde tarjeta SD | — | ✅ | ✅ | — | — | — |
| Cola de trabajos | ✅ | — | ✅ | — | — | — |
| Impresiones programadas | ✅ | — | — | — | — | — |
| Editar `printer.cfg` y reiniciar Klipper | ✅ | — | — | — | — | — |
| Ajustes `$` de GRBL | — | — | ✅ | — | — | — |
| Descubrimiento en la red | Puertos 7125–7127 del propio servidor | ✅ (MKS WiFi) | ✅ (escaneo / por IP) | ✅ (SSDP pasivo) | ✅ | ✅ |

✅ implementado en el driver · ❌ el driver no lo expone · — no aplica a esa familia.

Las integraciones de **Bambu Lab, Elegoo y FlashForge** solo exponen estado, envío de archivos y pausar/reanudar/cancelar. No hay movimiento ni consola.

## 2. Conexión por familia

| Familia | Conexión | Cómo se autentica |
|---|---|---|
| **Klipper / Moonraker** | HTTP (Moonraker) en el mismo servidor, puertos **7125 a 7127** por defecto; más los de `NOPAL_KLIPPER_PORTS` | La que tenga Moonraker |
| **Marlin** | USB serie, o **MKS WiFi** (descubrimiento UDP 8989 y puente de G-code por TCP 8080) | — |
| **GRBL láser / CNC** | Red (placas ESP3D o FluidNC) o USB serie | — |
| **Bambu Lab** | Modo LAN: MQTT sobre TLS (puerto **8883**) y FTPS para subir archivos | Número de serie y **access code** |
| **Elegoo** | SDCP sobre WebSocket | IP e identificador de placa (`mainboard_id`) |
| **FlashForge** | HTTP, puerto **8898** | Número de serie y **check code** |

### Límites conocidos

- **MKS WiFi**: la subida rápida propietaria a la SD **no** está soportada.
- **FlashForge**: solo la línea moderna (HTTP). **No** se soportan Adventurer 3 ni Adventurer 4 Pro/Lite, que usan TCP con sesión exclusiva.
- **Elegoo**: NOPAL implementa el protocolo SDCP directamente. No usa el SDK oficial ni el MQTT de las impresoras de resina antiguas.
- **Bambu Lab**: solo en **modo LAN**.

## 3. Modelos

### Lo que consta en el código

El código nombra estos modelos. **Nombrarlos no es lo mismo que haberlos probado.**

| Familia | Modelos citados en el código |
|---|---|
| Elegoo | Centauri Carbon y Carbon 2, serie Neptune 4, OrangeStorm Giga |
| FlashForge | Adventurer 5M y 5M Pro, AD5X, Creator 5 y 5 Pro |
| Bambu Lab | X1 Carbon, X1, X1E, P1P, P1S, A1, A1 mini |

### Catálogo de perfiles integrado

NOPAL incluye un catálogo estático de **perfiles de máquina** (volumen de trabajo, familia de firmware, variantes de placa). Sirve para saber qué mostrar y ofrecer al dar de alta una máquina; **no cambia el comportamiento del equipo**.

El propio código aclara que los datos salen de **fichas técnicas públicas o de reseñas de terceros, no de pruebas contra hardware real**, con una excepción: el perfil de la Anet ET4 Pro, validado en la sonda de conexión de Marlin.

| Tipo | Perfiles incluidos |
|---|---|
| Impresoras 3D (Marlin) | Hellbot Magna 2 300, Anet ET4 Pro, Snapmaker Artisan |
| Impresoras 3D (Bambu Lab) | A1 mini, A1 |
| Impresoras 3D (FlashForge) | AD5X |
| Impresoras 3D (Klipper) | Creality K1C |
| Láser (GRBL) | Sculpfun S30 Pro, Two Trees TTS-55 Pro, xTool D1 Pro, Atomstack A5 Pro, Ortur Laser Master 3 |
| CNC (GRBL) | SainSmart Genmitsu 3018-PROVer y 4030-PROVer, Carbide 3D Shapeoko 4 Standard y Nomad, CNC 3018 genérica |

### Estado de verificación

| Modelo | Estado |
|---|---|
| Anet ET4 Pro | Validado por el autor en la sonda de conexión de Marlin (según el código) |
| Todos los demás | **No verificado** por esta documentación |

:::info Pendiente
El equipo de documentación **no dispone de estas máquinas**, así que no puede probarlas. La tabla seguirá en "no verificado" hasta que alguien que las use lo confirme.
:::

### Reporta tu hardware

Si usas NOPAL con un modelo concreto, cuéntanos qué funciona y qué no, abriendo un *issue* con la plantilla **Hardware probado** en el repositorio de la documentación. Indica modelo, firmware y qué funciones viste funcionar. Con tu reporte la fila pasará a estable, beta, parcial o no soportado.
