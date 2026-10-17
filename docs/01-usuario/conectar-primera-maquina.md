---
title: Conectar tu primera máquina
sidebar_label: Conectar tu primera máquina
sidebar_position: 2
audience: user
type: how-to
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
---

# Conectar tu primera máquina

Esta guía te dice qué datos pide NOPAL para cada tipo de máquina y dónde conseguirlos.

:::info Quién puede hacerlo
**Dar de alta una máquina requiere el rol Administrador.** Un operador puede ver y operar las máquinas ya registradas, pero no registrarlas. Ver [Usuarios y roles](../02-administracion/usuarios-y-roles).
:::

Las máquinas deben estar **en la misma red local** que NOPAL. Las altas se hacen en **Configuración → Dispositivos**. Las secciones de cada familia en el menú lateral te lo recuerdan: *"Agrega la impresora desde Configuración → Dispositivos."*

Elige tu caso:

| Tengo… | Ir a |
|---|---|
| Una impresora con Klipper y Moonraker | [Klipper](#klipper) |
| Una impresora con Marlin (USB o placa MKS WiFi) | [Marlin](#marlin) |
| Un láser o una CNC con GRBL | [Láser y CNC](#láser-y-cnc) |
| Una Bambu Lab | [Bambu Lab](#bambu-lab) |
| Una Elegoo | [Elegoo](#elegoo) |
| Una FlashForge | [FlashForge](#flashforge) |

## Klipper

NOPAL busca **Moonraker en el mismo equipo donde corre NOPAL**, en los puertos **7125, 7126 y 7127**. Si tu Moonraker está en esos puertos, la impresora aparece sola, sin alta manual.

Si usas otros puertos, el administrador del servidor debe declararlos en la variable de entorno `NOPAL_KLIPPER_PORTS` (lista de puertos separados por comas) y reiniciar NOPAL:

```bash
sudo systemctl edit nopal
```

Añade en el editor:

```ini
[Service]
Environment=NOPAL_KLIPPER_PORTS=7130,7131
```

```bash
sudo systemctl restart nopal
```

:::note
Hoy NOPAL no descubre Klipper en **otros equipos** de la red: busca Moonraker en el propio servidor.
:::

## Marlin

Marlin se conecta por **USB** o por **WiFi** (módulos MKS WiFi).

### Por USB

1. Conecta la impresora al equipo donde corre NOPAL.
2. En **Configuración → Dispositivos**, elige el **puerto USB detectado**. Si no aparece ninguno, verás *"No se detectaron puertos compatibles."*
3. NOPAL **prueba la velocidad de conexión** (baudios) automáticamente y sugiere un nombre a partir de lo que responde la impresora.
4. Pon un **nombre**. Opcionalmente elige un **perfil** de máquina y, si aplica, la variante de placa y el número de extrusores.
5. Pulsa **Agregar impresora**.

### Por WiFi (MKS)

1. En **Configuración → Dispositivos**, deja que NOPAL **descubra** el módulo en la red, o usa **Agregar por IP**.
2. Si lo agregas por IP, indica el **puerto TCP**. NOPAL se conecta al puente de G-code de la placa, que por defecto usa el puerto **8080**.
3. Pon un nombre y confirma.

## Láser y CNC

Controladoras **GRBL**, incluidas las placas ESP3D y FluidNC.

- **Por USB**: aparecen en *Puertos USB detectados* (controladoras CH340, CP210x o ESP32 conectadas directo al servidor). Si no hay ninguna verás *"No se detectaron controladoras láser por USB."*
- **Por WiFi**: NOPAL **escanea la red local**. Si tu máquina está en **otra subred**, usa **Buscar por IP** y escribe su dirección.

Después de detectarla, ponle un **nombre** y regístrala. Cada láser o CNC es independiente: puedes tener varios a la vez.

## Bambu Lab

Solo en **modo LAN**. Datos necesarios:

| Dato | Dónde encontrarlo |
|---|---|
| **IP** | En tu router o en la pantalla de la impresora |
| **Número de serie** | En la impresora |
| **Access code** | En la pantalla de la impresora: **Configuración → Red → Modo LAN** |
| **Nombre** | El que tú elijas |
| **Modelo** | Opcional |

NOPAL **comprueba el access code con una conexión real (MQTT)** antes de confirmar el alta.

:::tip La Bambu no aparece al escanear
Una Bambu Lab solo se ve cuando ella misma se anuncia en la red, así que el escaneo puede no encontrarla a la primera. **Repite el escaneo** o **escribe su IP** a mano.
:::

## Elegoo

Impresoras con el protocolo SDCP (por ejemplo Centauri Carbon o la serie Neptune 4).

1. Pulsa el escaneo de red. Si no detecta nada verás *"No se detectaron impresoras Elegoo en la red. Prueba a escanear de nuevo."*
2. Datos que pide el alta: **IP**, **identificador de la placa** (`mainboard_id`, que el escaneo detecta), **nombre** y, opcionalmente, **modelo**.

## FlashForge

Solo la **línea moderna** (HTTP), como Adventurer 5M o AD5X. Las Adventurer 3 y 4 no están soportadas.

| Dato | Dónde encontrarlo |
|---|---|
| **IP** | En tu router o en la impresora |
| **Número de serie** | En la impresora |
| **Check code** | En la pantalla de la impresora: **Ajustes → Red** o **Información** |
| **Nombre** | El que tú elijas |

## Asistente guiado

Si eres administrador, puedes añadir Hellbot (Marlin), Bambu Lab, Elegoo y FlashForge con un asistente de 6 pasos. Ver [Centro de ayuda y recorrido guiado](./centro-de-ayuda-y-recorrido#asistente-guiado-de-impresoras).

## Después del alta

**Comprueba:** la máquina aparece en el **Panel de control** con un punto de estado:

- **Idle**: conectada y sin trabajo.
- **Run**: tiene un trabajo en curso.
- **Error**: reporta una falla.
- **Sin conexión**: NOPAL no puede comunicarse; revisa la red o el USB.

Si algo no funciona, ve a [Solución de problemas](./solucion-de-problemas). Para saber qué puede hacer NOPAL con tu máquina, consulta la [matriz de compatibilidad](../04-hardware/matriz-de-compatibilidad).
