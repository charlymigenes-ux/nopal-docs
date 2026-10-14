---
title: Qué es NOPAL
sidebar_label: Qué es NOPAL
slug: /
audience: user
type: explanation
status: implemented
verified_against: "1.2.0-alpha.1 @ main 2026-10-14"
source_commit: ""
---

# Qué es NOPAL

**NOPAL** es un panel de control **autoalojado** que se usa desde el navegador. Reúne en un solo lugar:

- **Impresoras 3D** de cinco familias: Klipper/Moonraker, Marlin independiente, Bambu Lab, Elegoo y FlashForge.
- **Láser y CNC con GRBL**, por red o por USB, con varias máquinas a la vez.
- Una **biblioteca de modelos 3D y G-code** (STL, 3MF, STEP, G-code) con vista previa en el navegador.
- Un **sistema de plugins** para materiales, cotización, cámaras, automatización del taller y diseño para láser/CNC.

NOPAL no usa una base de datos externa: guarda su estado en archivos JSON locales. Se ejecuta como un servicio, por ejemplo con systemd en Linux, y se licencia bajo GPL-3.0.

:::info Estado del proyecto
NOPAL está en **desarrollo activo** (`1.2.0-alpha.1`, aún sin versiones etiquetadas). Esta documentación describe la rama `main` y puede cambiar. Lo que todavía no existe aparece solo en la sección [RFC](/07-rfc).
:::

## Por dónde empezar

| Soy... | Quiero... | Empieza en |
|---|---|---|
| **Usuario** | Usar NOPAL con mis máquinas | [Usuario](/01-usuario) |
| **Administrador** | Instalarlo, protegerlo y mantenerlo | [Administración](/02-administracion) |
| **Desarrollador** | Entender su arquitectura o crear un plugin | [Desarrolladores](/05-desarrolladores) |
| Alguien que busca un dato exacto | Rutas, formatos, contratos | [Referencia](/06-referencia) |

## Cómo está organizada esta documentación

Cada página declara su **estado** (`implemented`, `convention`, `experimental`, `rfc`, `deprecated`) y la versión contra la que se verificó. Las reglas completas están en el [estándar de documentación](/00-inicio/estandar-de-documentacion) y el plan de contenidos en la [arquitectura documental](/00-inicio/arquitectura-documental).

## Probar sin instalar

Hay una [demo en vivo](https://charlymigenes-ux.github.io/nopal-demo/) con datos simulados.
