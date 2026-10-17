---
title: Variables de entorno y línea de comandos
sidebar_label: Variables y comandos
sidebar_position: 4
audience: reference
type: reference
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
---

# Variables de entorno y línea de comandos

## Variables de entorno

| Variable | Dónde se usa | Qué hace | Por omisión |
|---|---|---|---|
| `NOPAL_PORT` | `install.sh` | Puerto del servicio que crea el instalador | `8420` |
| `NOPAL_KLIPPER_PORTS` | El servidor | Puertos adicionales de Moonraker, separados por comas. Un valor no válido o fuera de rango se ignora con un aviso en el log | Ninguno (se buscan 7125 a 7127) |
| `NOPAL_PLUGIN_DATA_DIR` | El servidor | Carpeta donde se guardan los datos de los plugins y `installed.json` | `data/plugins` |
| `NOPAL_CORE_ROOT` | Pruebas de plugins | Ruta al checkout del core, necesaria para ejecutar las pruebas de un plugin con el cargador real | Obligatoria en las pruebas |

### NOPAL Intelligence

Estas variables **pisan** lo guardado en `ai_config.json`. Un valor inválido se ignora con un aviso en el log.

| Variable | Ajuste | Por omisión |
|---|---|---|
| `NOPAL_AI_ENABLED` | Activa la capa de IA | `false` |
| `NOPAL_AI_PROVIDER` | Tipo de proveedor | `openai-compatible` |
| `NOPAL_AI_BASE_URL` | Dirección del servidor, terminada en `/v1` | Vacía |
| `NOPAL_AI_MODEL` | Modelo | Vacío |
| `NOPAL_AI_API_KEY` | Clave de API | Vacía |
| `NOPAL_AI_TIMEOUT` | Tiempo máximo de espera, en segundos | `60` |
| `NOPAL_AI_MAX_TOKENS` | Longitud máxima de la respuesta | `512` |
| `NOPAL_AI_TEMPERATURE` | Temperatura de muestreo | `0.2` |
| `NOPAL_AI_TOOL_MODE` | `native`, `context` o `auto`: cómo se le dan las herramientas al modelo | `auto` |
| `NOPAL_AI_TOOL_PROFILE` | Perfil de herramientas | `full` |
| `NOPAL_AI_MODEL_MODE` | `fixed` (un modelo) o `auto` (elige según la pregunta) | `fixed` |
| `NOPAL_AI_ACTIONS_ENABLED` | Permite que la IA actúe | `false` |
| `NOPAL_AI_MAX_TOOL_ITERATIONS` | Tope de llamadas a herramientas por pregunta | `4` |
| `NOPAL_AI_ALLOW_PUBLIC_ENDPOINT` | Permite un servidor público | `false` |

`NOPAL_AI_MODEL_MODE=fixed` sirve en instalaciones sin pantalla para forzar un modelo único. Ver [NOPAL Intelligence](../01-usuario/nopal-intelligence).

## Comandos

### Instalar, actualizar y quitar

| Comando | Qué hace |
|---|---|
| `./install.sh` | Instala NOPAL como servicio. Ver [Instalación](../02-administracion/instalacion) |
| `./uninstall.sh` | Quita el servicio y el entorno virtual y **conserva tus datos** |
| `./uninstall.sh --purgar` | Además borra la biblioteca, los registros y las credenciales |
| `./uninstall.sh --dry-run` | Solo muestra qué haría |
| `./uninstall.sh --si` | No pregunta. Exige `--purgar` aparte para borrar datos |

Ver [Actualizar y desinstalar](../02-administracion/actualizar-y-desinstalar).

### Arrancar a mano

```bash
.venv/bin/uvicorn backend.main:app --host 0.0.0.0 --port 8420
```

### Scripts de `scripts/`

| Script | Para qué sirve |
|---|---|
| `migrate_machine_identity.py` | Migración única a la identidad estable de máquinas. Simula por omisión; `--apply` escribe y `--esp420` consulta el Chip ID. Ver [Identidad de máquinas](../02-administracion/identidad-de-maquinas) |
| `generate_i18n.py` | Genera los idiomas portugués (Brasil), francés y alemán a partir del catálogo en inglés. Es una herramienta de desarrollo: NOPAL no traduce en tiempo de ejecución |
| `check_plugins_compat.py` | Comprueba que los plugins del catálogo funcionan con la versión de Python que lo ejecuta. Lo usa la integración continua |

### Pruebas

```bash
pytest
```

Ejecuta las pruebas del core. Para un plugin: `NOPAL_CORE_ROOT=/ruta/al/core pytest plugins/<id>/tests`. Ver [Entorno y pruebas](../05-desarrolladores/entorno-y-pruebas).
