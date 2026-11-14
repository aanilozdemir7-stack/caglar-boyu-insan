// Kodla çizilen sahneler. Arka plan 1000x1000 çizilir ve ekranı doldurur
// (önemli öğeler ortadaki 460x460'lık alanda durur ki dikey ve yatay ekranda da görünsün).
// POV elleri ayrı bir katmandır ve her zaman ekranın altına yaslanır.
import { INK, SKIN, avatarParts, outfitColors } from './avatar.js';

const S = 5; // kontur kalınlığı

// ---------- Ortak parçalar ----------

function sky(id, top, bottom) {
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs>
    <rect width="1000" height="1000" fill="url(#${id})"/>`;
}

function stars(n = 26, seed = 7) {
  let s = '', r = seed;
  const rnd = () => ((r = (r * 9301 + 49297) % 233280) / 233280);
  for (let i = 0; i < n; i++) {
    const x = rnd() * 1000, y = rnd() * 420, rad = 1.5 + rnd() * 2.5, d = (rnd() * 3).toFixed(2);
    s += `<circle class="a-twinkle" style="animation-delay:${d}s" cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${rad.toFixed(1)}" fill="#f3e9c6"/>`;
  }
  return s;
}

const RELIEF = {
  tilki: `<path d="M-30 10 Q-10 -18 22 -8 L34 -22 L36 -4 Q40 8 26 14 L-24 18 Q-40 18 -30 10Z" fill="none" stroke-width="4"/><path d="M-26 16 Q-46 30 -54 10" fill="none" stroke-width="4"/>`,
  domuz: `<path d="M-34 6 Q-30 -20 6 -18 Q34 -16 36 2 L44 4 L36 12 Q20 22 -20 20 Q-36 18 -34 6Z" fill="none" stroke-width="4"/><path d="M-22 20 v12 M20 20 v12" stroke-width="4"/>`,
  akbaba: `<path d="M0 -20 L-40 0 L-12 4 L0 26 L12 4 L40 0 Z" fill="none" stroke-width="4"/><circle cx="0" cy="-24" r="6" fill="none" stroke-width="4"/>`,
  yilan: `<path d="M0 -40 q14 10 0 20 q-14 10 0 20 q14 10 0 20" fill="none" stroke-width="4"/>`,
};

function pillar(x, base, h, w, stone, relief, scale = 1) {
  const capH = w * 0.55, cw = w * 2.3;
  const rel = relief ? `<g transform="translate(${x} ${base - h * 0.55}) scale(${(w / 110) * scale})" stroke="${INK}" stroke-opacity=".75">${RELIEF[relief]}</g>` : '';
  return `<g stroke="${INK}" stroke-width="${S}" stroke-linejoin="round">
    <rect x="${x - w / 2}" y="${base - h}" width="${w}" height="${h}" fill="${stone}"/>
    <rect x="${x - cw / 2}" y="${base - h - capH}" width="${cw}" height="${capH}" rx="6" fill="${stone}"/>
    <path d="M${x - w / 2 + 8} ${base - h + 20} v${h - 40}" stroke-opacity=".25" stroke-width="3"/>
  </g>${rel}`;
}

function fire(x, y, s = 1, id = 'f') {
  return `<defs><radialGradient id="${id}g"><stop offset="0" stop-color="#ffb347" stop-opacity=".7"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient></defs>
  <circle class="a-glow" cx="${x}" cy="${y - 40 * s}" r="${260 * s}" fill="url(#${id}g)"/>
  <g transform="translate(${x} ${y}) scale(${s})">
    <g stroke="${INK}" stroke-width="${S}">
      <rect x="-70" y="-14" width="140" height="22" rx="11" fill="#6b4529" transform="rotate(-14)"/>
      <rect x="-70" y="-14" width="140" height="22" rx="11" fill="#7a5030" transform="rotate(14)"/>
    </g>
    <path class="a-flame" d="M0 -150 C46 -86 62 -40 32 -6 L-32 -6 C-62 -40 -46 -86 0 -150Z" fill="#f08a24" stroke="${INK}" stroke-width="${S}"/>
    <path class="a-flame2" d="M0 -92 C24 -60 30 -32 16 -6 L-16 -6 C-30 -32 -24 -60 0 -92Z" fill="#ffd34d"/>
    <g fill="#ffd34d"><circle class="a-spark" cx="-18" cy="-140" r="4"/><circle class="a-spark" style="animation-delay:.6s" cx="20" cy="-130" r="3"/><circle class="a-spark" style="animation-delay:1.1s" cx="4" cy="-160" r="3"/></g>
  </g>`;
}

