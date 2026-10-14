---
title: "Sistema de plugins: estructura y manifiesto"
sidebar_label: "Plugins: manifiesto"
sidebar_position: 3
audience: developer
type: reference
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
---

# Sistema de plugins: estructura y manifiesto

:::info Nombre
Hoy esto es el **sistema de plugins** de NOPAL. El nombre «SDK» se reserva para cuando exista una API contractual estable y una plantilla oficial. Lo que no existe todavía está en [RFC](../07-rfc).
:::

## Qué es un plugin

Un plugin es un **repositorio de git propio** que NOPAL clona en `plugins/<id>/` (carpeta ignorada por el control de versiones del core). Se ejecuta **dentro del proceso de NOPAL**, con sus mismos privilegios y sin aislamiento.

Estructura de los plugins oficiales:

```text
<repo-del-plugin>/
├── nopal-plugin.json      manifiesto (obligatorio)
├── backend/               opcional
│   ├── router.py          define `router` (APIRouter)
│   └── services/…         lógica del plugin (imports relativos)
├── frontend/              opcional
│   ├── <id>.js            se registra en NopalPluginRegistry
│   └── <id>.css
├── tests/                 pruebas (recomendado)
└── README.md
```

Un plugin puede ser **solo frontend** (`shape-creator`, `svg-toolkit`, `font-library`), **solo backend**, o ambos.

## El manifiesto `nopal-plugin.json`

Debe estar en la **raíz** del repositorio. Si falta o no es un JSON válido, la instalación se rechaza y no queda rastro en disco.

Ejemplo, tomado de un plugin oficial:

```json
{
  "schema_version": 1,
  "id": "camera-viewer",
  "name": "Cámaras",
  "version": "1.4.0",
  "publisher": "NOPAL Labs",
  "category": "Producción",
  "description": "Agrega cámaras por URL de stream MJPEG, ONVIF o webcam USB, y míralas en vivo desde el panel.",
  "permissions": ["Guardar direcciones de cámaras", "Detectar webcams USB"],
  "compatibility": ["Impresión 3D", "Láser", "CNC"],
  "frontend": {
    "script": "frontend/camera-viewer.js",
    "style": "frontend/camera-viewer.css",
    "section": "camera-viewer"
  },
  "backend": {
    "entry": "backend/router.py"
  }
}
```

### Qué campos usa realmente el core

Esta tabla distingue lo que **el código del core lee** de lo que es solo descriptivo. Se verificó buscando cada campo en el core.

| Campo | ¿Lo usa el core? | Para qué |
|---|---|---|
| `version` | **Sí** | Se guarda como versión instalada, se muestra en la Galería y se añade como `?v=` a las URL del script y el estilo para invalidar la caché |
| `backend.entry` | **Sí** | Ruta, relativa a la raíz del plugin, del módulo que define `router`. Sin este campo, el plugin no tiene backend (caso normal, no es un error) |
| `frontend.script` | **Sí** | Se inyecta como `<script>` en la página, desde `/plugins-static/<id>/<script>` |
| `frontend.style` | **Sí** | Se inyecta como `<link rel="stylesheet">` |
| `python_requires` | **Sí** | Versión mínima de Python. Ver abajo |
| `frontend.section` | Se expone en `/api/plugins` | El core no lo usa para montar nada: cada plugin crea su propia sección. Por convención coincide con el `data-section` que el plugin usa |
| `schema_version` | **No** | Ningún código del core lo lee |
| `id`, `name`, `publisher`, `category`, `description`, `compatibility` | No (descriptivos) | Los oficiales los incluyen. La Galería toma sus textos del **catálogo** del core, no del manifiesto |
| `permissions` | **No se aplica** | Texto informativo. Ningún mecanismo lo hace cumplir |

:::warning El manifiesto no se valida
El core solo comprueba que el archivo sea un JSON legible. **No valida el esquema**: un campo mal escrito simplemente no surte efecto. Una validación formal es una propuesta, no algo que exista.
:::

### `python_requires`

Opcional. Solo se entiende el formato **`>=X.Y`** o **`>=X.Y.Z`**; cualquier otra expresión se trata como **no cumplida**: un plugin cuya compatibilidad no se puede saber no se instala ni se carga.

Cuando el Python del servidor no alcanza, NOPAL responde:

> Este plugin requiere Python 3.10 o superior; NOPAL corre con Python 3.9

- La **Galería** no lo instala.
- El **cargador** no importa su backend.
- Su interfaz tampoco se inyecta, para no dejarla rota.

Para saberlo **antes de clonar**, también hay que declararlo en el catálogo (`plugin_catalog.json`). El del manifiesto manda tras clonar: si exige más que el catálogo, el plugin se elimina en lugar de quedar a medio instalar.

## Versión, catálogo y JavaScript: tres sitios

La versión de un plugin aparece hoy en **tres lugares** (manifiesto, catálogo del core y el `version` que el JS escribe en `NopalPluginRegistry`). El que manda para un plugin ya instalado es el **manifiesto**, pero los otros dos pueden quedar desfasados. La [matriz de plugins](../03-plugins/matriz-de-plugins.md) detecta esas diferencias.
