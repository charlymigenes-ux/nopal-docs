---
title: Consola y macros
sidebar_label: Consola y macros
sidebar_position: 11
audience: user
type: how-to
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
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

![Panel de macros con tres macros personalizadas (G28, Reinicia FW y posicion), los macros de Klipper con su descripción y el botón «Nueva macro»](/img/capturas/es/consola-macros-1.2.0-alpha.1.png)

*Captura de un sistema en funcionamiento · NOPAL 1.2.0-alpha.1 · interfaz en español · tema NOPAL Style.*

El botón **Macros y plantillas** abre un panel con tres pestañas: **Macros**, **Plantillas** y **Ayuda**.

### Macros

La pestaña **Macros** reúne dos tipos, con un buscador arriba:

- **Los de Klipper**, definidos en el `printer.cfg`, con la descripción que les hayas puesto (*«Sin descripción configurada en Klipper»* si no tienen).
- **Los tuyos**, marcados con la etiqueta **Personalizada**, que se crean en NOPAL y se pueden editar o eliminar.

Un administrador ejecuta un macro **con un clic**, sin escribirlo en la consola.

Para crear uno propio, un administrador pulsa **Nueva macro** y rellena:

| Campo | Qué es |
|---|---|
| **Nombre** y **Descripción** | Cómo se ve en la lista |
| **Icono** | Uno de la lista: llama, inicio, carrete, capas, boquilla, encendido, llave, termómetro, rayo, carpeta o reproducir |
| **Comandos** | Un comando G-code por línea |
| **Disponible para** | Los tipos de máquina donde aparece: impresoras 3D, láser o CNC |

NOPAL no ejecuta un macro en una máquina de un tipo para el que no esté habilitado: responde *«Esa macro no está habilitada para este tipo de máquina»*.

### Plantillas

Una **plantilla** es un macro con valores por ajustar, como una temperatura. La eliges, ajustas sus parámetros y la envías. Eliminar una pide confirmación.

### Ayuda

Resume lo anterior: elegir la máquina activa (los comandos y macros se envían a ella), crear macros y usar plantillas.

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
| Ejecutar macros y plantillas | ❌ | ✅ |
| Crear, editar y eliminar macros y plantillas | ❌ | ✅ |
