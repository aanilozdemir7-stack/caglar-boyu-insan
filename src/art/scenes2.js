// Çağ 4-10 sahneleri. Ortak çizim parçaları scenes.js'ten gelir.
import {
  SCENES, FOCUS, S, INK, shade, sky, vignette, light, haze, rnd, stars, milkyway, cloud, hill, texture, grass, rock,
  shadow, fire, npc, silhouette, donkey, house2, tablets, erciyes, pillar, viewBand,
} from './scenes.js';

// Dar (dikey) ekranda mı çiziliyor? Öyleyse yan öğeler görünen alana toplanır.
const narrowView = () => viewBand().w < 700;

// ---------- Ortak parçalar ----------
let sid = 0;
// Yumuşak kenarlı toz / duman bulutu (düz gri daire yerine).
function puff(cx, cy, r, color, cls = '', delay = 0, op = 0.8) {
  const id = 'pf' + (++sid);
  return `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${color}" stop-opacity="${op}"/><stop offset=".55" stop-color="${color}" stop-opacity="${op * 0.6}"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient></defs><circle class="${cls}" style="animation-delay:${delay}s" cx="${cx}" cy="${cy}" r="${r}" fill="url(#${id})"/>`;
}
export function sea(y, top = '#3f86a8', bottom = '#1f4f6e') {
  const id = 'sea' + (++sid);
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs>
    <rect x="-10" y="${y}" width="1020" height="${1010 - y}" fill="url(#${id})" stroke="${INK}" stroke-width="${S}"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<path class="a-ripple" style="animation-delay:${i * 0.4}s" d="M${(i % 2) * 60 - 40} ${y + 40 + i * 55} q40 -12 80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0" fill="none" stroke="${shade(top, 0.45)}" stroke-width="4" stroke-linecap="round" opacity=".7"/>`).join('')}`;
}

// Tunç Çağı gemisi: tek direk, kare yelken, iki ucu kalkık gövde, yük olarak bakır külçeler.
export function shipBronze(x, y, s, { sail = '#efe2c4', tilt = 0, cargo = true } = {}) {
  return `<g transform="translate(${x} ${y}) rotate(${tilt}) scale(${s})" stroke="${INK}" stroke-width="${S / s}" stroke-linejoin="round">
    <path d="M-220 0 Q-250 -40 -240 -90 Q-200 -40 -160 -30 L170 -30 Q220 -40 240 -100 Q256 -40 220 10 Q200 40 160 46 L-160 46 Q-200 40 -220 0Z" fill="#8a5a34"/>
    <path d="M-200 10 H200" stroke="#6b4529" stroke-width="${6 / s}"/>
    <path d="M-180 26 H180" stroke="#a8784a" stroke-width="${4 / s}"/>
    ${cargo ? [-120, -60, 0, 60, 120].map((cx) => `<path d="M${cx - 26} -30 l-6 -18 h64 l-6 18Z" fill="#b8683a"/><path d="M${cx - 20} -40 h40" stroke="#e09a5a" stroke-width="${3 / s}"/>`).join('') : ''}
    <path d="M0 -30 V-330" stroke="#6b4529" stroke-width="${12 / s}"/>
    <path d="M-150 -310 H150 M-150 -100 H150" stroke="#6b4529" stroke-width="${8 / s}"/>
    <path d="M-146 -306 H146 V-104 H-146Z" fill="${sail}"/>
    <path d="M-146 -250 H146 M-146 -190 H146 M-146 -150 H146" stroke="${shade(sail, -0.15)}" stroke-width="${4 / s}"/>
    <path d="M200 20 L250 120" stroke="#6b4529" stroke-width="${10 / s}"/>
  </g>`;
}

export function columns(x0, x1, y, h, n, color = '#efe8d8', { cap = true } = {}) {
  const dk = shade(color, -0.22);
  const w = (x1 - x0) / n * 0.55;
  let s = '';
  for (let i = 0; i < n; i++) {
    const cx = x0 + (x1 - x0) * (i + 0.5) / n;
    s += `<g stroke="${INK}" stroke-width="${S}">
      <rect x="${cx - w / 2}" y="${y - h}" width="${w}" height="${h}" fill="${color}"/>
      ${[0.25, 0.5, 0.75].map((f) => `<path d="M${cx - w / 2 + w * f} ${y - h + 10} V${y - 6}" stroke="${dk}" stroke-width="3"/>`).join('')}
      ${cap ? `<rect x="${cx - w * 0.8}" y="${y - h - 18}" width="${w * 1.6}" height="20" rx="4" fill="${color}"/><path d="M${cx - w * 0.8 + 4} ${y - h - 8} q8 -10 16 0 M${cx + w * 0.8 - 20} ${y - h - 8} q8 -10 16 0" fill="none" stroke-width="3"/>` : ''}
      <rect x="${cx - w * 0.7}" y="${y - 10}" width="${w * 1.4}" height="14" fill="${dk}"/>
    </g>`;
  }
  return s;
}

export function dome(cx, y, r, color = '#9aa8b8') {
  return `<g stroke="${INK}" stroke-width="${S}">
    <path d="M${cx - r} ${y} A${r} ${r} 0 0 1 ${cx + r} ${y}Z" fill="${color}"/>
    ${[-0.6, -0.3, 0, 0.3, 0.6].map((f) => `<path d="M${cx + r * f} ${y} Q${cx + r * f * 0.6} ${y - r * 0.9} ${cx} ${y - r}" fill="none" stroke-width="2.5" opacity=".5"/>`).join('')}
    <rect x="${cx - r - 8}" y="${y}" width="${2 * r + 16}" height="18" fill="${shade(color, -0.2)}"/>
  </g>`;
}

function wall(x, y, w, h, color, { crenel = true, tower = false } = {}) {
  const dk = shade(color, -0.2);
  let s = `<g stroke="${INK}" stroke-width="${S}"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}"/>`;
  if (crenel) for (let i = 0; i < w / 40; i++) s += `<rect x="${x + i * 40 + 4}" y="${y - 22}" width="24" height="24" fill="${color}"/>`;
  for (let r = 0; r < h / 30; r++) s += `<path d="M${x} ${y + r * 30 + 30} H${x + w}" stroke-width="2" opacity=".35"/>`;
  s += `<path d="M${x + 6} ${y + 6} V${y + h - 6}" stroke="${shade(color, 0.15)}" stroke-width="5"/>`;
  s += '</g>';
  void dk; void tower;
  return s;
}

function interior(wallC, floorC, { beam = '#5a3e2a', window = false } = {}) {
  return `<rect width="1000" height="1000" fill="${wallC}"/>
    <path d="M0 0 H1000 V150 H0Z" fill="${beam}" stroke="${INK}" stroke-width="${S}"/>
    ${[100, 300, 500, 700, 900].map((x) => `<rect x="${x - 20}" y="110" width="40" height="40" fill="${shade(beam, 0.1)}" stroke="${INK}" stroke-width="4"/>`).join('')}
    <path d="M0 150 H1000 V760 H0Z" fill="${wallC}" stroke="${INK}" stroke-width="${S}"/>
    ${window ? `<rect x="160" y="220" width="160" height="200" rx="80" fill="#f6eed6" stroke="${INK}" stroke-width="${S}"/>${light(240, 320, 420, '#fff2cc', 0.5)}` : ''}
    <path d="M0 760 H1000 V1000 H0Z" fill="${floorC}" stroke="${INK}" stroke-width="${S}"/>
    ${texture(0, 780, 1000, 1000, 30, shade(floorC, -0.15), 5, 26)}`;
}

function horse(x, y, s, color = '#8a5a34', flip = false) {
  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})" stroke="${INK}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
    <path d="M-60 0 l-8 70 M-40 4 l4 70 M50 4 l-6 70 M70 0 l10 66" fill="none"/>
    <path d="M-90 -10 Q-96 -60 -40 -64 L50 -64 Q80 -64 92 -90 L110 -140 Q122 -158 140 -146 L150 -120 Q148 -106 132 -110 L118 -60 Q100 8 60 10 L-60 12 Q-92 10 -90 -10Z" fill="${color}"/>
    <path d="M96 -96 Q104 -130 124 -150" fill="none" stroke="${shade(color, -0.4)}" stroke-width="12"/>
    <path d="M-90 -40 q-30 10 -24 60" fill="none" stroke="${shade(color, -0.4)}" stroke-width="10"/>
    <circle cx="134" cy="-132" r="3" fill="${INK}" stroke="none"/>
  </g>`;
}

function chariot(x, y, s, flip = false) {
  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
    ${horse(150, -10, 0.8, '#7a4a2a')}${horse(110, 0, 0.8, '#5a3a22')}
    <g stroke="${INK}" stroke-width="5" stroke-linejoin="round">
      <path d="M-40 -40 L80 -50" stroke="#6b4529" stroke-width="8"/>
      <path d="M-120 -120 L-40 -120 L-30 -30 L-130 -30Z" fill="#a8783a"/>
      <circle cx="-80" cy="-10" r="44" fill="none" stroke-width="7"/>
      <circle cx="-80" cy="-10" r="44" fill="none" stroke="#8a5a34" stroke-width="4"/>
      ${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M-80 -10 l${(Math.cos(i * Math.PI / 3) * 42).toFixed(0)} ${(Math.sin(i * Math.PI / 3) * 42).toFixed(0)}" stroke-width="3"/>`).join('')}
    </g>
  </g>`;
}

function lion(x, y, s) {
  // Aslanlı Kapı aslanı: duvardan taşan, ağzı açık, önden görünen baş.
  let mane = '';
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    mane += `<circle cx="${(Math.cos(a) * 70).toFixed(1)}" cy="${(Math.sin(a) * 74 - 10).toFixed(1)}" r="24" fill="#b39c72" stroke="${INK}" stroke-width="4"/>`;
  }
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke-linejoin="round" stroke-linecap="round">
    <path d="M-80 30 L-90 160 L90 160 L80 30Z" fill="#bba680" stroke="${INK}" stroke-width="5"/>
    <path d="M-60 120 h30 M-20 130 h40 M30 120 h30" stroke="#9a8664" stroke-width="4"/>
    ${mane}
    <ellipse cx="0" cy="-6" rx="56" ry="62" fill="#d2c09a" stroke="${INK}" stroke-width="5"/>
    <path d="M-40 -40 Q-24 -52 -8 -40 M8 -40 Q24 -52 40 -40" fill="none" stroke="${INK}" stroke-width="5"/>
    <path d="M-36 -26 Q-22 -36 -10 -26 Q-22 -18 -36 -26Z M10 -26 Q22 -36 36 -26 Q22 -18 10 -26Z" fill="#f4ecd8" stroke="${INK}" stroke-width="3"/>
    <circle cx="-22" cy="-26" r="4" fill="${INK}"/><circle cx="22" cy="-26" r="4" fill="${INK}"/>
    <path d="M-12 -2 L12 -2 L0 12Z" fill="#7a6248" stroke="${INK}" stroke-width="4"/>
    <path d="M0 12 V20 M-30 14 Q-14 20 0 20 Q14 20 30 14" fill="none" stroke="${INK}" stroke-width="4"/>
    <path d="M-28 24 Q0 70 28 24 Z" fill="#5a2a22" stroke="${INK}" stroke-width="4"/>
    <path d="M-22 26 l5 12 l5 -11 M22 26 l-5 12 l-5 -11" fill="#f4ecd8" stroke="${INK}" stroke-width="2"/>
  </g>`;
}

