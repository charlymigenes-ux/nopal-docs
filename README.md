# nopal-docs

Sitio de documentación oficial de **NOPAL** y sus extensiones. Hecho con [Docusaurus](https://docusaurus.io/), en español (fuente) e inglés.

> Estado: **F1 (esqueleto), F2 (auditoría) y F3 (generadores y validadores) completas**; ver `auditoria/`. Las secciones contienen páginas esqueleto (`stub: true`) salvo *Inicio*. El contenido real llega por fases; ver `docs/00-inicio/arquitectura-documental.md` §9.

## Reglas

Todo se rige por el **[Documentation Standard](docs/00-inicio/estandar-de-documentacion.md)** y la **[Arquitectura documental](docs/00-inicio/arquitectura-documental.md)**. Lo esencial:

1. El código de `main` es la fuente de verdad; nada se inventa.
2. Cada página técnica declara `status` (`implemented`, `convention`, `experimental`, `rfc`, `deprecated`) y `verified_against`.
3. Lo que no existe en NOPAL va en `docs/07-rfc/`.
4. Español es la fuente; inglés es traducción oficial.

## Uso local

Requiere Node 20 o superior.

```bash
npm ci
```

```bash
npm start
```

```bash
npm run start:en
```

> **Importante:** el servidor de desarrollo sirve **un solo idioma**. `npm start` muestra español; para ver inglés usa `npm run start:en`. Si estando en `npm start` eliges *English* en el selector, la página falla o muestra 404: no es un error del contenido. Para ver **ambos idiomas juntos**, con el selector funcionando, usa:

```bash
npm run preview
```

```bash
npm run check
```

```bash
npm run build
```

## Estructura

```
docs/                 ES, secciones 00–08
i18n/en/…/current/    traducciones EN (misma ruta que en docs/)
src/components/       StatusBanner y otros componentes
templates/            plantillas por tipo de página
scripts/              validadores (front-matter, i18n)
generated/            salida de los generadores (F3); no se edita a mano
auditoria/            auditorías del código usadas como evidencia
```

## Generadores y validadores (F3)

Las páginas `docs/06-referencia/api-rest-core.md`, `docs/03-plugins/<id>.md` y `docs/03-plugins/matriz-de-plugins.md` (y su versión EN) son **generadas**: no se editan a mano. Salen del código de `nopal` y de los plugins.

```bash
npm run fetch
```

Clona (solo lectura) los repos públicos del alcance en `.sources/`. Para usar otra carpeta, define `NOPAL_SOURCES`.

```bash
npm run gen
```

Extrae las rutas (`scripts/extract_routes.py`, análisis estático sin ejecutar código) y regenera las páginas.

```bash
npm run check && npm run check:sources
```

Valida front-matter, alcance, paridad ES/EN, manifiestos y rutas. El alcance (qué se incluye y qué no se puede mencionar) vive en `scripts/data/scope.json`. Las notas verificadas de cada plugin, con su evidencia, en `scripts/data/plugin-notes.json`.

## Plantillas

Copia la de `templates/` que corresponda al tipo de página y rellena el front-matter (Standard, Anexo A).

## Pendiente (según las fases)

- Búsqueda en el sitio: se añade al elegir plugin de búsqueda (decisión abierta).
- Logo: el actual es **provisional**.
