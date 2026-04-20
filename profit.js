(function () {
  const section = document.querySelector('.profit');
  const clipRect = document.querySelector('.profit__graph-clip');
  if (!section || !clipRect) return;

  let animated = false;

  function animate() {
    if (animated) return;
    animated = true;

    const duration = 2400;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeInOut
      const ease = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      clipRect.setAttribute('width', ease * 1440);

      if (progress < 1) requestAnimationFrame(step);
      else {
        // 앱박스 등장
        section.classList.add('is-visible');
      }
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate();
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(section);
})();
