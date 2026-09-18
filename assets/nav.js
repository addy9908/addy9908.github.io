/* Builds the site header and dropdown menus on every page.
   Requires data.js to be loaded first.
   Set data-root on <body> to "" for root pages or "../" for pages in subfolders. */

(function () {
  const root = document.body.getAttribute("data-root") || "";

  const header = document.createElement("header");
  header.className = "site";
  header.innerHTML = `
    <div class="container nav">
      <a class="brand" href="${root}index.html">Your Name</a>
      <a class="link" href="${root}index.html">Home</a>
      <div class="dropdown" id="dd-projects">
        <button type="button">Projects &#9662;</button>
        <div class="dropdown-menu" id="projects-menu">
          <span class="muted">Public repositories</span>
        </div>
      </div>
      <div class="dropdown" id="dd-docs">
        <button type="button">Documentation &#9662;</button>
        <div class="dropdown-menu" id="docs-menu">
          <span class="muted">Project docs</span>
        </div>
      </div>
      <a class="link" href="${root}utilities.html">Utilities</a>
    </div>`;
  document.body.prepend(header);

  const pm = header.querySelector("#projects-menu");
  const dm = header.querySelector("#docs-menu");

  (window.PROJECTS || []).forEach(p => {
    const url = p.pages || p.repo;
    const a = document.createElement("a");
    a.href = url; a.target = "_blank"; a.rel = "noopener"; a.textContent = p.name;
    pm.appendChild(a);

    if (p.hasDocs && p.docPage) {
      const d = document.createElement("a");
      d.href = root + p.docPage; d.textContent = p.name;
      dm.appendChild(d);
    }
  });

  if (dm.querySelectorAll("a").length === 0) {
    const none = document.createElement("span");
    none.className = "muted"; none.textContent = "No docs yet";
    dm.appendChild(none);
  }

  // dropdown open/close
  header.querySelectorAll(".dropdown>button").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const dd = btn.parentElement;
      header.querySelectorAll(".dropdown").forEach(d => { if (d !== dd) d.classList.remove("open"); });
      dd.classList.toggle("open");
    });
  });
  document.addEventListener("click", () =>
    header.querySelectorAll(".dropdown").forEach(d => d.classList.remove("open")));

  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();