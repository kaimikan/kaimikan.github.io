document.addEventListener('DOMContentLoaded', () => {
  // NAV RESIZE BURGER MENU
  document.getElementById('burger-icon').addEventListener('click', function () {
    this.classList.toggle('open');
    document.getElementById('nav-menu').classList.toggle('open');
  });

  // CHANGE CV LINK ON THEME TOGGLE
  const themeLink = document.getElementById('theme-link');

  function updateLinkHref() {
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'light') {
      themeLink.setAttribute('href', 'assets/resume.pdf');
    } else {
      themeLink.setAttribute('href', 'assets/resume_dark.pdf');
    }
  }

  // Initially set the correct link href
  updateLinkHref();

  // DARK & LIGHT THEME TOGGLE
  const prefersDarkScheme = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;
  const initialTheme =
    localStorage.getItem('theme') || (prefersDarkScheme ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initialTheme);

  const toggleButton = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);

  toggleButton.addEventListener('click', () => {
    const newTheme =
      document.documentElement.getAttribute('data-theme') === 'light'
        ? 'dark'
        : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    // allow updating the link dynamically with the theme button
    updateLinkHref();
    localStorage.setItem('theme', newTheme);
  });
});
