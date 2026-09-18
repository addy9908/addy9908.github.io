# Personal website

Static personal site hosted on GitHub Pages. No build step — plain HTML/CSS/JS.

## Structure
- `index.html` — home page
- `utilities.html` — in-browser lab calculators (solution prep, Med Associates syringe pump)
- `projects/` — one HTML doc page per project (copy `example.html`)
- `assets/` — shared `style.css`, `nav.js`, `data.js`, `calculators.js`, and `img/`

## Editing content
All projects, doc links, and syringe presets live in `assets/data.js`. Edit that one file
to add content. To add a project doc page, copy `projects/example.html`, rename it, edit it,
and add an entry to `PROJECTS` in `data.js` with `hasDocs: true` and the new `docPage` path.

## Local testing
Open `index.html` in a browser, or run a local server:

    python3 -m http.server

then visit http://localhost:8000

## Deploy
Push to `main`. In repo Settings → Pages, set Source to "Deploy from a branch",
branch `main`, folder `/ (root)`. Site publishes at the URL shown there within ~1 minute.

## Calculator notes
The syringe pump tool uses the documented Med Associates relation
`Flow (mL/min) = k × RPM × A`, with `A = π(d/2)²`. The constant `k` (0.19538) and motor RPM
are specific to your pump and printed on its calibration sheet, so both are editable in the UI.
Syringe inner diameters are editable defaults from Med Associates / BD references.
Always verify against your own calibration sheet.