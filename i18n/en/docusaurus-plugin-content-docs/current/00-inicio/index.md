---
title: What is NOPAL
sidebar_label: What is NOPAL
slug: /
audience: user
type: explanation
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
source_commit: "pending-first-commit"
---

# What is NOPAL

**NOPAL** is a **self-hosted** control panel you use from the browser. It brings together:

- **3D printers** from five families: Klipper/Moonraker, standalone Marlin, Bambu Lab, Elegoo and FlashForge.
- **GRBL laser and CNC** machines, over the network or USB, several at the same time.
- A **3D model and G-code library** (STL, 3MF, STEP, G-code) with in-browser preview.
- A **plugin system** for materials, quoting, cameras, workshop automation and laser/CNC design.

NOPAL does not use an external database: it keeps its state in local JSON files. It runs as a service, for example with systemd on Linux, and is licensed under GPL-3.0.

:::info Project status
NOPAL is under **active development** (`1.2.0-alpha.1`, no tagged releases yet). This documentation describes the `main` branch and may change. Anything that does not exist yet appears only in the [RFC](/07-rfc) section.
:::

## Where to start

| I am... | I want to... | Start at |
|---|---|---|
| A **user** | Use NOPAL with my machines | [User](/01-usuario) |
| An **administrator** | Install, secure and maintain it | [Administration](/02-administracion) |
| A **developer** | Understand its architecture or build a plugin | [Developers](/05-desarrolladores) |
| Looking for an exact detail | Routes, formats, contracts | [Reference](/06-referencia) |

## How this documentation is organized

Every page declares its **status** (`implemented`, `convention`, `experimental`, `rfc`, `deprecated`) and the version it was verified against. The full rules are in the [documentation standard](/00-inicio/estandar-de-documentacion) and the content plan in the [documentation architecture](/00-inicio/arquitectura-documental).

## Try it without installing

There is a [live demo](https://charlymigenes-ux.github.io/nopal-demo/) with simulated data.
