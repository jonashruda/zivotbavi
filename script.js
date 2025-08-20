
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
// --- Clean up WordPress Divi/WPBakery shortcodes so pages don't show raw [et_pb_*] text ---
function cleanupDiviShortcodesIn(el){
  if (!el) return;
  let html = el.innerHTML;

  // Unwrap text blocks, keep their inner HTML
  html = html.replace(/\[\/?et_pb_text[^\]]*\]/gi, '');
  html = html.replace(/\[\/?vc_column_text[^\]]*\]/gi, '');

  // Remove wrappers: section/row/columns etc.
  html = html.replace(/\[\/?et_pb_(?:section|row|column(?:_inner)?|column_[^\]]*)[^\]]*\]/gi, '');
  html = html.replace(/\[\/?vc_(?:section|row|column(?:_inner)?)\b[^\]]*\]/gi, '');

  // Remove any other remaining shortcodes like [et_pb_image ...] (we keep <img> tags already in HTML)
  html = html.replace(/\[(?:\/)?[a-z_]+(?:[^\]]*)\]/gi, '');

  el.innerHTML = html;
}

// Run on all page/post content blocks
document.querySelectorAll('.content').forEach(cleanupDiviShortcodesIn);

// --- Image fallback: if a cover or inline image fails, show a nice placeholder instead of a broken icon ---
document.querySelectorAll('img').forEach(img=>{
  img.addEventListener('error', () => {
    const ph = document.createElement('div');
    ph.style.width = img.width ? img.width+'px' : '100%';
    ph.style.height = img.height ? img.height+'px' : (img.closest('.card') ? '220px' : '280px');
    ph.style.borderRadius = '12px';
    ph.style.background = 'linear-gradient(135deg, rgba(255,193,7,.18), rgba(255,138,0,.18))';
    ph.style.border = '1px solid rgba(255,255,255,.08)';
    img.replaceWith(ph);
  });
});
