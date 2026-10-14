---
title: Connect your first machine
sidebar_label: Connect your first machine
sidebar_position: 2
audience: user
type: how-to
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
source_commit: "4346f72"
---

# Connect your first machine

This guide tells you what data NOPAL asks for each type of machine and where to find it.

:::info Who can do it
**Adding a machine requires the Administrator role.** An operator can view and operate machines already registered, but not register them. See [Users and roles](../02-administracion/usuarios-y-roles).
:::

Machines must be **on the same local network** as NOPAL. Machines are added under **Settings → Devices**. The sections for each family in the side menu remind you: *"Add the printer from Settings → Devices."*

Pick your case:

| I have… | Go to |
|---|---|
| A printer running Klipper and Moonraker | [Klipper](#klipper) |
| A Marlin printer (USB or MKS WiFi board) | [Marlin](#marlin) |
| A GRBL laser or CNC | [Laser and CNC](#laser-and-cnc) |
| A Bambu Lab | [Bambu Lab](#bambu-lab) |
| An Elegoo | [Elegoo](#elegoo) |
| A FlashForge | [FlashForge](#flashforge) |

## Klipper

NOPAL looks for **Moonraker on the same machine where NOPAL runs**, on ports **7125, 7126 and 7127**. If your Moonraker is on those ports, the printer appears on its own, with no manual registration.

If you use other ports, the server administrator must declare them in the `NOPAL_KLIPPER_PORTS` environment variable (a comma-separated list of ports) and restart NOPAL:

```bash
sudo systemctl edit nopal
```

Add in the editor:

```ini
[Service]
Environment=NOPAL_KLIPPER_PORTS=7130,7131
```

```bash
sudo systemctl restart nopal
```

:::note
Today NOPAL does not discover Klipper on **other machines** of the network: it looks for Moonraker on the server itself.
:::

## Marlin

Marlin connects over **USB** or **WiFi** (MKS WiFi modules).

### Over USB

1. Connect the printer to the machine where NOPAL runs.
2. Under **Settings → Devices**, choose the **detected USB port**. If none appears you will see *"No compatible ports detected."*
3. NOPAL **tests the connection speed** (baud rate) automatically and suggests a name from what the printer answers.
4. Enter a **name**. Optionally pick a machine **profile** and, if it applies, the board variant and the number of extruders.
5. Click **Add printer**.

### Over WiFi (MKS)

1. Under **Settings → Devices**, let NOPAL **discover** the module on the network, or use **Add by IP**.
2. If you add it by IP, enter the **TCP port**. NOPAL connects to the board's G-code bridge, which uses port **8080** by default.
3. Enter a name and confirm.

## Laser and CNC

**GRBL** controllers, including ESP3D and FluidNC boards.

- **Over USB**: they appear under *Detected USB ports* (CH340, CP210x or ESP32 controllers plugged directly into the server). If there are none you will see *"No laser controllers detected over USB."*
- **Over WiFi**: NOPAL **scans the local network**. If your machine is on **another subnet**, use **Search by IP** and enter its address.

After detecting it, give it a **name** and register it. Each laser or CNC is independent: you can have several at once.

## Bambu Lab

**LAN mode** only. Data needed:

| Data | Where to find it |
|---|---|
| **IP** | In your router or on the printer screen |
| **Serial number** | On the printer |
| **Access code** | On the printer screen: **Settings → Network → LAN Mode** |
| **Name** | Whatever you choose |
| **Model** | Optional |

NOPAL **verifies the access code with a real connection (MQTT)** before confirming the registration.

:::tip The Bambu does not show up when scanning
A Bambu Lab is only visible when it announces itself on the network, so the scan may not find it the first time. **Repeat the scan** or **type its IP** by hand.
:::

## Elegoo

Printers using the SDCP protocol (for example Centauri Carbon or the Neptune 4 series).

1. Start the network scan. If it detects nothing you will see *"No Elegoo printers detected on the network. Try scanning again."*
2. Data the registration asks for: **IP**, **board identifier** (`mainboard_id`, which the scan detects), **name** and, optionally, **model**.

## FlashForge

Only the **modern line** (HTTP), such as Adventurer 5M or AD5X. Adventurer 3 and 4 are not supported.

| Data | Where to find it |
|---|---|
| **IP** | In your router or on the printer |
| **Serial number** | On the printer |
| **Check code** | On the printer screen: **Settings → Network** or **Info** |
| **Name** | Whatever you choose |

## Guided wizard

If you are an administrator, you can add Hellbot (Marlin), Bambu Lab, Elegoo and FlashForge with a 6-step wizard. See [Help Center and guided tour](./centro-de-ayuda-y-recorrido#guided-printer-setup).

## After registering

**Check:** the machine appears on the **Dashboard** with a status dot:

- **Idle**: connected, no job.
- **Run**: a job is in progress.
- **Error**: it reports a fault.
- **Offline**: NOPAL cannot communicate; check the network or USB.

If something does not work, go to [Troubleshooting](./solucion-de-problemas). To know what NOPAL can do with your machine, see the [compatibility matrix](../04-hardware/matriz-de-compatibilidad).
