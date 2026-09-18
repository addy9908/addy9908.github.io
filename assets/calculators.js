/* Solution prep + Med Associates syringe pump calculators.
   Runs entirely in the browser. Requires data.js. */

(function () {
  function fmt(x) {
    if (!isFinite(x)) return "—";
    if (x !== 0 && (Math.abs(x) < 0.001 || Math.abs(x) >= 1e6)) return x.toExponential(4);
    return (Math.round(x * 1e6) / 1e6).toString();
  }

  /* ---------- Tabs ---------- */
  document.querySelectorAll(".tab").forEach(t => {
    t.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(x => x.classList.remove("active"));
      t.classList.add("active");
      document.querySelectorAll(".page-tab").forEach(pt => pt.style.display = "none");
      document.getElementById(t.dataset.tab).style.display = "block";
    });
  });

  /* ---------- A. Solution preparation ---------- */
  const mwEl = document.getElementById("mw"),
        concEl = document.getElementById("conc"),
        concUnitEl = document.getElementById("concUnit"),
        volEl = document.getElementById("vol"),
        volUnitEl = document.getElementById("volUnit"),
        solResult = document.getElementById("solResult"),
        solMass = document.getElementById("solMass"),
        solMoles = document.getElementById("solMoles"),
        solWork = document.getElementById("solWork");

  function calcSolution() {
    const mw = parseFloat(mwEl.value), conc = parseFloat(concEl.value),
          cu = parseFloat(concUnitEl.value), vol = parseFloat(volEl.value),
          vu = parseFloat(volUnitEl.value);
    if ([mw, conc, vol].some(v => isNaN(v)) || mw <= 0) {
      solResult.style.display = "none"; solWork.style.display = "none"; return;
    }
    const molarity = conc * cu, litres = vol * vu,
          moles = molarity * litres, grams = moles * mw;
    solMass.textContent = grams >= 1 ? fmt(grams) + " g" : fmt(grams * 1000) + " mg";
    solMoles.textContent = "= " + fmt(moles) + " mol  (" + fmt(moles * 1000) + " mmol)";
    solResult.style.display = "block"; solWork.style.display = "block";
    solWork.innerHTML =
      "Steps:<br>" +
      "moles = concentration &times; volume = <code>" + fmt(molarity) + " mol/L</code> &times; <code>" + fmt(litres) + " L</code> = <code>" + fmt(moles) + " mol</code><br>" +
      "mass = moles &times; MW = <code>" + fmt(moles) + " mol</code> &times; <code>" + fmt(mw) + " g/mol</code> = <code>" + fmt(grams) + " g</code>";
  }
  [mwEl, concEl, concUnitEl, volEl, volUnitEl].forEach(el => el && el.addEventListener("input", calcSolution));

  /* Percent (w/v) */
  const pctEl = document.getElementById("pct"),
        pctVolEl = document.getElementById("pctVol"),
        pctResult = document.getElementById("pctResult"),
        pctMass = document.getElementById("pctMass"),
        pctWork = document.getElementById("pctWork");
  function calcPct() {
    const pct = parseFloat(pctEl.value), v = parseFloat(pctVolEl.value);
    if ([pct, v].some(x => isNaN(x))) { pctResult.style.display = "none"; pctWork.style.display = "none"; return; }
    const grams = (pct / 100) * v;
    pctMass.textContent = fmt(grams) + " g";
    pctResult.style.display = "block"; pctWork.style.display = "block";
    pctWork.innerHTML = "mass = (% / 100) &times; volume(mL) = <code>(" + fmt(pct) + "/100)</code> &times; <code>" + fmt(v) +
      " mL</code> = <code>" + fmt(grams) + " g</code><br><span class='note'>(% w/v = grams of solute per 100 mL of solution)</span>";
  }
  [pctEl, pctVolEl].forEach(el => el && el.addEventListener("input", calcPct));

  /* ---------- B. Syringe pump (Med Associates) ---------- */
  const syringeEl = document.getElementById("syringe"),
        diamEl = document.getElementById("diam"),
        flowEl = document.getElementById("flow"),
        flowUnitEl = document.getElementById("flowUnit"),
        rpmEl = document.getElementById("rpm"),
        kEl = document.getElementById("kconst"),
        pumpResult = document.getElementById("pumpResult"),
        pumpRPM = document.getElementById("pumpRPM"),
        pumpMaxRate = document.getElementById("pumpMaxRate"),
        pumpWork = document.getElementById("pumpWork");

  if (syringeEl) {
    (window.SYRINGES || []).forEach(s => {
      const o = document.createElement("option");
      o.value = s.id; o.textContent = s.label; syringeEl.appendChild(o);
    });

    function loadSyringe() {
      const s = (window.SYRINGES || []).find(x => x.id === syringeEl.value);
      if (s && s.diameter_mm > 0) diamEl.value = s.diameter_mm;
      else if (s && s.id === "custom") diamEl.value = "";
      calcPump();
    }
    function toMlPerMin(val, unit) {
      if (unit === "uls") return val * 0.001 * 60; // µL/s -> mL/min
      if (unit === "mls") return val * 60;          // mL/s -> mL/min
      return val;                                   // mL/min
    }
    function calcPump() {
      const d = parseFloat(diamEl.value), flow = parseFloat(flowEl.value),
            rpmMax = parseFloat(rpmEl.value), k = parseFloat(kEl.value);
      if ([d, flow, rpmMax, k].some(v => isNaN(v)) || d <= 0) {
        pumpResult.style.display = "none"; pumpWork.style.display = "none"; return;
      }
      const d_cm = d / 10;
      const area = Math.PI * Math.pow(d_cm / 2, 2);
      const flow_mlmin = toMlPerMin(flow, flowUnitEl.value);
      const requiredRPM = flow_mlmin / (k * area);
      const maxRate = k * rpmMax * area;
      pumpRPM.textContent = fmt(requiredRPM) + " RPM";
      pumpMaxRate.textContent = "For reference, at " + fmt(rpmMax) + " RPM this syringe delivers " +
        fmt(maxRate) + " mL/min (" + fmt(maxRate * 1000 / 60) + " µL/s).";
      pumpResult.style.display = "block"; pumpWork.style.display = "block";
      pumpWork.innerHTML =
        "<b>Equation:</b> Flow (mL/min) = k &times; RPM &times; A, &nbsp; A = &pi;(d/2)&sup2;<br><br>" +
        "1. Convert diameter: d = <code>" + fmt(d) + " mm</code> = <code>" + fmt(d_cm) + " cm</code><br>" +
        "2. Cross-sectional area: A = &pi; &times; (" + fmt(d_cm) + "/2)&sup2; = <code>" + fmt(area) + " cm&sup2;</code><br>" +
        "3. Convert flow rate: <code>" + fmt(flow) + " " + flowUnitEl.options[flowUnitEl.selectedIndex].text + "</code> = <code>" + fmt(flow_mlmin) + " mL/min</code><br>" +
        "4. Solve for RPM: RPM = Flow / (k &times; A) = " + fmt(flow_mlmin) + " / (" + fmt(k) + " &times; " + fmt(area) + ") = <code>" + fmt(requiredRPM) + " RPM</code>";
    }
    syringeEl.addEventListener("change", loadSyringe);
    [diamEl, flowEl, flowUnitEl, rpmEl, kEl].forEach(el => el && el.addEventListener("input", calcPump));
    loadSyringe();
  }
})();