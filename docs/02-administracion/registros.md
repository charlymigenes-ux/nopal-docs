---
title: Registros
sidebar_label: Registros
sidebar_position: 5
audience: admin
type: how-to
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
---

# Registros

NOPAL escribe un registro persistente de lo que ocurre: conexiones, trabajos y errores.

## Dónde están

| Dónde | Qué contiene |
|---|---|
| `logs/nopal.log` (dentro de la carpeta de NOPAL) | El registro de la aplicación |
| `journalctl -u nopal -f` | La salida del servicio, incluida la copia a consola |

Por defecto el archivo rota al llegar a **5 MB** y se conservan **5 copias** (`nopal.log.1` … `nopal.log.5`). El formato de línea es fecha, nivel, componente y mensaje.

## Verlos en la interfaz

**Configuración → Logs del sistema → Ver logs.** Permite:

- Filtrar por **componente**, **nivel** o **texto**.
- Consultar archivos rotados anteriores.
- Pausar la vista para leer con calma.

Los operadores también pueden ver los logs; solo los administradores pueden cambiar su configuración.

## Niveles

En **Configuración → Registro** eliges un **nivel general**:

| Nivel | Qué registra |
|---|---|
| Básico | Solo avisos y errores |
| Normal (recomendado) | Información, avisos y errores |
| Detallado | Información en general, y depuración solo para NOPAL y sus plugins |
| Diagnóstico | Depuración de todo, librerías incluidas |

Además puedes ajustar **componentes concretos** (por ejemplo, un plugin en "solo errores") y la lista técnica de fuentes con los estados normal, avisos, errores o silenciado. La configuración se guarda en `logging_config.json`.

## Diagnosticar un problema

1. Sube temporalmente el nivel a **Detallado** o **Diagnóstico**.
2. Reproduce el problema.
3. Revisa los logs filtrando por el componente que sospeches.
4. **Vuelve a Normal** al terminar: los niveles altos escriben mucho.

:::tip
Los problemas al cargar un plugin aparecen como avisos con el id del plugin entre corchetes, por ejemplo `[matriz-led] no se pudo cargar el backend del plugin`. Un plugin roto no impide que NOPAL arranque.
:::
