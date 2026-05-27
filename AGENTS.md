# AGENTS

<skills_system priority="1">

## Available Skills

<!-- SKILLS_TABLE_START -->
<usage>
When users ask you to perform tasks, check if any of the available skills below can help complete the task more effectively. Skills provide specialized capabilities and domain knowledge.

How to use skills:
- Invoke: `npx openskills read <skill-name>` (run in your shell)
  - For multiple: `npx openskills read skill-one,skill-two`
- The skill content will load with detailed instructions on how to complete the task
- Base directory provided in output for resolving bundled resources (references/, scripts/, assets/)

Usage notes:
- Only use skills listed in <available_skills> below
- Do not invoke a skill that is already loaded in your context
- Each skill invocation is stateless
</usage>

<available_skills>

<skill>
<name>avoid-ai-writing</name>
<description>"Audit and rewrite content to remove 21 categories of AI writing patterns with a 43-entry replacement table"</description>
<location>global</location>
</skill>

<skill>
<name>brainstorming</name>
<description>"You MUST use this before any creative work - creating features, building components, adding functionality, or modifying behavior. Explores user intent, requirements and design before implementation."</description>
<location>global</location>
</skill>

<skill>
<name>frontend-design</name>
<description>Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.</description>
<location>global</location>
</skill>

<skill>
<name>hugo</name>
<description>This skill provides comprehensive knowledge for building static websites with Hugo static site generator. It should be used when setting up Hugo projects (blogs, documentation sites, landing pages, portfolios), integrating Tailwind CSS v4 for custom styling, integrating headless CMS systems (Sveltia CMS or TinaCMS), deploying to Cloudflare Workers with Static Assets, configuring themes and templates, and preventing common Hugo setup errors.</description>
<location>global</location>
</skill>

<skill>
<name>interactive-portfolio</name>
<description>"You know a portfolio isn't a resume - it's a first impression that needs to convert. You balance creativity with usability. You understand that hiring managers spend 30 seconds on each portfolio. You make those 30 seconds count. You help people stand out without being gimmicky."</description>
<location>global</location>
</skill>

<skill>
<name>theme-factory</name>
<description>Toolkit for styling artifacts with a theme. These artifacts can be slides, docs, reportings, HTML landing pages, etc. There are 10 pre-set themes with colors/fonts that you can apply to any artifact that has been creating, or can generate a new theme on-the-fly.</description>
<location>global</location>
</skill>

<skill>
<name>using-git-worktrees</name>
<description>Use when starting feature work that needs isolation from current workspace or before executing implementation plans - creates isolated git worktrees with smart directory selection and safety verification</description>
<location>global</location>
</skill>

<skill>
<name>using-superpowers</name>
<description>Use when starting any conversation - establishes how to find and use skills, requiring Skill tool invocation before ANY response including clarifying questions</description>
<location>global</location>
</skill>

<skill>
<name>web-artifacts-builder</name>
<description>Suite of tools for creating elaborate, multi-component claude.ai HTML artifacts using modern frontend web technologies (React, Tailwind CSS, shadcn/ui). Use for complex artifacts requiring state management, routing, or shadcn/ui components - not for simple single-file HTML/JSX artifacts.</description>
<location>global</location>
</skill>

<skill>
<name>webapp-testing</name>
<description>Toolkit for interacting with and testing local web applications using Playwright. Supports verifying frontend functionality, debugging UI behavior, capturing browser screenshots, and viewing browser logs.</description>
<location>global</location>
</skill>

</available_skills>
<!-- SKILLS_TABLE_END -->

</skills_system>

# Project: electricgerbil.art

