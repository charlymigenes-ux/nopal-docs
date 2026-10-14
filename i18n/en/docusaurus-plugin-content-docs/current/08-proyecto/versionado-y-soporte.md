---
title: Versioning and support
sidebar_label: Versioning and support
sidebar_position: 3
audience: reference
type: reference
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
source_commit: "4346f72"
---

# Versioning and support

## Current version

The core's `VERSION` file contains **`1.2.0-alpha.1`**. The project is under **active development**.

| Fact | Detail |
|---|---|
| Git tags | **None.** The repository has no tags |
| Published releases | **None.** The core's own `CHANGELOG.md` says there is no tagged release |
| `1.1.0` | Set in `VERSION` on **2026-07-15** (commit `release-1.1.0`), with no tag |
| `1.2.0-alpha` | The cycle began on **2026-07-16** (commit "begin 1.2.0 alpha cycle") |

A version badge was removed from the README because "there is no pre-release yet". The list of changes per version is in the [change history](./changelog.md), generated from the git history.

## What "alpha" means here

NOPAL changes **fast**: between 3 and 7 October 2026 there were **37 commits** (not counting merges). There is no compatibility guarantee between versions: the interface, state files and API routes may change. When a change requires user action, it is documented in [Migration](./migracion.md).

## Support

According to the project's security policy:

- Security fixes target **the latest version of the `main` branch**.
- **There is no long-term support branch.**
- There is no formal response time (small project, one maintainer).

:::note Inconsistency in the SECURITY.md text
The security policy describes NOPAL as "pre-1.0", while the version is `1.2.0-alpha.1`. It is worth clarifying what the numbering means before a release is published.
:::

## Python requirements

| Component | Python |
|---|---|
| NOPAL (core) | **3.9 or later**. CI tests 3.9 and 3.11 |
| A plugin | The core's, unless it declares `python_requires` (for example, `matriz-led` requires 3.10 or later) |

## Plugin versions

Each plugin has **its own version**, independent of NOPAL's (for example `arduino-accessories` 2.6.0 or `font-library` 0.5.1). `0.x` versions are preliminary. There is no plugin API version: see [RFC-0001](/07-rfc/rfc-0001-api-de-plugins-versionada).

## Documentation versioning

While NOPAL does not tag versions, the site publishes **a single version**, the one describing the `main` branch ("Next"). Each page declares which commit it was verified against. When the first tagged version is published, its documentation will be frozen and the version selector enabled (Standard §8).
