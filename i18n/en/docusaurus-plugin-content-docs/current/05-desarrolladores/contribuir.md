---
title: Contributing
sidebar_label: Contributing
sidebar_position: 8
audience: developer
type: how-to
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
source_commit: "4346f72"
---

# Contributing

NOPAL grows through people testing it on real hardware, reporting what fails and sending fixes. This page summarizes the core repository's `CONTRIBUTING.md`.

## Ways to contribute

- **Report a bug.** Open an *issue* with your operating system, Python version, the machine and firmware involved and the steps to reproduce.
- **Suggest a feature.** Describe the problem it solves, not just the feature.
- **Register hardware for testing.** If you have a printer, laser, CNC or board NOPAL does not support yet, the project has a collaboration page where you can register it.
- **Send a pull request**: fixes, new machine drivers, plugin improvements, documentation and translations.

## Set up the environment

See [Development environment and tests](./entorno-y-pruebas.md).

## Pull requests

1. Fork and create a branch from `main` (for example `fix/laser-jog-offset` or `feat/flashforge-driver`).
2. Keep the change **focused**: one fix or feature per PR.
3. Check that `pytest` passes locally.
4. Describe **what** changes and **why**, and link the *issue* if there is one.
5. A maintainer will review and may ask you for changes.

## Code style

Follow the conventions of the file you are editing: each brand's modules follow the same shape, and the frontend follows the existing theme system. When in doubt, prefer consistency with neighboring code over introducing a new pattern. Do not add a bundler or a linter without agreeing on it first.

User-facing text, comments and log messages are in **Mexican Spanish**; identifiers are in English.

## If your change alters something public

If your change modifies a route, a manifest field, a WebSocket message, a setting or the role an action requires, **update the affected documentation** or open a documentation *issue* linked in the PR. See the [documentation standard](../00-inicio/estandar-de-documentacion), section 17.

## License

By contributing you agree your contribution is licensed under **GPLv3**, the project's license.

## Security

Do not open a public issue for a security problem. See [Security](../02-administracion/seguridad.md#report-a-vulnerability).
