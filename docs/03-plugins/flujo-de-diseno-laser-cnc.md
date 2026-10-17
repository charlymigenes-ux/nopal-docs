---
title: Flujo de diseño para láser y CNC
sidebar_label: Flujo de diseño láser y CNC
sidebar_position: 2
audience: user
type: how-to
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
---

# Flujo de diseño para láser y CNC

Tres plugins oficiales se reparten el trabajo de preparar un diseño: **Creador de formas**, **Herramientas SVG** y **Texto para fabricación**. Esta página explica qué hace cada uno, en qué formato entrega el resultado y cómo llega a la máquina.

:::note Los tres son solo interfaz
Ninguno tiene backend propio. Usan rutas que NOPAL ya ofrece: subir a la [biblioteca](../01-usuario/biblioteca) y añadir a la cola del láser o la CNC. Se instalan desde la [Galería de plugins](../01-usuario/galeria-de-plugins).
:::

## Qué hace cada plugin

| Plugin | Para qué sirve | Qué entrega |
|---|---|---|
| **Creador de formas** | Dibujar con medidas exactas: rectángulos, círculos, elipses, polígonos, líneas y texto. Importa DXF. Organiza el diseño en **capas** con material, potencia y velocidad | **SVG** (el diseño) y **G-code** (los contornos), con envío a la cola |
| **Herramientas SVG** | Preparar un SVG que ya tienes: sanear, quitar duplicados, unir segmentos, simplificar y ordenar contornos para reducir los recorridos en vacío. Compara el original con la copia optimizada | **SVG** optimizado, con el sufijo `-optimizado` |
| **Texto para fabricación** | Convertir texto en trayectos con medidas físicas en milímetros. Incluye 20 tipografías locales y permite importar TTF u OTF | **SVG** con el texto como trayectos y **G-code** del contorno |

## Dónde queda cada archivo

Cada plugin guarda en una carpeta propia de la biblioteca:

| Plugin | SVG | G-code |
|---|---|---|
| Creador de formas | **Impresión 3D**, en la carpeta que elijas al guardar | **Archivos**, carpeta `Creador de Formas` (`formas-<fecha>.gcode`) |
| Herramientas SVG | **Impresión 3D**, carpeta `Herramientas SVG` | No genera G-code |
| Texto para fabricación | **Impresión 3D**, carpeta `Biblioteca de tipografías` | **Archivos**, carpeta `Biblioteca de tipografías` |

Los SVG van a la sección **Impresión 3D** de la biblioteca porque NOPAL los trata como *modelos* (admite `.svg` y `.dxf` entre ellos). El G-code va a **Archivos**.

## Un flujo típico

1. **Diseña**: crea el dibujo en *Creador de formas*, o escribe el texto en *Texto para fabricación*.
2. **Optimiza** (opcional): abre el SVG en *Herramientas SVG* para limpiarlo y reducir los recorridos en vacío. Guarda la copia optimizada.
3. **Genera el G-code**: *Creador de formas* y *Texto para fabricación* lo generan a partir del contorno.
4. **Envía a la máquina**:
   - Desde *Creador de formas*, **Enviar a la cola** sube el G-code y lo añade directamente a la cola del láser o de la CNC, según la máquina de destino que elijas.
   - Desde *Texto para fabricación*, el G-code queda en **Archivos**. Desde ahí, en la biblioteca, pulsa **Enviar a láser** para añadirlo a la cola. Ver [Láser y CNC](../01-usuario/laser-y-cnc#cola-del-láser).
5. **Corre el trabajo** desde la sección de la máquina, y, en un láser, usa **Enmarcar trabajo** si quieres comprobar dónde va a caer.

## Límites que conviene conocer

- **Un SVG no se corta por sí solo.** NOPAL no convierte un SVG en G-code. Los plugins de esta página generan G-code solo a partir de su propio diseño (Creador de formas y Texto para fabricación). Para un SVG de otra procedencia necesitas una herramienta externa de G-code.
- **Solo contornos.** El G-code que generan recorre los **contornos**. El grabado con relleno de barrido no está implementado.
- **Herramientas SVG simplifica solo trazos simples.** Convierte a segmentos lineales los *paths* de un solo subtrazo; los de **varios subtrazos se conservan** tal cual, para no unir contornos independientes por accidente.
- **«Agregar al proyecto»** (Texto para fabricación) depende de un gancho que el core de NOPAL **todavía no implementa**: hoy el botón muestra éxito pero los datos no se guardan en ningún sitio.
- **Imagen a dibujo** (CNC en modo plotter) es otro camino: convierte una imagen de líneas en G-code sin pasar por estos plugins. Ver [Láser y CNC](../01-usuario/laser-y-cnc#imagen-a-dibujo-plotter).

## Fichas de los plugins

- [Creador de formas](./shape-creator)
- [Herramientas SVG](./svg-toolkit)
- [Texto para fabricación](./font-library)
