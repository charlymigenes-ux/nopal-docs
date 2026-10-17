---
title: Historial de cambios
sidebar_label: Historial de cambios
audience: reference
type: reference
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
generated: true
sidebar_position: 2
---

# Historial de cambios

:::note
Página **generada** desde el historial de git de `nopal`. No la edites a mano.
:::

Agrupa los mensajes de commit (248 cambios, hasta `a5853dc`, 2026-10-17) por versión y tipo. **No es un changelog curado**: los textos son los de los commits, en el idioma en que se escribieron. NOPAL aún no publica versiones etiquetadas (ver [versionado](./versionado-y-soporte.md)).

Se omiten 11 cambios de componentes cuya documentación está diferida.

## 1.2.0-alpha.1 — Sin publicar (2026-07-15 → 2026-10-17, 221)

### Añadido (105)

**ai**

- show_panel_message action for the FK-8Wa LED panel (`da6da81`, 2026-10-11)
- las preguntas de material suben al nivel medio, no solo el catálogo (`d9ba0ac`, 2026-08-13)
- nueva acción assign_spool para cambiar el material asignado (`068ed4e`, 2026-08-13)
- interfaz del historial y botón de confirmar acciones (`083315a`, 2026-08-12)
- acciones sobre el taller, en un registro separado y con candados (`7afc331`, 2026-08-12)
- la IA ve la biblioteca y las colas de impresión (`e3c5b5f`, 2026-08-12)
- historial de conversaciones con CRUD y memoria de contexto (`1d1db5f`, 2026-08-12)
- preguntas rápidas editables (`36d9bb8`, 2026-08-12)
- la capa de IA ve los plugins y sus dispositivos (`3f4879b`, 2026-08-12)

**auth**

- hide admin settings from operators and make discovery admin-only (`4a0ebc5`, 2026-10-07)
- stable machine identity (`e7629a3`, 2026-10-04)
- enforce authorization for AI actions and plugin tools (`fca61d7`, 2026-10-03)
- enforce GRBL command permissions (`98c960e`, 2026-10-03)
- enforce GRBL console and settings (`19de19f`, 2026-10-03)
- restrict Marlin console to admin (`52b4d5e`, 2026-10-03)
- enforce Klipper firmware restart (`d71a43a`, 2026-10-03)
- protect Klipper config and restart (`c9ac8a3`, 2026-10-03)
- enforce Klipper temperature and console permissions (`5b59e1d`, 2026-10-03)
- enforce Marlin SD start jobs (`2bc5cc1`, 2026-10-03)
- enforce Marlin safe operations (`5be6ba0`, 2026-10-03)
- enforce Marlin home (`0dba6f2`, 2026-10-03)
- enforce Marlin start job (`6963d8c`, 2026-10-03)
- enforce Marlin job control (`8d4a05e`, 2026-10-03)
- add authorization policy enforcement (`cc851ef`, 2026-10-03)
- harden authorization policy (`142e709`, 2026-10-03)

**cnc**

- correr desde la SD de la placa (`2a6a643`, 2026-10-13)
- vectorizado de line art, visor con área real, simulación y ajuste de Z en vivo (`6489c11`, 2026-10-13)
- imagen a dibujo para plotter, progreso/errores del trabajo y barra lateral (`39791e9`, 2026-10-12)

**dashboard**

- las fichas de temperatura/consumo/mantenimiento solo se ven con datos reales (`3f46cf8`, 2026-08-14)

**editor**

- visor G-code 2D como pestaña del Editor G-Code (`f47aa17`, 2026-09-03)

**firmware**

- Nopal_FF reemplaza el sensor T/H analógico por DHT11 (`b32741b`, 2026-08-14)
- buzzer pasivo, 3 tiras NeoPixel y sensor T/H analógico en Nopal_FF (`0efef7f`, 2026-07-31)

**help**

- complete and correct the help center (`5b2e485`, 2026-10-07)

**historial**

- historial de trabajos con control, colores por tipo y barra lateral (`638580e`, 2026-10-17)

**ia**

- crear escenas, filtrar el razonamiento y preset de Google AI Studio (`40b00ab`, 2026-08-27)
- herramienta de placas Arduino, y arregla las claves que leía mal (`25b8ac4`, 2026-08-27)
- elección automática del modelo según la pregunta (`64f1f36`, 2026-08-12)
- cronómetro con la espera real que pide el proveedor (`ac68ea5`, 2026-08-12)

