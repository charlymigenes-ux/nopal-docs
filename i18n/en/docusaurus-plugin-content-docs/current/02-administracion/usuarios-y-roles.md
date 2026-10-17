---
title: Users and roles
sidebar_label: Users and roles
sidebar_position: 3
audience: admin
type: explanation
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
source_commit: "a5853dc"
---

# Users and roles

NOPAL requires signing in. There are **two roles** and no hierarchy between them: each action decides which role allows it.

| Role in the interface | Internal value (API and `auth_users.json`) | What it is for |
|---|---|---|
| Administrator | `admin` | Manage users, add and remove machines, install plugins, backups and system settings |
| Operator | `operador` | Day-to-day use of the machines |

:::note
The operator role is stored as **`operador`** (Spanish), not `operator`. It matters if you read `auth_users.json` or the API.
:::

## Accounts

- **First account.** On an installation with no users, the *Initial setup* screen creates the first administrator. It only works once: while `auth_users.json` is empty.
- **Passwords.** Minimum **8 characters**. Stored with PBKDF2-HMAC-SHA256 and a salt; never in clear.
- **Management.** Administrators create, list and delete users, change roles and reset passwords from **Settings → Users**.
- **Last administrator.** NOPAL **refuses to delete the last administrator** so you do not lose access.
- **Immediate changes.** The role is re-read from the user registry **on every request**. If you demote or delete an account, it takes effect immediately, even if that person has the session open.

## What each role can do

The full reference, route by route, is in the [core REST API](../06-referencia/api-rest-core). Summary by area:

| Area | Operator | Administrator |
|---|:-:|:-:|
| View machine and system status | ✅ | ✅ |
| Start, pause, resume and cancel jobs | ✅ | ✅ |
| Move the toolhead, *home* and set temperatures | ✅ | ✅ |
| Model and G-code library (upload, move, rename, delete) | ✅ | ✅ |
| Klipper queue and scheduled prints | ✅ | ✅ |
| Use NOPAL Intelligence (ask questions) | ✅ | ✅ |
| View the logs | ✅ | ✅ |
| Test the connection of an already registered machine | ✅ | ✅ |
| **Console**: send G-code or GRBL commands | ❌ | ✅ |
| **Klipper macros**: run them | ❌ | ✅ |
| **Laser and spindle power** (M3, M4, S…) | ❌ | ✅ |
| Write `printer.cfg`, restart Klipper or its firmware | ❌ | ✅ |
| GRBL `$$` parameters | ❌ | ✅ |
| Format a laser's SD card | ❌ | ✅ |
| Delete a failed or incomplete job from the history and view the Control log | ❌ | ✅ |
| Reprint and export the job history | ✅ | ✅ |
| Convert an image into a drawing (CNC) and run a CNC job from the board's SD card | ✅ | ✅ |
| Discover machines on the network | ❌ | ✅ |
| **Add and remove** machines (all brands, laser and CNC) | ❌ | ✅ |
| Manage users | ❌ | ✅ |
| Plugin gallery: view, install, update and remove | ❌ | ✅ |
| Configuration backups | ❌ | ✅ |
| System control, update NOPAL and change the log level | ❌ | ✅ |
| NOPAL Intelligence configuration | ❌ | ✅ |

:::info Two mechanisms coexist
Many routes check only the role. A growing group (console, macros, laser power, movement, temperature, Marlin job start and control, GRBL settings, Klipper restart) also consults a **central authorization policy** that decides by action and resource. The reference shows which one each route uses in the *Policy* column. Migration of the remaining routes is in progress: **some actions the policy intends for administrators only are not yet checked on every route** (for example, deleting files from a laser's SD card is currently allowed to any session).
:::

## Lost password

An administrator can reset the password of any user. **There is no documented procedure yet** to recover access when the only administrator's password is lost. *(Pending verification with the author.)*
