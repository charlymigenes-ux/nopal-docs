---
title: Cámaras
sidebar_label: Cámaras
audience: user
type: reference
status: implemented
verified_against: "nopal@a5853dc; nopal-plugin-camera-viewer@28737a7"
generated: true
plugin_id: camera-viewer
plugin_version: "1.4.0"
---

# Cámaras

:::note
Página **generada** automáticamente. No la edites a mano: corrige la fuente y vuelve a generar.
Fuentes: `nopal-plugin.json`, código del plugin y `plugin_catalog.json` (`nopal-plugin-camera-viewer@28737a7`, `nopal@a5853dc`).
:::

Agrega cámaras por URL de stream MJPEG, ONVIF o webcam USB, y míralas en vivo desde el panel.

## Ficha

| Campo | Valor |
|---|---|
| id | `camera-viewer` |
| Versión (manifiesto) | 1.4.0 |
| Madurez | estable (≥ 1.0) |
| Categoría | Producción |
| Publicador | NOPAL Labs |
| Compatibilidad | Impresión 3D, Láser, CNC |
| Python mínimo (`python_requires`) | sin requisito propio (hereda el del core) |
| Backend | `backend/router.py` |
| Interfaz | `frontend/camera-viewer.js` · sección `camera-viewer` |
| Repositorio | [nopal-plugin-camera-viewer](https://github.com/charlymigenes-ux/nopal-plugin-camera-viewer) |
| Pruebas propias | Sí |
| Carpeta `docs/` propia | Sí |

## Permisos declarados

Son **texto informativo** para quien instala el plugin. NOPAL no los aplica como un sistema de permisos: el plugin se ejecuta dentro del proceso de NOPAL con sus mismos privilegios.

- Guardar direcciones de cámaras
- Detectar webcams USB

## API del plugin

Prefijo(s) de ruta: `/api/cameras` · 32 rutas (Sesión (admin u operador): 13; Solo admin: 19; Pública: 0).

| Método | Ruta | Acceso | Política | Descripción |
|---|---|---|---|---|
| GET | `/api/cameras` | Sesión (admin u operador) | — | Cámaras registradas. Las RTSP vienen resueltas a la URL MJPEG que expone go2rtc para esa fuente -- el navegador nunca ve la URL RTSP. |
| POST | `/api/cameras` | Solo admin | — | — |
| POST | `/api/cameras/{camera_id}/capture` | Solo admin | — | — |
| GET | `/api/cameras/{camera_id}/captures` | Sesión (admin u operador) | — | — |
| GET | `/api/cameras/{camera_id}/captures/{filename}` | Sesión (admin u operador) | — | — |
| DELETE | `/api/cameras/{camera_id}/captures/{filename}` | Solo admin | — | Borra una captura. Admin-only: es material que no se recupera. |
| POST | `/api/cameras/{camera_id}/captures/{filename}/edit` | Solo admin | — | Rotar (múltiplo de 90°) y/o recortar una captura ya guardada. |
| POST | `/api/cameras/{camera_id}/captures/zip` | Sesión (admin u operador) | — | ZIP de varias capturas ya existentes -- no muta ni genera archivos nuevos en disco (arma los bytes al vuelo), por eso alcanza con require_a… |
| POST | `/api/cameras/{camera_id}/duplicate` | Solo admin | — | — |
| GET | `/api/cameras/{camera_id}/focus` | Sesión (admin u operador) | — | — |
| POST | `/api/cameras/{camera_id}/focus` | Solo admin | — | — |
| GET | `/api/cameras/{camera_id}/health` | Sesión (admin u operador) | — | Prueba real de conexión de UNA cámara (botón "Probar conexión" / estado de la fila en la lista) -- no persiste nada. |
| POST | `/api/cameras/{camera_id}/record/start` | Solo admin | — | — |
| POST | `/api/cameras/{camera_id}/record/stop` | Solo admin | — | — |
| GET | `/api/cameras/{camera_id}/recordings` | Sesión (admin u operador) | — | Grabaciones guardadas. Ya se escribían a disco desde el primer día, pero no había forma de listarlas: quedaban ahí sin que nadie las viera. |
| GET | `/api/cameras/{camera_id}/recordings/{filename}` | Sesión (admin u operador) | — | — |
| DELETE | `/api/cameras/{camera_id}/recordings/{filename}` | Solo admin | — | — |
| POST | `/api/cameras/{camera_id}/timelapse` | Solo admin | — | — |
| POST | `/api/cameras/{camera_id}/timelapse/assemble` | Solo admin | — | — |
| POST | `/api/cameras/{camera_id}/timelapse/assemble-gif` | Solo admin | — | — |
| POST | `/api/cameras/{camera_id}/timelapse/pause` | Solo admin | — | — |
| POST | `/api/cameras/{camera_id}/timelapse/resume` | Solo admin | — | — |
| GET | `/api/cameras/{camera_id}/timelapse/stats` | Sesión (admin u operador) | — | — |
| GET | `/api/cameras/{camera_id}/timelapse/videos` | Sesión (admin u operador) | — | Videos/GIFs ya armados. Antes de esto, assemble solo devolvía un filename en la respuesta del POST y el archivo quedaba huérfano en disco -… |
| GET | `/api/cameras/{camera_id}/timelapse/videos/{filename}` | Sesión (admin u operador) | — | — |
| DELETE | `/api/cameras/{camera_id}/timelapse/videos/{filename}` | Solo admin | — | — |
| POST | `/api/cameras/{camera_id}/update` | Solo admin | — | — |
| POST | `/api/cameras/onvif` | Solo admin | — | Resuelve la URL RTSP real vía ONVIF (GetCapabilities/GetProfiles/ GetStreamUri) y registra la cámara con esa URL. Dos caminos: - Solo con `… |
| POST | `/api/cameras/remove` | Solo admin | — | — |
| GET | `/api/cameras/usb/{camera_id}/stream` | Sesión (admin u operador) | — | — |
| GET | `/api/cameras/usb/discover` | Sesión (admin u operador) | — | Webcams USB conectadas localmente (V4L2) -- ver usb_camera_service.py. |
| POST | `/api/cameras/usb/register` | Solo admin | — | Registra una webcam USB detectada -- a diferencia de URL directa/ONVIF, el stream lo sirve el propio NOPAL (ver usb_camera_service.ensure_s… |

## Notas verificadas

- Además de su sección propia, expone el widget `window.NopalCameraCard` (`frontend/camera-card.js`), que el propio core monta en las fichas de Klipper, láser, CNC y Marlin. Esta integración del core con el plugin no está declarada en el manifiesto. <small>(evidencia: `nopal-plugin-camera-viewer/frontend/camera-card.js; nopal/backend/static/js/app.js`)</small>

## Más información

- [README del plugin](https://github.com/charlymigenes-ux/nopal-plugin-camera-viewer#readme)
