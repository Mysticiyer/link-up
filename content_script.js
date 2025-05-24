let profileLink = null;

// Try to grab a reliable profile link
const possibleSelectors = [
  'a[href*="/in/"]:not([href*="/edit/"])',
  'a[data-control-name="identity_profile"]'
];

for (const selector of possibleSelectors) {
  const el = document.querySelector(selector);
  if (el && el.href.includes("/in/")) {
    profileLink = el.href;
    break;
  }
}

// Fallback: use current page URL if it includes /in/
if (!profileLink && window.location.href.includes("/in/")) {
  profileLink = window.location.href;
}

// Extract clean LinkedIn profile URL (truncate after /in/username)
if (profileLink) {
  const match = profileLink.match(/https:\/\/www\.linkedin\.com\/in\/[^\/?#]+/);
  const cleanUrl = match ? match[0] : null;
  chrome.runtime.sendMessage({ profileUrl: cleanUrl });
} else {
  chrome.runtime.sendMessage({ profileUrl: null });
}

