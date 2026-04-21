(function () {
  var wrapper  = document.querySelector('.expand-wrapper');
  var section  = document.querySelector('.expand');
  var overlay  = document.querySelector('.expand__overlay');
  var textMask = document.querySelector('.expand__text-mask');
  var panelsEl = document.querySelector('.expand__panels');
  if (!wrapper || !overlay) return;

  function setMask(el, w, h, isHole) {
    var inner = isHole ? 'transparent' : 'white';
    var outer = isHole ? 'white'       : 'transparent';
    var val = 'radial-gradient(ellipse ' + w + 'px ' + h + 'px at center, '
              + inner + ' 99%, ' + outer + ' 100%)';
    el.style.webkitMaskImage = val;
    el.style.maskImage = val;
  }

  function update() {
    var wrapperRect  = wrapper.getBoundingClientRect();
    var scrollable   = wrapper.offsetHeight - section.offsetHeight;
    var progress     = Math.min(1, Math.max(0, -wrapperRect.top / scrollable));

    var sw = section.offsetWidth;
    var sh = section.offsetHeight;

    var minW = sw * 0.18,  maxW = sw * 0.72;
    var minH = sh * 0.18,  maxH = sh * 0.72;
    var w = minW + (maxW - minW) * progress;
    var h = minH + (maxH - minH) * progress;

    setMask(overlay, w, h, true);
    if (textMask) setMask(textMask, w, h, false);
    if (panelsEl) setMask(panelsEl, w, h, true);
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
})();
