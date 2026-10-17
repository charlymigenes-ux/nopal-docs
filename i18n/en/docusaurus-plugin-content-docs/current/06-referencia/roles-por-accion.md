---
title: Roles by action
sidebar_label: Roles by action
sidebar_position: 3
audience: reference
type: reference
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
source_commit: "a5853dc"
---

# Roles by action

NOPAL has two roles: **operator** and **administrator**. The authorization policy (decision ADR-006) defines, for each action, the minimum role needed. The administrator can do everything the operator can.

:::caution The policy is not applied on every route yet
Migrated routes consult this policy. Others only check that there is a session, or check the role directly. To see which is the case for each route, see the [core REST API](./api-rest-core), which lists each route's access. One known example: deleting a file from a laser's SD card, which the policy reserves for the administrator, currently only requires a session.
:::

## Machine actions

| Action | Operator | Administrator |
|---|:-:|:-:|
| View the status | ✅ | ✅ |
| Start, pause, resume and cancel a job | ✅ | ✅ |
| Home and move the head | ✅ | ✅ |
| Extrude | ✅ | ✅ |
| Target temperature, fan, speed and flow factor | ✅ | ✅ |
| Z-Offset, air assist and coolant | ✅ | ✅ |
| Work zero | ✅ | ✅ |
| Assign the active spool | ✅ | ✅ |
| **Send a console command** | ❌ | ✅ |
| **Run a macro** | ❌ | ✅ |
| **Laser power** and **spindle** | ❌ | ✅ |
| **Printer configuration** (`printer.cfg`) | ❌ | ✅ |
| **GRBL parameters** (`$$`) | ❌ | ✅ |
| **Restart the firmware** | ❌ | ✅ |
| **Restart Klipper** | ❌ | ✅ |

## Library and SD card

| Action | Operator | Administrator |
|---|:-:|:-:|
| Delete a library file | ✅ | ✅ |
| Delete a library folder | ✅ | ✅ |
| Delete a file from the SD card | ❌ | ✅ |

## Plugins

| Action | Operator | Administrator |
|---|:-:|:-:|
| Use a plugin | ✅ | ✅ |
| Configure a plugin | ❌ | ✅ |

## Logs and AI

| Action | Operator | Administrator |
|---|:-:|:-:|
| Read the logs | ✅ | ✅ |
| Use NOPAL Intelligence | ✅ | ✅ |
| **Configure** NOPAL Intelligence | ❌ | ✅ |
| Read, rename and delete **a conversation** | Their own only | Their own only |
| **Delete all conversations** (free up space) | ❌ | ✅ |

Conversations are private: not even an administrator can read another user's. The administrator can only delete them all to free up storage.

## Administration

| Action | Operator | Administrator |
|---|:-:|:-:|
| Manage users | ❌ | ✅ |
| Update NOPAL | ❌ | ✅ |
| System control (services, reboot, shutdown) | ❌ | ✅ |
| Export a backup | ❌ | ✅ |
| Import a backup | ❌ | ✅ |

For the explanation from the point of view of someone using NOPAL, see [Users and roles](../02-administracion/usuarios-y-roles).
