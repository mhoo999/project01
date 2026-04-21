(function () {
  var section = document.querySelector('.story');
  if (!section) return;

  var track    = section.querySelector('.story__track');
  var viewport = section.querySelector('.story__viewport');
  var prevBtn  = section.querySelector('.story__prev');
  var nextBtn  = section.querySelector('.story__next');

  var origSlides = Array.from(track.querySelectorAll('.story__slide'));
  var total = origSlides.length;
  var current = total;

  // 앞뒤 클론 생성 (slider.js 동일 패턴)
  origSlides.forEach(function (s) { track.appendChild(s.cloneNode(true)); });
  origSlides.forEach(function (s) { track.insertBefore(s.cloneNode(true), track.firstChild); });

  var allSlides = Array.from(track.querySelectorAll('.story__slide'));

  function getW() { return viewport.offsetWidth; }

  function moveTo(idx, animate) {
    track.style.transition = (animate === false) ? 'none' : 'transform 0.5s ease';
    track.style.transform  = 'translateX(' + (-idx * getW()) + 'px)';
    current = idx;
  }

  function resize() {
    var w = getW();
    allSlides.forEach(function (s) { s.style.width = w + 'px'; });
    track.style.width = (allSlides.length * w) + 'px';
    moveTo(current, false);
  }

  track.addEventListener('transitionend', function () {
    if (current >= total * 2) moveTo(total, false);
    if (current <= 0)         moveTo(total, false);
  });

  function goNext() { moveTo(current + 1); }
  function goPrev() { moveTo(current - 1); }

  nextBtn.addEventListener('click', goNext);
  prevBtn.addEventListener('click', goPrev);

  var timer = setInterval(goNext, 4000);
  section.addEventListener('mouseenter', function () { clearInterval(timer); });
  section.addEventListener('mouseleave', function () { timer = setInterval(goNext, 4000); });

  window.addEventListener('resize', resize);
  resize();

  // 순차 등장 (global.js 패턴)
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      section.classList.add('story--visible');
      observer.disconnect();
    });
  }, { threshold: 0.15 });

  observer.observe(section);
})();
