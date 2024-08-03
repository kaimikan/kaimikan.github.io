document.addEventListener('DOMContentLoaded', () => {
  // DARK & LIGHT THEME TOGGLE
  const prefersDarkScheme = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;
  const initialTheme =
    localStorage.getItem('theme') || (prefersDarkScheme ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initialTheme);

  const toggleButton = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  toggleButton.addEventListener('click', () => {
    const newTheme =
      document.documentElement.getAttribute('data-theme') === 'light'
        ? 'dark'
        : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    // allow updating the link dynamically with the theme button
    updateLinkHref(newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // NAV RESIZE BURGER MENU
  document.getElementById('burger-icon').addEventListener('click', function () {
    this.classList.toggle('open');
    document.getElementById('nav-menu').classList.toggle('open');
  });

  // CHANGE CV LINK ON THEME TOGGLE
  const themeLink = document.getElementById('theme-link');

  function updateLinkHref(theme) {
    if (theme === 'light') {
      themeLink.setAttribute('href', 'assets/resume_light.pdf');
    } else {
      themeLink.setAttribute('href', 'assets/resume.pdf');
    }
  }

  updateLinkHref(currentTheme);

  // DYNAMICALLY ADJUST BODY WIDTH WHEN SCROLLBAR POPS UP
  function adjustPaddingForScrollbar() {
    const hasVerticalScrollbar =
      window.innerWidth > document.documentElement.clientWidth;
    document.body.style.paddingRight = hasVerticalScrollbar ? '0' : '17px'; // 17px is a common scrollbar width
  }

  adjustPaddingForScrollbar();
  window.addEventListener('resize', adjustPaddingForScrollbar);
});
