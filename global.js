(function () {
  const section = document.querySelector('.global');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add('is-visible');
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(section);
})();
