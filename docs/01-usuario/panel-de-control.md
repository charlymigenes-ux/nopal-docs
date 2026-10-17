---
title: Panel de control
sidebar_label: Panel de control
sidebar_position: 4
audience: user
type: explanation
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
---

# Panel de control

Es la pantalla principal de NOPAL (**Inicio** en el menú, *Panel de Control* como título). Resume en tiempo real el estado de tu taller y te lleva a cada máquina.

## El menú lateral

| Grupo | Qué contiene |
|---|---|
| **Inicio** | El panel de control |
| **Dispositivos** | **Láser**, **CNC**, **Impresoras Marlin**, **Impresoras Elegoo**, **Impresoras FlashForge** e **Impresoras Bambu Lab** |
| **Biblioteca** | **Impresión 3D** (modelos) y **Archivos** (G-code). Ver [Biblioteca](./biblioteca) |
| **Trabajos** | **Historial de trabajos**. Ver [Historial](./historial-de-trabajos) |
| **Herramientas** | **Editor G-Code**, **Consola del sistema** y **NOPAL Intelligence** (esta última solo cuando un administrador activa la IA) |
| **Plugins** | La **Galería de plugins** (solo administradores) y los plugins instalados |
| Engranaje | **Configuración** |

Las impresoras **Klipper** no tienen una sección propia en el menú: se controlan desde el panel de control. Las demás familias tienen su sección en **Dispositivos**.

Las entradas **Láser** y **CNC** muestran una insignia con el número de trabajos en su cola.

## La barra superior

- **Notificaciones** (campana): ver [abajo](#notificaciones).
- **Control del sistema**: solo administradores. Ver [Control del sistema](../02-administracion/control-del-sistema).
- **Idioma**: español, inglés, portugués (Brasil), francés o alemán.
- **Menú de usuario**: tu nombre y tu rol (*Administrador* u *Operador*), y cerrar sesión.

## Resumen en tiempo real

La parte superior muestra *«Resumen en tiempo real de tu taller»* y el estado general: **Sistema activo**, **Revisar avisos** o **Atención requerida**. Debajo hay tarjetas de resumen:

| Tarjeta | Qué muestra |
|---|---|
| **Estado del sistema** | Salud, servicios activos, tiempo activo y si hay actualizaciones |
| **Rendimiento del host** | Disco y carga promedio del equipo donde corre NOPAL |
| **Red y conectividad** | Datos de red del servidor: IP local, velocidad y tráfico |
| **Dispositivos conectados** | Cuántas máquinas están conectadas |
| **Trabajos en curso** | Trabajos activos con tiempo restante y capa |
| **Alertas y notificaciones** | Recuento de alertas **críticas**, **advertencias** e **informativas** |
| **Temp. ambiente del taller** | La temperatura ambiente, si tienes un sensor (plugin Automatización de Taller); si no, «Sin sensor» |
| **Consumo actual** | Un valor **estimado** |
| **Próximo mantenimiento** | Una sugerencia basada en las alertas y trabajos actuales; «Sin datos» si no hay |
| **Acciones rápidas** y **Escenas activas** | Los rellena el plugin Automatización de Taller; sin él aparecen como huecos vacíos |

Puedes plegar el panel superior (*Colapsar panel superior*) y elegir en **Configuración → Apariencia** si queda siempre visible o se oculta hasta que pasas el ratón por la barra superior.

:::note
«Rendimiento del host» empieza vacío («Reuniendo datos…») y se llena con muestras reales mientras NOPAL está en marcha.
:::

## Tus máquinas

Debajo del resumen, la sección **Dispositivos** muestra una ficha por máquina, agrupada por tipo (impresoras 3D, láser y CNC). Pulsa una ficha para abrir sus controles.

El punto de color de cada ficha indica su estado:

| Estado | Significa |
|---|---|
| **Inactivo** | Conectada, sin trabajo |
| **Imprimiendo** | Tiene un trabajo en curso |
| **Pausado** | El trabajo está en pausa |
| **Sin conexión** | NOPAL no puede comunicarse con ella |

Una máquina también puede aparecer en **Conflicto**: NOPAL no puede confirmar que el equipo en ese puerto o esa IP sea el mismo (por ejemplo, otra placa ocupó su puerto). Pasa el cursor sobre la etiqueta para ver la causa. NOPAL **nunca reasigna** una máquina por su cuenta.

### Personalizar la vista

En la barra de **Dispositivos** hay tres opciones:

- **Organizar dispositivos**: elige qué tipos de máquina ves (impresoras 3D, láser, CNC) y arrástralos para cambiar su orden. Debe quedar al menos un tipo visible.
- **Organizar tarjeta de impresora**: cambia el orden de las cuatro secciones de cada ficha (encabezado, estado, miniatura y temperaturas). No se pueden ocultar.
- **Modo grupo**: agrupa los dispositivos por tipo de máquina.

Si apagas **Ver máquinas sin conexión** (en **Configuración → General**), el panel solo muestra las impresoras y láseres conectados.

## Notificaciones

La campana avisa de cosas que requieren tu atención. Cada aviso tiene una gravedad: **crítica**, **advertencia** o **informativa**. Entre otras, NOPAL avisa de:

- Máquinas desconectadas y trabajos con error o en pausa.
- **Alarmas** de láser y CNC (finales de carrera, puerta abierta): la máquina responde, pero necesita atención física.
- Accesorios que no responden y accesorios de extracción apagados (plugin Automatización de Taller).
- **Movimiento detectado** en una cámara (plugin Cámaras), durante los últimos cinco minutos.
- Actualizaciones de NOPAL disponibles.

Las alertas críticas pueden abrir un aviso de **Atención requerida**. Puedes **descartar** un aviso para dejar de verlo mientras siga igual.

Con **Alertas sonoras** (en **Configuración → General**), NOPAL reproduce un sonido y muestra una notificación cuando un trabajo termina o falla, o cuando un dispositivo se conecta o desconecta.

## Quién puede hacer qué

Todos los usuarios ven el panel y el estado de las máquinas. El **Control del sistema**, la **Galería de plugins** y varias tarjetas de **Configuración** solo las ven los administradores. Ver [Usuarios y roles](../02-administracion/usuarios-y-roles).
