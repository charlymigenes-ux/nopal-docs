---
title: Troubleshooting
sidebar_label: Troubleshooting
sidebar_position: 3
audience: user
type: how-to
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
source_commit: "4346f72"
---

# Troubleshooting

This page collects **real messages** NOPAL shows and what to do in each case. It is not a complete list: it grows as problems are confirmed. Server messages are shown in Spanish; each is followed by its translation.

:::tip First step, almost always
Look at the logs: **Settings → System logs → View logs**. Filter by component, level or text. For more detail, raise the **Logging** level to *Detailed* and go back to *Normal* when done. See [Logs](../02-administracion/registros).
:::

## Access

| You will see | What it means | What to do |
|---|---|---|
| **Incorrect username or password** | The credentials do not match | Check upper and lower case. An administrator can reset your password |
| **Demasiados intentos; vuelve a intentarlo en unos minutos** (too many attempts) | 5 failed attempts in 5 minutes from the same address | Wait a few minutes. The counter resets when NOPAL restarts |
| **Permiso insuficiente** (insufficient permission) | That action is for administrators only, for example adding devices or changing AI configuration | Ask an administrator |
| **No autenticado** / **Sesión inválida** (not authenticated / invalid session) | The session expired, or your account changed or was deleted | Sign in again |

## I cannot find my machine

| Case | What to do |
|---|---|
| **Klipper does not appear** | NOPAL only looks for Moonraker on **its own machine**, on ports **7125 to 7127**. If you use others, the administrator must declare them in `NOPAL_KLIPPER_PORTS` ([how](./conectar-primera-maquina#klipper)) |
| **Laser or CNC on another subnet** | The scan does not see it. Use **Search by IP** and enter its address |
| **Bambu Lab does not appear** | It is only seen when it announces itself. **Repeat the scan** or type its IP |
| **No Elegoo / FlashForge printers detected on the network. Try scanning again.** | Repeat the scan. Check that NOPAL and the printer are on the same local network |
| **No compatible ports detected** (Marlin) / **No laser controllers detected over USB** | Check the cable and that the board is connected **to the server**. Also check the port permissions (see below) |

## Connection errors

| Message | Where | What to do |
|---|---|---|
| **No se pudo conectar a `<ip>:8883`** (could not connect) | Bambu Lab | The printer must be in **LAN Mode**. Check the IP and the **access code** (Settings → Network → LAN Mode, on the printer screen) |
| **La impresora respondió, pero no envió estado** (the printer answered but sent no status) | Elegoo | NOPAL got a reply without status data. Retry; if it persists, check the logs |

## USB ports

To use a serial port (`/dev/ttyUSB*` or `/dev/ttyACM*`), **the user who runs NOPAL** must have permission on it, normally through the `dialout` group.

The user is the one who ran `install.sh`. To add them to the group, replace `<user>`:

```bash
sudo usermod -aG dialout <user>
```

```bash
sudo systemctl restart nopal
```

:::note
If you move a controller to another USB connector it may end up **offline** or in **Conflict**. NOPAL finds the laser/CNC or Marlin again by its **USB location**, which depends on the physical connector. Put it back on its connector and check the cause under **Settings → Devices**.
:::

**If the IP or port changes you do not lose the configuration**: lasers/CNC and Marlin printers have a fixed internal identifier, and NOPAL finds them again (by USB location or MAC address) keeping configuration, camera and history.

## Updating

| You will see | What to do |
|---|---|
| **Actualización bloqueada: hay trabajos activos…** (update blocked: active jobs) | Safely stop the jobs and retry |
| **Hay cambios locales sin guardar en el servidor…** (unsaved local changes) | There are modified files in the NOPAL folder. Save them (`git stash`) or discard them |

## Plugins

| You will see | What to do |
|---|---|
| **Este plugin requiere Python X o superior; NOPAL corre con Python Y** (this plugin requires Python X or later) | NOPAL does not install or load the plugin until the server has that Python version. NOPAL itself works with Python 3.9 or later |
| A plugin does not load and a `[plugin-id] no se pudo cargar el backend del plugin` warning appears in the logs | The plugin failed to import. NOPAL keeps working without it. Check the detail in the logs |
| **LED Matrix**: fails because of a library | You must install `pypixelcolor` by hand in NOPAL's Python environment: there is no automatic per-plugin dependency installation |
| **Workshop Automation**: no boards | The board must run NOPAL's generic firmware. Relays or strips with factory firmware are not supported |

## The service does not start or crashes

```bash
sudo systemctl status nopal
```

```bash
journalctl -u nopal -f
```

## The installer refuses to continue

**"No corras este script como root/sudo."** (do not run this script as root) Run `./install.sh` as your regular user, not with `sudo`. The script asks for `sudo` on its own only when it needs it.
