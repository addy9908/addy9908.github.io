/* Builds the shared site header on every page.
   Requires data.js to be loaded before this file.
   On each page, set data-root on <body>:
     - ""    for pages in the site root (index.html, projects.html, etc.)
     - "../" for pages inside a subfolder (e.g. projects/imoss.html)
   Projects is a single page (projects.html) — there are no dropdowns. */

(function () {
  var root = document.body.getAttribute("data-root") || "";

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

  // Fill any <span id="year"> in the footer with the current year.
  var y = document.getElementById("year");
  if (y) { y.textContent = new Date().getFullYear(); }
})();