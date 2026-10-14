"""Prueba del plugin con el cargador REAL de NOPAL.

Necesita un checkout del core: indica dónde está con NOPAL_CORE_ROOT.
"""
import json
import os
import shutil
import sys
from pathlib import Path

import pytest

CORE = Path(os.environ["NOPAL_CORE_ROOT"])
sys.path.insert(0, str(CORE))

from fastapi import FastAPI
from fastapi.testclient import TestClient

import backend.services.plugin_installer_service as installer
import backend.services.plugin_loader_service as loader
from backend.auth_deps import require_auth

PLUGIN_ROOT = Path(__file__).resolve().parents[1]
ADMIN = {"user_id": "t-admin", "username": "ana", "role": "admin"}
OPERADOR = {"user_id": "t-op", "username": "beto", "role": "operador"}


@pytest.fixture
def app(tmp_path, monkeypatch):
    plugins = tmp_path / "plugins"
    plugins.mkdir()
    shutil.copytree(PLUGIN_ROOT, plugins / "hello-nopal", ignore=shutil.ignore_patterns("tests", "__pycache__"))
    monkeypatch.setattr(installer, "PLUGINS_DIR", plugins)
    monkeypatch.setattr(installer, "PLUGIN_DATA_DIR", tmp_path)
    monkeypatch.setattr(installer, "INSTALLED_FILE", tmp_path / "installed.json")
    installer.write_installed_state({"hello-nopal": {"version": "0.1.0", "enabled": True, "installed_at": "now"}})

    application = FastAPI()
    loader.load_installed_plugin_routers(application)  # el mismo camino que el arranque
    return application


def como(app, usuario):
    app.dependency_overrides[require_auth] = lambda: usuario
    return TestClient(app)


def test_saludo_para_cualquier_usuario(app):
    respuesta = como(app, OPERADOR).get("/api/hello-nopal/saludo")
    assert respuesta.status_code == 200
    assert respuesta.json() == {"mensaje": "Hola NOPAL", "usuario": "beto", "rol": "operador"}


def test_eco_solo_para_administradores(app):
    assert como(app, OPERADOR).post("/api/hello-nopal/eco", params={"texto": "x"}).status_code == 403
    admin = como(app, ADMIN).post("/api/hello-nopal/eco", params={"texto": "hola"})
    assert admin.status_code == 200 and admin.json() == {"eco": "hola"}
