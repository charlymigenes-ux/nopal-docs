---
title: Installation
sidebar_label: Installation
sidebar_position: 1
audience: admin
type: how-to
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
source_commit: "4346f72"
---

# Installation

This guide installs NOPAL as a systemd service on a Linux machine.

## Requirements

| Requirement | Detail |
|---|---|
| Operating system | Linux with **`apt`**. The installer runs `apt-get`, so it targets Debian, Ubuntu and Raspberry Pi OS |
| Python | **3.9 or later** |
| User | A regular user with `sudo`. **The installer refuses to run as root** |
| Network | The machine must be on the same local network as the machines you want to control |

You do not need any machine connected to install NOPAL: the model library and the interface work on their own, and each integration only activates what it finds.

Optional, depending on what you will use:

- **Klipper + Moonraker** reachable, for Klipper printers.
- A **Spoolman** server on the network, for the Materials plugin.
- A **GRBL** controller (over the network or USB) for laser or CNC.

## Install

```bash
git clone https://github.com/charlymigenes-ux/nopal.git ~/nopal
```

```bash
cd ~/nopal
```

```bash
./install.sh
```

Run it as your regular user. If Klipper and Moonraker run on the same machine, use **the same user** as they do, as the installer itself instructs.

### What the installer does

1. Installs the `python3-venv` and `python3-pip` packages with `apt-get`.
2. Creates a virtual environment in `.venv/` inside the NOPAL folder.
3. Installs the dependencies from `requirements.txt` into it.
4. Creates the `uploads/` and `previews/` folders.
5. Writes `/etc/systemd/system/nopal.service`, enables it and restarts it.

The generated service has these characteristics:

| Parameter | Value |
|---|---|
| User | The one who ran `install.sh` |
| Working directory | The folder where NOPAL lives |
| Command | `.venv/bin/uvicorn backend.main:app --host 0.0.0.0 --port 8420` |
| Start order | After `network-online.target` and `moonraker.service` |
| Restart | `Restart=on-failure`, with a 5-second delay |

:::warning
The service listens on **all interfaces** (`0.0.0.0`) and **without TLS**. Read it together with [Security](./seguridad).
:::

### Change the port

The default port is **8420**. To use another, set it when installing:

```bash
NOPAL_PORT=9000 ./install.sh
```

## First access

When it finishes, the installer prints the access address:

```text
http://<machine-ip>:8420
```

The first time NOPAL is opened on an installation with no users, **Initial setup** appears: that is where you create the administrator account. See [First access](../01-usuario/primer-acceso).

## Useful commands

```bash
sudo systemctl status nopal
```

```bash
sudo systemctl restart nopal
```

```bash
journalctl -u nopal -f
```

## Where the data lives

All the state of your installation (library, registered machines, users, settings) lives **inside the NOPAL folder**, next to the code. There is no external database. This matters when updating, backing up and uninstalling:

- [Update and uninstall](./actualizar-y-desinstalar)
- [Configuration backups](./respaldos)

## If something fails

See [Troubleshooting](../01-usuario/solucion-de-problemas).
