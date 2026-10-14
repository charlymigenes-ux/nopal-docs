---
title: Galería de plugins
sidebar_label: Galería de plugins
sidebar_position: 13
audience: user
type: how-to
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
---

# Galería de plugins

Los plugins amplían NOPAL con funciones nuevas. Aparecen en el menú lateral, en **Plugins**, una vez instalados. La **Galería** es la pantalla desde la que se instalan, actualizan y quitan.

:::warning Solo administradores
La Galería **no aparece** para el rol de operador, y las acciones de instalar, actualizar y desinstalar requieren el rol de **administrador**. Un operador sí ve en el menú los plugins ya instalados.
:::

## Instalar un plugin

1. Entra en **Plugins → Galería**.
2. Pulsa instalar en el plugin que quieras. NOPAL lo descarga (clona su repositorio) en `plugins/<id>/`.
3. La parte visual (frontend) se carga **de inmediato**.
4. Si el plugin tiene parte de servidor (backend), **reinicia NOPAL** para activarla: los plugins se cargan al arrancar. El aviso en pantalla no lo menciona. Consulta [Control del sistema](../02-administracion/control-del-sistema).

Si el plugin necesita una versión de Python que tu equipo no cumple, NOPAL lo rechaza con un error.

## Actualizar

Pulsa actualizar en el plugin. Si solo cambió el frontend, la pantalla se recarga. Si cambió también el backend, NOPAL muestra un aviso: reinicia para aplicar los cambios.

## Desinstalar

NOPAL pide confirmación y elimina la carpeta `plugins/<id>/` y su entrada en el registro de instalados.

:::caution Los datos del plugin pueden quedar
Aunque el mensaje de confirmación habla de eliminar «su registro y configuración local», el código solo borra la carpeta del plugin y su entrada en `installed.json`. Los archivos de estado que el plugin haya guardado en la carpeta de NOPAL **no se borran**.
:::

## Plugins de pago y «próximamente»

- Los plugins de pago se rechazan al instalar (la API responde 501): no están disponibles.
- Algunas entradas, como `gcode-optimizer` y `material-library`, aparecen marcadas como *Próximamente* y no se pueden instalar.

## Más información

- Qué hace cada plugin: [Plugins](../03-plugins/).
- Cómo funciona por dentro: [Instalación y galería](../05-desarrolladores/plugins-instalacion-y-galeria).
