/* Builds the site header and dropdown menus on every page.
   Requires data.js to be loaded first.
   Set data-root on <body> to "" for root pages or "../" for subfolder pages. */

(function () {
  const root = document.body.getAttribute("data-root") || "";
  const OPT = window.PROJECT_OPTIONS || {};

  const header = document.createElement("header");
  header.className = "site";
  header.innerHTML = `
    <div class="container nav">
      <a class="brand" href="${root}index.html">Zengyou Ye</a>
      <a class="link" href="${root}index.html">Home</a>
      <div class="dropdown" id="dd-projects">
        <button type="button">Projects &#9662;</button>
        <div class="dropdown-menu" id="projects-menu">
          <span class="muted">Loading repositories…</span>
        </div>
      </div>
      <div class="dropdown" id="dd-docs">
        <button type="button">Documentation &#9662;</button>
        <div class="dropdown-menu" id="docs-menu">
          <span class="muted">Project docs</span>
        </div>
      </div>
      <a class="link" href="${root}utilities.html">Utilities</a>
	  <a class="link" href="${root}research.html">Research</a>
	  <a class="link" href="${root}links.html">Links</a>
    </div>`;
  document.body.prepend(header);

  const pm = header.querySelector("#projects-menu");
  const dm = header.querySelector("#docs-menu");

  /* ---- Documentation dropdown (always manual, from DOCS) ---- */
  (window.DOCS || []).forEach(d => {
    const a = document.createElement("a");
    a.href = root + d.docPage;
    a.textContent = d.title || d.repo;
    dm.appendChild(a);
  });
  if ((window.DOCS || []).length === 0) {
    const none = document.createElement("span");
    none.className = "muted"; none.textContent = "No docs yet";
    dm.appendChild(none);
  }

  /* ---- Render helper for the Projects dropdown ---- */
  function renderProjects(list) {
    pm.innerHTML = '<span class="muted">Public repositories</span>';
    if (!list.length) {
      const none = document.createElement("span");
      none.className = "muted"; none.textContent = "No repositories found";
      pm.appendChild(none);
      return;
    }
    list.forEach(p => {
      const a = document.createElement("a");
      a.href = p.url; a.target = "_blank"; a.rel = "noopener";
      a.textContent = p.name;
      pm.appendChild(a);
    });
  }

  /* ---- Manual fallback list (from PROJECTS) ---- */
  function manualList() {
    return (window.PROJECTS || []).map(p => ({
      name: p.name,
      url: p.pages || p.repo
    }));
  }

  /* ---- Auto-discovery from the GitHub REST API ---- */
  function loadFromGitHub() {
    const user = window.GH_USER;
    const per = OPT.maxRepos || 100;
    const sort = OPT.sortBy === "name" ? "full_name"
               : OPT.sortBy === "stars" ? "updated"  // stars sorted client-side below
               : "updated";
    const url = `https://api.github.com/users/${user}/repos?per_page=${per}&sort=${sort}`;

    fetch(url, { headers: { "Accept": "application/vnd.github+json" } })
      .then(r => {
        if (!r.ok) throw new Error("GitHub API " + r.status);
        return r.json();
      })
      .then(repos => {
        if (!Array.isArray(repos)) throw new Error("Unexpected response");
        let list = repos.filter(r => {
          if (OPT.excludeForks && r.fork) return false;
          if (OPT.excludeArchived && r.archived) return false;
          if (OPT.hideSelfNamedSite &&
              r.name.toLowerCase() === (user + ".github.io").toLowerCase()) return false;
          const nm = r.name.toLowerCase();
          const hide = (OPT.hideRepos || []).map(s => s.toLowerCase());
          const only = (OPT.onlyRepos || []).map(s => s.toLowerCase());
          if (hide.includes(nm)) return false;
          if (only.length && !only.includes(nm)) return false;
          return true;
        });

        if (OPT.sortBy === "stars") {
          list.sort((a, b) => b.stargazers_count - a.stargazers_count);
        } else if (OPT.sortBy === "name") {
          list.sort((a, b) => a.name.localeCompare(b.name));
        }

        // Prefer the live Pages URL when the repo has Pages enabled
        const mapped = list.map(r => ({
          name: r.name,
          url: r.has_pages ? `https://${user}.github.io/${r.name}` : r.html_url
        }));

        // Merge in any manual PROJECTS not already present (e.g. repos on other accounts)
        const names = new Set(mapped.map(m => m.name.toLowerCase()));
        manualList().forEach(m => {
          if (!names.has(m.name.toLowerCase())) mapped.push(m);
        });

        renderProjects(mapped);
      })
      .catch(() => {
        // Rate-limited or offline: fall back to the manual list
        renderProjects(manualList());
      });
  }

  if (OPT.autoProjects && window.GH_USER && window.GH_USER !== "USERNAME") {
    loadFromGitHub();
  } else {
    renderProjects(manualList());
  }

  /* ---- Dropdown open/close ---- */
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