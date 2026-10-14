---
title: Actualizar y desinstalar
sidebar_label: Actualizar y desinstalar
sidebar_position: 2
audience: admin
type: how-to
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
---

# Actualizar y desinstalar

## Actualizar

NOPAL se actualiza con `git`. Hay dos formas.

### Desde la terminal

```bash
cd ~/nopal
```

```bash
git pull
```

```bash
./install.sh
```

```bash
sudo systemctl restart nopal
```

Volver a ejecutar `install.sh` reinstala las dependencias de Python y regenera el servicio. Tus datos no se tocan.

### Desde la interfaz

En **Configuración → Actualizaciones** (solo administradores) NOPAL muestra la versión instalada y si hay una actualización disponible. Al aplicarla ejecuta `git pull --ff-only` sobre la rama remota y reinstala las dependencias de Python si hace falta.

La actualización se **bloquea** en estos casos:

| Situación | Mensaje |
|---|---|
| Hay trabajos activos en las máquinas | "Actualización bloqueada: hay trabajos activos. Deténlos de forma segura antes de continuar." |
| Hay cambios locales sin guardar en la carpeta de NOPAL | "Hay cambios locales sin guardar en el servidor. Guárdalos o descártalos antes de actualizar." |

`--ff-only` significa que solo se aplican actualizaciones que avanzan en línea recta; si tu copia local divergió del repositorio, la actualización falla en lugar de mezclar.

:::info Confianza en el origen
La actualización descarga y ejecuta lo que haya en `origin`. Úsala solo si confías en ese repositorio.
:::

## Desinstalar

Ejecuta el desinstalador **con tu usuario normal** (no como root) desde la carpeta de NOPAL:

```bash
./uninstall.sh
```

### Qué hace por defecto

- Detiene, desactiva y borra el servicio `nopal.service`, incluidos sus *overrides* de systemd.
- Borra el entorno virtual `.venv/`.
- **Conserva tus datos.** Si vuelves a instalar en la misma carpeta, los encontrarás tal cual.
- No toca Klipper, Moonraker, crowsnest ni ningún otro servicio.

Antes de actuar muestra una lista de lo que va a quitar y pide que escribas `DESINSTALAR` para continuar. Cualquier otra respuesta cancela.

### Opciones

| Opción | Efecto |
|---|---|
| `--dry-run` (o `--simular`) | Muestra qué haría, sin tocar nada |
| `--purgar` | Además **borra los datos de usuario**. Pide escribir `PURGAR` |
| `--si` (o `--yes`, `-y`) | No pregunta. Se usa en scripts y **no** sustituye a `--purgar`, que hay que pedir aparte |

```bash
./uninstall.sh --dry-run
```

### Qué se considera dato de usuario

Con `--purgar` se borran, entre otros:

- Tu biblioteca de modelos y G-code (`uploads/`), las vistas previas y los respaldos.
- Los registros de máquinas (`*_registry.json`) y el historial de láser/CNC.
- Usuarios (`auth_users.json`) y el secreto de sesión (`.session_secret`).
- Cotizaciones, precios y configuración de Spoolman.
- La configuración y las conversaciones de NOPAL Intelligence.
- Los plugins instalados (`plugins/`) y su estado (`data/`).
- Los registros de la aplicación (`logs/`).

La lista exacta se imprime antes de confirmar.

### Respaldo automático al purgar

Con `--purgar`, antes de borrar se crea `~/nopal-config-<fecha>.tar.gz` con la **configuración**: registros de máquinas, usuarios, precios, ajustes y `data/`. Queda con permisos `600` porque contiene hashes de contraseña y la clave de API de la IA.

**No incluye** la biblioteca (`uploads/`), las vistas previas, los respaldos, los registros ni los plugins clonados: pueden pesar gigabytes (la biblioteca) o se recuperan solos (los plugins los vuelve a clonar la galería). Si quieres conservar la biblioteca, cópiala antes.

:::danger No se deshace
Tras `--purgar`, solo el archivo de configuración queda como respaldo. Usa antes `--dry-run`.
:::

### Terminar de quitar el programa

El desinstalador no borra la carpeta del código. Si también quieres eliminarla, el propio script te indica el comando al terminar.

Si algún paso del servicio falla (normalmente por no tener `sudo` disponible), el resumen final lista los comandos que debes ejecutar a mano.
