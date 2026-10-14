---
title: Seguridad y exposición a internet
sidebar_label: Seguridad
sidebar_position: 4
audience: admin
type: explanation
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
---

# Seguridad y exposición a internet

NOPAL controla máquinas reales: impresoras, láseres, CNC y, con plugins, relés. Un acceso no autorizado puede significar que alguien ponga en marcha una máquina. Esta página describe cómo está protegido **hoy** y qué debes hacer tú.

## Lo que NOPAL hace

| Tema | Comportamiento verificado |
|---|---|
| **Autenticación** | Sesión por cookie firmada (`itsdangerous`), `SameSite=Lax`. Sin sesión, casi toda la API responde 401 |
| **Secreto de sesión** | Se genera una vez y se guarda en `.session_secret`, de modo que las sesiones sobreviven a un reinicio. No se incluye nunca en los respaldos |
| **Contraseñas** | PBKDF2-HMAC-SHA256 con sal; mínimo 8 caracteres |
| **Roles** | `admin` y `operador`, releídos del registro en cada petición |
| **Límite de intentos de login** | 5 intentos fallidos en 300 segundos y se responde 429. Se cuenta **en memoria**, por la dirección del cliente que NOPAL ve, y se reinicia con el servicio |
| **Respaldos** | Si incluyen usuarios o la clave de la IA se cifran (ver [Respaldos](./respaldos)) |
| **Rutas públicas** | Solo la página principal, el primer arranque, el login y el logout, más algunas rutas de integraciones externas que usan su propia autenticación. Ver la [referencia](../06-referencia/api-rest-core) |

## Lo que NOPAL no hace

:::warning Léelo antes de exponer NOPAL
Ninguno de estos puntos es un defecto oculto: son límites del diseño actual.
:::

1. **No usa TLS.** El servicio escucha por HTTP en `0.0.0.0:8420`, en todas las interfaces. Las contraseñas y la cookie viajan sin cifrar por tu red.
2. **No hay protección CSRF con token.** La mitigación es `SameSite=Lax` en la cookie.
3. **No hay CORS configurado**: solo mismo origen.
4. **`/plugins-static` es público.** NOPAL sirve todo el directorio `plugins/` **sin autenticación** en la ruta `/plugins-static`. Cualquiera que alcance el puerto puede leer el código de los plugins instalados y, si existe, su carpeta `.git`. Los plugins no deben contener secretos.
5. **Los plugins no están aislados.** Se ejecutan dentro del proceso de NOPAL, con sus mismos privilegios. Instala solo plugins en los que confíes. Los permisos que declara un plugin en su manifiesto son informativos: no los aplica ningún mecanismo.
6. **La clave de API de la IA se guarda en claro** en `ai_config.json`, en la carpeta de NOPAL.
7. **El límite de login puede no distinguir clientes.** Cuenta por la dirección que NOPAL ve. Detrás de un proxy inverso, esa dirección puede ser la del proxy, de modo que varios usuarios compartirían el mismo contador.
8. **La actualización confía en `origin`**: descarga y ejecuta lo que ese repositorio contenga.

## Recomendaciones

- **No expongas NOPAL directamente a internet.** Para acceder desde fuera de tu red usa una **VPN** o un **proxy inverso con HTTPS**, como Nginx o Caddy.
- Si usas un proxy inverso, **bloquea en él la ruta `/plugins-static`**, o restríngela con autenticación.
- Mantén los dispositivos en una red local de confianza. Moonraker y varias impresoras se consultan por la red local con sus propios mecanismos de acceso.
- Asigna el rol **Operador** a quien solo necesite operar máquinas.
- Protege el archivo de respaldo y la carpeta de NOPAL: `auth_users.json` contiene hashes de contraseña y `ai_config.json` puede contener una clave de API.

## Reportar una vulnerabilidad

No abras un *issue* público. Usa la pestaña **Security** del repositorio de GitHub y la opción *Report a vulnerability*, que abre un aviso privado. El proyecto es pre-1.0 y no tiene un plazo de respuesta formal.
