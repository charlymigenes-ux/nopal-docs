---
title: Primer acceso
sidebar_label: Primer acceso
sidebar_position: 1
audience: user
type: tutorial
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
---

# Primer acceso

En este tutorial abres NOPAL por primera vez, creas tu cuenta de administrador y entras. Necesitas que NOPAL ya esté [instalado](../02-administracion/instalacion) y funcionando.

## 1. Abre NOPAL en el navegador

Desde cualquier equipo de tu red local, abre:

```text
http://<ip-del-equipo>:8420
```

Sustituye `<ip-del-equipo>` por la dirección del equipo donde instalaste NOPAL. El instalador la muestra al terminar. Si cambiaste el puerto al instalar, usa el tuyo.

## 2. Crea la cuenta de administrador

Si es la primera vez, verás **Configuración inicial** con el mensaje *"Es la primera vez que se abre NOPAL — crea la cuenta de administrador."*

1. Escribe un **usuario**.
2. Escribe una **contraseña** de al menos **8 caracteres**.
3. Repítela en **Confirmar contraseña**.
4. Pulsa **Crear cuenta**.

Si las contraseñas no coinciden verás *"Las contraseñas no coinciden"*.

**Comprueba:** entras directamente al Panel de control, sin pasar por el inicio de sesión.

:::info Solo una vez
Esta pantalla solo aparece mientras no exista ningún usuario. La primera persona que la complete queda como administrador de la instalación.
:::

![Formulario de configuración inicial para crear la cuenta de administrador](/img/capturas/es/acceso-primer-arranque-1.2.0-alpha.1.png)

*Captura de NOPAL 1.2.0-alpha.1 · interfaz en español · tema NOPAL Style.*

## 3. Entra en otras ocasiones

Desde ahora verás **Iniciar sesión**: escribe tu usuario y contraseña y pulsa **Entrar**.

- Con credenciales incorrectas verás *"Usuario o contraseña incorrectos"*.
- Tras **5 intentos fallidos en 5 minutos** NOPAL responde *"Demasiados intentos; vuelve a intentarlo en unos minutos"*.

![Pantalla de inicio de sesión de NOPAL](/img/capturas/es/acceso-login-1.2.0-alpha.1.png)

*Captura de NOPAL 1.2.0-alpha.1 · interfaz en español · tema NOPAL Style.*

## 4. Elige el idioma

NOPAL está disponible en **español, inglés, portugués (Brasil), francés y alemán**. El selector de idioma está en la pantalla de acceso y, una vez dentro, en la barra superior y en **Configuración → General**.

## Pantallas compatibles

NOPAL está pensado para **escritorio y tablet**. En pantallas de celular, por debajo de **640 px de ancho**, el panel no se abre: aparece el aviso *«NOPAL funciona mejor en escritorio o tablet»*, que sugiere otra alternativa para usar desde el teléfono. En una tablet, el menú lateral se oculta en un cajón que se abre con el botón de menú.

## Qué sigue

- [Conectar tu primera máquina](./conectar-primera-maquina)
- Si necesitas más cuentas, un administrador las crea en **Configuración → Usuarios**. Consulta [Usuarios y roles](../02-administracion/usuarios-y-roles).
