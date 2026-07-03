# AGENTS.md

## Project Context

This repository is `C:\Users\jhy\git\jhy156456.github.io`, a GitHub Pages style static site. The active work is in:

- `wedding/index.html`

The user is working on a Korean wedding invitation page. They prefer direct execution without repeated confirmation. If the Codex session opens with a different sandbox root, switch/open the session from `C:\Users\jhy\git\jhy156456.github.io` so edits do not require repeated escalation prompts.

## User Preferences

- Respond in Korean.
- Be direct and proactive.
- Do not repeatedly ask for permission when the user has already asked to continue.
- The user is sensitive to UI that looks artificially generated or hand-made when official/service-native visuals would look better.
- For UI questions, prefer practical, polished, production-feeling changes over explanations only.

## Current Wedding Page Work

The gallery lightbox in `wedding/index.html` was changed from a custom hand-rolled implementation to PhotoSwipe because the first opened photo did not show the natural drag-follow behavior where the neighboring image follows during horizontal swipe. The original custom code only felt correct after moving to the second image.

PhotoSwipe changes already applied:

- Added PhotoSwipe CSS in `<head>`:
  - `https://cdn.jsdelivr.net/npm/photoswipe@5.4.4/dist/photoswipe.css`
- Wrapped all 18 gallery images with anchors using:
  - `class="gallery-link"`
  - `href="/assets/images/wedding/gallery/display/gallery-XX.jpg"`
  - `data-pswp-width`
  - `data-pswp-height`
- Added PhotoSwipe module script before Firebase scripts:
  - imports `PhotoSwipeLightbox`
  - initializes with `gallery: ".gallery-grid"`
  - `children: ".gallery-link"`
  - `bgOpacity: 0.94`
  - `showHideAnimationType: "fade"`
  - `wheelToZoom: true`
- Replaced the old `initImageZoom()` call with a comment saying gallery lightbox is handled by PhotoSwipe.

Verification already done:

- `git diff --check -- wedding/index.html` passed.
- Local static server returned HTTP 200 at `http://localhost:8899/wedding/`.
- File starts with bytes `3C 21 44 4F`, so no UTF-8 BOM.
- `package.json` has no build scripts; it only has devDependencies for prettier.
- `prettier --check wedding/index.html` failed because the existing full file style does not match Prettier. Do not auto-format the whole file unless the user explicitly wants a huge formatting diff.

Current expected git state:

- `M wedding/index.html`
- No intentional `node_modules` changes should remain.

## Important Caveat

The old custom lightbox functions are still present in the file but no longer initialized. This means the gallery is handled by PhotoSwipe. If hero/map image zoom depended on `initImageZoom()`, check whether those still need custom click zoom behavior or whether they should also be migrated to PhotoSwipe/separate behavior.

## Next User Request

The user asked whether Naver Map and Kakao Map buttons can use the real website/service icons instead of forced handmade-looking icons.

Recommended approach:

1. Inspect `wedding/index.html` for the map button section and CSS classes around Naver/Kakao map buttons.
2. Replace any handmade icon shapes/text badges with more authentic service icons.
3. Prefer local assets if already present in the repo.
4. If adding external assets, use stable official-looking image sources only when legally/technically safe. Better options:
   - Use simple square app-style icons with authentic brand colors and official Korean labels if official SVG assets are unavailable.
   - Naver Map: green N-style map icon feel, label `네이버지도`.
   - Kakao Map: yellow/brown Kakao-style map icon feel, label `카카오맵`.
5. Avoid pretending hand-drawn SVGs are official logos. If exact official assets are not included locally, say that exact official logo files should be added to the repo, then wire them into the buttons.

## Commands That Were Useful

From repository root:

```powershell
git status --short
git diff --check -- wedding/index.html
Invoke-WebRequest -Uri "http://localhost:8899/wedding/" -UseBasicParsing | Select-Object -ExpandProperty StatusCode
```

To start a local static server from repo root if needed:

```powershell
python -m http.server 8899
```

Then open:

```text
http://localhost:8899/wedding/
```

## Keep In Mind

This is a static GitHub Pages repository. There is no real build step unless a script is added later. For now, validation means checking HTML/CSS/JS behavior in browser and using git diff checks.
