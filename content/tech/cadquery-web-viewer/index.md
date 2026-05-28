---
title: "CadQuery Web Viewer"
date: 2026-05-14T12:00:00-07:00
params:
    featured_title: CadQuery Web Viewer (2025)
    featured_emoji: "📐"
    featured_description_short: Browser-based 3D viewer for CadQuery and build123d models
    featured_description: "A browser-based 3D viewer for CadQuery and build123d models with live refresh, a remote-server mode, and a Docker image."
---

{{< project-links github="https://github.com/jimcortez/cadquery-web-viewer" pypi="https://pypi.org/project/cadquery-web-viewer/" docker="https://hub.docker.com/repository/docker/jimcortez/cadquery-web-viewer/general" >}}

CadQuery Web Viewer is a browser-based 3D viewer for [CadQuery](https://github.com/CadQuery/cadquery) and [build123d](https://github.com/gumyr/build123d) models. You write Python, save the file, and the geometry shows up in your browser. No manual mesh exports, no reload dance.

It started as a hard fork of Yeicor's [Yet Another CAD Viewer](https://github.com/yeicor/yacv) (YACV). The fork picks up where YACV left off and adds a few things I wanted in my own workflow. A long-running server you can publish models to from any Python process. An optional disk cache for GLB uploads. A Docker image so I can run it on a small Linux box without fighting OCP build flags.
