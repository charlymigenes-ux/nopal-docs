---
title: Entorno de desarrollo y pruebas
sidebar_label: Entorno y pruebas
sidebar_position: 2
audience: developer
type: how-to
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
---

# Entorno de desarrollo y pruebas

## Preparar el entorno

Requiere **Python 3.9 o superior**.

```bash
git clone https://github.com/charlymigenes-ux/nopal.git
```

```bash
cd nopal
```

```bash
python -m venv .venv
```

```bash
source .venv/bin/activate
```

En Windows se activa con `.venv\Scripts\activate`.

```bash
pip install -r requirements.txt -r requirements-dev.txt
```

`requirements-dev.txt` incluye `requirements.txt` y añade `pytest`, `pytest-asyncio` y `httpx`.

## Ejecutar en modo desarrollo

```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8420
```

Abre `http://localhost:8420`. Con `--reload` el servidor se reinicia al cambiar el código; el secreto de sesión se guarda en disco (`.session_secret`) para que esos reinicios no cierren las sesiones.

No necesitas hardware para trabajar en la interfaz o en la mayoría de la lógica. Para probar una integración, deja al menos una máquina de esa familia accesible.

## Pruebas

```bash
pytest
```

`pytest.ini` fija `testpaths = backend/tests` y `asyncio_mode = auto`.

```bash
pytest backend/tests/test_marlin_driver.py
```

```bash
pytest backend/tests/test_marlin_driver.py::test_algun_caso -v
```

### La suite no toca tu instalación

Las pruebas **no necesitan hardware, servicios ni variables de entorno**: los transportes están simulados. Además, la sesión de pruebas se ejecuta aislada:

- `backend/tests/isolation.py` se activa **antes de importar la aplicación**, al principio de `conftest.py`. Crea un directorio temporal sin plugins ni archivos del taller y **bloquea la red, los puertos serie y las escrituras dentro del repositorio**.
- Un *fixture* automático redirige a un directorio temporal el `REGISTRY_PATH` de cada marca y las rutas del instalador de plugins.

:::warning Si añades un módulo con estado en disco
Cualquier módulo nuevo con una constante tipo `REGISTRY_PATH` respaldada por un archivo debe incorporarse a ese aislamiento. Olvidarlo ya corrompió un registro real una vez.
:::

### Simular usuarios

`conftest.py` ofrece *fixtures* que reemplazan `require_auth` para simular un administrador (`as_admin`) o un operador (`as_operator`), sin pasar por el middleware de sesión real.

## Integración continua

`.github/workflows/smoke-test.yml` se ejecuta en cada *push* a `main` y `dev-main`, en los pull requests a `main`, y cada lunes.

| Trabajo | Qué comprueba |
|---|---|
| `smoke-test` (Python 3.9 y 3.11) | Instala `requirements-dev.txt`, ejecuta **`pytest`** completo, arranca el servidor y verifica que la portada responde |
| `plugins-compat` (Python 3.9) | Clona la punta de la rama por defecto de cada plugin del catálogo y ejecuta sus pruebas con el cargador real de NOPAL. `COMPAT` hace fallar el trabajo; `INFRA` (repositorio inaccesible, herramienta ausente) queda como aviso |

La lógica de `plugins-compat` está en `scripts/check_plugins_compat.py`.

## Probar un plugin

Las pruebas de un plugin necesitan un *checkout* del core. Por convención, el plugin vive en `plugins/<id>/` dentro del core y las pruebas lo encuentran dos niveles más arriba. Si lo ejecutas desde otro sitio, indica dónde está:

```bash
export NOPAL_CORE_ROOT=/ruta/al/checkout/de/nopal
```

```bash
pytest plugins/<id>/tests
```

El plugin se ejecuta **en proceso** con el core, así que sus pruebas cargan `backend/router.py` con la misma técnica que el cargador de producción.

Algunos plugins requieren herramientas externas: Node (pruebas de contrato de `font-library` y `svg-toolkit`, con `node --check`) y `ffmpeg` (`camera-viewer`).
