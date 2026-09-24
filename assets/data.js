/* ============================================================
   EDIT THIS FILE to add projects and syringe presets.
   The DOCS list below is the single source for the Projects page
   (projects.html). Each entry can have any combination of:
     - docPage : a write-up page on this site (Read more button)
     - repo    : a GitHub repository URL (GitHub button)
     - live    : a standalone tool/app on this site (Open tool button)
   Only the buttons whose fields are filled will appear on the card.
   ============================================================ */

// Your GitHub username (used only to build repo links you type below)
const GH_USER = "addy9908";

/* --- Projects (single list; powers projects.html) ---
   title   : display name
   blurb   : one-line description shown on the card
   docPage : path to the write-up page on this site, or "" if none
   repo    : full GitHub URL, or "" if none
   live    : path to a standalone tool/app on this site, or "" if none
*/
const DOCS = [
  {
    title: "iMOSS",
    blurb: "Open-source high-resolution immobility scoring for the tail suspension test.",
    docPage: "projects/imoss.html",
    repo: "https://github.com/addy9908/iMOSS",
    live: ""
  },
  {
    title: "FST + Fiber Photometry Sync",
    blurb: "Synchronize forced swim behavior with fiber photometry recordings (ZY-FP_Analysis).",
    docPage: "projects/fst-fp-sync.html",
    repo: "https://github.com/addy9908/FST_FP_synchronization",
    live: ""
  },
  {
    title: "Mouse Lifespan Event Logger",
    blurb: "LabArchives widget (click readmore for widget code) and standalone app for logging a mouse's full experimental history.",
    docPage: "projects/labarchives-plugin.html",
    repo: "",
    live: "projects/Mouse_Lifespan_Event_Logger.html"
  },
  {
    title: "12 cage with FED3 monitoring 24/7",
    blurb: "Monitoring 12 FED3-integrated cages at the same time 24/7",
    docPage: "",         
    repo: "https://github.com/addy9908/FED3_ZY", 
    live: ""  
  },
  {
    title: "DIY Arduino Uno as Ethovision IO box",
    blurb: "ZY_EthovisionIO provides EthoVision-controlled Arduino I/O for a single behavioral chamber",
    docPage: "",         
    repo: "https://github.com/addy9908/ZY_EthovisionIO", 
    live: ""  
  }
];

/* --- Syringe presets (used by the Syringe Pump calculator) ---
   Inner diameters (mm) from the Med Associates reference and BD sources.
   Diameter stays editable in the UI. Add a preset by copying a line. */
const SYRINGES = [
  { id: "bd1",   label: "BD plastic 1 mL",   diameter_mm: 4.699 },
  { id: "bd3",   label: "BD plastic 3 mL",   diameter_mm: 8.585 },
  { id: "nj1",   label: "Norm-Ject plastic 1 mL",  diameter_mm: 4.71 },
  { id: "nj3",   label: "Norm-Ject plastic 3 mL",  diameter_mm: 9.83 },
  { id: "nj5",   label: "Norm-Ject plastic 5 mL",  diameter_mm: 12.46 },
  { id: "nj10",  label: "Norm-Ject plastic 10 mL", diameter_mm: 15.96 },
  { id: "nj20",  label: "Norm-Ject plastic 20 mL", diameter_mm: 20.10 },
  { id: "nj30",  label: "Norm-Ject plastic 30 mL", diameter_mm: 22.90 },
  { id: "gp1",   label: "Glass (Popper) 1 mL",  diameter_mm: 4.50 },
  { id: "gp2",   label: "Glass (Popper) 2 mL",  diameter_mm: 8.92 },
  { id: "gp3",   label: "Glass (Popper) 3 mL",  diameter_mm: 8.99 },
  { id: "gp5",   label: "Glass (Popper) 5 mL",  diameter_mm: 11.7 },
  { id: "gp10",  label: "Glass (Popper) 10 mL", diameter_mm: 14.7 },
  { id: "gf1",   label: "Glass (Fortuna Optima) 1 mL",  diameter_mm: 4.60 },
  { id: "gf5",   label: "Glass (Fortuna Optima) 5 mL",  diameter_mm: 11.76 },
  { id: "gf10",  label: "Glass (Fortuna Optima) 10 mL", diameter_mm: 14.69 },
  { id: "gf50",  label: "Glass (Fortuna Optima) 50 mL", diameter_mm: 26.89 },
  { id: "custom", label: "Custom / other", diameter_mm: 0 }
];

// Make available to other scripts
window.GH_USER = GH_USER;
window.DOCS = DOCS;
window.SYRINGES = SYRINGES;