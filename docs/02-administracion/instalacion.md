---
title: Instalación
sidebar_label: Instalación
sidebar_position: 1
audience: admin
type: how-to
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
---

# Instalación

Esta guía instala NOPAL como un servicio de systemd en un equipo Linux.

## Requisitos

| Requisito | Detalle |
|---|---|
| Sistema operativo | Linux con **`apt`**. El instalador ejecuta `apt-get`, así que está pensado para Debian, Ubuntu y Raspberry Pi OS |
| Python | **3.9 o superior** |
| Usuario | Un usuario normal con `sudo`. **El instalador se niega a ejecutarse como root** |
| Red | El equipo debe estar en la misma red local que las máquinas que quieras controlar |

No necesitas tener máquinas conectadas para instalar NOPAL: la biblioteca de modelos y la interfaz funcionan solas, y cada integración solo activa lo que encuentra.

Opcionales, según lo que vayas a usar:

- **Klipper + Moonraker** accesibles, para impresoras Klipper.
- Un servidor **Spoolman** en la red, para el plugin Materiales.
- Una controladora **GRBL** (por red o por USB) para láser o CNC.

## Instalar

```bash
git clone https://github.com/charlymigenes-ux/nopal.git ~/nopal
```

```bash
cd ~/nopal
```

```bash
./install.sh
```

Ejecútalo con tu usuario normal. Si Klipper y Moonraker corren en el mismo equipo, usa **el mismo usuario** que ellos, como indica el propio instalador.

### Qué hace el instalador

1. Instala los paquetes `python3-venv` y `python3-pip` con `apt-get`.
2. Crea un entorno virtual en `.venv/` dentro de la carpeta de NOPAL.
3. Instala las dependencias de `requirements.txt` en ese entorno.
4. Crea las carpetas `uploads/` y `previews/`.
5. Escribe `/etc/systemd/system/nopal.service`, lo habilita y lo reinicia.

El servicio generado tiene estas características:

| Parámetro | Valor |
|---|---|
| Usuario | El que ejecutó `install.sh` |
| Directorio de trabajo | La carpeta donde está NOPAL |
| Comando | `.venv/bin/uvicorn backend.main:app --host 0.0.0.0 --port 8420` |
| Arranque | Después de `network-online.target` y `moonraker.service` |
| Reinicio | `Restart=on-failure`, con 5 segundos de espera |

:::warning
El servicio escucha en **todas las interfaces** (`0.0.0.0`) y **sin TLS**. Léelo junto con [Seguridad](./seguridad).
:::

### Cambiar el puerto

El puerto por defecto es **8420**. Para usar otro, defínelo al instalar:

```bash
NOPAL_PORT=9000 ./install.sh
```

## Primer acceso

Al terminar, el instalador muestra la dirección de acceso:

```text
http://<ip-del-equipo>:8420
```

La primera vez que se abre NOPAL en una instalación sin usuarios aparece **Configuración inicial**: ahí creas la cuenta de administrador. Consulta [Primer acceso](../01-usuario/primer-acceso).

## Comandos útiles

```bash
sudo systemctl status nopal
```

```bash
sudo systemctl restart nopal
```

```bash
journalctl -u nopal -f
```

## Dónde quedan los datos

Todo el estado de tu instalación (biblioteca, máquinas registradas, usuarios, ajustes) queda **dentro de la carpeta de NOPAL**, junto al código. No hay base de datos externa. Esto importa al actualizar, respaldar y desinstalar:

- [Actualizar y desinstalar](./actualizar-y-desinstalar)
- [Respaldos de configuración](./respaldos)

## Si algo falla

Consulta [Solución de problemas](../01-usuario/solucion-de-problemas).
