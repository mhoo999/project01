(function () {
  const grid = document.querySelector('.guide__grid');
  if (!grid) return;

  const cards   = [...grid.querySelectorAll('.guide__card')];
  const hArrows = [...grid.querySelectorAll('.guide__arrow--h')];
  const canvas     = document.querySelector('.guide__canvas');
  const ctx        = canvas.getContext('2d');
  let particles    = [];
  let rafId        = null;

  // 캔버스 크기 동기화
  function resizeCanvas() {
    const inner = document.querySelector('.guide__inner');
    canvas.width  = inner.offsetWidth;
    canvas.height = inner.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // 폭죽 파티클 발사
  const COLORS      = ['#FF6136','#FFD700','#4CAF50','#2196F3','#E91E63','#FF9800'];
  const COLORS_OPEN = ['#FFD700','#FF6136','#fff','#FF9A5C','#FFF176','#FFAB40'];

  function fireConfetti(cardEl, isOpen) {
    const canvasRect = canvas.getBoundingClientRect();
    const cardRect   = cardEl.getBoundingClientRect();
    const cx = cardRect.left - canvasRect.left + cardRect.width / 2;
    const cy = cardRect.top  - canvasRect.top  + cardRect.height / 2;
    const count  = isOpen ? 120 : 40;
    const maxSz  = isOpen ? 12  : 6;
    const colors = isOpen ? COLORS_OPEN : COLORS;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 4 + 2) * (isOpen ? 1.8 : 1);
      particles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (Math.random() * 3 + 1),
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * maxSz + 3,
        alpha: 1,
        decay: Math.random() * 0.012 + 0.008,
        gravity: 0.15,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
      });
    }
    if (!rafId) startLoop();
  }

  function startLoop() {
    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.vy += p.gravity; p.x += p.vx; p.y += p.vy;
        p.alpha -= p.decay; p.rotation += p.rotSpeed;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle   = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
      });
      particles = particles.filter(p => p.alpha > 0);
      rafId = particles.length > 0 ? requestAnimationFrame(loop) : null;
    }
    rafId = requestAnimationFrame(loop);
  }

  // 순차 등장 시퀀스 (카드 순서대로)
  function runSequence() {
    const steps = [
      { el: cards[0],   isCard: true,  cardIdx: 0 },
      { el: hArrows[0], isCard: false },
      { el: cards[1],   isCard: true,  cardIdx: 1 },
      { el: hArrows[1], isCard: false },
      { el: cards[2],   isCard: true,  cardIdx: 2 },
      { el: cards[3],   isCard: true,  cardIdx: 3 },
      { el: hArrows[2], isCard: false },
      { el: cards[4],   isCard: true,  cardIdx: 4 },
      { el: hArrows[3], isCard: false },
      { el: cards[5],   isCard: true,  cardIdx: 5 },
      { el: cards[6],   isCard: true,  cardIdx: 6 },
      { el: hArrows[4], isCard: false },
      { el: cards[7],   isCard: true,  cardIdx: 7 },
      { el: hArrows[5], isCard: false },
      { el: cards[8],   isCard: true,  cardIdx: 8 },  // 오픈
    ];

    steps.forEach((step, i) => {
      setTimeout(() => {
        step.el.classList.add('is-visible');
        if (step.isCard && step.cardIdx === 8) fireConfetti(step.el, true);
      }, i * 150);
    });
  }

  // IntersectionObserver — 그리드 10% 진입 시 1회 발동
  let triggered = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !triggered) {
        triggered = true;
        observer.disconnect();
        runSequence();
      }
    });
  }, { threshold: 0.1 });
  observer.observe(grid);
})();
