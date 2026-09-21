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
 /* ============================================================
   C. Electrophysiology: Nernst, GHK, Henderson LJP + correction
   ============================================================ */
  const F = 96485.332;   // C/mol
  const R = 8.314462;    // J/(mol·K)
  const tempEl = document.getElementById("ephysTemp");
  if (!tempEl) return;   // not on this page

  function T() { return (parseFloat(tempEl.value) || 0) + 273.15; } // Kelvin
  function fmtmV(x) { return (Math.round(x * 100) / 100) + " mV"; }

  /* ---------- Nernst ---------- */
  const nZ = document.getElementById("nernstZ"),
        nOut = document.getElementById("nernstOut"),
        nIn = document.getElementById("nernstIn"),
        nRes = document.getElementById("nernstResult"),
        nVal = document.getElementById("nernstVal"),
        nWork = document.getElementById("nernstWork");
  function calcNernst() {
    const z = parseFloat(nZ.value), co = parseFloat(nOut.value), ci = parseFloat(nIn.value);
    if ([z, co, ci].some(v => isNaN(v)) || z === 0 || co <= 0 || ci <= 0) {
      nRes.style.display = "none"; nWork.style.display = "none"; return;
    }
    const E = (R * T()) / (z * F) * Math.log(co / ci) * 1000; // mV
    nVal.textContent = fmtmV(E);
    nRes.style.display = "block"; nWork.style.display = "block";
    nWork.innerHTML =
      "<b>Equation:</b> E = (RT / zF) · ln([out]/[in])<br><br>" +
      "R=" + R + " J/(mol·K), T=" + (Math.round(T()*100)/100) + " K, z=" + z + ", F=" + F + " C/mol<br>" +
      "E = (" + R + "×" + (Math.round(T()*100)/100) + ") / (" + z + "×" + F + ") · ln(" + co + "/" + ci + ")<br>" +
      "E = <code>" + fmtmV(E) + "</code>";
  }
  [nZ, nOut, nIn, document.getElementById("nernstUnit"), tempEl].forEach(el => el && el.addEventListener("input", calcNernst));

