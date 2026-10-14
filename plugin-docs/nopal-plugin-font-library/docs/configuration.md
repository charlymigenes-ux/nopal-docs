---
title: Texto para fabricación: configuración
status: draft
verified_against: "nopal-plugin-font-library@bfd9c87 (0.5.1) · nopal@4346f72"
---


# Configuración

No guarda configuración en el servidor.

## Permisos declarados (informativos)

- Leer tipografías locales.
- Agregar elementos al proyecto actual.
- Guardar SVG en la biblioteca.
- Enviar diseños a la cola de producción.

## Estructura

| Ruta | Contenido |
|---|---|
| `fonts/catalog.json` | Catálogo de las 20 familias |
| `fonts/<familia>/<archivo>.ttf` | Tipografía |
| `fonts/<familia>/OFL.txt` | Licencia de la tipografía |
| `frontend/vendor/opentype.min.js` | Biblioteca `opentype.js` |
