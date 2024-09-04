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

  // FORMAL & INFORMAL SETTING TOGGLE
  const formalSVG = document.getElementById('formal') || undefined;
  const informalSVG = document.getElementById('informal') || undefined;
  let currentUrl = window.location.href.split('/');
  currentUrl.pop();
  let newUrl = currentUrl.join('/');

  const settingToggleButton = document.getElementById('formal-informal-toggle');

  if (settingToggleButton) {
    const currentSetting =
      formalSVG.getAttribute('initially-hidden') === 'true'
        ? 'formal'
        : 'informal';
    document.documentElement.setAttribute('setting', currentSetting);

    settingToggleButton.addEventListener('click', () => {
      const newSetting =
        document.documentElement.getAttribute('setting') === 'formal'
          ? 'informal'
          : 'formal';

      document.documentElement.setAttribute('setting', newSetting);
      // allow updating the link dynamically with the theme button
      updateSetting(
        newSetting,
        formalSVG,
        informalSVG,
        newUrl,
        (isSwitchingPage = true)
      );
      // localStorage.setItem('setting', newSetting);
    });
  }

  function updateSetting(
    setting,
    formalSVG,
    informalSVG,
    baseUrl,
    isSwitchingPage
  ) {
    if (setting === 'formal') {
      informalSVG.style.display = 'none';
      formalSVG.style.display = 'block';
      baseUrl += '/index.html';
    } else {
      informalSVG.style.display = 'block';
      formalSVG.style.display = 'none';
      baseUrl += '/casual.html';
    }

    if (isSwitchingPage) {
      window.location.href = baseUrl;
    }
  }

  // NAV RESIZE BURGER MENU
  document.getElementById('burger-icon').addEventListener('click', function () {
    this.classList.toggle('open');
    document.getElementById('nav-menu').classList.toggle('open');
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

  // DYNAMICALLY ADJUST BODY WIDTH WHEN SCROLLBAR POPS UP
  function adjustPaddingForScrollbar() {
    const hasVerticalScrollbar =
      window.innerWidth > document.documentElement.clientWidth;
    document.body.style.paddingRight = hasVerticalScrollbar ? '0' : '17px'; // 17px is a common scrollbar width
    console.log(window.innerWidth);
    console.log(document.documentElement.clientWidth);
  }

  adjustPaddingForScrollbar();
  window.addEventListener('resize', adjustPaddingForScrollbar);

  // SMOOTH PAGE TRANSITIONS
  const enableTransitions = false;
  // Select the elements you want to apply the transitions to
  const elements = ['#content', '#section-wrapper'];

  // Apply the transition effect only when clicking on links
  const links = document.querySelectorAll('a');

  if (enableTransitions)
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        if (!link.classList.contains('current-page')) {
          // Get the target attribute of the link (e.g., _blank, _self)
          const target = link.getAttribute('target');

          // If the target is _blank or similar, do not apply the fade-out effect
          if (
            target === '_blank' ||
            target === '_parent' ||
            target === '_top'
          ) {
            return; // Exit early to open the link normally without effects
          }

          // Prevent default navigation to apply the transition first
          e.preventDefault();

          // If instead of specific sections we want to apply the face-out effect for the whole body
          // document.body.classList.add('fade-exit-active');
          // setTimeout(() => {
          //   window.location = link.href;
          // }, 500); // Match this with your CSS transition duration

          // Find the elements with the specific IDs and apply the fade-out effect
          elements.forEach((selector) => {
            const element = document.querySelector(selector);
            if (element) {
              element.classList.add('fade-exit-active');
            }
          });

          // Navigate to the new URL after the fade-out animation
          setTimeout(() => {
            // Handle navigation depending on the link target
            if (!target || target === '_self') {
              // Regular navigation
              window.location.href = link.href;
            } else {
              // Open in the specified target
              window.open(link.href, target);
            }
          }, 500); // This timing matches the CSS transition duration
        }
      });
    });
});
