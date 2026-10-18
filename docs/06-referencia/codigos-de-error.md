---
title: Códigos de error
sidebar_label: Códigos de error
sidebar_position: 5
audience: reference
type: reference
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
---

# Códigos de error

Cuando una petición a la API de NOPAL falla, la respuesta lleva un **código HTTP** y un cuerpo JSON con el motivo. Esta página explica cada código, con los mensajes reales que devuelve el core y qué hacer.

## Forma de la respuesta

```json
{ "detail": "Permiso insuficiente" }
```

- `detail` es un texto legible. La interfaz lo muestra tal cual en un aviso.
- Los mensajes del servidor están **siempre en español**, sea cual sea el idioma de la interfaz.
- Algunos errores añaden un campo hermano sin cambiar `detail`:

| Campo extra | Dónde | Para qué |
|---|---|---|
| `error_code` | Al dar de alta una impresora de red | Un código estable (ver [más abajo](#códigos-de-alta-de-impresoras)) con el que el asistente guiado redacta su mensaje |
| `retry_after` | Respuestas `502` de NOPAL Intelligence | Segundos que el proveedor de IA pide esperar antes de reintentar. La interfaz muestra la cuenta atrás |

- Los errores de validación que genera el propio framework (parámetros que faltan o con un tipo equivocado) responden `422` con `detail` como **lista** de objetos, no como texto.

## Códigos HTTP

| Código | Significa | Ejemplos de `detail` | Qué hacer |
|---|---|---|---|
| **400** | La petición es incorrecta: un dato no es válido | *«Ruta inválida»*, *«Nombre de archivo inválido»*, *«IP inválida»*, *«Tipo no válido»*, *«Formato no válido (xml o pdf)»*, *«Todavía no hay un servidor de IA configurado»* | Corrige el dato indicado. En el alta de una impresora de red, mira el `error_code` |
| **401** | No hay sesión o no es válida | *«No autenticado»*, *«Sesión inválida»*, *«Usuario o contraseña incorrectos»* | Vuelve a iniciar sesión |
| **403** | Hay sesión, pero tu rol no basta | *«Permiso insuficiente»*, *«Las acciones de la IA están desactivadas»* | Pide la acción a un administrador. Ver [Roles por acción](./roles-por-accion) |
| **404** | Lo que pides no existe | *«Archivo no encontrado»*, *«Carpeta no encontrada»*, *«El plugin no está instalado»*, *«Usuario no encontrado»*, *«Elemento no encontrado en la cola»* | Actualiza la lista: puede que alguien lo haya borrado o movido |
| **409** | Conflicto con el estado actual de la máquina o de los datos | *«No se pudo pausar / reanudar / cancelar la impresión»*, *«Ya hay un trabajo en curso en este láser»*, *«La placa no tiene una tarjeta SD lista»*, *«La carpeta ya existe»*, *«Actualización bloqueada: hay trabajos activos…»* | Espera a que termine el trabajo o cambia lo que choca. Para actualizar NOPAL, detén antes las máquinas |
| **413** | Un archivo es demasiado grande | *«La imagen pesa más de 15 MB»* | Usa un archivo más pequeño. Es el límite de «Imagen a dibujo» |
| **422** | La petición es correcta pero no se puede procesar | *«Ese archivo no tiene ningún movimiento de corte, no hay nada que encuadrar»*, o una lista de errores de validación | Revisa el archivo o los parámetros |
| **429** | Demasiados intentos | *«Demasiados intentos; vuelve a intentarlo en unos minutos»* | Es el límite de inicio de sesión: 5 fallos en 5 minutos. Espera. Ver [Seguridad](../02-administracion/seguridad) |
| **500** | Fallo inesperado del servidor | *«No se pudo guardar la configuración…»*, *«No se pudo leer el estado de git»*, *«Este plugin no tiene un repositorio configurado»* | Mira los [registros](../02-administracion/registros) y, si persiste, abre un *issue* con el mensaje |
| **501** | Función no disponible | *«Los plugins pagos todavía no están disponibles (falta el servidor de licencias)»* | No hay solución: los plugins de pago no se pueden instalar |
| **502** | NOPAL no pudo hablar con la máquina o con un servicio externo | *«No se pudo enviar el comando»*, *«No se pudo mover el eje»*, *«No se pudo iniciar el home»*, *«No se pudo contactar al láser»*, *«No se detectó respuesta GRBL en este puerto»*, o un error del proveedor de IA | Comprueba que la máquina está encendida, conectada y en la misma red. Ver [Solución de problemas](../01-usuario/solucion-de-problemas) |
| **503** | NOPAL Intelligence no está disponible | Un mensaje claro de que la IA está apagada | Un administrador debe [activarla y configurar un servidor](../01-usuario/nopal-intelligence) |

:::note 409 y 502, la diferencia
Un **409** indica que la orden no se pudo aplicar al estado actual (por ejemplo, pausar algo que no está imprimiendo). NOPAL no siempre distingue ese caso de un fallo de comunicación con la máquina. Un **502** indica que falló la comunicación al ejecutar un comando sobre la máquina o un servicio externo.
:::

## Códigos de alta de impresoras

Al dar de alta una impresora de red (Marlin por WiFi, Bambu Lab, Elegoo o FlashForge), un fallo responde `400` con `detail` y un `error_code`:

| `error_code` | Cuándo | Qué hacer |
|---|---|---|
| `IP_INVALID` | La dirección no es válida | Revisa la IP o el nombre de equipo |
| `CREDENTIAL_REJECTED` | La impresora rechazó las credenciales | Comprueba el código de acceso, el *check code* o los datos de la impresora |
| `SERVICE_REFUSED` | La impresora rechazó la conexión al servicio | Comprueba que el servicio de red de la impresora esté habilitado |
| `CONNECTION_FAILED` | No hubo conexión | Comprueba que la impresora está encendida y en la misma red que NOPAL |
| `PROTOCOL_INVALID` | La respuesta no tiene el formato esperado | Verifica que la dirección corresponde a una impresora de esa marca |
| `UNKNOWN` | Cualquier otro caso | Mira los registros |

NOPAL no distingue «puerto bloqueado» de «equipo apagado»: producen el mismo tiempo de espera y no se pueden separar sin inventar una señal.

Para más detalle, ver [Conectar tu primera máquina](../01-usuario/conectar-primera-maquina).

## Fuente

Los códigos y mensajes salen de las excepciones del core (`HTTPException`) y de `backend/errors.py`. Una ruta concreta puede devolver además códigos propios: consulta la [API REST del core](./api-rest-core).
