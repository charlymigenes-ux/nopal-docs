---
title: Machine identity and its migration
sidebar_label: Machine identity
sidebar_position: 9
audience: admin
type: explanation
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
source_commit: "4346f72"
---

# Machine identity and its migration

## The problem it solves

Marlin machines and lasers/CNC used to be identified by their current address: a USB port (`/dev/ttyUSB0`) or an IP. Those addresses change: the system renumbers USB ports and DHCP reassigns IPs. Previously, each change broke whatever was saved under the old id (LED rules, cameras, alerts, history), and a reused address could point to **another** machine.

## How it works now

- Each Marlin or laser/CNC machine gets an **immutable internal id** of the form `mch_` plus 16 hexadecimal characters. It does not change when the port or IP changes.
- The ids seen by the AI, the permission policy, cameras and plugins are `marlin:<id>` and `laser:<id>`.
- NOPAL also stores some **anchors** to recognise the device again: its USB location, its MAC (read from the server's ARP table) and, as a complementary datum, the board's Chip ID. Anchors are only used to find it again; they are never the id.

## What NOPAL does when in doubt

NOPAL fails safe: if an anchor is ambiguous or does not match, it **never reassigns** the machine to another id by itself, nor registers a new one. The machine stays *offline* or in **conflict**, visible to you. Example conflicts:

- Another device answers at that IP (the MAC does not match).
- The board at that IP reports a different Chip ID.
- Two registered machines have the same MAC.
- A machine reappeared at an IP already used by another.

In the device list you will see *Conflict*; hovering shows a message such as "Port reassigned to another board — check the wiring and relink this device from here". Check the wiring or the network and link again.

## Migrating an earlier installation

If you come from a version before stable identity, there is a **one-time**, idempotent migration script (a second run changes nothing). What it does:

1. Assigns the internal id to each registered Marlin and laser/CNC and captures any missing anchors.
2. Rewrites references saved by address (`marlin:/dev/ttyUSB0`, `laser:<ip>`…) to their internal id.
3. Discards references with no matching machine: it never repoints them to another. In configuration (LED rules, alerts) it deletes the entry; in historical records (history, announcements, cameras) it deletes only the link and keeps the rest.
4. Before writing each file, it copies it to `backups/machine-identity-<date>/`.

Procedure, from the NOPAL folder and with its virtual environment:

```bash
sudo systemctl stop nopal
```

```bash
.venv/bin/python scripts/migrate_machine_identity.py
```

With no options it is a **dry run**: it prints the report and writes nothing. When the report looks right:

```bash
.venv/bin/python scripts/migrate_machine_identity.py --apply
```

```bash
sudo systemctl start nopal
```

- Stop NOPAL before `--apply`: the server also writes those registries.
- For network boards to show up in ARP, power them on and make sure NOPAL contacted them recently.
- `--esp420` additionally queries the Chip ID (read-only) of every network board that lacks one.

:::note Service name
The commands assume the `nopal` service created by the installer. If you used another name, change it.
:::
