---
title: Network, ports and HTTPS with a reverse proxy
sidebar_label: Network and HTTPS
sidebar_position: 8
audience: admin
type: how-to
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
source_commit: "4346f72"
---

# Network, ports and HTTPS with a reverse proxy

NOPAL does not encrypt its traffic. This page explains which ports it uses and how to put HTTPS in front of it with a reverse proxy. First, read [Security and internet exposure](./seguridad).

## Ports

| Port | Who | Notes |
|---|---|---|
| **8420** (TCP) | NOPAL | HTTP, on all interfaces (`0.0.0.0`). Changed at install time; see [Installation](./instalacion#change-the-port) |
| **7125–7127** | Moonraker | NOPAL queries it for Klipper printers. Do not expose it outside your network |

## What a proxy needs

Verified in the code:

- The browser talks to NOPAL with **plain HTTP requests**. The interface opens no WebSockets or *Server-Sent Events* to the server, so the proxy needs no special configuration for them.
- The session cookie is `SameSite=Lax` and NOPAL does **not** mark it `Secure`. It works behind HTTPS, but it is still sent over HTTP if someone reaches the direct port: close that port to the outside.
- NOPAL does not limit the size of files you upload to the [library](../01-usuario/biblioteca). If your proxy has a body limit (in Nginx, 1 MB by default), raise it or uploads will fail.
- `/plugins-static` is public: **block it in the proxy** (see Security).
- The login attempt limit counts by the address NOPAL sees. With a proxy, that is the proxy's.

## Caddy example

:::note Illustrative example
The configurations in this section are generic examples. The NOPAL project has not tested or maintained them; adapt them and check your proxy version.
:::

```caddyfile
nopal.example.com {
	@blocked path /plugins-static/*
	respond @blocked 404
	reverse_proxy 127.0.0.1:8420
}
```

Caddy obtains and renews the certificate automatically if the domain points to your server and ports 80 and 443 are reachable.

## Nginx example

```nginx
server {
    listen 443 ssl;
    server_name nopal.example.com;
    # ssl_certificate and ssl_certificate_key: those of your certificate

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

## After configuring it

1. Close outside access to port 8420 (firewall) so only the proxy can reach it.
2. Open it over `https://` and check that you can sign in.
3. Check that `https://your-domain/plugins-static/` answers 404.
