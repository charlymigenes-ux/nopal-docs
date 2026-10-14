---
title: Texto para fabricación: visión general
status: draft
verified_against: "nopal-plugin-font-library@bfd9c87 (0.5.1) · nopal@4346f72"
---


# Texto para fabricación

Crea **texto con medidas físicas** para láser y CNC y lo convierte en **trayectos editables** (`<path>`). La biblioteca de **20 tipografías** es el selector interno del editor.

## Características

- **20 familias** incluidas localmente: funciona **sin conexión** tras instalarse. La licencia SIL Open Font License 1.1 se incluye junto a cada tipografía.
- Cobertura comprobada para español, inglés, alemán, francés y portugués de Brasil.
- Vista previa, favoritos, recientes, filtros e **importación local de TTF/OTF**.
- Conversión real de glifos a `<path>` con `opentype.js`.
- Ancho y alto exactos en **milímetros**, proporción bloqueable, espaciado, interlineado y alineación.
- Lienzo físico interactivo: arrastrar, redimensionar desde la esquina, zoom con la rueda del ratón y controlador de arco (mantén `Ctrl`).
- Dos estilos de contorno: **Sólido** (grosor configurable) y **Línea** (trazo fino).
- Parámetros de material, *kerf*, puente mínimo, potencia, velocidad y pasadas.
- Validaciones: área disponible, posibles islas interiores y detalles demasiado pequeños.
- **Exportar SVG**, **guardar en la biblioteca** y **guardar G-code**.

## Guardar G-code

Convierte de verdad el **contorno** del texto a G-code (aplana las curvas Bézier del glifo e invierte el eje Y), con la potencia, velocidad y pasadas del panel, y lo guarda como `.gcode` en la sección **Archivos**.

:::warning Límites conocidos
- Solo traza el **contorno**: sirve para «Corte» y trayectos tipo CNC. El **grabado con relleno de barrido no está implementado**.
- El botón **Agregar al proyecto** depende de un gancho (`NopalProject.addElement()` o el evento `nopal:add-project-element`) que **el core de NOPAL no implementa todavía**: hoy el botón muestra éxito pero los datos **no se guardan** en ningún sitio.
:::

**Alcance:** solo frontend, compatible con láser y CNC.

[Instalación](installation.md) · [Configuración](configuration.md) · [API](api.md) · [Solución de problemas](troubleshooting.md)
