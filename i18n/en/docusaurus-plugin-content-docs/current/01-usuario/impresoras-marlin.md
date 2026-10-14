---
title: Marlin printers
sidebar_label: Marlin printers
sidebar_position: 6
audience: user
type: how-to
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
source_commit: "4346f72"
---

# Marlin printers

These are 3D printers with "pure" **Marlin** firmware, connected over **USB** or over **WiFi** with an **MKS** module, **without** Klipper or Moonraker. NOPAL controls them directly. They appear under **Devices → Marlin printers** and on the [dashboard](./panel-de-control).

## Register a printer

Registering is an administrator task, under **Settings → Devices**. See [Connect your first machine](./conectar-primera-maquina#marlin). When registering you can give a machine **profile**, the board variant and the number of **extruders**.

Each Marlin printer has a **fixed internal identifier**. If the USB port or the WiFi module's IP changes, NOPAL finds it again without losing its configuration, camera or history.

## What you can do

| Function | Detail |
|---|---|
| **Move** the toolhead | X/Y/Z axes with configurable steps |
| **Home** | Per axis or **ALL** |
| **Temperatures** | View and set the extruder's and bed's target temperature |
| **Print a file** | From the [library](./biblioteca) with **Send to printer**: *print immediately* |
| **Print from the SD card** | If the printer reports an SD card (see below) |
| **Pause, resume and cancel** | On the active job |
| **Console** | See the printer's response live. **Sending** commands is for administrators only |
| **Camera** | Appears on the card if you have the Cameras plugin and linked it |

The Marlin printer's card is the **unified device card**, the same form the other machines use.

## Print from the SD card

This option only appears if the printer **confirms it has an SD card**. If not, NOPAL shows *"This printer doesn't report an SD card connected."*.

When you choose **Send to SD Card** in the **Send to printer** selector, NOPAL **uploads the file to the SD card, preheats the printer and starts the print by itself**. That way the print does not depend on the USB connection staying open the whole time.

## Who can do what

| Action | Operator | Administrator |
|---|:-:|:-:|
| View status and temperatures | ✅ | ✅ |
| Move, *home* and set temperatures | ✅ | ✅ |
| Start, pause, resume and cancel | ✅ | ✅ |
| View the console | ✅ | ✅ |
| **Send commands** through the console | ❌ | ✅ |
| Register or remove, discover MKS modules, test ports | ❌ | ✅ |

## If something fails

- **No compatible ports detected:** check the cable and that the printer is connected **to the server**. See [Troubleshooting](./solucion-de-problemas#usb-ports).
- **"Conflict" appears:** NOPAL cannot confirm that the device on that port is the same one. If you moved the printer to another USB connector, put it back on its connector.
- **The MKS WiFi module does not appear:** use **Add by IP** and enter the TCP port (default 8080). MKS's proprietary fast upload to the SD card is **not** supported.
