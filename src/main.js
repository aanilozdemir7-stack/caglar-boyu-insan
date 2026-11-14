import './style.css';
import { App as CapApp } from '@capacitor/app';
import { StatusBar } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';
import { avatarSVG, OPTIONS, SKIN, HAIR_COLORS, DEFAULT_AVATAR } from './art/avatar.js';
import { sceneSVG, hands } from './art/scenes.js';
import { ERA1 } from './story/cag1.js';
import { newGame, load, save, wipe, canAfford, applyEffect } from './state.js';

const ERAS = { 1: ERA1 };
const app = document.getElementById('app');
let st = null;

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmt = (s) => esc(s).replace(/\*(.+?)\*/g, '<em>$1</em>');
const up = (s) => s.toLocaleUpperCase('tr-TR');
const el = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };

// ---------- Başlık ----------
async function titleScreen() {
  const saved = await load();
  const s = el(`<div class="screen title-screen">
    <h1 class="logo outline">ÇAĞLAR<br>BOYU <em>İNSAN</em></h1>
    <p class="subtitle">Taş Devri'nden yarına. Her seçim kalıcı.</p>
    ${saved ? '<button class="btn" data-a="devam">Devam et</button>' : ''}
    <button class="btn ${saved ? 'ghost' : ''}" data-a="yeni">${saved ? 'En baştan başla' : 'Yeni oyun'}</button>
  </div>`);
  s.addEventListener('click', async (e) => {
    const a = e.target.closest('[data-a]')?.dataset.a;
    if (a === 'devam') { st = saved; st.finished ? endScreen() : startScene(); }
    if (a === 'yeni') {
      if (saved) confirmRestart(() => avatarScreen(saved.avatar));
      else avatarScreen(DEFAULT_AVATAR);
    }
  });
  show(s);
}

