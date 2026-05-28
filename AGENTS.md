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
<name>ai-check</name>
<description>></description>
<location>project</location>
</skill>

<skill>
<name>frontend-design</name>
<description>Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.</description>
<location>project</location>
</skill>

<skill>
<name>hugo-asset-pipeline</name>
<description>This skill should be used when the user mentions "scss", "sass", "css processing", "javascript bundling", "js.Build", "hugo pipes", "asset pipeline", "fingerprint", "cache busting", "minify assets", "image processing", "responsive images", "webp", "toCSS", "resources.Get", "resources.Concat", "sri", "subresource integrity", or any Hugo asset processing topics. Provides comprehensive guidance on Hugo's built-in asset pipeline for SCSS compilation, JavaScript bundling, image optimization, and cache management.</description>
<location>project</location>
</skill>

<skill>
<name>hugo-content-structure</name>
<description>This skill should be used when the user mentions "content organization", "frontmatter", "taxonomy", "archetype", "page bundle", "leaf bundle", "branch bundle", "_index.md", "section pages", "draft content", "related content", "hugo new", "content types", "tags", "categories", or any Hugo content structure questions. Provides comprehensive guidance on organizing Hugo content, writing frontmatter, configuring taxonomies, and using archetypes.</description>
<location>project</location>
</skill>

<skill>
<name>hugo-deployment-aws</name>
<description>This skill should be used when the user mentions "deploy", "deployment", "serverless", "cloudfront", "s3 bucket", "github actions", "ci/cd", "pipeline", "production", "staging", "aws deploy", "cache invalidation", "cdn", "release", "publish site", "go live", or any deployment-related commands. Provides comprehensive AWS deployment workflow using Serverless Framework, GitHub Actions CI/CD, and CloudFront CDN.</description>
<location>project</location>
</skill>

<skill>
<name>hugo-fundamentals</name>
<description>This skill should be used when the user mentions "hugo basics", "hugo config", "hugo commands", "project structure", "hugo setup", "hugo.toml", "config.toml", "hugo serve", "hugo build", "content directory", "layouts directory", "static directory", "assets directory", "hugo configuration", "module mounts", "hugo environment", ".Site.Author", "author config", "site params", or any general Hugo static site generator questions. Provides foundational Hugo knowledge including project structure, configuration patterns, essential commands, and migration guidance for deprecated features.</description>
<location>project</location>
</skill>

<skill>
<name>hugo-templating</name>
<description>This skill should be used when the user mentions "go template", "hugo template", "partial", "shortcode", "template syntax", "layout", "baseof", "block define", "{{ range }}", "{{ if }}", "{{ with }}", "{{ partial }}", "template lookup", "layout hierarchy", or any Hugo templating concepts. Provides comprehensive guidance on Go template syntax, layouts, partials, shortcodes, and template debugging.</description>
<location>project</location>
</skill>

<skill>
<name>hugo-testing</name>
<description>This skill should be used when the user mentions "test javascript", "bun test", "unit test", "happy-dom", "test client-side js", "dom mocking", "browser tests", "test theme toggle", "test scroll handlers", or any testing of JavaScript code in Hugo projects. Provides comprehensive guidance for testing client-side JavaScript using Bun's test runner with happy-dom for DOM environment simulation.</description>
<location>project</location>
</skill>

<skill>
<name>humanize</name>
<description>></description>
<location>project</location>
</skill>

<skill>
<name>theme-factory</name>
<description>Toolkit for styling artifacts with a theme. These artifacts can be slides, docs, reportings, HTML landing pages, etc. There are 10 pre-set themes with colors/fonts that you can apply to any artifact that has been creating, or can generate a new theme on-the-fly.</description>
<location>project</location>
</skill>

<skill>
<name>web-artifacts-builder</name>
<description>Suite of tools for creating elaborate, multi-component claude.ai HTML artifacts using modern frontend web technologies (React, Tailwind CSS, shadcn/ui). Use for complex artifacts requiring state management, routing, or shadcn/ui components - not for simple single-file HTML/JSX artifacts.</description>
<location>project</location>
</skill>

