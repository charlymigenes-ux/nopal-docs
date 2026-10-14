---
title: Users and roles
sidebar_label: Users and roles
sidebar_position: 3
audience: admin
type: explanation
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
source_commit: "4346f72"
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
| Pause, resume and cancel jobs | ✅ | ✅ |
| Model and G-code library | ✅ | ✅ |
| Console and macros (per the policy) | ✅ | ✅ |
| Discover machines on the network | ❌ | ✅ |
| Test the connection of an already registered machine | ✅ | ✅ |
| **Add and remove** printers (Bambu, Elegoo, FlashForge, Marlin) and laser/CNC | ❌ | ✅ |
| Manage users | ❌ | ✅ |
| Install, update and remove plugins | ❌ | ✅ |
| Configuration backups | ❌ | ✅ |
| System control (services, restart, shutdown) | ❌ | ✅ |
| NOPAL Intelligence configuration | ❌ | ✅ |

:::info Two mechanisms coexist
Many routes check only the role. A growing group (console, macros, movement, temperature, Marlin job start and control, GRBL settings, Klipper restart) also consults a **central authorization policy** that decides by action and resource. The reference shows which one each route uses in the *Policy* column. Migration of the remaining routes is in progress.
:::

## Lost password

An administrator can reset the password of any user. **There is no documented procedure yet** to recover access when the only administrator's password is lost. *(Pending verification with the author.)*
