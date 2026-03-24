---
title: "Commune"
date: 2024-09-01T12:51:27-07:00
params:
    featured_image: commune-hero-images/commune_1.jpg
    featured_title: Commune (2024-2026)
    featured_description_short: Interactive retro-futurist light-up dining table
    featured_description: "Commune is an interactive retro-futurist dining installation by Electric Gerbil, using responsive LED choreography to turn strangers into collaborators."
    homepage_hero_images:
        - videos/unscruz_video_weboptimized.mp4
        - videos/sphere_weboptimized.mp4
        - commune-hero-images/commune_8.jpg
        - commune-hero-images/commune_9.jpg
        - commune-hero-images/commune_4.jpg
        - commune-hero-images/commune_5.jpg
---

{{<carousel items="1" height="500" fitWidth="888" unit="px" duration="7000" auto-duration-video="true" data="commune-hero-images" images="commune-hero-images/commune_8.jpg,videos/unscruz_video_weboptimized.mp4,videos/sphere_weboptimized.mp4,videos/table_interactive_weboptimized.mp4" >}}

Deep in the moonlit expanse of the playa, a mesmerizing constellation of lights beckons you forward. As you approach, an otherworldly scene materializes: an elegant dining table, seemingly transported from a retro-futuristic dream, floats in the dusty night air. Eight chairs await, each a silent invitation to join a gathering of strangers who will soon become confidants.

The heart of Commune is a masterfully crafted table for eight, where technology and artistry intertwine. Intricate LED patterns dance beneath its surface, while a mysterious spherical centerpiece pulses with light, casting ever-changing patterns across the faces of those gathered. Above, a sculptural chandelier and beacon reach toward the stars, their light flowing through eight graceful metal pillars that support a protective canopy. Each place setting, permanently affixed to the table, stands ready for a feast that exists only in imagination.

But Commune is more than just a visual spectacle – it's an interactive experience that responds to human connection. Touch-sensitive elements throughout the piece create a playful dialogue between strangers: a gentle tap of your fork might plunge your neighbor's space into darkness, but when two participants reach out together, the entire installation erupts in a symphony of light and color. These shared moments of discovery transform casual encounters into lasting connections.

Special thanks to our visionary crew: Russ, Matthew (and the talented team at [Radius Concepts](https://radius-concepts.com/)), Mina, and Eugenia

---
{{< youtube nWjEKeLxS7c >}}

---

## Inspiration

The inspiration for Commune comes from a charming family tradition. The artist's three-year-old loves to play a game called "Friends for Dinner" where he pretends to be a new dinner guest, making up delightful answers to questions at the table. It turns out that meeting people at the dinner table for the first time isn't as common as you might think - but when it happens, it creates a uniquely powerful shared experience.

In 2023, the artist brought "[Friends for Dinner](https://electricgerbil.art/art/friends-for-dinner/)" to the playa, and it was, by all measures, an immense success. The space worked exactly as envisioned - no instructions needed, no confusion. When seats were open, newcomers naturally joined in. Snacks and drinks were shared freely among strangers. The piece captured that magical immediacy that sparks deep conversations between people who'd just met. Now with Commune, the artist aims to recreate this magic with an added layer of sophistication and style.

Drawing inspiration from the bold, optimistic vision of "Googie" architecture, Commune reimagines the retro-futuristic aesthetic of mid-century America as a catalyst for authentic human connection. It's where the Space Age meets intimate dining, creating an environment where strangers can discover the extraordinary in each other.

---

{{<carousel items="1" height="500" fitWidth="888" unit="px" duration="7000" data="commune-hero-images" images="commune-hero-images/commune_9.jpg,commune-hero-images/commune_1.jpg,commune-hero-images/commune_2.jpg,commune-hero-images/commune_3.jpg,commune-hero-images/commune_4.jpg,commune-hero-images/commune_5.jpg,commune-hero-images/commune_6.jpg,commune-hero-images/commune_7.png" >}}

---

## Major Installations
 - [Burning Man 2024](https://burningman.org/about/history/brc-history/event-archives/2024-event-archive/2024-art-installations/?support_project=0#a2IVI000000ErE92AK) | August 25 - September 2, 2024
 - [unSCruz 2025](https://unscruz.org/) (Grant Recipient) | May 1 - May 4, 2025
 - [Burning Man 2025](https://burningman.org/event/2025-art-listings/?yyyy=&aq=commune&support_project=0#a2IVI0000012q0L2AQ) | August 24 - September 1, 2025
 - [unSCruz 2026](https://unscruz.org/) (Grant Recipient) | April 30 - May 3, 2026


## Materials/Technologies Used
- LED's driven by a mix of [QuinLED](https://quinled.info) (ESP32) microcontrollers (3 dig-quad, 2 dig-octa) networked to a raspberry pi
- Raspberry Pi 4 Runs [Falcon Player](https://github.com/FalconChristmas/fpp) which sends out DDP commands to LED controllers
- Initially used [X-Lights](https://xlights.org/) software for 3D modeling and sequencing, with custom built [ISF Shaders](https://isf.video/). These continue to be a backup.
- Migrated to using [MadMapper](https://madmapper.com/) running on an M1 Mac Mini to drive real-time rendering of sequences. Migrated custom ISF shaders to MadMapper materials to take advantage of input generators to smooth transitions. MadMapper outputs ArtNet instructions over the network to Rpi.
- For touch sensitive utensils, created a controller with [Adafruit QTPy RP2040](https://www.adafruit.com/product/4900) that uses [MPR121](https://www.adafruit.com/product/4830) capacitive touch modules to manipulate virtual MIDI sliders.
- For Burning Man 2025, a new chandelier was, featuring 6000+ LEDs in an acrylic sphere. This is controlled with a [Kulp 16A-B](https://kulplights.com/product/k16a-b/) controller and uses the [Dr. Zzs Atlas v2](https://www.drzzs.com/shop/atlas-v2-digital-files/) 3d-printed frame as a base. The hemispheres and heat control system were custom fabricated.

---

## Original Fundraising Video

{{< youtube -rbVUXPWaL8 >}}

---

## Original Honoraria Grant Application Video

{{< youtube BeuHFHKksXw >}}