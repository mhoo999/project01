(function () {
  const track = document.querySelector('.brand__capsule-track');
  if (!track) return;

  const originals = Array.from(track.children);
  const gap = 48;
  const speed = 0.6; // px per frame (낮을수록 느림)

  // 원본 복제해서 뒤에 추가
  originals.forEach(el => track.appendChild(el.cloneNode(true)));

  // 루프 기준 너비: 원본 아이템 너비 합 + 아이템 수만큼의 gap
  function getLoopWidth() {
    const itemWidth = originals[0].offsetWidth;
    return originals.length * (itemWidth + gap);
  }

  let x = 0;

  function animate() {
    x -= speed;
    const loopWidth = getLoopWidth();
    if (x <= -loopWidth) x += loopWidth;
    track.style.transform = `translateX(${x}px)`;
    requestAnimationFrame(animate);
  }

  animate();
})();
