const body = document.body;
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const mobileMenuQuery = window.matchMedia('(max-width: 1080px)');

function syncMenuA11y() {
  if (!nav) return;
  const isOpen = body.classList.contains('menu-open');
  const shouldHideFromAssistiveTech = mobileMenuQuery.matches && !isOpen;
  nav.setAttribute('aria-hidden', String(shouldHideFromAssistiveTech));
}

function closeMenu() {
  body.classList.remove('menu-open');
  if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
  syncMenuA11y();
}

syncMenuA11y();

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = body.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    syncMenuA11y();
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  if (typeof mobileMenuQuery.addEventListener === 'function') {
    mobileMenuQuery.addEventListener('change', closeMenu);
  } else if (typeof mobileMenuQuery.addListener === 'function') {
    mobileMenuQuery.addListener(closeMenu);
  }
}
