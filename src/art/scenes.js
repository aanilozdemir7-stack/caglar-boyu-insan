// Kodla çizilen sahneler. Arka plan 1000x1000 çizilir ve ekranı doldurur
// (önemli öğeler ortadaki ~460x460'lık alanda durur ki dikey ve yatay ekranda da görünsün).
// POV elleri ayrı bir katmandır ve her zaman ekranın altına yaslanır.
import { INK, SKIN, avatarParts, outfitColors, randomAvatar, seeded, shade } from './avatar.js';

const S = 5; // kontur kalınlığı
let gid = 0;

// ---------- Ortak parçalar ----------

function sky(top, mid, bottom) {
  const id = 'sky' + (++gid);
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${top}"/><stop offset=".6" stop-color="${mid}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs>
    <rect width="1000" height="1000" fill="url(#${id})"/>`;
}

function vignette(strength = 0.55) {
  const id = 'vg' + (++gid);
  return `<defs><radialGradient id="${id}" cx=".5" cy=".5" r=".72"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="${strength}"/></radialGradient></defs>
    <rect width="1000" height="1000" fill="url(#${id})" pointer-events="none"/>`;
}

function light(x, y, r, color, op = 0.6, cls = '') {
  const id = 'lt' + (++gid);
  return `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${color}" stop-opacity="${op}"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient></defs>
    <circle class="${cls}" cx="${x}" cy="${y}" r="${r}" fill="url(#${id})"/>`;
}

function haze(y1, y2, color, op = 0.35) {
  const id = 'hz' + (++gid);
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity="0"/><stop offset=".5" stop-color="${color}" stop-opacity="${op}"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs>
    <rect x="0" y="${y1}" width="1000" height="${y2 - y1}" fill="url(#${id})"/>`;
}

function rnd(seed) { return seeded(seed); }

function stars(n = 26, seed = 7, maxY = 420) {
  let s = ''; const r = rnd(seed);
  for (let i = 0; i < n; i++) {
    const x = r() * 1000, y = r() * maxY, rad = 1.2 + r() * 2.6, d = (r() * 3).toFixed(2);
    s += `<circle class="a-twinkle" style="animation-delay:${d}s" cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${rad.toFixed(1)}" fill="#f6eed0"/>`;
  }
  return s;
}

function milkyway() {
  return `<path d="M-40 360 Q300 120 1040 80 L1040 170 Q340 210 -40 450Z" fill="#c9c3e8" opacity=".07"/>` + stars(40, 99, 300).replace(/r="([\d.]+)"/g, (m, v) => `r="${(v * 0.5).toFixed(1)}"`);
}

function cloud(x, y, s, fill, op = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})" opacity="${op}"><path d="M-80 0 Q-80 -34 -44 -34 Q-36 -64 -2 -60 Q28 -84 56 -50 Q92 -54 92 -18 Q110 -10 100 0Z" fill="${fill}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/></g>`;
}

function hill(d, fill, op = 1) {
  return `<path d="${d}" fill="${fill}" stroke="${INK}" stroke-width="${S}" stroke-linejoin="round" opacity="${op}"/>`;
}

function texture(x1, y1, x2, y2, n, color, seed = 1, len = 18) {
  let s = ''; const r = rnd(seed);
  for (let i = 0; i < n; i++) {
    const x = x1 + r() * (x2 - x1), y = y1 + r() * (y2 - y1);
    s += `M${x.toFixed(0)} ${y.toFixed(0)} l${(len * (0.6 + r() * 0.6)).toFixed(0)} ${(-2 - r() * 4).toFixed(0)} `;
  }
  return `<path d="${s}" stroke="${color}" stroke-width="3" stroke-linecap="round" fill="none" opacity=".55"/>`;
}

function grass(x, y, s = 1, color = '#6b5a2a', delay = 0) {
  return `<g class="a-sway" style="animation-delay:${delay}s"><path transform="translate(${x} ${y}) scale(${s})" d="M0 0 q-6 -40 -22 -60 M4 0 q2 -48 10 -70 M8 0 q10 -30 28 -44 M-4 0 q-14 -22 -34 -28" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round"/></g>`;
}

function rock(x, y, s, fill) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-60 0 Q-64 -34 -30 -44 Q0 -62 34 -42 Q64 -30 60 0Z" fill="${fill}" stroke="${INK}" stroke-width="${S / s}" stroke-linejoin="round"/><path d="M-30 -30 q20 -10 40 -4" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="${4 / s}" stroke-linecap="round"/></g>`;
}

function shadow(x, y, rx, op = 0.35) {
  return `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${rx * 0.18}" fill="#000" opacity="${op}"/>`;
}

// Göbeklitepe tarzı T sütun: geniş yüz, yan yüz (derinlik), oyma kollar, kemer ve hayvan kabartması.
const RELIEF = {
  tilki: `<path d="M-34 10 Q-12 -20 22 -10 L36 -26 L38 -6 Q42 8 28 14 L-26 18 Q-44 18 -34 10Z M-28 16 Q-50 30 -60 8" fill="none"/>`,
  domuz: `<path d="M-36 6 Q-32 -22 6 -20 Q36 -18 38 2 L48 4 L38 12 Q20 24 -20 22 Q-38 20 -36 6Z M-22 22 v12 M20 22 v12 M-10 -20 l4 -10 l6 10" fill="none"/>`,
  akbaba: `<path d="M0 -22 L-44 0 L-14 4 L0 28 L14 4 L44 0 Z M-4 -22 a6 6 0 1 1 8 0" fill="none"/>`,
  yilan: `<path d="M0 -44 q16 11 0 22 q-16 11 0 22 q16 11 0 22 q-16 11 0 22" fill="none"/>`,
  leopar: `<path d="M-44 0 Q-40 -20 0 -20 Q36 -20 44 -6 L56 -10 L50 4 Q30 16 -30 14 Q-46 12 -44 0Z M-30 14 v14 M30 12 v14" fill="none"/><circle cx="-14" cy="-6" r="3"/><circle cx="4" cy="-2" r="3"/><circle cx="20" cy="-8" r="3"/>`,
};

