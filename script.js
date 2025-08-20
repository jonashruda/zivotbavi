
// Theme toggle
const root = document.documentElement;
const saved = localStorage.getItem('zb-theme');
if(saved){ root.setAttribute('data-theme', saved); }
function toggle(){
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('zb-theme', next);
}

// Animate cards
const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.style.transform='translateY(0) scale(1)'; e.target.style.opacity='1'; obs.unobserve(e.target); } });
},{threshold:.1});
document.querySelectorAll('.card').forEach(c=>{ c.style.transform='translateY(12px) scale(.98)'; c.style.opacity='.0'; c.style.transition='all .45s cubic-bezier(.2,.8,.2,1)'; obs.observe(c); });

// Clean Divi shortcodes (runtime safety)
function cleanupDiviShortcodesIn(el){
  if(!el) return;
  let html = el.innerHTML;
  const removes = [
    /\[\/?et_pb_(?:section|row|column(?:_inner)?|column_[^\]]*)[^\]]*\]/gi,
    /\[\/?vc_(?:section|row|column(?:_inner)?)\b[^\]]*\]/gi,
    /\[\/?et_pb_image[^\]]*\]/gi,
    /\[\/?et_pb_divider[^\]]*\]/gi
  ];
  removes.forEach(rx=>{ html = html.replace(rx, ''); });
  html = html.replace(/\[et_pb_text[^\]]*\]/gi, '');
  html = html.replace(/\[\/et_pb_text\]/gi, '');
  html = html.replace(/\[(?:\/)?[a-z_]+(?:[^\]]*)\]/gi, '');
  el.innerHTML = html;
}
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.content').forEach(cleanupDiviShortcodesIn);
});

// Image fallback for missing covers
document.querySelectorAll('img').forEach(img=>{
  img.addEventListener('error', ()=>{
    const ph = document.createElement('div'); ph.className='ph';
    if (img.closest('.cover')) ph.style.height='320px';
    img.replaceWith(ph);
  });
});

// Client-side search on blog
function filterPosts(){
  const q = (document.getElementById('q').value || '').toLowerCase().trim();
  document.querySelectorAll('[data-post-card]').forEach(card => {
    const hay = (card.getAttribute('data-title') + ' ' + card.getAttribute('data-date')).toLowerCase();
    card.style.display = hay.includes(q) ? '' : 'none';
  });
}
