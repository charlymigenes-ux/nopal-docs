---
title: Job history
sidebar_label: Job history
sidebar_position: 12
audience: user
type: explanation
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
source_commit: "4346f72"
---

# Job history

It is under **Jobs → Job History**. It brings together two lists, one for the 3D printers and one for the laser.

## 3D print history

*"Files already printed by each printer"*: for each detected **Klipper** printer, NOPAL shows **the last 3 files printed**, taken from Moonraker's history. You can **search** by file name.

:::note Klipper only
This list comes from Moonraker's history, so it only covers Klipper printers. Marlin, Bambu Lab, Elegoo and FlashForge printers show their **active** job on their card, but have no history in this list.
:::

## Laser history

*"Laser jobs completed, cancelled or with an error"*. Each entry shows its **state**: **completed**, **cancelled** or **error**.

- The screen shows the **50 most recent jobs**.
- NOPAL keeps up to **200** entries.
- If there are none yet you will see *"There are no laser jobs in the history yet"*.

## Where it is stored

The laser history is stored in `laser_history.json`, in the NOPAL folder. It is **not part of** the [configuration backups](../02-administracion/respaldos): the *Laser and CNC* group only includes the machine registry.

## Who can do what

All signed-in users can see the history.
