---
title: Migration
sidebar_label: Migration
sidebar_position: 4
audience: admin
type: how-to
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
source_commit: "4346f72"
---

# Migration

NOPAL has no tagged versions yet, so there are no "from version X to Y" guides. This page collects what **does** require action when updating, checked against the code and the history.

| Change | When | What must you do? |
|---|---|---|
| [Stable machine identity](#stable-machine-identity) | 2026-10-04 | Run a migration script once |
| [Laser without a global "active host"](#laser-without-a-global-active-host) | 2026-10-05 | If you use the laser API from outside, always send `host` |
| [Cotizador turned into a plugin](#cotizador-turned-into-a-plugin) | before October | Install the plugin; the data is kept |

## Stable machine identity

Since **2026-10-04** (commit `feat(auth): stable machine identity`) every Marlin and every registered laser/CNC has an **internal identifier** (`mch_` followed by 16 hexadecimal characters), instead of depending on its address (`/dev/ttyUSBx` or IP), which changes.

Marlin and laser/CNC registries receive that identifier **automatically** when loaded. But the **references that other files stored by address** (LED rules, alerts, announcements, cameras, history) must be rewritten with a script. **NOPAL does not run it on its own**: no server code invokes it.

### What the script does

1. Assigns the internal identifier to each registered Marlin and laser/CNC and captures any missing network anchors (the **MAC** comes from the server's ARP table).
2. Rewrites the references stored by address to their internal identifier. It only uses the registry's **current** address as a valid match.
3. References **with no counterpart** (addresses that today belong to no registered machine) **are discarded**; they are never reassigned to another machine on their own. In configuration (LED rules, alerts) the entry is deleted; in historical records only the link is deleted and the rest is kept.
4. Before writing each file that changes, it **copies it** to `backups/machine-identity-<date>/`.

It is **idempotent**: a second run changes nothing.

### How to run it

From the NOPAL folder, with its virtual environment.

1. **Stop NOPAL**: the server also writes those registries.

```bash
sudo systemctl stop nopal
```

2. **Dry run** (by default it writes nothing). Review the report it prints:

```bash
.venv/bin/python scripts/migrate_machine_identity.py
```

3. **Apply**, with a prior backup:

```bash
.venv/bin/python scripts/migrate_machine_identity.py --apply
```

Optionally, `--esp420` queries (read-only) each network board without a `chip_id` to store that complementary datum as an anchor:

```bash
.venv/bin/python scripts/migrate_machine_identity.py --apply --esp420
```

4. **Start NOPAL** again:

```bash
sudo systemctl start nopal
```

:::tip For the MAC to be captured
Network boards must be **powered on** and NOPAL must have contacted them recently, so they appear in the server's ARP table.
:::

## Laser without a global "active host"

Since **2026-10-05** (commit `feat(laser): retire global active laser host`), NOPAL no longer keeps a "selected laser" in server memory.

**Before:** a single "active" machine, shared by all sessions. If another session or tab switched machine, pausing, cancelling or formatting the SD could go to the wrong machine.

**Now:**

- `GET` and `POST /api/laser/host` and the fixed default IP were removed.
- The **25 laser routes** that used the global host **require `host`**. Without it they answer **400** before authorizing, reading files or touching a machine.
- The panel stores the chosen machine per section (Laser/CNC) **in the browser**, by internal identifier, and sends `host` on every call.

**If you call the laser API from a script or a plugin**, always add the `host` parameter.

## Cotizador turned into a plugin

The Cotizador **is no longer part of the core**: it is a plugin. Its data (`pricing_config.json`, `quotes_registry.json` and the `uploads/.pricing_cache/` cache) is still stored at the **installation root**, on purpose, so that installing the plugin over an instance that already had the Cotizador built into the core **keeps the same history with no manual migration**.

Install the plugin from the Gallery and restart NOPAL. See its [sheet](/03-plugins/cotizador).

## Before any update

1. Make a [configuration backup](/02-administracion/respaldos) and copy your library (`uploads/`) separately.
2. Stop active jobs: updating from the interface is blocked if there are any.
3. Review the [change history](./changelog.md) between your version and the new one. **Commits do not systematically mark breaking changes** (none is marked today, and the laser change described above was one), so this page is the reference.
