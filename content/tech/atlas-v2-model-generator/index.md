---
title: "Atlas v2 Model Generator"
date: 2025-01-01T10:00:00-07:00
params:
    featured_image: sphere.png
    featured_title: Atlas v2 Model Generator (2025)
    featured_emoji: "🔮"
    featured_description_short: Generate LED sphere models for xLights, MadMapper, and Chromatik
    featured_description: "A Python tool that turns one YAML config for the DrZzs Atlas v2 LED sphere into model files for xLights, MadMapper, and Chromatik."
---

{{< project-links github="https://github.com/jimcortez/Atlas-v2-Model-Generator" >}}

{{<carousel items="1" height="500" fitWidth="888" unit="px" auto-duration-video="true" images="sphere.png,sphere_prebuild.mp4" >}}

A Python tool that turns one YAML config for the [Atlas v2](https://www.youtube.com/@DrZzs) LED sphere by DrZzs and GrZzs (49 rings, 6,119 LEDs, sphere radius 100, a 16-port controller) into the model files four animation programs need. An [xLights](https://xlights.org/) 2D `.xmodel` plus a companion CSV. An xLights 3D model with ring submodels and spherical coordinates on a 50x50x50 grid. A [MadMapper](https://madmapper.com/) `.mmfl` LED fixture with DMX channel mapping. A [Chromatik](https://chromatik.co/) `.lxf` custom fixture, one 360-degree arc per ring at its latitude, with [Art-Net](https://art-net.org.uk/) host and universe wired in. One config, four targets.

I built it because the sphere is the centerpiece of [Commune](/art/commune/), my interactive dining installation, and every animation platform I drive it from wants the geometry in a different format. Computing per-LED coordinates and string-mapping by hand is the kind of thing you do once and then never want to do again. The entry point is `generate_models.py`. CLI flags pick the formats, output directory, prefix, or list what's available: `-c`, `-o`, `-f`, `-p`, `--list-formats`. Each target lives in its own module under `generators/` on top of a shared `base_generator`, so adding a new program is one more class.

The detail worth knowing is the xLights handoff. The 2D generator emits a CSV alongside the `.xmodel`, and the rows labeled `PC Start` are the LED Start values you punch into each controller port — the math is already done, you're just transcribing. Chromatik fixtures drop into `~/Chromatik/Fixtures/` on macOS and Linux, or `%USERPROFILE%\Chromatik\Fixtures\` on Windows, and Chromatik picks them up.
