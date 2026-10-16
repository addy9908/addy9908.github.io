/* Builds the shared site header on every page, and appends a single
   site-wide visit counter to the footer.
   Requires: set data-root on <body> ("" for root pages, "../" for subfolders). */

(function () {
  var root = document.body.getAttribute("data-root") || "";

  // ---------- header ----------
  var header = document.createElement("header");
  header.className = "site";
  header.innerHTML =
    '<div class="container nav">' +
      '<a class="brand" href="' + root + 'index.html">Zengyou Ye</a>' +
      '<a class="link" href="' + root + 'index.html">Home</a>' +
      '<a class="link" href="' + root + 'projects.html">Projects</a>' +
      '<a class="link" href="' + root + 'utilities.html">Utilities</a>' +
      '<a class="link" href="' + root + 'research.html">Research</a>' +
      '<a class="link" href="' + root + 'links.html">Links</a>' +
      '<a class="link" href="' + root + 'documents.html">Documents</a>' +
    '</div>';
  document.body.prepend(header);

  // ---------- current-year in footer ----------
  var y = document.getElementById("year");
  if (y) { y.textContent = new Date().getFullYear(); }

  // ---------- site-wide visit counter ----------
  // One shared count for the whole site (same URL string on every page).
  // Badge renders only when online; if hits.sh is unreachable it's hidden.
  var counter = document.createElement("div");
  counter.style.cssText = "text-align:center;margin-top:10px";
  counter.innerHTML =
    '<a href="https://hits.sh/addy9908.github.io/" target="_blank" rel="noopener">' +
      '<img alt="Site visits" ' +
           'src="https://hits.sh/addy9908.github.io.svg?label=Site%20visits&color=2f8f4e" ' +
           'onerror="this.parentNode.style.display=\'none\'">' +
    '</a>';

  var footer = document.querySelector("footer");
  if (footer) { footer.appendChild(counter); }
  else { document.body.appendChild(counter); }
})();