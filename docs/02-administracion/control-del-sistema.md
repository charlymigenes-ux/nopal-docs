---
title: Control del sistema
sidebar_label: Control del sistema
sidebar_position: 7
audience: admin
type: how-to
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
---

# Control del sistema

Solo para **administradores**. Permite gestionar desde NOPAL los servicios del equipo donde corre.

## Servicios

Puedes **iniciar, detener y reiniciar** los servicios **Klipper**, **Moonraker** y **Crowsnest**.

## Reiniciar NOPAL

Reinicia la propia aplicación. Es necesario tras instalar un plugin con backend (ver [Galería de plugins](../01-usuario/galeria-de-plugins)).

## Reiniciar o apagar el equipo

El reinicio y el apagado del equipo anfitrión piden **doble confirmación**.

:::danger Antes de reiniciar, actualizar o apagar
Detén todas las máquinas con trabajos en curso. Al actualizar, NOPAL muestra un aviso de seguridad (*«Detén todas las máquinas antes de continuar»*) y exige marcar una casilla de confirmación antes de **Actualizar y reiniciar**.
:::

Ver [Actualizar y desinstalar](./actualizar-y-desinstalar).
