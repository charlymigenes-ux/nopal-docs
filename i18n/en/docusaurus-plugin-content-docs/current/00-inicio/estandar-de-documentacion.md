---
title: Documentation Standard
sidebar_label: Documentation Standard
audience: developer
type: reference
status: implemented
verified_against: "n/a (normative document)"
source_commit: "f0c1f27"
---

# NOPAL Documentation Standard

**Standard version:** 1.6 (approved)
**Date:** 2026-10-14


This document defines **how the official documentation of NOPAL and its extensions is written, reviewed and maintained**.
The content structure lives in the [Documentation Architecture](./arquitectura-documental.md).

The words **MUST**, **MUST NOT** and **SHOULD** read as an obligation, a prohibition and a recommendation. (The Spanish source uses DEBE, NO DEBE and DEBERÍA.)

---

## 1. Purpose

That anyone (user, administrator or developer) can trust that what the official documentation says
**is true for the version they are using**, and that what is not true yet is clearly separated.

## 2. Scope

**Inside the standard**
- `nopal` (core), `nopal-demo` and the website.
- The 8 official plugins: `matriz-led`, `arduino-accessories`, `camera-viewer`, `spoolman`, `cotizador`,
  `shape-creator`, `svg-toolkit`, `font-library`.
- Hardware **that NOPAL controls** (Klipper/Moonraker, Marlin, Bambu, Elegoo, FlashForge, GRBL, ESP32/Arduino and LED panels).

**Outside the standard**
- Third-party plugins: governed by section 6 only if they ask to be listed in the official gallery.

## 3. Audiences and levels

| Level | Question | Forbidden at this level |
|---|---|---|
| **User** | How do I do this? | Implementation details, module names, internal JSON |
| **Administrator** | How do I make it work and keep it running? | Step-by-step guides for daily use; source code |
| **Developer** | How do I extend or modify it? | Interface steps for the end user |
| **Reference** | What is the exact datum? | Narrative, tutorials, opinions |

Each page belongs to **one** level and **one** type (Diátaxis): tutorial, how-to guide, reference or explanation.
If a page needs two, it is split.

## 4. Source of truth

1. **The current code of the `main` branch is the only source of truth** for behavior, routes, fields and versions.
2. A technical claim **MUST** be traceable to a file, an API route, a test or real output.
3. When the documentation and the code disagree, **the documentation is fixed** unless the discrepancy is a code defect;
   in that case an issue is opened and the page carries the status from section 5 that applies while it is resolved.
4. AIs and automatic tools **MUST NOT** fill gaps with assumptions: if a datum is not in the code or in this documentation
   repository, write `PENDIENTE DE VERIFICAR` (`TO BE VERIFIED` on English pages) and record it in the pending list. Endpoints, fields,
   versions or events are never invented.
5. Existing documents (`SDD.md`, `AGENTS.md`, READMEs) are **inputs**, not a source of truth. They are verified before being reused.

## 5. Claim statuses (required on technical pages)

Every technical page declares its status in the front matter (`status:`) and, if a section differs, in that section's heading.

| Status | Meaning | Usable in production |
|---|---|---|
| `implemented` | Verified against the current code | Yes |
| `convention` | Works today, but no mechanism enforces it | Yes, with care |
| `experimental` | Exists in the code and may change without notice | Not recommended |
| `rfc` | Proposal; does not exist | No |
| `deprecated` | Exists for compatibility | Not in new work |

Rules:
- An `rfc` page **MUST** live in `docs/07-rfc/` and show a visible notice at the top.
- An `implemented` page **MUST** declare the NOPAL version it was verified against (`verified_against: 1.2.0-alpha.1 @ <commit>`).
- No `rfc` feature may appear in user guides or tutorials.
- A **skeleton** page declares `stub: true` and shows the "Under construction" notice. It cannot contain technical claims; it is exempt from `verified_against` and does not count as published documentation in the metrics.

