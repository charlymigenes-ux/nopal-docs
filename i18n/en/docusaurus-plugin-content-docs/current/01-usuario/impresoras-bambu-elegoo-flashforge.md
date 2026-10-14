---
title: Bambu Lab, Elegoo and FlashForge printers
sidebar_label: Bambu Lab, Elegoo and FlashForge
sidebar_position: 7
audience: user
type: how-to
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
source_commit: "4346f72"
---

# Bambu Lab, Elegoo and FlashForge printers

These three families of network printers are controlled the same way. Each has its section under **Devices** (**Bambu Lab printers**, **Elegoo printers** and **FlashForge printers**) and appears on the [dashboard](./panel-de-control).

## What you can do

| Function | Detail |
|---|---|
| **View the status** | Live status of the printer and its job |
| **Send a file to print** | From the [library](./biblioteca) with **Send to printer**: print immediately |
| **Pause, resume and cancel** | From the printer's own card |
| **Test the connection** | Of an already registered printer |

:::info No movement or console
The **Bambu Lab, Elegoo and FlashForge integrations only expose status, file sending and pause, resume and cancel**. You cannot move the toolhead, *home*, set temperatures or use a console from NOPAL. For that, use the printer's screen or its app.
:::

Since these brands have no queue or scheduling in NOPAL, the only sending mode is **print immediately**.

## Register a printer

It is an administrator task, under **Settings → Devices**. Each brand asks for different data:

| Brand | Data |
|---|---|
| **Bambu Lab** (LAN mode only) | IP, serial number and **access code** |
| **Elegoo** | IP and board identifier (`mainboard_id`) |
| **FlashForge** (modern line) | IP, serial number and **check code** |

Where to find each datum and how the scan works is in [Connect your first machine](./conectar-primera-maquina).

## Brand specifics

### Bambu Lab

- **LAN mode** only.
- NOPAL **verifies the access code with a real connection** before confirming the registration.
- A Bambu only appears in the scan when it announces itself on the network; if it does not show up, **repeat the scan** or type its IP.

### Elegoo

- Printers using the SDCP protocol (Centauri Carbon, Neptune 4 series, etc.).
- The printer **pushes its status** to NOPAL while connected.

### FlashForge

- Only the **modern line** (Adventurer 5M and 5M Pro, AD5X, Creator 5 and 5 Pro). Adventurer 3 and 4 are **not** supported.

## Who can do what

| Action | Operator | Administrator |
|---|:-:|:-:|
| View the status | ✅ | ✅ |
| Send a file, pause, resume and cancel | ✅ | ✅ |
| Test the connection of a registered printer | ✅ | ✅ |
| Discover, register and remove | ❌ | ✅ |

## If something fails

See [Troubleshooting](./solucion-de-problemas#connection-errors): Bambu Lab and Elegoo connection messages, and what to do if the printer does not appear in the scan.
