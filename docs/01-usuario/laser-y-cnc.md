---
title: Láser y CNC
sidebar_label: Láser y CNC
sidebar_position: 8
audience: user
type: how-to
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
---

# Láser y CNC

NOPAL controla láseres y CNC con **GRBL** (incluidas placas **ESP3D** y **FluidNC**), por **red (WiFi)** o por **USB**. Puedes tener **varias máquinas a la vez**: cada una es independiente, con su propia conexión, su cola y su estado. Tienen dos secciones en **Dispositivos**: **Láser** y **CNC**.

El alta de una máquina es tarea de un administrador. Ver [Conectar tu primera máquina](./conectar-primera-maquina#láser-y-cnc).

:::note Cada petición va a una máquina concreta
Desde octubre de 2026 NOPAL ya no guarda un «láser activo» compartido por todas las sesiones: cada acción indica a qué máquina va. El panel recuerda la máquina que elegiste en cada sección, **en tu navegador**. Ver [Migración](/08-proyecto/migracion#láser-sin-host-activo-global).
:::

## Láser

### Conexión

La tarjeta **Conexión** muestra a qué máquina estás conectado y cómo: **Conexión USB** o **Conexión de red (WiFi)**. Si no hay conexión verás *«Sin conexión con el láser»*.

### Mover el cabezal

En **Movimiento del cabezal** mueves el cabezal con flechas y eliges el **paso** en milímetros.

- **Origen ($H)**: lleva el cabezal a los interruptores de límite (*home*). Por seguridad, NOPAL puede **pedir confirmación** antes de hacerlo; se activa en **Configuración → General** con *Confirmar antes de hacer Home*.
- **Desbloquear ($X)**: libera la máquina de un estado de alarma.
- **Aire asistido**: enciéndelo o apágalo.

### Trabajos

- **Enmarcar trabajo**: recorre el contorno del trabajo sin cortar, para comprobar dónde va a quedar. Si no hay copia local del archivo, no se puede enmarcar.
- Mientras corre un trabajo, NOPAL muestra el **tiempo transcurrido**, el **tiempo restante** y las **líneas procesadas**, además del avance y la potencia.
- Al terminar o fallar, NOPAL te avisa (*«Trabajo láser completado»* o *«Error en el trabajo láser»*).
- Puedes **pausar**, **reanudar** y **cancelar** el trabajo.

### Cola del láser

En la [biblioteca](./biblioteca) pulsa **Enviar a láser** para añadir un archivo a la **Cola del láser**. Desde la cola puedes **Enviar ahora** un trabajo o **Quitarlo**. La entrada **Láser** del menú muestra una insignia con el número de trabajos en cola.

### Tarjeta SD

Si la placa tiene tarjeta SD, la tarjeta **Tarjeta SD** te deja:

- **Enviar desde biblioteca**: elige uno o varios archivos de la biblioteca y súbelos a la SD sin sacar la tarjeta.
- **Importar archivos** desde tu equipo, **Sincronizar** la lista y crear una **Nueva carpeta**.
- **Buscar**, **ordenar** (nombre, tamaño) y filtrar por tipo de archivo; ver el espacio usado.
- **Imprimir** (ejecutar) un archivo desde la SD.
- **Eliminar** archivos o carpetas.
- **Formatear SD**: borra **todo** el contenido de la tarjeta y **no se puede deshacer**. NOPAL te pide escribir `FORMATEAR` en mayúsculas para confirmar (la palabra depende del idioma de la interfaz; en inglés es `FORMAT`). Es **solo para administradores**, y NOPAL avisa de que este comando no está confirmado contra todos los firmwares.

NOPAL sigue el avance de un archivo que se está ejecutando desde la SD aunque lo hayas iniciado **fuera de NOPAL**.

### Consola y parámetros GRBL

- **Consola Láser**: muestra la respuesta de la placa en vivo. **Enviar** comandos GRBL es solo para administradores.
- **Configuración GRBL**: abre los parámetros `$$` de la placa, con su descripción, y guarda un valor al pulsar Enter. Es **solo para administradores**. Anota los valores originales antes de cambiar ninguno: un cambio equivocado puede afectar la precisión del corte o dañar el motor.

## CNC

La sección **CNC** usa la misma conexión y las mismas rutas que el láser, con un panel pensado para fresado y trazado:

| Bloque | Qué ofrece |
|---|---|
| **Estado** | Posición de trabajo y de máquina, *feed*, RPM del husillo, desbloqueo y **Reset** |
| **Trabajo** | Correr, **Detener**, **Estacionar**, **Probe**, *overrides* de avance y **Origen de Shift** |
| **Ceros** | **Cero aquí (XY)** y **Z=0 aquí**. NOPAL te pide confirmar que la punta toca la pieza |
| **Jog** | Mover X/Y/Z con distintos pasos y velocidades |
| **Visor** | Tres pestañas: **VISOR** (vista previa de la trayectoria con el área de trabajo; lo que queda fuera se marca en rojo), **SIMULATION** (reproduce el trayecto con velocidad, pausa y reinicio, y muestra líneas, distancia dibujada, traslado y tiempo) y **3D VIEW** (marcada *Próximamente*) |
| **Archivos** | Subir o elegir el G-code (`.nc`, etc.) que vas a mecanizar |

- **Modo del panel CNC** (en **Configuración → General**): **Simple** muestra solo lo esencial; **Avanzado** añade *overrides*, coordenadas de trabajo, pines y perfiles.
- **Perfil**: **Router / Fresadora** o **Plotter (lápiz/marcador)**.
- **Husillo**: encender, apagar y fijar las RPM.

### Correr desde la SD de la placa

Si la placa tiene tarjeta SD, el bloque **Trabajo** ofrece el interruptor **Correr desde la SD de la placa (recomendado)**. El trabajo se sube a la SD y corre **dentro de la placa**, así que no se corta si el WiFi falla. A cambio, **no permite ajustar el Z en vivo**. Sin tarjeta, el trabajo se envía línea por línea por WiFi y puede fallar si la conexión se interrumpe.

### Avisos del trabajo

Al terminar un trabajo CNC, NOPAL lo avisa. Si se detiene con un error, indica el archivo, la **línea** en que se detuvo y el motivo traducido del código de GRBL (por ejemplo, *«el movimiento se sale del área de trabajo permitida»* o *«la máquina está en alarma o bloqueada»*). Mientras corre, la tarjeta muestra *«Línea N de M»*.

### Imagen a dibujo (plotter)

El botón **Imagen a dibujo**, en el bloque **Archivos**, convierte una imagen (PNG, JPG, BMP o GIF, hasta 15 MB) en un G-code de trazos para el plotter:

- Funciona mejor con **dibujos de líneas** (mandalas, contornos, logos en blanco y negro). Si la imagen parece una fotografía, NOPAL avisa.
- Eliges el **ancho y el alto** en mm. NOPAL compara con el área de trabajo y, si el dibujo no cabe, exige que marques que lo entiendes antes de generarlo.
- Configuras el lápiz (**Z arriba**, **Z abajo**) y las velocidades de dibujo, bajada y traslado, y puedes afinar la suavidad, la limpieza de detalles y la precisión.
- Ves la vista previa (**Trazo**, **Superpuesto** u **Original**) con las estadísticas: trazos, distancia, traslado y tiempo estimado.
- **Generar dibujo** lo guarda en la [Biblioteca](./biblioteca).

Mientras un trabajo de plotter corre por WiFi, puedes **subir o bajar el lápiz** (de −1 a +1 mm por ajuste; negativo = más presión) para los trazos que faltan. Con un trabajo desde la SD no se puede.

Dos asistentes te guían:

- **Asistente de configuración**: dónde va el punto cero (esquina de X/Y y origen de Z), la altura máxima de Z y el tipo de trabajo (tallado, grabado, corte, pintura o dibujo).
- **Guía para dibujar** (para un plotter): elegir un diseño, posicionar el origen, **confirmar que cabe en el área de trabajo** y empezar.

## Placas con firmware Marlin

Un láser o CNC también puede darse de alta con firmware **Marlin** en vez de GRBL. La vista funciona igual, pero los parámetros `$$` son **solo para GRBL**.

## Si cambia el puerto USB o la IP

Cada láser o CNC tiene un **identificador interno fijo**. Si cambia el puerto USB o la IP, NOPAL lo reencuentra por su ubicación USB o su dirección MAC, sin perder su configuración, su cámara ni su historial.

## Quién puede hacer qué

| Acción | Operador | Administrador |
|---|:-:|:-:|
| Ver estado, mover el cabezal, *home*, desbloquear | ✅ | ✅ |
| Poner ceros de trabajo y ajustar *overrides* | ✅ | ✅ |
| Iniciar, pausar, reanudar y cancelar un trabajo; enmarcar | ✅ | ✅ |
| Usar la cola y la tarjeta SD (subir, ejecutar, eliminar) | ✅ | ✅ |
| **Encender el láser o el husillo y fijar su potencia o RPM** | ❌ | ✅ |
| **Enviar comandos** por la consola | ❌ | ✅ |
| Parámetros GRBL (`$$`) | ❌ | ✅ |
| Formatear la SD | ❌ | ✅ |
| Escanear la red, probar puertos USB, dar de alta y de baja | ❌ | ✅ |

:::note Eliminar archivos de la SD
La política de permisos prevé que eliminar archivos de la SD sea **solo para administradores**, pero hoy **cualquier usuario con sesión puede hacerlo**. Es una de las rutas pendientes de migrar. Ver [Usuarios y roles](../02-administracion/usuarios-y-roles).
:::

## Si algo falla

- **No se detectan controladoras láser por USB**, o *«No se detectó respuesta GRBL en este puerto»*: revisa el cable, que la placa tenga GRBL o FluidNC y los permisos del puerto. Ver [Solución de problemas](./solucion-de-problemas#puertos-usb).
- **Mi láser está en otra subred:** el escaneo no la ve. Usa **Buscar por IP**.
- **Una alarma de la máquina** (finales de carrera, puerta abierta) aparece como alerta en el [panel](./panel-de-control#notificaciones).
