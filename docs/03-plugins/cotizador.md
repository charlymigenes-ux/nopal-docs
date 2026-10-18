---
title: Cotizador
sidebar_label: Cotizador
audience: user
type: reference
status: implemented
verified_against: "nopal@d6d86a5; nopal-plugin-cotizador@cb06264"
generated: true
plugin_id: cotizador
plugin_version: "1.1.0"
---

# Cotizador

:::note
Página **generada** automáticamente. No la edites a mano: corrige la fuente y vuelve a generar.
Fuentes: `nopal-plugin.json`, código del plugin y `plugin_catalog.json` (`nopal-plugin-cotizador@cb06264`, `nopal@d6d86a5`).
:::

Calcula el costo estimado de trabajos de impresión 3D, láser o CNC y genera cotizaciones listas para enviar.

## Ficha

| Campo | Valor |
|---|---|
| id | `cotizador` |
| Versión (manifiesto) | 1.1.0 |
| Madurez | estable (≥ 1.0) |
| Categoría | Producción |
| Publicador | NOPAL Labs |
| Compatibilidad | Impresión 3D, Láser, CNC |
| Python mínimo (`python_requires`) | sin requisito propio (hereda el del core) |
| Backend | `backend/router.py` |
| Interfaz | `frontend/cotizador.js` · sección `pricing` |
| Repositorio | [nopal-plugin-cotizador](https://github.com/charlymigenes-ux/nopal-plugin-cotizador) |
| Pruebas propias | No |
| Carpeta `docs/` propia | Sí |

## Permisos declarados

Son **texto informativo** para quien instala el plugin. NOPAL no los aplica como un sistema de permisos: el plugin se ejecuta dentro del proceso de NOPAL con sus mismos privilegios.

- Leer archivos de la biblioteca
- Guardar catálogos de materiales y máquinas
- Guardar el historial de cotizaciones

## API del plugin

Prefijo(s) de ruta: `/api/pricing`, `/cotizador/print` · 18 rutas (Sesión (admin u operador): 18; Solo admin: 0; Pública: 0).

| Método | Ruta | Acceso | Política | Descripción |
|---|---|---|---|---|
| GET | `/api/pricing/machines` | Sesión (admin u operador) | — | Catálogo de perfiles de costo por máquina (nombre, watts, tarifa/hora) — no son los dispositivos reales del registro de impresoras/láser/CN… |
| POST | `/api/pricing/machines` | Sesión (admin u operador) | — | — |
| POST | `/api/pricing/machines/remove` | Sesión (admin u operador) | — | — |
| GET | `/api/pricing/materials` | Sesión (admin u operador) | — | Catálogo de materiales (filamento/lámina/consumible) para el cotizador. |
| POST | `/api/pricing/materials` | Sesión (admin u operador) | — | Da de alta o edita (si se manda `id`) un material. `config` es un JSON con los campos específicos del tipo — filamento: density_g_cm3, diam… |
| POST | `/api/pricing/materials/remove` | Sesión (admin u operador) | — | — |
| POST | `/api/pricing/quote` | Sesión (admin u operador) | — | Cotiza un archivo ya subido (modelo/gcode) contra un material del catálogo. Sin `async` a propósito: la extracción de filamento (metadata +… |
| GET | `/api/pricing/quotes` | Sesión (admin u operador) | — | Historial de cotizaciones guardadas, para la tabla de 'Cotizaciones recientes' — más nuevas primero. |
| POST | `/api/pricing/quotes` | Sesión (admin u operador) | — | Guarda una cotización ya calculada (el JSON completo que devolvió /api/pricing/quote, más los campos de encabezado que arma el frontend: cl… |
| GET | `/api/pricing/quotes/{quote_id}` | Sesión (admin u operador) | — | — |
| PUT | `/api/pricing/quotes/{quote_id}` | Sesión (admin u operador) | — | — |
| DELETE | `/api/pricing/quotes/{quote_id}` | Sesión (admin u operador) | — | — |
| GET | `/api/pricing/quotes/{quote_id}/pdf` | Sesión (admin u operador) | — | PDF real de la cotización (tabla de costos, no una captura de la página) — `download=true` fuerza que el navegador lo baje en vez de mostra… |
| POST | `/api/pricing/quotes/{quote_id}/status` | Sesión (admin u operador) | — | 'Enviar cotización' desde la UI solo llama esto con status='sent' — no manda ningún correo real, no hay SMTP configurado en el proyecto. |
| GET | `/api/pricing/quotes/{quote_id}/whatsapp-link` | Sesión (admin u operador) | — | Devuelve el mensaje (default, o el mensaje personal configurado en Ajustes, o el `message` que mande el frontend ya editado) y la URL wa.me… |
| GET | `/api/pricing/settings` | Sesión (admin u operador) | — | — |
| POST | `/api/pricing/settings` | Sesión (admin u operador) | — | Ajustes globales del cotizador. `machine_watts_default` y `margin` son JSON (ej. `{"printer": 250, "laser": 150, "cnc": 800}` y `{"mode": "… |
| GET | `/cotizador/print/{quote_id}` | Sesión (admin u operador) | — | Vista imprimible de una cotización guardada — el usuario la exporta a PDF con el diálogo nativo del navegador (Ctrl+P). No hay librería de… |

## Notas verificadas

- Su sección de interfaz se llama `pricing`, distinta del id del plugin (`cotizador`). <small>(evidencia: `nopal-plugin-cotizador/nopal-plugin.json`)</small>

## Más información

- [README del plugin](https://github.com/charlymigenes-ux/nopal-plugin-cotizador#readme)
