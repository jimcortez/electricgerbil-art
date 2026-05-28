---
title: "Godot Art-Net"
date: 2025-12-17T09:00:00-07:00
params:
    featured_title: Godot Art-Net (2025)
    featured_emoji: "🎛️"
    featured_description_short: Send DMX over Art-Net from Godot 4
    featured_description: "A GDExtension plugin that lets Godot 4 drive real stage lighting over Art-Net, with multi-universe support and a small GDScript API."
---

{{< project-links github="https://github.com/jimcortez/godot-artnet" >}}

A GDExtension plugin that lets [Godot 4](https://godotengine.org/) talk to stage lighting over [Art-Net](https://art-net.org.uk/). It wraps the lib-artnet-4-cpp C++ library so you can write `controller.set_dmx_data(universe, bytes)` in GDScript and have it land on a real fixture.

I built it because I wanted to drive physical lights from a Godot scene. Game engines are great for prototyping cue logic, choreography, and crowd interaction, but I couldn't find a maintained Godot bridge for DMX. The plugin handles the C++ socket plumbing and exposes a small `ArtNetController` API: `configure`, `start`, `set_dmx_data`, `send_dmx`. Multiple universes, thread-safe, configurable bind and broadcast addresses.

Cross-platform on desktop, Android, and iOS. Web is intentionally unsupported, since browsers can't open raw UDP sockets. Anything web-side has to bridge through a native helper.