**klipper**

- los puertos de Moonraker se pueden declarar (`3585be3`, 2026-08-12)

**laser**

- retire global active laser host (D4) (`8961cbe`, 2026-10-05)
- panel Memoria SD con progreso real y biblioteca; datos base para árbol de modelos (`92e5443`, 2026-08-19)
- encuadre real del trabajo antes de cortar (`09ca5d8`, 2026-08-13)
- las acciones de la SD bajan a una barra, debajo de la lista (`e41c326`, 2026-08-12)

**logs**

- advanced log viewer with filters, rotated files and pause (`3a4e847`, 2026-10-05)
- configurable log levels, repeat grouping and storage (`47f9e5a`, 2026-10-05)

**plugins**

- optional on_startup/on_shutdown hooks for plugins (`3f5ec1a`, 2026-10-11)
- honor python_requires from plugin manifest and catalog (`1f37a32`, 2026-10-05)

**ui**

- Panel de Control, detalle de impresoras y CNC con nuevo acabado (`a9e357c`, 2026-10-17)
- move Marlin printers to the unified device card with camera (`49e5f7e`, 2026-10-07)
- la ficha muestra el carrete real y pierde el menú de puntos (`9864415`, 2026-08-13)
- la ficha del láser/CNC pasa al sistema unificado .dev-card (`b630f88`, 2026-08-13)
- el personalizador de la ficha, reducido a lo que el diseño permite (`d4da38e`, 2026-08-13)
- ficha de dispositivo única, empezando por Klipper (`842d03a`, 2026-08-13)
- las fichas de máquina del modo IA, rediseñadas (`6a5a9b5`, 2026-08-12)
- las imágenes del modo IA entran al repo, convertidas (`18b58bc`, 2026-08-12)
- superficies del modo IA y pestañas en el panel de trabajos (`1b2c63b`, 2026-08-12)
- tema Modo IA en el selector, con sus 3 fondos, y paleta corregida (`6011704`, 2026-08-12)
- logotipo NOPAL Intelligence y ajustes de tarjeta en modo IA (`4ccd1ec`, 2026-08-12)
- modo IA — paleta propia y elementos exclusivos (`7a23007`, 2026-08-12)

**General**

