(function () {
  "use strict";
  const KEY = "wankleanEnabled";
  const toggle = document.getElementById("toggle");
  const statusText = document.getElementById("statusText");

  // Charger l'état (désactivé par défaut)
  chrome.storage.sync.get([KEY], (result) => {
    const enabled = result[KEY] === true;
    toggle.checked = enabled;
    updateStatus(enabled);
  });

  // Toggle
  toggle.addEventListener("change", () => {
    const enabled = toggle.checked;
    chrome.storage.sync.set({ [KEY]: enabled });
    updateStatus(enabled);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: enabled ? "enable" : "disable",
        });
      }
    });
  });

  function updateStatus(enabled) {
    statusText.textContent = enabled ? "activé" : "désactivé";
    statusText.className = enabled ? "" : "off";
  }
})();
