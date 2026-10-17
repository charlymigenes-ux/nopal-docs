---
title: Documentation architecture
sidebar_label: Documentation architecture
audience: developer
type: reference
status: implemented
verified_against: "n/a (normative document)"
source_commit: "f0c1f27"
---

# NOPAL Documentation Architecture

**Version:** 1.1 (approved) · **Date:** 2026-10-14

**Depends on:** the [Documentation Standard](./estandar-de-documentacion.md) v1.6

It defines **what documentation exists, where it lives, where each page comes from and in what order it is built**.
The writing and review rules are in the Standard; here they are only applied.

---

## 1. Principles of documentation architecture

1. **One page, one audience, one type** (Standard §3).
2. **Every fact has an owner**: core code, plugin repository or documentation repository. The central documentation does not copy; it links or generates.
3. **What is generated is not written by hand**: the API reference, plugin sheets and the manifest matrix come from code and manifests.
4. **Current and proposed never mix**: what is proposed lives in `07-rfc/`.
5. **What is consulted most is written first**, not what is easiest.

## 2. The four content origins

| Origin | What it provides | Mechanism |
|---|---|---|
| **Written** | Guides, tutorials, explanations | Markdown in `nopal-docs`, reviewed by PR |
| **Generated from the core** | REST reference (static analysis, with each route's role), change history | Scripts in CI against `nopal@main` |
| **Aggregated from plugins** | Sheet, API and troubleshooting of each plugin | CI script that reads each repo's `nopal-plugin.json` and `docs/` |
| **Linked** | The app's Help Center, `NOPAL_DESIGN_SYSTEM_v1.md`, source code | Link only; no copy (Standard §10) |

Verified in the audit: FastAPI does not disable `/docs` or `/openapi.json` (`main.py` defines no `docs_url` or `openapi_url`),
so generating the REST reference is feasible without touching the core. *(Closes open item C.1 of the Standard.)*

## 3. Site map

Page prefix: **[W]** written · **[G]** generated · **[A]** aggregated from a plugin. Status per Standard §5.

```
nopal-docs
│
├── 00 Start
│   ├── What NOPAL is (and is not)                       [W] explanation
│   ├── Live demo and screenshots                        [W]
│   ├── Choose where to start (user/admin/dev)           [W]
│   └── ES/EN glossary                                   [W] reference
│
├── 01 User
│   ├── First steps
│   │   ├── Your first start and guided tour             [W] tutorial
│   │   └── Connect your first machine                   [W] tutorial
│   ├── Dashboard                                        [W]
│   ├── 3D printers (one guide per brand)
│   │   ├── Klipper / Moonraker
│   │   ├── Standalone Marlin (USB and MKS WiFi)
│   │   ├── Bambu Lab · Elegoo · FlashForge
│   │   └── Unified device card and camera
│   ├── Laser and CNC (GRBL): detail view, SD, G-code
│   ├── Model and G-code library                         [W]
│   ├── G-code editor                                    [W]
│   ├── Console                                          [W]
│   ├── Job history                                      [W]
│   ├── Plugin gallery: install, enable, remove          [W]
│   ├── NOPAL Intelligence (AI)                          [W] status: experimental
│   ├── General settings, language and theme             [W]
│   └── Troubleshooting (by brand and by symptom)        [W]
│
├── 02 Administration
│   ├── Installation (Linux/systemd), requirements       [W]
│   ├── Update and uninstall (with/without `--purgar`)   [W]
│   ├── Users and roles (Admin / Operator)               [W]
│   ├── Security and internet exposure                   [W]
│   ├── Network and ports (8420), reverse proxy, HTTPS   [W]
│   ├── Logs: viewer, levels, rotation                   [W]
│   ├── Backups and restore                              [W]
│   ├── Machine identity and migration                   [W]
│   ├── Plugins: manual dependencies and minimum Python  [W]
│   └── Diagnostics ("About NOPAL")                      [W]
│
├── 03 Plugins
│   ├── What a plugin is and which exist                 [W]
│   ├── Plugin matrix (manifest table)                   [G]
│   ├── Sheet: matriz-led · arduino-accessories ·
│   │   camera-viewer · spoolman · cotizador ·
│   │   shape-creator · svg-toolkit · font-library       [A]
│   └── Laser/CNC design flow (shape→svg→font)           [W] explanation
│
├── 04 Hardware
│   ├── Compatibility matrix (brand × function)          [W] verified against drivers
│   ├── Klipper/Moonraker, Marlin, GRBL, Bambu, Elegoo, FlashForge
│   ├── ESP32/Arduino: accessory firmware, OTA/USB
│   ├── LED panels: iPixel Color (BLE via ESP32), FK-8Wa (TCP)
│   └── Cameras: MJPEG, ONVIF, USB
│
├── 05 Developers
│   ├── NOPAL architecture (api/ + services/, state JSON)  [W] explanation
│   ├── Development environment and tests                [W]
│   ├── Add a device driver                              [W]
│   ├── Plugin system (implemented)
│   │   ├── Structure and `nopal-plugin.json` manifest
│   │   ├── Backend: `router`, loading and limits
│   │   ├── Frontend: `NopalPluginRegistry`, mount/unmount
│   │   ├── Camera card integration (`NopalCameraCard`) — convention
│   │   ├── `AI_TOOLS` — experimental
│   │   ├── Minimum Python and `python_requires`
│   │   └── Publish to the Gallery (`plugin_catalog.json`)
│   ├── Tutorial: your first plugin ("Hello NOPAL")      [W]
│   ├── Design system (link to NOPAL_DESIGN_SYSTEM_v1)
│   └── Contributing (CONTRIBUTING, style, PR)
│
├── 06 Reference
│   ├── Core REST API (static analysis)                  [G]
│   ├── Each plugin's API                                [A]
│   ├── State and configuration JSON files               [G/W]
│   ├── Roles and authorization per endpoint             [G]
│   ├── Environment variables, scripts, CLI              [W]
│   ├── Error codes                                      [W]
│   └── Real time: laser WebSocket  [W]
│
├── 07 RFC
│   ├── Index and process
│   ├── Versioned plugin API
│   ├── Permissions with enforcement
│   ├── Per-plugin dependencies
│   ├── Core↔plugins event bus
│   ├── Single source of plugin metadata
│   ├── SDK and official template
│   └── RFC-DOC-001: Help Center in Markdown
│
└── 08 Project
    ├── Roadmap
    ├── Changelog (from 1.2.0-alpha.1)
    ├── Migration guides
    ├── Versioning and support
    ├── Security (policy and reporting)
    ├── License (GPL-3.0) and credits
    └── Support NOPAL
```

### Build status (2026-10-14)

The map above is the **plan**. This is what exists today:

| Section | Done | Pending |
|---|---|---|
| 00 Start | What NOPAL is, glossary, standard and architecture | Demo and screenshots (there are no screenshots yet) |
| 01 User | First access, connect the first machine, dashboard, printers (Klipper, Marlin, Bambu/Elegoo/FlashForge), laser/CNC, library, G-code editor, console, history, plugin gallery, AI, general settings, Help Center, troubleshooting | Screenshots |
| 02 Administration | Installation, update and uninstall, users and roles, security, logs, backups, system control, network and HTTPS, machine identity, diagnostics | — |
| 03 Plugins | Index, matrix, 8 sheets (generated) and laser/CNC design flow | Usage guide for each plugin |
| 04 Hardware | Compatibility matrix | One page per family, ESP32/Arduino, LED panels, cameras, list of tested models |
| 05 Developers | Architecture, environment and tests, 5 plugin system pages, tutorial, contributing | Adding a driver, design system |
| 06 Reference | Core REST API (generated), state files, roles by action, environment variables and commands | Error codes, real time |
| 07 RFC | 7 RFCs as drafts | — |
| 08 Project | Roadmap, change history (generated), versioning, migration, license | — |


## 4. Where each piece lives

| Piece | Repository | Maintained by | How it reaches the site |
|---|---|---|---|
| Site and central content (01, 02, 04, 05, 07, 08) | `nopal-docs` | Documentation owner | Direct |
| Core REST reference | `nopal` (code) | Endpoint author | Static analysis script in CI |
| Each plugin's sheet and API | plugin repo | Plugin maintainer | Script reads manifest and `docs/` in CI |
| In-app Help Center | `nopal` (`app.js`, `translations*.js`) | Core maintainer | Link only |
| Screenshots | A local instance of `nopal@main` (the demo is outdated) | Documentation owner | Generated, versioned with the page |

Copying content by hand between repos is avoided: each piece is read in CI from its repo and the build fails if the origin does not meet the Standard.

## 5. Structure of the `nopal-docs` repository

It follows the Docusaurus convention; what is stable is the separation by responsibility.

```
nopal-docs/
├── docs/                         ES (source), pages by section 00–08
├── i18n/en/…/current/            EN translations (same path as in docs/)
├── static/img/                   logo and favicon
├── src/                          StatusBanner, accessible code themes, accessibility module
├── examples/hello-nopal/         tutorial plugin: the tested code
├── plugin-docs/<repo>/docs/      draft docs/ for each plugin
├── auditoria/                    tested-hardware form
├── generated/                    script output (not versioned)
├── scripts/
│   ├── fetch-sources            clones or updates (read-only) the in-scope repos
│   ├── extract_routes.py        routes by static analysis (AST), with each one's access
│   ├── gen-docs                 REST reference, matrix and plugin sheets; api.md per plugin
│   ├── gen-changelog            change history from the core's full git history
│   ├── gen-tutorial-en          EN version of the tutorial from the tested files
│   ├── check-frontmatter        status, audience, type and verification
│   ├── check-scope              nothing excluded or deferred on public pages
│   ├── check-examples           the tutorial's code matches the tested code
│   ├── check-manifests          manifest / catalog / JS coherence (warns)
│   ├── check-routes             cited routes vs. code; generated reference up to date
│   ├── check-i18n               ES/EN parity
│   ├── check-external-links     external URLs (warns)
│   ├── report-health            documentation health metrics
│   └── data/                    scope (scope.json) and verified plugin notes
├── templates/                   tutorial, how-to, reference, explanation, plugin, endpoint, hardware, rfc
└── README.md
```

## 6. Existing sources and their destination

Map of what is reused, and under what condition (Standard §4.5: they are inputs, not a source of truth).

| Current document | Lines | Destination | Action |
|---|---|---|---|
| `docs/manual/NOPAL_Manual_Usuario.md` (14 chapters) | 445 | Section 01 | Split by chapter into pages; verify against the current UI; chapters 3, 4, 6 and 10 are the most likely to be outdated |
| `docs/SDD.md` v0.44 | 2106 | Sections 05 and 07 | Its structure already distinguishes `CURRENT` and `PROPOSED`: sections 5–21 feed 05; 22–28 feed 07. Verify every claim |
| `docs/NOPAL_INTELLIGENCE.md` | 292 | 01 (user) and 05 | Separate usage from architecture; mark the status |
| `docs/MODO_IA_PLAN.md` | 215 | 07 RFC | It is a plan, not a feature |
| `README.md` / `README.es.md` | 363 / 339 | 00 and installation | Source of the overview; the GitHub README becomes a summary with a link |
| `NOPAL_DESIGN_SYSTEM_v1.md` | 169 | 05 | Link; the site adopts its tokens |
| `SECURITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `CHANGELOG.md` | 26 / 37 / 29 / 7 | 08 | Keep in the core repo and mirror on the site; rebuild the changelog |
| `AGENTS.md`, `CLAUDE.md` | 662 / 102 | **Not published** | They are working notes and guidance for agents. They may hint at architecture, but are not official documentation |

## 7. Documentation inside each plugin

Each plugin delivers what Standard §6.2 requires. Starting situation (from the audit): today the 8 repos have only `README.md`.

| Plugin | Backend | Docs `api.md` | Main gap |
|---|---|---|---|
| matriz-led | 40 routes | Yes | Has `specs/` and `PROTOCOL.md` (referenced): reuse. Dual hardware (BLE and TCP). Version drift |
| arduino-accessories | 43 routes | Yes | `firmware/` and telemetry 2.3: hardware page. Sensitive flashing permission |
| camera-viewer | 32 routes | Yes | Also document `NopalCameraCard` as a contract with the core |
| spoolman | 17 routes | Yes | Document the coupling with cotizador and Spoolman's Docker |
| cotizador | 18 routes | Yes | UI section `pricing` ≠ id; use of `pricing_config.json` |
| shape-creator | — | Not applicable | Sheet and usage guide only |
| svg-toolkit | — | Not applicable | Sheet and usage guide only |
| font-library | — | Not applicable | Sheet, guide and permissions (4 declared) |

## 8. Maintenance flows

| Trigger | Response |
|---|---|
| Code PR that changes a route, field or role | The PR links the documentation issue/PR (Standard §17); the routes CI detects it |
| New version of a plugin | The plugin updates its `docs/` and changelog; `nopal-docs` CI regenerates the sheet and revalidates versions |
| NOPAL release | Freeze the site version (once the first tag exists), regenerate screenshots, publish migration if there is a *Breaking* change |
| Interface change | Regenerate affected screenshots and review that section's guides |
| New idea with no code | RFC in `07` |

## 9. Phased build plan

| Phase | Deliverable | Done criterion |
|---|---|---|
| **F0** | Standard + Architecture + audits (done) | Approved |
| **F1** | `nopal-docs` skeleton: Docusaurus ES/EN, templates, front matter, theme with the design system, CI with links and front matter | Empty site published on GitHub Pages |
| **F2** | Remaining audit | Complete inventory of routes, state files, roles and drivers |
| **F3** | Generators: REST reference, plugin sheets, manifest matrix, validators | Green build with real data — **completed 2026-10-14** (the reference uses static analysis; see Standard §7.1) |
| **F4** | Highest-value content: 00 Start, installation, first machine, compatibility matrix, troubleshooting | A new user installs and connects a machine using only the site |
| **F5** | Administration and Plugin system (implemented). | A developer understands how a plugin is loaded without reading the core's code — **completed 2026-10-14**, except "Add a driver", the first-plugin tutorial (F6) and the design system |
| **F6** | Each plugin's `docs/` (drafts) and the "Hello NOPAL" tutorial | The 8 plugins have a draft per Standard §6.2 — **completed 2026-10-14** as **drafts** in `plugin-docs/`; the per-plugin `CHANGELOG` and the author copying them to each repo are still missing |
| **F7** | Initial RFCs, real changelog, migration | Roadmap and RFCs published — **completed 2026-10-14**: 7 RFCs as drafts, change history generated from git, migration guide. EN translation done in F8 |
| **F8** | Complete EN translation, accessibility, links and metrics | ES/EN parity — **completed 2026-10-14**: every page has an EN translation; axe-core accessibility audit (contrast, in-text links, code, keyboard-focusable tables fixed); external link check; health report. **No version was frozen**: without a NOPAL tag there is nothing to verify it against (Standard §8) |

Priority by impact: **F1 → F2 → F3 → F4 → F5**; F6 can proceed in parallel with F4–F5 because it lives in different repos.

## 10. Documentation health metrics (visible in CI)

- % of core routes with a description in the code (`npm run report`).
- % of pages with `verified_against` equal to the current version.
- ES pages without a current EN translation.
- Plugins that meet the minimum documentation contract (out of 8).
- Broken links.
- `experimental` pages not reviewed for more than one version cycle.

## 11. Risks and mitigation

| Risk | Mitigation |
|---|---|
| The code changes faster than the documents (`dev-main` active, 20 commits in four days) | Verification in CI and `verified_against`; phase F3 before mass writing |
| Two manuals (Help Center and site) contradict each other | Standard §10: the site links and does not copy; contradictions are recorded as defects |
| An unverified new datum is published as fact | Statuses and the `TO BE VERIFIED` rule; CI rejects pages without a status |
| Plugin repos have different structures | Mandatory `docs/` template; generated sheet to detect gaps |
| A single maintainer | Documentation written in the same PR as the change; generators reduce manual work |
| Outdated screenshots | Generation with Playwright against a local instance of `nopal@main` |

## 12. Decisions and open items

1. The site's domain and hosting (GitHub Pages is assumed for now). **Open.**
3. ~~Whether the site publishes the SDD as is or only derived pages~~ **Resolved:** only derived pages; the SDD is an input.
4. ~~Whether `nopal-demo` is the official screenshot instance~~ **Resolved:** no. The demo was built from commit `92e5443` (2026-08-19). Screenshots are taken from a local instance of `nopal@main`. The demo is useful for read-only API examples.
5. ~~Whether the User pages are grouped by task or by interface screen~~ **Resolved:** by task.
6. Who copies the `plugin-docs/` drafts to each plugin repository and writes their `CHANGELOG`. **Open.**

### History
- 1.1 (2026-10-14): reflects what was built in F1–F8: build status, real repository structure, resolved decisions.
- 1.0 (2026-10-14): initial version.
