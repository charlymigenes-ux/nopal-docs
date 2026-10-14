---
title: Impresoras Klipper
sidebar_label: Impresoras Klipper
sidebar_position: 5
audience: user
type: how-to
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
---

# Impresoras Klipper

NOPAL controla impresoras con **Klipper y Moonraker** desde el [panel de control](./panel-de-control). No necesitas darlas de alta: NOPAL busca Moonraker en el **mismo equipo donde corre**, en los puertos **7125 a 7127**, y las detecta solas. Si usas otros puertos, ver [Conectar tu primera máquina](./conectar-primera-maquina#klipper).

## La ficha y la vista de detalle

En el panel de control cada impresora tiene una ficha con su nombre, estado, miniatura y temperaturas. Pulsa la ficha para abrir su **vista de detalle**, con estos módulos:

| Módulo | Qué hace |
|---|---|
| **Toolhead** | Posición X/Y/Z, *home* por eje o de **TODO**, **Z-Offset** y **factor de velocidad** |
| **Temperaturas** | Temperatura **actual** y **objetivo** de cada calentador. **PREESTAB.** aplica una temperatura preestablecida y **ENFRIAR** la baja |
| **Cola** | Los archivos en espera, con su total, tiempo y filamento, y el botón **Iniciar cola** |
| **Archivos de config** | Los archivos de configuración de la impresora (`printer.cfg` y otros) |
| **Cámara** | La cámara vinculada, si tienes el plugin Cámaras |

El icono de engranaje abre **Personalizar Módulos**: reordena y muestra u oculta los módulos. El diseño se guarda por separado para cuatro tamaños de pantalla (celular, tableta, escritorio y pantalla ancha) y se puede restablecer.

Mientras hay una impresión en curso, la vista de detalle muestra su progreso. Puedes **pausar**, **reanudar** y **cancelar** el trabajo.

## Enviar un archivo a imprimir

Desde la [biblioteca](./biblioteca), elige un archivo y pulsa **Enviar a impresora**. Con una Klipper hay tres modos:

| Modo | Qué ocurre |
|---|---|
| **Impresión inmediata** | El archivo se envía y empieza a imprimir ya |
| **Agregar a la cola** | Se añade a la cola de la impresora |
| **Programar impresión** | Eliges fecha y hora y NOPAL arranca la impresión a esa hora |

Si la impresora está **sin conexión**, NOPAL no deja enviarle el archivo. Si está imprimiendo o tiene una impresión en pausa, solo puedes **añadirlo a la cola**, no imprimirlo de inmediato. La fecha de una impresión programada debe ser futura.

:::note
La cola y la programación de fecha y hora **solo existen para Klipper**. Las demás marcas no las tienen (en Marlin se añade el envío a la tarjeta SD).
:::

NOPAL revisa cada 30 segundos si alguna impresión programada ya llegó a su hora.

## Configuración y reinicios

- **Archivos de config:** puedes **leerlos**. **Guardarlos** (sobrescribir `printer.cfg`, por ejemplo) pide confirmación, puede requerir reiniciar Klipper y es **solo para administradores**.
- **Reiniciar** (Klipper) y **Reiniciar Firmware** (el MCU): piden confirmación y son **solo para administradores**.
- NOPAL también ofrece el **Registro de Klipper** y el **Registro de Moonraker**.
- **Macros** y la consola: ver [Consola y macros](./consola-y-macros).

## Quién puede hacer qué

| Acción | Operador | Administrador |
|---|:-:|:-:|
| Ver el estado, enviar archivos, usar la cola y la programación | ✅ | ✅ |
| Pausar, reanudar y cancelar | ✅ | ✅ |
| Mover el cabezal, *home* y ajustar temperaturas | ✅ | ✅ |
| Ejecutar macros y enviar comandos por la consola | ❌ | ✅ |
| Guardar archivos de config, reiniciar Klipper o su firmware | ❌ | ✅ |
| Editar los valores de **PREESTAB.** | ❌ | ✅ |

## Si algo falla

- **No aparece mi impresora:** NOPAL solo busca en su propio equipo y en los puertos 7125 a 7127. Ver [Solución de problemas](./solucion-de-problemas#no-encuentro-mi-máquina).
- **«Permiso insuficiente»:** esa acción es solo para administradores.
