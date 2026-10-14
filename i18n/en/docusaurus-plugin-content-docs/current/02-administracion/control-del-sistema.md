---
title: System control
sidebar_label: System control
sidebar_position: 7
audience: admin
type: how-to
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
source_commit: "4346f72"
---

# System control

For **administrators** only. It lets you manage, from NOPAL, the services of the machine it runs on.

## Services

You can **start, stop and restart** the **Klipper**, **Moonraker** and **Crowsnest** services.

## Restart NOPAL

Restarts the application itself. It is needed after installing a plugin with a backend (see [Plugin gallery](../01-usuario/galeria-de-plugins)).

## Reboot or shut down the host

Rebooting and shutting down the host machine ask for **double confirmation**.

:::danger Before restarting, updating or shutting down
Stop all machines with jobs in progress. When updating, NOPAL shows a safety notice (*"Stop all machines before continuing"*) and requires ticking a confirmation box before **Update and restart**.
:::

See [Update and uninstall](./actualizar-y-desinstalar).