/* ---------- GHK ---------- */
  const g = id => document.getElementById(id);
  const ghkIds = ["ghk_PK","ghk_Ko","ghk_Ki","ghk_PNa","ghk_Nao","ghk_Nai","ghk_PCl","ghk_Clo","ghk_Cli"];
  const ghkRes = g("ghkResult"), ghkVal = g("ghkVal"), ghkWork = g("ghkWork");
  function calcGHK() {
    if (!ghkRes) return;
    const v = {};
    let missing = false;
    ghkIds.forEach(id => {
      const el = g(id);
      if (!el) { missing = true; return; }
      v[id] = parseFloat(el.value);
    });
    if (missing || ghkIds.some(id => isNaN(v[id]))) {
      ghkRes.style.display="none"; ghkWork.style.display="none"; return;
    }
    const num = v.ghk_PK*v.ghk_Ko + v.ghk_PNa*v.ghk_Nao + v.ghk_PCl*v.ghk_Cli;
    const den = v.ghk_PK*v.ghk_Ki + v.ghk_PNa*v.ghk_Nai + v.ghk_PCl*v.ghk_Clo;
    if (num <= 0 || den <= 0) { ghkRes.style.display="none"; ghkWork.style.display="none"; return; }
    const Vm = (R*T())/F * Math.log(num/den) * 1000;
    ghkVal.textContent = fmtmV(Vm);
    ghkRes.style.display="block"; ghkWork.style.display="block";
    ghkWork.innerHTML =
      "<b>Equation:</b> Vm = (RT/F) · ln( (P<sub>K</sub>[K]<sub>o</sub> + P<sub>Na</sub>[Na]<sub>o</sub> + P<sub>Cl</sub>[Cl]<sub>i</sub>) / " +
      "(P<sub>K</sub>[K]<sub>i</sub> + P<sub>Na</sub>[Na]<sub>i</sub> + P<sub>Cl</sub>[Cl]<sub>o</sub>) )<br><br>" +
      "numerator = " + num.toFixed(4) + ", denominator = " + den.toFixed(4) + "<br>" +
      "Vm = (RT/F)·ln(" + (num/den).toFixed(5) + ") = <code>" + fmtmV(Vm) + "</code><br>" +
      "<span class='note'>Cl⁻ concentrations enter with in/out reversed, per the GHK convention for anions.</span>";
  }
  ghkIds.forEach(id => { const el = g(id); if (el) el.addEventListener("input", calcGHK); });
  tempEl.addEventListener("input", calcGHK);
  calcGHK();   // <-- run once on load so defaults show a result immediately

  /* ---------- LJP (Henderson) ---------- */
  // Default aqueous mobilities (×10^-4 cm²/(V·s)), editable in UI
  const DEFAULT_IONS = [
    { ion:"K⁺",   z: 1, mob: 7.62,  pip: 0,   bath: 0 },
    { ion:"Na⁺",  z: 1, mob: 5.19,  pip: 0,   bath: 0 },
    { ion:"Cl⁻",  z:-1, mob: 7.91,  pip: 0,   bath: 0 },
    { ion:"Cs⁺",  z: 1, mob: 8.00,  pip: 0,   bath: 0 },
    { ion:"Ca²⁺", z: 2, mob: 6.17,  pip: 0,   bath: 0 }
  ];
  const ljpBody = g("ljpBody");
  function addLjpRow(d) {
    const tr = document.createElement("tr");
    tr.innerHTML =
      `<td style="padding:4px"><input value="${d.ion}" style="width:70px"></td>
       <td style="padding:4px"><input type="number" step="1" value="${d.z}" style="width:56px"></td>
       <td style="padding:4px"><input type="number" step="any" value="${d.mob}" style="width:80px"></td>
       <td style="padding:4px"><input type="number" step="any" value="${d.pip}" style="width:80px"></td>
       <td style="padding:4px"><input type="number" step="any" value="${d.bath}" style="width:80px"></td>`;
    ljpBody.appendChild(tr);
    tr.querySelectorAll("input").forEach(inp => inp.addEventListener("input", calcLJP));
  }
  DEFAULT_IONS.forEach(addLjpRow);
  g("ljpAddRow").addEventListener("click", () => addLjpRow({ion:"X",z:1,mob:5,pip:0,bath:0}));

  const ljpRes = g("ljpResult"), ljpVal = g("ljpVal"), ljpWork = g("ljpWork");
  function readLjp() {
    return [...ljpBody.querySelectorAll("tr")].map(tr => {
      const i = tr.querySelectorAll("input");
      return { ion:i[0].value, z:parseFloat(i[1].value), mob:parseFloat(i[2].value),
               pip:parseFloat(i[3].value), bath:parseFloat(i[4].value) };
    }).filter(r => !isNaN(r.z) && !isNaN(r.mob) && !isNaN(r.pip) && !isNaN(r.bath));
  }
  function calcLJP() {
    const ions = readLjp();
    // Henderson: V(pip)-V(bath) = -(RT/F) * [Σ (z u /|z|)(C_bath - C_pip)] / [Σ (z² u/|z|... )] ... use standard form:
    // E = -(RT/F) * ( Σ (z_i u_i (c_i^bath - c_i^pip)) / Σ (z_i^2 u_i (c_i^bath - c_i^pip)) ) * ln( Σ z_i^2 u_i c_i^bath / Σ z_i^2 u_i c_i^pip )
    let sTop=0, sBot=0, sBathZ2=0, sPipZ2=0;
    ions.forEach(r => {
      const u = r.mob, z = r.z, cb = r.bath, cp = r.pip;
      sTop += z*u*(cb - cp);
      sBot += z*z*u*(cb - cp);
      sBathZ2 += z*z*u*cb;
      sPipZ2  += z*z*u*cp;
    });
    if (sBot === 0 || sBathZ2 <= 0 || sPipZ2 <= 0) { ljpRes.style.display="none"; ljpWork.style.display="none"; return; }
    // V(bath)-V(pip):
    const Ebath_pip = -(R*T()/F) * (sTop/sBot) * Math.log(sBathZ2/sPipZ2) * 1000; // mV
    const LJP = -Ebath_pip; // V(pip)-V(bath)
    ljpVal.textContent = fmtmV(LJP);
    ljpRes.style.display="block"; ljpWork.style.display="block";
    ljpWork.innerHTML =
      "<b>Henderson equation</b> (V<sub>pip</sub> − V<sub>bath</sub>):<br>" +
      "E = −(RT/F)·[Σ z·u·(c<sub>bath</sub>−c<sub>pip</sub>) / Σ z²·u·(c<sub>bath</sub>−c<sub>pip</sub>)]·ln(Σ z²·u·c<sub>bath</sub> / Σ z²·u·c<sub>pip</sub>)<br><br>" +
      "Σ z·u·Δc = " + sTop.toFixed(4) + ", Σ z²·u·Δc = " + sBot.toFixed(4) + "<br>" +
      "ln term = ln(" + sBathZ2.toFixed(3) + " / " + sPipZ2.toFixed(3) + ") = " + Math.log(sBathZ2/sPipZ2).toFixed(4) + "<br>" +
      "LJP = <code>" + fmtmV(LJP) + "</code>";
    // auto-fill correction if enabled
    if (g("corrUseComputed").checked) { g("corrLJP").value = (Math.round(LJP*100)/100); calcCorr(); }
  }

  /* ---------- Correction ---------- */
  const corrVm=g("corrVm"), corrLJP=g("corrLJP"), corrUse=g("corrUseComputed"),
        corrRes=g("corrResult"), corrVal=g("corrVal"), corrWork=g("corrWork");
  function calcCorr() {
    const vm=parseFloat(corrVm.value), ljp=parseFloat(corrLJP.value);
    if ([vm,ljp].some(isNaN)) { corrRes.style.display="none"; corrWork.style.display="none"; return; }
    const corrected = vm - ljp;
    corrVal.textContent = fmtmV(corrected);
    corrRes.style.display="block"; corrWork.style.display="block";
    corrWork.innerHTML =
      "corrected Vm = measured Vm − LJP = <code>" + fmtmV(vm) + "</code> − <code>" + fmtmV(ljp) +
      "</code> = <code>" + fmtmV(corrected) + "</code>";
  }
  corrVm.addEventListener("input", calcCorr);
  corrLJP.addEventListener("input", () => { corrUse.checked=false; calcCorr(); });
  corrUse.addEventListener("change", () => { if (corrUse.checked) calcLJP(); });
  tempEl.addEventListener("input", calcLJP);

  // initial
  calcLJP();
})();