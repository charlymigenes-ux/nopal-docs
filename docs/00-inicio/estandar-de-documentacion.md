---
title: Documentation Standard
sidebar_label: Estándar de documentación
audience: developer
type: reference
status: implemented
verified_against: "n/a (documento normativo)"
---

# NOPAL Documentation Standard

**Versión del estándar:** 1.6 (aprobado)
**Fecha:** 2026-10-14


Este documento define **cómo se escribe, revisa y mantiene** la documentación oficial de NOPAL y de sus extensiones.
La estructura de contenidos vive en la [Arquitectura documental](./arquitectura-documental.md).

Las palabras **DEBE**, **NO DEBE** y **DEBERÍA** se leen como obligación, prohibición y recomendación.

---

## 1. Propósito

Que cualquier persona (usuario, administrador o desarrollador) pueda confiar en que lo que dice la documentación oficial
**es verdad para la versión que está usando**, y que lo que aún no es verdad esté claramente separado.

## 2. Alcance

**Dentro del estándar**
- `nopal` (core), `nopal-demo` y el sitio web.
- Los 8 plugins oficiales: `matriz-led`, `arduino-accessories`, `camera-viewer`, `spoolman`, `cotizador`,
  `shape-creator`, `svg-toolkit`, `font-library`.
- Hardware **que NOPAL controla** (Klipper/Moonraker, Marlin, Bambu, Elegoo, FlashForge, GRBL, ESP32/Arduino y paneles LED).

**Fuera del estándar**
- Plugins de terceros: se rigen por la sección 6 solo si piden figurar en la galería oficial.

## 3. Audiencias y niveles

| Nivel | Pregunta | Prohibido en este nivel |
|---|---|---|
| **Usuario** | ¿Cómo hago esto? | Detalles de implementación, nombres de módulos, JSON internos |
| **Administrador** | ¿Cómo hago que funcione y se mantenga? | Guías paso a paso de uso diario; código fuente |
| **Desarrollador** | ¿Cómo lo extiendo o lo modifico? | Pasos de interfaz para el usuario final |
| **Referencia** | ¿Cuál es el dato exacto? | Narrativa, tutoriales, opiniones |

Cada página pertenece a **un solo** nivel y **un solo** tipo (Diátaxis): tutorial, guía práctica, referencia o explicación.
Si una página necesita dos, se divide.

## 4. Fuente de verdad

1. **El código vigente de la rama `main` es la única fuente de verdad** para comportamiento, rutas, campos y versiones.
2. Una afirmación técnica **DEBE** poder rastrearse a un archivo, ruta de API, prueba o salida real.
3. Cuando la documentación y el código discrepan, **se corrige la documentación** salvo que la discrepancia sea un defecto del código;
   en ese caso se abre un issue y la página lleva el estado de la sección 5 que corresponda mientras se resuelve.
4. Las IA y herramientas automáticas **NO DEBEN** completar con suposiciones: si un dato no está en el código ni en este repositorio de
   documentación, se escribe `PENDIENTE DE VERIFICAR` y se registra en la lista de pendientes. Nunca se inventan endpoints, campos,
   versiones ni eventos.
5. Documentos existentes (`SDD.md`, `AGENTS.md`, READMEs) son **insumos**, no fuente de verdad. Se verifican antes de reutilizarlos.

## 5. Estados de una afirmación (obligatorio en páginas técnicas)

Toda página técnica declara su estado en el front-matter (`status:`) y, si una sección difiere, en el encabezado de esa sección.

| Estado | Significado | Se puede usar en producción |
|---|---|---|
| `implemented` | Verificado contra el código actual | Sí |
| `convention` | Funciona hoy, pero no hay un mecanismo que lo imponga | Sí, con cuidado |
| `experimental` | Existe en código y puede cambiar sin aviso | No recomendado |
| `rfc` | Propuesta; no existe | No |
| `deprecated` | Existe por compatibilidad | No en trabajo nuevo |

Reglas:
- Una página `rfc` **DEBE** vivir en `docs/07-rfc/` y mostrar un aviso visible en la parte superior.
- Una página `implemented` **DEBE** declarar la versión de NOPAL contra la que se verificó (`verified_against: 1.2.0-alpha.1 @ <commit>`).
- Ninguna característica `rfc` puede aparecer en guías de usuario ni en tutoriales.

- Una página **esqueleto** declara `stub: true` y muestra el aviso "En construcción". No puede contener afirmaciones técnicas; queda exenta de `verified_against` y no cuenta como documentación publicada en las métricas.

