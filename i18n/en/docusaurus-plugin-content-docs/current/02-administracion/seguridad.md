---
title: Security and internet exposure
sidebar_label: Security
sidebar_position: 4
audience: admin
type: explanation
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
source_commit: "a5853dc"
---

# Security and internet exposure

NOPAL controls real machines: printers, lasers, CNC and, with plugins, relays. Unauthorized access can mean someone starting a machine. This page describes how it is protected **today** and what you must do.

## What NOPAL does

| Topic | Verified behavior |
|---|---|
| **Authentication** | Signed cookie session (`itsdangerous`), `SameSite=Lax`. Without a session, almost the whole API answers 401 |
| **Session secret** | Generated once and stored in `.session_secret`, so sessions survive a restart. Never included in backups |
| **Passwords** | PBKDF2-HMAC-SHA256 with a salt; minimum 8 characters |
| **Roles** | `admin` and `operador`, re-read from the registry on every request |
| **Login attempt limit** | 5 failed attempts in 300 seconds, then a 429 response. Counted **in memory**, by the client address NOPAL sees, and reset when the service restarts |
| **Backups** | If they include users or the AI key they are encrypted (see [Backups](./respaldos)) |
| **Public routes** | Only the main page, first-run setup, login and logout, plus some external-integration routes that use their own authentication. See the [reference](../06-referencia/api-rest-core) |

## What NOPAL does not do

:::warning Read this before exposing NOPAL
None of these points is a hidden defect: they are limits of the current design.
:::

1. **It does not use TLS.** The service listens over HTTP on `0.0.0.0:8420`, on all interfaces. Passwords and the cookie travel unencrypted across your network.
2. **There is no token-based CSRF protection.** The mitigation is `SameSite=Lax` on the cookie.
3. **CORS is not configured**: same origin only.
4. **`/plugins-static` is public.** NOPAL serves the whole `plugins/` directory **without authentication** under `/plugins-static`. Anyone who can reach the port can read the code of the installed plugins and, if present, their `.git` folder. Plugins must not contain secrets.
5. **Plugins are not isolated.** They run inside the NOPAL process, with its same privileges. Install only plugins you trust. The permissions a plugin declares in its manifest are informational: no mechanism enforces them.
6. **The AI API key is stored in clear** in `ai_config.json`, in the NOPAL folder.
7. **The login limit may not tell clients apart.** It counts by the address NOPAL sees. Behind a reverse proxy, that address may be the proxy's, so several users would share one counter.
8. **The update trusts `origin`**: it downloads and runs whatever that repository contains.

## Recommendations

- **Do not expose NOPAL directly to the internet.** To reach it from outside your network use a **VPN** or a **reverse proxy with HTTPS**, such as Nginx or Caddy.
- If you use a reverse proxy, **block the `/plugins-static` path** there, or restrict it with authentication.
- Keep devices on a trusted local network. Moonraker and several printers are queried over the local network with their own access mechanisms.
- Give the **Operator** role to anyone who only needs to run machines.
- Protect the backup file and the NOPAL folder: `auth_users.json` contains password hashes and `ai_config.json` may contain an API key.

## Report a vulnerability

Do not open a public issue. Use the **Security** tab of the GitHub repository and the *Report a vulnerability* option, which opens a private advisory. The project is pre-1.0 and has no formal response time.
