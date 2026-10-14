# nopal-docs

Sitio de documentación oficial de **NOPAL** y sus extensiones. Hecho con [Docusaurus](https://docusaurus.io/), en español (fuente) e inglés.

> Estado: **F1 (esqueleto)**. Las secciones contienen páginas esqueleto (`stub: true`) salvo *Inicio*. El contenido real llega por fases; ver `docs/00-inicio/arquitectura-documental.md` §9.

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

## Plantillas

Copia la de `templates/` que corresponda al tipo de página y rellena el front-matter (Standard, Anexo A).

## Pendiente (según las fases)

- **F2**: auditoría restante (rutas, archivos de estado, roles, drivers).
- **F3**: generadores (referencia REST, fichas de plugin, matriz de manifiestos) y validadores de rutas/manifiestos.
- Búsqueda en el sitio: se añade al elegir plugin de búsqueda (decisión abierta).
- Logo: el actual es **provisional**.
