# Lista de capturas

Guía y estado de las capturas de pantalla de la documentación. Cumple el [Documentation Standard §11](../docs/00-inicio/estandar-de-documentacion.md).

Hay dos tipos de captura:

- **Instalación nueva, sin máquinas** (10): las tomó Claude con Playwright sobre una instalación aislada de `nopal@main` 1.2.0-alpha.1, en español e inglés.
- **Sistema en funcionamiento** (8 pantallas): las tomó el autor en su instalación real (`dev-main`, commit `fc37efe`, Debian 13). Su pie de figura declara que son de un sistema en funcionamiento.

Todas están ya en las páginas, salvo la que figura como pendiente más abajo.

## Cómo tomarlas

| Ajuste | Valor |
|---|---|
| Versión | La de **Configuración → Acerca de NOPAL**. Anótala |
| Idioma de la interfaz | **Español** (primera tanda). Si puedes, repite en **inglés**. Si una captura no tiene versión en inglés, la página en inglés usa la de español y su pie lo dice |
| Tema | **NOPAL Style** con el **tercer fondo de Modo IA** (`FONDO3_IA`), el mismo en todas. Requiere IA activada: en **Configuración → Apariencia** elige NOPAL Style y pulsa la tercera miniatura de la fila de Modo IA |
| Navegador | Ventana de escritorio, zoom 100 %. Se aceptan 1440 × 1080 o 1920 × 1200 |
| Pantalla de celular | NOPAL **no abre** por debajo de 640 px de ancho (muestra un aviso). Las capturas son siempre de escritorio o tablet |
| Formato | PNG, sin recortar el menú lateral salvo que se indique |
| Datos personales y de red | **Antes de entregarlas**, avisa si se ven direcciones IP, puertas de enlace, DNS, direcciones MAC, nombres de red WiFi, nombres de equipo, claves o correos. Se difuminan o se recortan antes de publicarlas |
| Rol | Administrador (para ver todo). Donde se indique, repite como operador |

## Nombres y carpetas

- Nombre: `area-vista-version.png`, todo en minúsculas, sin espacios. Ejemplo: `panel-maquinas-1.2.0-alpha.1.png`.
- Los originales que entregas van en `capturas/es/` y `capturas/en/`. Esas carpetas **no se suben a git**: pueden traer datos de red.
- Las versiones ya revisadas, listas para publicar, van en `static/img/capturas/es/` y `static/img/capturas/en/`.
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

## Hechas: sistema en funcionamiento (8)

| # | Archivo (`area-vista`) | Página | Notas |
|---|---|---|---|
| 11 | `panel-maquinas` | Panel de control | En español y en inglés. Cubre también la vista general del panel |
| 12 | `editor-geometria` | Editor de G-code | |
| 13 | `historial-trabajos` | Historial de trabajos | |
| 14 | `configuracion-acerca-de` | Diagnóstico | Recortada a la tarjeta |
| 15 | `impresora-ficha-klipper` | Impresoras Klipper | |
| 16 | `laser-conexion` | Láser y CNC | IP, puerta de enlace, DNS, MAC, SSID y nombre del equipo difuminados |
| 17 | `ia-conversacion` | NOPAL Intelligence | IP de un evento difuminada |
| 18 | `ia-configuracion` | NOPAL Intelligence | |

## Pendiente (1)

| # | Archivo (`area-vista`) | Qué debe verse | Cómo llegar | Página |
|---|---|---|---|---|
| 19 | `consola-macros` | Consola de una Klipper y el bloque **Macros** | **Herramientas → Consola del sistema** | Consola y macros |

## Entrega

1. Guarda cada captura con su nombre en `capturas/es/` (y en `capturas/en/` si tienes la versión en inglés).
2. Avísame. Yo reviso que no muestre datos de red ni personales, la recorto o difumino si hace falta, la copio a `static/img/capturas/`, la inserto en su página con texto alternativo y pie de figura, y compruebo los nombres con `npm run check:capturas`.
3. Para saber qué falta, ejecuta `npm run check:capturas`.