Current examples of application (from the audit):
- `NopalPluginRegistry` with `mount/unmount/version` → `implemented`.
- Plugin routes: **there is no common prefix** (each plugin chooses its own: `/api/plugins/matriz-led`, `/api/accessories`, `/api/cameras`, `/api/pricing`, `/api/spoolman`). The real prefix of each plugin is documented; no "prefix convention" is a contract.
- `AI_TOOLS` → `experimental`.
- Manifest permissions → `implemented` as **informational text**; "enforced permissions" → `rfc`.
- Plugin API version, per-plugin dependencies, sandbox, event bus → `rfc`.

## 6. Plugin documentation

### 6.1 Terminology
- Today the mechanism is called the **NOPAL Plugin System**. The term **SDK** is reserved for when a stable contractual API and an official template exist.

### 6.2 Minimum documentation contract of an official plugin
Each plugin **MUST** have in its repository:

```
README.md              summary, installation, requirements, known limits
nopal-plugin.json      manifest (source of truth for metadata)
docs/
  overview.md          what it does, for whom, screenshots
  installation.md      installation and manual dependencies
  configuration.md     settings and files it creates
  api.md               endpoints (method, route, role, example)
  hardware.md          only if applicable
  troubleshooting.md   real errors and solutions
CHANGELOG.md
```

Frontend-only plugins (`shape-creator`, `svg-toolkit`, `font-library`) omit `api.md` and state so explicitly.

### 6.3 Plugin sheet on the site
The site generates a sheet per plugin from the manifest and the plugin's `docs/`. The sheet **MUST** show:
id, name, version, category, compatibility (3D/laser/CNC), `python_requires`, declared permissions (with the clarification
that they are informational), manual dependencies, couplings with other components and maturity (0.x = preview).

### 6.4 Single source of metadata
- The **plugin manifest** is the source of truth for `id`, `name`, `version`, `category`, `compatibility`, `permissions` and `python_requires`.
- The core's `plugin_catalog.json` and the JS version constant **SHOULD** be derived from it or validated against it.
- Until that derivation exists, the documentation CI **MUST** warn if the three versions do not match
  (today `matriz-led`: 0.10.0 / 0.9.0 / 0.9.0).

### 6.5 Couplings and dependencies
Every coupling not declared in the manifest **MUST** be documented on the plugin's sheet. Current cases:
`spoolman → cotizador` (`material_id = spoolman:<id>`), `core → camera-viewer` (`NopalCameraCard`),
`arduino-accessories → laser_service / marlin_printer_service`, `matriz-led → ESP32 with Nopal_FF.ino`.

## 7. API documentation

