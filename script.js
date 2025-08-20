document.addEventListener('DOMContentLoaded', () => {
  const scrollBtn = document.querySelector('.scroll-down');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector('.posts');
      if (!target) return;
      const prefersReduced = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      target.scrollIntoView({
        behavior: prefersReduced ? 'auto' : 'smooth',
        block: 'start'
      });
    });
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('fade-in'); // ← было 'in-view'
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

  document.querySelectorAll('.posts-item').forEach(el => io.observe(el));
});
