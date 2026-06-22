(function () {
  "use strict";

  const STYLE_ID = "wanklean-reddit-style";
  const KEY = "wankleanEnabled";
  let observer = null;

  // ── Styles complets ──────────────────────────
  const CSS = `
    /* Retirer sidebars */
    #left-sidebar-container,
    #right-sidebar-container { display: none !important; }

    /* Retirer header action items */
    reddit-header-action-items { display: none !important; }

    /* ── Retirer le grid de div[3] (grid-container theme-rpl grid flex-nav-expanded) ── */
    shreddit-app > div.grid-container {
      display: block !important;
      grid-template-columns: none !important;
      grid-template-rows: none !important;
    }

    /* ── Centrer le subgrid-container ── */
    .subgrid-container {
      margin-left: auto !important;
      margin-right: auto !important;
      max-width: 1120px !important;
      width: 100% !important;
    }

    /* Forcer une seule colonne — main-container en flex */
    .main-container {
      display: flex !important;
      flex-direction: column !important;
      max-width: 1120px !important;
      width: 100% !important;
      margin-left: auto !important;
      margin-right: auto !important;
    }

    .main-container[class*="grid-cols"],
    .main-container.fixed-sidebar,
    .main-container.flex-sidebar {
      grid-template-columns: 1fr !important;
      display: flex !important;
      flex-direction: column !important;
    }

    .main-container > * {
      max-width: 100% !important;
      width: 100% !important;
    }

    /* Pubs */
    [data-testid="promoted-post"],
    .promotedlink,
    [data-adclicklocation] { display: none !important; }
  `;

  // ── Injecter styles ──────────────────────────
  function inject() {
    if (document.getElementById(STYLE_ID)) return;
    const s = document.createElement("style");
    s.id = STYLE_ID;
    s.textContent = CSS;
    document.documentElement.appendChild(s);
  }

  // ── Retirer styles ───────────────────────────
  function remove() {
    const s = document.getElementById(STYLE_ID);
    if (s) s.remove();
  }

  // ── Supprimer éléments ───────────────────────
  function removeElements() {
    const sel = [
      "#left-sidebar-container",
      "#right-sidebar-container",
      "reddit-header-action-items",
      '[data-testid="promoted-post"]',
      ".promotedlink",
      '[data-adclicklocation]',
    ];
    sel.forEach((s) => document.querySelectorAll(s).forEach((e) => e.remove()));
  }

  // ── Observer DOM (seulement si activé) ───────
  function startObserver() {
    stopObserver();
    observer = new MutationObserver(() => removeElements());
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function stopObserver() {
    if (observer) { observer.disconnect(); observer = null; }
  }

  // ── Activer ──────────────────────────────────
  function enable() {
    inject();
    removeElements();
    startObserver();
    console.log("[Wanklean] ✓ Activé");
  }

  // ── Désactiver ───────────────────────────────
  function disable() {
    remove();
    stopObserver();
    console.log("[Wanklean] ✗ Désactivé");
  }

  // ── Message du popup ─────────────────────────
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "enable") enable();
    else if (msg.action === "disable") disable();
  });

  // ── Init : ne RIEN faire si pas activé ───────
  function init() {
    chrome.storage.sync.get([KEY], (result) => {
      if (result[KEY] === true) {
        enable();
      }
      // sinon : ne rien faire du tout
    });
  }

  if (document.body) init();
  else document.addEventListener("DOMContentLoaded", init);
})();
