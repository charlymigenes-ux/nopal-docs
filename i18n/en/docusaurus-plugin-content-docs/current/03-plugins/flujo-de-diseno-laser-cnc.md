---
title: Design flow for laser and CNC
sidebar_label: Laser and CNC design flow
sidebar_position: 2
audience: user
type: how-to
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
source_commit: "a5853dc"
---

# Design flow for laser and CNC

Three official plugins share the work of preparing a design: **Shape creator**, **SVG tools** and **Text for fabrication**. This page explains what each one does, in what format it delivers the result and how it reaches the machine.

:::note All three are interface only
None has a backend of its own. They use routes NOPAL already offers: uploading to the [library](../01-usuario/biblioteca) and adding to the laser or CNC queue. They are installed from the [Plugin gallery](../01-usuario/galeria-de-plugins).
:::

## What each plugin does

| Plugin | What it is for | What it delivers |
|---|---|---|
| **Shape creator** | Draw with exact measurements: rectangles, circles, ellipses, polygons, lines and text. Imports DXF. Organizes the design in **layers** with material, power and speed | **SVG** (the design) and **G-code** (the outlines), with sending to the queue |
| **SVG tools** | Prepare an SVG you already have: sanitize, remove duplicates, join segments, simplify and order outlines to reduce idle travel. Compares the original with the optimized copy | Optimized **SVG**, with the `-optimizado` suffix |
| **Text for fabrication** | Turn text into paths with physical measurements in millimeters. Includes 20 local typefaces and lets you import TTF or OTF | **SVG** with the text as paths and **G-code** of the outline |

## Where each file ends up

Each plugin saves to a folder of its own in the library:

| Plugin | SVG | G-code |
|---|---|---|
| Shape creator | **3D Printing**, in the folder you choose when saving | **Files**, `Creador de Formas` folder (`formas-<date>.gcode`) |
| SVG tools | **3D Printing**, `Herramientas SVG` folder | Does not generate G-code |
| Text for fabrication | **3D Printing**, `Biblioteca de tipografías` folder | **Files**, `Biblioteca de tipografías` folder |

SVGs go to the **3D Printing** section of the library because NOPAL treats them as *models* (it accepts `.svg` and `.dxf` among them). G-code goes to **Files**.

## A typical flow

1. **Design**: create the drawing in *Shape creator*, or type the text in *Text for fabrication*.
2. **Optimize** (optional): open the SVG in *SVG tools* to clean it and reduce idle travel. Save the optimized copy.
3. **Generate the G-code**: *Shape creator* and *Text for fabrication* generate it from the outline.
4. **Send to the machine**:
   - From *Shape creator*, **Send to queue** uploads the G-code and adds it directly to the laser or CNC queue, depending on the target machine you choose.
   - From *Text for fabrication*, the G-code is left in **Files**. From there, in the library, click **Send to laser** to add it to the queue. See [Laser and CNC](../01-usuario/laser-y-cnc#laser-queue).
5. **Run the job** from the machine's section and, on a laser, use **Frame job** if you want to check where it will land.

## Limits worth knowing

- **An SVG does not cut by itself.** NOPAL does not convert an SVG into G-code. The plugins on this page generate G-code only from their own design (Shape creator and Text for fabrication). For an SVG from elsewhere you need an external G-code tool.
- **Outlines only.** The G-code they generate follows the **outlines**. Raster-fill engraving is not implemented.
- **SVG tools simplifies simple strokes only.** It converts single-subpath *paths* to line segments; those with **several subpaths are kept** as they are, so independent outlines are not joined by accident.
- **"Add to project"** (Text for fabrication) depends on a hook that NOPAL's core **does not implement yet**: today the button shows success but the data is not saved anywhere.
- **Image to drawing** (CNC in plotter mode) is another path: it converts a line-art image into G-code without going through these plugins. See [Laser and CNC](../01-usuario/laser-y-cnc#image-to-drawing-plotter).

## Plugin sheets

- [Shape creator](./shape-creator)
- [SVG tools](./svg-toolkit)
- [Text for fabrication](./font-library)