<skill>
<name>webapp-testing</name>
<description>Toolkit for interacting with and testing local web applications using Playwright. Supports verifying frontend functionality, debugging UI behavior, capturing browser screenshots, and viewing browser logs.</description>
<location>project</location>
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
./scripts/deploy                  # production rsync; edit USER/HOST/key first
```

`disableFastRender` is required (carousels mutate page resources). On a fresh
checkout: `git submodule update --init --recursive`.

## Where things live

- **Site config** — [hugo.toml](hugo.toml): theme stack, social handles, CSP
  allowlists under `[params.csp]`, custom CSS/JS under `[params]`,
  `homepage.featured_page` chooses the hero project.
- **Content** — page bundles under `content/`:
  - `content/_index.md` composes the homepage from
    `homepage-featured-project`, two `homepage-project-list` calls (art
    default + `section="tech"`), and `homepage-about-artist`.
  - `content/art/<project>/index.md` + sibling image/video directories.
    Required front-matter params for a project to appear in lists/hero:
    `featured_image` and `featured_title` (see [README.md](README.md) for the
    full schema).
  - `content/tech/<project>/index.md` mirrors the art structure. Each project
    needs `featured_title` plus either `featured_image` or `featured_emoji`
    (used as a placeholder hero on the grid until real imagery lands).
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
  - [themes/electric-gerbil/layouts/tech/list.html](themes/electric-gerbil/layouts/tech/list.html)
    and [single.html](themes/electric-gerbil/layouts/tech/single.html) — same
    shape as art, with a `featured_emoji` fallback in the list template
  - Palette tokens (`--cyan` / `--violet` / `--magenta` plus `--bg`, `--text`,
    `--muted`, `--line`) live at the top of
    [electric-gerbil-theme.css](themes/electric-gerbil/static/css/electric-gerbil-theme.css).
- **Helpers**:
  - [scripts/ffmpeg-web-loop.sh](scripts/ffmpeg-web-loop.sh) — encode silent,
    fast-start, 800px-wide looping mp4s for hero clips.
  - [load_external_resources](load_external_resources) — refresh vendored
    third-party CSS/JS in `assets/js-external/`.
  - [scripts/deploy](scripts/deploy) — `hugo` + `rsync --delete` over SSH.

## Conventions agents should respect

- **Don't bypass the CSP.** If a build adds a font, embed, or analytics host,
  update the corresponding list in `[params.csp]` (`scriptsrc`, `stylesrc`,
  `fontsrc`, `imgsrc`, `mediasrc`, `framesrc`, `connectsrc`) — don't widen the
  policy with wildcards.
- **Keep videos web-optimized.** New hero/carousel clips go through
  `ffmpeg-web-loop.sh` (silent, fast-start, 800px-wide loop) and ship as
  the only copy in the bundle — drop the script's default `_weboptimized`
  suffix on output (`-o <name>.mp4`) so the committed filename matches the
  media filename convention below. Don't commit a separate non-optimized
  master.
- **Page bundles, not loose files.** New art lives at
  `content/art/<slug>/index.md` with images/videos colocated in the bundle so
  `Resources.GetMatch` resolves them. Reference resources by path **relative
  to the bundle** in front matter and shortcodes.
- **Media filename convention.** Name images and videos inside a project
  bundle as `<art_project>_<category-slug>_<description_with_underscores>_<category_order_number>.<ext>`.
  - `<art_project>` is the project slug (e.g. `commune`).
  - `<category-slug>` groups files by purpose. Current categories:
    `showcase` (hero/finished installation shots), `participants` (people
    interacting with the piece), `bts` (behind-the-scenes: crew, prebuild,
    original renders, fabrication), and any new category needed for the
    project. Sub-category descriptors (`crew`, `prebuild`, `original_render`,
    etc.) live in the description segment.
  - `<description>` describes the contents with underscores between words. By
    convention this includes the event/location shorthand
    (`bman24`, `bman25`, `unscruz25`, `boxshop25`, …) so files sort/group by
    venue.
  - `<category_order_number>` is the 1-based ordering **within the category**
    for that project (not a global counter). Example: the 4th `participants`
    photo is `_4` even if it's the 8th file overall.
  - Videos are web-optimized in place — only the optimized copy lives in
    the bundle, named per the convention (no `_weboptimized` suffix).
  - Examples from `content/art/commune/`:
    - `commune-hero-images/commune_showcase_bman24_1.jpg`
    - `commune-hero-images/commune_participants_bman25_4.jpg`
    - `commune-hero-images/commune_bts_crew_1.jpg`
    - `videos/commune_bts_prebuild_boxshop25_2.mp4`
- **Featured-project guard.** Art projects that omit `featured_image` or
  `featured_title` are silently filtered out of the homepage list and the
  hero. Tech projects are filtered out unless they define `featured_title`
  plus either `featured_image` or `featured_emoji`. If a new project isn't
  appearing, check those params first.
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