Ejemplo vigente de aplicación (de la auditoría):
- `NopalPluginRegistry` con `mount/unmount/version` → `implemented`.
- Rutas de un plugin: **no hay prefijo común** (cada plugin elige el suyo: `/api/plugins/matriz-led`, `/api/accessories`, `/api/cameras`, `/api/pricing`, `/api/spoolman`). Se documenta el prefijo real de cada plugin; ninguna "convención de prefijo" es contrato.
- `AI_TOOLS` → `experimental`.
- Permisos del manifiesto → `implemented` como **texto informativo**; "permisos con aplicación forzada" → `rfc`.
- Versión de Plugin API, dependencias por plugin, sandbox, bus de eventos → `rfc`.

## 6. Documentación de plugins

### 6.1 Terminología
- Hoy el mecanismo se llama **NOPAL Plugin System**. El término **SDK** se reserva para cuando exista una API contractual estable y plantilla oficial.

### 6.2 Contrato documental mínimo de un plugin oficial
Cada plugin **DEBE** tener en su repositorio:

```
README.md              resumen, instalación, requisitos, límites conocidos
nopal-plugin.json      manifiesto (fuente de verdad de metadatos)
docs/
  overview.md          qué hace, para quién, capturas
  installation.md      instalación y dependencias manuales
  configuration.md     ajustes y archivos que crea
  api.md               endpoints (método, ruta, rol, ejemplo)
  hardware.md          solo si aplica
  troubleshooting.md   errores reales y soluciones
CHANGELOG.md
```

Los plugins solo de frontend (`shape-creator`, `svg-toolkit`, `font-library`) omiten `api.md` y lo declaran explícitamente.

### 6.3 Ficha de plugin en el sitio
El sitio genera una ficha por plugin a partir del manifiesto y del `docs/` del plugin. La ficha **DEBE** mostrar:
id, nombre, versión, categoría, compatibilidad (3D/láser/CNC), `python_requires`, permisos declarados (con la aclaración
de que son informativos), dependencias manuales, acoplamientos con otros componentes y estado de madurez (0.x = preview).

### 6.4 Fuente única de metadatos
- El **manifiesto del plugin** es la fuente de verdad de `id`, `name`, `version`, `category`, `compatibility`, `permissions` y `python_requires`.
- `plugin_catalog.json` del core y la constante de versión del JS **DEBERÍAN** derivarse de él o validarse contra él.
- Mientras no exista esa derivación, el CI de documentación **DEBE** avisar si las tres versiones no coinciden
  (hoy `matriz-led`: 0.10.0 / 0.9.0 / 0.9.0).

### 6.5 Acoplamientos y dependencias
Todo acoplamiento no declarado en el manifiesto **DEBE** documentarse en la ficha del plugin. Casos vigentes:
`spoolman → cotizador` (`material_id = spoolman:<id>`), `core → camera-viewer` (`NopalCameraCard`),
`arduino-accessories → laser_service / marlin_printer_service`, `matriz-led → ESP32 con Nopal_FF.ino`.

## 7. Documentación de API

1. La **referencia de la API del core se genera**, no se mantiene a mano: por **análisis estático** del código (incluye el rol de cada ruta, que OpenAPI no refleja) y, cuando se pueda, complementada con el OpenAPI de FastAPI.
2. Para que la generación sea útil, el código **DEBERÍA** tener `summary`, `description`, `tags`, modelos de respuesta y códigos de error.
   El título y la descripción de la app FastAPI **DEBEN** actualizarse (hoy: "Biblioteca inteligente para modelos 3D y G-code").
3. Las rutas de plugins no entran al OpenAPI del core de forma curada; se documentan en `docs/api.md` de cada plugin con la plantilla siguiente.
4. Cada endpoint documentado manualmente incluye: método y ruta, descripción, rol requerido (público / operador / admin),
   parámetros, ejemplo de petición, ejemplo de respuesta, errores y estado (sección 5).
6. Los canales de tiempo real (websocket del láser) se documentan con formato de mensaje y ciclo de conexión.
7. Una API **interna** (por ejemplo `get_loaded_plugin_module`) **NO DEBE** aparecer en la documentación pública.

## 8. Versionado de la documentación

- El sitio se versiona por **línea mayor.menor** de NOPAL (`1.2`, `1.3`), no por parche.
- Mientras NOPAL esté en `alpha` y sin tags de git, existe una sola versión publicada: **"Próxima (main)"**, con aviso de que puede cambiar.
- Al publicar la primera release etiquetada, se congela la versión y se activa el selector de versiones. **No se congela antes**: una versión congelada sin etiqueta de NOPAL no tendría contra qué verificarse. El procedimiento está en el README del repositorio de documentación.
- La API de plugins, cuando exista, tendrá su **propio número** independiente del número de NOPAL.
- Cambios incompatibles ⇒ entrada en `CHANGELOG` marcada **Breaking** + página en `migration/`.

## 9. Idiomas (ES / EN)

