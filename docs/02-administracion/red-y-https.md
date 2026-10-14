---
title: Red, puertos y HTTPS con proxy inverso
sidebar_label: Red y HTTPS
sidebar_position: 8
audience: admin
type: how-to
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
---

# Red, puertos y HTTPS con proxy inverso

NOPAL no cifra su tráfico. Esta página explica qué puertos usa y cómo poner HTTPS delante con un proxy inverso. Antes, lee [Seguridad y exposición a internet](./seguridad).

## Puertos

| Puerto | Quién | Notas |
|---|---|---|
| **8420** (TCP) | NOPAL | HTTP, en todas las interfaces (`0.0.0.0`). Se cambia al instalar; ver [Instalación](./instalacion#cambiar-el-puerto) |
| **7125–7127** | Moonraker | Lo consulta NOPAL para las impresoras Klipper. No lo expongas fuera de tu red |

## Qué necesita un proxy

Lo verificado en el código:

- El navegador habla con NOPAL por **peticiones HTTP normales**. La interfaz no abre WebSockets ni *Server-Sent Events* hacia el servidor, así que el proxy no necesita configuración especial para ellos.
- La cookie de sesión es `SameSite=Lax` y NOPAL **no** la marca como `Secure`. Funciona detrás de HTTPS, pero sigue enviándose en HTTP si alguien accede por el puerto directo: cierra ese puerto al exterior.
- NOPAL no limita el tamaño de los archivos que subes a la [biblioteca](../01-usuario/biblioteca). Si tu proxy tiene un límite de cuerpo (en Nginx, 1 MB por defecto), súbelo o las subidas fallarán.
- `/plugins-static` es público: **bloquéalo en el proxy** (ver Seguridad).
- El límite de intentos de login cuenta por la dirección que NOPAL ve. Con proxy, será la del proxy.

## Ejemplo con Caddy

:::note Ejemplo orientativo
Las configuraciones de esta sección son ejemplos genéricos. El proyecto NOPAL no las ha probado ni las mantiene; adáptalas y comprueba tu versión del proxy.
:::

```caddyfile
nopal.ejemplo.com {
	@bloqueado path /plugins-static/*
	respond @bloqueado 404
	reverse_proxy 127.0.0.1:8420
}
```

Caddy obtiene y renueva el certificado automáticamente si el dominio apunta a tu servidor y los puertos 80 y 443 son accesibles.

## Ejemplo con Nginx

```nginx
server {
    listen 443 ssl;
    server_name nopal.ejemplo.com;
    # ssl_certificate y ssl_certificate_key: los de tu certificado

    client_max_body_size 500m;

    location /plugins-static/ { return 404; }

    location / {
        proxy_pass http://127.0.0.1:8420;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Después de configurarlo

1. Cierra el acceso exterior al puerto 8420 (cortafuegos), de modo que solo el proxy lo alcance.
2. Entra por `https://` y comprueba que inicias sesión.
3. Comprueba que `https://tu-dominio/plugins-static/` responde 404.