- rediseña Colabora y agrega la versión en inglés (`aa5871c`, 2026-08-28)
- versionado y diagnóstico ("Acerca de NOPAL") en Configuración (`ec49242`, 2026-08-13)
- sincronizar el carrete asignado con el spool activo de Moonraker (`1f6ddd3`, 2026-08-13)
- desinstalador con los datos a salvo por omisión (`09015b7`, 2026-08-12)
- exportar e importar configuración, cifrado y con selección múltiple (`4394359`, 2026-08-12)
- registro de IAs guardadas con CRUD (`e047975`, 2026-08-12)
- NOPAL Intelligence, capa de IA opcional y desacoplada (`c51a496`, 2026-08-11)
- dock fijo del Panel (Accesorios + cola + Matriz LED en vivo), tema Rojo con selector de fondo cruzado, y ajustes de sidebar contraída (`bc58898`, 2026-08-08)
- catálogo de perfiles de dispositivo + consolidación de Configuración → Dispositivos (`504df91`, 2026-08-07)
- agrega página pública de colaboración (/colabora) (`78e706a`, 2026-08-07)
- banners reales por plugin en la Galería de plugins + integra Texto para fabricación (`a0f68e4`, 2026-08-04)
- bump catálogo Matriz LED a v0.5.0 (Panel principal + Editor de Anuncios) (`cffa13d`, 2026-08-03)
- bump catálogo Matriz LED a v0.2.1 -- selector de tamaño de letra (`37f5303`, 2026-08-02)
- agrega Matriz LED al catálogo de plugins (`bc1f222`, 2026-08-02)
- puente BLE a pantalla LED en firmware de accesorios (NimBLE, confirmado en hardware) (`806d170`, 2026-08-02)
- reacomoda el Panel de Control, agrega descarte de alertas y vista de cámara vinculada por máquina (`e518e54`, 2026-08-01)
- aviso de solo escritorio/tablet al abrir NOPAL desde un celular (`0192e04`, 2026-07-31)
- Spoolman en Control del sistema y réplica de LEDs en tarjetas (`3fc6b14`, 2026-07-25)
- editor de archivos de config Klipper, plugin Spoolman y ajustes varios (`a06797c`, 2026-07-25)
- enviar impresiones Marlin a la tarjeta SD y firmware Nopal_FF con buzzer (`d738dc9`, 2026-07-23)
- modal de actualización de firmware, drag-and-drop en bibliotecas y ajustes de UI (`20e53c9`, 2026-07-22)
- agregar firmwares ESP12E y recursos pendientes (`f7a1ae3`, 2026-07-21)
- precalentar impresoras por material (`a6b21e4`, 2026-07-21)
- agregar escenas LED por dispositivo (`c4d9183`, 2026-07-21)
- unificar impresoras registradas en el panel (`0375f37`, 2026-07-21)
- imprimir archivos desde SD Marlin (`644fc61`, 2026-07-21)
- incluir impresoras Marlin al enviar trabajos (`099a413`, 2026-07-21)
- autocompletar nombre Marlin desde M115 (`5330e31`, 2026-07-21)
- agregar alta MKS WiFi en la UI Marlin (`6a2fd96`, 2026-07-21)
- agregar transporte Marlin por MKS WiFi (`5fe13dd`, 2026-07-21)
- conector Marlin USB genérico + perfil de placa (Fases 1-2-3-4 Hellbot) (`467b516`, 2026-07-21)
- botón "Actualizar" en la Galería de plugins cuando hay una versión nueva (`cd06050`, 2026-07-20)
- boton de colapso manual del panel superior + botones de dispositivo ocultos hasta el primer alta (`bb87f76`, 2026-07-20)
- extraer Cotizador de NOPAL core a plugin propio (`8b74dd8`, 2026-07-20)
- renombrar ficha de la galería a "Automatización de Taller" (`63d3ebb`, 2026-07-20)
- sistema de plugins desacoplado (repo propio por plugin, carga dinámica) (`08e46f5`, 2026-07-19)
- detect USB webcams and connect camera dashboard status (`99ca22a`, 2026-07-19)
- add guided printer setup wizard and redesign Help Center (`84ae9a4`, 2026-07-19)
- add camera plugin (MJPEG/ONVIF/go2rtc), system control panel, and Bambu Lab printer support (`3899993`, 2026-07-18)
- add Arduino/ESP32 accessory plugin with WiFi/OTA and printer brand support (`19bf97b`, 2026-07-17)
- add dashboard device organizer and loaders (`2b7d4f6`, 2026-07-16)
- add live thermal waves to printer cards (`1116fa4`, 2026-07-16)
- add five-language interface support (`aa5680e`, 2026-07-16)
- redesign 3D model library (`d5d84f2`, 2026-07-16)
- redesign G-code file library (`dfeb0f1`, 2026-07-16)
- make system updates machine-safe (`ab40aeb`, 2026-07-16)

### Corregido (60)

**ai**

- "carrete"/"bobina" faltaban en NON_CORE_HINTS del router (`0428b19`, 2026-08-13)
- las preguntas rápidas se borraban al guardar la IA, y hueco del panel (`a4f62a8`, 2026-08-12)
- interruptor de acciones en la interfaz, escenas y guardado de preguntas (`5873e91`, 2026-08-12)

**auth**

- enforce AI conversation ownership (`22d2594`, 2026-10-03)
- protect last administrator (`033b8f3`, 2026-10-03)

**dashboard**

- las acciones de la ficha mueren si la maquina tiene camara (`66c4aab`, 2026-08-21)

**i18n**

- validate generator languages by hand for Python 3.9-3.13 (`d9c2b16`, 2026-10-08)
- track English source in the translation cache and add reviewed overrides (`808c250`, 2026-10-08)
- restore laserSdSelectFile in es/en (`e1997db`, 2026-10-05)

**ia**

- la biblioteca que veía la IA no era la biblioteca (`138f15f`, 2026-08-12)
- el catálogo compacto dejaba sin herramienta las preguntas de plugins (`2903790`, 2026-08-12)
- la Matriz LED se inventaba escenas, reglas y alertas (`ff26063`, 2026-08-12)

**laser**

- track SD and external jobs reliably (`86f3e4c`, 2026-10-05)

**security**

- prevent upload path traversal (`6fc0aec`, 2026-10-03)

**status**

- el chequeo de actualizaciones ignoraba el mapeo local-&gt;remoto de la rama (`0c5ac7c`, 2026-08-14)

**ui**

