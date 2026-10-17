---
title: Help Center and guided tour
sidebar_label: Help Center
sidebar_position: 16
audience: user
type: how-to
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
source_commit: "a5853dc"
---

# Help Center and guided tour

## Help Center

Inside NOPAL, the Help Center gathers cards by topic: Home, 3D printers, Laser/CNC, Library, Devices and sensors, Network and connectivity, Automation, Maintenance, Troubleshooting and FAQ. Use the *"Search help..."* box to filter them. Features not yet available appear as *Coming soon*.

The **Home** card shows the NOPAL version, a link to the GitHub repository and the **Replay guided tour** button.

![Help Center with its categories, the search box and the Home card](/img/capturas/en/ayuda-centro-1.2.0-alpha.1.png)

*NOPAL 1.2.0-alpha.1 screenshot · English interface · NOPAL Style theme.*

## Guided tour

The first time you enter a section, NOPAL shows a short tour. It exists for the dashboard, library, G-code editor, console, laser, CNC, Marlin, queue and settings, among others.

- It is shown **once per section** in each browser.
- To see them all again: **Help Center → Home → Replay guided tour**.
- To turn them off: **Settings → General → Guided tour**.

## Guided printer setup

Administrators have a 6-step wizard to add printers: choose brand, prepare the printer, search the network, credentials, verify the connection and finish. It covers Hellbot (Marlin over USB or MKS WiFi), Bambu Lab, Elegoo and FlashForge. It opens with **Add printer (guided wizard)** from the 3D printers card in the Help Center and from the Marlin, Elegoo and FlashForge sections. See also [Connect your first machine](./conectar-primera-maquina).

![3D printer guided wizard on the first step: choosing the brand](/img/capturas/en/ayuda-asistente-impresora-1.2.0-alpha.1.png)

*NOPAL 1.2.0-alpha.1 screenshot · English interface · NOPAL Style theme.*
