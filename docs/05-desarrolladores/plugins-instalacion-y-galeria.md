---
title: "Sistema de plugins: instalación y Galería"
sidebar_label: "Plugins: instalación y Galería"
sidebar_position: 6
audience: developer
type: reference
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
---

# Sistema de plugins: instalación y Galería

Cómo instala, actualiza y quita NOPAL un plugin, y qué hace falta para que aparezca en la Galería.

## El catálogo curado

La Galería muestra los plugins de `backend/plugin_catalog.json`, un archivo **curado por el proyecto** que vive en el core. Cada entrada describe un plugin para la Galería y apunta a su repositorio:

| Campo | Uso |
|---|---|
| `id` | Identificador; es el nombre de la carpeta `plugins/<id>/` |
| `name`, `description`, `long_description`, `publisher`, `category` | Textos de la tarjeta |
| `icon`, `accent`, `banner_image` | Aspecto de la tarjeta |
| `compatibility`, `permissions` | Etiquetas y permisos mostrados |
| `version` | Versión anunciada. Para un plugin ya instalado manda la del manifiesto |
| `python_requires` | Opcional. Permite saber el requisito **antes de clonar** |
| `availability` | `available` (instalable) o `coming_soon` (no instalable) |
| `pricing` | `{"type": "free"}`. Un tipo distinto de `free` se rechaza |
| `repo_url` | Repositorio de git que se clona |
| `featured`, `size` | Destacado y tamaño mostrado |

Los textos de la Galería pueden traducirse con claves `pluginCatalog_<id>_<campo>` (los guiones del id pasan a guiones bajos, por ejemplo `pluginCatalog_matriz_led_name`) en los archivos de traducción del core; si no existe la clave, se usa el texto del catálogo.

:::info El catálogo anuncia plugins que aún no existen
Dos entradas figuran como `coming_soon` (`gcode-optimizer`, `material-library`). Son **anuncios**, no plugins instalables.
:::

## Instalar (solo administradores)

`POST /api/plugins/{id}/install`. NOPAL comprueba, en este orden:

1. Que el plugin esté **en el catálogo**. Si no, responde 404.
2. Que `availability` sea `available`. Si no, 409.
3. Que `pricing.type` sea `free`. Los plugins de pago responden 501: *todavía no existe el servidor de licencias*.
4. Que haya `repo_url`.
5. Que el Python del servidor cumpla `python_requires` del catálogo (409 si no).
6. Que el plugin no esté ya instalado (409).

Después ejecuta `git clone --depth 1 <repo_url> plugins/<id>` (con un límite de 60 s) y:

- Si el repositorio **no tiene un `nopal-plugin.json` válido** en la raíz, borra lo clonado y falla. No deja carpetas a medio instalar.
- Si el manifiesto exige más Python que el servidor, **elimina el plugin** y falla.
- Si todo va bien, anota el plugin en `data/plugins/installed.json` con su versión, `enabled: true` y la fecha.

## Actualizar (solo administradores)

`POST /api/plugins/{id}/update` ejecuta `git fetch` y `git pull --ff-only` sobre la rama actual del plugin, y compara el SHA antes y después.

- Si `ff-only` falla (cambios locales o historial divergente), no se actualiza.
- Si cambió algo dentro de `backend/`, la respuesta lleva `backend_changed: true` y la interfaz avisa de que hay que **reiniciar NOPAL** para cargar el código nuevo.
- Si solo cambió el frontend, la interfaz recarga la página.

## Desinstalar (solo administradores)

`DELETE /api/plugins/{id}` borra la entrada de `installed.json` y la carpeta `plugins/<id>/`. La interfaz ejecuta además el `unmount()` del plugin y quita su script y su estilo.

El **estado que el plugin guardó** (por ejemplo `camera_registry.json` o `data/accessories/…`) **no se borra**.

## Instalación manual para desarrollar

Para probar un plugin sin pasar por la Galería:

1. Copia (o clona) tu plugin en `plugins/<id>/`, en la carpeta de NOPAL.
2. Añade su entrada a `data/plugins/installed.json`:

```json
{
  "mi-plugin": {
    "version": "0.1.0",
    "enabled": true,
    "installed_at": "2026-01-01T00:00:00+00:00"
  }
}
```

3. **Reinicia NOPAL.** El backend se carga al arrancar.

:::warning El frontend exige una entrada en el catálogo
El backend se carga a partir de `installed.json`. Pero la lista que reparte la interfaz de los plugins sale del **catálogo**: un plugin sin entrada en `plugin_catalog.json` **no recibe su frontend**. Para desarrollarlo en local, añade temporalmente una entrada al catálogo con su mismo `id`.
:::

## Publicar un plugin en la Galería

**Hoy no existe un mecanismo de publicación para terceros.** Para que un plugin aparezca en la Galería es necesario que su entrada se **añada a `backend/plugin_catalog.json` del core**, es decir, un cambio aceptado por el proyecto. Un sistema de publicación abierto y los plugins de pago (que requieren un servidor de licencias) son propuestas, no funciones existentes.

Requisitos prácticos para que un plugin sea instalable:

- Un repositorio de git accesible, con `nopal-plugin.json` en la raíz.
- `availability: "available"` y `pricing.type: "free"`.
- Compatibilidad con la **versión mínima de Python del core** (3.9), o un `python_requires` que lo declare.

## Comprobación de compatibilidad en CI

El trabajo `plugins-compat` del CI del core clona la punta de la rama por defecto de cada plugin del catálogo, ejecuta sus pruebas con Python 3.9 y comprueba que su backend carga con el cargador real. Un plugin con `python_requires` incompatible con ese Python se marca `N/A`.