Static [Hugo](https://gohugo.io) site for Jim Cortez's *Electric Gerbil*
immersive light-art portfolio, deployed to
[https://electricgerbil.art/](https://electricgerbil.art/). The user-facing
[README.md](README.md) is the source of truth for layout and run instructions —
this section gives agents the orientation they need to work in the repo
quickly.

## Stack at a glance

- **Hugo extended**, ≥ v0.157.0 — required for image processing in the
  carousel / project-grid templates.
- **Themes** (composed in [hugo.toml](hugo.toml) as
  `theme = ["hugo-video","electric-gerbil"]`):
  - `themes/electric-gerbil/` — the **custom primary theme**. Owns visual
    identity, `art/` templates, base layout, and the single stylesheet
    [electric-gerbil-theme.css](themes/electric-gerbil/static/css/electric-gerbil-theme.css).
  - `themes/hugo-video/` — git submodule; provides `{{< video >}}`.
- **No JS framework, no bundler.** `static/css/*.css` and `static/js/*.js` are
  served as-is. `assets/js-external/` mirrors third-party libs and is
  refreshed manually by [load_external_resources](load_external_resources).

## Run / build

```bash
hugo server --disableFastRender   # dev — http://localhost:1313/
hugo --gc --minify                # production build to ./public/
./deploy                          # production rsync; edit USER/HOST/key first
```

`disableFastRender` is required (carousels mutate page resources). On a fresh
checkout: `git submodule update --init --recursive`.

## Where things live

- **Site config** — [hugo.toml](hugo.toml): theme stack, social handles, CSP
  allowlists under `[params.csp]`, custom CSS/JS under `[params]`,
  `homepage.featured_page` chooses the hero project.
- **Content** — page bundles under `content/`:
  - `content/_index.md` composes the homepage from
    `homepage-featured-project`, `homepage-project-list`,
    `homepage-about-artist` shortcodes.
  - `content/art/<project>/index.md` + sibling image/video directories.
    Required front-matter params for a project to appear in lists/hero:
    `featured_image` and `featured_title` (see [README.md](README.md) for the
    full schema).
  - `content/about/index.md` powers the About-the-artist page and feeds the
    homepage artist block via `params.homepage_image` /
    `params.homepage_description`.
- **Layout overrides** — `layouts/` wins over the theme. Notable files:
  - [layouts/_default/baseof.html](layouts/_default/baseof.html) — extends the
    theme's base to add a `?v=...` cache-buster on `custom_js` URLs. Bump the
    version when shipping JS changes.
  - [layouts/partials/CSP.html](layouts/partials/CSP.html) — builds the CSP
    `<meta>` tag from `[params.csp]`. Update the matching list whenever you
    add a third-party origin.
  - [layouts/shortcodes/](layouts/shortcodes/) — `carousel`, `post_carousel`,
    `homepage-*`, `horizontal-image-list`, `image-gallery`. The carousel
    accepts either `images="a.jpg,b.mp4"` or `data="<bundle-dir>"`.
- **Theme** — see [README.md](README.md#the-electric-gerbil-custom-theme) for
  the full breakdown. Key entry points:
  - [themes/electric-gerbil/layouts/_default/baseof.html](themes/electric-gerbil/layouts/_default/baseof.html)
  - [themes/electric-gerbil/layouts/art/list.html](themes/electric-gerbil/layouts/art/list.html)
    and [single.html](themes/electric-gerbil/layouts/art/single.html)
  - Palette tokens (`--cyan` / `--violet` / `--magenta` plus `--bg`, `--text`,
    `--muted`, `--line`) live at the top of
    [electric-gerbil-theme.css](themes/electric-gerbil/static/css/electric-gerbil-theme.css).
- **Helpers**:
  - [scripts/ffmpeg-web-loop.sh](scripts/ffmpeg-web-loop.sh) — encode silent,
    fast-start, 800px-wide looping mp4s for hero clips.
  - [load_external_resources](load_external_resources) — refresh vendored
    third-party CSS/JS in `assets/js-external/`.
  - [deploy](deploy) — `hugo` + `rsync` over SSH.

## Conventions agents should respect

- **Don't bypass the CSP.** If a build adds a font, embed, or analytics host,
  update the corresponding list in `[params.csp]` (`scriptsrc`, `stylesrc`,
  `fontsrc`, `imgsrc`, `mediasrc`, `framesrc`, `connectsrc`) — don't widen the
  policy with wildcards.
- **Keep videos web-optimized.** New hero/carousel clips go through
  `ffmpeg-web-loop.sh` and ship as `*_weboptimized.mp4`.
- **Page bundles, not loose files.** New art lives at
  `content/art/<slug>/index.md` with images/videos colocated in the bundle so
  `Resources.GetMatch` resolves them. Reference resources by path **relative
  to the bundle** in front matter and shortcodes.
- **Featured-project guard.** Projects that omit `featured_image` or
  `featured_title` are silently filtered out of the homepage list and the
  hero. If a new project isn't appearing, check both params.
- **Theme vs. project layouts.** Prefer editing files under `layouts/` for
  site-specific tweaks; only touch `themes/electric-gerbil/` when changing the
  theme itself (visual system, base templates, art/ templates). Don't modify
  `themes/hugo-video/` (submodule).
- **Cache-buster.** When shipping changes to `static/js/carousel.js` or
  similar, bump the `?v=...` string in
  [layouts/_default/baseof.html](layouts/_default/baseof.html).
- **Verify in a real browser before declaring done.** A clean `hugo --gc
  --minify` only proves templates compile — it doesn't catch broken layouts,
  missing assets, CSP rejections, or runtime JS errors. After any layout,
  theme, shortcode, CSP, or `custom_js`/`custom_css` change, run
  `hugo server --disableFastRender` and drive the site with the
  `chrome-devtools` MCP: load `/`, `/art/`, a representative
  `/art/<project>/`, and `/about/`, then check `list_console_messages` (expect
  none) and `list_network_requests` (expect no 4xx/5xx). Use
  `take_screenshot` to confirm the visual result. If you can't drive a
  browser, say so explicitly instead of claiming the change works.

