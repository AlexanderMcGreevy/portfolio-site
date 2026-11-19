/* =====================================================================
   THE CLIMB · bridge.js  (include in every stop page, after content.js)
   A stop is a full-viewport page shown inside the shell (index.html) in an iframe.
   The shell owns scrolling. This file:
     - tells the stop its scroll progress (0 → 1 through the stop) and transition state
     - forwards wheel / touch / scroll keys up to the shell so the page keeps climbing
     - lets the stop report a found secret (patch), jump to another stop, or open the classic view
   Opened on its own (not embedded), the stop still works: wheel / keys drive a local progress value.

   API (window.Climb):
     Climb.embedded                 true inside the shell
     Climb.id                       this stop's id (from <html data-stop="...">)
     Climb.progress                 latest progress 0..1
     Climb.onProgress(fn)           fn(p, dp)  called on every change (and once on load)
     Climb.onTransition(fn)         fn({dir:'in'|'out', t})  t 0..1 while the shell blends to/from a neighbour
     Climb.onVisible(fn)            fn(bool)  pause heavy rendering when false
     Climb.patch(name)              a secret was found (earns this stop's patch; call every time, shell dedupes)
     Climb.goto(stopId, anchor?)    jump to 'home' | 'journey' | 'gear' | 'trail' | 'hut' | 'summit' | 'range'
     Climb.anchors({name: p})       register named progress points in this stop (shell re-sends on load)
     Climb.classic()                open the classic portfolio
     Climb.ownWheel = true          while true, wheel/touch/keys are NOT forwarded (e.g. free cam, a zoomable map)
     data-own-wheel attribute       any element (or ancestor) with it keeps its own wheel events
   ===================================================================== */
(function () {
  const embedded = window.parent !== window;
  const id = document.documentElement.dataset.stop || '';
  /* the shell's nav pill sits in the top-right corner: stops push their top-right UI down by var(--nav-h) */
  if (embedded) { document.documentElement.classList.add('climb-embedded'); document.documentElement.style.setProperty('--nav-h', '54px'); }
  const L = { prog: [], trans: [], vis: [] };
  const C = window.Climb = {
    embedded, id, progress: 0, visible: true, ownWheel: false,
    onProgress(fn) { L.prog.push(fn); try { fn(C.progress, 0); } catch (e) { console.error(e); } },
    onTransition(fn) { L.trans.push(fn); },
    onVisible(fn) { L.vis.push(fn); },
    patch(name) { post({ type: 'patch', stop: id, name: name || id }); },
    /* anchor: optional name this or another stop registered with Climb.anchors (e.g. goto('trail','coop')) */
    goto(stop, anchor) { if (embedded) post({ type: 'goto', stop, anchor }); else location.href = stop + '.html' + (anchor ? '#' + anchor : ''); },
    /* register named progress points in this stop, e.g. {wins:.1, coop:.4, fbm:.45}; others can goto them */
    anchors(obj) { C._anchors = obj; post({ type: 'anchors', stop: id, anchors: obj });
      if (!embedded && location.hash && obj[location.hash.slice(1)] != null) setProgress(obj[location.hash.slice(1)]); },
    classic() { if (embedded) post({ type: 'classic' }); else location.href = '../classic.html'; }
  };
  function post(m) { if (embedded) window.parent.postMessage(Object.assign({ climb: 1 }, m), '*'); }
  function setProgress(p) {
    p = Math.max(0, Math.min(1, p)); const dp = p - C.progress; C.progress = p;
    for (const f of L.prog) try { f(p, dp); } catch (e) { console.error(e); }
  }
  window.addEventListener('message', e => {
    const m = e.data; if (!m || !m.climb) return;
    if (m.type === 'progress') setProgress(m.p);
    else if (m.type === 'transition') for (const f of L.trans) try { f(m); } catch (err) { console.error(err); }
    else if (m.type === 'visible') { C.visible = m.v; for (const f of L.vis) try { f(m.v); } catch (err) { console.error(err); } }
  });

  /* ---- input forwarding ---- */
  const owned = t => C.ownWheel || (t && t.closest && t.closest('[data-own-wheel]'));
  const LOCAL_SPAN = +(document.documentElement.dataset.span || 4); /* screens of wheel per stop when standalone */
  window.addEventListener('wheel', e => {
    if (owned(e.target) || e.ctrlKey) return;
    e.preventDefault();
    let dy = e.deltaY; if (e.deltaMode === 1) dy *= 32; else if (e.deltaMode === 2) dy *= innerHeight;
    if (embedded) post({ type: 'scroll', dy });
    else setProgress(C.progress + dy / (innerHeight * LOCAL_SPAN));
  }, { passive: false });
  let ty = null;
  window.addEventListener('touchstart', e => { ty = e.touches.length === 1 && !owned(e.target) ? e.touches[0].clientY : null; }, { passive: true });
  window.addEventListener('touchmove', e => {
    if (ty == null) return; const y = e.touches[0].clientY, dy = ty - y; ty = y;
    if (embedded) post({ type: 'scroll', dy, touch: 1 }); else setProgress(C.progress + dy / (innerHeight * LOCAL_SPAN));
  }, { passive: true });
  window.addEventListener('touchend', () => { if (ty != null && embedded) post({ type: 'touchend' }); ty = null; }, { passive: true });
  const KEYS = { ArrowDown: .12, ArrowUp: -.12, PageDown: .9, PageUp: -.9, ' ': .9, End: 99, Home: -99 };
  window.addEventListener('keydown', e => {
    if (C.ownWheel || e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
    const tg = e.target; if (tg && (tg.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(tg.tagName))) return;
    if (!(e.key in KEYS)) return;
    if (e.key === ' ' && tg && /^(BUTTON|A)$/.test(tg.tagName)) return;
    e.preventDefault(); let f = KEYS[e.key]; if (e.key === ' ' && e.shiftKey) f = -f;
    if (embedded) post({ type: 'key', screens: f }); else setProgress(C.progress + f / LOCAL_SPAN);
  });
  if (embedded) addEventListener('load', () => post({ type: 'ready', stop: id }));
})();