// Arka plandaki insanlar: sade gövde, nokta gözler.
function person(x, y, s, body, skin, { eyes = true, hair = '#2a1d16', arm = false } = {}) {
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${INK}" stroke-width="${S / s > 7 ? 7 : S}" stroke-linejoin="round">
    <path d="M-34 0 L-40 -90 Q0 -118 40 -90 L34 0Z" fill="${body}"/>
    ${arm ? `<path d="M30 -84 L66 -132" stroke-width="16" stroke-linecap="round" stroke="${INK}"/><path d="M30 -84 L66 -132" stroke-width="9" stroke-linecap="round" stroke="${skin}"/>` : ''}
    <circle cx="0" cy="-128" r="28" fill="${skin}"/>
    <path d="M-28 -132 Q-26 -164 0 -162 Q26 -164 28 -132 Q14 -146 0 -142 Q-14 -146 -28 -132Z" fill="${hair}"/>
    ${eyes ? `<circle cx="-9" cy="-124" r="3.2" fill="${INK}" stroke="none"/><circle cx="9" cy="-124" r="3.2" fill="${INK}" stroke="none"/>` : ''}
  </g>`;
}

function gazelle(x, y, s, color, delay = 0) {
  return `<g class="a-run" style="animation-delay:${delay}s"><g transform="translate(${x} ${y}) scale(${s})" fill="${color}" stroke="${INK}" stroke-width="4" stroke-linejoin="round">
    <path d="M-40 0 Q-36 -26 0 -26 Q30 -26 38 -14 L52 -40 L60 -36 L50 -10 Q46 6 30 6 L-30 8 Q-44 8 -40 0Z"/>
    <path d="M54 -40 l-6 -22 M58 -38 l2 -22" fill="none"/>
    <path class="a-legs" d="M-26 6 l-10 30 M-14 6 l6 30 M22 6 l-8 30 M32 4 l12 28" fill="none"/>
  </g></g>`;
}

// ---------- Sahneler ----------

export const SCENES = {
  gece_ates: (av) => `
    ${sky('sk1', '#0e1330', '#2b2652')}
    ${stars(34, 3)}
    <circle cx="640" cy="250" r="46" fill="#efe3b8" stroke="${INK}" stroke-width="${S}"/>
    <path d="M0 520 Q180 430 380 480 T760 460 T1000 470 L1000 640 L0 640Z" fill="#2c2742" stroke="${INK}" stroke-width="${S}"/>
    <path d="M60 640 Q500 560 940 640" fill="none" stroke="${INK}" stroke-width="${S}" stroke-opacity=".5"/>
    ${pillar(330, 640, 190, 70, '#8f7a5c', 'tilki')}
    ${pillar(680, 640, 200, 74, '#8f7a5c', 'domuz')}
    ${pillar(160, 600, 120, 44, '#6f5f4a')}
    ${pillar(850, 600, 120, 44, '#6f5f4a')}
    <path d="M0 620 Q500 580 1000 620 L1000 1000 L0 1000Z" fill="#3d2b22" stroke="${INK}" stroke-width="${S}"/>
    ${person(220, 760, 0.9, '#5a4029', '#b47a4e', { eyes: false })}
    ${person(800, 760, 0.95, '#6b4a30', '#8d5a35', { eyes: false, hair: '#8a8a8a' })}
    ${fire(500, 720, 1.1, 'ga')}`,

  karanlik: (av) => `
    ${sky('sk2', '#05070f', '#141a2a')}
    ${stars(14, 11)}
    <path d="M0 560 Q250 500 500 540 T1000 520 L1000 1000 L0 1000Z" fill="#14120f" stroke="${INK}" stroke-width="${S}"/>
    ${[120, 300, 700, 880].map((x, i) => `<g class="a-sway" style="animation-delay:${i * 0.4}s"><path d="M${x} 600 L${x - 10} 420 M${x} 470 L${x - 60} 400 M${x} 500 L${x + 50} 430" stroke="#2a241c" stroke-width="18" stroke-linecap="round"/><circle cx="${x - 20}" cy="390" r="70" fill="#1d1a14" stroke="${INK}" stroke-width="${S}"/></g>`).join('')}
    <g fill="#1d1a14" stroke="${INK}" stroke-width="${S}"><ellipse cx="420" cy="740" rx="120" ry="60"/><ellipse cx="610" cy="760" rx="130" ry="62"/></g>
    <g class="a-blink"><circle cx="440" cy="705" r="10" fill="#f2c230"/><circle cx="478" cy="705" r="10" fill="#f2c230"/></g>
    <g class="a-blink" style="animation-delay:1.3s"><circle cx="590" cy="728" r="8" fill="#f2c230"/><circle cx="620" cy="728" r="8" fill="#f2c230"/></g>`,

  sutun_gunduz: (av) => `
    ${sky('sk3', '#f6c98a', '#f3e2bd')}
    <circle cx="820" cy="200" r="60" fill="#fff3c4" stroke="${INK}" stroke-width="${S}"/>
    <path d="M0 470 Q200 420 420 450 T1000 440 L1000 640 L0 640Z" fill="#c9a46c" stroke="${INK}" stroke-width="${S}"/>
    <path d="M0 600 Q500 560 1000 600 L1000 1000 L0 1000Z" fill="#a8835a" stroke="${INK}" stroke-width="${S}"/>
    ${pillar(500, 900, 470, 170, '#d8c29c', 'tilki')}
    ${pillar(170, 640, 150, 56, '#c2ab84')}
    ${person(780, 860, 1.25, '#7b5a3a', '#b47a4e', { arm: true, hair: '#4a2e1c' })}
    <g fill="#f3e2bd" stroke="${INK}" stroke-width="3"><circle class="a-dust" cx="640" cy="640" r="6"/><circle class="a-dust" style="animation-delay:.8s" cx="660" cy="620" r="4"/></g>`,

  av_safak: (av) => `
    ${sky('sk4', '#f08a5d', '#f9d58a')}
    <circle cx="500" cy="470" r="90" fill="#ffe7a8" stroke="${INK}" stroke-width="${S}"/>
    <path d="M0 470 Q200 400 400 450 T800 430 T1000 450 L1000 1000 L0 1000Z" fill="#8a6a4a" stroke="${INK}" stroke-width="${S}"/>
    <path d="M0 560 Q300 520 500 560 T1000 550 L1000 1000 L0 1000Z" fill="#b08b5a" stroke="${INK}" stroke-width="${S}"/>
    ${gazelle(330, 610, 1.1, '#6b4a30', 0)}
    ${gazelle(470, 640, 1.3, '#7b5a3a', .4)}
    ${gazelle(620, 605, 1.0, '#6b4a30', .8)}
    ${person(180, 820, 1.1, '#5a4029', '#8d5a35', { eyes: false, arm: true })}
    <path d="M0 720 Q500 690 1000 720 L1000 1000 L0 1000Z" fill="#c9a46c" stroke="${INK}" stroke-width="${S}"/>
    ${[100, 260, 760, 900].map((x, i) => `<path class="a-sway" style="animation-delay:${i * 0.3}s" d="M${x} 760 q-10 -40 4 -70 M${x + 14} 760 q6 -36 -6 -60" fill="none" stroke="#7a5a30" stroke-width="5" stroke-linecap="round"/>`).join('')}`,

  dere: (av) => `
    ${sky('sk5', '#ef9a6a', '#f6d2a0')}
    <path d="M0 380 Q250 330 500 360 T1000 350 L1000 470 L0 470Z" fill="#6f7f4a" stroke="${INK}" stroke-width="${S}"/>
    <rect x="0" y="460" width="1000" height="540" fill="#3f7f86" stroke="${INK}" stroke-width="${S}"/>
    <g opacity=".82" transform="translate(395 520) scale(1.05)">${avatarParts(av, 1)}</g>
    <rect x="0" y="460" width="1000" height="540" fill="#3f7f86" opacity=".28"/>
    ${[560, 610, 660, 710, 770].map((y, i) => `<path class="a-ripple" style="animation-delay:${i * 0.35}s" d="M${360 + (i % 2) * 20} ${y} q30 -10 60 0 t60 0 t60 0 t60 0" fill="none" stroke="#bfe3e6" stroke-width="5" stroke-linecap="round"/>`).join('')}
    ${[60, 140, 860, 930].map((x, i) => `<path class="a-sway" style="animation-delay:${i * 0.5}s" d="M${x} 480 q-14 -80 6 -150 M${x + 18} 480 q12 -60 -4 -120" fill="none" stroke="#4b5a2a" stroke-width="7" stroke-linecap="round"/>`).join('')}
    <ellipse cx="150" cy="900" rx="120" ry="50" fill="#7d7468" stroke="${INK}" stroke-width="${S}"/>
    <ellipse cx="880" cy="930" rx="140" ry="56" fill="#6d665c" stroke="${INK}" stroke-width="${S}"/>`,

  toplanma: (av) => `
    ${sky('sk6', '#9cc7d8', '#e8e0c8')}
    <path d="M0 430 Q300 380 600 420 T1000 400 L1000 620 L0 620Z" fill="#b8925e" stroke="${INK}" stroke-width="${S}"/>
    <path d="M60 640 Q500 560 940 640" fill="none" stroke="${INK}" stroke-width="${S}" stroke-opacity=".6"/>
    ${pillar(250, 640, 170, 60, '#d1b98f', 'akbaba')}
    ${pillar(760, 640, 170, 60, '#d1b98f', 'yilan')}
    <path d="M0 610 Q500 570 1000 610 L1000 1000 L0 1000Z" fill="#a8835a" stroke="${INK}" stroke-width="${S}"/>
    ${person(400, 800, 1.1, '#4a5a6a', '#d29b6c', { hair: '#1f1612' })}
    ${person(520, 790, 1.15, '#3f4f5c', '#b47a4e', { hair: '#1f1612', arm: true })}
    ${person(630, 805, 1.05, '#4a5a6a', '#e8b98f', { hair: '#4a2e1c' })}
    <path d="M590 646 l14 -30 l12 26 Z" fill="#111" stroke="${INK}" stroke-width="3"/>
    <path class="a-glint" d="M600 630 l6 -8" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`,

  ziyafet: (av) => `
    ${sky('sk7', '#120f26', '#3a2340')}
    ${stars(30, 21)}
    <path d="M0 540 Q250 480 500 520 T1000 500 L1000 660 L0 660Z" fill="#2c2238" stroke="${INK}" stroke-width="${S}"/>
    ${pillar(120, 660, 160, 56, '#7f6a50', 'domuz')}
    ${pillar(880, 660, 160, 56, '#7f6a50', 'tilki')}
    <path d="M0 640 Q500 600 1000 640 L1000 1000 L0 1000Z" fill="#3a271e" stroke="${INK}" stroke-width="${S}"/>
    ${fire(260, 760, 0.6, 'z1')}${fire(740, 760, 0.6, 'z2')}
    ${person(330, 820, 0.8, '#5a4029', '#b47a4e', { eyes: false })}
    ${person(670, 820, 0.8, '#3f4f5c', '#d29b6c', { eyes: false })}
    ${person(420, 860, 0.9, '#6b4a30', '#8d5a35', { eyes: false })}
    ${person(580, 860, 0.9, '#4a5a6a', '#e8b98f', { eyes: false })}
    <g stroke="${INK}" stroke-width="${S}"><path d="M430 700 L570 700" stroke-width="8"/><ellipse cx="500" cy="700" rx="46" ry="22" fill="#9a5a30"/></g>
    ${fire(500, 780, 0.8, 'z3')}`,
};

// ---------- POV elleri ----------

function sleeve(era) {
  const c = outfitColors(era);
  return `<path d="M1060 470 L880 300 L810 360 L960 470Z" fill="${c.base}" stroke="${INK}" stroke-width="${S}" stroke-linejoin="round"/>
    <path d="M900 330 l18 -10 M930 370 l18 -10 M960 410 l18 -10 M870 360 l16 -8" stroke="${c.dark}" stroke-width="4" stroke-linecap="round"/>`;
}

function openHand(skin) {
  return `<g transform="translate(815 318) rotate(-38)" stroke="${INK}" stroke-width="${S}" stroke-linejoin="round">
    <path d="M-44 -26 Q-46 -62 -30 -64 Q-22 -64 -20 -40 L-18 -70 Q-16 -84 -4 -82 Q6 -80 4 -62 L6 -74 Q10 -86 22 -82 Q30 -78 28 -58 L30 -62 Q36 -72 44 -66 Q52 -60 46 -36 L44 10 Q40 34 6 36 L-26 34 Q-50 30 -48 6 Z" fill="${skin}"/>
    <path d="M-44 4 Q-74 -6 -76 14 Q-74 30 -44 26" fill="${skin}"/>
  </g>`;
}

function fist(skin) {
  return `<g transform="translate(815 318) rotate(-38)" stroke="${INK}" stroke-width="${S}" stroke-linejoin="round">
    <rect x="-46" y="-40" width="92" height="74" rx="28" fill="${skin}"/>
    <path d="M-20 -40 v22 M4 -40 v22 M26 -38 v20" stroke-width="3.5"/>
    <path d="M-46 -6 Q-70 -14 -66 10 Q-60 26 -36 18" fill="${skin}"/>
  </g>`;
}

function arm(content) { return content; }
function mirror(content) { return `<g transform="translate(1000 0) scale(-1 1)">${content}</g>`; }

export function hands(pose, av, era = 1) {
  const skin = SKIN[av.skin] ?? SKIN[2];
  const R = (h) => arm(sleeve(era) + h);
  let left = '', right = '', extra = '';
  switch (pose) {
    case 'mizrak':
      extra = `<g stroke="${INK}" stroke-width="${S}"><path d="M720 -260 L930 470" stroke="#6b4529" stroke-width="22" stroke-linecap="round"/><path d="M720 -260 L930 470" stroke="${INK}" stroke-width="4" stroke-opacity=".4"/>
        <path d="M708 -300 L744 -250 L712 -236 Z" fill="#3a3a3a"/></g>`;
      right = R(fist(skin)); left = mirror(R(openHand(skin)));
      break;
    case 'kalem':
      right = R(fist(skin)) + `<path d="M760 250 L700 214 L716 196 L776 236 Z" fill="#8a8a8a" stroke="${INK}" stroke-width="${S}" stroke-linejoin="round"/>`;
      left = mirror(R(openHand(skin)));
      break;
    case 'mesale':
      extra = `<path d="M790 300 L700 120" stroke="#6b4529" stroke-width="24" stroke-linecap="round"/><path d="M790 300 L700 120" stroke="${INK}" stroke-width="4" stroke-opacity=".4"/>
        <g transform="translate(700 120) scale(.7)"><path class="a-flame" d="M0 -150 C46 -86 62 -40 32 -6 L-32 -6 C-62 -40 -46 -86 0 -150Z" fill="#f08a24" stroke="${INK}" stroke-width="${S}"/><path class="a-flame2" d="M0 -92 C24 -60 30 -32 16 -6 L-16 -6 C-30 -32 -24 -60 0 -92Z" fill="#ffd34d"/></g>`;
      right = R(fist(skin));
      break;
    case 'dinlen':
      right = `<g transform="translate(0 120)">${R(openHand(skin))}</g>`;
      left = mirror(`<g transform="translate(0 120)">${R(openHand(skin))}</g>`);
      break;
    case 'yok':
      return '';
    default: // 'uzan'
      right = R(openHand(skin)); left = mirror(R(openHand(skin)));
  }
  return `<svg class="hands" viewBox="120 0 760 470" preserveAspectRatio="xMidYMax meet" overflow="visible" aria-hidden="true">${extra}${left}${right}</svg>`;
}

export function sceneSVG(key, av) {
  const fn = SCENES[key] || SCENES.gece_ates;
  return `<svg class="bg" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${fn(av)}</svg>`;
}
