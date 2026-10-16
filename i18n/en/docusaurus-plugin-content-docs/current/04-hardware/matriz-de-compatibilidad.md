---
title: Compatibility matrix
sidebar_label: Compatibility matrix
sidebar_position: 1
audience: reference
type: reference
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
source_commit: "4346f72"
---

# Compatibility matrix

This page separates two things that must not be confused:

1. **What NOPAL can do with each machine family.** It comes from the code: the drivers and the API routes. It is **verifiable**.
2. **Which specific models have been tested.** This is not in the code. Until real test reports exist, no model is declared "compatible": they are marked **not verified**.

## 1. Capabilities by family

Data from the drivers and the [core REST API](../06-referencia/api-rest-core).

| Function | Klipper / Moonraker | Marlin | GRBL laser / CNC | Bambu Lab | Elegoo | FlashForge |
|---|:-:|:-:|:-:|:-:|:-:|:-:|
| Live status | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Pause / resume / cancel | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Start a job from NOPAL | ✅ | ✅ | ✅ | ✅ (send file) | ✅ (send file) | ✅ (send file) |
| Move the toolhead (jog) and *home* | ✅ (via G-code) | ✅ | ✅ | ❌ | ❌ | ❌ |
| Command console | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Target temperature | ✅ | ✅ | — | ❌ | ❌ | ❌ |
| Print from SD card | — | ✅ | ✅ | — | — | — |
| Job queue | ✅ | — | ✅ | — | — | — |
| Scheduled prints | ✅ | — | — | — | — | — |
| Edit `printer.cfg` and restart Klipper | ✅ | — | — | — | — | — |
| GRBL `$` settings | — | — | ✅ | — | — | — |
| Network discovery | Ports 7125–7127 on the server itself | ✅ (MKS WiFi) | ✅ (scan / by IP) | ✅ (passive SSDP) | ✅ | ✅ |

✅ implemented in the driver · ❌ the driver does not expose it · — not applicable to that family.

The **Bambu Lab, Elegoo and FlashForge** integrations only expose status, file sending and pause/resume/cancel. There is no movement or console.

## 2. Connection by family

| Family | Connection | How it authenticates |
|---|---|---|
| **Klipper / Moonraker** | HTTP (Moonraker) on the same server, ports **7125 to 7127** by default; plus those in `NOPAL_KLIPPER_PORTS` | Whatever Moonraker has |
| **Marlin** | USB serial, or **MKS WiFi** (UDP 8989 discovery and a TCP 8080 G-code bridge) | — |
| **GRBL laser / CNC** | Network (ESP3D or FluidNC boards) or USB serial | — |
| **Bambu Lab** | LAN mode: MQTT over TLS (port **8883**) and FTPS to upload files | Serial number and **access code** |
| **Elegoo** | SDCP over WebSocket | IP and board identifier (`mainboard_id`) |
| **FlashForge** | HTTP, port **8898** | Serial number and **check code** |

### Known limits

- **MKS WiFi**: the proprietary fast upload to the SD card is **not** supported.
- **FlashForge**: only the modern line (HTTP). Adventurer 3 and Adventurer 4 Pro/Lite, which use TCP with an exclusive session, are **not** supported.
- **Elegoo**: NOPAL implements the SDCP protocol directly. It does not use the official SDK or the MQTT of older resin printers.
- **Bambu Lab**: **LAN mode** only.

## 3. Models

### What the code states

The code names these models. **Naming them is not the same as having tested them.**

| Family | Models named in the code |
|---|---|
| Elegoo | Centauri Carbon and Carbon 2, Neptune 4 series, OrangeStorm Giga |
| FlashForge | Adventurer 5M and 5M Pro, AD5X, Creator 5 and 5 Pro |
| Bambu Lab | X1 Carbon, X1, X1E, P1P, P1S, A1, A1 mini |

### Built-in profile catalog

NOPAL includes a static catalog of **machine profiles** (work volume, firmware family, board variants). It is used to know what to show and offer when adding a machine; it **does not change the machine's behavior**.

The code itself states that the data comes from **public datasheets or third-party reviews, not from tests against real hardware**, with one exception: the Anet ET4 Pro profile, validated in Marlin's connection probe.

| Type | Included profiles |
|---|---|
| 3D printers (Marlin) | Hellbot Magna 2 300, Anet ET4 Pro, Snapmaker Artisan |
| 3D printers (Bambu Lab) | A1 mini, A1 |
| 3D printers (FlashForge) | AD5X |
| 3D printers (Klipper) | Creality K1C |
| Laser (GRBL) | Sculpfun S30 Pro, Two Trees TTS-55 Pro, xTool D1 Pro, Atomstack A5 Pro, Ortur Laser Master 3 |
| CNC (GRBL) | SainSmart Genmitsu 3018-PROVer and 4030-PROVer, Carbide 3D Shapeoko 4 Standard and Nomad, generic CNC 3018 |

### Verification status

| Model | Status |
|---|---|
| Anet ET4 Pro | Validated by the author in Marlin's connection probe (per the code) |
| All the others | **Not verified** by this documentation |

:::info Pending
The documentation team **does not have these machines**, so it cannot test them. The table stays at "not verified" until someone who uses them confirms it.
:::

### Report your hardware

If you use NOPAL with a specific model, tell us what works and what does not by opening an issue with the **Tested hardware** template in the documentation repository. Include model, firmware and which functions you saw working. With your report the row moves to stable, beta, partial or unsupported.
