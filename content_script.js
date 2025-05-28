// Attempt to get the current user's profile URL from the "Me" dropdown
let profileLink = null;

const meMenuLink = document.querySelector('a[href^="/in/"][data-control-name="identity_profile_action"]');
if (meMenuLink) {
  profileLink = `https://www.linkedin.com${meMenuLink.getAttribute('href')}`;
}

// Fallback: If you're actually on your own profile page
if (!profileLink && window.location.pathname.startsWith("/in/")) {
  const loggedInUser = document.querySelector('a[href^="/in/"][data-control-name="identity_profile_action"]');
  if (loggedInUser && window.location.pathname === new URL(loggedInUser.href).pathname) {
    profileLink = window.location.href;
  }
}

// Clean the URL
if (profileLink) {
  const match = profileLink.match(/https:\/\/www\.linkedin\.com\/in\/[^\/?#]+/);
  const cleanUrl = match ? match[0] : null;
  chrome.runtime.sendMessage({ profileUrl: cleanUrl });
} else {
  chrome.runtime.sendMessage({ profileUrl: null });
}
