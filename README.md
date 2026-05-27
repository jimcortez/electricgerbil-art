# Electricgerbil.art

Source for [https://electricgerbil.art/](https://electricgerbil.art/) — the
portfolio site for Jim Cortez's *Electric Gerbil* immersive light-art practice.
The site is a static [Hugo](https://gohugo.io) build that ships through a
custom dark, media-forward theme called **electric-gerbil**.

## Prerequisites

- Hugo **extended** binary, **v0.157.0 or newer** (`hugo version` must report
  `extended` — image processing in the carousels and project grids depends on
  it). On macOS: `brew install hugo`.
- Git (the `hugo-video` theme is vendored as a submodule).
- Optional: `ffmpeg` for the `scripts/ffmpeg-web-loop.sh` helper, `wget` for
  `load_external_resources`, and `rsync` + an SSH key if you use the `deploy`
  script.

## First-time setup

```bash
git clone <repo-url> electricgerbil-art
cd electricgerbil-art
git submodule update --init --recursive
```

The `themes/hugo-video` submodule is required at build time.

## Local development

```bash
hugo server --disableFastRender
```

Site is served at [http://localhost:1313/](http://localhost:1313/). Fast
render is disabled because the carousel and hero shortcodes mutate page
resources, and Hugo's default fast-render path can leave the homepage stale
while editing project front matter.

If your browser blocks the dev server because of the CSP, flip
`params.httpsOnly` to `false` in [hugo.toml](hugo.toml) (it is already false
in-repo, but check before deploying).

## Production build

```bash
hugo --gc --minify
```

Static output is written to `public/` (gitignored). The `deploy` script wraps
this and rsyncs `public/` to the production host:

```bash
./deploy        # runs `hugo -F --cleanDestinationDir` then rsync over SSH
```

Edit the `USER`, `HOST`, `DIR`, and SSH key path inside [deploy](deploy) before
running it on a different machine.

## Project layout

```
electricgerbil-art/
├── hugo.toml                  # Site config: theme stack, CSP, params, menus
├── go.mod                     # Hugo Modules manifest
├── .gitmodules                # hugo-video theme submodule
├── archetypes/
│   └── default.md             # `hugo new` template
├── content/
│   ├── _index.md              # Homepage — composes the homepage shortcodes
│   ├── about/
│   │   ├── index.md           # About-the-artist page (page bundle)
│   │   └── images/            # Page resources for the About page
│   └── art/
│       ├── commune/           # Each art project is a page bundle:
│       │   ├── index.md       #   front matter + body
│       │   ├── commune-hero-images/  # image resources
│       │   └── videos/               # web-optimized mp4 resources
│       ├── friends-for-dinner/
│       ├── playa-name-generator/
│       └── temple-of-gerbils/
├── layouts/                   # Project-level overrides (win over the theme)
│   ├── _default/
│   │   └── baseof.html        # Cache-busted variant of theme's baseof
│   ├── partials/
│   │   ├── CSP.html           # Builds the Content-Security-Policy header
│   │   ├── carousel-render.html
│   │   └── image-gallery.html
│   └── shortcodes/
│       ├── carousel.html               # {{< carousel >}}
│       ├── post_carousel.html
│       ├── homepage-featured-project.html
│       ├── homepage-project-list.html
│       ├── homepage-about-artist.html
│       ├── horizontal-image-list.html
│       └── image-gallery.html
├── themes/
│   ├── electric-gerbil/       # Custom theme (see below)
│   └── hugo-video/            # Submodule — adds {{< video >}} shortcode
├── static/                    # Files copied verbatim to /
│   ├── css/                   # electric-gerbil.css, carousel.css
│   ├── js/                    # carousel.js
│   └── images/                # logo + global imagery
├── assets/                    # Hugo Pipes inputs
│   ├── css → ../static/css    # symlink
│   ├── js/
│   └── js-external/           # third-party libs fetched by load_external_resources
├── scripts/
│   └── ffmpeg-web-loop.sh     # Encodes silent, looping, web-optimized mp4s
├── load_external_resources    # Refreshes assets/js-external from CDNs
└── deploy                     # `hugo` + rsync over SSH to production
```

## The `electric-gerbil` custom theme

`themes/electric-gerbil/` is the primary theme — it owns the visual identity,
the chrome, and the project page templates. The theme stack in
[hugo.toml](hugo.toml) is `theme = ["hugo-video","electric-gerbil"]`, which
means lookups fall through `hugo-video` first (only contributes the
`{{< video >}}` shortcode), then `electric-gerbil` for everything else.

```
themes/electric-gerbil/
├── theme.toml
├── layouts/
│   ├── index.html             # Homepage shell — defers to content/_index.md
│   ├── _default/
│   │   ├── baseof.html        # HTML <head>, CSP, fonts, header/footer wiring
│   │   ├── list.html          # Default section listing
│   │   └── single.html        # Default single page
│   ├── art/
│   │   ├── list.html          # /art/ — project grid
│   │   └── single.html        # /art/<project>/ — hero + content
│   └── partials/
│       ├── eg-header.html     # Sticky nav with brand + Instagram/GitHub CTAs
│       ├── eg-footer.html
│       └── eg-social.html
└── static/
    └── css/
        └── electric-gerbil-theme.css   # Single-file theme stylesheet
```

### Visual system

The theme is intentionally narrow: one stylesheet, no build step, no JS of its
own. Highlights worth knowing before editing:

- **Palette** is defined as CSS custom properties at the top of
  [electric-gerbil-theme.css](themes/electric-gerbil/static/css/electric-gerbil-theme.css):
  `--bg`, `--bg-elev`, `--text`, `--muted`, `--line`, plus three accents
  `--cyan` (`#39d4ff`), `--violet` (`#9f6cff`), `--magenta` (`#ff4fd8`).
- **Typography** is [Outfit](https://fonts.google.com/specimen/Outfit) loaded
  from Google Fonts in `baseof.html`. Font Awesome 4.7 is loaded from
  bootstrapcdn for social icons.
- **Layout primitives**: `.container` (max 1200px / 92% width), `.section`
  (vertical padding), `.hero`, `.project-grid` (auto-fit cards),
  `.project-card`, `.artist-card`, `.simple-list`. Two media queries handle
  the desktop hero/artist split (≥900px) and the mobile nav collapse (≤700px).
- **Cache busting** is done via the project-level `layouts/_default/baseof.html`,
  which appends a `?v=...` query string to each `custom_js` URL. Bump the
  string when shipping JS changes.

### Templates

- [index.html](themes/electric-gerbil/layouts/index.html) is a thin shell that
  renders `content/_index.md`, which in turn composes the three homepage
  shortcodes (`homepage-featured-project`, `homepage-project-list`,
  `homepage-about-artist`) defined in the project-level `layouts/shortcodes/`.
- [art/list.html](themes/electric-gerbil/layouts/art/list.html) and
  [art/single.html](themes/electric-gerbil/layouts/art/single.html) drive the
  `/art/` index and individual project pages. The list template reads the
  `featured_image` page resource from each project bundle.
- Header/footer partials read site params from `[params.social]` in
  `hugo.toml` and only render the CTAs whose handles are non-empty.

### Project-level overrides

Anything under the repo's `layouts/` overrides the theme:

- [layouts/_default/baseof.html](layouts/_default/baseof.html) overrides the
  theme's base template (currently used to add the `?v=` cache-buster on JS).
- [layouts/partials/CSP.html](layouts/partials/CSP.html) builds the
  `<meta http-equiv="Content-Security-Policy">` tag from the lists in
  `[params.csp]`. Add new third-party hosts there (Google Analytics, YouTube,
  fonts, etc.) when something is blocked at runtime.
- [layouts/shortcodes/carousel.html](layouts/shortcodes/carousel.html) and
  [carousel-render.html](layouts/partials/carousel-render.html) drive the
  hero/inline carousels. They mix images and videos (videos autoplay muted +
  looped) and accept either an `images="..."` CSV or a `data="<dir>"` page
  resource glob.

## Authoring content

### New art project

```bash
hugo new art/my-project/index.md
```

Then drop hero images and videos alongside `index.md` (each project is a
[Hugo page bundle](https://gohugo.io/content-management/page-bundles/)) and
fill in the front matter. The homepage and `/art/` listing only show projects
that define **both** `featured_image` and `featured_title`:

```yaml
---
title: "Project name"
date: 2026-05-27T12:00:00-07:00
params:
    featured_image: hero-images/cover.jpg          # path is relative to the bundle
    featured_title: Project Name (2026)
    featured_description_short: Short tagline for the project grid card
    featured_description: Longer description used on the homepage hero
    homepage_hero_images:                          # optional; ordered slides
        - videos/clip_weboptimized.mp4
        - hero-images/cover.jpg
        - hero-images/detail.jpg
---
```

Pin a different project to the homepage by setting
`params.homepage.featured_page` in [hugo.toml](hugo.toml) (defaults to
`/art/commune`).

### Shortcodes available in content

| Shortcode | Where | Purpose |
| --- | --- | --- |
| `{{< carousel ... >}}` | project bodies | Inline image/video carousel; takes either `images="a.jpg,b.mp4"` or `data="<dir>"` to glob a bundle subdir. |
| `{{< horizontal-image-list images="..." height="300" fit="fit" >}}` | any page | Side-scrolling row of bundle resources. |
| `{{< image-gallery page_parent="/art" >}}` | any page | 3-up grid sourced from child pages' `featured_image`. |
| `{{< youtube <id> >}}` | any page | Hugo built-in. |
| `{{< video src="..." >}}` | any page | From the [hugo-video](https://github.com/martignoni/hugo-video) submodule. |
| `{{< homepage-* >}}` | `content/_index.md` | Composed in the homepage; not intended for project pages. |

### Encoding videos for the web

Hero clips should be silent, H.264, fast-start, ~800px wide so they autoplay
on mobile and stay under a couple MB. Use the helper:

```bash
./scripts/ffmpeg-web-loop.sh path/to/raw.mov
# writes path/to/raw_weboptimized.mp4
```

Then reference the produced `*_weboptimized.mp4` from `homepage_hero_images`
or a `{{< carousel >}}` shortcode.

## Maintenance scripts

- [load_external_resources](load_external_resources) — refreshes vendored
  copies of Bootstrap, Font Awesome, html5shiv, respond.js, and the upstream
  carousel CSS/JS into `assets/js-external/`. Run when bumping a third-party
  dep.
- [scripts/ffmpeg-web-loop.sh](scripts/ffmpeg-web-loop.sh) — see above.
- [deploy](deploy) — production rsync deploy. Edit credentials before use.

## Notes

- `disableFastRender = true` is set both in `hugo.toml` and on the dev-server
  command on purpose; carousels rely on full re-renders.
- The Content-Security-Policy is rendered into a `<meta>` tag from
  `[params.csp]`. If you add a new external resource (font CDN, embed,
  analytics host), update the matching list and rebuild — the browser console
  will spell out which directive failed.
- `googleAnalytics` is set in [hugo.toml](hugo.toml) and rendered via Hugo's
  internal GA template from `baseof.html`.
