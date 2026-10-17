# Lista de capturas

Guía y estado de las capturas de pantalla de la documentación. Cumple el [Documentation Standard §11](../docs/00-inicio/estandar-de-documentacion.md).

Hay dos tipos de captura:

- **Instalación nueva, sin máquinas** (10): las tomó Claude con Playwright sobre una instalación aislada de `nopal@main` 1.2.0-alpha.1, en español e inglés. Ya están en las páginas.
- **Sistema en funcionamiento** (10): necesitan máquinas, trabajos o una IA reales y las toma quien tiene el equipo. Su pie de figura **debe declarar** que son de un sistema en funcionamiento.

## Cómo tomarlas

| Ajuste | Valor |
|---|---|
| Versión | La de **Configuración → Acerca de NOPAL**. Anótala |
| Idioma de la interfaz | **Español** (primera tanda). Si puedes, repite en **inglés** (segunda tanda) |
| Tema | **NOPAL Style** con el **tercer fondo de Modo IA** (`FONDO3_IA`), el mismo en todas. Requiere IA activada: en **Configuración → Apariencia** elige NOPAL Style y pulsa la tercera miniatura de la fila de Modo IA |
| Navegador | Ventana de escritorio, zoom 100 %, **1440 × 1080** |
| Pantalla de celular | NOPAL **no abre** por debajo de 640 px de ancho (muestra un aviso). Las capturas son siempre de escritorio o tablet |
| Formato | PNG, sin recortar el menú lateral salvo que se indique |
| Datos personales | Oculta o difumina IP, nombres de usuario reales, números de serie, claves y correos |
| Rol | Administrador (para ver todo). Donde se indique, repite como operador |

## Nombres y carpetas

- Nombre: `area-vista-version.png`, todo en minúsculas, sin espacios. Ejemplo: `panel-resumen-1.2.0-alpha.1.png`.
- Se guardan en `static/img/capturas/es/` (interfaz en español) y `static/img/capturas/en/` (inglés).
- Pie de figura de una **instalación nueva**:
  `*Captura de NOPAL 1.2.0-alpha.1 · interfaz en español · tema NOPAL Style.*`
- Pie de figura de un **sistema en funcionamiento**:
  `*Captura de un sistema en funcionamiento · NOPAL 1.2.0-alpha.1 · interfaz en español · tema NOPAL Style.*`

## Hechas: instalación nueva, sin máquinas (10)

| # | Archivo (`area-vista`) | Página |
|---|---|---|
| 1 | `acceso-primer-arranque` | Primer acceso |
| 2 | `acceso-login` | Primer acceso |
| 3 | `biblioteca-modelos` | Biblioteca |
| 4 | `editor-codigo` | Editor de G-code |
| 5 | `plugins-galeria` | Galería de plugins |
| 6 | `ayuda-centro` | Centro de ayuda |
| 7 | `ayuda-asistente-impresora` | Centro de ayuda |
| 8 | `configuracion-general` | Configuración general |
| 9 | `configuracion-temas` | Configuración general |
| 10 | `admin-respaldos` | Respaldos |

La vista previa 3D de la biblioteca sale vacía en estas capturas porque el navegador de pruebas no tiene aceleración gráfica. Si puedes, repite `biblioteca-modelos` en un navegador real.

## Pendientes: las toma quien tiene el equipo (sistema en funcionamiento) (10)

| # | Archivo (`area-vista`) | Qué debe verse | Cómo llegar | Página |
|---|---|---|---|---|
| 11 | `panel-resumen` | Panel de control con máquinas y trabajos reales | **Inicio** | Panel de control |
| 12 | `panel-maquinas` | Las fichas de máquinas con su punto de estado | **Inicio**, bajar a «Tus máquinas» | Panel de control |
| 13 | `editor-geometria` | **Visor 2D** con las capas, el panel **Edición** y el análisis del archivo | Editor G-Code, con un archivo abierto (en el navegador de pruebas el visor no terminó de cargar) | Editor de G-code |
| 14 | `consola-macros` | Consola de una Klipper y el bloque **Macros** | **Herramientas → Consola del sistema** | Consola y macros |
| 15 | `historial-trabajos` | Las dos listas del historial con trabajos reales | **Trabajos → Historial de trabajos** | Historial de trabajos |
| 16 | `configuracion-acerca-de` | La tarjeta **Acerca de NOPAL** de un servidor real (Linux) | **Configuración** | Diagnóstico |
| 17 | `impresora-ficha-klipper` | Ficha y vista de detalle de una Klipper | **Dispositivos** (Klipper) | Impresoras Klipper |
| 18 | `laser-conexion` | Sección del láser con la conexión y el movimiento | **Dispositivos → Láser** | Láser y CNC |
| 19 | `ia-conversacion` | NOPAL Intelligence con una conversación (con IA configurada) | **Herramientas → NOPAL Intelligence** | NOPAL Intelligence |
| 20 | `ia-configuracion` | Tarjeta **Inteligencia artificial** con una IA guardada (oculta la clave) | **Configuración** | NOPAL Intelligence |

## Entrega

1. Guarda cada captura con su nombre; las de español en una carpeta `es/` y las de inglés en `en/`.
2. Pásame la carpeta (o las rutas). Yo las copio a `static/img/capturas/`, las inserto en las páginas con su texto alternativo y el pie de figura que corresponde, y compruebo los nombres con `npm run check:capturas`.
3. Para saber qué falta, ejecuta `npm run check:capturas`: lista cada archivo de las tablas que aún no existe.
