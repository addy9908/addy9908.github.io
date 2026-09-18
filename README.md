# Personal website

Static personal site hosted on GitHub Pages. No build step — plain HTML/CSS/JS.

## Structure
- `index.html` — home page
- `utilities.html` — in-browser lab calculators (solution prep, Med Associates syringe pump)
- `projects/` — one HTML doc page per project (copy `example.html`)
- `assets/` — shared `style.css`, `nav.js`, `data.js`, `calculators.js`, and `img/`

## Editing content
All settings live in `assets/data.js`:
- `GH_USER` — your GitHub username (required).
- `PROJECT_OPTIONS.autoProjects` — when true, the Projects dropdown is filled automatically
  from your public GitHub repos via the API. Set false to use only the manual list.
- `DOCS` — hand-picked project doc pages (always manual; auto-discovery does not create these).
- `PROJECTS` — manual fallback list, used if the API is unreachable/rate-limited, and merged in
  for projects hosted outside your account.

To add a project doc page: copy `projects/example.html`, rename it, edit it, and add an entry
to `DOCS` in `data.js` with the matching `repo` name and new `docPage` path.

## Auto-discovery notes
The Projects dropdown uses the public GitHub REST API
(`https://api.github.com/users/USERNAME/repos`), called from the browser with no token.
Unauthenticated requests are limited to 60 per hour per visitor IP; if that limit is hit,
the site silently falls back to the manual `PROJECTS` list. Options in `PROJECT_OPTIONS`
let you exclude forks/archived repos, hide the `USERNAME.github.io` repo, hide specific repos
by name (`hideRepos`), show only a chosen whitelist (`onlyRepos`), sort by updated
date / stars / name, and prefer each repo's live Pages URL when Pages is enabled.

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