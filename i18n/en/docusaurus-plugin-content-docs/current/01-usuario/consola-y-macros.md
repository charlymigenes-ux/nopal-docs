---
title: Console and macros
sidebar_label: Console and macros
sidebar_position: 11
audience: user
type: how-to
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
source_commit: "a5853dc"
---

# Console and macros

The **Consoles** (under **Tools**) let you see each machine's console, send it commands and run **macros**.

:::warning Sending commands and running macros is for administrators only
Any signed-in user can **see** the printer's response and the **list of macros**. **Sending a command** or **running a macro** requires the **administrator** role: if you do not have it, NOPAL answers *"Permiso insuficiente"* (insufficient permission).
:::

## Console

![Console with the machine list (NOPAL system, one Klipper, one Marlin, two lasers and two CNCs), a laser's live output, the command box and the macros panel](/img/capturas/es/consola-general-1.2.0-alpha.1.png)

*Screenshot of a running system · NOPAL 1.2.0-alpha.1 · Spanish interface · NOPAL Style theme.*

1. Open **Tools → Consoles**.
2. Under **Machines** pick a card. There is one for the **NOPAL system** (read-only: NOPAL events and log) and one for each **Klipper** or **Marlin** printer, and for each **laser** or **CNC** (GRBL). Each card shows its state (*Ready*, *Printing*, *Paused*, *Error* or *Disconnected*) and, on printers, the nozzle and bed temperatures.
3. The machine's response shows up **in real time**.
4. An administrator types a G-code command in *"Type a command…"* and sends it.

NOPAL checks the permission **before** sending anything to the machine. On a laser, commands are not accepted while a job is running, because they would knock the machine out of sync.

Below the output there are these options:

| Option | What it does |
|---|---|
| **History** | The last commands sent to that machine. Clearing it is for administrators only |
| **Clear** | Empties the output you see |
| **Save log** | Downloads the output as a text file |
| **Load file** | Sends a short G-code file line by line, such as a calibration. 256 KB and 500 lines at most. It reports how many lines were sent and how many were skipped. Administrators only |
| **Autoscroll** | Follows the last line |

The gear icon changes the font size and the copy icon copies the log.

## Macros

![Macros panel with three custom macros (G28, Reinicia FW and posicion), Klipper's own macros with their description and the "New macro" button](/img/capturas/es/consola-macros-1.2.0-alpha.1.png)

*Screenshot of a running system · NOPAL 1.2.0-alpha.1 · Spanish interface · NOPAL Style theme.*

The **Macros and templates** button opens a panel with three tabs: **Macros**, **Templates** and **Help**.

### Macros

The **Macros** tab gathers two kinds, with a search box on top:

- **Klipper's own**, defined in `printer.cfg`, with the description you gave them (*"No description configured in Klipper"* if they have none).
- **Your own**, marked with the **Custom** label, which are created in NOPAL and can be edited or deleted.

An administrator runs a macro **with one click**, without typing it in the console.

To create your own, an administrator presses **New macro** and fills in:

| Field | What it is |
|---|---|
| **Name** and **Description** | How it looks in the list |
| **Icon** | One from the list: flame, home, spool, layers, nozzle, power, wrench, thermometer, bolt, folder or play |
| **Commands** | One G-code command per line |
| **Available for** | The machine types where it shows up: 3D printers, laser or CNC |

NOPAL does not run a macro on a machine of a type it is not enabled for: it answers *"Esa macro no está habilitada para este tipo de máquina"* (that macro is not enabled for this machine type).

### Templates

A **template** is a macro with values to adjust, such as a temperature. You pick one, adjust its parameters and send it. Deleting one asks for confirmation.

### Help

It sums up the above: choose the active machine (commands and macros are sent to it), create macros and use templates.

## The other consoles

Every machine with a console appears in **Consoles**. Some also have a console of their own in their section:

| Machine | Where |
|---|---|
| **Klipper** | In **Consoles** |
| **Marlin** | In **Consoles** and on the printer's page. See [Marlin printers](./impresoras-marlin) |
| **Laser and CNC** (GRBL) | In **Consoles** and in the **Laser Console**, inside their section. See [Laser and CNC](./laser-y-cnc) |
| Bambu Lab, Elegoo, FlashForge | They **do not have** a console in NOPAL |

In all of them, **viewing** is for everyone and **sending** commands is for administrators only.

## Who can do what

| Action | Operator | Administrator |
|---|:-:|:-:|
| View the console and the macro list | ✅ | ✅ |
| Send commands | ❌ | ✅ |
| Load a G-code file | ❌ | ✅ |
| Clear the history | ❌ | ✅ |
| View the history and save the log | ✅ | ✅ |
| Run macros and templates | ❌ | ✅ |
| Create, edit and delete macros and templates | ❌ | ✅ |
