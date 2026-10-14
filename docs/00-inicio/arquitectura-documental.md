---
title: Arquitectura documental
sidebar_label: Arquitectura documental
audience: developer
type: reference
status: implemented
verified_against: "n/a (documento normativo)"
---

# NOPAL Documentation Architecture

**Versión:** 1.0 (borrador para aprobación) · **Fecha:** 2026-10-14
> **Aplazamiento (2026-10-14):** todo lo relativo a TUNA-Screen (guía de usuario, instalación, emparejamiento, contrato v1, tiempo real `/ws/tunascreen`) está **diferido** hasta nueva orden del responsable. Las filas y fases que lo mencionan se leen como suspendidas.

**Depende de:** `DOCUMENTATION_STANDARD.md` v1.0 (aprobado) · **Evidencia:** `auditoria/`

Define **qué documentación existe, dónde vive, de dónde sale cada página y en qué orden se construye**.
Las reglas de redacción y revisión están en el Standard; aquí solo se aplican.

---

## 1. Principios de arquitectura documental

1. **Una página, una audiencia, un tipo** (Standard §3).
2. **Cada hecho tiene un dueño**: código del core, repo del plugin o repo de documentación. La documentación central no copia; enlaza o genera.
3. **Lo generado no se escribe a mano**: referencia de API, fichas de plugin y matriz de manifiestos salen de código y manifiestos.
4. **Actual y propuesto nunca se mezclan**: lo propuesto vive en `rfc/`.
5. **Se escribe primero lo que más se consulta**, no lo más fácil.

## 2. Los cuatro orígenes de contenido

| Origen | Qué aporta | Mecanismo |
|---|---|---|
| **Escrito** | Guías, tutoriales, explicaciones | Markdown en `nopal-docs`, con revisión por PR |
| **Generado del core** | Referencia REST (OpenAPI), esquema de archivos de estado | Script en CI contra `nopal@main` |
| **Agregado de plugins** | Ficha, API y troubleshooting de cada plugin | Script en CI que lee `nopal-plugin.json` y `docs/` de cada repo |
| **Enlazado** | Help Center de la app, `NOPAL_DESIGN_SYSTEM_v1.md`, código fuente | Solo enlace; sin copia (Standard §10) |

Verificado en la auditoría: FastAPI no desactiva `/docs` ni `/openapi.json` (`main.py` no define `docs_url` ni `openapi_url`),
por lo que la generación de la referencia REST es viable sin tocar el core. *(Cierra el asunto abierto C.1 del Standard.)*

## 3. Mapa del sitio

Prefijo de cada página: **[E]** escrita · **[G]** generada · **[A]** agregada de un plugin. Estado según Standard §5.

