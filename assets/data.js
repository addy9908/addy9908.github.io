/* ============================================================
   EDIT THIS FILE to add doc pages, syringe presets, and options.
   Projects can be listed automatically from GitHub, or by hand.
   ============================================================ */

// Your GitHub username (used for auto-discovery and to build links)
const GH_USER = "addy9908";

/* --- Auto-discovery options ---
   AUTO_PROJECTS true  -> fetch all public repos from the GitHub API at page load
                 false -> only use the manual PROJECTS list below
   These options control what gets shown when auto-discovery is on. */
const PROJECT_OPTIONS = {
  autoProjects: true,        // pull public repos from GitHub live
  excludeForks: true,        // hide forked repos
  excludeArchived: true,     // hide archived repos
  hideSelfNamedSite: true,   // hide the USERNAME.github.io repo itself
  sortBy: "updated",         // "updated", "stars", or "name"
  maxRepos: 100,             // GitHub returns up to 100 per page

  // Repos to hide from the Projects dropdown (exact names, case-insensitive).
  // e.g. ["test-repo", "dotfiles", "old-thing"]
  hideRepos: [],

  // If non-empty, ONLY these repos are shown (a whitelist). Leave empty to
  // show everything except hideRepos. Names are exact, case-insensitive.
  onlyRepos: ["FED3_ZY", "iMOSS"]
};

/* --- Documentation pages (always manual) ---
   Auto-discovery lists ALL repos, but you hand-pick which ones get a full
   doc page. Each entry here adds a link to the Documentation dropdown and,
   if the repo name matches, marks that repo as "documented" in the list.
   repo    : must match the GitHub repo name exactly (to link them up)
   docPage : path to its documentation page (relative to site root) */
const DOCS = [
  {
    repo: "iMOSS",
    title: "iMOSS",
    docPage: "projects/imoss.html"
  }
];

/* --- Manual project list ---
   Used as a FALLBACK when autoProjects is false, or when the GitHub API is
   unreachable / rate-limited. Also merged in when auto is on, so you can add
   projects that don't live on your GitHub account.
   name  : display name / repo name
   blurb : one-line description
   repo  : full GitHub repository URL
   pages : live GitHub Pages URL, or "" if none */
const PROJECTS = [
  {
    name: "example-project",
    blurb: "A short description of the project.",
    repo: `https://github.com/${GH_USER}/example-project`,
    pages: `https://${GH_USER}.github.io/example-project`
  }
];

/* --- Syringe presets ---
   Inner diameters (mm) from the Med Associates syringe-diameter reference
   and BD sources. Grouped by brand/material; the label shows the source so
   every value is traceable. Diameter stays editable in the UI, so you can
   override any value against your own syringe or pump calibration sheet.
   Add a preset by copying a line. Set diameter_mm: 0 for a blank custom entry.
*/
const SYRINGES = [
  // BD plastic (BD-specific values; 1 mL matches Med Associates 0.174 cm² example)
  { id: "bd1",   label: "BD plastic 1 mL",   diameter_mm: 4.699 },
  { id: "bd3",   label: "BD plastic 3 mL",   diameter_mm: 8.585 },

  // Plastic Norm-Ject / Henke-Ject (Med Associates reference table)
  { id: "nj1",   label: "Norm-Ject plastic 1 mL",  diameter_mm: 4.71 },
  { id: "nj3",   label: "Norm-Ject plastic 3 mL",  diameter_mm: 9.83 },
  { id: "nj5",   label: "Norm-Ject plastic 5 mL",  diameter_mm: 12.46 },
  { id: "nj10",  label: "Norm-Ject plastic 10 mL", diameter_mm: 15.96 },
  { id: "nj20",  label: "Norm-Ject plastic 20 mL", diameter_mm: 20.10 },
  { id: "nj30",  label: "Norm-Ject plastic 30 mL", diameter_mm: 22.90 },

  // Glass (Popper) series (Med Associates reference table)
  { id: "gp1",   label: "Glass (Popper) 1 mL",  diameter_mm: 4.50 },
  { id: "gp2",   label: "Glass (Popper) 2 mL",  diameter_mm: 8.92 },
  { id: "gp3",   label: "Glass (Popper) 3 mL",  diameter_mm: 8.99 },
  { id: "gp5",   label: "Glass (Popper) 5 mL",  diameter_mm: 11.7 },
  { id: "gp10",  label: "Glass (Popper) 10 mL", diameter_mm: 14.7 },

  // Glass (Fortuna Optima) series (Med Associates reference table)
  { id: "gf1",   label: "Glass (Fortuna Optima) 1 mL",  diameter_mm: 4.60 },
  { id: "gf5",   label: "Glass (Fortuna Optima) 5 mL",  diameter_mm: 11.76 },
  { id: "gf10",  label: "Glass (Fortuna Optima) 10 mL", diameter_mm: 14.69 },
  { id: "gf50",  label: "Glass (Fortuna Optima) 50 mL", diameter_mm: 26.89 },

  { id: "custom", label: "Custom / other", diameter_mm: 0 }
];

// Make available to other scripts
window.GH_USER = GH_USER;
window.PROJECT_OPTIONS = PROJECT_OPTIONS;
window.DOCS = DOCS;
window.PROJECTS = PROJECTS;
window.SYRINGES = SYRINGES;