document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("copyBtn").addEventListener("click", () => {
    document.getElementById("status").textContent = "Searching for profile link...";

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['content_script.js']
      });
    });
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (!message.profileUrl) {
      document.getElementById("status").textContent = "❌ Profile URL not found.";
      return;
    }

    navigator.clipboard.writeText(message.profileUrl).then(() => {
      document.getElementById("status").textContent = "✅ Profile URL copied!";
    }).catch(err => {
      document.getElementById("status").textContent = "⚠️ Failed to copy.";
    });
  });
});

