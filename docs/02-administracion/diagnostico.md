---
title: Diagnóstico y dependencias de plugins
sidebar_label: Diagnóstico
sidebar_position: 10
audience: admin
type: how-to
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
---

# Diagnóstico y dependencias de plugins

## Acerca de NOPAL

En **Configuración** hay una tarjeta **Acerca de NOPAL** con los datos de diagnóstico del servidor. La ve cualquier usuario con sesión. Muestra:

| Dato | Detalle |
|---|---|
| Versión | La de NOPAL |
| Commit y rama | Si NOPAL corre desde un repositorio git. Si lo descargaste como `.zip` (sin `.git`) aparece *No disponible* |
| Sistema operativo | Distribución y versión, por ejemplo Debian GNU/Linux 13 |
| Arquitectura y Python | Del servidor |
| Idioma activo | El de tu navegador |
| Plugins instalados | La lista, o *No hay plugins instalados* |

El botón **Copiar información de diagnóstico** deja todo en el portapapeles, listo para pegarlo en un *issue* o al pedir ayuda. Si el navegador no permite copiar, la pantalla te pide copiar el texto a mano.

![Tarjeta «Acerca de NOPAL» con la versión, el sistema operativo y los plugins instalados](/img/capturas/es/configuracion-acerca-de-1.2.0-alpha.1.png)

*Captura de un sistema en funcionamiento · NOPAL 1.2.0-alpha.1 · interfaz en español · tema NOPAL Style.*

## Dependencias de los plugins

:::warning NOPAL no instala las dependencias de un plugin
Al instalar un plugin, NOPAL clona su repositorio y comprueba solo la versión de Python que el plugin declare (`python_requires`). **No ejecuta `pip`** para sus librerías.
:::

Qué pasa si falta una:

- El backend del plugin falla al importarse. NOPAL lo **registra en el log** (`no se pudo cargar el backend del plugin`) y sigue arrancando sin él.
- Su parte visual puede cargar igualmente, pero sus funciones de servidor no responderán.

Qué hacer:

1. Consulta la documentación del plugin ([Plugins](../03-plugins/)) para ver qué librerías necesita.
2. Instálalas en el entorno virtual de NOPAL:

```bash
.venv/bin/pip install <paquete>
```

3. Reinicia NOPAL (ver [Control del sistema](./control-del-sistema)).
4. Si sigue sin cargar, revisa los [registros](./registros).

Al actualizar NOPAL, solo se reinstalan las dependencias del propio NOPAL (`requirements.txt`), no las de los plugins.
