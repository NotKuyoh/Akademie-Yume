// ─── LANGUAGE TOGGLE ───
(function () {
  const STORE_KEY = 'ay_lang';
  let current = localStorage.getItem(STORE_KEY) || 'de';

  function apply(lang) {
    current = lang;
    localStorage.setItem(STORE_KEY, lang);
    document.documentElement.setAttribute('data-lang', lang);

    const btn = document.getElementById('langToggle');
    if (btn) {
      btn.querySelector('[data-toggle-de]').classList.toggle('lang-active', lang === 'de');
      btn.querySelector('[data-toggle-en]').classList.toggle('lang-active', lang === 'en');
    }
  }

  function init() {
    apply(current);
    const btn = document.getElementById('langToggle');
    if (btn) {
      btn.addEventListener('click', () => apply(current === 'de' ? 'en' : 'de'));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
