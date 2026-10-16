# Lista de capturas

Guía para tomar las capturas de pantalla de la documentación. Cumple el [Documentation Standard §11](../docs/00-inicio/estandar-de-documentacion.md).

Las capturas **no se pueden sacar del código**: hay que tomarlas de una instalación real de NOPAL (`nopal@main`, versión **1.2.0-alpha.1** o posterior). Quien las toma pasa los archivos y se integran en las páginas con su texto alternativo.

## Cómo tomarlas

| Ajuste | Valor |
|---|---|
| Versión | La de **Configuración → Acerca de NOPAL**. Anótala |
| Idioma de la interfaz | **Español** (primera tanda). Si puedes, repite en **inglés** (segunda tanda) |
| Tema | **Claro** (el mismo en todas) |
| Navegador | Ventana de escritorio, zoom 100 %, **1440 × 900** |
| Formato | PNG, sin recortar el menú lateral salvo que se indique |
| Datos personales | Oculta o difumina IP, nombres de usuario reales, números de serie, claves y correos |
| Rol | Administrador (para ver todo). Donde se indique, repite como operador |

## Nombres y carpetas

- Nombre: `area-vista-version.png`, todo en minúsculas, sin espacios. Ejemplo: `panel-resumen-1.2.0-alpha.1.png`.
- Carpeta: `es/` para la interfaz en español y `en/` para la inglesa.
- Se guardan en `static/img/capturas/es/` y `static/img/capturas/en/`.
- Cada captura declara en su pie de figura la versión, el idioma y el tema.

## Prioridad 1: imprescindibles (11)

| # | Archivo (`area-vista`) | Qué debe verse | Cómo llegar | Página |
|---|---|---|---|---|
| 1 | `acceso-login` | Pantalla de inicio de sesión | Cerrar sesión | Primer acceso |
| 2 | `acceso-primer-arranque` | Formulario de creación de la cuenta de administrador | Primer arranque (instalación limpia) | Primer acceso |
| 3 | `panel-resumen` | Panel de control con el menú lateral, la barra superior y el resumen | **Inicio** | Panel de control |
| 4 | `panel-maquinas` | Las fichas de máquinas con su punto de estado | **Inicio**, bajar a «Tus máquinas» | Panel de control |
| 5 | `biblioteca-modelos` | Biblioteca de impresión 3D con archivos y vista previa | **Biblioteca → Impresión 3D** | Biblioteca |
| 6 | `editor-codigo` | Editor de G-code con la pestaña **Código** | **Herramientas → Editor G-Code** | Editor de G-code |
| 7 | `editor-geometria` | Panel **Geometría** y **Análisis del archivo** | Editor, con un archivo abierto | Editor de G-code |
| 8 | `consola-macros` | Consola de una Klipper y el bloque **Macros** | **Herramientas → Consola del sistema** | Consola y macros |
| 9 | `historial-trabajos` | Las dos listas del historial | **Trabajos → Historial de trabajos** | Historial de trabajos |
| 10 | `plugins-galeria` | La galería de plugins | **Plugins → Galería** | Galería de plugins |
| 11 | `configuracion-general` | Tarjeta de ajustes generales | **Configuración** | Configuración general |

## Prioridad 2: recomendadas (9)

| # | Archivo | Qué debe verse | Cómo llegar | Página |
|---|---|---|---|---|
| 12 | `configuracion-temas` | Los temas disponibles | **Configuración → Apariencia** | Configuración general |
| 13 | `configuracion-acerca-de` | La tarjeta **Acerca de NOPAL** | **Configuración** | Diagnóstico |
| 14 | `ayuda-centro` | El Centro de ayuda con sus categorías y el buscador | Icono de ayuda | Centro de ayuda |
| 15 | `ayuda-asistente-impresora` | El asistente guiado, paso de elegir marca | Centro de ayuda → Impresoras 3D | Centro de ayuda |
| 16 | `impresora-ficha-klipper` | Ficha y vista de detalle de una Klipper | **Dispositivos** (Klipper) | Impresoras Klipper |
| 17 | `laser-conexion` | Sección del láser con la conexión y el movimiento | **Dispositivos → Láser** | Láser y CNC |
| 18 | `ia-conversacion` | NOPAL Intelligence con una conversación (si está activa) | **Herramientas → NOPAL Intelligence** | NOPAL Intelligence |
| 19 | `ia-configuracion` | Tarjeta **Inteligencia artificial** (oculta la clave) | **Configuración** | NOPAL Intelligence |
| 20 | `admin-respaldos` | Tarjeta de respaldos con los grupos | **Configuración → Respaldo** | Respaldos |

## Entrega

1. Guarda cada captura con su nombre y deja las de español en una carpeta `es/` y las de inglés en `en/`.
2. Pásame la carpeta (o las rutas). Yo las copio a `static/img/capturas/`, las inserto en las páginas con su texto alternativo y pie de figura, y compruebo los nombres con `npm run check:capturas`.
3. Para saber qué falta, ejecuta `npm run check:capturas`: lista cada archivo de esta tabla que aún no existe.

Puedes empezar solo por la prioridad 1.
