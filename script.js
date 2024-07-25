document.addEventListener('DOMContentLoaded', () => {
  // NAV RESIZE BURGER MENU
  const burgerMenu = document.getElementById('burger-menu');
  const navLinks = document.getElementById('nav-links');

  burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

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
    localStorage.setItem('theme', newTheme);
  });
});
