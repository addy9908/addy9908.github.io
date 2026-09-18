/* ============================================================
   EDIT THIS FILE to add projects, doc pages, and syringe presets.
   Nothing else needs changing to add content.
   ============================================================ */

// Your GitHub username (used to build repo/pages links)
const GH_USER = "addy9908";

/* --- Projects ---
   name    : display name / repo name
   blurb   : one-line description
   repo    : full GitHub repository URL
   pages   : live GitHub Pages URL, or "" if none
   hasDocs : true to list it under the Documentation dropdown
   docPage : path to its documentation page (relative to site root)
*/
const PROJECTS = [
  {
    name: "example-project",
    blurb: "A short description of the project.",
    repo: `https://github.com/${GH_USER}/example-project`,
    pages: `https://${GH_USER}.github.io/example-project`,
    hasDocs: true,
    docPage: "projects/example.html"
  },
  {
    name: "another-repo",
    blurb: "Another public repository.",
    repo: `https://github.com/${GH_USER}/another-repo`,
    pages: "",
    hasDocs: false,
    docPage: ""
  }
];

/* --- Syringe presets ---
   Inner diameters (mm) from Med Associates / BD references.
   Diameter stays editable in the UI; these are just defaults.
   Add a preset by copying a line.
*/
const SYRINGES = [
  { id: "bd1",    label: "BD 1 mL", diameter_mm: 4.699 }, // A ≈ 0.1734 cm² (matches MA 0.174 cm² example)
  { id: "bd3",    label: "BD 3 mL", diameter_mm: 8.585 }, // A ≈ 0.5788 cm²
  { id: "custom", label: "Custom / other", diameter_mm: 0 }
];

// Make available to other scripts
window.GH_USER = GH_USER;
window.PROJECTS = PROJECTS;
window.SYRINGES = SYRINGES;