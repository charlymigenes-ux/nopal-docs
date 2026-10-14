---
title: Console and macros
sidebar_label: Console and macros
sidebar_position: 11
audience: user
type: how-to
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
source_commit: "4346f72"
---

# Console and macros

The **System Console** (under **Tools**) lets you see a **Klipper** printer's console and run its **macros**.

:::warning Sending commands and running macros is for administrators only
Any signed-in user can **see** the printer's response and the **list of macros**. **Sending a command** or **running a macro** requires the **administrator** role: if you do not have it, NOPAL answers *"Permiso insuficiente"* (insufficient permission).
:::

## Console

1. Select a Klipper printer.
2. The printer's response appears **in real time**.
3. An administrator can type a G-code command in the *"Send command..."* box and send it.

NOPAL checks the permission **before** sending anything to the printer.

## Macros

The **Macros** block lists the macros you have defined in Klipper's `printer.cfg`, with the description you gave them (*"No description configured in Klipper"* if they have none). An administrator runs a macro **with one click**, without typing it in the console.

## The other consoles

Each family has its own console, inside the machine's section:

| Machine | Where |
|---|---|
| **Marlin** | On the printer's card. See [Marlin printers](./impresoras-marlin) |
| **Laser and CNC** (GRBL) | **Laser Console**, in the machine's section. See [Laser and CNC](./laser-y-cnc) |
| Bambu Lab, Elegoo, FlashForge | They **do not have** a console in NOPAL |

In all of them, **viewing** is for everyone and **sending** commands is for administrators only.

## Who can do what

| Action | Operator | Administrator |
|---|:-:|:-:|
| View the console and the macro list | ✅ | ✅ |
| Send commands | ❌ | ✅ |
| Run macros | ❌ | ✅ |
