document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.classList.toggle('active');
    });
  }

  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
  });

  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    }),
    { threshold: 0.1 }
  );
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
