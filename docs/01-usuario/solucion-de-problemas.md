---
title: Solución de problemas
sidebar_label: Solución de problemas
sidebar_position: 20
audience: user
type: how-to
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
---

# Solución de problemas

Esta página reúne **mensajes reales** que muestra NOPAL y qué hacer en cada caso. No es una lista completa: crece con los problemas que se confirmen.

:::tip Primer paso casi siempre
Mira los registros: **Configuración → Logs del sistema → Ver logs**. Filtra por componente, nivel o texto. Para más detalle, sube el nivel de **Registro** a *Detallado* y vuelve a *Normal* al terminar. Ver [Registros](../02-administracion/registros).
:::

## Acceso

| Verás | Qué significa | Qué hacer |
|---|---|---|
| **Usuario o contraseña incorrectos** | Las credenciales no coinciden | Revisa mayúsculas y minúsculas. Un administrador puede restablecer tu contraseña |
| **Demasiados intentos; vuelve a intentarlo en unos minutos** | 5 intentos fallidos en 5 minutos desde la misma dirección | Espera unos minutos. El contador se reinicia al reiniciar NOPAL |
| **Permiso insuficiente** | Esa acción es solo para administradores, por ejemplo dar de alta dispositivos o cambiar la configuración de la IA | Pídesela a un administrador |
| **No autenticado** / **Sesión inválida** | La sesión caducó, o tu cuenta cambió o se eliminó | Vuelve a iniciar sesión |
| **NOPAL funciona mejor en escritorio o tablet** | Tu pantalla mide menos de 640 px de ancho (celular) y el panel completo no está pensado para ella | Abre NOPAL desde un equipo de escritorio o una tablet |

## No encuentro mi máquina

| Caso | Qué hacer |
|---|---|
| **Klipper no aparece** | NOPAL solo busca Moonraker en **su propio equipo**, en los puertos **7125 a 7127**. Si usas otros, el administrador debe declararlos en `NOPAL_KLIPPER_PORTS` ([cómo](./conectar-primera-maquina#klipper)) |
| **Láser o CNC en otra subred** | El escaneo no la ve. Usa **Buscar por IP** y escribe su dirección |
| **Bambu Lab no aparece** | Solo se ve cuando ella misma se anuncia. **Repite el escaneo** o escribe su IP |
| **No se detectaron impresoras Elegoo / FlashForge en la red. Prueba a escanear de nuevo.** | Repite el escaneo. Comprueba que NOPAL y la impresora estén en la misma red local |
| **No se detectaron puertos compatibles** (Marlin) / **No se detectaron controladoras láser por USB** | Revisa el cable y que la placa esté conectada **al servidor**. Revisa también los permisos del puerto (ver abajo) |

## Errores de conexión

| Mensaje | Dónde | Qué hacer |
|---|---|---|
| **No se pudo conectar a `<ip>:8883`** | Bambu Lab | La impresora debe estar en **Modo LAN**. Comprueba la IP y el **access code** (Configuración → Red → Modo LAN, en la pantalla de la impresora) |
| **La impresora respondió, pero no envió estado** | Elegoo | NOPAL recibió respuesta pero sin datos de estado. Reintenta; si persiste, revisa los registros |

## Puertos USB

Para usar un puerto serie (`/dev/ttyUSB*` o `/dev/ttyACM*`), **el usuario que ejecuta NOPAL** debe tener permiso sobre él, normalmente mediante el grupo `dialout`.

El usuario es el que ejecutó `install.sh`. Para añadirlo al grupo, sustituye `<usuario>`:

```bash
sudo usermod -aG dialout <usuario>
```

```bash
sudo systemctl restart nopal
```

:::note
Si cambias una controladora de conector USB puede quedar **sin conexión** o en **Conflicto**. NOPAL reencuentra el láser/CNC o la Marlin por su **ubicación USB**, que depende del conector físico. Devuélvela a su conector y revisa la causa en **Configuración → Dispositivos**.
:::

**Si cambia la IP o el puerto no pierdes la configuración**: los láseres/CNC y las Marlin tienen un identificador interno fijo, y NOPAL los reencuentra (por ubicación USB o por dirección MAC) conservando configuración, cámara e historial.

## Actualizar

| Verás | Qué hacer |
|---|---|
| **Actualización bloqueada: hay trabajos activos…** | Detén de forma segura los trabajos y reintenta |
| **Hay cambios locales sin guardar en el servidor…** | Hay archivos modificados en la carpeta de NOPAL. Guárdalos (`git stash`) o descártalos |

## Plugins

| Verás | Qué hacer |
|---|---|
| **Este plugin requiere Python X o superior; NOPAL corre con Python Y** | NOPAL no instala ni carga el plugin hasta que el servidor tenga esa versión de Python. NOPAL en sí funciona con Python 3.9 o superior |
| Un plugin no carga y aparece un aviso `[id-del-plugin] no se pudo cargar el backend del plugin` en los logs | El plugin falló al importarse. NOPAL sigue funcionando sin él. Revisa el detalle en los logs |
| **Matriz LED**: falla por una biblioteca | Debes instalar a mano `pypixelcolor` en el entorno Python de NOPAL: no hay instalación automática de dependencias por plugin |
| **Automatización de Taller**: no hay placas | La placa debe tener el firmware genérico de NOPAL. No se soportan relés ni tiras con firmware de fábrica |

## El servicio no arranca o se cae

```bash
sudo systemctl status nopal
```

```bash
journalctl -u nopal -f
```

## El instalador se niega a continuar

**"No corras este script como root/sudo."** Ejecuta `./install.sh` con tu usuario normal, no con `sudo`. El script pedirá `sudo` por su cuenta solo cuando lo necesite.
