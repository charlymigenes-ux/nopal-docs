---
title: Contribuir
sidebar_label: Contribuir
sidebar_position: 8
audience: developer
type: how-to
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
---

# Contribuir

NOPAL crece con personas que lo prueban en hardware real, reportan lo que falla y envían correcciones. Esta página resume la guía `CONTRIBUTING.md` del repositorio del core.

## Formas de contribuir

- **Reportar un fallo.** Abre un *issue* con tu sistema operativo, la versión de Python, la máquina y el firmware implicados y los pasos para reproducirlo.
- **Proponer una función.** Describe el problema que resuelve, no solo la función.
- **Registrar hardware para pruebas.** Si tienes una impresora, un láser, una CNC o una placa que NOPAL aún no soporta, el proyecto tiene una página de colaboración donde registrarla.
- **Enviar un pull request**: correcciones, drivers de máquinas nuevos, mejoras de plugins, documentación y traducciones.

## Preparar el entorno

Ver [Entorno de desarrollo y pruebas](./entorno-y-pruebas.md).

## Pull requests

1. Haz un *fork* y crea una rama desde `main` (por ejemplo `fix/laser-jog-offset` o `feat/flashforge-driver`).
2. Mantén el cambio **enfocado**: una corrección o función por PR.
3. Comprueba que `pytest` pasa en local.
4. Describe **qué** cambia y **por qué**, y enlaza el *issue* si lo hay.
5. Un mantenedor revisará y podrá pedirte cambios.

## Estilo de código

Sigue las convenciones del archivo que editas: los módulos de cada marca siguen la misma forma, y el frontend sigue el sistema de temas existente. Ante la duda, prefiere la coherencia con el código vecino antes que introducir un patrón nuevo. No añadas un *bundler* ni un linter sin acordarlo antes.

Los textos para el usuario, los comentarios y los mensajes de registro van en **español de México**; los identificadores, en inglés.

## Si tu cambio altera algo público

Si tu cambio modifica una ruta, un campo del manifiesto, un mensaje de WebSocket, un ajuste o el rol que exige una acción, **actualiza la documentación afectada** o abre un *issue* de documentación enlazado en el PR. Ver el [estándar de documentación](../00-inicio/estandar-de-documentacion), sección 17.

## Licencia

Al contribuir aceptas que tu aportación se licencie bajo **GPLv3**, la licencia del proyecto.

## Seguridad

No abras un *issue* público para un problema de seguridad. Ver [Seguridad](../02-administracion/seguridad.md#reportar-una-vulnerabilidad).