// Kaya kabartması tanrı figürü (profilden yürüyen, sivri külahlı)
function reliefGod(x, y, s, rock = '#b8b09a', flip = false) {
  const f = shade(rock, -0.14), l = shade(rock, -0.5);
  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})" stroke="${l}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">
    <path d="M-12 -150 L2 -214 L16 -150Z" fill="${f}"/>
    <path d="M-12 -170 h26 M-10 -184 h20" stroke-width="2.5"/>
    <circle cx="4" cy="-136" r="15" fill="${f}"/><path d="M16 -136 l6 4 l-6 2" fill="none" stroke-width="3"/>
    <path d="M-16 -122 L20 -122 L24 -62 L-20 -62Z" fill="${f}"/>
    <path d="M-24 -62 L28 -62 L34 -18 L-28 -18Z" fill="${f}"/><path d="M-26 -40 L30 -40" stroke-width="2.5"/>
    <path d="M-14 -18 L-22 34 M14 -18 L24 34" fill="none" stroke-width="7"/>
    <path d="M-22 34 h-14 q-6 -2 -2 -12 M24 34 h18 q6 -2 2 -12" fill="none" stroke-width="5"/>
    <path d="M14 -112 L40 -94" fill="none" stroke-width="7"/>
    <path d="M-10 -116 Q-34 -148 -12 -166" fill="none" stroke-width="5"/>
  </g>`;
}

function wingedSun(x, y, s, gold = '#d9b24a') {
  let feathers = '';
  for (let i = 0; i < 5; i++) {
    feathers += `<path d="M${30 + i * 26} ${-6 + i * 4} L${46 + i * 26} ${40 + i * 6} L${58 + i * 26} ${-2 + i * 4}" fill="${gold}" stroke="${INK}" stroke-width="3"/>`;
  }
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke-linejoin="round">
    <g>${feathers}</g><g transform="scale(-1 1)">${feathers}</g>
    <path d="M24 -14 Q120 -40 170 -6 Q120 -10 24 6Z M-24 -14 Q-120 -40 -170 -6 Q-120 -10 -24 6Z" fill="${shade(gold, 0.2)}" stroke="${INK}" stroke-width="4"/>
    <circle cx="0" cy="-4" r="34" fill="${gold}" stroke="${INK}" stroke-width="5"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M0 -4 l${(Math.cos(i * Math.PI / 4) * 26).toFixed(1)} ${(Math.sin(i * Math.PI / 4) * 26).toFixed(1)}" stroke="${INK}" stroke-width="3"/>`).join('')}
    <circle cx="0" cy="-4" r="10" fill="${shade(gold, 0.35)}" stroke="${INK}" stroke-width="3"/>
  </g>`;
}

// ---------- ÇAĞ 4: HİTİTLER ----------
Object.assign(SCENES, {
  gemi_deniz: () => `
    ${sky('#7fb8d8', '#b8d8e6', '#e8eee8')}
    ${cloud(220, 180, 1.2, '#fbf8f0')}${cloud(760, 140, 1, '#fbf8f0')}${cloud(880, 260, 0.8, '#f0ece4')}
    <path d="M0 460 Q300 430 560 450 T1000 440 L1000 480 L0 480Z" fill="#8a9a8a" opacity=".6"/>
    ${sea(470)}
    <g class="a-bob">${shipBronze(500, 620, 0.95, {})}</g>
    ${npc(330, 596, 0.36, 401, 4)}${npc(690, 592, 0.36, 402, 4, { flip: true })}
    ${vignette(0.3)}`,

  firtina_deniz: () => `
    ${sky('#1e2430', '#38404e', '#56606a')}
    <rect class="a-flash" width="1000" height="1000" fill="#eef4ff" opacity="0"/>
    ${cloud(200, 140, 2, '#2e3440')}${cloud(620, 110, 2.2, '#2e3440')}${cloud(900, 200, 1.6, '#363c48')}
    <path class="a-flash" d="M760 200 L720 330 L760 330 L700 480" fill="none" stroke="#f6f0c0" stroke-width="8" opacity="0"/>
    <g opacity=".6">${(() => { let s = ''; const r = rnd(41); for (let i = 0; i < 80; i++) { const x = r() * 1100, y = r() * 1000; s += `<path class="a-rain" style="animation-delay:${(r() * 0.6).toFixed(2)}s" d="M${x.toFixed(0)} ${y.toFixed(0)} l-18 40" stroke="#c8d4dc" stroke-width="3" stroke-linecap="round"/>`; } return s; })()}</g>
    ${sea(520, '#3a5a6a', '#162a36')}
    <path d="M-20 600 Q120 480 260 600 Q400 470 540 600 Q680 480 820 600 Q940 500 1020 580 L1020 1000 L-20 1000Z" fill="#2a4654" stroke="${INK}" stroke-width="${S}"/>
    <g class="a-bob">${shipBronze(500, 640, 0.9, { tilt: -12, sail: '#c8bca4' })}</g>
    <path d="M-20 760 Q160 640 320 760 Q480 650 640 760 Q800 660 1020 740 L1020 1000 L-20 1000Z" fill="#1e3846" stroke="${INK}" stroke-width="${S}"/>
    <path d="M140 700 q20 -20 40 0 M480 700 q20 -20 40 0 M820 700 q20 -20 40 0" fill="none" stroke="#e8f0f4" stroke-width="6" stroke-linecap="round"/>
    ${vignette(0.7)}`,

  kas_kiyi: () => `
    ${sky('#f0a878', '#f6cfa0', '#f2e6cc')}
    <circle cx="760" cy="300" r="70" fill="#fff0c0" stroke="${INK}" stroke-width="${S}"/>${light(760, 300, 260, '#ffd890', 0.45)}
    <path d="M-20 520 L120 360 L240 420 L360 330 L480 460 L600 520Z" fill="#8a7a6a" stroke="${INK}" stroke-width="${S}" stroke-linejoin="round"/>
    ${haze(380, 560, '#f2e6cc', 0.5)}
    ${sea(500, '#4a9ab8', '#1f5a78')}
    <g opacity=".55"><path d="M380 760 l60 -10 l20 20 l-60 10Z M480 800 l60 -10 l20 20 l-60 10Z M600 770 l60 -10 l20 20 l-60 10Z" fill="#b8683a" stroke="${INK}" stroke-width="3"/></g>
    <path d="M-20 1000 L-20 700 Q120 640 260 700 Q340 760 300 1000Z" fill="#9a8a74" stroke="${INK}" stroke-width="${S}"/>
    <path d="M1020 1000 L1020 660 Q860 620 760 720 Q700 800 740 1000Z" fill="#8a7a64" stroke="${INK}" stroke-width="${S}"/>
    ${rock(150, 760, 1.4, '#7d7468')}${rock(860, 780, 1.6, '#6d665c')}
    <g class="a-bob"><path d="M470 610 l120 -10 l4 14 l-120 10Z" fill="#8a5a34" stroke="${INK}" stroke-width="4"/><path d="M560 640 l70 6 l-2 12 l-70 -6Z" fill="#6b4529" stroke="${INK}" stroke-width="4"/></g>
    ${vignette(0.35)}`,

  hattusa_kapi: () => `
    ${sky('#8cb4cc', '#b8d0dc', '#ece2c8')}
    ${cloud(180, 160, 1.1, '#fbf8f0')}${cloud(820, 130, 1, '#fbf8f0')}
    ${hill('M0 520 Q300 440 600 480 T1000 470 L1000 1000 L0 1000Z', '#b09a6a')}
    ${haze(420, 560, '#ece2c8', 0.4)}
    ${wall(-20, 380, 360, 300, '#c8b48e')}${wall(660, 380, 360, 300, '#c8b48e')}
    <g stroke="${INK}" stroke-width="${S}">
      <rect x="300" y="300" width="120" height="380" fill="#bba680"/><rect x="580" y="300" width="120" height="380" fill="#bba680"/>
      ${[305, 345, 385, 585, 625, 665].map((x) => `<rect x="${x}" y="278" width="26" height="24" fill="#bba680"/>`).join('')}
      <path d="M420 680 V460 Q500 360 580 460 V680Z" fill="#2a1a12"/>
      <path d="M420 680 V460 Q500 360 580 460 V680" fill="none" stroke="#9a8664" stroke-width="16"/>
    </g>
    ${lion(372, 560, 0.62)}${lion(628, 560, 0.62)}
    <path d="M380 680 L320 1000 H680 L620 680Z" fill="#a8a094" stroke="${INK}" stroke-width="${S}"/>
    ${npc(470, 760, 0.7, 411, 4)}${npc(540, 765, 0.7, 412, 4, { flip: true })}
    <path d="M466 690 L476 560 M546 690 L536 560" stroke="#6b4529" stroke-width="6"/><path d="M470 560 l6 -24 l6 24Z M530 560 l6 -24 l6 24Z" fill="#9a9aa0" stroke="${INK}" stroke-width="3"/>
    ${vignette(0.35)}`,

  tapinak_hitit: () => `
    ${sky('#e8b080', '#f2cc9a', '#f4e4c4')}
    ${hill('M0 460 Q300 400 600 440 T1000 430 L1000 600 L0 600Z', '#a88a5a')}
    ${haze(380, 520, '#f4e4c4', 0.5)}
    <path d="M0 560 H1000 V1000 H0Z" fill="#c8b08a" stroke="${INK}" stroke-width="${S}"/>
    ${[[60, 560, 300], [380, 560, 260], [660, 560, 320]].map(([x, y, w]) => `<g stroke="${INK}" stroke-width="${S}"><rect x="${x}" y="${y - 120}" width="${w}" height="120" fill="#bca27a"/><path d="M${x} ${y - 60} H${x + w}" stroke-width="2" opacity=".4"/></g>`).join('')}
    ${[160, 260, 360, 460, 560, 660, 760, 860].map((x, i) => `<g stroke="${INK}" stroke-width="${S}" transform="translate(${x} ${700 + (i % 2) * 40})"><path d="M-46 0 Q-70 110 -34 170 H34 Q70 110 46 0Z" fill="${['#b5653a', '#a8582e', '#c0703f'][i % 3]}"/><ellipse cx="0" cy="0" rx="46" ry="14" fill="#8a4526"/><path d="M-40 60 Q0 76 40 60" fill="none" stroke-width="3"/></g>`).join('')}
    ${npc(500, 1000, 1.1, 421, 4)}
    ${vignette(0.4)}`,

  savas_arabasi: () => `
    ${sky('#c8a070', '#e0bc88', '#ecd8b0')}
    <circle cx="200" cy="260" r="60" fill="#fff0c0" stroke="${INK}" stroke-width="${S}"/>
    ${hill('M0 480 Q300 440 600 470 T1000 460 L1000 1000 L0 1000Z', '#b8955a')}
    ${haze(420, 600, '#ecd8b0', 0.6)}
    ${puff(300, 560, 44, '#d8c8a0', 'a-dust', 0)}${puff(700, 560, 52, '#d8c8a0', 'a-dust', 0.6)}${puff(500, 540, 58, '#d8c8a0', 'a-dust', 1.2)}
    <g class="a-run" style="animation-delay:.5s" opacity=".85">${chariot(140, 560, 0.5)}</g>
    <g class="a-run" style="animation-delay:1s" opacity=".85">${chariot(700, 545, 0.45)}</g>
    ${(() => { const V = viewBand(), n = narrowView(), k = n ? 0.7 : 1, cx = n ? V.x + 91 + (V.w - 273) / 2 : 410; return `<g class="a-run">${npc(cx - 80 * k, 720 - 80 * k, 0.42 * k, 451, 4, { fixed: true })}${chariot(cx, 720, k)}</g>`; })()}
    ${hill('M0 820 Q500 780 1000 820 L1000 1000 L0 1000Z', '#a8854a')}
    ${vignette(0.45)}`,

  yazilikaya: () => `
    ${sky('#9ac0d4', '#c4d8e0', '#ecead8')}
    <path d="M-20 1000 L-20 120 Q80 80 200 160 L260 1000Z" fill="#a8a08e" stroke="${INK}" stroke-width="${S}"/>
    <path d="M1020 1000 L1020 140 Q900 80 800 170 L740 1000Z" fill="#9a927e" stroke="${INK}" stroke-width="${S}"/>
    <path d="M200 160 Q500 100 800 170 L820 760 L180 760Z" fill="#b8b09a" stroke="${INK}" stroke-width="${S}"/>
    ${texture(220, 200, 780, 740, 40, '#9a927e', 31, 20)}
    ${[0, 1, 2, 3, 4].map((i) => reliefGod(250 + i * 56, 600 + (i % 2) * 6, 0.9)).join('')}
    ${[0, 1, 2, 3].map((i) => reliefGod(760 - i * 56, 600 + (i % 2) * 6, 0.85, '#b8b09a', true)).join('')}
    <path d="M200 760 H820 V1000 H200Z" fill="#8a826e" stroke="${INK}" stroke-width="${S}"/>
    ${npc(420, 960, 1, 431, 4)}${npc(620, 970, 1, 432, 4, { flip: true })}
    ${light(500, 300, 400, '#fff4d6', 0.3)}
    ${vignette(0.4)}`,

  saray_hitit: () => `
    ${interior('#d8c09a', '#b8a07a', { window: true })}
    ${[600, 760].map((x) => `<g stroke="${INK}" stroke-width="${S}"><rect x="${x - 26}" y="200" width="52" height="560" fill="#8a6440"/><rect x="${x - 40}" y="190" width="80" height="20" fill="#6b4529"/></g>`).join('')}
    <g stroke="${INK}" stroke-width="${S}"><path d="M420 760 V560 H900 V760" fill="#a8783a"/><rect x="420" y="540" width="480" height="28" fill="#8a5a34"/></g>
    ${tablets(460, 600, 6, 1.1, 41)}
    ${wingedSun(680, 300, 0.9)}
    ${npc(300, 860, 1.1, 441, 4)}${npc(860, 870, 1.05, 442, 4, { flip: true })}
    ${vignette(0.45)}`,
});

Object.assign(FOCUS, {
  gemi_deniz: [500, 520, 860], firtina_deniz: [500, 560, 860], kas_kiyi: [480, 600, 820], hattusa_kapi: [500, 520, 860],
  tapinak_hitit: [500, 700, 820], savas_arabasi: [470, 600, 760], yazilikaya: [500, 480, 860], saray_hitit: [620, 520, 860],
});


// ---------- ÇAĞ 5: URARTU, FRİGYA, LİDYA ----------
function jar(x, y, s, c = '#b5653a') {
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${INK}" stroke-width="5" stroke-linejoin="round">
    <path d="M-40 -150 Q-80 -110 -70 -40 Q-60 0 -20 10 H20 Q60 0 70 -40 Q80 -110 40 -150Z" fill="${c}"/>
    <ellipse cx="0" cy="-150" rx="42" ry="12" fill="${shade(c, -0.3)}"/>
    <path d="M-62 -100 Q0 -84 62 -100" fill="none" stroke-width="3"/>
    <path d="M-30 -120 h14 l4 -8 M0 -122 h16" stroke="${shade(c, -0.45)}" stroke-width="3" fill="none"/>
  </g>`;
}
function cauldron(x, y, s) {
  const bull = (bx) => `<g transform="translate(${bx} -100)"><path d="M-18 0 Q-22 -26 0 -30 Q22 -26 18 0 Q0 12 -18 0Z" fill="#c9a46a"/><path d="M-16 -22 q-16 -10 -18 -26 M16 -22 q16 -10 18 -26" fill="none" stroke-width="6"/><circle cx="-7" cy="-14" r="2.5" fill="${INK}"/><circle cx="7" cy="-14" r="2.5" fill="${INK}"/></g>`;
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${INK}" stroke-width="5" stroke-linejoin="round">
    <path d="M-60 0 L-80 120 M60 0 L80 120 M0 10 V120" stroke="#5a5e66" stroke-width="12"/>
    <path d="M-120 -100 Q-130 20 0 30 Q130 20 120 -100Z" fill="#b8843a"/>
    <ellipse cx="0" cy="-100" rx="120" ry="24" fill="#8a5a24"/>
    <path d="M-100 -60 Q0 -40 100 -60" fill="none" stroke="#e0b060" stroke-width="5" opacity=".7"/>
    ${bull(-90)}${bull(90)}
  </g>`;
}
function tumulus(x, y, w, h, c = '#9a9a5a') {
  return `<path d="M${x - w / 2} ${y} Q${x - w / 4} ${y - h * 1.02} ${x} ${y - h} Q${x + w / 4} ${y - h * 1.02} ${x + w / 2} ${y}Z" fill="${c}" stroke="${INK}" stroke-width="${S}"/>
    <path d="M${x - w / 3} ${y - h * 0.4} Q${x} ${y - h * 0.6} ${x + w / 3} ${y - h * 0.4}" fill="none" stroke="${shade(c, -0.2)}" stroke-width="4" opacity=".6"/>`;
}
function coin(x, y, r, c = '#e3c25a') {
  return `<g transform="translate(${x} ${y})" stroke="${INK}" stroke-width="4">
    <path d="M${-r} 0 Q${-r} ${-r * 0.95} 0 ${-r} Q${r * 1.05} ${-r * 0.9} ${r * 0.95} 0 Q${r} ${r} 0 ${r * 0.95} Q${-r * 1.05} ${r * 0.9} ${-r} 0Z" fill="${c}"/>
    <path d="M${-r * 0.5} ${-r * 0.1} q${r * 0.3} ${-r * 0.5} ${r * 0.7} ${-r * 0.2} l${r * 0.3} ${r * 0.1} l${-r * 0.3} ${r * 0.2} q${-r * 0.1} ${r * 0.3} ${-r * 0.5} ${r * 0.3} Z" fill="${shade(c, -0.25)}" stroke-width="3"/>
    <circle cx="${r * 0.1}" cy="${-r * 0.2}" r="${r * 0.08}" fill="${INK}" stroke="none"/>
  </g>`;
}

Object.assign(SCENES, {
  van_kale: () => `
    ${sky('#7aaed0', '#a8d0e4', '#e8eee6')}
    ${cloud(160, 150, 1, '#fbf8f0')}${cloud(820, 120, 1.2, '#fbf8f0')}
    <path d="M0 470 Q200 400 360 450 Q520 380 700 440 Q860 390 1000 430 L1000 520 L0 520Z" fill="#a89a8a" stroke="${INK}" stroke-width="${S}"/>
    ${haze(420, 520, '#e8eee6', 0.5)}
    ${sea(500, '#3fa8b8', '#1f6a80')}
    <path d="M220 640 L260 470 Q300 400 400 380 L700 360 Q800 360 820 420 L860 640Z" fill="#b8a07a" stroke="${INK}" stroke-width="${S}" stroke-linejoin="round"/>
    ${texture(280, 420, 820, 620, 30, '#9a8462', 51, 24)}
    ${wall(320, 330, 380, 60, '#c8b48e')}
    <g stroke="${INK}" stroke-width="${S}"><rect x="420" y="250" width="70" height="90" fill="#c8b48e"/><rect x="600" y="270" width="60" height="70" fill="#c8b48e"/>${[424, 450, 476, 604, 628].map((x) => `<rect x="${x}" y="${x < 500 ? 232 : 252}" width="14" height="20" fill="#c8b48e"/>`).join('')}</g>
    <rect x="300" y="470" width="120" height="70" fill="#a8906a" stroke="${INK}" stroke-width="4"/>
    ${[0, 1, 2, 3].map((i) => `<path d="M312 ${484 + i * 14} h${80 + (i % 2) * 14}" stroke="#6a5a42" stroke-width="4" stroke-dasharray="8 5"/>`).join('')}
    <path d="M-20 1000 L-20 720 Q200 680 400 720 Q600 760 800 700 Q920 680 1020 700 L1020 1000Z" fill="#8a9a5a" stroke="${INK}" stroke-width="${S}"/>
    ${npc(300, 960, 1.0, 501, 5)}${npc(700, 970, 0.95, 502, 5, { flip: true })}
    ${vignette(0.35)}`,

  kanal: () => `
    ${sky('#9ccbe0', '#c8e2ea', '#f0f0e0')}
    ${hill('M0 420 L160 300 L300 380 L460 280 L640 380 L820 300 L1000 360 L1000 560 L0 560Z', '#a8987a')}
    <path d="M300 300 l20 16 l20 -10 M460 280 l24 18 l20 -12" fill="none" stroke="#f4f4f0" stroke-width="10" stroke-linecap="round"/>
    ${haze(380, 560, '#f0f0e0', 0.5)}
    ${hill('M0 540 Q500 500 1000 540 L1000 1000 L0 1000Z', '#8aa45a')}
    ${[[90, 600], [200, 620], [800, 610], [910, 630], [140, 700], [860, 720]].map(([x, y], i) => `<g stroke="${INK}" stroke-width="4"><path d="M${x} ${y} v40" stroke="#6b4529" stroke-width="8"/><circle cx="${x}" cy="${y - 20}" r="${34 + (i % 2) * 8}" fill="${i % 2 ? '#5a8a3a' : '#6a9a42'}"/>${i % 3 === 0 ? `<circle cx="${x - 10}" cy="${y - 26}" r="6" fill="#c94a3a"/><circle cx="${x + 12}" cy="${y - 14}" r="6" fill="#c94a3a"/>` : ''}</g>`).join('')}
    <path d="M340 1000 L430 560 H570 L660 1000Z" fill="#9a907e" stroke="${INK}" stroke-width="${S}"/>
    <path d="M380 1000 L450 580 H550 L620 1000Z" fill="#4a9ab8" stroke="${INK}" stroke-width="4"/>
    ${[0, 1, 2, 3, 4].map((i) => `<path class="a-water" style="animation-delay:${i * 0.3}s" d="M${460 - i * 12} ${640 + i * 80} q${30 + i * 6} -8 ${60 + i * 14} 0" fill="none" stroke="#c8ecf4" stroke-width="5" stroke-linecap="round"/>`).join('')}
    ${[600, 700, 800, 900].map((y, i) => `<path d="M${420 - i * 22} ${y} h-20 M${580 + i * 22} ${y} h20" stroke="${INK}" stroke-width="4"/>`).join('')}
    ${npc(220, 980, 1.0, 511, 5)}
    ${vignette(0.3)}`,

  urartu_atolye: () => `
    ${interior('#6a5a4a', '#4a3e34', { beam: '#3a2e24' })}
    ${light(260, 620, 380, '#ff9a40', 0.55, 'a-glow')}
    <g stroke="${INK}" stroke-width="${S}"><path d="M140 760 V600 Q260 520 380 600 V760Z" fill="#5a4a3e"/><path d="M190 760 V650 Q260 600 330 650 V760Z" fill="#2a1a12"/></g>
    ${fire(260, 740, 0.9)}
    ${cauldron(640, 650, 1.05)}
    <g stroke="${INK}" stroke-width="${S}"><rect x="830" y="560" width="60" height="200" fill="#8a6440"/>${[580, 620, 660, 700].map((y) => `<path d="M836 ${y} h48" stroke="#c9a46a" stroke-width="8"/>`).join('')}</g>
    ${npc(420, 900, 1.1, 521, 5)}
    ${vignette(0.5)}`,

  urartu_ambar: () => `
    ${interior('#a88a62', '#7a6448', { beam: '#4a3a2a' })}
    ${light(500, 200, 500, '#ffe8b0', 0.35)}
    ${[150, 330, 510, 690, 870].map((x, i) => jar(x, 620 + (i % 2) * 10, 1.05, ['#b5653a', '#a8582e', '#c0703f'][i % 3])).join('')}
    ${[240, 420, 600, 780].map((x, i) => jar(x, 820, 1.25, ['#a8582e', '#b5653a'][i % 2])).join('')}
    ${npc(500, 1000, 1.05, 531, 5)}
    ${vignette(0.5)}`,

  gordion_tumulus: () => `
    ${sky('#9ec4d8', '#c8dce2', '#ece6d0')}
    ${cloud(260, 170, 1.3, '#fbf8f0')}${cloud(800, 140, 1, '#fbf8f0')}
    ${hill('M0 520 Q500 500 1000 520 L1000 1000 L0 1000Z', '#b8b06a')}
    ${haze(460, 560, '#ece6d0', 0.4)}
    ${tumulus(160, 540, 220, 70, '#a8a462')}${tumulus(850, 545, 260, 90, '#a8a462')}
    ${tumulus(500, 600, 560, 230, '#9a9a58')}
    ${[[330, 548], [400, 512], [600, 512], [670, 548]].map(([x, y]) => silhouette(x, y, 0.22, '#4a4a2a')).join('')}
    <path d="M-20 1000 L-20 760 Q300 720 600 760 Q800 790 1020 750 L1020 1000Z" fill="#a8a05a" stroke="${INK}" stroke-width="${S}"/>
    ${texture(0, 780, 1000, 1000, 50, '#8a8848', 53, 18)}
    ${npc(280, 980, 1, 541, 5)}${npc(720, 990, 1, 542, 5, { flip: true })}
    ${vignette(0.3)}`,

  gordion_soylen: () => `
    ${interior('#8a6a4a', '#5a4434', { beam: '#3a2a1e' })}
    ${light(500, 520, 520, '#ffb860', 0.45, 'a-glow')}
    ${cauldron(500, 600, 1.0)}
    ${fire(500, 720, 0.6)}
    <g stroke="${INK}" stroke-width="${S}"><path d="M60 780 H940 V820 H60Z" fill="#a8784a"/>${[120, 300, 700, 880].map((x) => `<path d="M${x} 820 v120" stroke-width="10" stroke="#6b4529"/>`).join('')}
    ${[160, 260, 380, 620, 740, 840].map((x) => `<path d="M${x - 34} 772 Q${x} 800 ${x + 34} 772Z" fill="#c9a04a"/><circle cx="${x}" cy="780" r="6" fill="#8a6a24"/>`).join('')}</g>
    <g stroke="#6a4a2a" stroke-width="4" fill="none" opacity=".5">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M${80 + i * 120} 200 l20 20 l20 -20 l20 20 l20 -20"/>`).join('')}</g>
    ${npc(180, 980, 1, 551, 5)}${npc(820, 990, 1, 552, 5, { flip: true })}
    ${vignette(0.5)}`,

  paktolos: () => `
    ${sky('#f0b880', '#f6d4a4', '#f4ead0')}
    <circle cx="240" cy="280" r="60" fill="#fff2c8" stroke="${INK}" stroke-width="${S}"/>${light(240, 280, 240, '#ffe0a0', 0.45)}
    ${hill('M0 460 L200 300 L360 380 L560 260 L760 380 L1000 320 L1000 600 L0 600Z', '#9a8a6a')}
    ${haze(400, 600, '#f4ead0', 0.5)}
    ${hill('M0 580 Q500 540 1000 580 L1000 1000 L0 1000Z', '#b8a46a')}
    <path d="M380 1000 Q440 800 480 700 Q520 620 560 580 H640 Q600 640 600 720 Q600 840 700 1000Z" fill="#7ab4c4" stroke="${INK}" stroke-width="${S}"/>
    ${(() => { let o = ''; const r = rnd(61); for (let i = 0; i < 40; i++) { const t = r(); const y = 600 + t * 400; const x = 520 + (1 - t) * 60 - t * 80 + r() * (60 + t * 160); o += `<circle class="a-glint" style="animation-delay:${(r() * 2).toFixed(2)}s" cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(2 + r() * 3).toFixed(1)}" fill="#ffe27a"/>`; } return o; })()}
    <g transform="translate(300 880) rotate(-8)" stroke="${INK}" stroke-width="4"><path d="M-70 -30 Q-80 30 -40 40 L60 36 Q90 0 70 -36 Q0 -50 -70 -30Z" fill="#e8dcc0"/>${[[-30, 0], [0, 10], [30, -6], [10, -20]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#ffd34d"/>`).join('')}</g>
    ${npc(820, 990, 1.05, 561, 5, { flip: true })}
    ${vignette(0.3)}`,

  sardes_pazar: () => `
    ${sky('#8cc0dc', '#b8d8e4', '#efe8d4')}
    ${hill('M0 420 L240 220 L400 300 L560 200 L780 320 L1000 260 L1000 560 L0 560Z', '#b09a7a')}
    <g stroke="${INK}" stroke-width="4">${[[520, 228, 60], [580, 236, 40]].map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="30" fill="#d8c8a8"/>`).join('')}</g>
    ${haze(380, 560, '#efe8d4', 0.45)}
    <path d="M0 560 H1000 V1000 H0Z" fill="#c8b08a" stroke="${INK}" stroke-width="${S}"/>
    ${texture(0, 600, 1000, 1000, 40, '#a8906a', 63, 22)}
    ${[[40, '#c94a3a'], [260, '#3a7aa8'], [700, '#d9a83a'], [880, '#5a8a3a']].map(([x, c]) => `<g stroke="${INK}" stroke-width="${S}" stroke-linejoin="round"><rect x="${x - 20}" y="420" width="200" height="200" fill="#d8c09a"/><path d="M${x - 40} 430 L${x + 200} 430 L${x + 180} 470 L${x - 20} 470Z" fill="${c}"/>${[0, 1, 2, 3, 4].map((i) => `<path d="M${x - 20 + i * 40} 430 l-6 40" stroke="${shade(c, 0.35)}" stroke-width="6"/>`).join('')}<rect x="${x + 20}" y="500" width="120" height="120" fill="#4a3426"/><path d="M${x + 24} 530 H${x + 136} M${x + 24} 570 H${x + 136}" stroke="#8a6440" stroke-width="5"/>${[0, 1, 2].map((i) => `<circle cx="${x + 46 + i * 36}" cy="518" r="9" fill="${['#e8c45a', '#c94a3a', '#e8dcc0'][i]}"/><rect x="${x + 36 + i * 36}" y="550" width="22" height="18" fill="${['#8a5a8a', '#3a7aa8', '#c8a050'][i]}"/>`).join('')}</g>`).join('')}
    ${npc(500, 820, 0.8, 571, 5)}${npc(300, 990, 1.05, 572, 5)}${npc(760, 1000, 1.05, 573, 5, { flip: true })}
    ${vignette(0.3)}`,

  darphane: () => `
    ${interior('#8a6e52', '#5a4838', { beam: '#3a2e22' })}
    ${light(250, 640, 360, '#ff9a40', 0.5, 'a-glow')}
    ${fire(240, 740, 0.7)}
    <g stroke="${INK}" stroke-width="${S}"><path d="M150 760 V640 H330 V760" fill="#5a4a3e"/></g>
    <g stroke="${INK}" stroke-width="${S}" transform="translate(600 700)"><path d="M-80 0 L-60 -90 H60 L80 0Z" fill="#6a5a4a"/><rect x="-90" y="-110" width="180" height="26" rx="6" fill="#8a8e96"/><rect x="-14" y="-170" width="28" height="64" fill="#5a5e66"/><rect x="-24" y="-186" width="48" height="20" fill="#8a8e96"/></g>
    ${coin(560, 600, 18)}${coin(680, 610, 18)}
    <g stroke="${INK}" stroke-width="${S}"><path d="M800 520 V420 M720 520 H880" stroke="#6b4529" stroke-width="8"/><path d="M720 520 Q720 560 700 560 H740 Q720 560 720 520 M880 520 Q880 560 860 560 H900 Q880 560 880 520" fill="#b08a3a"/><path d="M700 560 H740 M860 560 H900" stroke-width="6"/></g>
    ${npc(420, 960, 1.05, 581, 5)}
    ${vignette(0.5)}`,

  tutulma: () => `
    ${sky('#1a1e2e', '#2e3248', '#5a4a4a')}
    ${stars(40, 50, 420)}
    <circle cx="500" cy="260" r="150" fill="#fff6d0" opacity=".25"/>
    ${light(500, 260, 300, '#fff6d0', 0.55, 'a-glow')}
    <circle cx="500" cy="260" r="96" fill="#fffbe8"/>
    <circle cx="500" cy="260" r="90" fill="#0e101a" stroke="${INK}" stroke-width="4"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => { const a = i * Math.PI / 6; return `<path d="M${(500 + Math.cos(a) * 100).toFixed(0)} ${(260 + Math.sin(a) * 100).toFixed(0)} L${(500 + Math.cos(a) * (150 + (i % 2) * 40)).toFixed(0)} ${(260 + Math.sin(a) * (150 + (i % 2) * 40)).toFixed(0)}" stroke="#fff6d0" stroke-width="3" opacity=".5"/>`; }).join('')}
    ${hill('M0 560 Q500 520 1000 560 L1000 1000 L0 1000Z', '#3a3428')}
    <g opacity=".85">${[...Array(18)].map((_, i) => silhouette(40 + i * 54, 620 + (i % 3) * 8, 0.55, '#1a1814')).join('')}</g>
    <g stroke="#1a1814" stroke-width="5">${[...Array(18)].map((_, i) => `<path d="M${60 + i * 54} 640 L${66 + i * 54} 520"/>`).join('')}</g>
    ${hill('M0 820 Q500 780 1000 820 L1000 1000 L0 1000Z', '#2a2620')}
    ${vignette(0.6)}`,
});

Object.assign(FOCUS, {
  van_kale: [540, 440, 860], kanal: [500, 620, 820], urartu_atolye: [560, 620, 860], urartu_ambar: [500, 640, 860],
  gordion_tumulus: [500, 520, 820], gordion_soylen: [500, 640, 860], paktolos: [520, 620, 820], sardes_pazar: [500, 560, 820],
  darphane: [560, 620, 860], tutulma: [500, 380, 860],
});

Object.assign(SCENES, {
  tapinak_efes: () => `
    ${sky('#86c0de', '#b4d8e8', '#eef0e6')}
    ${cloud(180, 160, 1.1, '#fbf8f0')}${cloud(840, 130, 0.9, '#fbf8f0')}
    ${hill('M0 470 Q260 400 520 450 T1000 430 L1000 560 L0 560Z', '#9aa88a')}
    ${haze(420, 560, '#eef0e6', 0.5)}
    <path d="M0 540 H1000 V1000 H0Z" fill="#a8b07a" stroke="${INK}" stroke-width="${S}"/>
    <g stroke="${INK}" stroke-width="${S}" stroke-linejoin="round">
      <path d="M160 400 L500 250 L840 400Z" fill="#efe8d8"/><path d="M300 380 L500 296 L700 380" fill="none" stroke-width="3"/>
      <rect x="150" y="400" width="700" height="30" fill="#e2d8c4"/>
    </g>
    ${columns(170, 830, 680, 250, 8, '#efe8d8')}
    <path d="M120 680 H880 V720 H120Z M100 720 H900 V750 H100Z" fill="#d8ccb4" stroke="${INK}" stroke-width="${S}"/>
    ${npc(300, 990, 1.05, 591, 5)}${npc(720, 1000, 1, 592, 6, { flip: true })}
    ${vignette(0.3)}`,
});
Object.assign(FOCUS, { tapinak_efes: [500, 520, 860] });

// ---------- ÇAĞ 6: BERGAMA, EFES ----------
function shelves(x, y, w, h, rows, seed = 7) {
  const r = rnd(seed); let o = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#5a3e2a" stroke="${INK}" stroke-width="${S}"/>`;
  const rh = h / rows;
  for (let i = 0; i < rows; i++) {
    const yy = y + i * rh;
    o += `<path d="M${x} ${yy + rh} H${x + w}" stroke="${INK}" stroke-width="4"/>`;
    for (let k = 0; k < Math.floor(w / 26); k++) {
      const cx = x + 14 + k * 26 + r() * 4, cy = yy + rh - 14 - r() * 6;
      o += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="11" fill="${['#e8dcc0', '#d8c8a0', '#f2ead4'][k % 3]}" stroke="${INK}" stroke-width="2.5"/><circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="3" fill="#8a6a44"/>`;
    }
  }
  return o;
}
function statueW(x, y, s, c = '#efe8d8') {
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${INK}" stroke-width="4" stroke-linejoin="round">
    <path d="M-30 0 Q-36 -90 -22 -150 L22 -150 Q36 -90 30 0Z" fill="${c}"/>
    <path d="M-16 -140 Q-20 -80 -14 -6 M4 -140 Q0 -70 6 -6 M18 -130 Q24 -70 20 -6" fill="none" stroke="${shade(c, -0.25)}" stroke-width="3"/>
    <circle cx="0" cy="-168" r="18" fill="${c}"/><path d="M-18 -172 Q0 -196 18 -172" fill="${shade(c, -0.12)}"/>
    <path d="M22 -140 Q40 -110 30 -90" fill="none" stroke-width="8" stroke="${c}"/><path d="M22 -140 Q40 -110 30 -90" fill="none" stroke-width="2"/>
  </g>`;
}
function steepTheatre(cx, top, bottom, w1, w2, c = '#d8ccb4', rows = 14) {
  let o = `<path d="M${cx - w1} ${top} L${cx + w1} ${top} L${cx + w2} ${bottom} L${cx - w2} ${bottom}Z" fill="${c}" stroke="${INK}" stroke-width="${S}"/>`;
  for (let i = 1; i < rows; i++) {
    const t = i / rows, y = top + (bottom - top) * t, w = w1 + (w2 - w1) * t;
    o += `<path d="M${cx - w} ${y} Q${cx} ${y + 16 * (1 - t) + 6} ${cx + w} ${y}" fill="none" stroke="${shade(c, -0.3)}" stroke-width="3"/>`;
  }
  o += `<path d="M${cx} ${top} V${bottom} M${cx - w1 * 0.5} ${top} L${cx - w2 * 0.5} ${bottom} M${cx + w1 * 0.5} ${top} L${cx + w2 * 0.5} ${bottom}" stroke="${shade(c, -0.35)}" stroke-width="4"/>`;
  return o;
}

Object.assign(SCENES, {
  bergama_akropol: () => `
    ${sky('#82b8d8', '#b0d4e4', '#f0ece0')}
    ${cloud(200, 140, 1, '#fbf8f0')}${cloud(780, 110, 1.2, '#fbf8f0')}
    <path d="M-20 1000 L-20 520 L120 420 L300 260 L520 200 L740 280 L900 400 L1020 470 L1020 1000Z" fill="#a8987e" stroke="${INK}" stroke-width="${S}" stroke-linejoin="round"/>
    ${texture(60, 300, 960, 900, 40, '#8a7a62', 71, 26)}
    <g stroke="${INK}" stroke-width="${S}"><path d="M380 230 L520 170 L660 230Z" fill="#efe8d8"/><rect x="370" y="230" width="300" height="16" fill="#e2d8c4"/></g>
    ${columns(380, 660, 330, 84, 6, '#efe8d8')}
    <g stroke="${INK}" stroke-width="${S}"><path d="M700 330 H860 V300 H700Z" fill="#e2d8c4"/>${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${708 + i * 26} 300 v-30 h14 v30" fill="#efe8d8" stroke-width="3"/>`).join('')}</g>
    ${steepTheatre(330, 400, 820, 210, 90, '#d8ccb4', 16)}
    <path d="M200 820 H460 V860 H200Z" fill="#c8bca4" stroke="${INK}" stroke-width="${S}"/>
    ${hill('M-20 1000 L-20 880 Q300 850 600 880 Q800 900 1020 860 L1020 1000Z', '#8a9a62')}
    ${npc(720, 1000, 1.05, 601, 6, { flip: true })}
    ${vignette(0.3)}`,

  kutuphane: () => `
    ${interior('#d8c8a8', '#a8946e', { beam: '#6b4a30' })}
    ${light(500, 300, 520, '#fff2cc', 0.4)}
    ${shelves(30, 210, 300, 520, 5, 81)}${shelves(670, 210, 300, 520, 5, 82)}
    <g stroke="${INK}" stroke-width="${S}"><path d="M400 760 V250 Q500 170 600 250 V760Z" fill="#c8b48e"/></g>
    ${statueW(500, 700, 2.2)}
    <path d="M380 700 H620 V760 H380Z" fill="#b8a684" stroke="${INK}" stroke-width="${S}"/>
    ${npc(270, 960, 1.05, 611, 6)}
    ${vignette(0.45)}`,

  bergama_cadde: () => `
    ${sky('#8ac0dc', '#b4d6e4', '#f0ece0')}
    ${hill('M0 380 L300 240 L520 200 L740 260 L1000 340 L1000 560 L0 560Z', '#a8987e')}
    ${haze(320, 560, '#f0ece0', 0.45)}
    <path d="M0 560 H1000 V1000 H0Z" fill="#d8ccb4" stroke="${INK}" stroke-width="${S}"/>
    ${[600, 680, 780, 900].map((y) => `<path d="M0 ${y} H1000" stroke="#b8ac94" stroke-width="3"/>`).join('')}
    ${columns(0, 300, 620, 220, 3, '#efe8d8')}${columns(700, 1000, 620, 220, 3, '#efe8d8')}
    <path d="M-10 380 H310 V400 H-10Z M690 380 H1010 V400 H690Z" fill="#e2d8c4" stroke="${INK}" stroke-width="${S}"/>
    <g stroke="${INK}" stroke-width="${S}"><rect x="40" y="470" width="220" height="150" fill="#6a4a30"/>${shelves(50, 480, 200, 130, 3, 91)}</g>
    <g stroke="${INK}" stroke-width="${S}"><rect x="740" y="480" width="220" height="140" fill="#8a6440"/>${[0, 1, 2].map((i) => `<path d="M${770 + i * 64} 610 q-14 -60 0 -110 q14 50 0 110Z" fill="${['#c94a3a', '#3a7aa8', '#d9a83a'][i]}"/>`).join('')}</g>
    ${npc(500, 820, 0.8, 621, 6)}${npc(320, 1000, 1.05, 622, 6)}${npc(700, 1000, 1, 623, 6, { flip: true })}
    ${vignette(0.3)}`,

  parsomen: () => `
    ${sky('#a8c8d8', '#cfe0e4', '#f2eedc')}
    ${hill('M0 460 Q500 400 1000 460 L1000 1000 L0 1000Z', '#b8a678')}
    ${[[160, 420], [400, 400], [640, 410], [860, 430]].map(([x, y], i) => `<g stroke="${INK}" stroke-width="${S}" transform="translate(${x} ${y})"><rect x="-90" y="-110" width="180" height="220" fill="none" stroke="#6b4529" stroke-width="12"/><path d="M-70 -90 Q0 -100 70 -90 Q80 0 70 90 Q0 100 -70 90 Q-80 0 -70 -90Z" fill="${i % 2 ? '#f2e8d0' : '#e8dcc0'}" stroke-width="4"/>${[-90, -45, 0, 45, 90].map((k) => `<path d="M-90 ${k} L-70 ${k * 0.95} M90 ${k} L70 ${k * 0.95}" stroke="#8a6a44" stroke-width="3"/>`).join('')}<path d="M-90 110 L-100 190 M90 110 L100 190" stroke="#6b4529" stroke-width="10"/></g>`).join('')}
    <g stroke="${INK}" stroke-width="${S}" transform="translate(500 760)"><path d="M-160 -60 L-140 60 H140 L160 -60Z" fill="#8a6a4a"/><ellipse cx="0" cy="-60" rx="160" ry="26" fill="#e8ecee"/><path d="M-120 -64 q40 -10 80 0 t80 0" fill="none" stroke="#c8d0d4" stroke-width="5"/></g>
    ${npc(820, 990, 1.05, 631, 6, { flip: true })}
    ${vignette(0.3)}`,

  asklepion: () => `
    ${sky('#9cc6dc', '#c4dde6', '#f2eee2')}
    ${cloud(300, 140, 1, '#fbf8f0')}
    ${hill('M0 420 Q500 340 1000 420 L1000 600 L0 600Z', '#9aa882')}
    <path d="M0 560 H1000 V1000 H0Z" fill="#d8ccb4" stroke="${INK}" stroke-width="${S}"/>
    ${(() => { let o = ''; for (let i = 0; i < 7; i++) { const t = i / 6, x = 60 + t * 300, h = 360 - t * 200, y = 900 - t * 330; o += columns(x - 30, x + 30, y, h, 1, '#efe8d8'); const x2 = 940 - t * 300; o += columns(x2 - 30, x2 + 30, y, h, 1, '#efe8d8'); } return o; })()}
    <g stroke="${INK}" stroke-width="${S}" transform="translate(500 760)"><ellipse cx="0" cy="0" rx="150" ry="40" fill="#5aa8c4"/><ellipse cx="0" cy="-6" rx="130" ry="28" fill="#7ac4d8" stroke-width="3"/>${[-60, 0, 60].map((x) => `<path class="a-ripple" d="M${x - 24} -6 q12 -6 24 0 t24 0" fill="none" stroke="#e8f8fc" stroke-width="3"/>`).join('')}</g>
    <g stroke="${INK}" stroke-width="5" transform="translate(500 560)"><path d="M0 -150 V140" stroke="#8a6440" stroke-width="12"/><path d="M0 120 Q-34 100 0 70 Q34 40 0 10 Q-34 -20 0 -50 Q30 -76 6 -110" fill="none" stroke="#5a7a3a" stroke-width="12"/><circle cx="6" cy="-114" r="10" fill="#5a7a3a"/></g>
    ${npc(220, 1000, 1, 641, 6)}${npc(800, 1000, 1, 642, 6, { flip: true })}
    ${vignette(0.3)}`,

  efes_cadde: () => `
    ${sky('#7eb6d8', '#acd2e4', '#f0ece2')}
    ${hill('M0 420 Q240 320 480 380 Q700 300 1000 380 L1000 560 L0 560Z', '#9aa882')}
    ${haze(360, 560, '#f0ece2', 0.45)}
    <path d="M0 540 H1000 V1000 H0Z" fill="#e2d8c4" stroke="${INK}" stroke-width="${S}"/>
    <path d="M380 540 L80 1000 H920 L620 540Z" fill="#efe6d4" stroke="${INK}" stroke-width="4"/>
    ${[600, 680, 780, 900].map((y, i) => `<path d="M${380 - (y - 540) * 0.65} ${y} H${620 + (y - 540) * 0.65}" stroke="#c8bca4" stroke-width="3"/>`).join('')}
    ${(() => { let o = ''; for (let i = 0; i < 6; i++) { const t = i / 5, xl = 40 + t * 300, xr = 960 - t * 300, y = 880 - t * 320, h = 300 - t * 170, w = 34 - t * 18; o += columns(xl - w, xl + w, y, h, 1, '#efe8d8') + columns(xr - w, xr + w, y, h, 1, '#efe8d8'); } return o; })()}
    <g stroke="${INK}" stroke-width="${S}"><rect x="430" y="400" width="140" height="150" fill="#efe8d8"/>${[450, 480, 510, 540].map((x) => `<path d="M${x} 420 V540" stroke-width="3"/>`).join('')}<path d="M420 400 H580 L560 380 H440Z" fill="#e2d8c4"/></g>
    ${npc(500, 700, 0.6, 651, 6)}${npc(300, 1000, 1.05, 652, 6)}${npc(720, 1000, 1, 653, 6, { flip: true })}
    ${vignette(0.3)}`,

  celsus: () => `
    ${sky('#f2b07a', '#f6cfa0', '#f6e8cc')}
    <path d="M0 0 H1000 V1000 H0Z" fill="none"/>
    <g stroke="${INK}" stroke-width="${S}">
      <rect x="140" y="200" width="720" height="560" fill="#e8dcc4"/>
      <path d="M120 200 H880 V170 H120Z M120 480 H880 V450 H120Z" fill="#efe6d4"/>
      ${[0, 1, 2].map((i) => `<path d="M${240 + i * 260} 760 V610 Q${300 + i * 260} 560 ${360 + i * 260} 610 V760Z" fill="#3a2a22"/>`).join('')}
      ${[0, 1, 2, 3].map((i) => `<rect x="${196 + i * 200}" y="${520}" width="70" height="${110}" fill="#d8ccb4"/>`).join('')}
      <path d="M280 170 L360 120 L440 170Z M560 170 L640 120 L720 170Z" fill="#efe6d4"/>
      <path d="M440 450 Q500 400 560 450Z" fill="#efe6d4"/>
    </g>
    ${columns(150, 850, 760, 270, 8, '#f2ead8', { cap: true })}
    ${columns(200, 800, 450, 240, 6, '#f2ead8', { cap: true })}
    ${[0, 1, 2, 3].map((i) => statueW(231 + i * 200, 625, 0.55, '#f8f2e4')).join('')}
    <path d="M100 760 H900 V800 H100Z M80 800 H920 V840 H80Z M60 840 H940 V880 H60Z" fill="#d8ccb4" stroke="${INK}" stroke-width="${S}"/>
    <path d="M0 880 H1000 V1000 H0Z" fill="#e2d8c4" stroke="${INK}" stroke-width="${S}"/>
    ${light(500, 300, 520, '#ffd8a0', 0.35)}
    ${npc(300, 1000, 0.95, 661, 6)}${npc(700, 1000, 1, 662, 6, { flip: true })}
    ${vignette(0.35)}`,

  efes_tiyatro: () => `
    ${sky('#9ac2d8', '#c2dbe4', '#f2ece0')}
    ${hill('M-20 1000 L-20 260 Q500 140 1020 260 L1020 1000Z', '#a8987e')}
    <path d="M60 300 Q500 160 940 300 L860 760 Q500 700 140 760Z" fill="#d8ccb4" stroke="${INK}" stroke-width="${S}"/>
    ${[...Array(12)].map((_, i) => { const t = (i + 1) / 13; const y1 = 300 - 140 * (1 - Math.abs(0.5 - 0.5) * 2) * 0; const xa = 60 + 80 * t, xb = 940 - 80 * t, ya = 300 + 460 * t, ym = 160 + 540 * t; return `<path d="M${xa} ${ya} Q500 ${ym} ${xb} ${ya}" fill="none" stroke="#b0a48c" stroke-width="4"/>`; }).join('')}
    ${[0.25, 0.5, 0.75].map((f) => `<path d="M${60 + 880 * f} ${300 - (f === 0.5 ? 140 : 70)} L${140 + 720 * f} 760" stroke="#9a8e76" stroke-width="5"/>`).join('')}
    <path d="M100 760 H900 V830 H100Z" fill="#c8bca4" stroke="${INK}" stroke-width="${S}"/>
    ${columns(160, 840, 900, 120, 10, '#efe8d8', { cap: false })}
    <path d="M140 770 H860 V780 H140Z" fill="#b8ac94"/>
    <g opacity=".7">${(() => { let o = ''; const r = rnd(97); for (let i = 0; i < 70; i++) { const t = r(); const ya = 300 + 440 * t; const xa = 80 + 70 * t + r() * (840 - 140 * t); o += `<circle cx="${xa.toFixed(0)}" cy="${(ya - 10 + r() * 6).toFixed(0)}" r="7" fill="${['#c94a3a', '#3a7aa8', '#e8dcc0', '#d9a83a', '#5a8a3a'][i % 5]}" stroke="${INK}" stroke-width="2"/>`; } return o; })()}</g>
    ${npc(500, 1000, 1.05, 671, 6)}
    ${vignette(0.3)}`,

  arena: () => `
    ${sky('#e8b078', '#f2cc98', '#f4e2c0')}
    <path d="M-20 520 Q500 360 1020 520 L1020 620 Q500 470 -20 620Z" fill="#c8b48e" stroke="${INK}" stroke-width="${S}"/>
    <g opacity=".75">${(() => { let o = ''; const r = rnd(101); for (let i = 0; i < 60; i++) { const x = r() * 1000; const y = 520 - 160 * (1 - Math.pow((x - 500) / 520, 2)) + r() * 60; o += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="7" fill="${['#c94a3a', '#3a7aa8', '#e8dcc0', '#d9a83a'][i % 4]}" stroke="${INK}" stroke-width="2"/>`; } return o; })()}</g>
    <path d="M-20 600 Q500 460 1020 600 L1020 640 Q500 500 -20 640Z" fill="#8a6a4a" stroke="${INK}" stroke-width="${S}"/>
    <path d="M-20 640 Q500 500 1020 640 L1020 1000 L-20 1000Z" fill="#e2c890" stroke="${INK}" stroke-width="${S}"/>
    ${texture(0, 660, 1000, 1000, 50, '#c8ac74', 103, 14)}
    <g transform="translate(${narrowView() ? viewBand().x + viewBand().w * 0.3 : 360} 780) scale(${narrowView() ? 0.8 : 1})" stroke="${INK}" stroke-width="5"><path d="M-40 -120 Q-60 -40 -40 20 H40 Q60 -40 40 -120Z" fill="#a83a2a"/><rect x="-70" y="-110" width="50" height="100" rx="10" fill="#d9a83a"/><path d="M40 -100 L110 -170" stroke="#c8ccd4" stroke-width="10"/><circle cx="0" cy="-150" r="30" fill="#8a8e96"/><path d="M-20 -160 h40 M-20 -148 h40" stroke-width="3"/></g>
    <g transform="translate(${narrowView() ? viewBand().x + viewBand().w * 0.7 : 640} 790) scale(${narrowView() ? -0.8 : -1} ${narrowView() ? 0.8 : 1})" stroke="${INK}" stroke-width="5"><path d="M-40 -120 Q-60 -40 -40 20 H40 Q60 -40 40 -120Z" fill="#3a5a8a"/><path d="M-80 -60 L-20 -60 L-30 -10Z" fill="#8a8e96"/><path d="M40 -100 L100 -190 M86 -200 l14 10 l10 -14" stroke="#9a9ea6" stroke-width="8" fill="none"/><circle cx="0" cy="-150" r="28" fill="#e0b088"/></g>
    ${vignette(0.4)}`,
});
Object.assign(FOCUS, {
  bergama_akropol: [460, 400, 860], kutuphane: [500, 480, 860], bergama_cadde: [500, 600, 820], parsomen: [500, 520, 860],
  asklepion: [500, 600, 820], efes_cadde: [500, 560, 820], celsus: [500, 480, 900], efes_tiyatro: [500, 500, 860], arena: [500, 640, 820],
});

Object.assign(SCENES, {
  amasya: () => `
    ${sky('#8cc0d8', '#b6d6e2', '#eef0e2')}
    ${cloud(780, 140, 1.1, '#fbf8f0')}
    <path d="M-20 640 L-20 160 Q120 100 260 160 L420 120 Q600 80 760 150 L1020 120 L1020 640Z" fill="#a8987a" stroke="${INK}" stroke-width="${S}" stroke-linejoin="round"/>
    ${texture(20, 200, 980, 600, 40, '#8a7a5e', 111, 26)}
    ${[[240, 300], [480, 260], [720, 300]].map(([x, y]) => `<g stroke="${INK}" stroke-width="${S}"><path d="M${x - 80} ${y + 160} V${y} H${x + 80} V${y + 160}" fill="#8a7a5e"/><path d="M${x - 60} ${y + 150} V${y + 50} L${x} ${y + 10} L${x + 60} ${y + 50} V${y + 150}Z" fill="#c8b896"/><rect x="${x - 26}" y="${y + 80}" width="52" height="70" fill="#3a2a22"/><path d="M${x - 64} ${y + 52} L${x} ${y + 6} L${x + 64} ${y + 52}" fill="none" stroke-width="3"/></g>`).join('')}
    <path d="M-20 640 H1020 V700 H-20Z" fill="#7a8a5a" stroke="${INK}" stroke-width="${S}"/>
    ${[60, 180, 300, 620, 760, 900].map((x, i) => house2(x, 610 - (i % 2) * 20, 110, 90 + (i % 2) * 20, ['#e8dcc0', '#d8c8a0', '#f2e8d4'][i % 3], { win: true })).join('')}
    <path d="M-20 720 H1020 V880 H-20Z" fill="#4a9a8a" stroke="${INK}" stroke-width="${S}"/>
    ${[0, 1, 2].map((i) => `<path class="a-ripple" style="animation-delay:${i * 0.5}s" d="M${100 + i * 280} ${770 + i * 30} q40 -10 80 0 t80 0" fill="none" stroke="#bfe8de" stroke-width="5" stroke-linecap="round"/>`).join('')}
    <path d="M-20 880 H1020 V1000 H-20Z" fill="#8aa45a" stroke="${INK}" stroke-width="${S}"/>
    ${npc(640, 1000, 0.9, 681, 6, { flip: true })}
    ${vignette(0.3)}`,
});
Object.assign(FOCUS, { amasya: [480, 450, 860] });

// ---------- ÇAĞ 7: KONSTANTİNOPOLİS ----------
function arches(x0, x1, y, h, n, c = '#d8c8a8') {
  const w = (x1 - x0) / n; let o = `<rect x="${x0}" y="${y - h}" width="${x1 - x0}" height="${h}" fill="${c}" stroke="${INK}" stroke-width="${S}"/>`;
  for (let i = 0; i < n; i++) { const ax = x0 + i * w; o += `<path d="M${ax + w * 0.15} ${y} V${y - h * 0.55} Q${ax + w / 2} ${y - h * 0.95} ${ax + w * 0.85} ${y - h * 0.55} V${y}Z" fill="${shade(c, -0.45)}" stroke="${INK}" stroke-width="4"/>`; }
  for (let r = 1; r < 4; r++) o += `<path d="M${x0} ${y - h + r * h / 4} H${x1}" stroke="#b8684a" stroke-width="5" opacity=".55"/>`;
  return o;
}
function domeBig(cx, y, r, c = '#8a9aa8') {
  return `<g stroke="${INK}" stroke-width="${S}">
    <rect x="${cx - r - 10}" y="${y}" width="${2 * r + 20}" height="${r * 0.35}" fill="${shade(c, 0.1)}"/>
    ${[...Array(10)].map((_, i) => `<rect x="${cx - r + 6 + i * (2 * r - 12) / 10}" y="${y + 8}" width="${(2 * r - 12) / 10 - 8}" height="${r * 0.2}" fill="#3a4a5a" stroke-width="2"/>`).join('')}
    <path d="M${cx - r} ${y} Q${cx - r} ${y - r * 0.75} ${cx} ${y - r * 0.78} Q${cx + r} ${y - r * 0.75} ${cx + r} ${y}Z" fill="${c}"/>
    ${[-0.7, -0.35, 0, 0.35, 0.7].map((f) => `<path d="M${cx + r * f} ${y} Q${cx + r * f * 0.7} ${y - r * 0.6} ${cx} ${y - r * 0.78}" fill="none" stroke-width="2.5" opacity=".5"/>`).join('')}
  </g>`;
}

Object.assign(SCENES, {
  mese: () => `
    ${sky('#8ab8d6', '#b6d2e0', '#efe8dc')}
    ${cloud(220, 140, 1, '#fbf8f0')}${cloud(820, 170, 0.9, '#fbf8f0')}
    ${domeBig(500, 380, 120, '#9aa8b4')}
    <path d="M0 520 H1000 V1000 H0Z" fill="#cfc4ae" stroke="${INK}" stroke-width="${S}"/>
    <path d="M400 520 L120 1000 H880 L600 520Z" fill="#ddd2bc" stroke="${INK}" stroke-width="4"/>
    ${[580, 660, 760, 880].map((y) => `<path d="M${400 - (y - 520) * 0.58} ${y} H${600 + (y - 520) * 0.58}" stroke="#bcb09a" stroke-width="3"/>`).join('')}
    ${arches(-20, 360, 700, 280, 3, '#d8c8a8')}${arches(640, 1020, 700, 280, 3, '#d8c8a8')}
    <path d="M-20 410 H360 L380 380 H-20Z M640 410 H1020 V380 H620Z" fill="#b8684a" stroke="${INK}" stroke-width="${S}"/>
    ${[40, 160, 280].map((x, i) => `<rect x="${x}" y="600" width="60" height="70" fill="${['#c94a3a', '#3a7aa8', '#d9a83a'][i]}" stroke="${INK}" stroke-width="3"/>`).join('')}
    ${npc(500, 760, 0.7, 701, 7)}${npc(260, 1000, 1.05, 702, 7)}${npc(760, 1000, 1.05, 703, 7, { flip: true })}
    ${vignette(0.3)}`,

  hipodrom: () => `
    ${sky('#86b6d6', '#b4d2e2', '#eee6d6')}
    <path d="M-20 300 Q500 220 1020 300 L1020 520 Q500 440 -20 520Z" fill="#c8b896" stroke="${INK}" stroke-width="${S}"/>
    ${[0, 1, 2, 3, 4].map((i) => `<path d="M-20 ${330 + i * 38} Q500 ${250 + i * 38} 1020 ${330 + i * 38}" fill="none" stroke="#a8987a" stroke-width="3"/>`).join('')}
    <g opacity=".75">${(() => { let o = ''; const r = rnd(711); for (let i = 0; i < 70; i++) { const x = r() * 1000, t = r(); const y = 300 + t * 200 - 80 * (1 - Math.pow((x - 500) / 520, 2)); o += `<circle cx="${x.toFixed(0)}" cy="${(y + 14).toFixed(0)}" r="7" fill="${i % 2 ? '#3a6ab8' : '#3a9a4a'}" stroke="${INK}" stroke-width="2"/>`; } return o; })()}</g>
    <g stroke="${INK}" stroke-width="${S}"><rect x="420" y="300" width="160" height="90" fill="#c8a07a"/><path d="M410 300 H590 L570 280 H430Z" fill="#7a3a5a"/></g>
    <path d="M-20 500 Q500 430 1020 500 L1020 1000 L-20 1000Z" fill="#d8b884" stroke="${INK}" stroke-width="${S}"/>
    <path d="M-20 720 Q500 640 1020 720 L1020 760 Q500 680 -20 760Z" fill="#b8a07a" stroke="${INK}" stroke-width="${S}"/>
    <g stroke="${INK}" stroke-width="${S}"><path d="M480 700 L490 400 L500 380 L510 400 L520 700Z" fill="#c8a8a0"/><rect x="460" y="700" width="80" height="40" fill="#b8a890"/>${[440, 480, 520, 560, 600, 640].map((y) => `<path d="M494 ${y} h12" stroke-width="2"/>`).join('')}</g>
    <g class="a-run">${horse(220, 880, 0.6, '#5a3a22')}${horse(260, 900, 0.6, '#8a5a34')}<path d="M80 880 l60 -10 l10 40 h-70Z" fill="#3a6ab8" stroke="${INK}" stroke-width="4"/><circle cx="110" cy="905" r="30" fill="none" stroke="${INK}" stroke-width="6"/></g>
    ${texture(0, 780, 1000, 1000, 40, '#b89a6a', 713, 16)}
    ${vignette(0.3)}`,

  saray_biz: () => `
    ${interior('#5a2a4a', '#8a7a68', { beam: '#3a1a2e' })}
    <path d="M0 150 H1000 V420 H0Z" fill="#c9a23a" opacity=".85"/>
    ${(() => { let o = ''; const r = rnd(721); for (let i = 0; i < 160; i++) o += `<rect x="${(r() * 1000).toFixed(0)}" y="${(160 + r() * 250).toFixed(0)}" width="10" height="10" fill="${['#e8c45a', '#f6dc8a', '#b08a2a'][i % 3]}"/>`; return o; })()}
    <g stroke="${INK}" stroke-width="4">${[250, 500, 750].map((x) => `<circle cx="${x}" cy="270" r="70" fill="#f2e2b8"/><circle cx="${x}" cy="270" r="54" fill="none" stroke="#c9a23a" stroke-width="10"/><circle cx="${x}" cy="262" r="26" fill="#e0b088"/><path d="M${x - 30} 320 Q${x} 290 ${x + 30} 320" fill="#7a3a5a"/>`).join('')}</g>
    ${[120, 880].map((x) => `<g stroke="${INK}" stroke-width="${S}"><rect x="${x - 30}" y="420" width="60" height="340" fill="#7a3a5a"/><rect x="${x - 44}" y="410" width="88" height="20" fill="#c9a23a"/></g>`).join('')}
    ${[...Array(8)].map((_, i) => `<path d="M${i * 130} 780 l65 40 l-65 40 l-65 -40Z" fill="${i % 2 ? '#a89a88' : '#7a6a58'}" stroke="${INK}" stroke-width="3"/>`).join('')}
    ${npc(300, 990, 1.05, 731, 7)}${npc(700, 990, 1.05, 732, 7, { flip: true })}
    ${vignette(0.45)}`,

  yangin_sehir: () => `
    ${sky('#3a1a1a', '#8a3a1a', '#e87a2a')}
    ${light(500, 600, 700, '#ff8a2a', 0.5, 'a-glow')}
    <g fill="#2a1a1a" opacity=".6">${[0, 1, 2, 3, 4].map((i) => `<path class="a-smoke" style="animation-delay:${i * 0.6}s" d="M${150 + i * 180} 500 q-40 -100 10 -200 q50 -100 0 -200" stroke="#3a2a2a" stroke-width="60" fill="none" stroke-linecap="round"/>`).join('')}</g>
    ${domeBig(500, 480, 140, '#5a4a4a')}
    <path d="M360 480 Q400 360 500 380 Q560 330 640 480" fill="none" stroke="#ffb040" stroke-width="10" class="a-flame"/>
    ${(() => {
      const V = viewBand(), n = narrowView();
      const blocks = n
        ? [[V.x - 30, 600, V.w * 0.34, 160, 0.62], [V.x + V.w * 0.68, 590, V.w * 0.36, 170, 0.62]]
        : [[80, 560, 160, 200, 0.9], [260, 600, 140, 160, 0.9], [700, 580, 160, 190, 0.9], [860, 600, 160, 160, 0.9]];
      return blocks.map(([x, y, w, h, fs]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#2a1a16" stroke="${INK}" stroke-width="${S}"/>${fire(x + w / 2, y + 20, fs)}`).join('');
    })()}
    <path d="M-20 760 H1020 V1000 H-20Z" fill="#3a2a22" stroke="${INK}" stroke-width="${S}"/>
    <g opacity=".85">${[...Array(10)].map((_, i) => silhouette(80 + i * 95, 860 + (i % 2) * 14, 0.6, '#1a1210')).join('')}</g>
    ${vignette(0.6)}`,

  ayasofya_insa: () => `
    ${sky('#a8c6d8', '#cadbe2', '#f0e8d8')}
    <g stroke="${INK}" stroke-width="${S}">
      <rect x="180" y="420" width="640" height="440" fill="#c88a5a"/>
      ${[...Array(16)].map((_, i) => `<path d="M180 ${440 + i * 26} H820" stroke="#e8c4a0" stroke-width="3"/>`).join('')}
      <path d="M280 420 Q500 160 720 420Z" fill="none" stroke="#c88a5a" stroke-width="40"/>
      <path d="M280 420 Q500 160 720 420" fill="none" stroke-width="${S}"/>
      <path d="M240 420 Q500 120 760 420" fill="none" stroke-width="${S}"/>
    </g>
    <g stroke="#6b4529" stroke-width="8">${[220, 320, 420, 580, 680, 780].map((x) => `<path d="M${x} 860 V${x < 500 ? 300 + (x - 220) * 0.2 : 300 + (780 - x) * 0.2}"/>`).join('')}${[400, 500, 600, 700, 800].map((y) => `<path d="M200 ${y} H800"/>`).join('')}</g>
    <g stroke="#6b4529" stroke-width="5">${[0, 1, 2, 3].map((i) => `<path d="M${220 + i * 100} ${500 + i * 100} L${320 + i * 100} ${400 + i * 100}"/>`).join('')}</g>
    <path d="M-20 860 H1020 V1000 H-20Z" fill="#b8a07a" stroke="${INK}" stroke-width="${S}"/>
    ${[...Array(6)].map((_, i) => silhouette(260 + i * 90, 395 - (i % 2) * 100, 0.3, '#3a2a22')).join('')}
    ${npc(820, 1000, 1, 741, 7, { flip: true })}
    ${vignette(0.3)}`,

  ayasofya: () => `
    <rect width="1000" height="1000" fill="#3a2a2a"/>
    <path d="M100 1000 V420 Q100 60 500 40 Q900 60 900 420 V1000Z" fill="#c9a23a" stroke="${INK}" stroke-width="${S}"/>
    ${(() => { let o = ''; const r = rnd(751); for (let i = 0; i < 220; i++) { const x = 120 + r() * 760, y = 60 + r() * 360; o += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="9" height="9" fill="${['#e8c45a', '#f6dc8a', '#b08a2a'][i % 3]}"/>`; } return o; })()}
    <path d="M220 440 Q220 140 500 120 Q780 140 780 440Z" fill="#e8c45a" stroke="${INK}" stroke-width="${S}"/>
    ${[...Array(20)].map((_, i) => { const a = Math.PI + (i + 0.5) * Math.PI / 20; return `<rect x="${(500 + Math.cos(a) * 270 - 9).toFixed(0)}" y="${(440 + Math.sin(a) * 300 - 14).toFixed(0)}" width="18" height="28" rx="8" fill="#fff6d8" stroke="${INK}" stroke-width="3"/>`; }).join('')}
    <circle cx="500" cy="220" r="60" fill="#f6dc8a" stroke="${INK}" stroke-width="4"/><path d="M470 220 h60 M500 190 v60" stroke="#b08a2a" stroke-width="8"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${300 + i * 80} 200 L${200 + i * 120} 1000" stroke="#fff6d8" stroke-width="${28 - i * 2}" opacity=".12"/>`).join('')}
    <g stroke="${INK}" stroke-width="${S}">${[160, 330, 670, 840].map((x) => `<rect x="${x - 34}" y="520" width="68" height="400" fill="${x < 300 || x > 700 ? '#6a8a6a' : '#7a3a5a'}"/><rect x="${x - 48}" y="500" width="96" height="26" fill="#efe8d8"/>`).join('')}</g>
    <path d="M100 640 H900 V660 H100Z" fill="#efe8d8" stroke="${INK}" stroke-width="4"/>
    <path d="M0 920 H1000 V1000 H0Z" fill="#8a8a7a" stroke="${INK}" stroke-width="${S}"/>
    ${light(500, 420, 520, '#fff2c8', 0.4)}
    ${vignette(0.5)}`,

  sarnic: () => `
    <rect width="1000" height="1000" fill="#1a1a1e"/>
    ${light(500, 500, 600, '#ffb060', 0.35, 'a-glow')}
    ${(() => { let o = ''; for (let row = 0; row < 4; row++) { const t = row / 3, y = 760 - t * 260, h = 520 - t * 280, w = 46 - t * 26, gap = 260 - t * 120, n = Math.ceil(1000 / gap) + 1; for (let i = 0; i < n; i++) { const x = (i * gap + (row % 2) * gap / 2) - 20; o += `<g stroke="${INK}" stroke-width="${4 - t * 2}" opacity="${1 - t * 0.55}"><rect x="${x - w / 2}" y="${y - h}" width="${w}" height="${h}" fill="${shade('#b89a7a', -t * 0.5)}"/><path d="M${x - w / 2 - 6} ${y - h} Q${x} ${y - h - 60 + t * 30} ${x + gap - w / 2 + 6} ${y - h}" fill="none" stroke="${shade('#a8786a', -t * 0.5)}" stroke-width="${12 - t * 6}"/></g>`; } } return o; })()}
    <path d="M0 760 H1000 V1000 H0Z" fill="#1e3a44" opacity=".9" stroke="${INK}" stroke-width="${S}"/>
    ${[0, 1, 2].map((i) => `<path class="a-ripple" style="animation-delay:${i * 0.6}s" d="M${120 + i * 280} ${820 + i * 50} q30 -8 60 0 t60 0" fill="none" stroke="#6ab4c4" stroke-width="4"/>`).join('')}
    <g transform="translate(700 770) rotate(180)" stroke="${INK}" stroke-width="4"><circle cx="0" cy="0" r="50" fill="#8a7a6a"/><circle cx="-16" cy="-6" r="6" fill="${INK}"/><circle cx="16" cy="-6" r="6" fill="${INK}"/>${[...Array(8)].map((_, i) => { const a = i * Math.PI / 4; return `<path d="M${(Math.cos(a) * 48).toFixed(0)} ${(Math.sin(a) * 48).toFixed(0)} q${(Math.cos(a + 0.6) * 20).toFixed(0)} ${(Math.sin(a + 0.6) * 20).toFixed(0)} ${(Math.cos(a) * 30).toFixed(0)} ${(Math.sin(a) * 30).toFixed(0)}" fill="none" stroke="#5a7a3a" stroke-width="7"/>`; }).join('')}</g>
    ${vignette(0.7)}`,

  veba: () => `
    ${sky('#4a4a52', '#6a6a70', '#8a8478')}
    ${[[0, 300, 220, 500], [200, 340, 180, 460], [620, 320, 200, 480], [800, 280, 220, 520]].map(([x, y, w, h]) => `<g stroke="${INK}" stroke-width="${S}"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#7a6e62"/><rect x="${x + w * 0.3}" y="${y + h - 140}" width="${w * 0.4}" height="140" fill="#2a2420"/><path d="M${x + w * 0.3} ${y + h - 140} l${w * 0.4} 140 M${x + w * 0.7} ${y + h - 140} l${-w * 0.4} 140" stroke="#c94a3a" stroke-width="6"/></g>`).join('')}
    <path d="M-20 780 H1020 V1000 H-20Z" fill="#5a5048" stroke="${INK}" stroke-width="${S}"/>
    <g transform="translate(500 820)" stroke="${INK}" stroke-width="${S}"><path d="M-160 -60 H160 L140 20 H-140Z" fill="#6b4529"/><circle cx="-100" cy="40" r="40" fill="none" stroke-width="8"/><circle cx="100" cy="40" r="40" fill="none" stroke-width="8"/>${[-110, -40, 30, 100].map((x) => `<path d="M${x - 30} -60 Q${x} -90 ${x + 30} -60Z" fill="#d8ccb4"/>`).join('')}</g>
    ${silhouette(220, 880, 0.9, '#2a2420')}
    <g opacity=".15">${[...Array(30)].map((_, i) => `<circle cx="${(i * 37) % 1000}" cy="${400 + (i * 53) % 400}" r="${20 + (i % 3) * 10}" fill="#c8c0b0"/>`).join('')}</g>
    ${vignette(0.7)}`,
});
Object.assign(FOCUS, {
  mese: [500, 560, 860], hipodrom: [500, 560, 820], saray_biz: [500, 440, 860], yangin_sehir: [500, 520, 860],
  ayasofya_insa: [500, 520, 900], ayasofya: [500, 420, 900], sarnic: [600, 600, 860], veba: [500, 600, 820],
});

// ---------- ÇAĞ 8: SELÇUKLU ----------
function camel(x, y, s, c = '#c8a06a', flip = false, load = true) {
  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})" stroke="${INK}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
    <path d="M-70 0 l-6 80 M-44 4 l2 78 M50 4 l-4 78 M74 0 l6 78" fill="none" stroke-width="9"/>
    <path d="M-100 -10 Q-110 -60 -60 -70 Q-40 -130 0 -110 Q30 -140 60 -90 Q90 -80 100 -40 L130 -110 Q140 -140 170 -130 Q186 -122 176 -110 L160 -100 Q140 -40 110 0 Q80 14 -80 12 Q-100 8 -100 -10Z" fill="${c}"/>
    <circle cx="164" cy="-122" r="3" fill="${INK}" stroke="none"/>
    ${load ? `<path d="M-60 -100 Q0 -150 60 -100 L70 -60 H-70Z" fill="#a8342a"/><path d="M-60 -80 H60" stroke="#e8c45a" stroke-width="5"/>${[-40, -10, 20, 50].map((xx) => `<path d="M${xx} -60 v14" stroke="#e8c45a" stroke-width="4"/>`).join('')}` : ''}
  </g>`;
}
function selcukStar(cx, cy, r, c = '#d8c8a8') {
  let p = '';
  for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8; const rr = i % 2 ? r * 0.55 : r; p += `${i ? 'L' : 'M'}${(cx + Math.cos(a) * rr).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)} `; }
  return `<path d="${p}Z" fill="${c}" stroke="${INK}" stroke-width="3"/><circle cx="${cx}" cy="${cy}" r="${r * 0.3}" fill="${shade(c, -0.2)}" stroke="${INK}" stroke-width="2"/>`;
}
function portal(cx, y, w, h, c = '#d8c8a8') {
  let o = `<rect x="${cx - w / 2}" y="${y - h}" width="${w}" height="${h}" fill="${c}" stroke="${INK}" stroke-width="${S}"/>`;
  o += `<rect x="${cx - w / 2 + 20}" y="${y - h + 20}" width="${w - 40}" height="${h - 20}" fill="none" stroke="${shade(c, -0.3)}" stroke-width="10"/>`;
  o += `<path d="M${cx - w * 0.3} ${y} V${y - h * 0.62} Q${cx} ${y - h * 0.86} ${cx + w * 0.3} ${y - h * 0.62} V${y}Z" fill="${shade(c, -0.15)}" stroke="${INK}" stroke-width="4"/>`;
  for (let r = 0; r < 4; r++) for (let k = 0; k <= r + 2; k++) { const xx = cx - w * 0.22 + (k / (r + 2)) * w * 0.44; o += `<path d="M${xx - 10} ${y - h * 0.62 + r * 22} q10 -16 20 0" fill="none" stroke="${shade(c, -0.4)}" stroke-width="3"/>`; }
  o += `<path d="M${cx - w * 0.16} ${y} V${y - h * 0.36} Q${cx} ${y - h * 0.46} ${cx + w * 0.16} ${y - h * 0.36} V${y}Z" fill="#2a2018" stroke="${INK}" stroke-width="4"/>`;
  o += selcukStar(cx - w * 0.38, y - h * 0.5, w * 0.06, shade(c, -0.08)) + selcukStar(cx + w * 0.38, y - h * 0.5, w * 0.06, shade(c, -0.08));
  return o;
}

Object.assign(SCENES, {
  kayseri_carsi: () => `
    ${sky('#8cbcd8', '#b8d4e0', '#efe6d4')}
    ${erciyes('#8a90a8', '#f6f3ee', 500, 1.1)}
    ${haze(380, 520, '#efe6d4', 0.5)}
    <g stroke="${INK}" stroke-width="${S}"><rect x="140" y="320" width="34" height="200" fill="#c88a5a"/><path d="M134 320 h46 l-23 -40Z" fill="#3a8a8a"/><rect x="820" y="340" width="30" height="180" fill="#c88a5a"/><path d="M814 340 h42 l-21 -36Z" fill="#3a8a8a"/></g>
    ${dome(320, 500, 70, '#a8a8a0')}${dome(700, 500, 60, '#a8a8a0')}
    <path d="M0 520 H1000 V1000 H0Z" fill="#c8b896" stroke="${INK}" stroke-width="${S}"/>
    ${[[30, '#c94a3a'], [250, '#3a8a8a'], [690, '#d9a83a'], [880, '#6a4a8a']].map(([x, c]) => `<g stroke="${INK}" stroke-width="${S}"><rect x="${x - 20}" y="520" width="200" height="180" fill="#d8c8a8"/><path d="M${x - 20} 520 Q${x + 80} 470 ${x + 180} 520" fill="#c8b896"/><rect x="${x + 10}" y="580" width="140" height="120" fill="#4a3426"/><path d="M${x - 30} 580 L${x + 190} 580 L${x + 170} 610 L${x - 10} 610Z" fill="${c}"/>${[0, 1, 2].map((i) => `<rect x="${x + 22 + i * 44}" y="640" width="32" height="40" fill="${['#a8784a', '#e8dcc0', '#c94a3a'][i]}"/>`).join('')}</g>`).join('')}
    ${npc(500, 800, 0.75, 801, 8)}${npc(300, 1000, 1.05, 802, 8)}${npc(720, 1000, 1.05, 803, 8, { flip: true })}
    ${vignette(0.3)}`,

  debbag: () => `
    ${sky('#a8c8d8', '#cadde2', '#f0e8d8')}
    ${hill('M0 420 Q500 360 1000 420 L1000 560 L0 560Z', '#a8987a')}
    <path d="M0 540 H1000 V1000 H0Z" fill="#b8a684" stroke="${INK}" stroke-width="${S}"/>
    <g stroke="#6b4529" stroke-width="8">${[100, 400, 700].map((x) => `<path d="M${x} 560 V320 M${x + 220} 560 V320 M${x - 10} 330 H${x + 230}"/>`).join('')}</g>
    ${[120, 180, 240, 420, 480, 540, 720, 780, 840].map((x, i) => `<path d="M${x - 24} 332 Q${x - 30} 420 ${x - 20} 470 Q${x} 490 ${x + 20} 470 Q${x + 30} 420 ${x + 24} 332Z" fill="${['#c89a6a', '#a8784a', '#e0c49a'][i % 3]}" stroke="${INK}" stroke-width="4"/>`).join('')}
    ${[[200, 720, '#e8ecee'], [500, 760, '#8a6a3a'], [800, 720, '#a8342a']].map(([x, y, c]) => `<g stroke="${INK}" stroke-width="${S}"><ellipse cx="${x}" cy="${y}" rx="130" ry="40" fill="#8a7a62"/><ellipse cx="${x}" cy="${y - 6}" rx="110" ry="30" fill="${c}"/></g>`).join('')}
    ${npc(500, 1000, 1.05, 811, 8)}
    ${vignette(0.3)}`,

  sifahane: () => `
    ${sky('#8cbcd8', '#b6d2de', '#efe6d4')}
    <path d="M0 0 H1000 V1000 H0Z" fill="none"/>
    <rect x="60" y="260" width="880" height="560" fill="#d8c8a8" stroke="${INK}" stroke-width="${S}"/>
    ${[...Array(12)].map((_, i) => `<path d="M60 ${300 + i * 44} H940" stroke="#b8a888" stroke-width="3"/>`).join('')}
    ${portal(500, 820, 360, 520, '#e0d0b0')}
    <g stroke="${INK}" stroke-width="${S}"><path d="M880 260 V140 L920 100 L960 140 V260" fill="#c8b896"/><path d="M880 140 L920 60 L960 140Z" fill="#8a7a6a"/></g>
    <path d="M0 820 H1000 V1000 H0Z" fill="#b8a888" stroke="${INK}" stroke-width="${S}"/>
    ${npc(220, 1000, 1, 821, 8)}${npc(780, 1000, 1, 822, 8, { flip: true })}
    ${vignette(0.3)}`,

  bozkir_yol: () => `
    ${sky('#f0b878', '#f4d4a0', '#f2e6c8')}
    <circle cx="760" cy="300" r="60" fill="#fff0c0" stroke="${INK}" stroke-width="${S}"/>${light(760, 300, 240, '#ffe0a0', 0.45)}
    ${hill('M0 500 Q250 460 500 490 T1000 480 L1000 1000 L0 1000Z', '#c8b06a')}
    ${haze(440, 560, '#f2e6c8', 0.5)}
    <path d="M488 500 Q470 720 320 1000 H680 Q540 720 512 500Z" fill="#d8c08a" stroke="${INK}" stroke-width="4"/>
    <g class="a-run">${camel(260, 640, 0.75, '#c8a06a')}${camel(480, 600, 0.55, '#b8905a')}${camel(640, 575, 0.42, '#c8a06a', false, true)}</g>
    ${texture(0, 700, 1000, 1000, 50, '#a8904a', 831, 16)}
    ${npc(820, 1000, 1.05, 832, 8, { flip: true })}
    ${vignette(0.3)}`,

  ahi_zaviye: () => `
    ${interior('#e0d0b0', '#a8342a', { beam: '#6b4529', window: true })}
    ${[...Array(8)].map((_, i) => `<path d="M${i * 130} 800 l30 -16 l30 16 l-30 16Z" fill="#e8c45a" stroke="${INK}" stroke-width="2"/>`).join('')}
    <path d="M0 860 H1000" stroke="#e8c45a" stroke-width="10"/>
    ${selcukStar(500, 300, 80, '#3a8a8a')}
    <g stroke="${INK}" stroke-width="${S}"><path d="M300 700 Q500 660 700 700 L680 760 Q500 730 320 760Z" fill="#e8dcc0"/>${[360, 440, 560, 640].map((x) => `<ellipse cx="${x}" cy="712" rx="26" ry="10" fill="#c8a06a"/>`).join('')}</g>
    ${npc(220, 900, 1, 841, 8)}${npc(500, 880, 1, 842, 8)}${npc(780, 900, 1, 843, 8, { flip: true })}
    ${vignette(0.45)}`,

  kervansaray: () => `
    ${sky('#8cbcd8', '#b8d6e2', '#f0e6d0')}
    ${cloud(160, 140, 1, '#fbf8f0')}
    ${hill('M0 560 Q500 520 1000 560 L1000 1000 L0 1000Z', '#c8b06a')}
    <rect x="40" y="340" width="920" height="300" fill="#d8c09a" stroke="${INK}" stroke-width="${S}"/>
    ${[100, 300, 700, 900].map((x) => `<path d="M${x - 30} 640 V320 H${x + 30} V640" fill="#cbb48c" stroke="${INK}" stroke-width="${S}"/>`).join('')}
    ${portal(500, 640, 300, 400, '#e0caa0')}
    <g class="a-bob">${camel(820, 760, 0.6, '#c8a06a', true)}</g>
    ${npc(220, 1000, 1, 851, 8)}
    ${vignette(0.3)}`,

  kervansaray_ic: () => `
    ${sky('#2a3456', '#4a4a6a', '#8a6a6a')}
    ${stars(30, 861, 300)}
    <path d="M0 380 H1000 V1000 H0Z" fill="#c8b490" stroke="${INK}" stroke-width="${S}"/>
    ${[...Array(7)].map((_, i) => `<path d="M${20 + i * 140} 600 V470 Q${90 + i * 140} 400 ${160 + i * 140} 470 V600Z" fill="#3a2a22" stroke="${INK}" stroke-width="4"/>`).join('')}
    <path d="M0 600 H1000 V1000 H0Z" fill="#b8a07a" stroke="${INK}" stroke-width="${S}"/>
    <g stroke="${INK}" stroke-width="${S}" transform="translate(500 760)"><path d="M-90 0 V-90 Q0 -130 90 -90 V0" fill="#d8c8a8"/>${[-70, 70].map((x) => `<path d="M${x - 14} 0 V-80 M${x + 14} 0 V-80" stroke-width="6"/>`).join('')}<path d="M-120 -100 H120 V-140 H-120Z" fill="#e0d0b0"/><path d="M-100 -140 Q0 -220 100 -140" fill="#c8b896"/></g>
    ${fire(240, 820, 0.6)}
    ${camel(820, 860, 0.55, '#b8905a', true, false)}
    ${npc(160, 1000, 1, 862, 8)}
    ${vignette(0.45)}`,

  kosedag: () => `
    ${sky('#6a7a8a', '#9aa0a0', '#c8c0a8')}
    ${hill('M0 440 L200 300 L360 380 L520 280 L700 360 L860 300 L1000 360 L1000 600 L0 600Z', '#7a8a6a')}
    ${haze(380, 600, '#c8c0a8', 0.5)}
    ${hill('M0 580 Q500 540 1000 580 L1000 1000 L0 1000Z', '#9a9a6a')}
    <g opacity=".85">${[...Array(16)].map((_, i) => `<g transform="translate(${80 + i * 56} ${430 + (i % 3) * 10})">${horse(0, 0, 0.18, '#3a2a22')}</g>`).join('')}</g>
    ${[0, 1, 2, 3].map((i) => puff(180 + i * 220, 470, 60 + i * 8, '#d8d0c0', 'a-dust', i * 0.4, 0.7)).join('')}
    ${[...Array(10)].map((_, i) => silhouette(80 + i * 95, 760 + (i % 2) * 20, 0.6, '#3a3428', true)).join('')}
    <g stroke="#3a3428" stroke-width="6">${[...Array(10)].map((_, i) => `<path d="M${100 + i * 95} 780 L${110 + i * 95} 640"/>`).join('')}</g>
    ${vignette(0.5)}`,

  cacabey: () => `
    <rect width="1000" height="1000" fill="#1e2a3a"/>
    <path d="M60 1000 V380 Q60 120 500 100 Q940 120 940 380 V1000Z" fill="#c8b896" stroke="${INK}" stroke-width="${S}"/>
    ${[...Array(9)].map((_, i) => `<path d="M${150 + i * 90} 140 Q500 ${280 + Math.abs(4 - i) * 10} ${500} 340" fill="none" stroke="#a8987a" stroke-width="3"/>`).join('')}
    <ellipse cx="500" cy="240" rx="120" ry="70" fill="#1a2240" stroke="${INK}" stroke-width="${S}"/>
    ${stars(14, 871, 300).replace(/cy="(\d+)/g, (m, y) => `cy="${180 + (+y % 110)}`).replace(/cx="(\d+)/g, (m, x) => `cx="${400 + (+x % 200)}`)}
    ${[180, 820].map((x) => `<g stroke="${INK}" stroke-width="${S}"><rect x="${x - 40}" y="420" width="80" height="420" fill="#b8a888"/><path d="M${x - 40} 420 Q${x} 380 ${x + 40} 420" fill="#d8c8a8"/></g>`).join('')}
    <ellipse cx="500" cy="860" rx="220" ry="60" fill="#2a4a6a" stroke="${INK}" stroke-width="${S}"/>
    <ellipse cx="500" cy="852" rx="190" ry="44" fill="#1a2a4a"/>
    ${[...Array(12)].map((_, i) => `<circle class="a-twinkle" style="animation-delay:${i * 0.3}s" cx="${360 + (i * 47) % 280}" cy="${830 + (i * 13) % 40}" r="3" fill="#fff6d0"/>`).join('')}
    ${light(500, 240, 300, '#a8c8ff', 0.25)}
    ${npc(260, 1000, 1, 881, 8)}
    ${vignette(0.5)}`,
});
Object.assign(FOCUS, {
  kayseri_carsi: [500, 480, 860], debbag: [500, 560, 820], sifahane: [500, 560, 900], bozkir_yol: [460, 600, 820],
  ahi_zaviye: [500, 560, 860], kervansaray: [500, 500, 860], kervansaray_ic: [500, 680, 820], kosedag: [500, 540, 820], cacabey: [500, 380, 900],
});

// ---------- ÇAĞ 9: LALE DEVRİ İSTANBUL ----------
function tulip(x, y, s, c = '#c9243a') {
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${INK}" stroke-width="3" stroke-linejoin="round">
    <path d="M0 0 V-60" stroke="#3a7a3a" stroke-width="5"/><path d="M0 -20 Q-20 -30 -22 -50 Q-6 -40 0 -26Z" fill="#4a8a3a"/>
    <path d="M-12 -60 Q-16 -90 -8 -104 L-2 -84 L0 -110 L4 -84 L10 -104 Q16 -90 12 -60 Q0 -54 -12 -60Z" fill="${c}"/>
  </g>`;
}
function woodHouse(x, y, w, h, c = '#a8784a', { cumba = true, burning = false, fireScale = 1.1 } = {}) {
  let o = `<g stroke="${INK}" stroke-width="${S}" stroke-linejoin="round">
    <rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${c}"/>
    ${[...Array(Math.floor(h / 24))].map((_, i) => `<path d="M${x} ${y - h + 24 * (i + 1)} H${x + w}" stroke="${shade(c, -0.3)}" stroke-width="2.5"/>`).join('')}
    <path d="M${x - 16} ${y - h} L${x + w / 2} ${y - h - 50} L${x + w + 16} ${y - h}Z" fill="#8a3a2a"/>`;
  if (cumba) o += `<rect x="${x + w * 0.2}" y="${y - h + 30}" width="${w * 0.6}" height="${h * 0.38}" fill="${shade(c, 0.12)}"/>${[0, 1, 2].map((i) => `<rect x="${x + w * 0.26 + i * w * 0.18}" y="${y - h + 44}" width="${w * 0.12}" height="${h * 0.22}" fill="#3a2a22"/>`).join('')}`;
  o += `<rect x="${x + w * 0.38}" y="${y - h * 0.32}" width="${w * 0.24}" height="${h * 0.32}" fill="#3a2a22"/></g>`;
  if (burning) o += fire(x + w / 2, y - h - 10, fireScale);
  return o;
}
function minaret(x, y, h, c = '#e8e0d0') {
  return `<g stroke="${INK}" stroke-width="4"><rect x="${x - 9}" y="${y - h}" width="18" height="${h}" fill="${c}"/><rect x="${x - 14}" y="${y - h * 0.7}" width="28" height="8" fill="${c}"/><path d="M${x - 9} ${y - h} L${x} ${y - h - 40} L${x + 9} ${y - h}Z" fill="#6a7a8a"/></g>`;
}
function mosque(cx, y, r, c = '#e8e0d0') {
  return `${dome(cx, y, r, '#8a9aa8')}${dome(cx - r * 1.1, y + r * 0.3, r * 0.45, '#8a9aa8')}${dome(cx + r * 1.1, y + r * 0.3, r * 0.45, '#8a9aa8')}<rect x="${cx - r * 1.6}" y="${y + 18}" width="${r * 3.2}" height="${r * 0.6}" fill="${c}" stroke="${INK}" stroke-width="4"/>${minaret(cx - r * 1.9, y + r * 0.78, r * 2.2)}${minaret(cx + r * 1.9, y + r * 0.78, r * 2.2)}`;
}

Object.assign(SCENES, {
  sadabad: () => `
    ${sky('#8cc0dc', '#b8d8e4', '#f2ead8')}
    ${cloud(220, 130, 1, '#fbf8f0')}
    ${hill('M0 420 Q250 360 500 400 T1000 380 L1000 560 L0 560Z', '#8aa86a')}
    <g opacity=".7">${mosque(260, 380, 40)}${mosque(760, 390, 34)}</g>
    ${haze(360, 520, '#f2ead8', 0.45)}
    <path d="M0 520 H1000 V1000 H0Z" fill="#7aa85a" stroke="${INK}" stroke-width="${S}"/>
    <path d="M380 520 L260 1000 H740 L620 520Z" fill="#6ab4d0" stroke="${INK}" stroke-width="${S}"/>
    ${[0, 1, 2, 3].map((i) => `<path class="a-ripple" style="animation-delay:${i * 0.4}s" d="M${440 - i * 30} ${600 + i * 90} q30 -8 60 0 t60 0" fill="none" stroke="#d8f0f8" stroke-width="4"/>`).join('')}
    ${[[80, 480], [780, 470]].map(([x, y]) => `<g stroke="${INK}" stroke-width="${S}"><rect x="${x}" y="${y}" width="160" height="110" fill="#f6f0e4"/><path d="M${x - 20} ${y} L${x + 80} ${y - 50} L${x + 180} ${y}Z" fill="#b84a3a"/>${[0, 1, 2].map((i) => `<path d="M${x + 20 + i * 46} ${y + 110} V${y + 40} Q${x + 40 + i * 46} ${y + 20} ${x + 60 + i * 46} ${y + 40} V${y + 110}" fill="#8ac0d8" stroke-width="3"/>`).join('')}</g>`).join('')}
    <g stroke="${INK}" stroke-width="${S}"><rect x="410" y="420" width="180" height="100" fill="#f6f0e4"/><path d="M390 420 L500 370 L610 420Z" fill="#b84a3a"/>${[0, 1, 2].map((i) => `<path d="M${430 + i * 50} 520 V460 Q${450 + i * 50} 440 ${470 + i * 50} 460 V520" fill="#8ac0d8" stroke-width="3"/>`).join('')}<circle cx="500" cy="356" r="10" fill="#e8c45a"/></g>
    ${[[60, 760], [140, 820], [220, 760], [100, 900], [200, 940], [800, 760], [880, 820], [940, 760], [820, 920], [920, 960], [330, 640], [360, 720], [300, 800], [670, 640], [640, 720], [700, 800]].map(([x, y], i) => tulip(x, y, 1, ['#c9243a', '#e8b030', '#f2f2f2', '#a83a8a'][i % 4])).join('')}
    ${npc(820, 1000, 0.95, 901, 9, { flip: true })}
    ${vignette(0.3)}`,

  kahvehane: () => `
    ${interior('#d8c4a0', '#8a6a4a', { beam: '#5a3a24', window: true })}
    <g stroke="${INK}" stroke-width="${S}"><path d="M0 640 H1000 V700 H0Z" fill="#a8342a"/>${[...Array(10)].map((_, i) => `<path d="M${i * 100 + 20} 652 l30 18 l30 -18" fill="none" stroke="#e8c45a" stroke-width="4"/>`).join('')}</g>
    ${fire(780, 560, 0.5)}
    <g stroke="${INK}" stroke-width="4" transform="translate(780 520)"><path d="M-20 0 Q-30 -40 0 -50 Q30 -40 20 0Z" fill="#b08a3a"/><path d="M20 -30 Q50 -40 46 -70" fill="none" stroke-width="6"/></g>
    ${[300, 440, 560].map((x) => `<g stroke="${INK}" stroke-width="3"><path d="M${x - 14} 640 l4 -24 h20 l4 24Z" fill="#f2ead8"/></g>`).join('')}
    ${light(780, 480, 300, '#ffb060', 0.35, 'a-glow')}
    ${npc(200, 960, 1, 911, 9)}${npc(500, 940, 0.95, 912, 9)}${npc(820, 970, 1, 913, 9, { flip: true })}
    ${vignette(0.45)}`,

  hattat: () => `
    ${interior('#e8dcc0', '#a8342a', { beam: '#6b4529', window: true })}
    <g stroke="${INK}" stroke-width="${S}"><path d="M240 760 L300 620 H760 L820 760Z" fill="#8a5a34"/><rect x="380" y="560" width="300" height="70" fill="#f6eed8"/>
      <path d="M400 600 q30 -30 60 0 t60 -10 q20 -30 50 0 q30 20 60 -6" fill="none" stroke="#2a1a12" stroke-width="5"/></g>
    <g stroke="${INK}" stroke-width="3">${[[700, 600, '#2a1a12'], [730, 604, '#a8342a']].map(([x, y, c]) => `<ellipse cx="${x}" cy="${y}" rx="14" ry="8" fill="${c}"/>`).join('')}</g>
    <g stroke="${INK}" stroke-width="4">${[0, 1, 2, 3].map((i) => `<rect x="${640 + i * 70}" y="200" width="56" height="80" fill="#f6eed8"/><path d="M${652 + i * 70} 240 q10 -14 20 0 t20 0" fill="none" stroke="#2a1a12" stroke-width="3"/>`).join('')}</g>
    ${npc(530, 960, 1.05, 921, 9)}
    ${vignette(0.45)}`,

  lale_gece: () => `
    ${sky('#141a34', '#2a2a4a', '#4a3a4a')}
    ${stars(30, 931, 360)}
    <path d="M0 520 H1000 V1000 H0Z" fill="#2a3a2a" stroke="${INK}" stroke-width="${S}"/>
    ${[[120, 260], [880, 240]].map(([x, y]) => `<g stroke="${INK}" stroke-width="${S}"><path d="M${x} 560 V${y + 80}" stroke="#3a2a1a" stroke-width="16"/><circle cx="${x}" cy="${y}" r="110" fill="#1e2e1e"/></g>`).join('')}
    ${[[120, 300], [60, 340], [180, 330], [880, 280], [820, 330], [940, 320], [300, 220], [500, 200], [700, 220]].map(([x, y], i) => `<g><path d="M${x} ${y - 30} V${y - 10}" stroke="${INK}" stroke-width="2"/><rect x="${x - 10}" y="${y - 10}" width="20" height="28" rx="6" fill="#ffd98a" stroke="${INK}" stroke-width="3"/>${light(x, y, 50, '#ffd98a', 0.6, 'a-glow')}</g>`).join('')}
    <path d="M200 400 Q500 360 800 400" fill="none" stroke="${INK}" stroke-width="2"/>
    ${[[160, 760], [240, 820], [340, 760], [660, 760], [760, 820], [840, 760], [200, 920], [800, 920]].map(([x, y], i) => tulip(x, y, 1, ['#c9243a', '#e8b030', '#f2f2f2', '#a83a8a'][i % 4])).join('')}
    ${[[420, 860], [580, 880], [300, 900], [700, 900]].map(([x, y]) => `<g transform="translate(${x} ${y})" stroke="${INK}" stroke-width="3"><ellipse cx="0" cy="0" rx="34" ry="20" fill="#5a6a3a"/><path d="M-20 -6 l10 -8 l10 8 l10 -8 l10 8" fill="none" stroke="#3a4a2a" stroke-width="2"/><circle cx="36" cy="4" r="9" fill="#6a7a4a"/><rect x="-5" y="-40" width="10" height="22" fill="#f6f0e0"/><path class="a-flame" d="M0 -52 q6 6 0 12 q-6 -6 0 -12Z" fill="#ffb040"/>${light(0, -44, 40, '#ffd070', 0.7, 'a-glow')}</g>`).join('')}
    ${npc(860, 1000, 1, 932, 9, { flip: true })}
    ${vignette(0.5)}`,

  ahsap_mahalle: () => `
    ${sky('#9cc6dc', '#c4dce4', '#f0e8d8')}
    <g opacity=".7">${mosque(500, 300, 50)}</g>
    ${woodHouse(-20, 760, 220, 380, '#a8784a')}${woodHouse(190, 760, 200, 330, '#c8a070')}${woodHouse(610, 760, 200, 340, '#b88a5a')}${woodHouse(800, 760, 230, 390, '#9a6a42')}
    <path d="M0 760 H1000 V1000 H0Z" fill="#a8a094" stroke="${INK}" stroke-width="${S}"/>
    ${texture(0, 780, 1000, 1000, 40, '#8a8478', 941, 20)}
    ${npc(420, 960, 0.95, 941, 9)}${npc(600, 980, 1, 942, 9, { flip: true })}
    ${vignette(0.3)}`,

  ahsap_yangin: () => `
    ${sky('#3a1a14', '#8a3a1a', '#e8803a')}
    ${light(500, 500, 700, '#ff8a2a', 0.45, 'a-glow')}
    <g fill="none" stroke="#2a1a1a" opacity=".55">${[0, 1, 2].map((i) => `<path class="a-smoke" style="animation-delay:${i * 0.6}s" d="M${200 + i * 300} 380 q-40 -100 10 -200 q50 -100 0 -200" stroke-width="70" stroke-linecap="round"/>`).join('')}</g>
    ${narrowView()
      ? (() => { const V = viewBand(); return `${woodHouse(V.x + V.w / 2 - 90, 760, 180, 260, '#6a4a2a')}${woodHouse(V.x - 70, 760, 200, 300, '#5a3a24', { burning: true, fireScale: 0.8 })}${woodHouse(V.x + V.w - 130, 760, 200, 280, '#4a2a1a', { burning: true, fireScale: 0.8 })}`; })()
      : `${woodHouse(-20, 760, 220, 380, '#5a3a24', { burning: true })}${woodHouse(190, 760, 200, 330, '#6a4a2a')}${woodHouse(610, 760, 200, 340, '#5a3a24', { burning: true })}${woodHouse(800, 760, 230, 390, '#4a2a1a', { burning: true })}`}
    <path d="M0 760 H1000 V1000 H0Z" fill="#4a3a30" stroke="${INK}" stroke-width="${S}"/>
    <g transform="translate(470 880)" stroke="${INK}" stroke-width="${S}"><rect x="-80" y="-60" width="160" height="70" fill="#a8342a"/><path d="M-60 -60 V-90 H60 V-60" fill="none" stroke-width="6"/><path d="M80 -40 L200 -40 L240 -120" fill="none" stroke="#3a3a3a" stroke-width="12"/><path d="M240 -120 q20 -60 -10 -140" fill="none" stroke="#9ad0f0" stroke-width="10" opacity=".8"/><circle cx="-50" cy="20" r="22" fill="#5a3a24"/><circle cx="50" cy="20" r="22" fill="#5a3a24"/></g>
    ${[...Array(6)].map((_, i) => silhouette(100 + i * 160, 960 - (i % 2) * 20, 0.6, '#1a1210')).join('')}
    ${vignette(0.55)}`,

  matbaa: () => `
    ${interior('#c8b08a', '#7a5a3a', { beam: '#4a3220', window: true })}
    <g stroke="${INK}" stroke-width="${S}" transform="translate(620 760)">
      <path d="M-140 0 V-420 M140 0 V-420" stroke="#6b4529" stroke-width="30"/><rect x="-170" y="-450" width="340" height="50" fill="#6b4529"/>
      <rect x="-170" y="-260" width="340" height="40" fill="#6b4529"/><path d="M0 -400 V-300" stroke="#5a5e66" stroke-width="24"/><rect x="-90" y="-300" width="180" height="30" fill="#8a8e96"/>
      <path d="M0 -360 L200 -400" stroke="#6b4529" stroke-width="16"/><circle cx="200" cy="-400" r="14" fill="#6b4529"/>
      <rect x="-200" y="-220" width="400" height="30" fill="#a8784a"/><rect x="-120" y="-232" width="240" height="14" fill="#f6eed8"/>
    </g>
    <g stroke="${INK}" stroke-width="4"><rect x="40" y="420" width="260" height="200" fill="#8a5a34"/>${[...Array(5)].map((_, r) => [...Array(7)].map((__, c) => `<rect x="${50 + c * 36}" y="${430 + r * 38}" width="30" height="30" fill="#5a3a24"/><circle cx="${65 + c * 36}" cy="${450 + r * 38}" r="5" fill="#9aa0a8" stroke-width="1"/>`).join('')).join('')}</g>
    <g stroke="${INK}" stroke-width="3">${[0, 1, 2].map((i) => `<path d="M${320 + i * 60} 200 V260" stroke-width="2"/><rect x="${300 + i * 60}" y="260" width="44" height="60" fill="#f6eed8"/>`).join('')}</g>
    ${npc(260, 980, 1.05, 951, 9)}
    ${vignette(0.45)}`,

  halic: () => `
    ${sky('#f0a878', '#f6c89a', '#f6e4c8')}
    <circle cx="200" cy="300" r="56" fill="#fff0c0" stroke="${INK}" stroke-width="${S}"/>${light(200, 300, 260, '#ffe0a0', 0.4)}
    ${hill('M0 460 Q300 380 600 420 T1000 400 L1000 560 L0 560Z', '#9a8a7a')}
    ${mosque(400, 380, 56)}${mosque(760, 400, 40)}
    ${haze(380, 560, '#f6e4c8', 0.4)}
    ${sea(540, '#5a8ab0', '#2a4a6a')}
    ${[[200, 720], [620, 680], [820, 800]].map(([x, y], i) => `<g class="a-bob" style="animation-delay:${i * 0.5}s" stroke="${INK}" stroke-width="4"><path d="M${x - 80} ${y} Q${x} ${y + 30} ${x + 80} ${y} L${x + 100} ${y - 20} L${x - 100} ${y - 20}Z" fill="#8a5a34"/><path d="M${x - 60} ${y - 20} L${x - 90} ${y + 40} M${x + 60} ${y - 20} L${x + 90} ${y + 40}" stroke-width="5"/></g>`).join('')}
    ${npc(820, 1000, 1, 961, 9, { flip: true })}
    ${vignette(0.3)}`,
});
Object.assign(FOCUS, {
  sadabad: [500, 560, 860], kahvehane: [500, 560, 860], hattat: [520, 560, 860], lale_gece: [500, 640, 820],
  ahsap_mahalle: [500, 520, 860], ahsap_yangin: [500, 600, 860], matbaa: [560, 520, 860], halic: [480, 520, 860],
});

// ---------- ÇAĞ 10: MAKİNE DEVRİ ----------
function chimney(x, y, h, w = 40, smoke = true) {
  return `${smoke ? `<g fill="none" stroke="#3a3a3e" opacity=".55">${[0, 1].map((i) => `<path class="a-smoke" style="animation-delay:${i * 0.9}s" d="M${x} ${y - h} q-30 -80 20 -160 q50 -80 -10 -180" stroke-width="${40 + i * 20}" stroke-linecap="round"/>`).join('')}</g>` : ''}
    <path d="M${x - w / 2} ${y} L${x - w / 2 + 6} ${y - h} H${x + w / 2 - 6} L${x + w / 2} ${y}Z" fill="#a8583a" stroke="${INK}" stroke-width="${S}"/>
    ${[...Array(Math.floor(h / 30))].map((_, i) => `<path d="M${x - w / 2 + 4} ${y - 30 * (i + 1)} H${x + w / 2 - 4}" stroke="#7a3a2a" stroke-width="2.5"/>`).join('')}
    <rect x="${x - w / 2 - 6}" y="${y - h - 14}" width="${w + 12}" height="16" fill="#7a3a2a" stroke="${INK}" stroke-width="4"/>`;
}
function factory(x, y, w, h, c = '#b8846a') {
  const n = Math.floor(w / 70);
  return `<g stroke="${INK}" stroke-width="${S}"><rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${c}"/>
    ${[...Array(n)].map((_, i) => `<path d="M${x + i * w / n} ${y - h} l${w / n / 2} -40 l${w / n / 2} 40" fill="${shade(c, -0.15)}"/><rect x="${x + i * w / n + 16}" y="${y - h + 30}" width="${w / n - 32}" height="${h * 0.42}" rx="${(w / n - 32) / 2}" fill="#3a4a5a" stroke-width="3"/><path d="M${x + i * w / n + w / n / 2} ${y - h + 30} V${y - h + 30 + h * 0.42}" stroke-width="2"/>`).join('')}</g>`;
}
function paddleSteamer(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${INK}" stroke-width="${S / s}" stroke-linejoin="round">
    <g fill="none" stroke="#3a3a3e" opacity=".5"><path class="a-smoke" d="M40 -170 q-40 -60 10 -120 q50 -60 -20 -120" stroke-width="40" stroke-linecap="round"/></g>
    <path d="M-220 0 L-240 -40 H240 L210 0Z" fill="#2a2a32"/><path d="M-200 -40 V-80 H200 V-40" fill="#f2ead8"/>
    ${[-160, -110, -60, 60, 110, 160].map((xx) => `<rect x="${xx - 14}" y="-72" width="28" height="22" rx="4" fill="#5a7a9a" stroke-width="3"/>`).join('')}
    <rect x="20" y="-170" width="40" height="92" fill="#c94a3a"/><rect x="16" y="-178" width="48" height="12" fill="#2a2a32"/>
    <path d="M-40 -40 A50 50 0 0 1 40 -40Z" fill="#8a5a34"/>${[0, 1, 2, 3, 4].map((i) => `<path d="M0 -40 L${(Math.cos(Math.PI + i * Math.PI / 4) * 48).toFixed(0)} ${(-40 + Math.sin(Math.PI + i * Math.PI / 4) * 48).toFixed(0)}" stroke-width="3"/>`).join('')}
  </g>`;
}
function gasLamp(x, y, h) {
  return `<g stroke="${INK}" stroke-width="4"><path d="M${x} ${y} V${y - h}" stroke="#2a2a32" stroke-width="10"/><path d="M${x - 22} ${y - h} L${x + 22} ${y - h} L${x + 14} ${y - h - 50} H${x - 14}Z" fill="#fff2b0"/><path d="M${x - 26} ${y - h - 50} H${x + 26} L${x} ${y - h - 70}Z" fill="#2a2a32"/></g>${light(x, y - h - 25, 140, '#ffe08a', 0.6, 'a-glow')}`;
}
function pole(x, y, h, s = 1) {
  return `<g stroke="${INK}" stroke-width="${4 * s}"><path d="M${x} ${y} V${y - h}" stroke="#6b4529" stroke-width="${12 * s}"/><path d="M${x - 30 * s} ${y - h + 20 * s} H${x + 30 * s}" stroke="#6b4529" stroke-width="${8 * s}"/><circle cx="${x - 24 * s}" cy="${y - h + 12 * s}" r="${6 * s}" fill="#9ad0e0"/><circle cx="${x + 24 * s}" cy="${y - h + 12 * s}" r="${6 * s}" fill="#9ad0e0"/></g>`;
}

Object.assign(SCENES, {
  hereke_kiyi: () => `
    ${sky('#8cbcd8', '#b8d6e2', '#eef0e6')}
    ${cloud(260, 150, 1.1, '#fbf8f0')}${cloud(800, 120, 0.9, '#fbf8f0')}
    ${hill('M0 420 Q250 340 500 380 T1000 360 L1000 520 L0 520Z', '#6a9a5a')}
    ${haze(360, 520, '#eef0e6', 0.4)}
    ${sea(500, '#4a9ab8', '#2a5a7a')}
    <path d="M-20 1000 V640 Q300 600 600 640 Q800 660 1020 630 V1000Z" fill="#a8a07a" stroke="${INK}" stroke-width="${S}"/>
    ${factory(180, 660, 480, 200, '#d8c4a8')}
    ${chimney(700, 660, 260, 46)}
    <g class="a-bob">${paddleSteamer(140, 590, 0.35)}</g>
    ${npc(300, 1000, 1.05, 1001, 10)}${npc(720, 1000, 1, 1002, 10, { flip: true })}
    ${vignette(0.3)}`,

  dokuma_tezgah: () => `
    ${interior('#d8c8b0', '#8a6a4a', { beam: '#5a4030', window: true })}
    ${[0, 1, 2].map((r) => { const y = 520 + r * 120, sc = 0.7 + r * 0.25; return [...Array(3)].map((_, i) => { const x = 180 + i * 320 + (r % 2) * 40; return `<g transform="translate(${x} ${y}) scale(${sc})" stroke="${INK}" stroke-width="4"><path d="M-110 120 V-140 M110 120 V-140 M-120 -140 H120 M-110 20 H110" stroke="#6b4529" stroke-width="12"/>${[...Array(14)].map((__, k) => `<path d="M${-100 + k * 15} -130 V20" stroke="${['#c94a3a', '#e8c45a', '#3a7aa8', '#f2ead8'][k % 4]}" stroke-width="4"/>`).join('')}<rect x="-100" y="-20" width="200" height="40" fill="${['#a8342a', '#2a5a8a', '#c9a23a'][(i + r) % 3]}"/><path d="M-90 0 l20 -12 l20 12 l20 -12 l20 12 l20 -12 l20 12 l20 -12 l20 12" fill="none" stroke="#f2ead8" stroke-width="3"/><path d="M-100 -150 h200 v-30 h-200Z" fill="#e8dcc0"/>${[...Array(10)].map((__, k) => `<circle cx="${-90 + k * 20}" cy="-166" r="4" fill="${INK}"/>`).join('')}</g>`; }).join(''); }).join('')}
    ${npc(500, 1000, 1, 1011, 10)}
    ${vignette(0.45)}`,

  demir_fabrika: () => `
    <rect width="1000" height="1000" fill="#2a2420"/>
    <path d="M0 0 H1000 V140 H0Z" fill="#3a3430" stroke="${INK}" stroke-width="${S}"/>
    ${[100, 300, 500, 700, 900].map((x) => `<path d="M${x - 100} 140 L${x} 60 L${x + 100} 140" fill="none" stroke="#5a504a" stroke-width="10"/>`).join('')}
    ${[...Array(5)].map((_, i) => `<path d="M${i * 220 + 60} 140 V900" stroke="#4a4440" stroke-width="20"/>`).join('')}
    ${light(300, 640, 500, '#ff7a20', 0.55, 'a-glow')}
    <g stroke="${INK}" stroke-width="${S}"><path d="M160 840 V420 Q300 340 440 420 V840Z" fill="#5a4a42"/><path d="M220 840 V600 Q300 540 380 600 V840Z" fill="#ff9a3a"/><path d="M240 840 V640 Q300 600 360 640 V840Z" fill="#ffd060"/></g>
    <path d="M380 800 Q500 780 560 820 Q620 860 700 840" fill="none" stroke="#ffb040" stroke-width="22" class="a-glow"/>
    <g stroke="${INK}" stroke-width="${S}" transform="translate(760 620)"><circle r="120" fill="none" stroke="#5a5e66" stroke-width="18"/>${[...Array(8)].map((_, i) => `<path d="M0 0 L${(Math.cos(i * Math.PI / 4) * 112).toFixed(0)} ${(Math.sin(i * Math.PI / 4) * 112).toFixed(0)}" stroke="#5a5e66" stroke-width="10"/>`).join('')}<circle r="22" fill="#8a8e96"/></g>
    ${[...Array(14)].map((_, i) => `<circle class="a-spark" style="animation-delay:${(i * 0.17).toFixed(2)}s" cx="${280 + (i * 37) % 160}" cy="${560 + (i * 23) % 100}" r="3" fill="#ffd060"/>`).join('')}
    <path d="M0 860 H1000 V1000 H0Z" fill="#1e1a18" stroke="${INK}" stroke-width="${S}"/>
    ${npc(560, 1000, 1, 1021, 10)}
    ${vignette(0.6)}`,

  muhendis_oda: () => `
    ${interior('#d8ccb8', '#7a6048', { beam: '#4a3a2a', window: true })}
    <g stroke="${INK}" stroke-width="${S}"><path d="M120 760 L180 600 H820 L880 760Z" fill="#8a6a4a"/><path d="M220 610 L260 520 H700 L740 610Z" fill="#e8eef4"/>
      <g stroke="#3a5a8a" stroke-width="3" fill="none"><circle cx="380" cy="565" r="34"/><circle cx="380" cy="565" r="12"/>${[...Array(12)].map((_, i) => { const a = i * Math.PI / 6; return `<path d="M${(380 + Math.cos(a) * 34).toFixed(0)} ${(565 + Math.sin(a) * 34).toFixed(0)} l${(Math.cos(a) * 8).toFixed(0)} ${(Math.sin(a) * 8).toFixed(0)}"/>`; }).join('')}<rect x="470" y="540" width="160" height="50"/><path d="M470 565 H630 M520 540 V590 M580 540 V590"/></g></g>
    <g stroke="${INK}" stroke-width="4"><path d="M640 600 l40 -50 l10 8 l-40 50Z" fill="#c9a24a"/><path d="M700 610 l-20 -60 M700 610 l20 -60" stroke="#8a8e96" stroke-width="5"/></g>
    <g stroke="${INK}" stroke-width="4">${[0, 1, 2].map((i) => `<rect x="${620 + i * 110}" y="200" width="90" height="120" fill="#e8eef4"/><circle cx="${665 + i * 110}" cy="260" r="26" fill="none" stroke="#3a5a8a" stroke-width="3"/>`).join('')}</g>
    ${npc(820, 980, 1, 1031, 10, { flip: true })}
    ${vignette(0.4)}`,

  vapur_bogaz: () => `
    ${sky('#8ab8d8', '#b8d4e0', '#f0e8d8')}
    ${cloud(200, 140, 1, '#fbf8f0')}${cloud(740, 110, 1.2, '#fbf8f0')}
    ${hill('M0 380 Q200 300 420 360 Q640 300 1000 350 L1000 520 L0 520Z', '#6a9a5a')}
    ${[[80, 470], [200, 460], [700, 465], [860, 470]].map(([x, y]) => `<rect x="${x}" y="${y}" width="60" height="44" fill="#e8dcc0" stroke="${INK}" stroke-width="3"/><path d="M${x - 6} ${y} L${x + 30} ${y - 24} L${x + 66} ${y}Z" fill="#a8583a" stroke="${INK}" stroke-width="3"/>`).join('')}
    ${haze(360, 520, '#f0e8d8', 0.4)}
    ${sea(510, '#3a8ab0', '#1f4f6e')}
    <g class="a-bob">${paddleSteamer(520, 700, 1.0)}</g>
    ${[[160, 820], [860, 860]].map(([x, y], i) => `<g class="a-bob" style="animation-delay:${i * 0.5}s" stroke="${INK}" stroke-width="4"><path d="M${x - 70} ${y} Q${x} ${y + 26} ${x + 70} ${y} L${x + 90} ${y - 18} L${x - 90} ${y - 18}Z" fill="#8a5a34"/></g>`).join('')}
    ${vignette(0.3)}`,

  gaz_lamba: () => `
    ${sky('#141a30', '#2a2a48', '#4a3a48')}
    ${stars(20, 1041, 260)}
    ${[[-20, 300, 260, '#6a5a52'], [230, 340, 240, '#7a6a5a'], [600, 320, 220, '#6a5a4e'], [810, 290, 220, '#7a6656']].map(([x, y, w, c]) => `<g stroke="${INK}" stroke-width="${S}"><rect x="${x}" y="${y}" width="${w}" height="${780 - y}" fill="${c}"/>${[0, 1, 2].map((r) => [0, 1].map((k) => `<rect x="${x + 30 + k * (w / 2 - 10)}" y="${y + 40 + r * 120}" width="${w / 2 - 70}" height="80" fill="${(r + k) % 2 ? '#ffd98a' : '#2a2a3a'}" stroke-width="3"/>`).join('')).join('')}</g>`).join('')}
    <path d="M0 780 H1000 V1000 H0Z" fill="#4a4448" stroke="${INK}" stroke-width="${S}"/>
    ${texture(0, 800, 1000, 1000, 40, '#3a3438', 1042, 20)}
    ${gasLamp(160, 900, 260)}${gasLamp(500, 860, 220)}${gasLamp(840, 900, 260)}
    ${npc(340, 1000, 1, 1043, 10)}${npc(680, 1000, 1, 1044, 10, { flip: true })}
    ${vignette(0.5)}`,

  telgraf_direk: () => `
    ${sky('#9cc8e0', '#c4dce6', '#f0ead6')}
    ${cloud(300, 150, 1, '#fbf8f0')}
    ${hill('M0 460 Q500 400 1000 460 L1000 1000 L0 1000Z', '#b8b06a')}
    ${haze(420, 540, '#f0ead6', 0.5)}
    ${(() => { let o = ''; const pts = []; for (let i = 0; i < 6; i++) { const t = i / 5; const x = 900 - t * 520 - t * t * 160, y = 940 - t * 470, h = 420 - t * 360, s = 1.2 - t * 1.0; pts.push([x - 24 * s, y - h + 12 * s, x + 24 * s]); o += pole(x, y, h, s); } for (let i = 0; i < pts.length - 1; i++) { o += `<path d="M${pts[i][0]} ${pts[i][1]} Q${(pts[i][0] + pts[i + 1][0]) / 2} ${(pts[i][1] + pts[i + 1][1]) / 2 + 30} ${pts[i + 1][0]} ${pts[i + 1][1]}" fill="none" stroke="${INK}" stroke-width="2.5"/><path d="M${pts[i][2]} ${pts[i][1]} Q${(pts[i][2] + pts[i + 1][2]) / 2} ${(pts[i][1] + pts[i + 1][1]) / 2 + 30} ${pts[i + 1][2]} ${pts[i + 1][1]}" fill="none" stroke="${INK}" stroke-width="2.5"/>`; } return o; })()}
    ${[...Array(5)].map((_, i) => `<path d="M${80 + i * 40} ${720 + (i % 2) * 10} q20 -30 40 0" fill="#c8a040" stroke="${INK}" stroke-width="3"/>`).join('')}
    ${npc(240, 1000, 1.05, 1051, 10)}
    ${vignette(0.3)}`,

  telgraf: () => `
    ${interior('#d8cbb4', '#6a5240', { beam: '#4a3a2a', window: true })}
    <g stroke="${INK}" stroke-width="${S}"><rect x="140" y="600" width="720" height="40" fill="#8a6a4a"/><path d="M160 640 V780 M840 640 V780" stroke="#6b4529" stroke-width="16"/></g>
    <g stroke="${INK}" stroke-width="4" transform="translate(360 560)"><rect x="-70" y="-10" width="140" height="50" fill="#6b4529"/><rect x="-50" y="-90" width="100" height="80" fill="#b08a3a"/><circle cx="0" cy="-50" r="26" fill="#f2ead8"/><path d="M0 -50 L14 -68" stroke-width="5"/><path d="M70 10 H200 Q260 10 260 -20" fill="none" stroke="#f2ead8" stroke-width="16"/></g>
    <g stroke="${INK}" stroke-width="4"><rect x="560" y="520" width="160" height="80" fill="#2a2a32"/><rect x="570" y="530" width="40" height="60" fill="#8a3a2a"/><rect x="620" y="530" width="40" height="60" fill="#8a3a2a"/><rect x="670" y="530" width="40" height="60" fill="#8a3a2a"/></g>
    <path d="M0 230 Q250 260 500 230 T1000 230" fill="none" stroke="${INK}" stroke-width="4"/>
    <g stroke="${INK}" stroke-width="3">${[...Array(6)].map((_, i) => `<path d="M${200 + i * 30} 600 l6 -10 h8 l6 10" fill="#f2ead8"/>`).join('')}</g>
    ${npc(760, 960, 1.05, 1061, 10, { flip: true })}
    ${vignette(0.45)}`,
});
Object.assign(FOCUS, {
  hereke_kiyi: [520, 520, 860], dokuma_tezgah: [500, 560, 860], demir_fabrika: [380, 620, 900], muhendis_oda: [480, 520, 1000],
  vapur_bogaz: [520, 560, 820], gaz_lamba: [500, 600, 860], telgraf_direk: [560, 600, 860], telgraf: [500, 520, 1000],
});

// ---------- ÇAĞ 11: CUMHURİYET SANAYİSİ ----------
function blackboard(x, y, w, h, text = 'A B C Ç') {
  return `<g stroke="${INK}" stroke-width="${S}"><rect x="${x - 10}" y="${y - 10}" width="${w + 20}" height="${h + 20}" fill="#6b4529"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#2a3a30"/></g>
    <text x="${x + w / 2}" y="${y + h * 0.42}" text-anchor="middle" font-family="Georgia, serif" font-size="${h * 0.26}" fill="#f2f2ea" opacity=".9">${text}</text>
    <text x="${x + w / 2}" y="${y + h * 0.8}" text-anchor="middle" font-family="Georgia, serif" font-size="${h * 0.18}" fill="#f2f2ea" opacity=".75">A-NA  BA-BA</text>`;
}
function steamTrain(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${INK}" stroke-width="${S / s}" stroke-linejoin="round">
    <g fill="none" stroke="#e8e8e8" opacity=".7"><path class="a-smoke" d="M-150 -170 q-30 -60 20 -110 q50 -50 -10 -110" stroke-width="40" stroke-linecap="round"/></g>
    <rect x="-220" y="-120" width="200" height="90" rx="20" fill="#2a2a2e"/><rect x="-170" y="-170" width="36" height="52" fill="#2a2a2e"/>
    <rect x="-30" y="-170" width="120" height="140" fill="#3a2a2a"/><rect x="-10" y="-150" width="40" height="40" fill="#ffd98a"/>
    <path d="M-240 -30 H100 V-10 H-240Z" fill="#8a2a22"/><path d="M-250 -40 L-270 -10 H-240Z" fill="#5a5e66"/>
    ${[-200, -130, -60, 30].map((cx) => `<circle cx="${cx}" cy="0" r="${cx < 0 ? 30 : 22}" fill="#1a1a1e"/><circle cx="${cx}" cy="0" r="8" fill="#c94a3a"/>`).join('')}
    <path d="M-200 0 H-60" stroke="#8a8e96" stroke-width="${8 / s}"/>
    ${[0, 1].map((k) => `<rect x="${120 + k * 230}" y="-150" width="210" height="130" rx="10" fill="${k ? '#3a6a4a' : '#8a2a22'}"/>${[0, 1, 2, 3].map((w) => `<rect x="${135 + k * 230 + w * 48}" y="-130" width="34" height="40" fill="#ffe7a8"/>`).join('')}<circle cx="${160 + k * 230}" cy="0" r="18" fill="#1a1a1e"/><circle cx="${290 + k * 230}" cy="0" r="18" fill="#1a1a1e"/>`).join('')}
  </g>`;
}

Object.assign(SCENES, {
  kasaba_meydan: () => `
    ${sky('#8cbcd8', '#b8d4e0', '#efe6d4')}
    ${erciyes('#8a90a8', '#f6f3ee', 520, 1.05)}
    ${haze(380, 520, '#efe6d4', 0.5)}
    <path d="M0 520 H1000 V1000 H0Z" fill="#c8b896" stroke="${INK}" stroke-width="${S}"/>
    <g stroke="${INK}" stroke-width="${S}"><rect x="440" y="300" width="120" height="260" fill="#d8c8a8"/><path d="M430 300 L500 240 L570 300Z" fill="#8a3a2a"/><circle cx="500" cy="350" r="34" fill="#f6f0e0"/><path d="M500 350 V326 M500 350 L516 360" stroke-width="4"/><rect x="480" y="470" width="40" height="90" fill="#3a2a22"/></g>
    ${[[40, 520, 200, 180, '#e8dcc0'], [760, 520, 220, 200, '#d8c8a8']].map(([x, y, w, h, c]) => `<g stroke="${INK}" stroke-width="${S}"><rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${c}"/><path d="M${x - 10} ${y - h} L${x + w / 2} ${y - h - 40} L${x + w + 10} ${y - h}Z" fill="#a8583a"/>${[0, 1, 2].map((i) => `<rect x="${x + 20 + i * (w - 40) / 3}" y="${y - h + 40}" width="${(w - 40) / 3 - 16}" height="60" fill="#5a7a9a"/>`).join('')}</g>`).join('')}
    <g stroke="${INK}" stroke-width="5"><path d="M300 560 V430 M380 560 V430" stroke="#6b4529"/><rect x="270" y="400" width="140" height="90" fill="#2a3a30"/></g>
    <text x="340" y="460" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="#f2f2ea">A B C</text>
    <path d="M0 640 Q500 610 1000 640" fill="none" stroke="#a8986e" stroke-width="5"/>
    ${npc(200, 1000, 1.05, 1101, 11)}${npc(500, 820, 0.75, 1102, 11)}${npc(800, 1000, 1.05, 1103, 11, { flip: true })}
    ${vignette(0.3)}`,

  millet_mektebi: () => `
    ${interior('#e0d4bc', '#8a6a4a', { beam: '#5a4030', window: true })}
    ${blackboard(380, 220, 440, 240)}
    <g stroke="${INK}" stroke-width="4"><path d="M500 140 V180" stroke-width="3"/><path d="M470 180 H530 L520 210 H480Z" fill="#c9a24a"/></g>${light(500, 220, 260, '#ffe7a8', 0.45, 'a-glow')}
    ${[0, 1, 2].map((r) => [0, 1, 2].map((c) => `<g stroke="${INK}" stroke-width="4"><rect x="${120 + c * 280 + r * 20}" y="${600 + r * 110}" width="200" height="30" fill="#8a5a34"/><path d="M${130 + c * 280 + r * 20} ${630 + r * 110} v40 M${310 + c * 280 + r * 20} ${630 + r * 110} v40" stroke="#6b4529" stroke-width="8"/><rect x="${160 + c * 280 + r * 20}" y="${588 + r * 110}" width="60" height="14" fill="#f2ead8"/></g>`).join('')).join('')}
    ${npc(260, 1000, 1, 1111, 11)}${npc(760, 1000, 1, 1112, 11, { flip: true })}
    ${vignette(0.45)}`,

  bez_fabrika: () => `
    <rect width="1000" height="1000" fill="#d8d2c4"/>
    ${[0, 1, 2, 3, 4].map((i) => `<path d="M${i * 220 - 20} 200 L${i * 220 + 140} 60 V200Z" fill="#c8e0ea" stroke="${INK}" stroke-width="${S}"/><path d="M${i * 220 + 140} 60 L${i * 220 + 200} 200" stroke="${INK}" stroke-width="${S}"/>`).join('')}
    <path d="M0 200 H1000 V240 H0Z" fill="#a8a094" stroke="${INK}" stroke-width="${S}"/>
    ${light(500, 300, 600, '#fffaf0', 0.35)}
    ${[0, 1, 2].map((r) => { const y = 470 + r * 150, sc = 0.6 + r * 0.25; return [...Array(4)].map((_, i) => { const x = 140 + i * 240 + (r % 2) * 60; return `<g transform="translate(${x} ${y}) scale(${sc})" stroke="${INK}" stroke-width="4"><rect x="-100" y="-60" width="200" height="120" fill="#5a6a7a"/><rect x="-90" y="-50" width="180" height="40" fill="#e8e4dc"/>${[...Array(9)].map((__, k) => `<path d="M${-80 + k * 20} -50 V-10" stroke="#c8c0b0" stroke-width="3"/>`).join('')}<circle cx="-60" cy="30" r="20" fill="#3a4a5a"/><circle cx="60" cy="30" r="20" fill="#3a4a5a"/><path d="M-60 30 L60 30" stroke="#8a8e96" stroke-width="6"/><path d="M-110 70 V120 M110 70 V120" stroke-width="10"/></g>`; }).join(''); }).join('')}
    ${npc(500, 1000, 1, 1121, 11)}
    ${vignette(0.4)}`,

  lojman: () => `
    ${sky('#f0a870', '#f4c898', '#f2e2c4')}
    ${hill('M0 460 Q500 400 1000 460 L1000 600 L0 600Z', '#8a9a6a')}
    ${chimney(860, 520, 220, 40)}
    ${[[40, 640], [300, 620], [560, 640]].map(([x, y]) => `<g stroke="${INK}" stroke-width="${S}"><rect x="${x}" y="${y - 200}" width="220" height="200" fill="#e8dcc8"/><path d="M${x - 14} ${y - 200} L${x + 110} ${y - 260} L${x + 234} ${y - 200}Z" fill="#b8583a"/>${[0, 1].map((r) => [0, 1, 2].map((c) => `<rect x="${x + 22 + c * 66}" y="${y - 180 + r * 80}" width="46" height="52" fill="${(r + c) % 2 ? '#ffe39a' : '#5a7a9a'}" stroke-width="3"/>`).join('')).join('')}</g>`).join('')}
    <path d="M0 640 H1000 V1000 H0Z" fill="#a8b07a" stroke="${INK}" stroke-width="${S}"/>
    <path d="M0 700 H1000" stroke="#c8b896" stroke-width="40"/>
    ${npc(220, 1000, 1, 1131, 11)}${npc(520, 960, 0.9, 1132, 11)}${npc(800, 1000, 1, 1133, 11, { flip: true })}
    ${vignette(0.3)}`,

  tren_istasyon: () => `
    ${sky('#9cc6dc', '#c4dce6', '#f0ead8')}
    ${cloud(260, 150, 1, '#fbf8f0')}
    ${hill('M0 400 Q300 320 600 380 T1000 360 L1000 560 L0 560Z', '#6a8a5a')}
    <g stroke="${INK}" stroke-width="${S}"><rect x="600" y="330" width="380" height="230" fill="#d8b890"/><path d="M580 330 L790 270 L1000 330Z" fill="#8a3a2a"/>${[0, 1, 2, 3].map((i) => `<path d="M${630 + i * 90} 560 V430 Q${660 + i * 90} 400 ${690 + i * 90} 430 V560" fill="#3a4a5a" stroke-width="3"/>`).join('')}<rect x="720" y="290" width="140" height="40" fill="#f2ead8"/></g>
    <text x="790" y="318" text-anchor="middle" font-family="Georgia, serif" font-size="22" font-weight="700" fill="#2a2a2a">İSTASYON</text>
    <path d="M0 560 H1000 V640 H0Z" fill="#b8b0a0" stroke="${INK}" stroke-width="${S}"/>
    <path d="M0 700 H1000 M0 760 H1000" stroke="#5a5e66" stroke-width="10"/>${[...Array(14)].map((_, i) => `<rect x="${i * 74}" y="690" width="40" height="82" fill="#6b4529" stroke="${INK}" stroke-width="3"/>`).join('')}<path d="M0 700 H1000 M0 760 H1000" stroke="#8a8e96" stroke-width="8"/>
    <g class="a-run">${steamTrain(320, 720, 0.85)}</g>
    <path d="M0 800 H1000 V1000 H0Z" fill="#a8a094" stroke="${INK}" stroke-width="${S}"/>
    ${npc(820, 1000, 1, 1141, 11, { flip: true })}
    ${vignette(0.3)}`,

  celtik_tarla: () => `
    ${sky('#a8cce0', '#cadfe6', '#f0ecd8')}
    ${hill('M0 380 L180 280 L360 340 L540 260 L720 330 L1000 280 L1000 520 L0 520Z', '#5a7a4a')}
    ${haze(340, 520, '#f0ecd8', 0.4)}
    <path d="M0 500 H1000 V1000 H0Z" fill="#8ab06a" stroke="${INK}" stroke-width="${S}"/>
    ${[...Array(8)].map((_, i) => `<path d="M0 ${540 + i * 55} Q500 ${520 + i * 55} 1000 ${540 + i * 55}" fill="none" stroke="#6a9a8a" stroke-width="10" opacity=".6"/>`).join('')}
    <g stroke="${INK}" stroke-width="${S}"><path d="M640 640 V240 M640 260 H900 M890 260 V380" stroke="#c94a3a" stroke-width="12" fill="none"/><path d="M640 300 L700 260 M640 340 L700 300" stroke="#c94a3a" stroke-width="6"/><rect x="870" y="380" width="40" height="30" fill="#8a8e96"/></g>
    ${[[220, 620], [340, 640], [460, 610]].map(([x, y]) => `<path d="M${x} ${y} V${y - 110}" stroke="#8a6440" stroke-width="10"/><path d="M${x - 30} ${y - 100} H${x + 30}" stroke="#d8c8a8" stroke-width="12"/>`).join('')}
    <g stroke="${INK}" stroke-width="4"><rect x="120" y="700" width="200" height="70" fill="#a8583a"/><path d="M120 700 L220 650 L320 700" fill="#c97a4a"/></g>
    ${npc(560, 1000, 1.05, 1151, 11)}${npc(840, 1000, 1, 1152, 11, { flip: true })}
    ${vignette(0.3)}`,

  yuksek_firin: () => `
    ${sky('#1a1830', '#3a2a40', '#7a4a3a')}
    ${stars(20, 1161, 260)}
    ${light(460, 640, 520, '#ff8a2a', 0.5, 'a-glow')}
    <g stroke="${INK}" stroke-width="${S}">
      <path d="M360 840 L380 340 Q460 300 540 340 L560 840Z" fill="#4a3e3a"/>
      ${[400, 480, 560, 640, 720, 800].map((y) => `<path d="M${370 - (y - 400) * 0.02} ${y} H${550 + (y - 400) * 0.02}" stroke="#2a2220" stroke-width="5"/>`).join('')}
      <path d="M400 340 V200 H520 V340" fill="#5a4e4a"/><path d="M380 200 H540 V180 H380Z" fill="#3a2e2a"/>
      <path d="M560 300 H760 V840" fill="none" stroke="#5a5e66" stroke-width="22"/>
      ${[640, 760, 880].map((x) => `<rect x="${x - 40}" y="420" width="80" height="420" rx="40" fill="#6a5e5a"/>`).join('')}
      <path d="M400 800 Q460 760 520 800 V840 H400Z" fill="#ffb040" class="a-glow"/>
    </g>
    <path d="M520 830 Q620 820 700 850 Q780 880 860 860" fill="none" stroke="#ffcf60" stroke-width="20" class="a-glow"/>
    ${[...Array(12)].map((_, i) => `<circle class="a-spark" style="animation-delay:${(i * 0.2).toFixed(1)}s" cx="${440 + (i * 31) % 120}" cy="${760 + (i * 17) % 60}" r="3" fill="#ffd060"/>`).join('')}
    <path d="M0 860 H1000 V1000 H0Z" fill="#2a2220" stroke="${INK}" stroke-width="${S}"/>
    ${[...Array(9)].map((_, i) => silhouette(80 + i * 110, 990 - (i % 2) * 14, 0.55, '#1a1412')).join('')}
    ${vignette(0.55)}`,
});
Object.assign(FOCUS, {
  kasaba_meydan: [480, 520, 860], millet_mektebi: [560, 480, 860], bez_fabrika: [500, 560, 860], lojman: [460, 560, 860],
  tren_istasyon: [420, 600, 1000], celtik_tarla: [560, 560, 860], yuksek_firin: [480, 600, 860],
});

Object.assign(SCENES, {
  maden_ocak: () => `
    ${sky('#8a9aa8', '#aab4bc', '#d8d4cc')}
    <path d="M-20 600 L-20 260 Q120 200 260 280 Q380 200 520 270 Q700 180 860 260 L1020 230 V600Z" fill="#2a2a2e" stroke="${INK}" stroke-width="${S}"/>
    ${texture(0, 280, 1000, 600, 40, '#3a3a40', 1171, 20)}
    ${sea(560, '#3a6a7a', '#1a3a4a')}
    <path d="M-20 1000 V620 Q300 580 600 620 Q800 650 1020 610 V1000Z" fill="#3a3632" stroke="${INK}" stroke-width="${S}"/>
    <g stroke="${INK}" stroke-width="${S}"><path d="M280 760 V560 Q360 500 440 560 V760Z" fill="#1a1614"/><path d="M270 560 Q360 480 450 560" fill="none" stroke="#6b4529" stroke-width="22"/><path d="M290 760 V580 M430 760 V580" stroke="#6b4529" stroke-width="16"/></g>
    <path d="M440 740 H1000" stroke="#5a5e66" stroke-width="10"/>
    ${[560, 720, 880].map((x) => `<g stroke="${INK}" stroke-width="4"><path d="M${x - 60} 700 L${x - 50} 740 H${x + 50} L${x + 60} 700Z" fill="#5a4a3a"/><path d="M${x - 56} 700 Q${x} 670 ${x + 56} 700Z" fill="#1a1a1a"/><circle cx="${x - 30}" cy="746" r="10" fill="#2a2a2a"/><circle cx="${x + 30}" cy="746" r="10" fill="#2a2a2a"/></g>`).join('')}
    <g stroke="${INK}" stroke-width="${S}"><path d="M700 560 V300 L760 280 L820 300 V560" fill="none" stroke="#5a5e66" stroke-width="10"/><circle cx="760" cy="300" r="30" fill="none" stroke="#5a5e66" stroke-width="8"/></g>
    ${npc(160, 1000, 1, 1172, 11)}${npc(860, 1000, 1, 1173, 11, { flip: true })}
    ${vignette(0.4)}`,

  maden_ic: () => `
    <rect width="1000" height="1000" fill="#0e0c0c"/>
    ${light(500, 520, 420, '#ffd070', 0.45, 'a-glow')}
    <path d="M60 1000 L180 260 H820 L940 1000Z" fill="#2a2420" stroke="${INK}" stroke-width="${S}"/>
    ${[0, 1, 2, 3].map((i) => { const t = i / 4, xl = 180 - t * 120 + 120 * 0, y = 260 + t * 0; const w = 640 + i * 90, x = 500 - w / 2, yy = 280 + i * 150; return `<path d="M${x} ${yy + 120} V${yy} H${x + w} V${yy + 120}" fill="none" stroke="#6b4529" stroke-width="${18 + i * 6}"/>`; }).join('')}
    ${texture(120, 300, 880, 1000, 40, '#1a1614', 1181, 22)}
    <g transform="translate(580 420)" stroke="${INK}" stroke-width="4"><path d="M0 -60 V-20" stroke-width="3"/><rect x="-26" y="-20" width="52" height="60" rx="6" fill="none" stroke="#c9a24a" stroke-width="4"/>${[-16, -4, 8, 20].map((x) => `<path d="M${x} -18 V38" stroke="#c9a24a" stroke-width="2"/>`).join('')}<ellipse cx="0" cy="14" rx="12" ry="9" fill="#ffd83a"/><circle cx="8" cy="10" r="2" fill="${INK}"/></g>
    ${silhouette(320, 900, 0.9, '#1a1412')}
    <circle cx="300" cy="640" r="10" fill="#fff2b0"/>${light(300, 640, 90, '#fff2b0', 0.7)}
    ${vignette(0.7)}`,
});
Object.assign(FOCUS, { maden_ocak: [440, 600, 900], maden_ic: [450, 560, 860] });

// ---------- ÇAĞ 12: KALKINMA YILLARI ----------
function devrimCar(x, y, s, c = '#1a1a1e') {
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${INK}" stroke-width="${S / s}" stroke-linejoin="round">
    <path d="M-230 -20 Q-232 -70 -190 -80 L-120 -90 Q-90 -150 -20 -156 L80 -156 Q140 -150 170 -92 L220 -84 Q246 -70 240 -20 Z" fill="${c}"/>
    <path d="M-100 -92 Q-76 -138 -20 -142 L40 -142 V-92Z M56 -142 L82 -142 Q126 -136 150 -92 H56Z" fill="#a8c8d8"/>
    <path d="M-236 -40 H246" stroke="${shade(c, 0.5)}" stroke-width="${4 / s}"/>
    <rect x="-246" y="-34" width="34" height="14" rx="4" fill="#e8e4dc"/><rect x="214" y="-34" width="34" height="14" rx="4" fill="#e8e4dc"/>
    <circle cx="-226" cy="-58" r="12" fill="#fff2b0"/>
    ${[-140, 140].map((cx) => `<circle cx="${cx}" cy="-12" r="42" fill="#1a1a1a"/><circle cx="${cx}" cy="-12" r="20" fill="#c8ccd4"/>`).join('')}
  </g>`;
}
function tvSet(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${INK}" stroke-width="${S / s}" stroke-linejoin="round">
    <rect x="-120" y="-100" width="240" height="190" rx="14" fill="#8a5a34"/><rect x="-100" y="-82" width="160" height="150" rx="22" fill="#d8dcdc"/>
    <g class="a-glow"><rect x="-96" y="-78" width="152" height="142" rx="20" fill="#b8c4c8"/><circle cx="-20" cy="-10" r="30" fill="#8a9498"/><path d="M-60 40 Q-20 10 20 40" fill="#8a9498"/></g>
    ${[-40, -10].map((yy) => `<circle cx="88" cy="${yy}" r="10" fill="#3a2a22"/>`).join('')}<path d="M70 30 H106 M70 46 H106" stroke-width="3"/>
    <path d="M-60 -100 L-110 -170 M40 -100 L90 -170" stroke-width="${4 / s}"/>
  </g>`;
}

Object.assign(SCENES, {
  devrim_atolye: () => `
    <rect width="1000" height="1000" fill="#b8b4a8"/>
    ${[0, 1, 2, 3, 4].map((i) => `<rect x="${60 + i * 190}" y="80" width="140" height="240" fill="#d8e4ea" stroke="${INK}" stroke-width="${S}"/>${[0, 1, 2].map((r) => `<path d="M${60 + i * 190} ${160 + r * 60} h140" stroke="${INK}" stroke-width="3"/>`).join('')}<path d="M${130 + i * 190} 80 V320" stroke="${INK}" stroke-width="3"/>`).join('')}
    ${light(500, 220, 600, '#fffaf0', 0.35)}
    <path d="M0 340 H1000" stroke="#5a5e66" stroke-width="20"/>
    <g stroke="${INK}" stroke-width="5"><path d="M760 340 V500" stroke-width="4"/><path d="M730 500 H790 L780 540 H740Z" fill="#c94a3a"/></g>
    <path d="M0 640 H1000 V1000 H0Z" fill="#7a7468" stroke="${INK}" stroke-width="${S}"/>
    ${texture(0, 660, 1000, 1000, 30, '#6a645a', 1201, 24)}
    ${devrimCar(500, 760, narrowView() ? 0.78 : 1.05)}
    <g stroke="${INK}" stroke-width="4"><rect x="60" y="560" width="160" height="90" fill="#5a6a7a"/><path d="M80 560 V520 H200 V560" fill="none" stroke-width="6"/><circle cx="140" cy="600" r="24" fill="#3a4a5a"/></g>
    ${npc(860, 1000, 1, 1202, 12, { flip: true })}
    ${vignette(0.35)}`,

  toren: () => `
    ${sky('#8ab8d8', '#b8d4e2', '#f0ece2')}
    ${cloud(220, 130, 1, '#fbf8f0')}
    <g stroke="${INK}" stroke-width="${S}"><rect x="160" y="260" width="680" height="300" fill="#e8dcc4"/>${[...Array(10)].map((_, i) => `<rect x="${190 + i * 64}" y="300" width="34" height="240" fill="#d8ccb4" stroke-width="3"/>`).join('')}<path d="M140 260 H860 V230 H140Z" fill="#c8b896"/></g>
    ${[200, 400, 600, 800].map((x) => `<path d="M${x} 230 V140" stroke="${INK}" stroke-width="5"/><path d="M${x} 140 h50 v32 h-50Z" fill="#d81e2c" stroke="${INK}" stroke-width="3"/><circle cx="${x + 22}" cy="156" r="7" fill="#fff"/>`).join('')}
    <path d="M0 560 H1000 V1000 H0Z" fill="#a8a094" stroke="${INK}" stroke-width="${S}"/>
    <path d="M300 560 L80 1000 H920 L700 560Z" fill="#8a8478"/>
    <g opacity=".85">${[...Array(16)].map((_, i) => silhouette(30 + i * 62, 640 + (i % 3) * 8, 0.42, '#3a3430')).join('')}</g>
    ${devrimCar(narrowView() ? 490 : 470, 820, narrowView() ? 0.66 : 0.85)}
    ${npc(840, 1000, 1, 1211, 12, { flip: true })}
    ${vignette(0.3)}`,

  kahve_tv: () => `
    ${interior('#c8b896', '#7a5a3a', { beam: '#4a3426', window: true })}
    <path d="M0 480 H1000" stroke="#6b4529" stroke-width="16"/>
    ${tvSet(560, 380, 1.15)}
    ${light(540, 370, 300, '#d8e8f0', 0.35, 'a-glow')}
    ${[200, 400, 640, 840].map((x) => `<g stroke="${INK}" stroke-width="4"><ellipse cx="${x}" cy="760" rx="70" ry="22" fill="#a8783a"/><path d="M${x} 760 V840" stroke-width="10"/><path d="M${x - 20} 750 l4 -18 h16 l4 18Z M${x + 20} 752 l3 -14 h12 l3 14Z" fill="#f2ead8" stroke-width="2"/></g>`).join('')}
    ${npc(160, 1000, 1, 1221, 12)}${npc(420, 980, 0.95, 1222, 12)}${npc(700, 990, 1, 1223, 12, { flip: true })}
    ${vignette(0.45)}`,

  gecekondu: () => `
    ${sky('#9cc6dc', '#c4dae2', '#f0e8d4')}
    <g opacity=".6">${[...Array(8)].map((_, i) => `<rect x="${600 + i * 50}" y="${280 + (i % 3) * 20}" width="36" height="${200 - (i % 3) * 20}" fill="#9aa4ac"/>`).join('')}</g>
    ${hill('M-20 1000 L-20 420 Q300 360 600 460 Q800 520 1020 480 L1020 1000Z', '#a89a7a')}
    ${[[40, 500], [190, 470], [340, 470], [480, 520], [80, 640], [260, 640], [440, 660], [620, 600], [780, 600], [120, 790], [340, 800], [600, 760], [820, 760]].map(([x, y], i) => `<g stroke="${INK}" stroke-width="4" stroke-linejoin="round"><rect x="${x}" y="${y}" width="${110 + (i % 3) * 20}" height="${70 + (i % 2) * 14}" fill="${['#e8dcc0', '#d8c8a8', '#c8d4dc', '#e0c8b8'][i % 4]}"/><path d="M${x - 8} ${y} L${x + 55 + (i % 3) * 10} ${y - 34} L${x + 118 + (i % 3) * 20} ${y}Z" fill="${['#b8583a', '#a8483a', '#8a6a5a'][i % 3]}"/><rect x="${x + 16}" y="${y + 18}" width="26" height="24" fill="#5a7a9a" stroke-width="2"/><rect x="${x + 60}" y="${y + 26}" width="24" height="${44 + (i % 2) * 14}" fill="#5a3a2a" stroke-width="2"/></g>${i % 3 === 0 ? `<path d="M${x + 70} ${y - 30} V${y - 80} M${x + 50} ${y - 70} H${x + 90} M${x + 56} ${y - 58} H${x + 84}" stroke="${INK}" stroke-width="3"/>` : ''}`).join('')}
    ${npc(500, 1000, 1, 1231, 12)}
    ${vignette(0.3)}`,

  fabrika70: () => `
    <rect width="1000" height="1000" fill="#c8ccc8"/>
    ${[0, 1, 2, 3].map((i) => `<rect x="${i * 260}" y="60" width="200" height="180" fill="#d8e4ea" stroke="${INK}" stroke-width="${S}"/>`).join('')}
    ${light(500, 200, 600, '#fffaf0', 0.3)}
    <path d="M0 520 H1000 V600 H0Z" fill="#3a3e46" stroke="${INK}" stroke-width="${S}"/>
    ${[...Array(20)].map((_, i) => `<circle cx="${i * 52 + 10}" cy="600" r="12" fill="#5a5e66" stroke="${INK}" stroke-width="3"/>`).join('')}
    <g class="a-run">${[[200, '#e8e8e4'], [520, '#3a7aa8'], [840, '#c94a3a']].map(([x, c]) => devrimCar(x, 512, 0.6, c)).join('')}</g>
    <g stroke="${INK}" stroke-width="4">${[160, 480, 800].map((x) => `<path d="M${x} 240 V380" stroke-width="6"/><path d="M${x - 30} 380 H${x + 30} L${x + 20} 420 H${x - 20}Z" fill="#f2b632"/>`).join('')}</g>
    <path d="M0 660 H1000 V1000 H0Z" fill="#8a8a84" stroke="${INK}" stroke-width="${S}"/>
    <path d="M0 700 H1000" stroke="#f2b632" stroke-width="10" stroke-dasharray="40 30"/>
    ${npc(260, 1000, 1, 1241, 12)}${npc(740, 1000, 1, 1242, 12, { flip: true })}
    ${vignette(0.35)}`,

  bogaz_kopru: () => `
    ${sky('#f0a878', '#f6c89a', '#f6e2c4')}
    <circle cx="760" cy="300" r="60" fill="#fff0c0" stroke="${INK}" stroke-width="${S}"/>${light(760, 300, 260, '#ffe0a0', 0.4)}
    ${hill('M-20 520 Q100 440 200 470 L200 560 L-20 560Z', '#6a8a5a')}${hill('M800 470 Q900 430 1020 460 L1020 560 L800 560Z', '#6a8a5a')}
    ${sea(540, '#4a8ab0', '#1f4f6e')}
    <g stroke="${INK}" stroke-width="${S}">
      <path d="M150 560 V200 M190 560 V200 M150 200 H190 M150 320 H190 M150 440 H190" fill="none" stroke="#c8ccd4" stroke-width="14"/>
      <path d="M810 560 V200 M850 560 V200 M810 200 H850 M810 320 H850 M810 440 H850" fill="none" stroke="#c8ccd4" stroke-width="14"/>
      <path d="M-20 440 L170 200 Q500 480 830 200 L1020 440" fill="none" stroke="#e8e8ec" stroke-width="8"/>
      <path d="M-20 470 H1020 V490 H-20Z" fill="#c8ccd4"/>
    </g>
    ${[...Array(30)].map((_, i) => { const x = 190 + i * 21; const t = (x - 170) / 660; const yy = 200 + (480 - 200) * 4 * t * (1 - t) * 0.9 + 0; return x < 830 ? `<path d="M${x} ${Math.min(470, 200 + 280 * (1 - Math.pow(2 * t - 1, 2)) * 0.95).toFixed(0)} V470" stroke="#e8e8ec" stroke-width="2"/>` : ''; }).join('')}
    ${[[300, 700], [640, 760]].map(([x, y], i) => `<g class="a-bob" style="animation-delay:${i * 0.6}s" stroke="${INK}" stroke-width="4"><path d="M${x - 90} ${y} L${x - 80} ${y + 26} H${x + 80} L${x + 100} ${y}Z" fill="#f2ead8"/><rect x="${x - 50}" y="${y - 26}" width="100" height="26" fill="#e8dcc0"/><rect x="${x - 10}" y="${y - 56}" width="20" height="30" fill="#2a2a32"/></g>`).join('')}
    ${npc(820, 1000, 1, 1251, 12, { flip: true })}
    ${vignette(0.3)}`,
});
Object.assign(FOCUS, {
  devrim_atolye: [500, 600, 1000], toren: [490, 600, 1000], kahve_tv: [540, 460, 860], gecekondu: [420, 620, 820],
  fabrika70: [500, 520, 860], bogaz_kopru: [650, 420, 880],
});

// ---------- ÇAĞ 13: BİLGİ ÇAĞI ----------
function crt(x, y, s, glow = '#3aff8a') {
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${INK}" stroke-width="${S / s}" stroke-linejoin="round">
    <path d="M-80 -70 H80 L96 70 H-96Z" fill="#d8d4c4"/><rect x="-64" y="-56" width="128" height="96" rx="10" fill="#0e1a12"/>
    ${[0, 1, 2, 3, 4].map((i) => `<path d="M-52 ${-40 + i * 16} h${40 + (i * 37) % 60}" stroke="${glow}" stroke-width="${4 / s}" opacity=".85"/>`).join('')}
    <path d="M-30 70 L-40 100 H40 L30 70" fill="#c8c4b4"/><rect x="-110" y="100" width="220" height="24" rx="4" fill="#c8c4b4"/>
  </g>`;
}
function building(x, y, w, h, c, { lit = 0.5, seed = 1 } = {}) {
  const r = rnd(seed); let o = `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${c}" stroke="${INK}" stroke-width="${S}"/>`;
  const cols = Math.max(2, Math.floor(w / 34)), rows = Math.max(2, Math.floor(h / 44));
  for (let i = 0; i < rows; i++) for (let k = 0; k < cols; k++) o += `<rect x="${x + 10 + k * (w - 20) / cols}" y="${y - h + 14 + i * (h - 20) / rows}" width="${(w - 20) / cols - 10}" height="${(h - 20) / rows - 14}" fill="${r() < lit ? '#ffe39a' : '#3a4a5a'}" stroke-width="2"/>`;
  return o;
}

Object.assign(SCENES, {
  kampus: () => `
    ${sky('#8cc0dc', '#b8d6e2', '#eef0e4')}
    ${cloud(220, 140, 1.1, '#fbf8f0')}${cloud(800, 120, 0.9, '#fbf8f0')}
    ${building(560, 560, 380, 260, '#c8c4bc', { lit: 0.2, seed: 1301 })}${building(80, 560, 260, 200, '#d8d0c4', { lit: 0.2, seed: 1302 })}
    <path d="M0 560 H1000 V1000 H0Z" fill="#8ab06a" stroke="${INK}" stroke-width="${S}"/>
    ${[[120, 640], [420, 620], [880, 650]].map(([x, y]) => `<g stroke="${INK}" stroke-width="4"><path d="M${x} ${y} v60" stroke="#6b4529" stroke-width="10"/><circle cx="${x}" cy="${y - 30}" r="50" fill="#5a8a3a"/></g>`).join('')}
    <path d="M300 1000 L460 620 H540 L700 1000Z" fill="#c8c0b0" stroke="${INK}" stroke-width="4"/>
    <path d="M520 700 Q600 760 760 780 Q900 800 1000 790" fill="none" stroke="#8a6440" stroke-width="30"/><path d="M520 700 Q600 760 760 780 Q900 800 1000 790" fill="none" stroke="#5a3a24" stroke-width="10" stroke-dasharray="20 14"/>
    <g stroke="${INK}" stroke-width="4"><circle cx="230" cy="800" r="26" fill="none" stroke-width="5"/><circle cx="310" cy="800" r="26" fill="none" stroke-width="5"/><path d="M230 800 L260 760 H300 L310 800 M260 760 L250 740" fill="none" stroke-width="5"/></g>
    ${npc(400, 1000, 1, 1311, 13)}${npc(780, 1000, 1, 1312, 13, { flip: true })}
    ${vignette(0.3)}`,

  bilgisayar_odasi: () => `
    ${interior('#c8ccd0', '#6a6e74', { beam: '#4a4e54' })}
    ${[80, 200].map((x) => `<g stroke="${INK}" stroke-width="${S}"><rect x="${x}" y="200" width="100" height="560" fill="#3a3e46"/>${[...Array(10)].map((_, i) => `<rect x="${x + 10}" y="${220 + i * 52}" width="80" height="36" fill="#2a2e34" stroke-width="2"/><circle class="a-blink" style="animation-delay:${(i * 0.3 + x / 200).toFixed(1)}s" cx="${x + 78}" cy="${238 + i * 52}" r="4" fill="${i % 2 ? '#3aff8a' : '#ffb03a'}" stroke="none"/>`).join('')}</g>`).join('')}
    <g stroke="${INK}" stroke-width="${S}"><path d="M360 640 H960 V680 H360Z" fill="#8a7a62"/><path d="M380 680 V800 M940 680 V800" stroke="#5a4a3a" stroke-width="14"/></g>
    ${crt(520, 520, 1.0)}${crt(800, 520, 0.9, '#ffb03a')}
    <path d="M180 760 Q300 820 420 700" fill="none" stroke="#2a2a2a" stroke-width="8"/><path d="M180 700 Q260 780 380 690" fill="none" stroke="#3a6ab8" stroke-width="6"/>
    ${npc(660, 1000, 1, 1321, 13)}
    ${vignette(0.45)}`,

  cep_dukkan: () => `
    ${sky('#9cc6dc', '#c4dae2', '#eee8dc')}
    ${building(-20, 600, 300, 460, '#d8c8b0', { lit: 0.3, seed: 1331 })}${building(720, 600, 300, 480, '#c8b8a8', { lit: 0.3, seed: 1332 })}
    <g stroke="${INK}" stroke-width="${S}"><rect x="280" y="300" width="440" height="300" fill="#e8e4dc"/><rect x="300" y="300" width="400" height="60" fill="#e8402a"/><rect x="310" y="390" width="380" height="200" fill="#a8d0e0"/></g>
    <text x="500" y="342" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="34" fill="#fff">GSM · CEP</text>
    ${[0, 1, 2, 3, 4].map((i) => `<g transform="translate(${350 + i * 70} 500)" stroke="${INK}" stroke-width="3"><rect x="-14" y="-40" width="28" height="70" rx="4" fill="#2a2a2e"/><rect x="-10" y="-30" width="20" height="18" fill="#9ad0a0"/><path d="M8 -40 v-20" stroke-width="4"/></g>`).join('')}
    <path d="M0 600 H1000 V1000 H0Z" fill="#a8a094" stroke="${INK}" stroke-width="${S}"/>
    <g stroke="${INK}" stroke-width="5"><path d="M860 600 V180" stroke="#8a8e96" stroke-width="10"/>${[200, 240, 280].map((y) => `<path d="M830 ${y} H890" stroke="#8a8e96" stroke-width="6"/>`).join('')}</g>
    ${npc(280, 1000, 1, 1341, 13)}${npc(720, 1000, 1, 1342, 13, { flip: true })}
    ${vignette(0.3)}`,

  internet_kafe: () => `
    ${interior('#2a2a3a', '#3a3440', { beam: '#1a1a24' })}
    ${[0, 1, 2].map((i) => `${crt(220 + i * 290, 520, 0.85, ['#7ad0ff', '#3aff8a', '#ffb03a'][i])}${light(220 + i * 290, 500, 160, '#7ad0ff', 0.25)}`).join('')}
    <path d="M60 640 H940 V670 H60Z" fill="#5a4a3a" stroke="${INK}" stroke-width="${S}"/>
    <g stroke="${INK}" stroke-width="4"><rect x="380" y="200" width="240" height="70" rx="10" fill="#1a1a24"/></g>
    <text x="500" y="246" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="30" fill="#3ad1ff">İNTERNET</text>
    ${npc(220, 1000, 1, 1351, 13)}${npc(500, 990, 0.95, 1352, 13)}${npc(790, 1000, 1, 1353, 13, { flip: true })}
    ${vignette(0.5)}`,

  korfez_gece: () => `
    ${sky('#0e1430', '#1e2448', '#3a3858')}
    ${stars(40, 1361, 380)}
    <circle cx="780" cy="200" r="40" fill="#f6f0d8" stroke="${INK}" stroke-width="4"/>
    ${hill('M0 440 Q300 380 600 420 T1000 400 L1000 520 L0 520Z', '#1e2a3a')}
    ${[...Array(30)].map((_, i) => `<circle cx="${20 + i * 33}" cy="${450 + (i % 4) * 12}" r="3" fill="#ffd98a"/>`).join('')}
    ${sea(510, '#1e3a5a', '#0e1e30')}
    ${building(-20, 820, 240, 280, '#4a4a5a', { lit: 0.5, seed: 1362 })}${building(240, 820, 200, 220, '#5a5468', { lit: 0.4, seed: 1363 })}${building(760, 820, 260, 300, '#4a4a5a', { lit: 0.35, seed: 1364 })}
    <path d="M0 820 H1000 V1000 H0Z" fill="#2a2a32" stroke="${INK}" stroke-width="${S}"/>
    ${npc(560, 1000, 1, 1365, 13)}
    ${vignette(0.55)}`,

  deprem_gece: () => `
    ${sky('#1a1a24', '#2a2a32', '#4a4440')}
    <g opacity=".6">${[0, 1, 2, 3].map((i) => puff(200 + i * 200, 380 - (i % 2) * 40, 130 + i * 14, '#8a847a', 'a-smoke', i * 0.7, 0.75)).join('')}</g>
    <g stroke="${INK}" stroke-width="${S}" stroke-linejoin="round">
      <path d="M40 760 L60 420 L260 380 L300 760Z" fill="#5a5450" transform="rotate(-6 170 600)"/>
      <path d="M640 760 L700 360 L900 420 L920 760Z" fill="#4a4642" transform="rotate(8 780 560)"/>
      <path d="M200 860 L320 700 L480 740 L560 660 L700 720 L820 860Z" fill="#6a645e"/>
    </g>
    ${[[300, 760, 30], [420, 720, -20], [600, 740, 12], [520, 800, -40], [700, 790, 25]].map(([x, y, a]) => `<rect x="${x}" y="${y}" width="90" height="14" fill="#8a8e96" stroke="${INK}" stroke-width="3" transform="rotate(${a} ${x} ${y})"/>`).join('')}
    <path d="M0 860 H1000 V1000 H0Z" fill="#3a3632" stroke="${INK}" stroke-width="${S}"/>
    ${[[260, 600], [720, 560], [480, 640]].map(([x, y], i) => `<path d="M${x} ${y} L${x + 180 - i * 60} ${y + 260}" stroke="#fff6c8" stroke-width="40" opacity=".12"/><circle cx="${x}" cy="${y}" r="8" fill="#fff6c8"/>`).join('')}
    ${[...Array(5)].map((_, i) => silhouette(180 + i * 160, 960 - (i % 2) * 20, 0.6, '#1a1612')).join('')}
    ${vignette(0.6)}`,

  cadir_kent: () => `
    ${sky('#f0c898', '#f4dcb8', '#f2ead8')}
    ${hill('M0 460 Q500 420 1000 460 L1000 1000 L0 1000Z', '#a8a07a')}
    ${haze(400, 520, '#f2ead8', 0.4)}
    ${(() => { let o = ''; for (let r = 0; r < 4; r++) for (let i = 0; i < 6; i++) { const sc = 0.5 + r * 0.25, x = 80 + i * 170 + (r % 2) * 80, y = 520 + r * 110; o += `<g transform="translate(${x} ${y}) scale(${sc})" stroke="${INK}" stroke-width="4"><path d="M-80 0 L0 -90 L80 0Z" fill="${['#e8e4dc', '#d8d0c0', '#c8d0d8'][(r + i) % 3]}"/><path d="M0 -90 L0 0" stroke-width="3"/><path d="M-14 0 L0 -40 L14 0Z" fill="#5a5450"/><path d="M-12 -110 h24 v12 h-24Z" fill="#d81e2c" stroke-width="2"/></g>`; } return o; })()}
    <g stroke="${INK}" stroke-width="4"><rect x="700" y="700" width="220" height="90" fill="#f2f2ea"/><path d="M780 720 h40 v14 h14 v40 h-14 v14 h-40 v-14 h-14 v-40 h14Z" fill="#d81e2c"/></g>
    ${npc(260, 1000, 1, 1371, 13)}${npc(560, 1000, 1, 1372, 13, { flip: true })}
    ${vignette(0.3)}`,

  ofis2000: () => `
    ${interior('#e4e8ec', '#8a8e94', { beam: '#c8ccd0', window: true })}
    ${building(640, 460, 140, 220, '#8a9aa8', { lit: 0.3, seed: 1381 })}
    ${[0, 1, 2].map((i) => `<g stroke="${INK}" stroke-width="4"><rect x="${140 + i * 260}" y="640" width="220" height="24" fill="#c8b896"/><path d="M${150 + i * 260} 664 V780 M${350 + i * 260} 664 V780" stroke-width="8"/><rect x="${190 + i * 260}" y="540" width="120" height="84" rx="6" fill="#1a1a22"/><rect x="${198 + i * 260}" y="548" width="104" height="66" fill="${['#7ad0ff', '#a8e8c8', '#ffe39a'][i]}" class="a-glow"/><path d="M${240 + i * 260} 624 v16 h20 v-16" fill="#3a3a42"/></g>`).join('')}
    ${npc(330, 1000, 1, 1382, 13)}${npc(720, 1000, 1, 1383, 13, { flip: true })}
    ${vignette(0.35)}`,

  ev2008: () => `
    ${interior('#d8ccb8', '#9a7a5a', { beam: '#6b5a48', window: true })}
    ${building(180, 420, 120, 180, '#5a6a7a', { lit: 0.6, seed: 1391 })}
    <g stroke="${INK}" stroke-width="${S}"><path d="M360 760 V600 Q360 560 400 560 H860 Q900 560 900 600 V760Z" fill="#3a6a8a"/><rect x="340" y="660" width="580" height="100" rx="20" fill="#2a5a7a"/>${[460, 640, 800].map((x) => `<rect x="${x - 60}" y="600" width="120" height="70" rx="16" fill="#4a7a9a"/>`).join('')}</g>
    <g stroke="${INK}" stroke-width="4"><rect x="120" y="760" width="200" height="16" fill="#8a6440"/><path d="M140 776 V840 M300 776 V840" stroke-width="8"/><path d="M150 760 L170 700 H270 L290 760Z" fill="#c8ccd4"/><rect x="176" y="706" width="88" height="48" fill="#7ad0ff" class="a-glow"/></g>
    <rect x="560" y="300" width="300" height="180" rx="10" fill="#1a1a22" stroke="${INK}" stroke-width="${S}"/><rect x="574" y="314" width="272" height="152" fill="#3a5a8a"/>
    ${npc(640, 1000, 1, 1392, 13)}
    ${vignette(0.4)}`,
});
Object.assign(FOCUS, {
  kampus: [520, 560, 860], bilgisayar_odasi: [480, 520, 860], cep_dukkan: [500, 480, 860], internet_kafe: [500, 480, 860],
  korfez_gece: [500, 560, 860], deprem_gece: [500, 600, 860], cadir_kent: [500, 640, 820], ofis2000: [480, 560, 860], ev2008: [560, 560, 860],
});

// ---------- ÇAĞ 14: YAKIN GELECEK ----------
function tower(x, y, w, h, c, seed) {
  const r = rnd(seed);
  let o = `<g stroke="${INK}" stroke-width="${S}"><path d="M${x} ${y} V${y - h} Q${x + w / 2} ${y - h - 40} ${x + w} ${y - h} V${y}Z" fill="${c}"/>`;
  for (let i = 0; i < h / 30; i++) o += `<path d="M${x + 6} ${y - 20 - i * 30} H${x + w - 6}" stroke="${r() < 0.5 ? '#7ae8ff' : '#2a3a5a'}" stroke-width="5" opacity=".8"/>`;
  return o + `</g>`;
}
function solarRoof(x, y, w) {
  return `<g stroke="${INK}" stroke-width="3">${[...Array(Math.floor(w / 40))].map((_, i) => `<path d="M${x + i * 40} ${y} l20 -16 h18 l-20 16Z" fill="#2a4a8a"/>`).join('')}</g>`;
}

Object.assign(SCENES, {
  istanbul2041: () => `
    ${sky('#f0a060', '#f6c088', '#f8e0b8')}
    <circle cx="200" cy="220" r="70" fill="#fff0c0" stroke="${INK}" stroke-width="${S}"/>${light(200, 220, 300, '#ffd890', 0.45)}
    ${hill('M0 420 Q300 360 600 400 T1000 380 L1000 520 L0 520Z', '#8a8a7a')}
    <g opacity=".85">${mosque(300, 400, 40)}${tower(560, 470, 60, 240, '#c8d4e0', 1401)}${tower(640, 470, 70, 300, '#b8c8d8', 1402)}${tower(730, 470, 60, 210, '#d8e0e8', 1403)}</g>
    ${haze(380, 520, '#f8e0b8', 0.4)}
    ${sea(510, '#3a8ab0', '#1f4f6e')}
    <g class="a-bob" stroke="${INK}" stroke-width="4"><path d="M300 700 L320 730 H680 L700 700Z" fill="#f2f2f2"/><rect x="360" y="660" width="280" height="40" rx="10" fill="#e8eef4"/>${solarRoof(370, 660, 260)}<path d="M330 715 H670" stroke="#7ae8ff" stroke-width="4"/></g>
    <path d="M-20 1000 V800 Q300 760 600 800 Q800 820 1020 790 V1000Z" fill="#b8b4a8" stroke="${INK}" stroke-width="${S}"/>
    ${npc(220, 1000, 1, 1411, 14)}${npc(800, 1000, 1, 1412, 14, { flip: true })}
    ${vignette(0.3)}`,

  ai_oda: () => `
    <rect width="1000" height="1000" fill="#141826"/>
    ${light(500, 420, 520, '#7ae8ff', 0.3, 'a-glow')}
    <path d="M0 760 H1000 V1000 H0Z" fill="#202436" stroke="${INK}" stroke-width="${S}"/>
    <g opacity=".9">${[[200, 260, '#7ae8ff'], [420, 220, '#b57bff'], [640, 260, '#7ae8ff']].map(([x, y, c], i) => `<g class="a-bob" style="animation-delay:${i * 0.5}s"><rect x="${x}" y="${y}" width="160" height="200" rx="10" fill="${c}" opacity=".18" stroke="${c}" stroke-width="3"/>${[0, 1, 2].map((k) => `<rect x="${x + 16}" y="${y + 16 + k * 60}" width="128" height="44" rx="6" fill="${c}" opacity=".35"/><circle cx="${x + 40}" cy="${y + 38 + k * 60}" r="12" fill="#e8f6ff" opacity=".8"/>`).join('')}</g>`).join('')}</g>
    <g stroke="${INK}" stroke-width="4"><ellipse cx="500" cy="760" rx="220" ry="40" fill="#2a2e44"/><circle cx="500" cy="620" r="60" fill="none" stroke="#b57bff" stroke-width="6" class="a-glow"/><circle cx="500" cy="620" r="24" fill="#b57bff" opacity=".6"/></g>
    ${npc(250, 1000, 1, 1421, 14)}${npc(760, 1000, 1, 1422, 14, { flip: true })}
    ${vignette(0.5)}`,

  cay_bahce: () => `
    ${sky('#a8c4cc', '#c8d8d8', '#e8ece4')}
    ${cloud(300, 260, 1.6, '#f2f4f2', 0.9)}${cloud(780, 220, 1.3, '#f2f4f2', 0.85)}
    ${hill('M-20 600 L-20 300 Q200 220 420 320 Q640 200 1020 280 V600Z', '#3a6a3a')}
    ${(() => { let o = ''; for (let r = 0; r < 9; r++) o += `<path d="M-20 ${360 + r * 70} Q300 ${330 + r * 70} 600 ${360 + r * 70} T1020 ${350 + r * 70}" fill="none" stroke="${r % 2 ? '#4a8a3a' : '#5a9a4a'}" stroke-width="44" stroke-linecap="round"/>`; return o; })()}
    ${haze(300, 500, '#e8ece4', 0.4)}
    <g stroke="${INK}" stroke-width="4">${(narrowView() ? [[viewBand().x + viewBand().w * 0.52, 560], [viewBand().x + viewBand().w * 0.7, 600], [viewBand().x + viewBand().w * 0.87, 640]] : [[640, 560], [760, 600], [880, 640]]).map(([x, y]) => `<g class="a-run"><rect x="${x - 30}" y="${y - 30}" width="60" height="40" rx="8" fill="#e8eef4"/><circle cx="${x - 18}" cy="${y + 14}" r="10" fill="#3a3a42"/><circle cx="${x + 18}" cy="${y + 14}" r="10" fill="#3a3a42"/><path d="M${x} ${y - 30} V${y - 56} L${x + 26} ${y - 66}" fill="none" stroke-width="5"/><circle cx="${x}" cy="${y - 16}" r="6" fill="#7ae8ff"/></g>`).join('')}</g>
    <g stroke="${INK}" stroke-width="${S}"><rect x="60" y="440" width="160" height="110" fill="#e8dcc8"/><path d="M50 440 L140 390 L230 440Z" fill="#8a3a2a"/><rect x="90" y="470" width="40" height="40" fill="#ffe39a"/></g>
    ${npc(300, 1000, 1, 1431, 14)}
    ${vignette(0.3)}`,

  dalis: () => `
    <defs><linearGradient id="dal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a8ab0"/><stop offset="1" stop-color="#0a1e34"/></linearGradient></defs>
    <rect width="1000" height="1000" fill="url(#dal)"/>
    ${[...Array(6)].map((_, i) => `<path d="M${100 + i * 160} 0 L${60 + i * 160} 700" stroke="#bfe8f8" stroke-width="30" opacity=".06"/>`).join('')}
    ${[...Array(18)].map((_, i) => `<circle class="a-bob" style="animation-delay:${(i * 0.2).toFixed(1)}s" cx="${(i * 57) % 1000}" cy="${200 + (i * 91) % 600}" r="${3 + (i % 3) * 2}" fill="none" stroke="#bfe8f8" stroke-width="2" opacity=".6"/>`).join('')}
    <path d="M-20 1000 V800 Q300 760 600 790 Q800 810 1020 780 V1000Z" fill="#c8b890" stroke="${INK}" stroke-width="${S}"/>
    ${texture(0, 820, 1000, 1000, 40, '#a8986e', 1441, 16)}
    <g stroke="${INK}" stroke-width="${S}" transform="translate(520 800) rotate(-10)"><path d="M-70 -60 L70 -60 L80 40 L-80 40Z" fill="#8a8478"/><circle cx="0" cy="-20" r="18" fill="#3a3632"/><path d="M-60 -50 q30 -20 60 0" fill="none" stroke="#5a8a4a" stroke-width="8"/><circle cx="50" cy="20" r="10" fill="#c96a5a"/></g>
    ${[[200, 860], [800, 870]].map(([x, y]) => `<path d="M${x} ${y} q-10 -60 6 -110 M${x + 10} ${y} q14 -50 -4 -90" fill="none" stroke="#3a8a5a" stroke-width="8" class="a-sway"/>`).join('')}
    ${light(520, 760, 260, '#fff6c8', 0.4)}
    ${silhouette(820, 560, 0.6, '#0a1420')}
    ${vignette(0.6)}`,

  gobekli2049: () => `
    ${sky('#f2b36e', '#f6cf92', '#f6e3bd')}
    <circle cx="820" cy="200" r="60" fill="#fff3c4" stroke="${INK}" stroke-width="${S}"/>${light(820, 200, 240, '#fff3c4', 0.5)}
    ${hill('M0 470 Q200 420 420 450 T1000 440 L1000 640 L0 640Z', '#c9a46c')}
    <g stroke="${INK}" stroke-width="${S}"><path d="M-20 300 Q250 220 500 250 Q750 220 1020 300 L1020 330 Q750 260 500 280 Q250 260 -20 330Z" fill="#f4f2ec"/>${[60, 260, 500, 740, 940].map((x) => `<path d="M${x} ${x === 500 ? 280 : 300} V620" stroke="#c8ccd4" stroke-width="10"/>`).join('')}</g>
    <path d="M0 620 H1000 V1000 H0Z" fill="#c8a878" stroke="${INK}" stroke-width="${S}"/>
    <ellipse cx="500" cy="760" rx="380" ry="110" fill="#b8956a" stroke="${INK}" stroke-width="${S}"/>
    ${pillar(330, 760, 180, 52, '#c2ab84', { arms: true, relief: 'tilki' })}${pillar(500, 740, 200, 58, '#c8b08a', { arms: true, relief: 'domuz' })}${pillar(680, 770, 170, 50, '#bca47c', { arms: true, relief: 'akbaba', side: 'left' })}
    <path d="M60 900 H940" stroke="#8a6440" stroke-width="14"/><path d="M60 880 H940" stroke="#8a6440" stroke-width="4"/>${[...Array(12)].map((_, i) => `<path d="M${80 + i * 76} 880 V900" stroke="#8a6440" stroke-width="4"/>`).join('')}
    ${npc(820, 1000, 0.95, 1451, 14, { flip: true })}
    ${vignette(0.3)}`,

  gobekli_gece: () => `
    ${sky('#0e1430', '#1a1e3e', '#2e2a48')}
    ${milkyway()}${stars(60, 1461, 520)}
    ${hill('M0 520 Q300 480 600 500 T1000 490 L1000 640 L0 640Z', '#1e1a24')}
    <path d="M-20 300 Q250 220 500 250 Q750 220 1020 300 L1020 330 Q750 260 500 280 Q250 260 -20 330Z" fill="#3a3a48" stroke="${INK}" stroke-width="${S}" opacity=".7"/>
    <path d="M0 620 H1000 V1000 H0Z" fill="#2a2220" stroke="${INK}" stroke-width="${S}"/>
    ${pillar(300, 780, 180, 52, '#6a5a4a', { arms: true })}${pillar(700, 790, 170, 50, '#6a5a4a', { arms: true, side: 'left' })}
    ${fire(500, 860, 1.0)}
    ${vignette(0.55)}`,
});
Object.assign(FOCUS, {
  istanbul2041: [520, 560, 860], ai_oda: [500, 500, 860], cay_bahce: [460, 560, 860], dalis: [520, 700, 860],
  gobekli2049: [500, 620, 880], gobekli_gece: [500, 640, 860],
});

export { wall, interior, horse, chariot, lion };
