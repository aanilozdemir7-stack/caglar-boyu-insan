import './style.css';
import { App as CapApp } from '@capacitor/app';
import { Capacitor, SystemBars } from '@capacitor/core';
import { avatarSVG, avatarThumb, CATEGORIES, DEFAULT_AVATAR, normalizeAvatar, randomAvatar } from './art/avatar.js';
import { sceneSVG, hands, viewBoxFor } from './art/scenes.js';
import './art/scenes2.js';
import { ERA1 } from './story/cag1.js';
import { ERA2 } from './story/cag2.js';
import { ERA3 } from './story/cag3.js';
import { ERA4 } from './story/cag4.js';
import { ERA5 } from './story/cag5.js';
import { ERA6 } from './story/cag6.js';
import { ERA7 } from './story/cag7.js';
import { ERA8 } from './story/cag8.js';
import { ERA9 } from './story/cag9.js';
import { ERA10 } from './story/cag10.js';
import { ERA11 } from './story/cag11.js';
import { ERA12 } from './story/cag12.js';
import { newGame, load, save, wipe, canAfford, applyEffect } from './state.js';
import { getScene, applyChoice } from './engine.js';

const ERAS = { 1: ERA1, 2: ERA2, 3: ERA3, 4: ERA4, 5: ERA5, 6: ERA6, 7: ERA7, 8: ERA8, 9: ERA9, 10: ERA10, 11: ERA11, 12: ERA12 };
const app = document.getElementById('app');
let st = null;

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmt = (s) => esc(s).replace(/\*(.+?)\*/g, '<em>$1</em>');
const up = (s) => s.toLocaleUpperCase('tr-TR');
const el = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };

// ---------- Başlık ----------
async function titleScreen() {
  const saved = await load();
  theme(saved?.era || 1);
  const s = el(`<div class="screen title-screen">
    <h1 class="logo outline">ÇAĞLAR<br>BOYU <em>İNSAN</em></h1>
    <p class="subtitle">Taş Devri'nden yarına. Her seçim kalıcı.</p>
    ${saved ? '<button class="btn" data-a="devam">Devam et</button>' : ''}
    <button class="btn ${saved ? 'ghost' : ''}" data-a="yeni">${saved ? 'En baştan başla' : 'Yeni oyun'}</button>
  </div>`);
  s.addEventListener('click', async (e) => {
    const a = e.target.closest('[data-a]')?.dataset.a;
    if (a === 'devam') { st = saved; st.avatar = normalizeAvatar(st.avatar); st.finished ? endScreen() : startScene(); }
    if (a === 'yeni') {
      if (saved) confirmRestart(() => avatarScreen(saved.avatar));
      else avatarScreen(DEFAULT_AVATAR);
    }
  });
  show(s);
}

