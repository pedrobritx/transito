# Transito website

The product site is a dependency-free, bilingual static website hosted using the repository's existing **GitHub Pages (main / root)** configuration.

- English pages: `/`, `/features/`, `/guide/`, `/support/`, `/updates/`, `/privacy/`, `/contribute/`.
- Portuguese pages: `/pt/` and the same six subpages under `/pt/`.
- Styles: `assets/landing/site.css`, based on Meridian Aurora dusk/dawn colours.
- Behaviour: `assets/landing/site.js` (mobile navigation, illustrated interface toggles, FAQ search, GitHub release asset lookup).
- Custom domain: `CNAME` contains `transito.britx.studio`.
- `.nojekyll` disables Jekyll, which previously tried to traverse archived Xcode files and failed on broken symlinks.
- `website-ci.yml` validates bilingual routes and relative links. GitHub's existing Pages build/deployment workflow handles publishing from the branch.

## DNS and Pages

In the DNS zone for `britx.studio`, add a **CNAME** record with **Host** `transito` and **Target** `pedrobritx.github.io`. Avoid conflicting A/AAAA records for that same subdomain. In GitHub repository **Settings → Pages**, confirm source is **Deploy from a branch**, branch **main**, folder **/(root)**, and custom domain `transito.britx.studio`. Enable **Enforce HTTPS** when GitHub provisions the certificate. Do not change macOS CI workflow.

## Download button

The button first points at a confirmed successful macOS CI artifact (GitHub sign-in may be required); JavaScript replaces the URL automatically with a direct DMG (preferred) or ZIP download from the newest published stable GitHub Release **that actually has a downloadable asset**. GitHub's public API is queried from the browser; no API key, cookies or site analytics are used.

## Screenshot status

The showcase illustrates the **actual UI elements and flows represented in the SwiftUI source**; it is clearly labelled an illustrative reconstruction, **not a real screenshot**. No real app screenshot was found in the repository. Replace or supplement the illustration with a capture from a running macOS build when one becomes available. The Aurora vector is an original website asset.

## Preview and QA

Run `python3 -m http.server 8000` from repository root, then open `http://localhost:8000/` and `http://localhost:8000/pt/`. The site uses relative links so it can be reviewed on a GitHub project Pages URL before the custom domain's DNS resolves. The site supports keyboard navigation, reduced motion, responsive layouts, semantic HTML, canonical URLs and both hreflang versions.