- use internal machine id in device list and cameras (`85eb7f8`, 2026-10-05)
- la ficha "Acerca de NOPAL" faltaba en SETTINGS_MODULE_DEFS (`9bbd2f8`, 2026-08-14)
- el carrete va de costado, no parado (`499993a`, 2026-08-13)
- el carrete refleja los colores reales de Spoolman, incluidos multicolor (`06a0a42`, 2026-08-13)
- las fichas dejan de depender de document.hidden para refrescar (`d400ef4`, 2026-08-13)
- carrete propio de CNC, ícono de material más claro, "Enfriar" refresca la ficha (`bbe248c`, 2026-08-13)
- las olas térmicas ya no se salen de la ficha; bisel animado por categoría (`e2b73aa`, 2026-08-13)
- la ficha refresca temperatura al precalentar y material al volver del plugin (`dc925c4`, 2026-08-13)
- la cortinilla de IA se vuelve una cinta fija con comandos por sección (`9d54d54`, 2026-08-13)
- el interruptor del visor nunca se inyectaba en la ficha nueva (`717b232`, 2026-08-13)
- vuelven las olas térmicas y el visor deja de hacer parpadear al vecino (`16cc8ca`, 2026-08-13)
- el visor de cámara es un interruptor, y solo existe si hay cámara (`2401009`, 2026-08-13)
- iconos de temperatura de verdad y la máquina cede el centro a la cámara (`24fc6a8`, 2026-08-13)
- la ficha heredaba la barra superior de la app (`859843c`, 2026-08-13)
- la ficha nueva respeta el modo lista (`d05a611`, 2026-08-13)
- la ficha se ajusta a las medidas de la referencia (`c35221f`, 2026-08-13)
- las alertas visuales LED también en la ficha nueva (`2e6093e`, 2026-08-13)
- el tema elegido sobrevive a la recarga, y la cámara manda en la ficha (`806fbc2`, 2026-08-13)
- cuatro cosas de las fichas de dispositivo del panel (`3a898da`, 2026-08-13)
- la columna de dispositivos que falla ahora se explica y se reintenta (`51d943d`, 2026-08-13)
- "Todos los dispositivos" vuelve a tener editar y desvincular (`a5e69d4`, 2026-08-12)
- interruptores de IA con clases que no existían, y tema IA fantasma (`67dd39a`, 2026-08-12)
- el chat del panel deja de estirar la grilla del hero (`ad34257`, 2026-08-12)
- espaciado lateral de la sección NOPAL Intelligence (`13a1bb6`, 2026-08-12)

**uninstall**

- un sudo que falla ya no deja la desinstalación a medias (`eeab054`, 2026-08-12)

**General**

- limpiar el spool activo de Moonraker no debe mandar {"spool_id": null} (`86ff216`, 2026-08-13)
- probar conexión cae a /chat/completions si /v1/models falla (`f72b395`, 2026-08-11)
- exige marca y modelo/nombre en colabora, sube fotos a Storage (`22a27d1`, 2026-08-09)
- la tarjeta de impresora Klipper se congelaba durante impresiones largas (`671fd2a`, 2026-07-31)
- comando real de SD en láser, selector Memoria/Cola, y refresco del sitio (`e29d1dc`, 2026-07-30)
- quita sombra dura que duplicaba texto en tema Desert (láser) (`5d30c8e`, 2026-07-29)
- bajar pines de requirements.txt a versiones compatibles con Python 3.9 (`8ebd1f6`, 2026-07-28)
- alta de impresoras Marlin por USB desde el popup de clasificación (`7ed8968`, 2026-07-26)
- apuntar el catálogo de plugins al repo real de Materiales (Spoolman) (`a9596cb`, 2026-07-25)
- mostrar temperaturas y acciones solo donde corresponden (`a38d491`, 2026-07-21)
- detectar Marlin por identificación M115 (`10b27cc`, 2026-07-21)
- enlazar ayuda con YouTube de NOPAL México (`633f08d`, 2026-07-21)
- corregir actualización y acciones de plugins (`1a8c847`, 2026-07-21)
- invalidar cache de frontend de plugins (`6d482ec`, 2026-07-21)
- botón de colapso del panel superior -- ancho completo, sin borde, semitransparente, flecha corregida (`b85e117`, 2026-07-21)
- firmware v1.4 del accesorio Arduino -- control por WiFi y bug de auth OTA (`9e0ccb9`, 2026-07-19)
- usar HTTPS en vez de SSH para clonar plugins, y mostrar el error real de git (`95cf2e0`, 2026-07-19)
- completar wiring del sistema de plugins (quedó fuera del commit anterior) (`0317223`, 2026-07-19)
- install requirements.txt after a self-update before restarting NOPAL (`c6260d4`, 2026-07-18)
- localize plugin and pricing UI (`65ab3a8`, 2026-07-16)

