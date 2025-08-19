// Theme toggle
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const root = document.documentElement;
    const light = root.getAttribute('data-theme') === 'light';
    root.setAttribute('data-theme', light ? 'dark' : 'light');
    localStorage.setItem('zb_theme', light ? 'dark' : 'light');
  });
  const saved = localStorage.getItem('zb_theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
}
// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(open));
  });
}
// Simple slider arrows
document.querySelectorAll('.slider').forEach(slider => {
  const prev = slider.querySelector('.slider-prev');
  const next = slider.querySelector('.slider-next');
  const track = slider.querySelector('.slides');
  if (prev && next && track) {
    prev.addEventListener('click', () => track.scrollBy({left: -300, behavior: 'smooth'}));
    next.addEventListener('click', () => track.scrollBy({left: 300, behavior: 'smooth'}));
  }
});
// Tilt shim (no external lib, just a tiny hover effect)
document.querySelectorAll('[data-tilt]').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateX(${-y*6}deg) rotateY(${x*6}deg)`;
  });
  el.addEventListener('mouseleave', () => el.style.transform = 'none');
});
// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