// ---------- Avatar ----------
function avatarScreen(initial) {
  const av = normalizeAvatar(initial || DEFAULT_AVATAR);
  let cat = 0;
  const s = el(`<div class="screen avatar-screen">
    <div class="av-left">
      <h2>Kendini yarat</h2>
      <div class="av-preview big"></div>
      <button class="btn ghost small" data-a="rastgele">🎲 Rastgele</button>
    </div>
    <div class="av-right">
      <div class="av-tabs">${CATEGORIES.map(([, t], i) => `<button class="tab" data-c="${i}">${t}</button>`).join('')}</div>
      <div class="av-grid"></div>
      <button class="btn" data-a="basla">Yolculuğa başla</button>
    </div>
  </div>`);
  const grid = s.querySelector('.av-grid');
  const drawGrid = () => {
    const [k, , opts, list] = CATEGORIES[cat];
    s.querySelectorAll('.tab').forEach((t, i) => t.classList.toggle('on', i === cat));
    if (opts === 'swatch') {
      grid.className = 'av-grid swatches';
      grid.innerHTML = list.map((c, i) => `<button class="sw ${av[k] === i ? 'on' : ''}" data-v="${i}" style="background:${c}" aria-label="${i + 1}"></button>`).join('');
    } else {
      grid.className = 'av-grid';
      grid.innerHTML = opts.map(([v, t]) => `<button class="opt ${av[k] === v ? 'on' : ''}" data-v="${v}">${avatarThumb({ ...av, [k]: v })}<span>${t}</span></button>`).join('');
    }
  };
  const draw = () => { s.querySelector('.av-preview').innerHTML = avatarSVG(av); drawGrid(); };
  s.addEventListener('click', async (e) => {
    const tab = e.target.closest('[data-c]');
    if (tab) { cat = Number(tab.dataset.c); drawGrid(); tab.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' }); return; }
    const opt = e.target.closest('[data-v]');
    if (opt) {
      const [k, , opts] = CATEGORIES[cat];
      av[k] = opts === 'swatch' ? Number(opt.dataset.v) : opt.dataset.v;
      draw();
      return;
    }
    const a = e.target.closest('[data-a]')?.dataset.a;
    if (a === 'rastgele') { Object.assign(av, randomAvatar()); draw(); }
    if (a === 'basla') {
      await wipe();
      st = newGame(av);
      st.scene = ERAS[st.era].start;
      await save(st);
      eraCard();
    }
  });
  draw();
  show(s);
}

// ---------- Çağ kartı ----------
function eraCard(carry) {
  const era = ERAS[st.era];
  theme(st.era);
  const s = el(`<div class="screen era-card">
    <div class="av-preview">${avatarSVG(st.avatar, { era: st.era })}</div>
    <div class="era-text">
      <div class="era-no">ÇAĞ ${st.era}</div>
      <h1 class="era-name outline">${up(era.name)}</h1>
      <div class="era-meta">${era.year} · ${era.place}${era.region && era.region !== era.place ? ` (${era.region})` : ''}</div>
      ${carry ? `<p class="subtitle" style="margin:10px 0 0">${carry}</p>` : ''}
      <div class="tap-hint" style="margin-top:12px">Başlamak için dokun</div>
    </div>
  </div>`);
  s.addEventListener('click', () => startScene());
  show(s);
}

// ---------- Oyun ----------
let stage = null;
let lineIdx = 0;
let lines = [];

function buildStage() {
  stage = el(`<div class="stage">
    <div class="layer bg-layer"></div>
    <div class="layer hands-layer"></div>
    <div class="hud">
      <div class="card"><div class="k">YIL</div><div class="v" data-h="yil"></div></div>
      <div class="card"><div class="k">PARA</div><div class="v" data-h="para"></div></div>
      <div class="card"><div class="k">ENERJİ</div><div class="v" data-h="enerji"></div></div>
    </div>
    <div class="tag"></div>
    <button class="reset" aria-label="En baştan başla">↺</button>
    <div class="text"></div>
    <div class="next-hint tap-hint"></div>
    <div class="choices"></div>
  </div>`);
  stage.addEventListener('click', (e) => {
    if (e.target.closest('.reset')) return confirmRestart(() => avatarScreen(st.avatar));
    if (e.target.closest('.choices')) return;
    advance();
  });
  show(stage);
}

function hud(prev) {
  const era = ERAS[st.era];
  const set = (k, html, changed) => {
    const n = stage.querySelector(`[data-h="${k}"]`);
    n.innerHTML = html;
    if (changed) { n.classList.remove('bump'); void n.offsetWidth; n.classList.add('bump'); }
  };
  set('yil', st.yil || era.year);
  set('para', `${st.para}<small>${st.birim || era.currency}</small>`, prev && prev.para !== st.para);
  set('enerji', `%${st.enerji}`, prev && prev.enerji !== st.enerji);
  stage.querySelector('.tag').textContent = `${up(st.yer || era.place)} · GÜN ${st.day}`;
}

function startScene(prev) {
  const era = ERAS[st.era];
  theme(st.era);
  const sc = getScene(era, st);
  if (!sc || sc.end) { st.finished = true; save(st); return endScreen(); }
  if (!stage || !stage.isConnected) buildStage();
  if (sc.day) st.day = sc.day;
  if (sc.year) st.yil = sc.year;
  if (sc.currency) st.birim = sc.currency;
  if (sc.place) st.yer = sc.place;
  stage.classList.remove('choosing');
  stage.classList.toggle('text-top', !!sc.textTop);

  const bgLayer = stage.querySelector('.bg-layer');
  const key = sc.bg + '|' + st.scene;
  if (bgLayer.dataset.bg !== sc.bg) {
    bgLayer.innerHTML = `<div class="layer bg-wrap">${sceneSVG(sc.bg, st.avatar, innerWidth, innerHeight)}</div>`;
    bgLayer.dataset.bg = sc.bg;
  }
  const hl = stage.querySelector('.hands-layer');
  if (hl.dataset.pose !== sc.hands) { hl.innerHTML = hands(sc.hands, st.avatar, st.era); hl.dataset.pose = sc.hands; }

  hud(prev);
  lines = sc.lines.filter((l) => typeof l === 'string' || l.when(st)).map((l) => (typeof l === 'string' ? l : l.text));
  lineIdx = 0;
  stage.querySelector('.text').innerHTML = '';
  stage.querySelector('.choices').innerHTML = '';
  void key;
  showLine();
}

function showLine() {
  const box = stage.querySelector('.text');
  box.querySelectorAll('.line').forEach((n) => n.classList.add('old'));
  const olds = box.querySelectorAll('.line.old');
  olds.forEach((n, i) => { if (i < olds.length - 1) n.remove(); });
  box.appendChild(el(`<div class="line outline">${fmt(lines[lineIdx])}</div>`));
  const last = lineIdx >= lines.length - 1;
  stage.querySelector('.next-hint').textContent = last ? '' : 'Devam etmek için dokun';
  if (last) setTimeout(showChoices, 450);
}

function advance() {
  if (stage.classList.contains('choosing')) return;
  if (lineIdx < lines.length - 1) { lineIdx++; showLine(); }
}

function costText(c) {
  if (!c) return '';
  const p = [];
  if (c.enerji) p.push(`${c.enerji} enerji`);
  if (c.para) p.push(`${c.para} ${st.birim || ERAS[st.era].currency}`);
  return p.join(' · ');
}

// Hiçbir seçeneğe gücün yetmezse oyun kilitlenmesin: dinlenip enerji topla.
const REST = { text: 'Dinlen ve güç topla', effect: { enerji: 30 }, rest: true };

function showChoices() {
  const sc = getScene(ERAS[st.era], st);
  const anyOk = sc.choices.some((c) => (!c.show || c.show(st)) && (!c.req || c.req(st)) && canAfford(st, c.cost));
  if (!anyOk) {
    stage.classList.add('choosing');
    const box = stage.querySelector('.choices');
    box.innerHTML = '';
    const b = el(`<button class="choice"><span>${REST.text}</span><span class="cost">+30 enerji</span></button>`);
    b.addEventListener('click', async () => { const prev = { para: st.para, enerji: st.enerji }; applyEffect(st, REST.effect); await save(st); hud(prev); showChoices(); });
    box.appendChild(b);
    return;
  }
  stage.classList.add('choosing');
  stage.querySelector('.next-hint').textContent = '';
  const box = stage.querySelector('.choices');
  box.innerHTML = '';
  sc.choices.forEach((c, i) => {
    if (c.show && !c.show(st)) return;
    const reqOk = !c.req || c.req(st);
    const ok = canAfford(st, c.cost) && reqOk;
    const info = !reqOk ? c.reqText || 'Koşul sağlanmadı' : c.info || costText(c.cost);
    const b = el(`<button class="choice ${ok ? '' : 'locked'}" style="animation-delay:${i * 0.08}s">
      <span>${esc(c.text)}</span>${info ? `<span class="cost">${ok ? '' : '🔒 '}${esc(info)}</span>` : ''}</button>`);
    b.addEventListener('click', () => ok && choose(i));
    box.appendChild(b);
  });
}

async function choose(i) {
  const era = ERAS[st.era];
  const sc = getScene(era, st);
  const prev = { para: st.para, enerji: st.enerji };
  applyChoice(era, st, i);
  await save(st); // checkpoint
  if (!sc.hub && sc.choices.filter((x) => !x.show || x.show(st)).length > 1) toast('Seçimin kaydedildi');
  startScene(prev);
}

function toast(msg) {
  const t = el(`<div class="toast">${esc(msg)}</div>`);
  stage.appendChild(t);
  setTimeout(() => t.remove(), 2100);
}

// ---------- Çağ sonu ----------
function endScreen() {
  stage = null;
  const era = ERAS[st.era];
  theme(st.era);
  const nextEra = ERAS[st.era + 1];
  const ak = st.akil - (st.eraBase?.akil || 0), be = st.beden - (st.eraBase?.beden || 0);
  const yol = ak > be ? 'aklını' : be > ak ? 'bedenini' : 'aklınla bedenini dengeli';
  const s = el(`<div class="screen era-card">
    <div class="av-preview">${avatarSVG(st.avatar, { era: st.era })}</div>
    <div class="era-text">
      <div class="era-no">ÇAĞ ${st.era} TAMAMLANDI</div>
      <h1 class="era-name outline">${up(era.name)}</h1>
      <div class="era-meta">Bu çağda çoğunlukla ${yol} kullandın.<br>Kalan: ${st.para} ${st.birim || era.currency} · %${st.enerji} enerji · ${st.history.filter((h) => h.era === st.era || !h.era).length} karar</div>
      <p class="subtitle" style="margin:12px 0 10px">Sıradaki çağ: <b>${era.next.name}</b> — ${era.next.place}, ${era.next.year}${nextEra ? '' : '<br>Bu sürüm burada bitiyor. Kalan çağlar sonraki güncellemede gelecek; ilerlemen kayıtlı.'}</p>
      ${nextEra ? '<button class="btn" data-a="ileri">Sonraki çağa geç</button>' : ''}
      <button class="btn ghost" data-a="bas">En baştan başla</button>
    </div>
  </div>`);
  s.addEventListener('click', async (e) => {
    const a = e.target.closest('[data-a]')?.dataset.a;
    if (a === 'bas') confirmRestart(() => avatarScreen(st.avatar));
    if (a === 'ileri') {
      const ne = ERAS[st.era + 1];
      const carry = ne.carry ? ne.carry(st) : '';
      st.era += 1;
      st.eraBase = { akil: st.akil, beden: st.beden };
      st.seen = [];
      st.yil = null;
      st.birim = null;
      st.yer = null;
      st.returnTo = null;
      st.hub = null;
      st.scene = ne.start;
      st.day = 1;
      st.finished = false;
      await save(st);
      eraCard(carry);
    }
  });
  show(s);
}

// ---------- Ortak ----------
function confirmRestart(onYes) {
  const m = el(`<div class="modal"><div class="box">
    <p>Geri dönüş yok. Tüm ilerlemen silinir ve <b>en baştan</b> başlarsın.<br>Emin misin?</p>
    <div class="row"><button class="btn" data-a="evet">Evet, baştan başla</button><button class="btn ghost" data-a="hayir">Vazgeç</button></div>
  </div></div>`);
  m.addEventListener('click', async (e) => {
    const a = e.target.closest('[data-a]')?.dataset.a;
    if (a === 'evet') { await wipe(); m.remove(); stage = null; onYes(); }
    if (a === 'hayir' || e.target === m) m.remove();
  });
  app.appendChild(m);
}

function show(node) {
  app.innerHTML = '';
  app.appendChild(node);
}

// Ekran döndürülünce ya da boyutu değişince sahnenin görüş alanını yeniden hesapla.
function fitScene() {
  document.querySelectorAll('svg.bg').forEach((svg) => svg.setAttribute('viewBox', viewBoxFor(svg.dataset.key, innerWidth, innerHeight)));
}
addEventListener('resize', fitScene);
addEventListener('orientationchange', () => setTimeout(fitScene, 250));

// Her çağın kendi renk teması (style.css içindeki [data-era] kuralları).
function theme(era) { document.documentElement.dataset.era = String(era || 1); }

// ---------- Başlangıç ----------
if (Capacitor.isNativePlatform()) {
  // Tam ekran: durum çubuğu ve gezinme çubuğu gizli (kaydırınca geçici olarak görünür).
  SystemBars.hide().catch(() => {});
  CapApp.addListener('resume', () => SystemBars.hide().catch(() => {}));
  // Geri tuşu oyunda geri götürmez: geri dönüş yok. Uygulamayı arka plana alır.
  CapApp.addListener('backButton', () => CapApp.minimizeApp());
}
titleScreen();
