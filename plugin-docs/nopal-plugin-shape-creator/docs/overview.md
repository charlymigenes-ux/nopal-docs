---
title: Creador de formas: visión general
status: draft
verified_against: "nopal-plugin-shape-creator@7e88b19 (1.2.0) · nopal@4346f72"
---


# Creador de formas

Editor vectorial paramétrico para láser y CNC: **rectángulos, círculos, polígonos y formas paramétricas** con medidas exactas y esquinas configurables, listas para enviar a la cola de láser/CNC o guardar en la biblioteca.

## Qué incluye

- Herramientas: seleccionar, rectángulo, cuadrado, círculo, elipse, línea, polígono y texto.
- Duplicar, alinear, agrupar, desagrupar y borrar; deshacer y rehacer.
- **Importar DXF.**
- Propiedades numéricas: posición, ancho, alto, rotación y grosor de línea, con escala ligada o libre.
- **Capas** con operación (corte, grabado, punteado), material, potencia y velocidad.
- **Guardar** el resultado en la galería (biblioteca).
- Selección de la máquina de destino.

## Alcance

**Solo frontend**: no tiene backend propio. Usa directamente endpoints que ya existen en NOPAL (subida a la biblioteca y cola de láser/CNC). Compatible con **láser y CNC**.

[Instalación](installation.md) · [Configuración](configuration.md) · [API](api.md) · [Solución de problemas](troubleshooting.md)
