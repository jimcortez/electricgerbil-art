# Electricgerbil.art

Source code for `https://electricgerbil.art/`.

## Local development

- Install the **extended** Hugo binary (v0.157.0 or newer).
- From the project root, run:

```bash
hugo server --disableFastRender
```

The site will be available at `http://localhost:1313/`.

## Production build

To generate a production build with garbage collection and minification:

```bash
hugo --gc --minify
```

The static site will be written to the `public/` directory.

## Notes

- The site uses the `hugo-sustain` theme from the `themes/hugo-sustain` directory.
- Custom layouts and shortcodes live in `layouts/`.
- Content is organized under `content/`, with art projects in `content/art/<project>/index.md`.