(function () {
  const section = document.querySelector('.profit');
  const clipRect = document.querySelector('.profit__graph-clip');
  const graphLine = document.querySelector('.profit__graph-line');
  const leadGlow = document.querySelector('.profit__lead-glow');
  const leadDot = document.querySelector('.profit__lead-dot');
  const nodeGroups = document.querySelectorAll('.profit__node-group');

  if (!section || !clipRect || !graphLine) return;

  const VIEWBOX_W = 1440;
  let totalLength = 0;
  let animated = false;

  // 경로 총 길이 (stroke-dashoffset 불필요, 리딩 도트 위치 계산용)
  try { totalLength = graphLine.getTotalLength(); } catch (e) { totalLength = 1800; }

  // 각 노드의 x 위치 → ease 비율로 등장 타이밍 결정
  const nodeThresholds = Array.from(nodeGroups).map(g => ({
    el: g,
    threshold: parseFloat(g.dataset.x) / VIEWBOX_W,
    triggered: false,
  }));

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animate() {
    if (animated) return;
    animated = true;

    const DURATION = 2600;
    const start = performance.now();

    function step(now) {
      const raw = Math.min((now - start) / DURATION, 1);
      const ease = easeInOutCubic(raw);

      // 클립 rect 확장 (채움 + 그리드 + 라인 일괄 리빌)
      clipRect.setAttribute('width', ease * VIEWBOX_W);

      // 리딩 글로우 도트: 경로 위 현재 지점으로 이동
      if (raw < 0.98) {
        try {
          const pt = graphLine.getPointAtLength(ease * totalLength);
          leadGlow.setAttribute('cx', pt.x);
          leadGlow.setAttribute('cy', pt.y);
          leadDot.setAttribute('cx', pt.x);
          leadDot.setAttribute('cy', pt.y);
          leadGlow.style.opacity = '1';
          leadDot.style.opacity = '1';
        } catch (e) {}
      } else {
        leadGlow.style.opacity = '0';
        leadDot.style.opacity = '0';
      }

      // 클립이 노드 x에 도달하면 팝인
      nodeThresholds.forEach(nd => {
        if (!nd.triggered && ease >= nd.threshold - 0.005) {
          nd.triggered = true;
          nd.el.classList.add('is-visible');
        }
      });

      if (raw < 1) {
        requestAnimationFrame(step);
      } else {
        section.classList.add('is-visible'); // 앱박스 등장
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
  }, { threshold: 0.25 });

  observer.observe(section);
})();
