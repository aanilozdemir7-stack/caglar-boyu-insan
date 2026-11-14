// Çağ 4-10 sahneleri. Ortak çizim parçaları scenes.js'ten gelir.
import {
  SCENES, FOCUS, S, INK, shade, sky, vignette, light, haze, rnd, stars, milkyway, cloud, hill, texture, grass, rock,
  shadow, fire, npc, silhouette, donkey, house2, tablets,
} from './scenes.js';

// ---------- Ortak parçalar ----------
export function sea(y, top = '#3f86a8', bottom = '#1f4f6e') {
  const id = 'sea' + Math.floor(Math.random() * 1e9);
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

export { wall, interior, horse, chariot, lion };