- **Español es la fuente.** Inglés es traducción oficial. Ambos idiomas son requisito de publicación de una página `implemented`
  en las secciones Usuario, Administrador y Referencia; en Desarrollador e RFC basta español con aviso "pendiente de traducir". Desde F8 **todas** las páginas están traducidas.
- Cada página traducida declara `source_commit` del español; si el español cambia, el CI marca la traducción como **desactualizada**.
- Los idiomas de la interfaz (de, fr, pt-BR) **NO** son idiomas de documentación; no se traducen las guías a ellos.
- Terminología fija en un glosario bilingüe (`docs/00-inicio/glosario.md`): una palabra, un término. Los nombres de producto
  (NOPAL, Cotizador) no se traducen.

## 10. Relación con el Help Center de la app

Decisión vigente: **sin fuente compartida** (el Help Center vive en `app.js` + `translations*.js`).
- El Help Center cubre ayuda contextual breve dentro de la app; el sitio cubre la documentación completa.
- El sitio **NO DEBE** copiar texto del Help Center; lo enlaza.
- Toda contradicción detectada entre ambos se registra como defecto en el que sea menos fiel al código.
- Migrar el Help Center a Markdown con generación de `translations*.js` queda como **RFC-DOC-001** (no iniciado).

## 11. Capturas y diagramas

- Toda captura declara versión de NOPAL, idioma de la interfaz y tema. Se guarda con nombre `area-vista-version.png`.
- Las capturas **DEBEN** regenerarse (idealmente con Playwright sobre `nopal-demo`) cuando cambia la pantalla que muestran.
- Sin datos reales: nombres de máquinas, IPs, tokens y correos son de demostración.
- Los diagramas se escriben como texto (Mermaid) para que se revisen en el PR. Imagen binaria solo si Mermaid no alcanza.

## 12. Ejemplos de código

- Todo ejemplo **DEBE** ser ejecutable o estar marcado `ilustrativo`.
- Los ejemplos de API se prueban contra `nopal-demo` o contra una instancia de prueba.
- No se muestran contraseñas, tokens ni claves reales; se usan marcadores (`<TOKEN>`).
- Los comandos de shell van en bloques con una sola orden y el lenguaje etiquetado.

## 13. Declaraciones de compatibilidad

- Se expresan siempre con versión: "NOPAL ≥ 1.2.0-alpha.1", "Python ≥ 3.9", "plugin requiere Python ≥ 3.10".
- La **matriz de compatibilidad** (marca × función × estado estable/beta/no soportado) es una página de referencia obligatoria
  y se verifica contra los drivers (`bambu`, `elegoo`, `flashforge`, `marlin`, `printers` Klipper, `laser`).
- Un hardware no probado se marca "no verificado", nunca "compatible".

## 14. Deprecación

Una función deprecada: se marca `deprecated` en su página, se anota en `CHANGELOG` con la versión en que se eliminará,
y se enlaza el reemplazo. No se elimina su documentación hasta que se elimine del código.

## 15. Changelog y migración

- `CHANGELOG.md` sigue Keep a Changelog (Added / Changed / Fixed / Removed / Security / **Breaking**).
- Se debe iniciar un changelog real a partir de `1.2.0-alpha.1` (hoy el archivo declara que no hay releases).
- El changelog **no** sustituye a la documentación: cada cambio visible actualiza además su página.
- Cada plugin mantiene su propio `CHANGELOG.md`.

## 16. Proceso RFC

1. Toda idea que no exista en código se propone en `docs/07-rfc/` (por ejemplo `rfc-0007-titulo.mdx`) con la plantilla `templates/rfc.mdx`.
2. Secciones obligatorias: problema, propuesta, alternativas, impacto en plugins existentes, compatibilidad, plan de migración, estado.
3. Estados: `draft` → `review` → `accepted` → `implemented` | `rejected` | `withdrawn`.
4. Cuando un RFC se implementa, se crea la página oficial `implemented` y el RFC pasa a archivo con enlace.
5. RFC iniciales identificados en la auditoría: **API de plugins versionada**, **permisos con aplicación**, **dependencias por plugin**,
   **bus de eventos core↔plugins**, **fuente única de metadatos de plugin**, **SDK y plantilla oficial**, **Help Center en Markdown (RFC-DOC-001)**.

## 17. Revisión y criterios de aceptación

Un PR de documentación **solo se fusiona** si:
- ☐ El estado (`status`) y la versión verificada están declarados.
- ☐ Las afirmaciones técnicas están trazadas a código, prueba o salida real.
- ☐ No describe como existente algo `rfc`.
- ☐ Respeta el nivel y tipo de página (sección 3).
- ☐ Pasa los validadores del CI (sección 18).
- ☐ Incluye la traducción o el aviso de pendiente (sección 9).
- ☐ Capturas y ejemplos cumplen secciones 11 y 12.

