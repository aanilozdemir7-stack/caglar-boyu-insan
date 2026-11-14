// Çağ 4-10 sahneleri. Ortak çizim parçaları scenes.js'ten gelir.
import {
  SCENES, FOCUS, S, INK, shade, sky, vignette, light, haze, rnd, stars, milkyway, cloud, hill, texture, grass, rock,
  shadow, fire, npc, silhouette, donkey, house2, tablets,
} from './scenes.js';

// ---------- Ortak parçalar ----------
let sid = 0;
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
    <g fill="#d8c8a0" opacity=".7"><circle class="a-dust" cx="300" cy="560" r="30"/><circle class="a-dust" style="animation-delay:.6s" cx="700" cy="560" r="36"/><circle class="a-dust" style="animation-delay:1.2s" cx="500" cy="540" r="40"/></g>
    <g class="a-run" style="animation-delay:.5s" opacity=".85">${chariot(140, 560, 0.5)}</g>
    <g class="a-run" style="animation-delay:1s" opacity=".85">${chariot(700, 545, 0.45)}</g>
    <g class="a-run">${npc(330, 640, 0.42, 451, 4)}${chariot(410, 720, 1.0)}</g>
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

export { wall, interior, horse, chariot, lion };