// ---------- Avatar ----------
function avatarScreen(initial) {
  const av = { ...DEFAULT_AVATAR, ...(initial || {}) };
  const labels = { face: 'YÜZ ŞEKLİ', hair: 'SAÇ', eyes: 'GÖZLER', brows: 'KAŞLAR', beard: 'SAKAL' };
  const s = el(`<div class="screen avatar-screen">
    <h2>Kendini yarat</h2>
    <div class="av-preview"></div>
    <div class="av-rows">
      <div class="av-row"><label>TEN</label><div class="chips">${SKIN.map((c, i) => `<button class="sw" data-k="skin" data-v="${i}" style="background:${c}"></button>`).join('')}</div></div>
      ${Object.entries(OPTIONS).map(([k, opts]) => `<div class="av-row"><label>${labels[k]}</label><div class="chips">${opts.map(([v, t]) => `<button class="chip" data-k="${k}" data-v="${v}">${t}</button>`).join('')}</div></div>`).join('')}
      <div class="av-row"><label>SAÇ RENGİ</label><div class="chips">${HAIR_COLORS.map((c, i) => `<button class="sw" data-k="hairColor" data-v="${i}" style="background:${c}"></button>`).join('')}</div></div>
      <button class="btn" data-a="basla" style="align-self:center;margin:8px 0 20px">Yolculuğa başla</button>
    </div>
  </div>`);
  const draw = () => {
    s.querySelector('.av-preview').innerHTML = avatarSVG(av);
    s.querySelectorAll('[data-k]').forEach((b) => {
      const k = b.dataset.k, v = b.dataset.v;
      b.classList.toggle('on', String(av[k]) === v);
    });
  };
  s.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-k]');
    if (b) {
      const k = b.dataset.k;
      av[k] = k === 'skin' || k === 'hairColor' ? Number(b.dataset.v) : b.dataset.v;
      draw();
    }
    if (e.target.closest('[data-a="basla"]')) {
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
function eraCard() {
  const era = ERAS[st.era];
  const s = el(`<div class="screen era-card">
    <div class="era-no">ÇAĞ ${st.era}</div>
    <h1 class="era-name outline">${up(era.name)}</h1>
    <div class="era-meta">${era.year} · ${era.place} (${era.region})</div>
    <div class="av-preview">${avatarSVG(st.avatar, { era: st.era })}</div>
    <div class="tap-hint">Başlamak için dokun</div>
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
  set('yil', era.year);
  set('para', `${st.para}<small>${era.currency}</small>`, prev && prev.para !== st.para);
  set('enerji', `%${st.enerji}`, prev && prev.enerji !== st.enerji);
  stage.querySelector('.tag').textContent = `${up(era.place)} · GÜN ${st.day}`;
}

function startScene(prev) {
  const era = ERAS[st.era];
  const sc = era.scenes[st.scene];
  if (!sc || sc.end) { st.finished = true; save(st); return endScreen(); }
  if (!stage || !stage.isConnected) buildStage();
  if (sc.day) st.day = sc.day;
  stage.classList.remove('choosing');

  const bgLayer = stage.querySelector('.bg-layer');
  const key = sc.bg + '|' + st.scene;
  if (bgLayer.dataset.bg !== sc.bg) {
    bgLayer.innerHTML = `<div class="layer bg-wrap">${sceneSVG(sc.bg, st.avatar)}</div>`;
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
  if (olds.length > 1) olds[0].remove();
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
  if (c.para) p.push(`${c.para} ${ERAS[st.era].currency}`);
  return p.join(' · ');
}

function showChoices() {
  const sc = ERAS[st.era].scenes[st.scene];
  stage.classList.add('choosing');
  stage.querySelector('.next-hint').textContent = '';
  const box = stage.querySelector('.choices');
  box.innerHTML = '';
  sc.choices.forEach((c, i) => {
    const ok = canAfford(st, c.cost);
    const b = el(`<button class="choice ${ok ? '' : 'locked'}" style="animation-delay:${i * 0.08}s">
      <span>${esc(c.text)}</span>${c.cost ? `<span class="cost">${ok ? '' : '🔒 '}${costText(c.cost)}</span>` : ''}</button>`);
    b.addEventListener('click', () => ok && choose(i));
    box.appendChild(b);
  });
}

async function choose(i) {
  const sc = ERAS[st.era].scenes[st.scene];
  const c = sc.choices[i];
  const prev = { para: st.para, enerji: st.enerji };
  applyEffect(st, c.effect);
  st.history.push({ scene: st.scene, choice: i });
  st.scene = c.to;
  await save(st); // checkpoint
  if (sc.choices.length > 1) toast('Seçimin kaydedildi');
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
  const yol = st.akil > st.beden ? 'aklını' : st.beden > st.akil ? 'bedenini' : 'aklınla bedenini dengeli';
  const s = el(`<div class="screen era-card">
    <div class="era-no">ÇAĞ ${st.era} TAMAMLANDI</div>
    <h1 class="era-name outline">${up(era.name)}</h1>
    <div class="av-preview">${avatarSVG(st.avatar, { era: st.era })}</div>
    <div class="era-meta">Bu çağda çoğunlukla ${yol} kullandın.<br>Kalan: ${st.para} ${era.currency} · %${st.enerji} enerji · ${st.history.length} karar</div>
    <p class="subtitle" style="margin-top:16px">Sıradaki çağ: <b>${era.next.name}</b> — ${era.next.place}, ${era.next.year}<br>Deneme sürümü burada bitiyor.</p>
    <button class="btn ghost" data-a="bas">En baştan başla</button>
  </div>`);
  s.querySelector('[data-a="bas"]').addEventListener('click', () => confirmRestart(() => avatarScreen(st.avatar)));
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

// ---------- Başlangıç ----------
if (Capacitor.isNativePlatform()) {
  StatusBar.hide().catch(() => {});
  // Geri tuşu oyunda geri götürmez: geri dönüş yok. Uygulamayı arka plana alır.
  CapApp.addListener('backButton', () => CapApp.minimizeApp());
}
titleScreen();