function pillar(x, base, h, w, stone, { relief, arms = true, side = 'right' } = {}) {
  const capH = w * 0.5, cw = w * 2.25, d = w * 0.22;
  const dk = shade(stone, -0.28), lt = shade(stone, 0.18);
  const sx = side === 'right' ? 1 : -1;
  const T = base - h, scale = w / 110;
  const sideFace = sx > 0
    ? `M${x + w / 2} ${T} L${x + w / 2 + d} ${T - d * 0.5} L${x + w / 2 + d} ${base - d * 0.3} L${x + w / 2} ${base}Z`
    : `M${x - w / 2} ${T} L${x - w / 2 - d} ${T - d * 0.5} L${x - w / 2 - d} ${base - d * 0.3} L${x - w / 2} ${base}Z`;
  const capSide = sx > 0
    ? `M${x + cw / 2} ${T - capH} L${x + cw / 2 + d} ${T - capH - d * 0.5} L${x + cw / 2 + d} ${T - d * 0.5} L${x + cw / 2} ${T}Z`
    : `M${x - cw / 2} ${T - capH} L${x - cw / 2 - d} ${T - capH - d * 0.5} L${x - cw / 2 - d} ${T - d * 0.5} L${x - cw / 2} ${T}Z`;
  const r = rnd(Math.round(x * 7 + h));
  let specks = '';
  for (let i = 0; i < 10; i++) specks += `<circle cx="${(x - w / 2 + 6 + r() * (w - 12)).toFixed(0)}" cy="${(T + 10 + r() * (h - 20)).toFixed(0)}" r="${(1.5 + r() * 2.5).toFixed(1)}" fill="${dk}" opacity=".6"/>`;
  const armRel = arms ? `<g fill="none" stroke="${dk}" stroke-width="${Math.max(3, 4 * scale)}" stroke-linecap="round" opacity=".7">
      <path d="M${x - w * 0.36} ${T + h * 0.12} Q${x - w * 0.42} ${T + h * 0.55} ${x - w * 0.08} ${T + h * 0.72}"/>
      <path d="M${x + w * 0.36} ${T + h * 0.12} Q${x + w * 0.42} ${T + h * 0.55} ${x + w * 0.08} ${T + h * 0.72}"/>
      <path d="M${x - w * 0.12} ${T + h * 0.72} v${h * 0.04} M${x - w * 0.04} ${T + h * 0.72} v${h * 0.05} M${x + w * 0.04} ${T + h * 0.72} v${h * 0.05} M${x + w * 0.12} ${T + h * 0.72} v${h * 0.04}"/>
      <path d="M${x - w * 0.45} ${T + h * 0.8} H${x + w * 0.45}" stroke-width="${Math.max(4, 7 * scale)}"/>
    </g>` : '';
  const rel = relief ? `<g transform="translate(${x} ${T + h * 0.36}) scale(${scale * 0.9})" stroke="${dk}" stroke-width="5" fill="${dk}" stroke-linecap="round" stroke-linejoin="round">${RELIEF[relief]}</g>` : '';
  return `<g stroke-linejoin="round">
    ${shadow(x + sx * w * 0.4, base + 4, w * 1.1, 0.3)}
    <path d="${sideFace}" fill="${dk}" stroke="${INK}" stroke-width="${S}"/>
    <rect x="${x - w / 2}" y="${T}" width="${w}" height="${h}" fill="${stone}" stroke="${INK}" stroke-width="${S}"/>
    <path d="M${x - w / 2 + 6} ${T + 8} v${h - 16}" stroke="${lt}" stroke-width="5" stroke-linecap="round"/>
    ${specks}${armRel}${rel}
    <path d="${capSide}" fill="${dk}" stroke="${INK}" stroke-width="${S}"/>
    <rect x="${x - cw / 2}" y="${T - capH}" width="${cw}" height="${capH}" rx="8" fill="${stone}" stroke="${INK}" stroke-width="${S}"/>
    <path d="M${x - cw / 2 + 10} ${T - capH + 9} H${x + cw / 2 - 14}" stroke="${lt}" stroke-width="5" stroke-linecap="round"/>
    <path d="M${x - cw / 2 + 6} ${T - 6} H${x + cw / 2 - 6}" stroke="${dk}" stroke-width="4" opacity=".6"/>
  </g>`;
}

function fire(x, y, s = 1) {
  return `${light(x, y - 60 * s, 330 * s, '#ffb347', 0.55, 'a-glow')}
  <g transform="translate(${x} ${y}) scale(${s})">
    ${shadow(0, 14, 90, 0.4)}
    ${[-60, -30, 0, 30, 60].map((dx, i) => `<ellipse cx="${dx}" cy="${10 - Math.abs(dx) * 0.05}" rx="16" ry="10" fill="${['#7d7468', '#6d665c', '#8a8174'][i % 3]}" stroke="${INK}" stroke-width="4"/>`).join('')}
    <g stroke="${INK}" stroke-width="${S}">
      <rect x="-74" y="-16" width="148" height="24" rx="12" fill="#6b4529" transform="rotate(-15)"/>
      <rect x="-74" y="-16" width="148" height="24" rx="12" fill="#7a5030" transform="rotate(15)"/>
    </g>
    <path d="M-50 -14 l14 -4 M30 -18 l16 4" stroke="#a87048" stroke-width="4" stroke-linecap="round"/>
    <path class="a-flame" d="M0 -170 C52 -100 70 -46 36 -6 L-36 -6 C-70 -46 -52 -100 0 -170Z" fill="#e8701c" stroke="${INK}" stroke-width="${S}"/>
    <path class="a-flame2" d="M-6 -128 C30 -84 38 -44 20 -6 L-22 -6 C-40 -40 -30 -84 -6 -128Z" fill="#f6a43a"/>
    <path class="a-flame" d="M2 -84 C20 -58 22 -30 12 -6 L-12 -6 C-22 -30 -16 -58 2 -84Z" fill="#ffe27a"/>
    <g fill="#ffd34d"><circle class="a-spark" cx="-18" cy="-150" r="4"/><circle class="a-spark" style="animation-delay:.6s" cx="22" cy="-140" r="3"/><circle class="a-spark" style="animation-delay:1.1s" cx="4" cy="-176" r="3"/><circle class="a-spark" style="animation-delay:1.5s" cx="-30" cy="-120" r="2.5"/></g>
    <circle class="a-smoke" cx="0" cy="-200" r="26" fill="#6a6470" opacity=".4"/>
  </g>`;
}

// Arka plandaki insanlar: avatarla aynı çizim tarzında (göğüsten yukarısı).
// Alt kısmı her zaman önündeki bir öğenin (tepe, ateş, sur) arkasına saklanır.
function npc(x, y, s, seed, era = 1, { tint = 0, flip = false, bob = false } = {}) {
  const av = randomAvatar(rnd(seed));
  const body = `<g transform="translate(${x - 100 * s * (flip ? -1 : 1)} ${y - 222 * s}) scale(${flip ? -s : s} ${s})">${avatarParts(av, era)}</g>`;
  const t = tint ? `<g transform="translate(${x - 100 * s} ${y - 222 * s}) scale(${s})"><rect x="0" y="0" width="200" height="222" fill="#000" opacity="0"/></g>` : '';
  return `<g class="${bob ? 'a-bob' : ''}" style="${bob ? `animation-delay:${(seed % 10) / 7}s` : ''}">${body}${t}</g>`;
}

// Gece ateşinin önünde karanlıkta kalan siluet insanlar
function silhouette(x, y, s, color = '#1c1418') {
  return `<g transform="translate(${x} ${y}) scale(${s})" fill="${color}" stroke="${INK}" stroke-width="4">
    <path d="M-60 0 C-58 -60 -40 -84 0 -86 C40 -84 58 -60 60 0Z"/><circle cx="0" cy="-118" r="36"/></g>`;
}

function gazelle(x, y, s, color, delay = 0) {
  const lt = shade(color, 0.3);
  return `<g class="a-run" style="animation-delay:${delay}s"><g transform="translate(${x} ${y}) scale(${s})" stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">
    <path class="a-legs" d="M-28 6 l-12 32 M-16 6 l6 32 M22 6 l-8 32 M32 4 l14 28" fill="none"/>
    <path d="M-42 0 Q-38 -28 0 -28 Q30 -28 40 -16 L54 -42 L64 -38 L52 -10 Q48 6 30 6 L-30 8 Q-46 8 -42 0Z" fill="${color}"/>
    <path d="M-34 -2 Q0 4 34 -4" fill="none" stroke="${lt}" stroke-width="5"/>
    <path d="M56 -42 l-8 -24 M60 -40 l2 -24" fill="none"/>
    <circle cx="57" cy="-32" r="2" fill="${INK}"/>
  </g></g>`;
}

