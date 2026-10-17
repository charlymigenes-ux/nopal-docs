---
title: Editor de G-code
sidebar_label: Editor de G-code
sidebar_position: 10
audience: user
type: how-to
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
---

# Editor de G-code

Está en **Herramientas → Editor G-Code**. Sirve para **abrir, modificar y descargar** archivos G-code en el navegador, sin salir de NOPAL, antes de enviarlos a una máquina.

## Abrir y guardar

| Botón | Qué hace |
|---|---|
| **Nuevo** | Empieza un archivo vacío (*Sin título.gcode*). Si hay cambios sin descargar, NOPAL avisa de que se perderán |
| **Biblioteca** | Abre un archivo de tu [biblioteca](./biblioteca) |
| **Abrir** | Abre un archivo de tu equipo |
| **Descargar** | Guarda el archivo editado en tu equipo |

:::caution El editor no guarda en la biblioteca
Los cambios solo existen en el navegador hasta que pulses **Descargar**. El editor no sobrescribe el archivo de la biblioteca. Si quieres usar el archivo editado en una máquina, descárgalo y **súbelo de nuevo** a la biblioteca.
:::

![Editor G-Code con el archivo abierto en la pestaña Código y el panel de análisis del archivo](/img/capturas/es/editor-codigo-1.2.0-alpha.1.png)

*Captura de NOPAL 1.2.0-alpha.1 · interfaz en español · tema NOPAL Style.*

## Las dos pestañas

- **Código**: el texto del archivo, con el recuento de líneas. Escribe o modifica el G-code directamente.
- **Visor 2D**: la trayectoria del archivo dibujada en 2D.

Cuando modificas el archivo, el editor lo marca como **modificado**.

## Geometría

Desde el panel **Geometría** puedes transformar el trabajo sin editar línea por línea:

| Herramienta | Qué hace |
|---|---|
| **Mover** | Desplaza el trabajo |
| **Escala** | Cambia su tamaño |
| **Rotar** | Lo gira |
| **Espejo** | Lo refleja en **horizontal** o **vertical** |
| **Origen → Llevar la pieza a 0,0** | Lleva la pieza al origen |

Elige a qué se aplica el cambio (*Aplicar a*) y pulsa **Aplicar**. También se pueden ver las **capas** del archivo.

## Análisis del archivo

El panel **Análisis del archivo** (*lectura automática*) examina el contenido y muestra:

- Una **clasificación** del archivo y su nivel de confianza. Si no hay suficientes señales, NOPAL dice que no puede determinar su uso.
- El **software generador** y el **firmware o perfil**.
- **Unidades** y **coordenadas**.
- Los **límites de trabajo**.
- **Avance** (F) y **potencia o RPM** (S).
- **Temperaturas** de boquilla y cama, si las hay.
- **Capas y herramientas**, el **recorrido aproximado**, los **comandos** (cuántos tipos únicos) y los **movimientos**.

Un dato que el archivo no declara aparece como *«No declarado»* o *«No detectado»*, en vez de inventarse.

## Quién puede hacer qué

Todos los usuarios con sesión pueden usar el editor.
