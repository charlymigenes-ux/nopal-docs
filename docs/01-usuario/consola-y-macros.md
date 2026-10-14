---
title: Consola y macros
sidebar_label: Consola y macros
sidebar_position: 11
audience: user
type: how-to
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
---

# Consola y macros

La **Consola del sistema** (en **Herramientas**) te deja ver la consola de una impresora **Klipper** y ejecutar sus **macros**.

:::warning Enviar comandos y ejecutar macros es solo para administradores
Cualquier usuario con sesión puede **ver** la respuesta de la impresora y la **lista de macros**. **Enviar un comando** o **ejecutar un macro** requiere el rol de **administrador**: si no lo tienes, NOPAL responde *«Permiso insuficiente»*.
:::

## Consola

1. Selecciona una impresora Klipper.
2. La respuesta de la impresora aparece **en tiempo real**.
3. Un administrador puede escribir un comando G-code en la caja *«Enviar comando…»* y enviarlo.

NOPAL comprueba el permiso **antes** de enviar nada a la impresora.

## Macros

El bloque **Macros** lista los macros que tienes definidos en el `printer.cfg` de Klipper, con la descripción que les hayas puesto (*«Sin descripción configurada en Klipper»* si no tienen). Un administrador ejecuta un macro **con un clic**, sin escribirlo en la consola.

## Las demás consolas

Cada familia tiene su propia consola, dentro de la sección de la máquina:

| Máquina | Dónde |
|---|---|
| **Marlin** | En la ficha de la impresora. Ver [Impresoras Marlin](./impresoras-marlin) |
| **Láser y CNC** (GRBL) | **Consola Láser**, en la sección de la máquina. Ver [Láser y CNC](./laser-y-cnc) |
| Bambu Lab, Elegoo, FlashForge | **No tienen** consola en NOPAL |

En todas, **ver** es para todos y **enviar** comandos es solo para administradores.

## Quién puede hacer qué

| Acción | Operador | Administrador |
|---|:-:|:-:|
| Ver la consola y la lista de macros | ✅ | ✅ |
| Enviar comandos | ❌ | ✅ |
| Ejecutar macros | ❌ | ✅ |
