document.addEventListener('DOMContentLoaded', () => {
  // DARK & LIGHT THEME TOGGLE
  // The initial data-theme is set by the inline script in <head>,
  // before the first paint, to avoid a flash of the wrong theme.
  const currentTheme = document.documentElement.getAttribute('data-theme');

  const toggleButton = document.getElementById('theme-toggle');
  const toggleOpts = toggleButton.querySelectorAll('.opt');

  function updateToggleState(theme) {
    toggleOpts.forEach((o) =>
      o.classList.toggle('active', o.dataset.t === theme)
    );
  }

  updateToggleState(currentTheme);

  toggleButton.addEventListener('click', () => {
    const newTheme =
      document.documentElement.getAttribute('data-theme') === 'light'
        ? 'dark'
        : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    updateLinkHref(newTheme);
    updateToggleState(newTheme);
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

  // STICKY HEADER HAIRLINE, shown only once content scrolls beneath it
  const header = document.querySelector('header');
  const updateHairline = () =>
    header.classList.toggle('scrolled', window.scrollY > 0);
  updateHairline();
  window.addEventListener('scroll', updateHairline, { passive: true });
});
