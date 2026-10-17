---
title: Impresoras Bambu Lab, Elegoo y FlashForge
sidebar_label: Bambu Lab, Elegoo y FlashForge
sidebar_position: 7
audience: user
type: how-to
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
---

# Impresoras Bambu Lab, Elegoo y FlashForge

Estas tres familias de impresoras de red se controlan de la misma manera. Cada una tiene su sección en **Dispositivos** (**Impresoras Bambu Lab**, **Impresoras Elegoo** e **Impresoras FlashForge**) y aparece en el [panel de control](./panel-de-control).

## Qué puedes hacer

| Función | Detalle |
|---|---|
| **Ver el estado** | Estado en vivo de la impresora y de su trabajo |
| **Enviar un archivo a imprimir** | Desde la [biblioteca](./biblioteca) con **Enviar a impresora**: impresión inmediata |
| **Pausar, reanudar y cancelar** | Desde la propia tarjeta de la impresora |
| **Probar la conexión** | De una impresora ya registrada |

:::info Sin movimiento ni consola
Las integraciones de **Bambu Lab, Elegoo y FlashForge solo exponen estado, envío de archivos y pausar, reanudar y cancelar**. No puedes mover el cabezal, hacer *home*, fijar temperaturas ni usar una consola desde NOPAL. Para eso usa la pantalla de la impresora o su aplicación.
:::

Como estas marcas no tienen cola ni programación en NOPAL, el único modo de envío es la **impresión inmediata**.

## Dar de alta una impresora

Es tarea de un administrador, en **Configuración → Dispositivos**. Cada marca pide datos distintos:

| Marca | Datos |
|---|---|
| **Bambu Lab** (solo modo LAN) | IP, número de serie y **access code** |
| **Elegoo** | IP e identificador de la placa (`mainboard_id`) |
| **FlashForge** (línea moderna) | IP, número de serie y **check code** |

Dónde encontrar cada dato y cómo funciona el escaneo está en [Conectar tu primera máquina](./conectar-primera-maquina).

## Particularidades por marca

### Bambu Lab

- Solo en **modo LAN**.
- NOPAL **comprueba el access code con una conexión real** antes de confirmar el alta.
- Una Bambu solo aparece en el escaneo cuando ella misma se anuncia en la red; si no sale, **repite el escaneo** o escribe su IP.

### Elegoo

- Impresoras con el protocolo SDCP (Centauri Carbon, serie Neptune 4, etc.).
- La impresora **empuja su estado** a NOPAL mientras está conectada.

### FlashForge

- Solo la **línea moderna** (Adventurer 5M y 5M Pro, AD5X, Creator 5 y 5 Pro). **No** se soportan las Adventurer 3 ni 4.

## Quién puede hacer qué

| Acción | Operador | Administrador |
|---|:-:|:-:|
| Ver el estado | ✅ | ✅ |
| Enviar un archivo, pausar, reanudar y cancelar | ✅ | ✅ |
| Probar la conexión de una impresora registrada | ✅ | ✅ |
| Descubrir, dar de alta y dar de baja | ❌ | ✅ |

## Si algo falla

Ver [Solución de problemas](./solucion-de-problemas#errores-de-conexión): mensajes de conexión de Bambu Lab y Elegoo, y qué hacer si la impresora no aparece en el escaneo.
