---
title: Roles por acción
sidebar_label: Roles por acción
sidebar_position: 3
audience: reference
type: reference
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
---

# Roles por acción

NOPAL tiene dos roles: **operador** y **administrador**. La política de autorización (decisión ADR-006) define, para cada acción, el rol mínimo que se necesita. El administrador puede hacer todo lo que puede el operador.

:::caution La política aún no se aplica en todas las rutas
Las rutas ya migradas consultan esta política. Otras comprueban solo que haya una sesión o el rol directamente. Para ver cuál es el caso de cada ruta, consulta la [API REST del core](./api-rest-core), que indica el acceso de cada una. Un ejemplo conocido: borrar un archivo de la tarjeta SD de un láser, que la política reserva al administrador, hoy solo exige sesión.
:::

## Acciones de las máquinas

| Acción | Operador | Administrador |
|---|:-:|:-:|
| Ver el estado | ✅ | ✅ |
| Iniciar, pausar, reanudar y cancelar un trabajo | ✅ | ✅ |
| Home y mover el cabezal | ✅ | ✅ |
| Extruir | ✅ | ✅ |
| Temperatura objetivo, ventilador, factor de velocidad y de flujo | ✅ | ✅ |
| Z-Offset, asistencia de aire y refrigerante | ✅ | ✅ |
| Cero de trabajo | ✅ | ✅ |
| Asignar el carrete activo | ✅ | ✅ |
| **Enviar un comando de consola** | ❌ | ✅ |
| **Ejecutar un macro** | ❌ | ✅ |
| **Potencia del láser** y **husillo** | ❌ | ✅ |
| **Configuración de la impresora** (`printer.cfg`) | ❌ | ✅ |
| **Parámetros GRBL** (`$$`) | ❌ | ✅ |
| **Reiniciar el firmware** | ❌ | ✅ |
| **Reiniciar Klipper** | ❌ | ✅ |

## Biblioteca y tarjeta SD

| Acción | Operador | Administrador |
|---|:-:|:-:|
| Eliminar un archivo de la biblioteca | ✅ | ✅ |
| Eliminar una carpeta de la biblioteca | ✅ | ✅ |
| Eliminar un archivo de la tarjeta SD | ❌ | ✅ |

## Plugins

| Acción | Operador | Administrador |
|---|:-:|:-:|
| Usar un plugin | ✅ | ✅ |
| Configurar un plugin | ❌ | ✅ |

## Registros e IA

| Acción | Operador | Administrador |
|---|:-:|:-:|
| Leer los registros | ✅ | ✅ |
| Usar NOPAL Intelligence | ✅ | ✅ |
| **Configurar** NOPAL Intelligence | ❌ | ✅ |
| Leer, renombrar y borrar **una conversación** | Solo las suyas | Solo las suyas |
| **Borrar todas las conversaciones** (liberar espacio) | ❌ | ✅ |

Las conversaciones son privadas: ni siquiera un administrador puede leer las de otro usuario. El administrador solo puede borrarlas todas para liberar almacenamiento.

## Administración

| Acción | Operador | Administrador |
|---|:-:|:-:|
| Gestionar usuarios | ❌ | ✅ |
| Actualizar NOPAL | ❌ | ✅ |
| Control del sistema (servicios, reinicio, apagado) | ❌ | ✅ |
| Exportar un respaldo | ❌ | ✅ |
| Importar un respaldo | ❌ | ✅ |

Para la explicación desde el punto de vista de quien usa NOPAL, ver [Usuarios y roles](../02-administracion/usuarios-y-roles).