### Cambiado (6)

**ui**

- unifica los temas en una capa de tokens semanticos (`fae8200`, 2026-08-07)

**General**

- add Help Center layout CSS (`b4829a2`, 2026-07-19)
- add gray waves to offline device cards (`34143ee`, 2026-07-16)
- add neon thermal glow in device grid (`e24e0df`, 2026-07-16)
- center printer MCU metrics (`481227f`, 2026-07-16)
- refresh light theme palette (`ee1fea2`, 2026-07-16)

### Documentación (14)

**firmware**

- confirma en changelog que el DHT11 de Nopal_FF ya se probó en hardware real (`e77e677`, 2026-08-14)

**General**

- correct minimum Python version to 3.9 (`358998a`, 2026-10-05)
- mark last-admin protection implemented (`d31a010`, 2026-10-03)
- finalize authorization policy D3 (`1c08cae`, 2026-10-03)
- update SDD and architecture documentation (`09a5630`, 2026-10-03)
- el firmware se consolidó en el repo del plugin arduino-accessories (`22ac600`, 2026-08-27)
- enlaza el Live Demo y unifica el apoyo en Ko-fi (`0c00041`, 2026-08-21)
- AGENTS.md al día con versionado/diagnóstico e issue #50 (`5987326`, 2026-08-13)
- AGENTS.md al día con material/Spoolman, IA y arreglos de UI (`4f70320`, 2026-08-13)
- documenta el bug de propagación de clics de la cámara montada (`efe36d5`, 2026-08-13)
- AGENTS.md al día con la migración de la ficha de láser/CNC (`93355bd`, 2026-08-13)
- AGENTS.md para traspasar el trabajo a otro agente (`f687a0f`, 2026-08-13)
- sincroniza README.es.md con el README.md en inglés (`c904430`, 2026-07-30)
- documentar firmware de segmentos LED (`27ece7a`, 2026-07-21)

### CI y pruebas (7)

**General**

- install ffmpeg for plugins-compat and treat it as an environment tool (`acbe3e3`, 2026-10-05)
- watch plugin compatibility with Python 3.9 (`7397956`, 2026-10-05)
- test Python 3.9 compatibility (`b0678bb`, 2026-10-05)
- isolate suite from real environment (`26ed971`, 2026-10-03)
- show pytest failures in logs (`ee5d0b6`, 2026-10-03)
- align auth fixtures with production roles (`614d320`, 2026-10-03)
- run pytest in GitHub Actions (`247efab`, 2026-10-03)

### Mantenimiento (15)

**i18n**

- completar de/fr/pt-BR con las claves nuevas y corregir traducciones y voseo (`fc37efe`, 2026-10-17)
- regenerate de/fr/pt-BR for help center and Marlin card (`6a6ef0b`, 2026-10-07)
- regenerate de/fr/pt-BR language packs (`67abd94`, 2026-10-05)

**General**

- bump cachebuster de app.js (v264 -&gt; v265) (`61dfeb2`, 2026-08-13)
- agrega botones de donación (PayPal + Buy Me a Coffee) (`7620383`, 2026-08-11)
- quita el badge/release de versión, todavía no hay pre-release (`a095cb6`, 2026-08-10)
- pulido profesional del repo (badges, docs comunitarios, plantillas) (`2ea20e3`, 2026-08-10)
- sincroniza versión del catálogo con cotizador (i18n v1.1.0) (`8970483`, 2026-08-09)
- sincroniza versiones del catálogo con camera-viewer/shape-creator (i18n) (`0864289`, 2026-08-09)
- sincroniza versión del catálogo con arduino-accessories (i18n v2.5.0) (`2973881`, 2026-08-08)
- sincroniza versión del catálogo con matriz-led (i18n v0.9.0) (`09bab84`, 2026-08-08)
- sincroniza versiones del catálogo con svg-toolkit/spoolman (i18n) (`9c9062d`, 2026-08-08)
- sube Texto para fabricación a v0.5.0 en el catálogo de plugins (`d324536`, 2026-08-04)
- sube Matriz LED a v0.2.0 en el catálogo de plugins (`c175ea5`, 2026-08-02)
- begin 1.2.0 alpha cycle (`2d2856e`, 2026-07-16)

