---
title: Logs
sidebar_label: Logs
sidebar_position: 5
audience: admin
type: how-to
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
source_commit: "4346f72"
---

# Logs

NOPAL writes a persistent log of what happens: connections, jobs and errors.

## Where they are

| Where | What it contains |
|---|---|
| `logs/nopal.log` (inside the NOPAL folder) | The application log |
| `journalctl -u nopal -f` | The service output, including the console copy |

By default the file rotates at **5 MB** and **5 copies** are kept (`nopal.log.1` … `nopal.log.5`). The line format is date, level, component and message.

## View them in the interface

**Settings → System logs → View logs.** It lets you:

- Filter by **component**, **level** or **text**.
- Look at earlier rotated files.
- Pause the view to read calmly.

Operators can also view the logs; only administrators can change their configuration.

## Levels

Under **Settings → Logging** you choose an **overall level**:

| Level | What it records |
|---|---|
| Basic | Only warnings and errors |
| Normal (recommended) | Information, warnings and errors |
| Detailed | Information in general, and debug only for NOPAL and its plugins |
| Diagnostic | Debug for everything, libraries included |

You can also tune **specific components** (for example, a plugin on "errors only") and the technical source list with the states normal, warnings, errors or silenced. The configuration is stored in `logging_config.json`.

## Diagnose a problem

1. Temporarily raise the level to **Detailed** or **Diagnostic**.
2. Reproduce the problem.
3. Check the logs, filtering by the component you suspect.
4. **Go back to Normal** when done: high levels write a lot.

:::tip
Problems loading a plugin appear as warnings with the plugin id in brackets, for example `[matriz-led] no se pudo cargar el backend del plugin` (could not load the plugin backend). A broken plugin does not stop NOPAL from starting.
:::
