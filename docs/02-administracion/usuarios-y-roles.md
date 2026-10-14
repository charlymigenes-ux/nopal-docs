---
title: Usuarios y roles
sidebar_label: Usuarios y roles
sidebar_position: 3
audience: admin
type: explanation
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
---

# Usuarios y roles

NOPAL exige iniciar sesión. Hay **dos roles** y no existe jerarquía entre ellos: cada acción decide qué rol la permite.

| Rol en la interfaz | Valor interno (API y `auth_users.json`) | Para qué sirve |
|---|---|---|
| Administrador | `admin` | Gestionar usuarios, dar de alta y baja máquinas, instalar plugins, respaldos y ajustes del sistema |
| Operador | `operador` | Uso diario de las máquinas |

:::note
El rol de operador se guarda como **`operador`**, no `operator`. Importa si lees `auth_users.json` o la API.
:::

## Cuentas

- **Primera cuenta.** En una instalación sin usuarios, la pantalla *Configuración inicial* crea el primer administrador. Solo funciona una vez: mientras `auth_users.json` esté vacío.
- **Contraseñas.** Mínimo **8 caracteres**. Se guardan con PBKDF2-HMAC-SHA256 y sal; nunca en claro.
- **Gestión.** Los administradores crean, listan, borran usuarios, cambian roles y restablecen contraseñas desde **Configuración → Usuarios**.
- **Último administrador.** NOPAL **rechaza borrar al último administrador** para que no te quedes sin acceso.
- **Cambios inmediatos.** El rol se vuelve a leer del registro de usuarios **en cada petición**. Si degradas o eliminas una cuenta, el efecto es inmediato, aunque esa persona tenga la sesión abierta.

## Qué puede hacer cada rol

La referencia completa, ruta por ruta, está en la [API REST del core](../06-referencia/api-rest-core). Resumen por área:

| Área | Operador | Administrador |
|---|:-:|:-:|
| Ver el estado de las máquinas y del sistema | ✅ | ✅ |
| Iniciar, pausar, reanudar y cancelar trabajos | ✅ | ✅ |
| Mover el cabezal, hacer *home* y ajustar temperaturas | ✅ | ✅ |
| Biblioteca de modelos y G-code (subir, mover, renombrar, borrar) | ✅ | ✅ |
| Cola e impresiones programadas de Klipper | ✅ | ✅ |
| Usar NOPAL Intelligence (preguntar) | ✅ | ✅ |
| Ver los registros (logs) | ✅ | ✅ |
| Probar la conexión de una máquina ya registrada | ✅ | ✅ |
| **Consola**: enviar comandos G-code o GRBL | ❌ | ✅ |
| **Macros** de Klipper: ejecutarlos | ❌ | ✅ |
| **Potencia del láser y husillo** (M3, M4, S…) | ❌ | ✅ |
| Escribir `printer.cfg`, reiniciar Klipper o su firmware | ❌ | ✅ |
| Parámetros `$$` de GRBL | ❌ | ✅ |
| Formatear la tarjeta SD de un láser | ❌ | ✅ |
| Descubrir máquinas en la red | ❌ | ✅ |
| **Dar de alta y de baja** máquinas (todas las marcas, láser y CNC) | ❌ | ✅ |
| Gestionar usuarios | ❌ | ✅ |
| Galería de plugins: ver, instalar, actualizar y quitar | ❌ | ✅ |
| Respaldos de configuración | ❌ | ✅ |
| Control del sistema, actualizar NOPAL y cambiar el nivel de registros | ❌ | ✅ |
| Configuración de NOPAL Intelligence | ❌ | ✅ |

:::info Dos mecanismos conviven
Muchas rutas comprueban solo el rol. Un grupo creciente (consola, macros, potencia del láser, movimiento, temperatura, inicio y control de trabajos en Marlin, ajustes GRBL, reinicio de Klipper) consulta además una **política de autorización central** que decide por acción y recurso. La referencia indica cuál usa cada ruta en la columna *Política*. La migración de las rutas restantes está en curso: **algunas acciones que la política prevé solo para administradores todavía no se comprueban en todas las rutas** (por ejemplo, borrar archivos de la SD de un láser hoy lo permite cualquier sesión).
:::

## Contraseña perdida

Un administrador puede restablecer la contraseña de cualquier usuario. **No existe todavía un procedimiento documentado** para recuperar el acceso cuando se pierde la contraseña del único administrador. *(Pendiente de verificar con el autor.)*
