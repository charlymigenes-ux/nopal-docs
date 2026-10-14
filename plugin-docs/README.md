# Borradores de `docs/` para los plugins

Cada plugin oficial debe llevar su propia carpeta `docs/` **dentro de su repositorio** (Standard §6.2). Estos son los **borradores** de esas carpetas, preparados a partir de los README, los manifiestos y el código de cada plugin.

> **Nada de aquí se ha subido a ningún repositorio.** Los repos de los plugins no se han tocado. Cada carpeta es un borrador para que el autor lo revise y, si le convence, lo copie a su repo.

## Contenido

```text
plugin-docs/
└── <repositorio-del-plugin>/
    └── docs/
        ├── overview.md          qué hace y para quién
        ├── installation.md      instalación, requisitos, dependencias manuales
        ├── configuration.md     ajustes, archivos que crea, permisos declarados
        ├── hardware.md          solo si el plugin controla hardware propio
        ├── api.md               GENERADO desde el código (npm run gen)
        └── troubleshooting.md   problemas conocidos y soluciones
```

| Plugin | Repositorio | `hardware.md` | `api.md` |
|---|---|:-:|---|
| Matriz LED | `matriz-led` | ✅ | 40 rutas |
| Automatización de Taller | `nopal-plugin-arduino-accessories` | ✅ | 43 rutas |
| Cámaras | `nopal-plugin-camera-viewer` | ✅ | 32 rutas |
| Materiales | `nopal-plugin-spoolman` | — | 17 rutas |
| Cotizador | `nopal-plugin-cotizador` | — | 18 rutas |
| Creador de formas | `nopal-plugin-shape-creator` | — | sin backend |
| Herramientas SVG | `nopal-plugin-svg-toolkit` | — | sin backend |
| Texto para fabricación | `nopal-plugin-font-library` | — | sin backend |

## Estado

Todas las páginas llevan `status: draft` y la versión del plugin y del core contra las que se verificaron. Cada afirmación sale del README, el manifiesto o el código del plugin; lo que no se pudo confirmar está marcado como **Pendiente de confirmar**.

## Pendiente (no se puede resolver desde el código)

1. **`CHANGELOG.md` por plugin** (Standard §15): se hizo un clon superficial de cada repo, sin historial. Debe escribirse con el historial real.
2. **Modelos de hardware probados** por el autor (placas, cámaras, pantallas).
3. **Traducción al inglés** de estos borradores.
4. **Discrepancias detectadas en los README actuales:**
   - `matriz-led` cita `firmware/nopal_accessory/Nopal_FF/Nopal_FF.ino` del repositorio del core: esa ruta ya no existe (el firmware está en `arduino-accessories`).
   - `svg-toolkit` conserva un párrafo sobre publicar el repositorio y cambiar el catálogo; el catálogo ya lo tiene disponible.
   - `font-library` y `matriz-led` están en versión `0.x`: las versiones del manifiesto, el catálogo y el JS no coinciden en `matriz-led`, `arduino-accessories` y `font-library` (ver la matriz de plugins del sitio).

## Cómo regenerar `api.md`

Desde la raíz de `nopal-docs`:

```bash
npm run fetch
```

```bash
npm run gen
```
