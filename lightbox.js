/* lightbox.js: full-screen image viewer shared by classic.html and the trail stop.
   Lightbox.open(items, index, { title, opener })
     items: [{ src, alt, kind: 'phone'|'browser'|'logo' }] with src already resolved for the page
   Arrows / swipe / ← → keys flip, thumbnails jump, Esc / ✕ / clicking the dark area close. */
(function () {
  const css = `
.lbx{border:0;padding:0;margin:0;background:transparent;width:100vw;height:100vh;height:100dvh;max-width:100vw;max-height:100vh;max-height:100dvh;color:#fff;overflow:hidden;
  --top:calc(12px + var(--nav-h,0px));font-family:Inter,system-ui,-apple-system,sans-serif}
.lbx::backdrop{background:rgba(8,10,9,.94);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
html.lbx-open{overflow:hidden}
.lbx-in{position:absolute;inset:0;display:flex;flex-direction:column}
.lbx-top{display:flex;align-items:center;gap:14px;padding:var(--top) 16px 8px 20px;flex:none}
.lbx-t{font:600 14px/1.2 'IBM Plex Mono',ui-monospace,monospace;letter-spacing:.06em;text-transform:uppercase;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.lbx-n{font:500 12px/1 'IBM Plex Mono',ui-monospace,monospace;color:#9aa39c;letter-spacing:.08em;white-space:nowrap}
.lbx-x{margin-left:auto;flex:none;width:42px;height:42px;border-radius:50%;border:1px solid rgba(255,255,255,.3);background:rgba(255,255,255,.06);color:#fff;font-size:17px;cursor:pointer}
.lbx-stage{position:relative;flex:1;min-height:0;display:flex;align-items:center;justify-content:center;padding:6px 76px;touch-action:pan-y pinch-zoom;user-select:none;-webkit-user-select:none}
.lbx-fig{margin:0;display:flex;flex-direction:column;align-items:center;gap:12px;max-width:100%;max-height:100%;min-height:0}
.lbx-img{display:block;max-width:100%;max-height:calc(100vh - 230px - var(--nav-h,0px));max-height:calc(100dvh - 230px - var(--nav-h,0px));width:auto;height:auto;object-fit:contain;border-radius:14px;background:#0b0d0f;box-shadow:0 20px 60px rgba(0,0,0,.5);transition:opacity .18s;-webkit-user-drag:none}
.lbx-img.logo{width:min(420px,60vh,80vw);aspect-ratio:1;object-fit:cover;border-radius:22%}
.lbx-img.fade{opacity:0}
.lbx-cap{font-size:13.5px;line-height:1.45;color:#cfd3cf;text-align:center;max-width:560px;min-height:1.45em}
.lbx-nav{position:absolute;top:50%;width:52px;height:52px;margin-top:-26px;border-radius:50%;border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.08);color:#fff;font-size:28px;line-height:1;cursor:pointer;display:grid;place-items:center;padding:0 0 3px}
.lbx-prev{left:14px}.lbx-next{right:14px}
.lbx-x:hover,.lbx-nav:hover{background:rgba(255,255,255,.18)}
.lbx button:focus-visible{outline:3px solid #9fd0a8;outline-offset:2px}
.lbx-thumbs{flex:none;display:flex;gap:8px;justify-content:center;overflow-x:auto;padding:10px 16px 18px;scrollbar-width:none}
.lbx-thumbs::-webkit-scrollbar{display:none}
.lbx-th{flex:none;width:50px;height:50px;padding:0;border-radius:9px;overflow:hidden;border:2px solid rgba(255,255,255,.18);background:#0b0d0f;cursor:pointer;opacity:.55;transition:opacity .15s,border-color .15s}
.lbx-th img{width:100%;height:100%;object-fit:cover;object-position:top center;display:block}
.lbx-th.lg img{object-position:center}
.lbx-th:hover,.lbx-th[aria-current=true]{opacity:1;border-color:#9fd0a8}
.lbx.one .lbx-nav,.lbx.one .lbx-thumbs,.lbx.one .lbx-n{display:none}
@media(max-width:700px){
  .lbx-stage{padding:4px 12px}
  .lbx-nav{top:auto;bottom:4px;margin:0;width:44px;height:44px;font-size:24px;background:rgba(0,0,0,.55)}
  .lbx-prev{left:12px}.lbx-next{right:12px}
  .lbx-img{max-height:calc(100vh - 250px - var(--nav-h,0px));max-height:calc(100dvh - 250px - var(--nav-h,0px))}
  .lbx-cap{padding:0 52px;font-size:13px}
  .lbx-th{width:42px;height:42px}
}`;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  let dlg, items = [], idx = 0, opener = null;

  function build() {
    const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    dlg = document.createElement('dialog');
    dlg.className = 'lbx'; dlg.setAttribute('data-own-wheel', ''); dlg.setAttribute('aria-label', 'Project images');
    dlg.innerHTML = '<div class="lbx-in"><div class="lbx-top"><span class="lbx-t"></span><span class="lbx-n" aria-live="polite"></span>' +
      '<button type="button" class="lbx-x" aria-label="Close">✕</button></div>' +
      '<div class="lbx-stage"><button type="button" class="lbx-nav lbx-prev" aria-label="Previous image">‹</button>' +
      '<figure class="lbx-fig"><img class="lbx-img" alt=""><figcaption class="lbx-cap"></figcaption></figure>' +
      '<button type="button" class="lbx-nav lbx-next" aria-label="Next image">›</button></div>' +
      '<div class="lbx-thumbs" role="group" aria-label="All images"></div></div>';
    document.body.appendChild(dlg);
    const q = s => dlg.querySelector(s);
    q('.lbx-x').addEventListener('click', () => dlg.close());
    q('.lbx-prev').addEventListener('click', () => go(idx - 1));
    q('.lbx-next').addEventListener('click', () => go(idx + 1));
    q('.lbx-thumbs').addEventListener('click', e => { const t = e.target.closest('[data-i]'); if (t) go(+t.dataset.i); });
    /* clicking the dark area around the image closes it */
    dlg.addEventListener('click', e => { if (e.target === dlg || e.target.classList.contains('lbx-stage') || e.target.classList.contains('lbx-in') || e.target.classList.contains('lbx-fig')) dlg.close(); });
    /* keys stay inside the viewer, so the page underneath doesn't scroll or close its own panel */
    dlg.addEventListener('keydown', e => {
      e.stopPropagation();
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(idx - 1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); go(idx + 1); }
      else if (e.key === 'Home') { e.preventDefault(); go(0); }
      else if (e.key === 'End') { e.preventDefault(); go(items.length - 1); }
    });
    dlg.addEventListener('wheel', e => e.stopPropagation(), { passive: true });
    /* swipe left / right */
    let sx = null, sy = 0;
    const stage = q('.lbx-stage');
    stage.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') { sx = e.clientX; sy = e.clientY; } });
    stage.addEventListener('pointerup', e => {
      if (sx == null) return; const dx = e.clientX - sx, dy = e.clientY - sy; sx = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3) go(idx + (dx < 0 ? 1 : -1));
    });
    stage.addEventListener('pointercancel', () => { sx = null; });
    dlg.addEventListener('close', () => {
      document.documentElement.classList.remove('lbx-open');
      if (opener && opener.focus) try { opener.focus({ preventScroll: true }); } catch (_) {}
      opener = null;
    });
  }

  function go(i) {
    if (!items.length) return;
    idx = (i + items.length) % items.length;
    const s = items[idx], im = dlg.querySelector('.lbx-img');
    im.classList.add('fade');
    const show = () => { im.src = s.src; im.alt = s.alt || ''; im.className = 'lbx-img' + (s.kind === 'logo' ? ' logo' : ''); };
    const pre = new Image(); pre.onload = pre.onerror = show; pre.src = s.src;
    if (pre.complete) show();
    dlg.querySelector('.lbx-cap').textContent = s.alt || '';
    dlg.querySelector('.lbx-n').textContent = (idx + 1) + ' / ' + items.length;
    dlg.querySelectorAll('.lbx-th').forEach((b, j) => b.setAttribute('aria-current', String(j === idx)));
    const th = dlg.querySelectorAll('.lbx-th')[idx]; if (th) th.scrollIntoView({ block: 'nearest', inline: 'center' });
    [idx + 1, idx - 1].forEach(j => { const n = items[(j + items.length) % items.length]; if (n) new Image().src = n.src; });
  }

  function open(list, start, opts) {
    list = (list || []).filter(s => s && s.src); if (!list.length) return;
    if (!dlg) build();
    opts = opts || {}; items = list; opener = opts.opener || document.activeElement;
    dlg.classList.toggle('one', items.length < 2);
    dlg.querySelector('.lbx-t').textContent = opts.title || '';
    dlg.querySelector('.lbx-thumbs').innerHTML = items.map((s, i) =>
      '<button type="button" class="lbx-th' + (s.kind === 'logo' ? ' lg' : '') + '" data-i="' + i + '" aria-label="Image ' + (i + 1) + ' of ' + items.length + (s.alt ? ': ' + esc(s.alt) : '') + '"><img src="' + esc(s.src) + '" alt="" decoding="async"></button>').join('');
    document.documentElement.classList.add('lbx-open');
    if (!dlg.open) dlg.showModal();
    go(start || 0);
    (items.length > 1 ? dlg.querySelector('.lbx-next') : dlg.querySelector('.lbx-x')).focus({ preventScroll: true });
  }

  window.Lightbox = { open, close: () => dlg && dlg.open && dlg.close(), get isOpen() { return !!(dlg && dlg.open); } };
})();
