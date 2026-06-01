---
title: "pyvvisf"
date: 2025-07-11T10:00:00-07:00
params:
    featured_image: shapes_window.png
    featured_title: pyvvisf (2025)
    featured_emoji: "🌈"
    featured_description_short: Pure-Python ISF shader renderer
    featured_description: "A pure-Python parser and renderer for ISF shaders, built so an LLM can validate and inspect the GLSL it generates."
---

{{< project-links github="https://github.com/jimcortez/pyvvisf" pypi="https://pypi.org/project/pyvvisf/" >}}

{{<carousel items="1" height="500" fitWidth="888" unit="px" images="shapes_window.png" >}}

Python library for parsing and rendering [ISF](https://isf.video/) shaders. Pure Python on top of PyOpenGL and GLFW, no C++ to build, runs the same on Linux, macOS, and Windows.

I wrote it because I wanted an LLM to be able to validate, render, and inspect the GLSL it generates before claiming success. The existing reference is the C++ [VVISF-GL](https://github.com/mrRay/VVISF-GL), which works but is slow to iterate on and slow to install. pyvvisf reads the JSON5 metadata block, compiles the shader, runs the multi-pass render graph, and gives you back a buffer you can save as an image or hand back to the model with structured error messages when things break.

The API is small. `with ISFRenderer(shader_source) as renderer: renderer.render(width, height)`. Inputs are typed via Pydantic and can be set at runtime with `set_input(name, value)`. Full ISF 2.0 spec, including `IMG_THIS_PIXEL`, `IMG_PIXEL`, and `IMG_SIZE`.

Most of the code was written by AI. That's the point: it's a tool for an AI shader pipeline, dogfooded from the start.
