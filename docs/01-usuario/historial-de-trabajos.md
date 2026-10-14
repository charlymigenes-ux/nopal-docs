---
title: Historial de trabajos
sidebar_label: Historial de trabajos
sidebar_position: 12
audience: user
type: explanation
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
---

# Historial de trabajos

Está en **Trabajos → Historial de trabajos**. Reúne dos listas, una para las impresoras 3D y otra para el láser.

## Historial de impresión 3D

*«Archivos ya impresos por cada impresora»*: para cada impresora **Klipper** detectada, NOPAL muestra **los últimos 3 archivos impresos**, tomados del historial de Moonraker. Puedes **buscar** por nombre de archivo.

:::note Solo Klipper
Esta lista procede del historial de Moonraker, así que solo cubre las impresoras Klipper. Las impresoras Marlin, Bambu Lab, Elegoo y FlashForge muestran su trabajo **activo** en su ficha, pero no tienen historial en esta lista.
:::

## Historial del láser

*«Trabajos láser completados, cancelados o con error»*. Cada entrada indica su **estado**: **completado**, **cancelado** o **error**.

- La pantalla muestra los **50 trabajos más recientes**.
- NOPAL conserva hasta **200** entradas.
- Si todavía no hay ninguno verás *«Aún no hay trabajos láser en el historial»*.

## Dónde se guarda

El historial del láser se guarda en `laser_history.json`, en la carpeta de NOPAL. **No forma parte** de los [respaldos de configuración](../02-administracion/respaldos): el grupo *Láser y CNC* solo incluye el registro de máquinas.

## Quién puede hacer qué

Todos los usuarios con sesión pueden ver el historial.