function aurochs(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${INK}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
    <path d="M-80 6 l-6 46 M-56 10 l2 44 M48 10 l-4 44 M70 6 l8 46" fill="none"/>
    <path d="M-100 -10 Q-104 -70 -40 -76 Q30 -86 70 -60 Q96 -44 110 -40 L130 -30 Q138 -6 116 0 L96 2 Q70 18 -60 16 Q-100 14 -100 -10Z" fill="#3a2a22"/>
    <path d="M-70 -62 Q-20 -76 40 -66" fill="none" stroke="#5a4a3a" stroke-width="7"/>
    <path d="M100 -44 Q96 -86 132 -96 M112 -42 Q130 -70 160 -66" fill="none" stroke="#e8dcc0" stroke-width="8"/>
    <path d="M100 -44 Q96 -86 132 -96 M112 -42 Q130 -70 160 -66" fill="none" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="118" cy="-24" r="3" fill="#f2c230" stroke="none"/>
    <path d="M-100 -20 q-20 10 -16 40" fill="none"/>
  </g>`;
}

function house(x, y, w, h, wall, { ladder = false, roofHole = false, smoke = false } = {}) {
  const dk = shade(wall, -0.25), lt = shade(wall, 0.15);
  return `<g stroke="${INK}" stroke-width="${S}" stroke-linejoin="round">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${wall}"/>
    <rect x="${x - 6}" y="${y - 14}" width="${w + 12}" height="18" fill="${lt}"/>
    <path d="M${x + w * 0.15} ${y + h * 0.3} l14 0 M${x + w * 0.55} ${y + h * 0.55} l18 0 M${x + w * 0.3} ${y + h * 0.75} l12 0" stroke="${dk}" stroke-width="3"/>
    ${roofHole ? `<rect x="${x + w * 0.38}" y="${y - 12}" width="${w * 0.24}" height="12" fill="#2a1a12"/>` : ''}
    ${ladder ? `<g stroke-width="4"><path d="M${x + w * 0.42} ${y - 10} L${x + w * 0.4} ${y - 90} M${x + w * 0.58} ${y - 10} L${x + w * 0.6} ${y - 90}" stroke="#6b4529" stroke-width="7"/><path d="M${x + w * 0.41} ${y - 30} H${x + w * 0.59} M${x + w * 0.41} ${y - 55} H${x + w * 0.59} M${x + w * 0.4} ${y - 80} H${x + w * 0.6}" stroke="#6b4529" stroke-width="5"/></g>` : ''}
    ${smoke ? `<circle class="a-smoke" cx="${x + w * 0.5}" cy="${y - 30}" r="18" fill="#c8c0b8" stroke="none" opacity=".5"/><circle class="a-smoke" style="animation-delay:2s" cx="${x + w * 0.5}" cy="${y - 30}" r="14" fill="#c8c0b8" stroke="none" opacity=".5"/>` : ''}
  </g>`;
}

function wheat(x, y, s, delay = 0, color = '#e2b04a') {
  const dk = shade(color, -0.3);
  return `<g class="a-sway" style="animation-delay:${delay}s"><g transform="translate(${x} ${y}) scale(${s})">
    <path d="M0 0 Q4 -60 2 -120" fill="none" stroke="${dk}" stroke-width="4"/>
    ${[0, 1, 2, 3, 4].map((i) => `<ellipse cx="${i % 2 ? 6 : -4}" cy="${-118 - i * 10}" rx="5" ry="9" fill="${color}" stroke="${INK}" stroke-width="2" transform="rotate(${i % 2 ? 20 : -20} ${i % 2 ? 6 : -4} ${-118 - i * 10})"/>`).join('')}
    <path d="M2 -164 l2 -22" stroke="${dk}" stroke-width="2"/>
  </g></g>`;
}

function hasanDagi(fill = '#8a7e9a', snow = '#f3eee6') {
  return `<path d="M200 520 L380 330 L430 370 L470 300 L560 380 L760 520Z" fill="${fill}" stroke="${INK}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M360 352 L380 330 L404 352 L390 362Z M452 320 L470 300 L492 322 L476 330Z" fill="${snow}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`;
}

// ---------- Sahneler ----------

