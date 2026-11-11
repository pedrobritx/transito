(function () {
  "use strict";
  var toggle = document.querySelector("[data-menu-toggle]");
  var menu = document.querySelector("[data-navigation]");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? toggle.getAttribute("data-close") : toggle.getAttribute("data-open"));
    });
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }
  var tabs = Array.prototype.slice.call(document.querySelectorAll("[data-showcase-tab]"));
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var selected = tab.getAttribute("data-showcase-tab");
      tabs.forEach(function (t) { t.setAttribute("aria-selected", String(t === tab)); });
      document.querySelectorAll("[data-screen]").forEach(function (screen) {
        screen.classList.toggle("active", screen.getAttribute("data-screen") === selected);
      });
    });
  });
  var input = document.querySelector("[data-faq-search]");
  if (input) {
    input.addEventListener("input", function () {
      var term = input.value.toLocaleLowerCase().trim();
      document.querySelectorAll(".faq-item").forEach(function (item) {
        item.hidden = !item.textContent.toLocaleLowerCase().includes(term);
      });
      var empty = document.querySelector("[data-faq-empty]");
      if (empty) empty.hidden = Array.prototype.some.call(document.querySelectorAll(".faq-item"), function (i) { return !i.hidden; });
    });
  }
  var links = Array.prototype.slice.call(document.querySelectorAll("[data-download-link]"));
  if (!links.length) return;
  var fallback = "https://github.com/pedrobritx/transito/actions/runs/42895179261";
  links.forEach(function (link) { link.href = fallback; });
  if (!("fetch" in window)) return;
  fetch("https://api.github.com/repos/pedrobritx/transito/releases?per_page=10", { headers: { Accept: "application/vnd.github+json" } })
    .then(function (response) { if (!response.ok) throw new Error("GitHub API unavailable"); return response.json(); })
    .then(function (releases) {
      var found = null;
      releases.some(function (release) {
        if (release.draft || release.prerelease) return false;
        var assets = (release.assets || []).filter(function (a) { return /\.(dmg|zip)$/i.test(a.name); });
        if (assets.length) {
          found = { release: release, asset: assets.find(function (a) { return /\.dmg$/i.test(a.name); }) || assets[0] };
          return true;
        }
        return false;
      });
      if (!found) return;
      links.forEach(function (link) {
        link.href = found.asset.browser_download_url;
        var label = link.getAttribute("data-asset-label");
        if (label) link.setAttribute("aria-label", label + " " + found.release.tag_name);
      });
      document.querySelectorAll("[data-download-note]").forEach(function (note) {
        note.textContent = (document.documentElement.lang === "pt-BR" ? "Versão publicada " : "Published release ") + found.release.tag_name + " · " + found.asset.name;
      });
    }).catch(function () {
      // Keep the explicit CI artifact fallback if GitHub's API is unavailable.
    });
})();
