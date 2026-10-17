---
title: Impresoras Marlin
sidebar_label: Impresoras Marlin
sidebar_position: 6
audience: user
type: how-to
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
---

# Impresoras Marlin

Son impresoras 3D con firmware **Marlin** «puro», conectadas por **USB** o por **WiFi** con un módulo **MKS**, **sin** Klipper ni Moonraker. NOPAL las controla directamente. Aparecen en **Dispositivos → Impresoras Marlin** y en el [panel de control](./panel-de-control).

## Dar de alta una impresora

El alta es tarea de un administrador, en **Configuración → Dispositivos**. Ver [Conectar tu primera máquina](./conectar-primera-maquina#marlin). Al darla de alta puedes indicar un **perfil** de máquina, la variante de placa y el número de **extrusores**.

Cada impresora Marlin tiene un **identificador interno fijo**. Si cambia el puerto USB o la IP del módulo WiFi, NOPAL la vuelve a encontrar sin perder su configuración, su cámara ni su historial.

## Qué puedes hacer

| Función | Detalle |
|---|---|
| **Mover** el cabezal | Ejes X/Y/Z con pasos configurables |
| **Home** | Por eje o de **TODO** |
| **Temperaturas** | Ver y fijar la temperatura objetivo del extrusor y de la cama |
| **Imprimir un archivo** | Desde la [biblioteca](./biblioteca) con **Enviar a impresora**: *impresión inmediata* |
| **Imprimir desde la tarjeta SD** | Si la impresora reporta una SD (ver abajo) |
| **Pausar, reanudar y cancelar** | Sobre el trabajo activo |
| **Consola** | Ver la respuesta de la impresora en vivo. **Enviar** comandos es solo para administradores |
| **Cámara** | Aparece en la ficha si tienes el plugin Cámaras y la vinculaste |

La ficha de la impresora Marlin es la **ficha unificada** de dispositivo, la misma forma que usan las demás máquinas.

## Imprimir desde la tarjeta SD

Esta opción solo aparece si la impresora **confirma que tiene una tarjeta SD**. Si no, NOPAL muestra *«Esta impresora no reporta una tarjeta SD conectada»*.

Al elegir **Enviar a Tarjeta SD** en el selector de **Enviar a impresora**, NOPAL **sube el archivo a la SD, precalienta la impresora y arranca la impresión por sí sola**. Así la impresión no depende de que la conexión USB siga abierta todo el rato.

## Quién puede hacer qué

| Acción | Operador | Administrador |
|---|:-:|:-:|
| Ver estado y temperaturas | ✅ | ✅ |
| Mover, *home* y fijar temperaturas | ✅ | ✅ |
| Iniciar, pausar, reanudar y cancelar | ✅ | ✅ |
| Ver la consola | ✅ | ✅ |
| **Enviar comandos** por la consola | ❌ | ✅ |
| Dar de alta o de baja, descubrir módulos MKS, probar puertos | ❌ | ✅ |

## Si algo falla

- **No se detectan puertos compatibles:** revisa el cable y que la impresora esté conectada **al servidor**. Ver [Solución de problemas](./solucion-de-problemas#puertos-usb).
- **Aparece «Conflicto»:** NOPAL no puede confirmar que el equipo en ese puerto sea el mismo. Si moviste la impresora a otro conector USB, devuélvela a su conector.
- **El módulo MKS WiFi no aparece:** usa **Agregar por IP** e indica el puerto TCP (por defecto 8080). La subida rápida propietaria a la SD de MKS **no** está soportada.
