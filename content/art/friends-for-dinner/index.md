---
title: "Friends for Dinner - Burning Man 2023"
date: 2023-09-04T12:51:27-07:00
params:
    featured_image: ffd-hero-images/ffd_1.jpg
    featured_title: Friends for Dinner (2023)
---

Friends for Dinner was a placed art piece at Burning Man 2023. Participants experienced a large "fancy" dining room table that invited conversation and inclusion in a familiar place, but in an unfamiliar setting. Using more than 2000 individually-addressable LED's, the piece had hours of unique animations that tied the chandelier, plates, and orbs together.

Special thanks to the crew: Noah, Jay, and Russ

---

{{<carousel items="1" height="500" fitWidth="888" unit="px" duration="7000" data="ffd-hero-images" >}}

---

*Materials/Technologies Used*
- Table, chairs, and tableware were sourced second-hand
- Chandelier custom made with 30px/m and 96px/m WS2815 LED strips
- Plates rested on WS2815 LED strips encased in resin
- LED's driven by 3 [QuinLED-Dig-Quad](https://quinled.info/pre-assembled-quinled-dig-quad/) (ESP32) microcontrollers networked to a raspberry pi
- Raspberry Pi 4 Runs [Falcon Player](https://github.com/FalconChristmas/fpp) which sends out DDP commands to LED controllers
- Orbs are based on MaceTech [OctoBar](https://docs.macetech.com/doku.php/octobar) and 8 [Satellite S-001 Modules](https://docs.macetech.com/doku.php/satellite_module_s-001)
- Used [X-Lights](https://xlights.org/) software for 3D modeling and sequencing, with custom built [ISF Shaders](https://isf.video/)

*Also See:*
- [Official Burning Man Art Listing](https://burningman.org/event/2023-art-installations/#a2I8X00000hDM8LUAW)
- [Reddit: Stories & Photos from Participants](https://www.reddit.com/r/BurningMan/comments/16mfpiv/did_you_have_a_meal_at_the_deep_playa_table/)