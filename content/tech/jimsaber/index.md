---
title: "Lightsaber"
date: 2026-05-28T08:00:00-07:00
params:
    featured_image: jimsaber.png
    featured_title: Lightsaber (2025)
    featured_description_short: A CircuitPython lightsaber prop with proper power management
    featured_description: "A CircuitPython lightsaber prop built on Adafruit's Prop-Maker reference, with a real state machine, sleep modes, and motion-triggered audio."
---

{{< project-links github="https://github.com/jimcortez/jimsaber" >}}

A personal CircuitPython lightsaber prop built on top of Adafruit's [Prop-Maker Lightsaber](https://learn.adafruit.com/lightsaber-featherwing) reference. Adafruit gives you a working sketch; I wanted real power management and a state machine I could keep extending, so I rewrote it.

The hilt is a [Feather M4 Express](https://www.adafruit.com/product/3857) paired with the [Prop-Maker FeatherWing](https://www.adafruit.com/product/3988), which handles the accelerometer and audio amp, driving a 144 LED/m NeoPixel strip down the blade. A 4400 mAh LiPo, a 4Ω 3W speaker, and two panel-mount buttons round it out. One button toggles power, the other cycles through animations: solid color, rainbow chase, sparkle.

The interesting part is the state machine. Light sleep, deep sleep, motion-triggered swings and hits, audio synced to ignition and impact. Auto-sleep means it actually survives a night of showing it off instead of cooking the battery on standby.

{{<carousel items="1" height="500" fitWidth="888" unit="px" auto-duration-video="true" images="jimsaber.mp4" >}}
