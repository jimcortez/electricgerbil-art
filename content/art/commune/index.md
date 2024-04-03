---
title: "Commune - Burning Man 2024"
date: 2024-09-01T12:51:27-07:00
params:
    featured_image: commune-hero-images/commune_1.jpg
    featured_title: Commune (2024)
---

*Commune is a WIP piece to be shown at Burning Man 2024*

{{< youtube BeuHFHKksXw >}}

Biking in the deep playa, you are drawn to a series of lights set in patterns that aim to attract from a distance. You find a beautiful dining table has already been set, with others welcoming you for a meal that will never arrive. The ambiance changes as you interact with your fellow diners.

The piece itself is primarily a custom-built table for 8 with inlaid LED’s, a spherical centerpiece (more LEDs), and place settings affixed. 8 sturdy chairs that fit the theme will be sourced. Encapsulating the piece are 8 legs custom fabricated from metal tubing, primarily supporting shade cloth, a chandelier, and a beacon. LEDs will coat the beacon and chandelier, as well as run along the poles.

LED Animations synchronize with patterns or sequences that aim to delight and inspire conversation. As a stretch goal, sequences can also be manipulated by participants by touch. Touching a fork could cause another participant’s area to go dark, but touching together could trigger a surprise animation.

---

{{<carousel items="1" height="500" fitWidth="888" unit="px" duration="7000" data="commune-hero-images" >}}

---

*Materials/Technologies Used*
- LED's driven by 3 [QuinLED-Dig-Quad](https://quinled.info/pre-assembled-quinled-dig-quad/) (ESP32) microcontrollers networked to a raspberry pi
- Raspberry Pi 4 Runs [Falcon Player](https://github.com/FalconChristmas/fpp) which sends out DDP commands to LED controllers
- Used [X-Lights](https://xlights.org/) software for 3D modeling and sequencing, with custom built [ISF Shaders](https://isf.video/)
