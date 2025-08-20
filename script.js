
// Theme toggle & small UI effects
const root = document.documentElement;
const toggle = () => {
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('zb-theme', next);
};
const saved = localStorage.getItem('zb-theme');
if(saved){ root.setAttribute('data-theme', saved); }

// Animate cards on viewport
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.style.transform = 'translateY(0) scale(1)';
      e.target.style.opacity = '1';
      obs.unobserve(e.target);
    }
  })
}, {threshold:.1});
document.querySelectorAll('.card').forEach(c => {
  c.style.transform = 'translateY(12px) scale(.98)'; c.style.opacity = '.0';
  c.style.transition = 'all .45s cubic-bezier(.2,.8,.2,1)';
  obs.observe(c);
});

// Simple client-side search on blog listing
function filterPosts(){
  const q = (document.getElementById('q').value || '').toLowerCase().trim();
  document.querySelectorAll('[data-post-card]').forEach(card => {
    const hay = (card.getAttribute('data-title') + ' ' + card.getAttribute('data-date')).toLowerCase();
    card.style.display = hay.includes(q) ? '' : 'none';
  });
}
