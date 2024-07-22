// JavaScript for theme toggle
document.addEventListener('DOMContentLoaded', () => {
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
