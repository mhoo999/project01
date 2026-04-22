(function () {
  var wrapper  = document.querySelector('.expand-wrapper');
  var section  = document.querySelector('.expand');
  var pill     = document.querySelector('.expand__pill');
  var textMask = document.querySelector('.expand__text-mask');
  if (!wrapper || !section || !pill) return;

  function isMobile() { return window.innerWidth <= 768; }

  function update() {
    if (isMobile()) {
      pill.style.width  = '';
      pill.style.height = '';
      if (textMask) textMask.style.opacity = '';
      return;
    }

    var wrapperRect = wrapper.getBoundingClientRect();
    var scrollable  = wrapper.offsetHeight - section.offsetHeight;
    var progress    = Math.min(1, Math.max(0, -wrapperRect.top / scrollable));

    var minW = 16, maxW = 180;
    var minH = 28, maxH = 240;
    pill.style.width  = (minW + (maxW - minW) * progress) + '%';
    pill.style.height = (minH + (maxH - minH) * progress) + '%';

    if (textMask) {
      var t = Math.max(0, Math.min(1, (progress - 0.6) / 0.4));
      textMask.style.opacity = t;
    }
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
})();