```
nopal-docs
│
├── 00 Inicio
│   ├── Qué es NOPAL (y qué no)                         [E] explanation
│   ├── Demo en vivo y capturas                         [E]
│   ├── Elegir por dónde empezar (usuario/admin/dev)    [E]
│   └── Glosario ES/EN                                  [E] reference
│
├── 01 Usuario
│   ├── Primeros pasos
│   │   ├── Tu primer arranque y recorrido guiado       [E] tutorial
│   │   └── Conectar tu primera máquina                 [E] tutorial
│   ├── Panel de control (dashboard)                    [E]
│   ├── Impresoras 3D (una guía por marca)
│   │   ├── Klipper / Moonraker
│   │   ├── Marlin independiente (USB y MKS WiFi)
│   │   ├── Bambu Lab · Elegoo · FlashForge
│   │   └── Ficha unificada de dispositivo y cámara
│   ├── Láser y CNC (GRBL): vista de detalle, SD, G-code
│   ├── Biblioteca de modelos y G-code                  [E]
│   ├── Editor de G-code                                [E]
│   ├── Consola                                         [E]
│   ├── Historial de trabajos                           [E]
│   ├── Galería de plugins: instalar, habilitar, quitar [E]
│   ├── NOPAL Intelligence (IA)                         [E] estado: experimental
│   ├── TUNA-Screen: instalar, emparejar, modo kiosko   [E]
│   ├── Configuración general, idioma y tema            [E]
│   └── Solución de problemas (por marca y por síntoma) [E]
│
├── 02 Administración
│   ├── Instalación (Linux/systemd), requisitos         [E]
│   ├── Actualizar y desinstalar (con/sin `--purgar`)   [E]
│   ├── Usuarios y roles (Admin / Operator)             [E]
│   ├── Seguridad y exposición a internet               [E]
│   ├── Red y puertos (8420), proxy inverso, HTTPS      [E]
│   ├── Registros: visor, niveles, rotación             [E]
│   ├── Copias de seguridad y restauración              [E]
│   ├── Identidad de máquinas y migración               [E]
│   ├── Plugins: dependencias manuales y Python mínimo  [E]
│   └── Diagnóstico ("Acerca de NOPAL")                 [E]
│
├── 03 Plugins
│   ├── Qué es un plugin y cuáles hay                   [E]
│   ├── Matriz de plugins (tabla de manifiestos)        [G]
│   ├── Ficha: matriz-led · arduino-accessories ·
│   │   camera-viewer · spoolman · cotizador ·
│   │   shape-creator · svg-toolkit · font-library      [A]
│   └── Flujo de diseño láser/CNC (shape→svg→font)      [E] explanation
│
├── 04 Hardware
│   ├── Matriz de compatibilidad (marca × función)      [E] verificada contra drivers
│   ├── Klipper/Moonraker, Marlin, GRBL, Bambu, Elegoo, FlashForge
│   ├── ESP32/Arduino: firmware de accesorios, OTA/USB
│   ├── Paneles LED: iPixel Color (BLE vía ESP32), FK-8Wa (TCP)
│   └── Cámaras: MJPEG, ONVIF, USB
│
├── 05 Desarrolladores
│   ├── Arquitectura de NOPAL (api/ + services/, JSON de estado)  [E] explanation
│   ├── Entorno de desarrollo y pruebas                [E]
│   ├── Añadir un driver de dispositivo                [E]
│   ├── Sistema de plugins (implementado)
│   │   ├── Estructura y manifiesto `nopal-plugin.json`
│   │   ├── Backend: `router`, carga y límites
│   │   ├── Frontend: `NopalPluginRegistry`, mount/unmount
│   │   ├── Integración de tarjeta de cámara (`NopalCameraCard`) — convention
│   │   ├── `AI_TOOLS` — experimental
│   │   ├── Python mínimo y `python_requires`
│   │   └── Publicar en la Galería (`plugin_catalog.json`)
│   ├── Tutorial: tu primer plugin ("Hola NOPAL")      [E] tras auditoría de plantilla
│   ├── Sistema de diseño (enlace a NOPAL_DESIGN_SYSTEM_v1)
│   └── Contribuir (CONTRIBUTING, estilo, PR)
│
├── 06 Referencia
│   ├── API REST del core (OpenAPI)                    [G]
│   ├── Contrato TUNA-Screen v1 (REST + WebSocket)     [E] desde `TUNASCREEN_API.md`
│   ├── API de cada plugin                             [A]
│   ├── Archivos de estado y configuración JSON        [G/E]
│   ├── Roles y autorización por endpoint              [G]
│   ├── Variables de entorno, scripts, CLI             [E]
│   ├── Códigos de error                               [E]
│   └── Tiempo real: WebSocket del láser y `/ws/tunascreen`  [E]
│
├── 07 RFC
│   ├── Índice y proceso
│   ├── API de plugins versionada
│   ├── Permisos con aplicación forzada
│   ├── Dependencias por plugin
│   ├── Bus de eventos core↔plugins
│   ├── Fuente única de metadatos de plugin
│   ├── SDK y plantilla oficial
│   └── RFC-DOC-001: Help Center en Markdown
│
└── 08 Proyecto
    ├── Hoja de ruta
    ├── Changelog (desde 1.2.0-alpha.1)
    ├── Guías de migración
    ├── Versionado y soporte
    ├── Seguridad (política y reporte)
    ├── Licencia (GPL-3.0) y créditos
    └── Apoyar NOPAL
```

## 4. Dónde vive cada pieza

| Pieza | Repositorio | Quién la mantiene | Cómo llega al sitio |
|---|---|---|---|
| Sitio y contenido central (01, 02, 04, 05, 07, 08) | `nopal-docs` | Responsable de documentación | Directo |
| Referencia REST del core | `nopal` (código) | Autor del endpoint | Script lee OpenAPI en CI |
| Contrato TUNA-Screen | `nopal` (`docs/TUNASCREEN_API.md`) | Autor del contrato | Se migra a `nopal-docs`; el original queda como puntero |
| Ficha y API de cada plugin | repo del plugin | Mantenedor del plugin | Script lee manifiesto y `docs/` en CI |
| Guía de TUNA-Screen (app) | repo de la app Android | Mantenedor de la app | Escrita en `nopal-docs` sobre el contrato; la app trae su README |
| Help Center in-app | `nopal` (`app.js`, `translations*.js`) | Mantenedor del core | Solo enlace |
| Demo y capturas | `nopal-demo` | Mantenedor del demo | Capturas generadas desde la demo |

