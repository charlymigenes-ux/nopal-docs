---
title: Identidad de máquinas y su migración
sidebar_label: Identidad de máquinas
sidebar_position: 9
audience: admin
type: explanation
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
---

# Identidad de máquinas y su migración

## El problema que resuelve

Las máquinas Marlin y los láseres/CNC se identificaban por su dirección actual: un puerto USB (`/dev/ttyUSB0`) o una IP. Esas direcciones cambian: el sistema renumera los puertos USB y el DHCP reasigna IPs. Antes, cada cambio rompía lo guardado con el id viejo (reglas de LED, cámaras, alertas, historial) y una dirección reutilizada podía apuntar a **otra** máquina.

## Cómo funciona ahora

- Cada máquina Marlin o láser/CNC recibe un **id interno inmutable** con la forma `mch_` más 16 caracteres hexadecimales. No cambia aunque cambien el puerto o la IP.
- Los ids que ven la IA, la política de permisos, las cámaras y los plugins son `marlin:<id>` y `laser:<id>`.
- NOPAL guarda además unas **anclas** para volver a reconocer el equipo: su ubicación USB, su MAC (la lee del ARP del servidor) y, como dato complementario, el Chip ID de la placa. Las anclas sirven solo para reencontrarlo; nunca son el id.

## Qué hace NOPAL ante la duda

NOPAL falla del lado seguro: si un ancla es ambigua o no coincide, **nunca reasigna sola** la máquina a otro id ni da de alta una nueva. La máquina queda *fuera de línea* o en **conflicto**, visible para ti. Ejemplos de conflicto:

- Otro equipo responde en esa IP (la MAC no coincide).
- La placa en esa IP reporta otro Chip ID.
- Dos máquinas registradas tienen la misma MAC.
- Una máquina reapareció en una IP que ya usa otra.

En la lista de dispositivos verás *Conflicto*; al pasar el cursor, un mensaje como «Puerto reasignado a otra placa — revisa el cableado y vuelve a vincular este dispositivo desde aquí». Revisa el cableado o la red y vincula de nuevo.

## Migrar una instalación anterior

Si vienes de una versión previa a la identidad estable, hay un script de migración **único**, idempotente (una segunda ejecución no cambia nada). Qué hace:

1. Asigna el id interno a cada Marlin y láser/CNC registrados y captura las anclas que falten.
2. Reescribe las referencias guardadas por dirección (`marlin:/dev/ttyUSB0`, `laser:<ip>`…) a su id interno.
3. Descarta las referencias sin máquina correspondiente: nunca las reapunta a otra. En configuración (reglas de LED, alertas) borra la entrada; en registros históricos (historial, anuncios, cámaras) borra solo el vínculo y conserva el resto.
4. Antes de escribir cada archivo, lo copia a `backups/machine-identity-<fecha>/`.

Procedimiento, desde la carpeta de NOPAL y con su entorno virtual:

```bash
sudo systemctl stop nopal
```

```bash
.venv/bin/python scripts/migrate_machine_identity.py
```

Sin opciones es una **simulación**: imprime el informe y no escribe nada. Cuando el informe te convenza:

```bash
.venv/bin/python scripts/migrate_machine_identity.py --apply
```

```bash
sudo systemctl start nopal
```

- Detén NOPAL antes de `--apply`: el servidor también escribe esos registros.
- Para que las placas por red aparezcan en el ARP, enciéndelas y que NOPAL las haya contactado hace poco.
- `--esp420` consulta además el Chip ID (solo lectura) a cada placa de red que no lo tenga.

:::note Nombre del servicio
Los comandos asumen el servicio `nopal` creado por el instalador. Si usaste otro nombre, cámbialo.
:::