1. The **core API reference is generated**, not maintained by hand: by **static analysis** of the code (it includes each route's role, which OpenAPI does not reflect) and, when possible, complemented with FastAPI's OpenAPI.
2. For the generation to be useful, the code **SHOULD** have `summary`, `description`, `tags`, response models and error codes.
   The FastAPI app's title and description **MUST** be updated (today: "Biblioteca inteligente para modelos 3D y G-code").
3. Plugin routes do not enter the core's OpenAPI in a curated way; they are documented in each plugin's `docs/api.md` with the following template.
4. Each manually documented endpoint includes: method and route, description, required role (public / operator / admin),
   parameters, request example, response example, errors and status (section 5).
6. Real-time channels (the laser websocket) are documented with message format and connection lifecycle.
7. An **internal** API (for example `get_loaded_plugin_module`) **MUST NOT** appear in the public documentation.

## 8. Documentation versioning

- The site is versioned by NOPAL's **major.minor line** (`1.2`, `1.3`), not by patch.
- While NOPAL is in `alpha` with no git tags, there is a single published version: **"Next (main)"**, with a notice that it may change.
- When the first tagged release is published, the version is frozen and the version selector is enabled. **It is not frozen earlier**: a frozen version without a NOPAL tag would have nothing to be verified against. The procedure is in the documentation repository's README.
- The plugin API, when it exists, will have **its own number** independent of NOPAL's.
- Breaking changes ⇒ a `CHANGELOG` entry marked **Breaking** + a page under `migration/`.

## 9. Languages (ES / EN)

- **Spanish is the source.** English is the official translation. Both languages are a publication requirement for an `implemented` page
  in the User, Administrator and Reference sections; in Developer and RFC, Spanish with a "pending translation" notice is enough. Since F8, **all** pages are translated.
- Each translated page declares the Spanish `source_commit`; if the Spanish changes, CI marks the translation as **outdated**.
- The interface languages (de, fr, pt-BR) are **NOT** documentation languages; the guides are not translated into them.
- Fixed terminology in a bilingual glossary (`docs/00-inicio/glosario.md`): one word, one term. Product names
  (NOPAL, Cotizador) are not translated.

## 10. Relationship with the app's Help Center

Current decision: **no shared source** (the Help Center lives in `app.js` + `translations*.js`).
- The Help Center covers brief contextual help inside the app; the site covers the full documentation.
- The site **MUST NOT** copy Help Center text; it links to it.
- Any contradiction detected between the two is recorded as a defect in whichever is less faithful to the code.
- Migrating the Help Center to Markdown with `translations*.js` generation remains as **RFC-DOC-001** (not started).

## 11. Screenshots and diagrams

- All screenshots are taken with the **NOPAL Style** theme and the third AI Mode background. Every screenshot declares the NOPAL version, the interface language and the theme. It is saved as `area-view-version.png`.
- A screenshot taken on a system with real machines, jobs or AI **MUST** say so in its caption ("Screenshot of a running system"); one taken on a fresh install without machines does not.
- Screenshots **MUST** be regenerated (ideally with Playwright) when the screen they show changes.
- No real data: machine names, IPs, tokens and emails are demonstration values.
- Diagrams are written as text (Mermaid) so they are reviewed in the PR. A binary image only if Mermaid is not enough.

## 12. Code examples

- Every example **MUST** be runnable or marked `illustrative`.
- API examples are tested against a test instance.
- No real passwords, tokens or keys are shown; placeholders are used (`<TOKEN>`).
- Shell commands go in blocks with a single command and the language tagged.

## 13. Compatibility statements

- They are always expressed with a version: "NOPAL ≥ 1.2.0-alpha.1", "Python ≥ 3.9", "plugin requires Python ≥ 3.10".
- The **compatibility matrix** (brand × function × stable/beta/unsupported status) is a mandatory reference page
  and is verified against the drivers (`bambu`, `elegoo`, `flashforge`, `marlin`, `printers` Klipper, `laser`).
- Untested hardware is marked "not verified", never "compatible".

## 14. Deprecation

A deprecated feature: is marked `deprecated` on its page, noted in `CHANGELOG` with the version in which it will be removed,
and the replacement is linked. Its documentation is not removed until it is removed from the code.

## 15. Changelog and migration

- `CHANGELOG.md` follows Keep a Changelog (Added / Changed / Fixed / Removed / Security / **Breaking**).
- A real changelog must be started from `1.2.0-alpha.1` (today the file states there are no releases).
- The changelog does **not** replace the documentation: every visible change also updates its page.
- Each plugin maintains its own `CHANGELOG.md`.

## 16. RFC process

1. Any idea that does not exist in code is proposed in `docs/07-rfc/` (for example `rfc-0007-title.mdx`) with the `templates/rfc.mdx` template.
2. Mandatory sections: problem, proposal, alternatives, impact on existing plugins, compatibility, migration plan, status.
3. States: `draft` → `review` → `accepted` → `implemented` | `rejected` | `withdrawn`.
4. When an RFC is implemented, the official `implemented` page is created and the RFC moves to the archive with a link.
5. Initial RFCs identified in the audit: **versioned plugin API**, **permissions with enforcement**, **per-plugin dependencies**,
   **core↔plugin event bus**, **single source of plugin metadata**, **SDK and official template**, **Help Center in Markdown (RFC-DOC-001)**.

## 17. Review and acceptance criteria

A documentation PR **is only merged** if:
- ☐ The status (`status`) and the verified version are declared.
- ☐ Technical claims are traced to code, a test or real output.
- ☐ It does not describe as existing something that is `rfc`.
- ☐ It respects the page level and type (section 3).
- ☐ It passes the CI validators (section 18).
- ☐ It includes the translation or the pending notice (section 9).
- ☐ Screenshots and examples meet sections 11 and 12.

A **code** PR that changes public behavior (route, manifest field, websocket message, setting, required role)
**MUST** update the affected documentation or open the documentation issue linked in the PR.

## 18. Automatic validation (documentation repository CI)

| Validator | Checks | Status |
|---|---|---|
| Internal links | No broken internal links (`onBrokenLinks: 'throw'` in the build) | Implemented |
| External links | External URLs respond (`scripts/check-external-links.mjs`) | Implemented, **warns only** (the network is unreliable) |
| Front matter | `status`, `audience`, `type`, `verified_against` present and valid; RFCs only in `07-rfc` with their notice | Implemented |
| Scope | No public page mentions what is excluded or deferred (`scripts/data/scope.json`) | Implemented |
| Examples | The tutorial's code blocks match the tested files | Implemented |
| Manifests | Each `nopal-plugin.json` meets the required fields and matches the catalog and the JS | Implemented; version drift **only warns** |
| API routes | Routes cited in written pages exist in the code; the generated reference is up to date | Implemented |
| ES/EN | Page parity and `source_commit` present | Implemented; it does **not** check that the `source_commit` is still current |
| Style | Glossary, markdownlint and spelling | **Pending** |
| Screenshots | Referenced files exist and have a valid name | Implemented (`npm run check:capturas`); screenshots are taken following `capturas/LISTA_DE_CAPTURAS.md` |
| Accessibility | axe-core audit of the main pages, in light and dark | Done **by hand** in F8; not in CI |

## 19. Roles

| Role | Responsibility |
|---|---|
| Documentation owner | Maintains this standard and approves structural changes |
| Feature author | Writes or updates the pages for their change |
| Reviewer | Verifies against the code before approving |
| Plugin maintainer | Maintains the plugin's `docs/` and manifest |

## 20. Changes to this standard

Changes are proposed by PR, carry a note in the following section and, if they are incompatible with existing pages,
require an adaptation plan.

### History
- 1.6 (2026-10-14): F8. Outdated references are updated (RFC path, glossary), the real status of the validators in §18, the rule of not freezing versions without a tag in §8 and the open items of Annex C. All pages have an EN translation.
- 1.5 (2026-10-14): §7.1: the REST reference is generated by static analysis (scripts/extract_routes.py), with OpenAPI as a future complement.
- 1.2 (2026-10-14): correction in §5: there is no common route prefix for plugins (verified in the code).
- 1.1 (2026-10-14): the skeleton page status (`stub: true`) is added in §5.
- 1.0 (2026-10-14): initial version.

---

## Annex A — Required front matter

```yaml
---
title: Connect a Klipper printer
audience: user            # user | admin | developer | reference
type: how-to              # tutorial | how-to | reference | explanation | rfc
status: implemented       # implemented | convention | experimental | rfc | deprecated
verified_against: "1.2.0-alpha.1 @ <commit>"
source_commit: "<Spanish commit>"   # translations only
---
```

## Annex B — Adopted decisions

| Decision | Value |
|---|---|
| Site tool | Docusaurus (independent site, does not mix with the app's architecture) |
| Documentation languages | ES (source) + EN |
| Help Center | No shared source; RFC-DOC-001 for the future |
| Current term | "NOPAL Plugin System" (not "SDK") |
| Repository | A single `nopal-docs` at the start; split templates out when there are third parties |

## Annex C — Open items

1. ~~Confirm that FastAPI's `/docs` and `/openapi.json` are active~~ **Resolved:** the code does not disable them. The REST reference is generated by static analysis (v1.5).
2. Define the site's domain and hosting (GitHub Pages initially). **Open.**
3. ~~Decide whether `nopal-demo` is the official instance for screenshots~~ **Resolved:** no; the demo was built from an earlier version. Screenshots must be taken from a local instance of `nopal@main`.
4. Define the human owner of each role in section 19. **Open.**
5. Decide how the interface translations (de, fr, pt-BR) are handled in the user guide. **Open.**
6. List of tested hardware: the documentation team does not have the machines; it is filled in with user reports (the "Tested hardware" issue template). **Open.**