Se evita copiar a mano contenido entre repos: cada pieza se lee en CI desde su repo y falla el build si el origen no cumple el Standard.

## 5. Estructura del repositorio `nopal-docs`

Se ajusta a la convención de Docusaurus; lo estable es la separación por responsabilidad.

```
nopal-docs/
├── docs/                         ES (fuente), páginas por sección 00–08
├── i18n/en/docusaurus-plugin-content-docs/current/    traducciones EN
├── static/img/                   capturas con nombre area-vista-version
├── src/                          componentes: ficha de plugin, matriz, aviso RFC/estado
├── generated/                    salida de scripts (no se edita a mano; en .gitignore o PR bot)
├── scripts/
│   ├── fetch-sources            clona/actualiza nopal y plugins en CI
│   ├── gen-openapi              OpenAPI → Markdown de referencia
│   ├── gen-plugin-pages         manifiesto + docs/ de plugin → fichas
│   ├── check-manifests          coherencia manifiesto / catálogo / JS
│   ├── check-routes             rutas documentadas vs. código
│   ├── check-i18n               paridad ES/EN y source_commit
│   └── check-frontmatter        status, audience, type, verified_against
├── templates/                   tutorial, how-to, reference, explanation, plugin, endpoint, hardware, rfc
├── rfc/                         (o docs/07-rfc) un archivo por RFC
├── DOCUMENTATION_STANDARD.md
├── DOCUMENTATION_ARCHITECTURE.md
├── CONTRIBUTING.md              cómo contribuir a la documentación
└── README.md
```

## 6. Fuentes existentes y su destino

Mapa de qué se reutiliza, y con qué condición (Standard §4.5: son insumos, no fuente de verdad).

