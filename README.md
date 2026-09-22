# This is my website sharing some ideas for research performance

Static personal site hosted on GitHub Pages. No build step — plain HTML/CSS/JS.

## Current pages
### Documentation
1. iMOSS
2. FST+Fiber Photometry Sync
3. Mouse Lifespan Event Log (web version and LabArchieve Widget)

### Utilities
1. Solution preparation
2. Syringe Pump setting calculator
3. Electrophysiology potential calculator

### Build in PubMed
Search within selected journals and a set time range with keywords

### Useful links for my backup

## ***notes***
The syringe pump tool uses the documented Med Associates relation
`Flow (mL/min) = k × RPM × A`, with `A = π(d/2)²`. The constant `k` (0.19538) and motor RPM
are specific to your pump and printed on its calibration sheet, so both are editable in the UI.
Syringe inner diameters are editable defaults from Med Associates / BD references.
Always verify against your own calibration sheet.
