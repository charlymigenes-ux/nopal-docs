---
title: Biblioteca de modelos y G-code
sidebar_label: Biblioteca
sidebar_position: 9
audience: user
type: how-to
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
---

# Biblioteca de modelos y G-code

La biblioteca guarda tus archivos en el servidor, en carpetas, y es el punto de partida para imprimir o cortar. Tiene dos secciones en el grupo **Biblioteca** del menú:

| Sección | Qué muestra |
|---|---|
| **Impresión 3D** | Modelos y archivos listos para imprimir (y también G-code) |
| **Archivos** | Solo archivos G-code |

## Qué archivos admite

| Tipo | Extensiones |
|---|---|
| **Modelos** | `.stl`, `.3mf`, `.obj`, `.step`, `.stp`, `.svg`, `.dxf` |
| **G-code** | `.gcode`, `.gc`, `.gco`, `.nc`, `.tap`, `.cnc` |

Se guardan en las carpetas `uploads/models` y `uploads/gcode` de la instalación de NOPAL.

![Biblioteca de Impresión 3D con un modelo seleccionado y su panel de detalle](/img/capturas/es/biblioteca-modelos-1.2.0-alpha.1.png)

*Captura de NOPAL 1.2.0-alpha.1 · interfaz en español · tema NOPAL Style.*

## Subir archivos

- Pulsa **Subir archivo**, o **arrastra archivos desde tu equipo** a la ventana.
- El nombre del archivo debe ser un **nombre simple**: no puede contener `/` ni `\`. En otro caso NOPAL responde *«Nombre de archivo inválido»*.

## Navegar y organizar

La biblioteca funciona como un explorador de archivos:

- **Carpetas**: migas de pan y botones **Atrás**, **Adelante**, **Subir nivel** e **Inicio**. **Nueva carpeta** crea una; también puedes **renombrarla** o **eliminarla** (con todo su contenido).
- **Ordenar** por nombre (A-Z o Z-A), más recientes, más antiguos o mayor tamaño.
- **Filtros**: **Favoritos**, **Recientes**, **Modelos 3D**, por **formato** y por **carpeta**. También hay un buscador por nombre.
- **Vista de cuadrícula** o **de lista**, y paginación (*«Mostrando 1 a 20 de 85 resultados»*).
- **Selección múltiple**: elige varios archivos y úsalos con **Mover** o **Eliminar** desde la barra de selección.
- Un indicador de **espacio libre en disco**.

Los archivos de **láser y CNC** muestran una **miniatura con el trazo del diseño** generada a partir de los movimientos X/Y del propio G-code. En archivos con más de **2 millones de líneas** la miniatura se calcula solo con las primeras y puede quedar **parcial**.

## Vista previa

Al elegir un archivo se abre un panel de **vista previa** a la derecha:

- Para modelos **STL** y **3MF**, una vista 3D interactiva.
- Para G-code, la **trayectoria** del archivo.
- Datos como el tamaño, la fecha de modificación y el número de líneas, y una estrella de **favorito**.

Puedes ajustar el detalle en **Configuración → General → Calidad de vista previa**.

## Enviar un archivo a una máquina

Desde la vista previa:

| Acción | Para |
|---|---|
| **Enviar a impresora** | Cualquier impresora 3D. Los modos disponibles dependen de la marca: ver [Klipper](./impresoras-klipper), [Marlin](./impresoras-marlin) y [Bambu Lab, Elegoo y FlashForge](./impresoras-bambu-elegoo-flashforge) |
| **Enviar a láser** | Añade el archivo a la **cola del láser** (o de la CNC). Ver [Láser y CNC](./laser-y-cnc) |
| **Enviar a la SD** (en la tarjeta SD de un láser) | Sube el archivo a la tarjeta de una máquina GRBL |
| **Descargar** | Guarda el archivo en tu equipo |
| **Renombrar**, **Mover**, **Eliminar** | Gestionan el archivo |

## Quién puede hacer qué

Todos los usuarios con sesión pueden subir, mover, renombrar y **eliminar** archivos y carpetas de la biblioteca, y enviarlos a las máquinas.

:::caution Eliminar es definitivo
Eliminar un archivo o una carpeta no se puede deshacer. NOPAL pide confirmación antes de hacerlo.
:::

## Respaldo

La biblioteca **no entra en los respaldos de configuración** de NOPAL. Cópiala aparte. Ver [Respaldos](../02-administracion/respaldos).
