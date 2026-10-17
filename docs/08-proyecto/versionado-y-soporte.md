---
title: Versionado y soporte
sidebar_label: Versionado y soporte
sidebar_position: 3
audience: reference
type: reference
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
---

# Versionado y soporte

## Versión actual

El archivo `VERSION` del core contiene **`1.2.0-alpha.1`**. El proyecto está en **desarrollo activo**.

| Hecho | Detalle |
|---|---|
| Etiquetas de git | **Ninguna.** El repositorio no tiene *tags* |
| Versiones publicadas (*releases*) | **Ninguna.** El propio `CHANGELOG.md` del core dice que no hay una versión etiquetada |
| `1.1.0` | Se fijó en `VERSION` el **2026-07-15** (commit `release-1.1.0`), sin etiqueta |
| `1.2.0-alpha` | El ciclo empezó el **2026-07-16** (commit «begin 1.2.0 alpha cycle») |

Una insignia de versión del README se retiró porque «todavía no hay pre-release». La lista de cambios por versión está en el [historial de cambios](./changelog.md), generado desde el historial de git.

## Qué significa «alpha» aquí

NOPAL cambia **rápido**: entre el 3 y el 7 de octubre de 2026 hubo **37 commits** (sin contar fusiones). No hay garantía de compatibilidad entre versiones: interfaz, archivos de estado y rutas de la API pueden cambiar. Cuando un cambio exige acción del usuario, se documenta en [Migración](./migracion.md).

## Soporte

Según la política de seguridad del proyecto:

- Las correcciones de seguridad apuntan a **la última versión de la rama `main`**.
- **No hay una rama de soporte a largo plazo.**
- No hay un plazo de respuesta formal (proyecto pequeño, un mantenedor).

:::note Incoherencia en el texto de SECURITY.md
La política de seguridad describe a NOPAL como «pre-1.0», mientras la versión es `1.2.0-alpha.1`. Conviene aclarar qué significa la numeración antes de publicar una versión.
:::

## Requisitos de Python

| Componente | Python |
|---|---|
| NOPAL (core) | **3.9 o superior**. El CI prueba 3.9 y 3.11 |
| Un plugin | El del core, salvo que declare `python_requires` (por ejemplo, `matriz-led` exige 3.10 o superior) |

## Versiones de los plugins

Cada plugin tiene **su propia versión**, independiente de la de NOPAL (por ejemplo `arduino-accessories` 2.6.0 o `font-library` 0.5.1). Las versiones `0.x` son preliminares. No existe una versión de API de plugins: ver [RFC-0001](/07-rfc/rfc-0001-api-de-plugins-versionada).

## Versionado de esta documentación

Mientras NOPAL no etiquete versiones, el sitio publica **una sola versión**, la que describe la rama `main` («Próxima»). Cada página declara contra qué commit se verificó. Al publicarse la primera versión etiquetada, se congelará su documentación y se activará el selector de versiones (Standard §8).
