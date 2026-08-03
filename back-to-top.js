(function () {
  var btn = document.createElement('button');
  btn.id = 'backToTop';
  btn.setAttribute('aria-label', 'ページの上部に戻る');
  btn.innerHTML = '&#8593;';
  document.body.appendChild(btn);

  function toggle() {
    if (window.scrollY > 480) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  }

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
})();