Un PR de **código** que cambia comportamiento público (ruta, campo de manifiesto, mensaje de websocket, ajuste, rol requerido)
**DEBE** actualizar la documentación afectada o abrir el issue de documentación enlazado en el PR.

## 18. Validación automática (CI del repositorio de documentación)

| Validador | Comprueba | Estado |
|---|---|---|
| Enlaces internos | Sin enlaces internos rotos (`onBrokenLinks: 'throw'` en el build) | Implementado |
| Enlaces externos | Las URL externas responden (`scripts/check-external-links.mjs`) | Implementado, **solo avisa** (la red es inestable) |
| Front-matter | `status`, `audience`, `type`, `verified_against` presentes y válidos; RFC solo en `07-rfc` con su aviso | Implementado |
| Alcance | Ninguna página pública menciona lo excluido o diferido (`scripts/data/scope.json`) | Implementado |
| Ejemplos | Los bloques de código del tutorial coinciden con los archivos probados | Implementado |
| Manifiestos | Cada `nopal-plugin.json` cumple los campos requeridos y coincide con el catálogo y el JS | Implementado; los desfases de versión **solo avisan** |
| Rutas de API | Las rutas citadas en páginas escritas existen en el código; la referencia generada está al día | Implementado |
| ES/EN | Paridad de páginas y `source_commit` presente | Implementado; **no** comprueba que el `source_commit` siga vigente |
| Estilo | Glosario, markdownlint y ortografía | **Pendiente** |
| Capturas | Existen los archivos referenciados y tienen nombre válido | **Pendiente** (aún no hay capturas) |
| Accesibilidad | Auditoría con axe-core de las páginas principales, en claro y oscuro | Hecha **a mano** en F8; no está en el CI |

## 19. Roles

| Rol | Responsabilidad |
|---|---|
| Responsable de documentación | Mantiene este estándar y aprueba cambios estructurales |
| Autor de la funcionalidad | Escribe o actualiza las páginas de su cambio |
| Revisor | Verifica contra el código antes de aprobar |
| Mantenedor de plugin | Mantiene el `docs/` y el manifiesto de su plugin |

## 20. Cambios a este estándar

Los cambios se proponen por PR, llevan nota en la sección siguiente y, si son incompatibles con páginas existentes,
requieren un plan de adecuación.

### Historial
- 1.6 (2026-10-14): F8. Se actualizan referencias desfasadas (ruta de RFC, glosario), el estado real de los validadores en §18, la regla de no congelar versiones sin etiqueta en §8 y los asuntos abiertos del Anexo C. Todas las páginas tienen traducción EN.
- 1.5 (2026-10-14): §7.1: la referencia REST se genera por análisis estático (scripts/extract_routes.py), con OpenAPI como complemento futuro.
- 1.2 (2026-10-14): corrección en §5: no existe un prefijo de ruta común para plugins (verificado en el código).
- 1.1 (2026-10-14): se añade el estado de página esqueleto (`stub: true`) en §5.
- 1.0 (2026-10-14): versión inicial.

---

## Anexo A — Front-matter obligatorio

```yaml
---
title: Conectar una impresora Klipper
audience: user            # user | admin | developer | reference
type: how-to              # tutorial | how-to | reference | explanation | rfc
status: implemented       # implemented | convention | experimental | rfc | deprecated
verified_against: "1.2.0-alpha.1 @ <commit>"
source_commit: "<commit del español>"   # solo en traducciones
---
```

## Anexo B — Decisiones adoptadas

| Decisión | Valor |
|---|---|
| Herramienta del sitio | Docusaurus (sitio independiente, no mezcla la arquitectura de la app) |
| Idiomas de documentación | ES (fuente) + EN |
| Help Center | Sin fuente compartida; RFC-DOC-001 para el futuro |
| Término vigente | "NOPAL Plugin System" (no "SDK") |
| Repositorio | Un único `nopal-docs` al inicio; separar plantillas cuando haya terceros |

## Anexo C — Asuntos abiertos

1. ~~Confirmar que `/docs` y `/openapi.json` de FastAPI están activos~~ **Resuelto:** el código no los desactiva. La referencia REST se genera por análisis estático (v1.5).
2. Definir dominio y hosting del sitio (GitHub Pages inicialmente). **Abierto.**
3. ~~Decidir si `nopal-demo` es la instancia oficial para capturas~~ **Resuelto:** no; la demo se compiló de una versión anterior. Las capturas deben tomarse de una instancia local de `nopal@main`.
4. Definir el responsable humano de cada rol de la sección 19. **Abierto.**
5. Decidir cómo se tratan las traducciones de la interfaz (de, fr, pt-BR) en la guía de usuario. **Abierto.**
6. Lista de hardware probado: el equipo de documentación no dispone de las máquinas; se completa con reportes de usuarios (plantilla de *issue* «Hardware probado»). **Abierto.**
