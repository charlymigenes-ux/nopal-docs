---
title: Update and uninstall
sidebar_label: Update and uninstall
sidebar_position: 2
audience: admin
type: how-to
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
source_commit: "4346f72"
---

# Update and uninstall

## Update

NOPAL is updated with `git`. There are two ways.

:::caution Safety notice when updating from the interface
Before updating, NOPAL shows *"Stop all machines before continuing"* and requires ticking a confirmation box before **Update and restart**. If the restart is not automatic or installing dependencies fails, the screen tells you. See [System control](./control-del-sistema).
:::

### From the terminal

```bash
cd ~/nopal
```

```bash
git pull
```

```bash
./install.sh
```

```bash
sudo systemctl restart nopal
```

Running `install.sh` again reinstalls the Python dependencies and regenerates the service. Your data is not touched.

### From the interface

In **Settings → Updates** (administrators only) NOPAL shows the installed version and whether an update is available. Applying it runs `git pull --ff-only` on the remote branch and reinstalls the Python dependencies if needed.

The update is **blocked** in these cases (the messages are shown in Spanish):

| Situation | Message |
|---|---|
| There are active jobs on the machines | "Actualización bloqueada: hay trabajos activos. Deténlos de forma segura antes de continuar." (update blocked: there are active jobs) |
| There are unsaved local changes in the NOPAL folder | "Hay cambios locales sin guardar en el servidor. Guárdalos o descártalos antes de actualizar." (unsaved local changes) |

`--ff-only` means only straight-line updates are applied; if your local copy diverged from the repository, the update fails instead of merging.

:::info Trust in the origin
The update downloads and runs whatever `origin` contains. Use it only if you trust that repository.
:::

## Uninstall

Run the uninstaller **as your regular user** (not root) from the NOPAL folder:

```bash
./uninstall.sh
```

### What it does by default

- Stops, disables and removes the `nopal.service` unit, including its systemd *overrides*.
- Deletes the `.venv/` virtual environment.
- **Keeps your data.** If you reinstall in the same folder, you will find it as you left it.
- Does not touch Klipper, Moonraker, crowsnest or any other service.

Before acting it shows a list of what it will remove and asks you to type `DESINSTALAR` to continue. Any other answer cancels.

### Options

| Option | Effect |
|---|---|
| `--dry-run` (or `--simular`) | Shows what it would do, touching nothing |
| `--purgar` | Also **deletes user data**. Asks you to type `PURGAR` |
| `--si` (or `--yes`, `-y`) | Does not ask. For scripts; it does **not** replace `--purgar`, which must be requested separately |

```bash
./uninstall.sh --dry-run
```

### What counts as user data

With `--purgar`, these are deleted, among others:

- Your model and G-code library (`uploads/`), previews and backups.
- Machine registries (`*_registry.json`) and the laser/CNC history.
- Users (`auth_users.json`) and the session secret (`.session_secret`).
- Quotes, pricing and Spoolman settings.
- NOPAL Intelligence configuration and conversations.
- Installed plugins (`plugins/`) and their state (`data/`).
- Application logs (`logs/`).

The exact list is printed before you confirm.

### Automatic backup when purging

With `--purgar`, before deleting, `~/nopal-config-<date>.tar.gz` is created with the **configuration**: machine registries, users, pricing, settings and `data/`. It gets `600` permissions because it contains password hashes and the AI API key.

It **does not include** the library (`uploads/`), previews, backups, logs or cloned plugins: they may weigh gigabytes (the library) or recover on their own (the gallery clones plugins again). If you want to keep the library, copy it first.

:::danger This cannot be undone
After `--purgar`, only the configuration archive remains as a backup. Use `--dry-run` first.
:::

### Finish removing the program

The uninstaller does not delete the code folder. If you also want to remove it, the script tells you the command when it finishes.

If a service step fails (usually because `sudo` is unavailable), the final summary lists the commands to run by hand.
