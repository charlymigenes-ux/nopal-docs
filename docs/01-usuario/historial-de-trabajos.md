---
title: Historial de trabajos
sidebar_label: Historial de trabajos
sidebar_position: 12
audience: user
type: explanation
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
---

# Historial de trabajos

Está en **Trabajos → Historial de trabajos**. Reúne en una sola lista los trabajos de **impresión 3D, láser y CNC**, con el estado y los archivos de cada uno.

## Qué muestra

- **Trabajos recientes**: la lista unificada, del más reciente al más antiguo.
- **Resumen por tipo**: cuántos trabajos hay de cada tipo (3D, láser, CNC) con los filtros vigentes.
- **Estado actual** de tus máquinas, **Trabajos en cola** y **Acciones rápidas** (*Nuevo 3D*, *Nuevo Láser*, *Nuevo CNC*).

### Filtros y paginación

| Control | Opciones |
|---|---|
| Tipo de trabajo | **Todos**, 3D, láser o CNC |
| Periodo | Últimos 7, 30 (por defecto) o 90 días, o **Todo el historial** |
| Búsqueda | Por nombre de archivo |
| Paginación | 8 (por defecto), 12, 16, 24 o 48 trabajos por página |

Si no hay trabajos verás *«Aún no hay trabajos en el historial»*; si los filtros no encuentran ninguno, *«Ningún trabajo coincide con los filtros»*.

### Estados

Cada trabajo se muestra como **Completado**, **Cancelado**, **Error**, **Incompleto**, **En curso** o **Enviado · resultado desconocido**.

- *Enviado · resultado desconocido* es un trabajo que NOPAL mandó a una impresora y del que no consta cómo terminó.
- Si NOPAL se detiene mientras un trabajo láser o CNC está en curso, al volver a arrancar ese trabajo pasa a **Incompleto**: ningún trabajo enviado queda sin cerrar.

## Quién envió cada trabajo

Todo trabajo que NOPAL manda queda registrado con **el usuario que lo envió** (campo *Enviado por*). Las impresiones 3D que arrancó otra herramienta, como Mainsail o la pantalla de la impresora, vienen del historial de la propia máquina y **no traen usuario**.

:::note Solo Klipper trae historial propio
Las impresoras Klipper aparecen con todos sus trabajos, porque NOPAL los lee del historial de Moonraker. Marlin, Bambu Lab, Elegoo y FlashForge no tienen historial propio: solo aparecen los trabajos enviados desde NOPAL, como *Enviado · resultado desconocido*.
:::

## Reimprimir

Desde un trabajo puedes **Reimprimir**: eliges la máquina donde ejecutarlo (se indica si está *sin conexión* u *ocupada*) y NOPAL envía el archivo.

- El archivo debe seguir en la [Biblioteca](./biblioteca): si no, verás *«El archivo ya no está en la Biblioteca»*.
- Un trabajo **en curso** no se puede reimprimir.

## Exportar un resumen

**Exportar resumen** descarga la lista con los **filtros vigentes** en **PDF** o **XML**.

## Eliminar un trabajo del historial

Solo un **administrador** puede eliminar, y con reglas estrictas:

- Solo se eliminan trabajos **fallidos o incompletos** (error, cancelado, incompleto). Los **completados no se eliminan**, ni siquiera un administrador.
- Hay que escribir un **motivo** de 3 a 300 caracteres.
- «Eliminar» es una **baja de control**: el trabajo deja de mostrarse, pero queda en el **Registro de control** con quién lo eliminó, cuándo, por qué y una copia de sus datos. NOPAL nunca borra ese registro ni toca el historial propio de la máquina.

## Dónde se guarda

| Archivo | Contenido | Límite |
|---|---|---|
| `laser_history.json` | Trabajos de láser y CNC | 1000 entradas |
| `job_print_log.json` | Impresiones 3D enviadas desde NOPAL | 2000 entradas |
| `job_deletions.json` | El Registro de control | No se recorta |

Están en la carpeta de NOPAL y **no forman parte** de los [respaldos de configuración](../02-administracion/respaldos).

## Quién puede hacer qué

| Acción | Operador | Administrador |
|---|:-:|:-:|
| Ver, filtrar y exportar el historial | ✅ | ✅ |
| Reimprimir | ✅ | ✅ |
| Eliminar un trabajo fallido o incompleto | ❌ | ✅ |
| Ver el Registro de control | ❌ | ✅ |
