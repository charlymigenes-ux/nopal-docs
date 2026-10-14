---
title: Cámaras
sidebar_label: Cámaras
audience: user
type: reference
status: implemented
verified_against: "nopal@4346f72; nopal-plugin-camera-viewer@b9634d7"
generated: true
plugin_id: camera-viewer
plugin_version: "1.4.0"
source_commit: "b9634d7"
---

# Cámaras

:::note
This page is **generated** automatically. Do not edit it by hand: fix the source and regenerate.
Sources: `nopal-plugin.json`, plugin code and `plugin_catalog.json` (`nopal-plugin-camera-viewer@b9634d7`, `nopal@4346f72`).
:::

Agrega cámaras por URL de stream MJPEG, ONVIF o webcam USB, y míralas en vivo desde el panel.

## Summary

| Field | Value |
|---|---|
| id | `camera-viewer` |
| Version (manifest) | 1.4.0 |
| Maturity | stable (≥ 1.0) |
| Category | Producción |
| Publisher | NOPAL Labs |
| Compatibility | Impresión 3D, Láser, CNC |
| Minimum Python (`python_requires`) | no own requirement (inherits the core's) |
| Backend | `backend/router.py` |
| UI | `frontend/camera-viewer.js` · section `camera-viewer` |
| Repository | [nopal-plugin-camera-viewer](https://github.com/charlymigenes-ux/nopal-plugin-camera-viewer) |
| Own tests | Yes |
| Own `docs/` folder | No |

## Declared permissions

These are **informational text** for whoever installs the plugin. NOPAL does not enforce them as a permission system: the plugin runs inside the NOPAL process with its same privileges.

- Guardar direcciones de cámaras
- Detectar webcams USB

## Plugin API

Route prefix(es): `/api/cameras` · 32 routes (Session (admin or operator): 13; Admin only: 19; Public: 0).

| Method | Route | Access | Policy | Description |
|---|---|---|---|---|
| GET | `/api/cameras` | Session (admin or operator) | — | Cámaras registradas. Las RTSP vienen resueltas a la URL MJPEG que expone go2rtc para esa fuente -- el navegador nunca ve la URL RTSP. |
| POST | `/api/cameras` | Admin only | — | — |
| POST | `/api/cameras/{camera_id}/capture` | Admin only | — | — |
| GET | `/api/cameras/{camera_id}/captures` | Session (admin or operator) | — | — |
| GET | `/api/cameras/{camera_id}/captures/{filename}` | Session (admin or operator) | — | — |
| DELETE | `/api/cameras/{camera_id}/captures/{filename}` | Admin only | — | Borra una captura. Admin-only: es material que no se recupera. |
| POST | `/api/cameras/{camera_id}/captures/{filename}/edit` | Admin only | — | Rotar (múltiplo de 90°) y/o recortar una captura ya guardada. |
| POST | `/api/cameras/{camera_id}/captures/zip` | Session (admin or operator) | — | ZIP de varias capturas ya existentes -- no muta ni genera archivos nuevos en disco (arma los bytes al vuelo), por eso alcanza con require_a… |
| POST | `/api/cameras/{camera_id}/duplicate` | Admin only | — | — |
| GET | `/api/cameras/{camera_id}/focus` | Session (admin or operator) | — | — |
| POST | `/api/cameras/{camera_id}/focus` | Admin only | — | — |
| GET | `/api/cameras/{camera_id}/health` | Session (admin or operator) | — | Prueba real de conexión de UNA cámara (botón "Probar conexión" / estado de la fila en la lista) -- no persiste nada. |
| POST | `/api/cameras/{camera_id}/record/start` | Admin only | — | — |
| POST | `/api/cameras/{camera_id}/record/stop` | Admin only | — | — |
| GET | `/api/cameras/{camera_id}/recordings` | Session (admin or operator) | — | Grabaciones guardadas. Ya se escribían a disco desde el primer día, pero no había forma de listarlas: quedaban ahí sin que nadie las viera. |
| GET | `/api/cameras/{camera_id}/recordings/{filename}` | Session (admin or operator) | — | — |
| DELETE | `/api/cameras/{camera_id}/recordings/{filename}` | Admin only | — | — |
| POST | `/api/cameras/{camera_id}/timelapse` | Admin only | — | — |
| POST | `/api/cameras/{camera_id}/timelapse/assemble` | Admin only | — | — |
| POST | `/api/cameras/{camera_id}/timelapse/assemble-gif` | Admin only | — | — |
| POST | `/api/cameras/{camera_id}/timelapse/pause` | Admin only | — | — |
| POST | `/api/cameras/{camera_id}/timelapse/resume` | Admin only | — | — |
| GET | `/api/cameras/{camera_id}/timelapse/stats` | Session (admin or operator) | — | — |
| GET | `/api/cameras/{camera_id}/timelapse/videos` | Session (admin or operator) | — | Videos/GIFs ya armados. Antes de esto, assemble solo devolvía un filename en la respuesta del POST y el archivo quedaba huérfano en disco -… |
| GET | `/api/cameras/{camera_id}/timelapse/videos/{filename}` | Session (admin or operator) | — | — |
| DELETE | `/api/cameras/{camera_id}/timelapse/videos/{filename}` | Admin only | — | — |
| POST | `/api/cameras/{camera_id}/update` | Admin only | — | — |
| POST | `/api/cameras/onvif` | Admin only | — | Resuelve la URL RTSP real vía ONVIF (GetCapabilities/GetProfiles/ GetStreamUri) y registra la cámara con esa URL. Dos caminos: - Solo con `… |
| POST | `/api/cameras/remove` | Admin only | — | — |
| GET | `/api/cameras/usb/{camera_id}/stream` | Session (admin or operator) | — | — |
| GET | `/api/cameras/usb/discover` | Session (admin or operator) | — | Webcams USB conectadas localmente (V4L2) -- ver usb_camera_service.py. |
| POST | `/api/cameras/usb/register` | Admin only | — | Registra una webcam USB detectada -- a diferencia de URL directa/ONVIF, el stream lo sirve el propio NOPAL (ver usb_camera_service.ensure_s… |

## Verified notes

- Besides its own section, it exposes the `window.NopalCameraCard` widget (`frontend/camera-card.js`), which the core itself mounts on the Klipper, laser, CNC and Marlin device cards. This core-to-plugin integration is not declared in the manifest. <small>(evidence: `nopal-plugin-camera-viewer/frontend/camera-card.js; nopal/backend/static/js/app.js`)</small>

## More information

- [README of the plugin](https://github.com/charlymigenes-ux/nopal-plugin-camera-viewer#readme)