### Otros (14)

**General**

- avance en ai_actions (NOPAL Intelligence) (`4f45104`, 2026-08-28)
- frontend: redisenar NOPAL Intelligence alrededor del nucleo IA (`a81f1a6`, 2026-08-26)
- backend: avisar de laseres y CNC en alarma (`0a6dc1f`, 2026-08-26)
- backend: reportar el estado real de la maquina en laser y CNC (`8663580`, 2026-08-26)
- Elimina variantes de firmware obsoletas para accesorios (`e436daa`, 2026-08-26)
- traducción de plugins + cambios de CNC en curso (`d3ddd13`, 2026-08-10)
- Rediseñar sitio web: layout bento, iconos SVG, tipografía técnica (`90792cc`, 2026-08-04)
- Add device-authenticated camera streaming (`7246671`, 2026-08-01)
- Tema Desert, fondos de sidebar/láser/plugins tematizados, y README con imágenes (`107cffd`, 2026-07-29)
- Fix SVG toolkit catalog update (`ea7f218`, 2026-07-20)
- Enable SVG toolkit plugin (`3efc21d`, 2026-07-20)
- fix-public-smoke-test (`dc927c0`, 2026-07-16)
- refresh-library-theme (`ce12f7d`, 2026-07-16)
- add-font-plugin-card (`39c2a22`, 2026-07-15)

## 1.1.0 — Sin etiqueta (2026-07-04 → 2026-07-15, 27)

### Otros (27)

**General**

- release-1.1.0 (`90745ec`, 2026-07-15)
- feat-plugin-gallery-and-shape-creator (`feba517`, 2026-07-15)
- Save current changes and add new files (`299fbd2`, 2026-07-14)
- Corrige que el login tape la pantalla de configuración inicial (`a2faf9e`, 2026-07-13)
- Identifica placas USB por ubicación física estable, no por /dev/ttyUSBx (`d1c04a2`, 2026-07-13)
- Reorganiza-y-corrige-sidebar-por-categorias (`cdb0ae9`, 2026-07-12)
- Integra-Marlin-cotizador-y-endurecimiento-de-NOPAL (`05aecdb`, 2026-07-12)
- Agrega autenticación multi-usuario, Cotizador y notificaciones reales (`d236ce3`, 2026-07-12)
- Construye el dashboard CNC completo, arregla soporte FluidNC y unifica el gamepad (`031f874`, 2026-07-10)
- Unifica el sistema de temas, agrega soporte CNC y rediseña varios modales (`b5c2c5a`, 2026-07-09)
- Add files via upload (`ce44437`, 2026-07-09)
- Agregar sitio web de NOPAL (`67dca3c`, 2026-07-09)
- Mapeo de joystick para el láser, enmarcado real y ajustes de layout (`9a43e42`, 2026-07-08)
- Rediseño visual del dashboard, cola de impresión activa real y mejoras al panel láser (`a42071e`, 2026-07-08)
- Completa el mosaico con la novena captura (`8fc9575`, 2026-07-07)
- Reescribe el README (inglés principal + español) con las features reales (`090a565`, 2026-07-07)
- Enhance README with additional images (`e981d39`, 2026-07-07)
- Corrige RuntimeError intermitente al consultar láseres USB (`5dd651e`, 2026-07-07)
- Agrega sección de Ayuda con información, contacto y guía rápida (`2fe861f`, 2026-07-07)
- Dashboard unificado, cola de impresión real, sistema de popups y ajustes de temperatura (`c92cebb`, 2026-07-07)
- Láser multi-host, tarjeta SD inline, aire asistido y ajustes de UI (`0575c93`, 2026-07-06)
- Update image in README.md (`e7c245b`, 2026-07-06)
- Integración completa de láser GRBL (red y USB) con panel, cola y consola (`3d07496`, 2026-07-06)
- Explorador de archivos con carpetas, previsualización 3D/G-code y widgets en vivo (`cd4fee9`, 2026-07-06)
- Add image to README for project visualization (`8cfc9d6`, 2026-07-06)
- Rebrand a NOPAL, tema Verde real, historial por impresora y pulso del sistema (`ad609c0`, 2026-07-06)
- Initial commit: NOPAL dashboard, install script and GitHub setup (`138e5a7`, 2026-07-04)

