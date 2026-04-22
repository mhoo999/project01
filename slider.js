(function () {
  const viewport = document.querySelector('.slider-viewport');
  const track = document.querySelector('.slider-track');
  const progressBar = document.querySelector('.slider-progress__bar');
  const prevBtn = document.querySelector('.slider-btn--prev');
  const nextBtn = document.querySelector('.slider-btn--next');

  const originalSlides = Array.from(track.querySelectorAll('.slide'));
  const total = originalSlides.length;

  const isMobile = () => window.innerWidth <= 768;

  // 앞뒤 클론 추가
  originalSlides.forEach(slide => {
    track.appendChild(slide.cloneNode(true));
    track.insertBefore(slide.cloneNode(true), track.firstChild);
  });

  let current = total; // 클론 앞쪽 개수만큼 오프셋
  let isTransitioning = false;

  function getGap() {
    return isMobile() ? 0 : 20;
  }

  function getSlideWidth() {
    if (isMobile()) {
      // 모바일: viewport 너비와 정확히 일치
      return viewport.offsetWidth;
    }
    // PC: 슬라이드 실제 너비 + gap
    return track.querySelectorAll('.slide')[0].offsetWidth + getGap();
  }

  function updateProgress() {
    const index = ((current - total) % total + total) % total;
    const progress = total <= 1 ? 100 : (index / (total - 1)) * 100;
    progressBar.style.width = progress + '%';
  }

  function moveTo(index, animate) {
    track.style.transition = animate ? 'transform 0.4s ease' : 'none';
    track.style.transform = `translateX(-${index * getSlideWidth()}px)`;
    updateProgress();
  }

  function next() {
    if (isTransitioning) return;
    isTransitioning = true;
    current++;
    moveTo(current, true);
  }

  function prev() {
    if (isTransitioning) return;
    isTransitioning = true;
    current--;
    moveTo(current, true);
  }

  track.addEventListener('transitionend', () => {
    if (current >= total * 2) {
      current = total;
      moveTo(current, false);
    } else if (current < total) {
      current = total * 2 - 1;
      moveTo(current, false);
    }
    isTransitioning = false;
  });

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  window.addEventListener('resize', () => {
    moveTo(current, false);
  });

  // 초기 위치
  moveTo(current, false);
})();
