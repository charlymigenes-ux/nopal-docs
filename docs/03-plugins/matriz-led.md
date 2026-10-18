---
title: Matriz LED
sidebar_label: Matriz LED
audience: user
type: reference
status: implemented
verified_against: "nopal@d6d86a5; matriz-led@bd7e521"
generated: true
plugin_id: matriz-led
plugin_version: "0.10.0"
---

# Matriz LED

:::note
Página **generada** automáticamente. No la edites a mano: corrige la fuente y vuelve a generar.
Fuentes: `nopal-plugin.json`, código del plugin y `plugin_catalog.json` (`matriz-led@bd7e521`, `nopal@d6d86a5`).
:::

Panel principal + Editor de Anuncios para una pantalla LED matriz BLE (tipo iPixel Color) y un panel FK-8Wa de 96x16 por red: escenas rápidas, automatizaciones reales (inactividad, material bajo) y alertas por máquina, además de dibujar patrones a color y guardarlos como anuncios reutilizables.

## Ficha

| Campo | Valor |
|---|---|
| id | `matriz-led` |
| Versión (manifiesto) | 0.10.0 |
| Madurez | preliminar (0.x) |
| Categoría | Accesorios |
| Publicador | NOPAL Labs |
| Compatibilidad | Impresión 3D, Láser, CNC |
| Python mínimo (`python_requires`) | `>=3.10` |
| Backend | `backend/router.py` |
| Interfaz | `frontend/matriz-led.js` · sección `matriz-led` |
| Repositorio | [matriz-led](https://github.com/charlymigenes-ux/matriz-led) |
| Pruebas propias | Sí |
| Carpeta `docs/` propia | Sí |

## Permisos declarados

Son **texto informativo** para quien instala el plugin. NOPAL no los aplica como un sistema de permisos: el plugin se ejecuta dentro del proceso de NOPAL con sus mismos privilegios.

- Enviar mensajes por Bluetooth a través de un accesorio ESP32

## Desfase de versiones

El manifiesto debería ser la fuente de verdad (Standard §6.4). Se detectan valores distintos en:

| Dónde | Valor encontrado | Manifiesto |
|---|---|---|
| plugin_catalog.json | 0.9.0 | 0.10.0 |
| NopalPluginRegistry (JS) | 0.9.0 | 0.10.0 |

## API del plugin

Prefijo(s) de ruta: `/api/plugins` · 40 rutas (Sesión (admin u operador): 35; Solo admin: 5; Pública: 0).

| Método | Ruta | Acceso | Política | Descripción |
|---|---|---|---|---|
| GET | `/api/plugins/matriz-led/announcements` | Sesión (admin u operador) | — | — |
| POST | `/api/plugins/matriz-led/announcements` | Sesión (admin u operador) | — | — |
| GET | `/api/plugins/matriz-led/announcements/{announcement_id}` | Sesión (admin u operador) | — | — |
| PUT | `/api/plugins/matriz-led/announcements/{announcement_id}` | Sesión (admin u operador) | — | — |
| DELETE | `/api/plugins/matriz-led/announcements/{announcement_id}` | Sesión (admin u operador) | — | — |
| POST | `/api/plugins/matriz-led/announcements/{announcement_id}/send` | Sesión (admin u operador) | — | — |
| GET | `/api/plugins/matriz-led/config` | Sesión (admin u operador) | — | — |
| POST | `/api/plugins/matriz-led/config` | Solo admin | — | — |
| GET | `/api/plugins/matriz-led/device-info` | Sesión (admin u operador) | — | — |
| POST | `/api/plugins/matriz-led/fk8wa/brightness` | Solo admin | — | — |
| GET | `/api/plugins/matriz-led/fk8wa/config` | Sesión (admin u operador) | — | — |
| PUT | `/api/plugins/matriz-led/fk8wa/config` | Solo admin | — | — |
| GET | `/api/plugins/matriz-led/fk8wa/effects` | Sesión (admin u operador) | — | Catálogo de efectos de entrada (con cuáles están probados) y las situaciones. |
| POST | `/api/plugins/matriz-led/fk8wa/effects/test` | Solo admin | — | "Probar en mi panel": manda un ejemplo con el efecto unos segundos y luego restaura. |
| GET | `/api/plugins/matriz-led/fk8wa/frames` | Sesión (admin u operador) | — | Páginas del panel como datos (1 bit por LED) para dibujarlas en la pestaña. |
| GET | `/api/plugins/matriz-led/fk8wa/machines` | Sesión (admin u operador) | — | Máquinas conocidas con su nombre corto para el panel. |
| GET | `/api/plugins/matriz-led/fk8wa/message` | Sesión (admin u operador) | — | — |
| POST | `/api/plugins/matriz-led/fk8wa/message` | Sesión (admin u operador) | — | Texto libre o un anuncio (se muestra su nombre). Operador y admin. |
| DELETE | `/api/plugins/matriz-led/fk8wa/message` | Sesión (admin u operador) | — | — |
| GET | `/api/plugins/matriz-led/fk8wa/preview` | Sesión (admin u operador) | — | — |
| GET | `/api/plugins/matriz-led/fk8wa/scroll-preview` | Sesión (admin u operador) | — | Cómo correría un texto, para la prueba de la pestaña (no toca el panel). |
| GET | `/api/plugins/matriz-led/fk8wa/status` | Sesión (admin u operador) | — | — |
| POST | `/api/plugins/matriz-led/fk8wa/test` | Solo admin | — | Solo lectura (01 09): IP, puerto y tamaño. Nunca SSID ni claves. |
| POST | `/api/plugins/matriz-led/image` | Sesión (admin u operador) | — | Manda el patrón dibujado en el editor de píxeles del panel tal cual (ver send_matrix en screen_service.py) -- a diferencia de /text, esto n… |
| GET | `/api/plugins/matriz-led/last-error` | Sesión (admin u operador) | — | — |
| GET | `/api/plugins/matriz-led/last-sent` | Sesión (admin u operador) | — | — |
| GET | `/api/plugins/matriz-led/last-sent-history` | Sesión (admin u operador) | — | Quién mandó los últimos envíos a la pantalla (nombre de máquina o de anuncio) -- para el "ticker" del dock del Panel de Control en el core.… |
| GET | `/api/plugins/matriz-led/machine-alerts` | Sesión (admin u operador) | — | — |
| GET | `/api/plugins/matriz-led/machine-alerts/{machine_id}` | Sesión (admin u operador) | — | — |
| PUT | `/api/plugins/matriz-led/machine-alerts/{machine_id}` | Sesión (admin u operador) | — | — |
| GET | `/api/plugins/matriz-led/machines` | Sesión (admin u operador) | — | Snapshot normalizado de todas las máquinas -- el propio JS del plugin lo consulta para detectar solo, del lado del navegador, cuándo avisar… |
| GET | `/api/plugins/matriz-led/rules` | Sesión (admin u operador) | — | — |
| POST | `/api/plugins/matriz-led/rules` | Sesión (admin u operador) | — | — |
| PUT | `/api/plugins/matriz-led/rules/{rule_id}` | Sesión (admin u operador) | — | — |
| DELETE | `/api/plugins/matriz-led/rules/{rule_id}` | Sesión (admin u operador) | — | — |
| POST | `/api/plugins/matriz-led/rules/{rule_id}/run` | Sesión (admin u operador) | — | — |
| GET | `/api/plugins/matriz-led/stats` | Sesión (admin u operador) | — | — |
| GET | `/api/plugins/matriz-led/status` | Sesión (admin u operador) | — | — |
| POST | `/api/plugins/matriz-led/text` | Sesión (admin u operador) | — | — |
| GET | `/api/plugins/matriz-led/text-sizes` | Sesión (admin u operador) | — | Alturas de carácter soportadas por las fuentes de pypixelcolor, para el selector de tamaño del panel -- ver el comentario de SUPPORTED_CHAR… |

## Notas verificadas

- Requiere instalar a mano la biblioteca `pypixelcolor` en el entorno Python de NOPAL: no existe un mecanismo de dependencias por plugin. <small>(evidencia: `matriz-led/README.md`)</small>
- El panel iPixel Color (BLE) se alcanza a través de un ESP32 con el firmware `Nopal_FF.ino` del repositorio de NOPAL; el panel FK-8Wa se controla por TCP (puerto 5858) en la misma red. <small>(evidencia: `matriz-led/README.md`)</small>

## Más información

- [README del plugin](https://github.com/charlymigenes-ux/matriz-led#readme)