| Documento actual | Líneas | Destino | Acción |
|---|---|---|---|
| `docs/manual/NOPAL_Manual_Usuario.md` (14 capítulos) | 445 | Sección 01 | Dividir por capítulo en páginas; verificar contra la UI actual; los capítulos 3, 4, 6 y 10 son los más desactualizables |
| `docs/SDD.md` v0.44 | 2106 | Secciones 05 y 07 | Su estructura ya distingue `CURRENT` y `PROPOSED`: las secciones 5–21 alimentan 05; las 22–28 alimentan 07. Verificar cada afirmación |
| `docs/TUNASCREEN_API.md` | 122 | Sección 06 | Migrar como contrato v1; añadir ejemplos y errores |
| `docs/NOPAL_INTELLIGENCE.md` | 292 | 01 (usuario) y 05 | Separar uso de arquitectura; marcar estado |
| `docs/MODO_IA_PLAN.md` | 215 | 07 RFC | Es un plan, no una función |
| `README.md` / `README.es.md` | 363 / 339 | 00 e instalación | Fuente de la visión general; el README de GitHub pasa a ser resumen con enlace |
| `NOPAL_DESIGN_SYSTEM_v1.md` | 169 | 05 | Enlace; el sitio adopta sus tokens |
| `SECURITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `CHANGELOG.md` | 26 / 37 / 29 / 7 | 08 | Mantener en el repo del core y reflejar en el sitio; reconstruir el changelog |
| `AGENTS.md`, `CLAUDE.md` | 662 / 102 | **No se publica** | Son notas de trabajo y guía para agentes. Pueden servir como pista de arquitectura, pero no son documentación oficial |

## 7. Documentación dentro de cada plugin

Cada plugin entrega lo exigido en Standard §6.2. Situación de partida (de la auditoría): hoy los 8 repos tienen solo `README.md`.

| Plugin | Backend | Docs `api.md` | Brecha principal |
|---|---|---|---|
| matriz-led | 40 rutas | Sí | Tiene `specs/` y `PROTOCOL.md` (referenciado): reutilizar. Hardware doble (BLE y TCP). Versión desfasada |
| arduino-accessories | 43 rutas | Sí | `firmware/` y telemetría 2.3: página de hardware. Permiso sensible de flasheo |
| camera-viewer | 32 rutas | Sí | Además documentar `NopalCameraCard` como contrato con el core |
| spoolman | 17 rutas | Sí | Documentar el acoplamiento con cotizador y el Docker de Spoolman |
| cotizador | 18 rutas | Sí | Sección UI `pricing` ≠ id; uso de `pricing_config.json` |
| shape-creator | — | No aplica | Solo ficha y guía de uso |
| svg-toolkit | — | No aplica | Solo ficha y guía de uso |
| font-library | — | No aplica | Ficha, guía y permisos (4 declarados) |

## 8. Flujos de mantenimiento

| Disparador | Respuesta |
|---|---|
| PR de código que cambia ruta, campo o rol | El PR enlaza el issue/PR de documentación (Standard §17); el CI de rutas lo detecta |
| Nueva versión de un plugin | El plugin actualiza su `docs/` y changelog; el CI de `nopal-docs` regenera la ficha y revalida versiones |
| Release de NOPAL | Congelar versión del sitio (cuando exista el primer tag), regenerar capturas desde `nopal-demo`, publicar migración si hay *Breaking* |
| Cambio en la interfaz | Regenerar capturas afectadas y revisar las guías de esa sección |
| Nueva idea sin código | RFC en `07` |

## 9. Hoja de construcción por fases

| Fase | Entrega | Criterio de terminado |
|---|---|---|
| **F0** | Standard + Architecture + auditorías (hecho) | Aprobados |
| **F1** | Esqueleto `nopal-docs`: Docusaurus ES/EN, plantillas, front-matter, tema con el sistema de diseño, CI con enlaces y front-matter | Sitio vacío publicado en GitHub Pages |
| **F2** | Auditoría restante (pendientes A–G de AUDITORIA_02) | Inventario completo de rutas, archivos de estado, roles y drivers |
| **F3** | Generadores: referencia REST, fichas de plugin, matriz de manifiestos, validadores | Build verde con datos reales — **completada 2026-10-14** (la referencia usa análisis estático; ver Standard §7.1) |
| **F4** | Contenido de mayor valor: 00 Inicio, instalación, primera máquina, matriz de compatibilidad, solución de problemas | Un usuario nuevo instala y conecta una máquina solo con el sitio |
| **F5** | Administración y Sistema de plugins (implementado) + contrato TUNA-Screen | Un desarrollador carga un plugin de ejemplo sin leer el código del core |
| **F6** | `docs/` en cada plugin y tutorial "Hola NOPAL" | Los 8 plugins cumplen Standard §6.2 |
| **F7** | RFC iniciales, changelog real, migración | Roadmap y RFC publicados |
| **F8** | Traducción EN completa, versionado, revisión de accesibilidad y de enlaces | Paridad ES/EN y primera versión congelada |

Orden de prioridad por impacto: **F1 → F2 → F3 → F4 → F5**; F6 puede avanzar en paralelo con F4–F5 porque vive en repos distintos.

## 10. Métricas de salud documental (visibles en el CI)

- % de endpoints del core con descripción en OpenAPI.
- % de páginas con `verified_against` igual a la versión actual.
- Páginas ES sin traducción EN vigente.
- Plugins que cumplen el contrato documental mínimo (de 8).
- Enlaces rotos.
- Páginas `experimental` sin revisar en más de un ciclo de versión.

## 11. Riesgos y mitigación

| Riesgo | Mitigación |
|---|---|
| El código cambia más rápido que los documentos (`dev-main` activo, 20 commits en cuatro días) | Verificación en CI y `verified_against`; fase F3 antes de redactar en masa |
| Dos manuales (Help Center y sitio) se contradicen | Standard §10: el sitio enlaza y no copia; contradicciones se registran como defecto |
| Un dato nuevo no verificado se publica como hecho | Estados y regla de `PENDIENTE DE VERIFICAR`; el CI rechaza páginas sin estado |
| Los repos de plugins tienen estructuras distintas | Plantilla de `docs/` obligatoria; ficha generada para detectar faltas |
| Un solo mantenedor | Documentación escrita en el mismo PR que el cambio; generadores reducen el trabajo manual |
| Capturas desactualizadas | Generación con Playwright sobre `nopal-demo` |

## 12. Decisiones pendientes que afectan esta arquitectura

1. Dominio y hosting del sitio (el plan asume GitHub Pages por ahora).
2. Quién mantiene la guía de la app TUNA-Screen y dónde vive su README definitivo.
3. Si el sitio publica el SDD tal cual (tras verificar) o solo las páginas derivadas.
4. ~~Si `nopal-demo` pasa a ser la instancia oficial de capturas~~ **Revisada tras F2:** la demo se compiló del commit `92e5443` (2026-08-19) y está desactualizada; las capturas deben tomarse de una instancia local de `nopal@main` con datos de prueba (AUDITORIA_04 §6). La demo sigue siendo válida para ejemplos de API de solo lectura.
5. Si las páginas de la sección 01 se agrupan por tarea (como arriba) o por pantalla de la interfaz.

### Historial
- 1.0 (2026-10-14): versión inicial.
