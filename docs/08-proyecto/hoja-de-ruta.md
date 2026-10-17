---
title: Hoja de ruta
sidebar_label: Hoja de ruta
sidebar_position: 1
audience: reference
type: reference
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
---

# Hoja de ruta

:::caution No es un compromiso
NOPAL es un proyecto pequeño con un solo mantenedor. Lo que sigue son **áreas de trabajo posibles**, no fechas ni promesas. La fuente es la sección *Roadmap* del README del proyecto («áreas futuras potenciales»), más las propuestas técnicas de esta documentación.
:::

## Áreas que el proyecto menciona

Según el README de NOPAL:

- **Metadatos más ricos para la biblioteca de modelos**: etiquetas, colecciones y filtros de búsqueda.
- **Mejores analíticas e historial** de trabajos de impresión, láser y CNC.
- **Integración con almacenamiento externo.**
- **Descubrir el comando correcto de ejecución desde la tarjeta SD** en más variantes de firmware GRBL (ejecutar directamente desde la SD en lugar de enviar el G-code en flujo continuo).

## Propuestas técnicas

La documentación ha identificado huecos en el sistema de plugins y los ha escrito como borradores. **No están aprobadas**:

| RFC | Tema |
|---|---|
| [RFC-0001](/07-rfc/rfc-0001-api-de-plugins-versionada) | API de plugins versionada y ciclo de vida |
| [RFC-0002](/07-rfc/rfc-0002-permisos-con-aplicacion-forzada) | Permisos con aplicación forzada |
| [RFC-0003](/07-rfc/rfc-0003-dependencias-por-plugin) | Dependencias por plugin |
| [RFC-0004](/07-rfc/rfc-0004-eventos-y-tareas-de-fondo) | Eventos y tareas de fondo |
| [RFC-0005](/07-rfc/rfc-0005-metadatos-y-validacion-del-manifiesto) | Fuente única de metadatos |
| [RFC-0006](/07-rfc/rfc-0006-sdk-plantilla-y-publicacion) | SDK, plantilla y publicación |

## Limitaciones conocidas hoy

No son planes, sino cosas que **no existen todavía** y que conviene saber:

- Una API de plugins versionada y un modo de publicar plugins de terceros.
- Un sistema de permisos aplicado a los plugins.
- Una acción para **deshabilitar** un plugin.
- Un planificador de tareas en segundo plano para plugins.
- El gancho de proyecto que espera el plugin *Texto para fabricación* para «Agregar al proyecto».

## Cómo influir

Abre un *issue* en el repositorio de NOPAL describiendo el problema que quieres resolver, o registra el hardware que posees en la página de colaboración. Ver [Contribuir](/05-desarrolladores/contribuir).
