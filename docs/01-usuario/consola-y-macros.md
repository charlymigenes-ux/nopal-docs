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

Las **Consolas** (en **Herramientas**) te dejan ver la consola de cada máquina, enviarle comandos y ejecutar **macros**.

:::warning Enviar comandos y ejecutar macros es solo para administradores
Cualquier usuario con sesión puede **ver** la respuesta de la impresora y la **lista de macros**. **Enviar un comando** o **ejecutar un macro** requiere el rol de **administrador**: si no lo tienes, NOPAL responde *«Permiso insuficiente»*.
:::

## Consola

![Consola con la lista de máquinas (Sistema NOPAL, una Klipper, una Marlin, dos láseres y dos CNC), la salida en tiempo real de un láser, el cuadro para escribir comandos y el panel de macros](/img/capturas/es/consola-general-1.2.0-alpha.1.png)

*Captura de un sistema en funcionamiento · NOPAL 1.2.0-alpha.1 · interfaz en español · tema NOPAL Style.*

1. Abre **Herramientas → Consolas**.
2. En **Máquinas** elige una tarjeta. Hay una para el **Sistema NOPAL** (solo lectura: eventos y registro de NOPAL) y una por cada impresora **Klipper** o **Marlin**, y por cada **láser** o **CNC** (GRBL). Cada tarjeta muestra su estado (*Lista*, *Imprimiendo*, *En pausa*, *Error* o *Desconectada*) y, en las impresoras, las temperaturas de la boquilla y de la cama.
3. La respuesta de la máquina aparece **en tiempo real**.
4. Un administrador escribe un comando G-code en *«Escribe un comando…»* y lo envía.

NOPAL comprueba el permiso **antes** de enviar nada a la máquina. En un láser, no se aceptan comandos mientras corre un trabajo, porque desincronizarían la máquina.

Debajo de la salida hay estas opciones:

| Opción | Qué hace |
|---|---|
| **Historial** | Los últimos comandos enviados a esa máquina. Borrarlo es solo para administradores |
| **Limpiar** | Vacía la salida que ves |
| **Guardar log** | Descarga la salida como archivo de texto |
| **Cargar archivo** | Envía línea por línea un archivo corto de G-code, como una calibración. Máximo 256 KB y 500 líneas. Avisa cuántas líneas se enviaron y cuántas se omitieron. Solo administradores |
| **Autoscroll** | Sigue la última línea |

El icono de engranaje cambia el tamaño de letra y el de copiar copia el log.

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

Todas las máquinas con consola aparecen en **Consolas**. Algunas tienen además una consola propia en su sección:

| Máquina | Dónde |
|---|---|
| **Klipper** | En **Consolas** |
| **Marlin** | En **Consolas** y en la ficha de la impresora. Ver [Impresoras Marlin](./impresoras-marlin) |
| **Láser y CNC** (GRBL) | En **Consolas** y en la **Consola Láser**, dentro de su sección. Ver [Láser y CNC](./laser-y-cnc) |
| Bambu Lab, Elegoo, FlashForge | **No tienen** consola en NOPAL |

En todas, **ver** es para todos y **enviar** comandos es solo para administradores.

## Quién puede hacer qué

| Acción | Operador | Administrador |
|---|:-:|:-:|
| Ver la consola y la lista de macros | ✅ | ✅ |
| Enviar comandos | ❌ | ✅ |
| Cargar un archivo de G-code | ❌ | ✅ |
| Borrar el historial | ❌ | ✅ |
| Ver el historial y guardar el log | ✅ | ✅ |
| Ejecutar macros y plantillas | ❌ | ✅ |
| Crear, editar y eliminar macros y plantillas | ❌ | ✅ |
