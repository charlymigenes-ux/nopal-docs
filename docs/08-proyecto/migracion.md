---
title: Migración
sidebar_label: Migración
sidebar_position: 4
audience: admin
type: how-to
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
---

# Migración

NOPAL no tiene todavía versiones etiquetadas, así que no existen guías «de la versión X a la Y». Esta página recoge lo que **sí** exige acción al actualizar, comprobado en el código y en el historial.

| Cambio | Cuándo | ¿Qué debes hacer? |
|---|---|---|
| [Identidad estable de máquinas](#identidad-estable-de-máquinas) | 2026-10-04 | Ejecutar una vez un script de migración |
| [Láser sin «host activo» global](#láser-sin-host-activo-global) | 2026-10-05 | Si usas la API del láser desde fuera, enviar siempre `host` |
| [Cotizador convertido en plugin](#cotizador-convertido-en-plugin) | anterior a octubre | Instalar el plugin; los datos se conservan |

## Identidad estable de máquinas

Desde el **2026-10-04** (commit `feat(auth): stable machine identity`) cada Marlin y cada láser/CNC registrado tiene un **identificador interno** (`mch_` seguido de 16 caracteres hexadecimales), en lugar de depender de su dirección (`/dev/ttyUSBx` o IP), que cambia.

Los registros de Marlin y láser/CNC reciben ese identificador **automáticamente** al cargarse. Pero las **referencias que otros archivos guardaban por dirección** (reglas LED, alertas, anuncios, cámaras, historial) hay que reescribirlas con un script. **NOPAL no lo ejecuta por sí solo**: ningún código del servidor lo invoca.

### Qué hace el script

1. Asigna el identificador interno a cada Marlin y láser/CNC registrados y captura las anclas de red que falten (la **MAC** sale de la tabla ARP del servidor).
2. Reescribe las referencias guardadas por dirección a su identificador interno. Solo usa la dirección **actual** del registro como correspondencia válida.
3. Las referencias **sin contraparte** (direcciones que hoy no son de ninguna máquina registrada) **se descartan**; nunca se reasignan solas a otra máquina. En configuración (reglas LED, alertas) se borra la entrada; en registros históricos solo se borra el vínculo y se conserva el resto.
4. Antes de escribir cada archivo que cambie, **lo copia** a `backups/machine-identity-<fecha>/`.

Es **idempotente**: una segunda ejecución no cambia nada.

### Cómo ejecutarlo

Desde la carpeta de NOPAL, con su entorno virtual.

1. **Detén NOPAL**: el servidor también escribe esos registros.

```bash
sudo systemctl stop nopal
```

2. **Simulación** (por defecto no escribe nada). Revisa el informe que imprime:

```bash
.venv/bin/python scripts/migrate_machine_identity.py
```

3. **Aplicar**, con respaldo previo:

```bash
.venv/bin/python scripts/migrate_machine_identity.py --apply
```

Opcionalmente, `--esp420` consulta (solo lectura) a cada placa de red sin `chip_id` para guardar ese dato complementario como ancla:

```bash
.venv/bin/python scripts/migrate_machine_identity.py --apply --esp420
```

4. **Arranca NOPAL** de nuevo:

```bash
sudo systemctl start nopal
```

:::tip Para que la MAC se capture
Las placas de red deben estar **encendidas** y NOPAL debe haberlas contactado hace poco, para que aparezcan en la tabla ARP del servidor.
:::

## Láser sin «host activo» global

Desde el **2026-10-05** (commit `feat(laser): retire global active laser host`), NOPAL ya no guarda un «láser seleccionado» en la memoria del servidor.

**Antes:** una sola máquina «activa», compartida por todas las sesiones. Si otra sesión o pestaña cambiaba de máquina, pausar, cancelar o formatear la SD podía ir a la máquina equivocada.

**Ahora:**

- Se retiraron `GET` y `POST /api/laser/host` y la IP fija por omisión.
- Las **25 rutas** de láser que antes usaban el host global **exigen `host`**. Sin él responden **400** antes de autorizar, leer archivos o tocar una máquina.
- El panel guarda la máquina elegida por sección (Láser/CNC) **en el navegador**, por identificador interno, y envía `host` en todas las llamadas.

**Si llamas a la API del láser desde un script o un plugin**, añade siempre el parámetro `host`.

## Cotizador convertido en plugin

El Cotizador **ya no es parte del core**: es un plugin. Sus datos (`pricing_config.json`, `quotes_registry.json` y la caché `uploads/.pricing_cache/`) se siguen guardando en la **raíz de la instalación**, a propósito, para que instalar el plugin sobre una instancia que ya tenía el Cotizador integrado **conserve el mismo historial sin migración manual**.

Instala el plugin desde la Galería y reinicia NOPAL. Ver su [ficha](/03-plugins/cotizador).

## Antes de cualquier actualización

1. Haz un [respaldo de configuración](/02-administracion/respaldos) y copia aparte tu biblioteca (`uploads/`).
2. Detén los trabajos activos: la actualización desde la interfaz se bloquea si los hay.
3. Revisa el [historial de cambios](./changelog.md) entre tu versión y la nueva. **Los commits no marcan de forma sistemática los cambios incompatibles** (hoy no hay ninguno marcado, y el cambio del láser descrito arriba lo era), así que esta página es la referencia.
