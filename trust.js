(function () {
  const wrap = document.querySelector('.trust__scroll-wrap');
  const track = document.querySelector('.trust__scroll-track');
  if (!track || !wrap) return;

  const originals = Array.from(track.children);
  const gap = 0;
  const speed = 0.4;

  // 랩 높이의 3배 이상이 되도록 클론 반복 추가
  function fillClones() {
    const wrapHeight = wrap.offsetHeight;
    while (track.offsetHeight < wrapHeight * 3) {
      originals.forEach(el => track.appendChild(el.cloneNode(true)));
    }
  }

  fillClones();

  function getLoopHeight() {
    const itemHeight = originals[0].offsetHeight;
    return originals.length * (itemHeight + gap);
  }

  let y = 0;

  function animate() {
    y -= speed;
    if (y <= -getLoopHeight()) y += getLoopHeight();
    track.style.transform = `translateY(${y}px)`;
    requestAnimationFrame(animate);
  }

  animate();
})();
