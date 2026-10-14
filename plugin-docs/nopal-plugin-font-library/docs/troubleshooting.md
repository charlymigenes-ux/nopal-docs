---
title: Texto para fabricación: solución de problemas
status: draft
verified_against: "nopal-plugin-font-library@bfd9c87 (0.5.1) · nopal@4346f72"
---


# Solución de problemas

| Problema | Qué hacer |
|---|---|
| «Agregar al proyecto» muestra éxito pero no aparece nada | Es un límite conocido: el core no implementa todavía el gancho que recibe el elemento. Usa **Exportar SVG**, **Guardar en la biblioteca** o **Guardar G-code** |
| El grabado no rellena el texto | El **grabado con relleno de barrido no está implementado**; solo se traza el contorno |
| Una tipografía importada no sale como esperas | Se admiten TTF y OTF locales; comprueba la cobertura de caracteres de la fuente |

## Pruebas del plugin

```bash
python -m unittest discover -s tests -v
```

```bash
node --check frontend/font-library.js
```

Para el arnés visual: `python -m http.server 8766` y abre `http://127.0.0.1:8766/tests/harness.html`.
