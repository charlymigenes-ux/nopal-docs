---
title: Development environment and tests
sidebar_label: Environment and tests
sidebar_position: 2
audience: developer
type: how-to
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
source_commit: "a5853dc"
---

# Development environment and tests

## Set up the environment

Requires **Python 3.9 or later**.

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

On Windows it is activated with `.venv\Scripts\activate`.

```bash
pip install -r requirements.txt -r requirements-dev.txt
```

`requirements-dev.txt` includes `requirements.txt` and adds `pytest`, `pytest-asyncio` and `httpx`.

## Run in development mode

```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8420
```

Open `http://localhost:8420`. With `--reload` the server restarts when the code changes; the session secret is stored on disk (`.session_secret`) so those restarts do not sign everyone out.

You do not need hardware to work on the interface or most of the logic. To test an integration, keep at least one machine of that family reachable.

## Tests

```bash
pytest
```

`pytest.ini` sets `testpaths = backend/tests` and `asyncio_mode = auto`.

```bash
pytest backend/tests/test_marlin_driver.py
```

```bash
pytest backend/tests/test_marlin_driver.py::test_some_case -v
```

### The suite does not touch your installation

The tests **need no hardware, services or environment variables**: transports are simulated. The test session also runs isolated:

- `backend/tests/isolation.py` is activated **before the application is imported**, at the top of `conftest.py`. It creates a temporary directory with no plugins or workshop files and **blocks the network, serial ports and writes inside the repository**.
- An automatic fixture redirects each brand's `REGISTRY_PATH` and the plugin installer paths to a temporary directory.

:::warning If you add a module with state on disk
Any new module with a `REGISTRY_PATH`-style constant backed by a file must be added to that isolation. Forgetting it once corrupted a real registry.
:::

### Simulate users

`conftest.py` provides fixtures that replace `require_auth` to simulate an administrator (`as_admin`) or an operator (`as_operator`), without going through the real session middleware.

## Continuous integration

`.github/workflows/smoke-test.yml` runs on every push to `main` and `dev-main`, on pull requests to `main`, and every Monday.

| Job | What it checks |
|---|---|
| `smoke-test` (Python 3.9 and 3.11) | Installs `requirements-dev.txt`, runs the full **`pytest`** suite, starts the server and verifies the home page responds |
| `plugins-compat` (Python 3.9) | Clones the tip of each catalog plugin's default branch and runs its tests with NOPAL's real loader. `COMPAT` fails the job; `INFRA` (unreachable repository, missing tool) stays as a warning |

The `plugins-compat` logic is in `scripts/check_plugins_compat.py`.

## Test a plugin

A plugin's tests need a checkout of the core. By convention, the plugin lives in `plugins/<id>/` inside the core and the tests find it two levels up. If you run it from elsewhere, say where it is:

```bash
export NOPAL_CORE_ROOT=/path/to/the/nopal/checkout
```

```bash
pytest plugins/<id>/tests
```

The plugin runs **in process** with the core, so its tests load `backend/router.py` with the same technique as the production loader.

Some plugins require external tools: Node (contract tests of `font-library` and `svg-toolkit`, using `node --check`) and `ffmpeg` (`camera-viewer`).
