document.addEventListener('DOMContentLoaded', () => {
  // DARK & LIGHT THEME TOGGLE
  // The initial data-theme is set by the inline script in <head>,
  // before the first paint, to avoid a flash of the wrong theme.
  const currentTheme = document.documentElement.getAttribute('data-theme');

  const toggleButton = document.getElementById('theme-toggle');
  toggleButton.addEventListener('click', () => {
    const newTheme =
      document.documentElement.getAttribute('data-theme') === 'light'
        ? 'dark'
        : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    updateLinkHref(newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // CHANGE CV LINK ON THEME TOGGLE
  const themeLink = document.getElementById('theme-link');

  function updateLinkHref(theme) {
    if (theme === 'light' && themeLink) {
      themeLink.setAttribute('href', 'assets/resume_light.pdf');
    } else if (theme !== 'light' && themeLink) {
      themeLink.setAttribute('href', 'assets/resume.pdf');
    }
  }

  updateLinkHref(currentTheme);

  // NAV RESIZE BURGER MENU
  const burgerIcon = document.getElementById('burger-icon');
  burgerIcon.addEventListener('click', () => {
    const isOpen = burgerIcon.classList.toggle('open');
    document.getElementById('nav-menu').classList.toggle('open', isOpen);
    burgerIcon.setAttribute('aria-expanded', isOpen);
  });
});
