---
title: "Sistema de plugins: frontend"
sidebar_label: "Plugins: frontend"
sidebar_position: 5
audience: developer
type: reference
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
---

# Sistema de plugins: frontend

El frontend de un plugin es un script de JavaScript (y, opcionalmente, una hoja de estilos) que añade una sección a la interfaz de NOPAL.

## Cómo se carga

1. `GET /api/plugins` devuelve, por cada plugin instalado y habilitado que tiene `frontend`, las URL de su script y su estilo: `/plugins-static/<id>/<ruta>`. Si el Python del servidor no alcanza para el plugin, no se incluye `frontend`.
2. El core inyecta un `<link>` y un `<script defer>` con `id` `plugin-style-<id>` y `plugin-script-<id>`. A las URL les añade `?v=<version>` para invalidar la caché.
3. **El script se ejecuta y se monta a sí mismo.** El core **no llama a `mount()`**: lo hace el propio plugin al final de su script.

:::warning Solo plugins del catálogo
La lista de `/api/plugins` se construye a partir del **catálogo curado** del core (`plugin_catalog.json`). Un plugin que no figura en el catálogo no recibe su interfaz, aunque su backend sí se cargue. Ver [instalación y Galería](./plugins-instalacion-y-galeria.md).
:::

## El contrato `NopalPluginRegistry`

```js
(() => {
    const PLUGIN_ID = 'mi-plugin';
    if (window.NopalPluginRegistry?.[PLUGIN_ID]) return;   // evita cargar dos veces

    function mount() { /* crea la entrada de menú y la sección */ }
    function unmount() { /* deshace todo lo que hizo mount() */ }

    window.NopalPluginRegistry = window.NopalPluginRegistry || {};
    window.NopalPluginRegistry[PLUGIN_ID] = { mount, unmount, version: '1.0.0' };
    mount();
})();
```

| Parte | Quién la usa | Comportamiento |
|---|---|---|
| `window.NopalPluginRegistry` | Core y plugin | Objeto global que el core crea si no existe |
| `[PLUGIN_ID]` | Core | Se usa como clave. El core evita recargar un plugin que ya está registrado |
| `mount()` | **El plugin** | Lo llama el propio script al terminar. El core no lo invoca |
| `unmount()` | **El core** | Se llama al **desinstalar** el plugin. Debe quitar el elemento de menú, la sección, los observadores y los escuchas |
| `version` | Informativo | Los oficiales la escriben a mano; puede desfasarse del manifiesto |

Al desinstalar, el core ejecuta `unmount()`, borra la entrada del registro y elimina el `<script>` y el `<link>` del plugin.

:::caution No hay acción de deshabilitar
La API de la Galería solo **instala, actualiza y desinstala**. El indicador `enabled` de `data/plugins/installed.json` se pone en `true` al instalar y solo cambia si editas el archivo a mano. La carga filtra por plugins instalados **y habilitados**; el core descarga un plugin únicamente al desinstalarlo.
:::

## Qué hace `mount()` en los plugins oficiales

Todos siguen la misma receta. No hay una API que lo haga por ti: el plugin manipula el DOM directamente.

1. **Añade un botón de menú** en `.nav-category[data-group="plugins"] .nav-category-items`, con `data-section="<id>"` y `data-plugin-nav="<id>"`, que al hacer clic llama a `window.switchSection('<id>')`.
2. **Inserta su sección** en el contenedor `.content` (`shape-creator`, por ejemplo, la coloca antes de `#gcode-editor-section`).
3. Enlaza eventos y carga sus datos.
4. Llama a `window.applySidebarOrder()` para que el menú respete el orden elegido por el usuario.

`unmount()` hace lo inverso: elimina el botón (`[data-plugin-nav="<id>"]`) y la sección.

## Funciones globales del core que usan los plugins

Los plugins oficiales llaman a estas funciones **globales** de `app.js`:

| Función | Uso |
|---|---|
| `window.switchSection(nombre)` | Cambia de sección |
| `window.applySidebarOrder()` | Reaplica el orden del menú lateral |
| `window.showToast(mensaje, tono)` | Muestra un aviso (`tono`: por defecto `success`) |
| `window.appConfirm(mensaje, titulo, tipo)` | Cuadro de confirmación (devuelve una promesa) |
| `window.appAlert(mensaje, titulo, tipo)` | Cuadro de aviso |
| `window.escapeHtml(valor)` | Escapa texto para insertarlo en HTML |
| `window.loadModelsFolder(ruta)` | Recarga la biblioteca de modelos (lo usan los plugins que guardan archivos) |

Hay plugins que dependen de **más** funciones internas. El Cotizador, por ejemplo, reutiliza el visor de miniaturas y el explorador de archivos de la biblioteca (`loadRealGcodeThumbnail`, `renderStandardModelPreview`, `renderCncGcodeThumbnail`, `formatSize`, `isGcodeFile`, `stripSectionPrefix`) y varios widgets (`createOptionSwitch`, `wireTopbarDropdown`, `closeAllTopbarDropdowns`). Por eso necesita correr junto a una versión de `app.js` que siga definiéndolas.

:::warning No es una API estable
Son funciones internas de `app.js` que los plugins **dan por sentadas**. No están versionadas ni documentadas por el core, y pueden cambiar sin aviso. Defiéndete: usa `window.showToast?.(...)` con encadenamiento opcional, como hacen los plugins oficiales.
:::

## Idioma

El core **no pasa el idioma al plugin**. Cada plugin lleva **su propio diccionario** (`I18N`) y decide el idioma así:

```js
function lang() {
    let value = document.documentElement.lang || localStorage.getItem('language') || 'es';
    // …
}
```

El idioma se lee del atributo `lang` del documento o de `localStorage['language']`. `shape-creator`, por ejemplo, mantiene un diccionario por idioma y **cae en inglés** cuando no tiene el del idioma activo.

## Estilos

La hoja `frontend.style` se inyecta en la página. Los plugins oficiales **prefijan sus clases** (`sc-` en `shape-creator`, `fl-` en `font-library`) para no chocar con las del core ni con otros plugins. Hazlo también.

## Integración desde el core: `NopalCameraCard`

`camera-viewer` publica además el widget `window.NopalCameraCard`, que el propio core monta en las fichas de dispositivo. Ver [Integraciones con el core](./plugins-integraciones.md).