export const SCENES = {
  // ===== ÇAĞ 1 =====
  gece_ates: () => `
    ${sky('#0b1030', '#1d1c46', '#3a2550')}
    ${milkyway()}${stars(34, 3)}
    <circle cx="640" cy="250" r="46" fill="#f3e9c6" stroke="${INK}" stroke-width="${S}"/><circle cx="626" cy="240" r="9" fill="#e0d4a8"/><circle cx="652" cy="264" r="6" fill="#e0d4a8"/>
    ${light(640, 250, 140, '#f3e9c6', 0.18)}
    ${hill('M0 520 Q180 430 380 480 T760 460 T1000 470 L1000 640 L0 640Z', '#272241')}
    ${haze(420, 600, '#3a2f5a', 0.4)}
    <path d="M40 650 Q500 560 960 650" fill="none" stroke="${INK}" stroke-width="${S}" stroke-opacity=".5"/>
    ${pillar(160, 610, 120, 44, '#6f5f4a', { arms: false })}
    ${pillar(850, 610, 120, 44, '#6f5f4a', { arms: false, side: 'left' })}
    ${pillar(320, 650, 210, 76, '#9a8466', { relief: 'tilki', side: 'left' })}
    ${pillar(690, 650, 220, 80, '#9a8466', { relief: 'domuz' })}
    ${hill('M0 630 Q500 590 1000 630 L1000 1000 L0 1000Z', '#3d2b22')}
    ${texture(0, 660, 1000, 1000, 40, '#2e2019', 5)}
    ${npc(230, 800, 0.82, 11, 1)}${npc(790, 800, 0.86, 23, 1, { flip: true })}
    ${hill('M120 830 Q230 770 340 830 L340 870 L120 870Z', '#2e2019')}
    ${hill('M670 830 Q790 770 900 830 L900 870 L670 870Z', '#2e2019')}
    ${light(500, 700, 520, '#ff9a3a', 0.28)}
    ${fire(500, 740, 1.1)}
    ${vignette(0.6)}`,

  karanlik: () => `
    ${sky('#04060e', '#0d1222', '#18202e')}
    ${stars(16, 11)}
    ${hill('M0 540 Q250 480 500 520 T1000 500 L1000 1000 L0 1000Z', '#141310')}
    ${[[110, 600, 1.1], [300, 590, 0.9], [700, 590, 1], [890, 600, 1.15]].map(([x, y, s], i) => `<g class="a-sway" style="animation-delay:${i * 0.4}s"><g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 L-10 -190 M-6 -130 L-70 -200 M-4 -100 L56 -170" stroke="#2a241c" stroke-width="20" stroke-linecap="round"/><circle cx="-30" cy="-210" r="70" fill="#1b1914" stroke="${INK}" stroke-width="${S}"/><circle cx="40" cy="-190" r="56" fill="#1f1c16" stroke="${INK}" stroke-width="${S}"/><circle cx="0" cy="-250" r="54" fill="#1d1a14" stroke="${INK}" stroke-width="${S}"/></g></g>`).join('')}
    ${haze(560, 760, '#3a4458', 0.35)}
    <g fill="#1a1813" stroke="${INK}" stroke-width="${S}"><ellipse cx="420" cy="740" rx="130" ry="64"/><ellipse cx="620" cy="760" rx="140" ry="66"/><ellipse cx="520" cy="790" rx="110" ry="50"/></g>
    <g class="a-blink"><circle cx="440" cy="705" r="10" fill="#f2c230"/><circle cx="478" cy="705" r="10" fill="#f2c230"/><circle cx="443" cy="702" r="3" fill="#fff"/><circle cx="481" cy="702" r="3" fill="#fff"/></g>
    <g class="a-blink" style="animation-delay:1.3s"><circle cx="596" cy="728" r="8" fill="#f2c230"/><circle cx="626" cy="728" r="8" fill="#f2c230"/></g>
    ${vignette(0.75)}`,

  sutun_gunduz: () => `
    ${sky('#f2b36e', '#f6cf92', '#f6e3bd')}
    <circle cx="820" cy="190" r="62" fill="#fff3c4" stroke="${INK}" stroke-width="${S}"/>${light(820, 190, 220, '#fff3c4', 0.5)}
    ${cloud(220, 210, 1.1, '#fbe7c6')}${cloud(620, 140, 0.8, '#fbe7c6', 0.9)}
    ${hill('M0 470 Q200 420 420 450 T1000 440 L1000 640 L0 640Z', '#c9a46c')}
    ${haze(380, 560, '#f6e3bd', 0.5)}
    ${pillar(150, 640, 150, 56, '#c2ab84', { arms: false })}
    ${pillar(850, 640, 140, 52, '#c2ab84', { arms: false, side: 'left' })}
    ${hill('M0 600 Q500 560 1000 600 L1000 1000 L0 1000Z', '#a8835a')}
    ${texture(0, 620, 1000, 1000, 50, '#8a6a44', 8)}
    ${pillar(480, 920, 480, 180, '#dcc6a0', { relief: 'tilki' })}
    ${npc(800, 820, 1.25, 41, 1, { flip: true })}
    ${rock(780, 860, 1.6, '#9a8a74')}
    <g fill="#f3e2bd" stroke="${INK}" stroke-width="3"><circle class="a-dust" cx="640" cy="640" r="6"/><circle class="a-dust" style="animation-delay:.8s" cx="660" cy="620" r="4"/><circle class="a-dust" style="animation-delay:1.6s" cx="610" cy="660" r="5"/></g>
    ${grass(80, 900, 1.3, '#7a6a34')}${grass(930, 920, 1.4, '#7a6a34', 0.6)}
    ${vignette(0.35)}`,

  av_safak: () => `
    ${sky('#d8645a', '#f08a5d', '#f9d58a')}
    <circle cx="500" cy="470" r="96" fill="#ffe7a8" stroke="${INK}" stroke-width="${S}"/>${light(500, 470, 360, '#ffd27a', 0.55)}
    ${cloud(180, 260, 1.2, '#f4a07a')}${cloud(800, 300, 0.9, '#f4a07a')}
    ${hill('M0 470 Q200 400 400 450 T800 430 T1000 450 L1000 1000 L0 1000Z', '#7d5f48')}
    ${haze(420, 560, '#f6b97a', 0.45)}
    ${hill('M0 560 Q300 520 500 560 T1000 550 L1000 1000 L0 1000Z', '#a8845a')}
    ${gazelle(330, 610, 1.1, '#8a6038', 0)}${gazelle(470, 640, 1.3, '#9a6a40', .4)}${gazelle(620, 605, 1.0, '#8a6038', .8)}${gazelle(240, 650, 0.9, '#8a6038', 1.2)}
    ${npc(150, 820, 1.0, 57, 1)}${npc(860, 830, 1.0, 63, 1, { flip: true })}
    ${hill('M0 720 Q500 690 1000 720 L1000 1000 L0 1000Z', '#c49c62')}
    ${texture(0, 730, 1000, 1000, 40, '#9a7a4a', 13)}
    ${[100, 260, 760, 900].map((x, i) => grass(x, 780, 1.2, '#7a5a30', i * 0.3)).join('')}
    ${vignette(0.4)}`,

  dere: (av) => `
    ${sky('#d97a5a', '#ef9a6a', '#f6d2a0')}
    ${light(500, 320, 400, '#ffd8a0', 0.4)}
    ${hill('M0 380 Q250 330 500 360 T1000 350 L1000 470 L0 470Z', '#6f7f4a')}
    ${[120, 260, 760, 900].map((x, i) => `<g transform="translate(${x} 400)"><path d="M0 0 v-60" stroke="#4a3a24" stroke-width="10"/><circle cx="0" cy="-80" r="${36 + i * 4}" fill="${i % 2 ? '#5a6a3a' : '#66764a'}" stroke="${INK}" stroke-width="${S}"/></g>`).join('')}
    <rect x="0" y="460" width="1000" height="540" fill="#356f78" stroke="${INK}" stroke-width="${S}"/>
    ${light(500, 520, 360, '#f6d2a0', 0.3)}
    <g opacity=".85" transform="translate(385 500) scale(1.15)">${avatarParts(av, 1)}</g>
    <rect x="0" y="460" width="1000" height="540" fill="#356f78" opacity=".3"/>
    ${[560, 610, 660, 710, 770, 830].map((y, i) => `<path class="a-ripple" style="animation-delay:${i * 0.35}s" d="M${340 + (i % 2) * 20} ${y} q30 -10 60 0 t60 0 t60 0 t60 0 t60 0" fill="none" stroke="#c6e8ea" stroke-width="5" stroke-linecap="round"/>`).join('')}
    ${[40, 130, 870, 950].map((x, i) => `<g class="a-sway" style="animation-delay:${i * 0.5}s"><path d="M${x} 490 q-14 -80 6 -150 M${x + 18} 490 q12 -60 -4 -120 M${x + 8} 490 q4 -90 2 -170" fill="none" stroke="#4b5a2a" stroke-width="7" stroke-linecap="round"/><ellipse cx="${x + 10}" cy="330" rx="7" ry="18" fill="#6a4a2a" stroke="${INK}" stroke-width="3"/></g>`).join('')}
    ${rock(150, 920, 2, '#7d7468')}${rock(870, 940, 2.3, '#6d665c')}
    ${vignette(0.45)}`,

  toplanma: () => `
    ${sky('#7fb3cc', '#a9cde0', '#e8e0c8')}
    ${cloud(200, 200, 1.2, '#f4f1ea')}${cloud(760, 160, 1, '#f4f1ea')}
    ${hill('M0 430 Q300 380 600 420 T1000 400 L1000 620 L0 620Z', '#b8925e')}
    ${haze(360, 520, '#e8e0c8', 0.5)}
    <path d="M40 650 Q500 560 960 650" fill="none" stroke="${INK}" stroke-width="${S}" stroke-opacity=".6"/>
    ${pillar(230, 650, 180, 64, '#d6be94', { relief: 'akbaba', side: 'left' })}
    ${pillar(770, 650, 180, 64, '#d6be94', { relief: 'yilan' })}
    ${hill('M0 610 Q500 570 1000 610 L1000 1000 L0 1000Z', '#a8835a')}
    ${texture(0, 620, 1000, 1000, 40, '#8a6a44', 17)}
    ${npc(380, 840, 1.0, 71, 1)}${npc(500, 820, 1.08, 72, 1)}${npc(625, 845, 1.0, 73, 1, { flip: true })}
    ${hill('M260 840 Q500 790 740 840 L740 900 L260 900Z', '#9a7650')}
    <g transform="translate(470 820)"><path d="M0 0 l26 -40 l22 36 Z" fill="#111" stroke="${INK}" stroke-width="4"/><path class="a-glint" d="M18 -24 l8 -10" stroke="#fff" stroke-width="4" stroke-linecap="round"/></g>
    ${grass(90, 900, 1.3)}${grass(910, 910, 1.4, '#6b5a2a', 0.4)}
    ${vignette(0.35)}`,

  ziyafet: () => `
    ${sky('#0e0b22', '#2a1d3c', '#4a2a40')}
    ${milkyway()}${stars(30, 21)}
    ${hill('M0 540 Q250 480 500 520 T1000 500 L1000 660 L0 660Z', '#271f33')}
    ${pillar(120, 660, 160, 56, '#7f6a50', { relief: 'domuz', side: 'left' })}
    ${pillar(880, 660, 160, 56, '#7f6a50', { relief: 'tilki' })}
    ${hill('M0 640 Q500 600 1000 640 L1000 1000 L0 1000Z', '#3a271e')}
    ${light(500, 760, 600, '#ff9a3a', 0.3)}
    ${npc(300, 820, 0.78, 81, 1, { bob: true })}${npc(700, 820, 0.78, 82, 1, { flip: true, bob: true })}
    ${npc(400, 860, 0.86, 83, 1, { bob: true })}${npc(610, 860, 0.86, 84, 1, { flip: true, bob: true })}
    ${fire(240, 790, 0.6)}${fire(760, 790, 0.6)}
    <g stroke="${INK}" stroke-width="${S}"><path d="M420 700 L580 700" stroke-width="9" stroke-linecap="round"/><path d="M430 700 v120 M570 700 v120" stroke-width="7"/><ellipse cx="500" cy="704" rx="52" ry="24" fill="#9a5a30"/><path d="M462 700 q38 -16 76 0" fill="none" stroke="#c07a48" stroke-width="5"/></g>
    ${fire(500, 830, 0.85)}
    ${silhouette(120, 1000, 1.2)}${silhouette(880, 1010, 1.3)}
    ${vignette(0.6)}`,

  // ===== ÇAĞ 2: ÇATALHÖYÜK =====
  catal_damlar: () => `
    ${sky('#8cc0d8', '#b8d8e4', '#f0e6cc')}
    ${cloud(160, 180, 1.1, '#fbf8f0')}${cloud(800, 220, 0.9, '#fbf8f0')}
    ${hasanDagi()}
    ${haze(380, 560, '#f0e6cc', 0.55)}
    ${hill('M0 500 Q500 470 1000 500 L1000 600 L0 600Z', '#a7a05a')}
    ${house(40, 560, 170, 120, '#c99a66')}${house(200, 540, 160, 140, '#d4a874', { smoke: true })}${house(350, 556, 150, 124, '#c99a66', { ladder: true, roofHole: true })}
    ${house(490, 534, 170, 146, '#d8ae7c', { smoke: true })}${house(650, 552, 160, 128, '#c99a66', { ladder: true, roofHole: true })}${house(800, 540, 180, 140, '#d4a874')}
    ${house(-20, 660, 230, 160, '#c4925e', { ladder: true, roofHole: true })}${house(200, 640, 200, 180, '#d0a26c')}${house(390, 660, 220, 160, '#c4925e', { smoke: true })}
    ${house(600, 645, 210, 175, '#d0a26c', { ladder: true, roofHole: true })}${house(800, 660, 230, 160, '#c4925e')}
    ${npc(300, 640, 0.6, 201, 2)}${npc(720, 645, 0.58, 202, 2, { flip: true })}
    ${hill('M-20 800 H1020 V1000 H-20Z', '#b8875a')}
    ${texture(0, 810, 1000, 1000, 40, '#9a6c44', 31)}
    ${npc(660, 990, 1.1, 203, 2, { flip: true })}
    <rect x="-20" y="960" width="1040" height="60" fill="#b8875a"/>
    ${vignette(0.35)}`,

  ev_ici: () => `
    <rect width="1000" height="1000" fill="#e6d2b0"/>
    <rect x="0" y="0" width="1000" height="170" fill="#4a3424" stroke="${INK}" stroke-width="${S}"/>
    ${[40, 220, 600, 780].map((x) => `<rect x="${x}" y="130" width="90" height="40" fill="#5a4030" stroke="${INK}" stroke-width="4"/>`).join('')}
    <rect x="250" y="0" width="150" height="170" fill="#f6eed6" stroke="${INK}" stroke-width="${S}"/>
    <path d="M0 170 H1000 V760 H0Z" fill="#ece0c4" stroke="${INK}" stroke-width="${S}"/>
    ${light(325, 140, 520, '#fff4d6', 0.55)}
    <path d="M250 170 L170 760 M400 170 L520 760" stroke="#fff4d6" stroke-width="2" opacity=".0"/>
    <path d="M250 170 L120 760 L560 760 L400 170Z" fill="#fff8e4" opacity=".18"/>
    <g stroke="#6b4529" stroke-linecap="round"><path d="M290 0 L270 640 M360 0 L380 640" stroke-width="12"/>${[80, 170, 260, 350, 440, 530, 610].map((y) => `<path d="M${290 - y * 0.03} ${y} H${360 + y * 0.03}" stroke-width="8"/>`).join('')}</g>
    <g fill="#a8342a" stroke="${INK}" stroke-width="3" stroke-linejoin="round">
      <path d="M430 300 q34 -24 70 0 l24 -18 l4 22 q-12 24 -48 22 l-46 0 q-16 -10 -4 -26Z"/><path d="M442 320 v24 M492 320 v24" fill="none" stroke-width="4"/>
      <path d="M560 268 l12 24 M584 258 l6 28 M606 268 l-2 24" fill="none" stroke-width="5"/>
      ${[0, 1, 2, 3, 4].map((i) => `<path d="M${430 + i * 36} 440 l-9 -30 l9 -7 l9 7Z"/><circle cx="${430 + i * 36}" cy="398" r="8"/>`).join('')}
      <path d="M420 470 H600" stroke-width="4"/>
    </g>
    <g stroke="${INK}" stroke-width="${S}" stroke-linejoin="round">
      ${[[640, 280], [640, 460]].map(([x, y]) => `<rect x="${x}" y="${y}" width="120" height="96" rx="20" fill="#ece0c4"/><path d="M${x + 8} ${y + 10} Q${x - 40} ${y - 50} ${x + 2} ${y - 96} Q${x + 12} ${y - 40} ${x + 36} ${y + 6}Z M${x + 112} ${y + 10} Q${x + 160} ${y - 50} ${x + 118} ${y - 96} Q${x + 108} ${y - 40} ${x + 84} ${y + 6}Z" fill="#f2ead6"/><path d="M${x + 22} ${y + 96} Q${x + 30} ${y + 130} ${x + 60} ${y + 134} Q${x + 90} ${y + 130} ${x + 98} ${y + 96}" fill="#ece0c4"/><ellipse cx="${x + 48}" cy="${y + 118}" rx="4" ry="6" fill="${INK}"/><ellipse cx="${x + 72}" cy="${y + 118}" rx="4" ry="6" fill="${INK}"/><path d="M${x + 20} ${y + 40} q40 -12 80 0" fill="none" stroke-width="3" opacity=".4"/>`).join('')}
    </g>
    <path d="M0 760 H1000 V1000 H0Z" fill="#cdb48e" stroke="${INK}" stroke-width="${S}"/>
    ${texture(0, 820, 1000, 1000, 30, '#a8906a', 41, 26)}
    <g stroke="${INK}" stroke-width="${S}" stroke-linejoin="round">
      <path d="M430 790 V650 Q430 560 520 560 Q610 560 610 650 V790Z" fill="#c9a274"/>
      <path d="M470 790 V690 Q470 636 520 636 Q570 636 570 690 V790Z" fill="#2a1a12"/>
      ${light(520, 740, 140, '#ff9a3a', 0.7, 'a-glow')}
      <path class="a-flame" d="M520 700 C542 726 548 750 532 770 L508 770 C492 750 498 726 520 700Z" fill="#f08a24"/>
    </g>
    ${npc(250, 820, 1.05, 211, 2)}
    <rect x="20" y="790" width="400" height="60" fill="#dcc4a0" stroke="${INK}" stroke-width="${S}"/>
    ${vignette(0.5)}`,

  tarla: () => `
    ${sky('#8ec4dc', '#c4e0e6', '#f6e8c0')}
    <circle cx="180" cy="180" r="56" fill="#fff3c4" stroke="${INK}" stroke-width="${S}"/>${light(180, 180, 220, '#fff3c4', 0.45)}
    ${cloud(620, 180, 1, '#fbf8f0')}
    ${hasanDagi('#9a90a8')}
    ${haze(420, 560, '#f6e8c0', 0.55)}
    ${hill('M0 500 Q300 470 500 490 T1000 480 L1000 620 L0 620Z', '#c8a24e')}
    <path d="M-10 560 Q300 600 520 560 T1010 580 L1010 620 Q700 640 500 610 T-10 610Z" fill="#4f8a96" stroke="${INK}" stroke-width="${S}"/>
    <path class="a-water" d="M120 590 q20 -6 40 0 M420 588 q20 -6 40 0 M760 600 q20 -6 40 0" stroke="#c6e8ea" stroke-width="4" fill="none" stroke-linecap="round"/>
    ${hill('M0 600 Q500 580 1000 600 L1000 1000 L0 1000Z', '#d6a84a')}
    ${(() => { let s = ''; const r = rnd(5); for (let i = 0; i < 46; i++) s += wheat(r() * 1000, 640 + r() * 120, 0.55 + r() * 0.3, r() * 2); return s; })()}
    ${npc(260, 760, 0.9, 221, 2)}${npc(760, 770, 0.92, 222, 2, { flip: true })}
    ${(() => { let s = ''; const r = rnd(9); for (let i = 0; i < 40; i++) s += wheat(r() * 1000, 780 + r() * 220, 0.9 + r() * 0.5, r() * 2); return s; })()}
    ${vignette(0.3)}`,

  yaban_sigiri: () => `
    ${sky('#a8b8c4', '#d8d4c4', '#efe4c8')}
    ${cloud(260, 220, 1.4, '#eeeae0')}${cloud(780, 180, 1.1, '#eeeae0')}
    ${hill('M0 470 Q300 430 600 460 T1000 450 L1000 1000 L0 1000Z', '#8f9a5a')}
    ${haze(400, 560, '#efe4c8', 0.5)}
    <path d="M0 560 Q500 520 1000 560 L1000 1000 L0 1000Z" fill="#a8a466" stroke="${INK}" stroke-width="${S}"/>
    ${[160, 320, 700, 860].map((x, i) => `<g class="a-sway" style="animation-delay:${i * .4}s"><path d="M${x} 600 q-6 -50 4 -90 M${x + 10} 600 q10 -40 2 -80" stroke="#5f6a3a" stroke-width="6" fill="none" stroke-linecap="round"/><ellipse cx="${x + 4}" cy="508" rx="6" ry="16" fill="#6a4a2a" stroke="${INK}" stroke-width="3"/></g>`).join('')}
    ${shadow(500, 676, 150, 0.35)}
    <g class="a-bob">${aurochs(470, 620, 1.35)}</g>
    ${npc(170, 860, 1, 231, 2)}${npc(840, 870, 1, 232, 2, { flip: true })}
    ${hill('M0 820 Q500 780 1000 820 L1000 1000 L0 1000Z', '#9a9658')}
    ${texture(0, 830, 1000, 1000, 40, '#7a7640', 51)}
    ${vignette(0.4)}`,

  nehir_tasma: () => `
    ${sky('#3a4250', '#59606a', '#7a7a74')}
    ${cloud(200, 160, 1.6, '#4a5260')}${cloud(620, 120, 1.8, '#4a5260')}${cloud(880, 220, 1.2, '#525a66')}
    <g opacity=".55">${(() => { let s = ''; const r = rnd(77); for (let i = 0; i < 70; i++) { const x = r() * 1100, y = r() * 1000; s += `<path class="a-rain" style="animation-delay:${(r() * 0.6).toFixed(2)}s" d="M${x.toFixed(0)} ${y.toFixed(0)} l-14 40" stroke="#c8d4dc" stroke-width="3" stroke-linecap="round"/>`; } return s; })()}</g>
    ${house(60, 470, 200, 140, '#a8865e')}${house(250, 450, 180, 160, '#b08e64', { ladder: true, roofHole: true })}${house(620, 460, 200, 150, '#a8865e')}${house(800, 470, 200, 140, '#b08e64')}
    <path d="M0 560 Q250 520 500 560 T1000 550 L1000 1000 L0 1000Z" fill="#6a5a3e" stroke="${INK}" stroke-width="${S}"/>
    <path class="a-water" d="M-40 640 Q200 600 420 640 T880 630 T1060 640 L1060 1000 L-40 1000Z" fill="#5a7a80" stroke="${INK}" stroke-width="${S}"/>
    ${[680, 740, 800, 870].map((y, i) => `<path class="a-ripple" style="animation-delay:${i * 0.3}s" d="M${80 + i * 40} ${y} q40 -14 80 0 t80 0 t80 0 t80 0 t80 0 t80 0" fill="none" stroke="#b8d4d8" stroke-width="5" stroke-linecap="round"/>`).join('')}
    <g class="a-bob"><rect x="420" y="700" width="120" height="16" rx="8" fill="#6b4529" stroke="${INK}" stroke-width="4" transform="rotate(-10 480 708)"/></g>
    ${npc(340, 700, 0.8, 241, 2)}${npc(660, 700, 0.8, 242, 2, { flip: true })}
    <path d="M0 690 Q250 670 500 690 T1000 690 L1000 720 Q750 700 500 720 T0 720Z" fill="#5a7a80" stroke="${INK}" stroke-width="3"/>
    ${vignette(0.6)}`,

  gece_dam: (av, kisi = false) => `
    ${sky('#0a0d22', '#1a1a3a', '#2e2440')}
    ${milkyway()}${stars(36, 61)}
    <circle cx="260" cy="230" r="40" fill="#f3e9c6" stroke="${INK}" stroke-width="${S}"/>${light(260, 230, 140, '#f3e9c6', 0.18)}
    ${hasanDagi('#3a3450', '#9a94b0')}
    ${hill('M0 500 Q500 480 1000 500 L1000 600 L0 600Z', '#2a2632')}
    ${house(30, 560, 190, 130, '#5a4a40', { ladder: true, roofHole: true })}${house(210, 540, 180, 150, '#62503f')}${house(380, 555, 170, 135, '#5a4a40', { ladder: true, roofHole: true })}
    ${house(540, 540, 190, 150, '#62503f')}${house(720, 555, 170, 135, '#5a4a40', { ladder: true, roofHole: true })}${house(880, 545, 160, 145, '#62503f')}
    ${light(440, 540, 70, '#ff9a3a', 0.6, 'a-glow')}${light(780, 540, 70, '#ff9a3a', 0.6, 'a-glow')}
    <path d="M-20 700 H1020 V1000 H-20Z" fill="#4a3c32" stroke="${INK}" stroke-width="${S}"/>
    ${texture(0, 710, 1000, 1000, 30, '#3a2e26', 71)}
    ${kisi ? npc(500, 880, 1.15, 251, 2) : ''}
    <rect x="-20" y="860" width="1040" height="160" fill="#4a3c32"/>
    <path d="M-20 860 H1020" stroke="${INK}" stroke-width="${S}"/>
    ${fire(500, 950, 0.55)}
    ${vignette(0.6)}`,
};

SCENES.gece_dam_kisi = (av) => SCENES.gece_dam(av, true);

// ---------- POV elleri ----------
// Eller yerel koordinatta yukarıyı gösterir: bilek (0,0), parmaklar -y yönünde.

function sleeve(era) {
  const c = outfitColors(era);
  if (era === 2) {
    return `<path d="M-50 8 L-66 300 L66 300 L50 8Z" fill="${c.base}" stroke="${INK}" stroke-width="${S}" stroke-linejoin="round"/>
      <path d="M-54 60 L52 110 M-58 140 L56 190 M-62 220 L60 270" stroke="${c.pattern}" stroke-width="10" opacity=".7"/>
      <rect x="-54" y="0" width="108" height="26" rx="8" fill="${c.dark}" stroke="${INK}" stroke-width="${S}"/>
      <path d="M-40 13 l10 -6 l10 6 l10 -6 l10 6 l10 -6 l10 6 l10 -6" fill="none" stroke="${c.pattern}" stroke-width="3"/>`;
  }
  let fur = '';
  for (let i = 0; i < 7; i++) fur += `<circle cx="${-48 + i * 16}" cy="${10 + (i % 2) * 5}" r="14" fill="${c.light}" stroke="${INK}" stroke-width="4"/>`;
  return `<path d="M-50 8 L-66 300 L66 300 L50 8Z" fill="${c.base}" stroke="${INK}" stroke-width="${S}" stroke-linejoin="round"/>
    ${[[-30, 60], [10, 90], [-20, 140], [24, 170], [-36, 210], [6, 240]].map(([x, y]) => `<path d="M${x} ${y} l14 -10 M${x + 8} ${y + 8} l14 -10" stroke="${c.dark}" stroke-width="4" stroke-linecap="round"/>`).join('')}
    <path d="M30 20 L44 290" stroke="${c.dark}" stroke-width="8" opacity=".5"/>
    ${fur}`;
}

// İki katmanlı çizim: önce kalın kontur, sonra dolgu → birleşik siluet.
function layered(shapes, fill) {
  return `<g stroke="${INK}" stroke-width="${S * 2}" stroke-linejoin="round" stroke-linecap="round">${shapes.map((d) => `<path d="${d}" fill="${INK}"/>`).join('')}</g>
    <g fill="${fill}">${shapes.map((d) => `<path d="${d}"/>`).join('')}</g>`;
}

function capsule(x, y, w, h, rot = 0) {
  const r = w / 2;
  const p = `M${x - r} ${y} V${y - h + r} A${r} ${r} 0 0 1 ${x + r} ${y - h + r} V${y} Z`;
  return rot ? `${p}" transform="rotate(${rot} ${x} ${y})` : p;
}

function openHand(skin) {
  const dk = shade(skin, -0.2), nail = shade(skin, 0.35);
  const fingers = [[-23, -54, 13, 42, -8], [-8, -58, 14, 50, -3], [7, -58, 14, 48, 2], [21, -54, 13, 38, 8]];
  const palm = 'M-32 0 C-36 -26 -34 -52 -26 -62 L28 -62 C36 -50 36 -24 32 0 Z';
  const thumb = capsule(-30, -14, 15, 40, -58);
  const shapes = [palm, ...fingers.map(([x, y, w, h, r]) => capsule(x, y, w, h, r)), thumb];
  return `${layered(shapes, skin)}
    <path d="M12 -60 C30 -50 30 -20 26 -2" fill="none" stroke="${dk}" stroke-width="8" opacity=".55" stroke-linecap="round"/>
    ${fingers.map(([x, y, w, h, r]) => `<g transform="rotate(${r} ${x} ${y})"><rect x="${x - w / 2 + 2.5}" y="${y - h + 3}" width="${w - 5}" height="11" rx="4" fill="${nail}" stroke="${INK}" stroke-width="2"/><path d="M${x - 4} ${y - h * 0.45} h8" stroke="${dk}" stroke-width="2.5" stroke-linecap="round"/></g>`).join('')}
    <path d="M-20 -40 q8 4 0 10 M-4 -42 q8 4 0 10 M12 -42 q8 4 0 10" fill="none" stroke="${dk}" stroke-width="2.5" stroke-linecap="round"/>`;
}

function fist(skin) {
  const dk = shade(skin, -0.2);
  const shapes = [
    'M-34 0 C-38 -20 -38 -48 -30 -62 L30 -62 C38 -48 38 -20 34 0 Z',
    ...[-22, -7, 8, 23].map((x) => `M${x - 9} -56 a9 9 0 1 1 18 0 v8 h-18Z`),
    capsule(-36, -24, 18, 54, -82),
  ];
  return `${layered(shapes, skin)}
    ${[-15, 0, 15].map((x) => `<path d="M${x} -64 v18" stroke="${dk}" stroke-width="3" stroke-linecap="round"/>`).join('')}
    <path d="M18 -50 C30 -36 30 -16 26 -2" fill="none" stroke="${dk}" stroke-width="7" opacity=".5" stroke-linecap="round"/>
    <path d="M10 -30 h12" stroke="${dk}" stroke-width="2.5" stroke-linecap="round"/>`;
}

const POSE = {
  right: 'translate(690 330) rotate(-28) scale(1.75)',
  rightLow: 'translate(720 440) rotate(-22) scale(1.6)',
  rightCenter: 'translate(620 380) rotate(-12) scale(1.5)',
};

function arm(era, hand, transform, extraBehind = '', extraFront = '') {
  return `<g transform="${transform}">${sleeve(era)}${extraBehind}${hand}${extraFront}</g>`;
}
const mirror = (c) => `<g transform="translate(1000 0) scale(-1 1)">${c}</g>`;

export function hands(pose, avIn, era = 1) {
  const skin = SKIN[avIn?.skin ?? 4] ?? SKIN[4];
  const O = openHand(skin), F = fist(skin);
  let out = '';
  switch (pose) {
    case 'mizrak':
      out = mirror(arm(era, O, POSE.rightLow))
        + arm(era, F, POSE.right, `<path d="M0 -520 L0 260" stroke="${INK}" stroke-width="26" stroke-linecap="round"/><path d="M0 -520 L0 260" stroke="#7a5030" stroke-width="16" stroke-linecap="round"/><path d="M-4 -500 v700" stroke="#a87048" stroke-width="4"/><path d="M0 -600 L-20 -520 L20 -520Z" fill="#3a3a3e" stroke="${INK}" stroke-width="${S}" stroke-linejoin="round"/><path d="M-12 -526 l24 -8 M-12 -510 l24 -8" stroke="#a87048" stroke-width="5"/>`);
      break;
    case 'kalem':
      out = mirror(arm(era, O, POSE.rightLow))
        + arm(era, F, POSE.right, '', `<path d="M-6 -66 L-14 -120 L4 -128 L12 -70Z" fill="#8a8a8e" stroke="${INK}" stroke-width="${S}" stroke-linejoin="round"/><path d="M-10 -110 l12 -4" stroke="#c8c8cc" stroke-width="3"/>`);
      break;
    case 'mesale':
      out = arm(era, F, POSE.right, `<path d="M0 -300 L0 160" stroke="${INK}" stroke-width="30" stroke-linecap="round"/><path d="M0 -300 L0 160" stroke="#6b4529" stroke-width="20" stroke-linecap="round"/>
        <g transform="translate(0 -300) scale(.8)">${light(0, -80, 260, '#ffb347', 0.6, 'a-glow')}<path class="a-flame" d="M0 -170 C52 -100 70 -46 36 -6 L-36 -6 C-70 -46 -52 -100 0 -170Z" fill="#e8701c" stroke="${INK}" stroke-width="${S}"/><path class="a-flame2" d="M0 -110 C26 -70 32 -36 18 -6 L-18 -6 C-32 -36 -26 -70 0 -110Z" fill="#ffd34d"/></g>`);
      break;
    case 'dinlen':
      out = mirror(arm(era, O, 'translate(720 480) rotate(-18) scale(1.6)')) + arm(era, O, 'translate(720 480) rotate(-18) scale(1.6)');
      break;
    case 'orak':
      out = mirror(arm(era, F, POSE.rightLow, '', `${[-30, -10, 10].map((d, i) => `<path d="M${d} -60 Q${d - 10 + i * 6} -160 ${d - 20 + i * 12} -220" fill="none" stroke="#a8803a" stroke-width="5"/><ellipse cx="${d - 20 + i * 12}" cy="-232" rx="9" ry="20" fill="#e2b04a" stroke="${INK}" stroke-width="3"/>`).join('')}`))
        + arm(era, F, POSE.right, `<path d="M0 -40 L0 90" stroke="${INK}" stroke-width="28" stroke-linecap="round"/><path d="M0 -40 L0 90" stroke="#e8dcc0" stroke-width="18" stroke-linecap="round"/>`,
          `<path d="M0 -60 Q10 -150 -90 -190" fill="none" stroke="${INK}" stroke-width="30" stroke-linecap="round"/><path d="M0 -60 Q10 -150 -90 -190" fill="none" stroke="#e8dcc0" stroke-width="20" stroke-linecap="round"/>${[[4, -96], [-6, -130], [-30, -160], [-60, -178]].map(([x, y]) => `<path d="M${x} ${y} l-14 -12 l6 -4Z" fill="#2a2a30" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`).join('')}`);
      break;
    case 'firca':
      out = mirror(arm(era, O, POSE.rightLow, '', `<g transform="translate(0 -70)"><path d="M-70 0 Q0 60 70 0Z" fill="#c9a274" stroke="${INK}" stroke-width="${S}" stroke-linejoin="round"/><ellipse cx="0" cy="0" rx="70" ry="16" fill="#a8342a" stroke="${INK}" stroke-width="${S}"/></g>`))
        + arm(era, F, POSE.right, `<path d="M0 -190 L0 60" stroke="${INK}" stroke-width="18" stroke-linecap="round"/><path d="M0 -190 L0 60" stroke="#8a6a44" stroke-width="10" stroke-linecap="round"/><path d="M-10 -186 Q0 -240 10 -186Z" fill="#a8342a" stroke="${INK}" stroke-width="4"/>`);
      break;
    case 'sepet':
      out = mirror(arm(era, O, POSE.rightCenter)) + arm(era, O, POSE.rightCenter)
        + `<g transform="translate(500 330)"><path d="M-190 -40 L-150 120 L150 120 L190 -40Z" fill="#b08850" stroke="${INK}" stroke-width="${S}" stroke-linejoin="round"/>
          ${[-160, -110, -60, -10, 40, 90, 140].map((x) => `<path d="M${x} -36 L${x * 0.8} 116" stroke="#8a6a3a" stroke-width="4"/>`).join('')}
          ${[0, 40, 80].map((y) => `<path d="M${-180 + y * 0.25} ${y} H${180 - y * 0.25}" stroke="#8a6a3a" stroke-width="4"/>`).join('')}
          <ellipse cx="0" cy="-40" rx="190" ry="34" fill="#e2b04a" stroke="${INK}" stroke-width="${S}"/>
          ${(() => { let s = ''; const r = rnd(3); for (let i = 0; i < 30; i++) s += `<ellipse cx="${(-160 + r() * 320).toFixed(0)}" cy="${(-56 + r() * 30).toFixed(0)}" rx="5" ry="3" fill="#c48a2a"/>`; return s; })()}</g>`;
      break;
    case 'kerpic':
      out = mirror(arm(era, O, POSE.rightCenter)) + arm(era, O, POSE.rightCenter)
        + `<g transform="translate(500 300)"><path d="M-170 -50 L150 -60 L180 40 L-150 54Z" fill="#9a6a44" stroke="${INK}" stroke-width="${S}" stroke-linejoin="round"/><path d="M-170 -50 L-150 54 L-150 84 L-172 -20Z" fill="#7a5034" stroke="${INK}" stroke-width="${S}" stroke-linejoin="round"/>
          <path d="M-120 -20 l30 6 M-40 0 l40 -4 M60 -30 l30 8 M20 30 l40 -6" stroke="#d8b06a" stroke-width="4" stroke-linecap="round"/></g>`;
      break;
    case 'yok':
      return '';
    default:
      out = mirror(arm(era, O, POSE.right)) + arm(era, O, POSE.right);
  }
  return `<svg class="hands" viewBox="170 0 660 470" preserveAspectRatio="xMidYMax meet" overflow="visible" aria-hidden="true">${out}</svg>`;
}

export function sceneSVG(key, av) {
  const fn = SCENES[key] || SCENES.gece_ates;
  return `<svg class="bg" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${fn(av)}</svg>`;
}
