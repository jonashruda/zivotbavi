
const root = document.documentElement;
const saved = localStorage.getItem('zb-theme');
if (saved === 'dark') root.classList.add('dark');
if (saved === 'light') root.classList.remove('dark');
document.getElementById('themeToggle')?.addEventListener('click', ()=>{
  const isDark = root.classList.toggle('dark');
  localStorage.setItem('zb-theme', isDark ? 'dark' : 'light');
});
document.getElementById('year').textContent = new Date().getFullYear();
const io = new IntersectionObserver((entries)=>{entries.forEach(e => e.isIntersecting && e.target.classList.add('show'));},{threshold:.18});
document.querySelectorAll('.reveal, .reveal-up').forEach(el=>io.observe(el));
let POSTS = [];
async function loadPosts(){
  try {
    const res = await fetch('./posts.json');
    POSTS = await res.json();
    renderLatest(); renderGrid(); hydratePost();
  } catch (e) { console.warn('posts.json missing', e); }
}
function card(p){
  const img = p.cover || './og-image.png';
  return `<article class="card hover-lift">
    <a href="./post.html?slug=${encodeURIComponent(p.slug)}" aria-label="${p.title}">
      <img src="${img}" alt="" style="width:100%;height:180px;object-fit:cover;border-radius:12px"/>
      <h3>${p.title}</h3>
      <p class="muted small">${p.date || ''}</p>
      <p>${p.excerpt || ''}</p>
    </a>
  </article>`;
}
function renderLatest(){
  const wrap = document.getElementById('latestPosts'); if (!wrap || !POSTS.length) return;
  wrap.innerHTML = POSTS.slice(0,3).map(card).join('');
}
let page = 1; const PAGE_SIZE = 9;
function renderGrid(){
  const grid = document.getElementById('postsGrid'); if (!grid) return;
  grid.innerHTML = POSTS.slice(0, PAGE_SIZE*page).map(card).join('');
  const btn = document.getElementById('loadMore');
  if (btn){ if (POSTS.length <= PAGE_SIZE*page) btn.style.display = 'none'; btn.onclick = () => { page++; renderGrid(); }; }
}
function hydratePost(){
  const view = document.getElementById('article'); if (!view) return;
  const params = new URLSearchParams(location.search); const slug = params.get('slug');
  const p = POSTS.find(x => x.slug === slug);
  if (!p){ view.querySelector('#postContent').innerHTML = '<p>Článek nenalezen.</p>'; return;}
  view.querySelector('#postTitle').textContent = p.title;
  view.querySelector('#postMeta').textContent = p.date || '';
  const cover = view.querySelector('#postCover'); if (p.cover) { cover.src = p.cover; cover.alt = p.title; } else { cover.style.display = 'none'; }
  const link = view.querySelector('#postLink'); link.href = p.url;
  const contentEl = view.querySelector('#postContent');
  if (p.contentPath){
    fetch(p.contentPath).then(r=>r.text()).then(html => contentEl.innerHTML = html).catch(()=>{ contentEl.innerHTML = `<p>${p.excerpt || ''}</p>`; });
  } else { contentEl.innerHTML = `<p>${p.excerpt || ''}</p>`; }
}
const form = document.getElementById('contactForm');
form?.addEventListener('submit', (e)=>{
  const msg = document.getElementById('formMsg'); msg.textContent = 'Odesílám…';
  setTimeout(()=>{ msg.textContent = 'Děkujeme! Ozveme se.'; form.reset(); }, 900);
});
loadPosts();
