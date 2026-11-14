// Katmanlı 2D avatar. Her parça ayrı seçilir; çizim tamamen koddur.
// Koordinat sistemi: 200 x 222, baş merkezi (100, 96).
export const INK = '#1a1410';

export const SKIN = ['#f6dcc4', '#f0cba6', '#e6b68c', '#d9a274', '#c68b5c', '#b07548', '#97603a', '#7d4c2e', '#633a22', '#4a2a18'];
export const HAIR_COLORS = ['#141010', '#2e1e16', '#4a2e1c', '#6e4424', '#94602e', '#b8843e', '#d8b46a', '#a8432a', '#9a9a96', '#e8e4dc'];
export const EYE_COLORS = ['#4a2e1c', '#7a5a2a', '#3f7a4a', '#3a6ea5', '#6f8a96', '#1a1410'];

// Kategoriler: [anahtar, başlık, seçenekler] ya da [anahtar, başlık, 'swatch', renkler]
export const CATEGORIES = [
  ['skin', 'Ten', 'swatch', SKIN],
  ['face', 'Yüz', [['oval', 'Oval'], ['yuvarlak', 'Yuvarlak'], ['koseli', 'Köşeli'], ['kalp', 'Kalp'], ['uzun', 'Uzun']]],
  ['eyes', 'Gözler', [['badem', 'Badem'], ['yuvarlak', 'Yuvarlak'], ['iri', 'İri'], ['cekik', 'Çekik'], ['nokta', 'Nokta']]],
  ['eyeColor', 'Göz rengi', 'swatch', EYE_COLORS],
  ['brows', 'Kaşlar', [['kavisli', 'Kavisli'], ['duz', 'Düz'], ['kalin', 'Kalın'], ['ince', 'İnce'], ['catik', 'Çatık']]],
  ['nose', 'Burun', [['kucuk', 'Küçük'], ['kemerli', 'Kemerli'], ['genis', 'Geniş'], ['sivri', 'Sivri']]],
  ['mouth', 'Ağız', [['gulumseme', 'Gülümseme'], ['duz', 'Düz'], ['dolgun', 'Dolgun'], ['ciddi', 'Ciddi'], ['sirit', 'Sırıtma']]],
  ['hair', 'Saç', [['kisa', 'Kısa'], ['yan', 'Yana taralı'], ['daginik', 'Dağınık'], ['kivircik', 'Kıvırcık'], ['uzun', 'Uzun'], ['orgu', 'Örgülü'], ['atkuyrugu', 'At kuyruğu'], ['topuz', 'Topuz'], ['kel', 'Kel']]],
  ['hairColor', 'Saç rengi', 'swatch', HAIR_COLORS],
  ['beard', 'Sakal', [['yok', 'Yok'], ['biyik', 'Bıyık'], ['kirli', 'Kirli sakal'], ['keci', 'Keçi sakalı'], ['kisa', 'Kısa'], ['uzun', 'Uzun']]],
  ['mark', 'İz', [['yok', 'Yok'], ['cil', 'Çil'], ['ben', 'Ben'], ['yara', 'Yara izi']]],
  ['paint', 'Boya', [['yok', 'Yok'], ['okra', 'Okra çizgi'], ['alin', 'Alın noktaları'], ['maske', 'Göz bandı']]],
  ['jewel', 'Takı', [['yok', 'Yok'], ['kemik', 'Kemik kolye'], ['boncuk', 'Boncuk kolye'], ['tuy', 'Saçta tüy'], ['kupe', 'Küpe']]],
];

export const DEFAULT_AVATAR = {
  skin: 4, face: 'oval', eyes: 'badem', eyeColor: 0, brows: 'kavisli', nose: 'kucuk', mouth: 'gulumseme',
  hair: 'kisa', hairColor: 2, beard: 'yok', mark: 'yok', paint: 'yok', jewel: 'yok',
};

// Eski kayıtlarla uyum: eksik alanları varsayılanla doldur.
export function normalizeAvatar(av = {}) {
  const a = { ...DEFAULT_AVATAR, ...av };
  if (!(a.skin >= 0 && a.skin < SKIN.length)) a.skin = 4;
  if (!(a.hairColor >= 0 && a.hairColor < HAIR_COLORS.length)) a.hairColor = 2;
  return a;
}

export function randomAvatar(rnd = Math.random) {
  const a = {};
  for (const [k, , opts, list] of CATEGORIES) {
    const arr = opts === 'swatch' ? list.map((_, i) => i) : opts.map((o) => o[0]);
    a[k] = arr[Math.floor(rnd() * arr.length)];
  }
  // Doğal görünüm için uç seçenekleri seyrek tut
  if (rnd() < 0.6) a.paint = 'yok';
  if (rnd() < 0.6) a.mark = 'yok';
  if (rnd() < 0.5) a.jewel = 'yok';
  if (a.hairColor >= 8 && rnd() < 0.7) a.hairColor = 2;
  return a;
}

export function seeded(seed) {
  let r = seed % 233280;
  return () => ((r = (r * 9301 + 49297) % 233280) / 233280);
}

// ---------- Renk yardımcıları ----------
export function shade(hex, f) {
  const n = parseInt(hex.slice(1), 16);
  let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  const t = f < 0 ? 0 : 255, p = Math.abs(f);
  r = Math.round((t - r) * p + r); g = Math.round((t - g) * p + g); b = Math.round((t - b) * p + b);
  return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

let uid = 0;
const CX = 100, CY = 96;
const DIM = { yuvarlak: [53, 55], oval: [47, 60], koseli: [51, 57], kalp: [52, 58], uzun: [44, 64] };
const W = 4; // kontur

function headPath(face) {
  const [rx, ry] = DIM[face] || DIM.oval;
  const L = CX - rx, R = CX + rx, T = CY - ry, B = CY + ry;
  switch (face) {
    case 'koseli':
      return `M${L + 18} ${T} H${R - 18} Q${R} ${T} ${R} ${T + 22} V${B - 26} Q${R} ${B - 4} ${R - 22} ${B} H${L + 22} Q${L} ${B - 4} ${L} ${B - 26} V${T + 22} Q${L} ${T} ${L + 18} ${T}Z`;
    case 'kalp':
      return `M${CX} ${T} C${R + 6} ${T} ${R + 2} ${CY + 6} ${R - 6} ${CY + 22} C${R - 18} ${B - 8} ${CX + 14} ${B} ${CX} ${B} C${CX - 14} ${B} ${L + 18} ${B - 8} ${L + 6} ${CY + 22} C${L - 2} ${CY + 6} ${L - 6} ${T} ${CX} ${T}Z`;
    default:
      return `M${CX} ${T} C${R + 2} ${T} ${R} ${CY + ry * 0.55} ${CX + rx * 0.62} ${B - 6} C${CX + 18} ${B + 2} ${CX - 18} ${B + 2} ${CX - rx * 0.62} ${B - 6} C${L} ${CY + ry * 0.55} ${L - 2} ${T} ${CX} ${T}Z`;
  }
}

// ---------- Saç ----------
function hairTop(av, rx, ry, c) {
  const L = CX - rx - 4, R = CX + rx + 4, T = CY - ry - 28, f = CY - ry * 0.42;
  const hi = shade(c, 0.28);
  const cap = (fringe) => `<path d="M${L} ${CY - 2} C${L} ${T} ${R} ${T} ${R} ${CY - 2} ${fringe} Z" fill="${c}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>`;
  const shine = `<path d="M${CX - rx * 0.55} ${CY - ry - 2} Q${CX - rx * 0.1} ${CY - ry - 14} ${CX + rx * 0.35} ${CY - ry - 6}" fill="none" stroke="${hi}" stroke-width="4" stroke-linecap="round" opacity=".8"/>`;
  switch (av.hair) {
    case 'kel':
      return `<path d="M${CX - 22} ${CY - ry + 12} q12 -7 26 -3" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="5" stroke-linecap="round"/>`;
    case 'yan':
      return cap(`L${R - 6} ${f + 8} Q${CX + rx * 0.2} ${f - 18} ${CX - rx * 0.4} ${f + 10} Q${CX - rx * 0.75} ${f + 18} ${L + 6} ${f + 26}`) + shine;
    case 'daginik': {
      const pts = []; const n = 11;
      for (let i = 0; i <= n; i++) {
        const a = Math.PI + (Math.PI * i) / n, r = i % 2 === 0 ? 1.2 : 0.98;
        pts.push(`${(CX + Math.cos(a) * (rx + 6) * r).toFixed(1)} ${(CY - 6 + Math.sin(a) * (ry + 6) * r).toFixed(1)}`);
      }
      return `<path d="M${pts.join(' L')} L${CX + rx - 4} ${f + 4} L${CX + 16} ${f + 14} L${CX + 2} ${f} L${CX - 14} ${f + 14} L${CX - rx + 4} ${f + 6} Z" fill="${c}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>` + shine;
    }
    case 'kivircik': {
      let s = '';
      const n = 14;
      for (let i = 0; i <= n; i++) {
        const a = Math.PI * 0.92 + (Math.PI * 1.16 * i) / n;
        s += `<circle cx="${(CX + Math.cos(a) * (rx + 4)).toFixed(1)}" cy="${(CY - 4 + Math.sin(a) * (ry + 2)).toFixed(1)}" r="15" fill="${c}" stroke="${INK}" stroke-width="${W}"/>`;
      }
      s += `<ellipse cx="${CX}" cy="${CY - ry * 0.62}" rx="${rx * 0.92}" ry="${ry * 0.42}" fill="${c}"/>`;
      for (let i = 0; i < 6; i++) s += `<circle cx="${CX - rx * 0.6 + i * rx * 0.24}" cy="${f + (i % 2) * 6}" r="11" fill="${c}" stroke="${INK}" stroke-width="3"/>`;
      return s + `<path d="M${CX - 20} ${CY - ry - 8} q8 -6 16 0 M${CX + 10} ${CY - ry - 4} q8 -6 16 0" fill="none" stroke="${hi}" stroke-width="3.5" stroke-linecap="round"/>`;
    }
    default:
      return cap(`L${R - 8} ${f} Q${CX + rx * 0.5} ${f + 14} ${CX + rx * 0.2} ${f - 4} Q${CX} ${f + 12} ${CX - rx * 0.3} ${f - 4} Q${CX - rx * 0.6} ${f + 14} ${L + 8} ${f}`) + shine
        + (av.hair === 'topuz' ? `<circle cx="${CX}" cy="${CY - ry - 30}" r="20" fill="${c}" stroke="${INK}" stroke-width="${W}"/><path d="M${CX - 10} ${CY - ry - 36} q10 -8 20 0" fill="none" stroke="${hi}" stroke-width="3.5" stroke-linecap="round"/>` : '');
  }
}

function hairBack(av, rx, ry, c) {
  const dk = shade(c, -0.18);
  if (av.hair === 'uzun') {
    return `<path d="M${CX - rx - 10} ${CY - 12} C${CX - rx - 18} ${CY + 50} ${CX - rx - 10} ${CY + 96} ${CX - rx + 4} ${CY + 112}
      L${CX + rx - 4} ${CY + 112} C${CX + rx + 10} ${CY + 96} ${CX + rx + 18} ${CY + 50} ${CX + rx + 10} ${CY - 12} Z"
      fill="${dk}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>`;
  }
  if (av.hair === 'orgu') {
    let s = '';
    for (let i = 0; i < 6; i++) s += `<ellipse cx="${CX + rx + 4 - i * 1.5}" cy="${CY + 8 + i * 15}" rx="10" ry="10.5" fill="${c}" stroke="${INK}" stroke-width="3.5"/>`;
    return s + `<path d="M${CX + rx - 4} ${CY + 98} l8 14 l8 -14" fill="${shade(c, 0.2)}" stroke="${INK}" stroke-width="3"/>`;
  }
  if (av.hair === 'atkuyrugu') {
    return `<path d="M${CX + rx - 6} ${CY - 30} C${CX + rx + 40} ${CY - 20} ${CX + rx + 30} ${CY + 60} ${CX + rx + 6} ${CY + 92} C${CX + rx + 6} ${CY + 50} ${CX + rx} ${CY} ${CX + rx - 14} ${CY - 18} Z" fill="${dk}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>`;
  }
  return '';
}

// ---------- Yüz parçaları ----------
function eyes(av) {
  const y = CY + 4, xs = [CX - 20, CX + 20];
  const iris = EYE_COLORS[av.eyeColor] ?? EYE_COLORS[0];
  const id = 'e' + (++uid);
  if (av.eyes === 'nokta') {
    return `<g class="a-eyeblink">${xs.map((x) => `<circle cx="${x}" cy="${y}" r="5.5" fill="${INK}"/><circle cx="${x + 1.8}" cy="${y - 1.8}" r="1.6" fill="#fff"/>`).join('')}</g>`;
  }
  const shapes = {
    badem: (x) => [`M${x - 10} ${y} Q${x - 2} ${y - 9} ${x + 10} ${y - 2}`, `Q${x + 2} ${y + 7} ${x - 10} ${y}Z`],
    yuvarlak: (x) => [`M${x - 8.5} ${y} Q${x} ${y - 11} ${x + 8.5} ${y}`, `Q${x} ${y + 11} ${x - 8.5} ${y}Z`],
    iri: (x) => [`M${x - 10.5} ${y} Q${x} ${y - 14} ${x + 10.5} ${y}`, `Q${x} ${y + 13} ${x - 10.5} ${y}Z`],
    cekik: (x) => [`M${x - 10} ${y + 1} Q${x} ${y - 6} ${x + 10} ${y - 1}`, `Q${x} ${y + 4} ${x - 10} ${y + 1}Z`],
  };
  const shp = shapes[av.eyes] || shapes.badem;
  const ir = av.eyes === 'iri' ? 6.5 : av.eyes === 'cekik' ? 4.6 : 5.4;
  return `<defs>${xs.map((x, i) => `<clipPath id="${id}${i}"><path d="${shp(x).join(' ')}"/></clipPath>`).join('')}</defs>
    <g class="a-eyeblink">${xs.map((x, i) => {
      const [top, bot] = shp(x);
      return `<path d="${top} ${bot}" fill="#fbf7ef"/>
      <g clip-path="url(#${id}${i})"><circle cx="${x + 1}" cy="${y}" r="${ir}" fill="${iris}"/><circle cx="${x + 1}" cy="${y}" r="${(ir * 0.48).toFixed(2)}" fill="${INK}"/><circle cx="${x + 2.8}" cy="${y - 2}" r="1.7" fill="#fff"/>
        <rect x="${x - 14}" y="${y - 14}" width="28" height="9" fill="${INK}" opacity=".14"/></g>
      <path d="${top} ${bot}" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="${top}" fill="none" stroke="${INK}" stroke-width="3.8" stroke-linecap="round"/>`;
    }).join('')}</g>`;
}

function brows(av, c) {
  const y = CY - 13;
  return [-1, 1].map((d) => {
    const x = CX + d * 20, o = d * 11;
    switch (av.brows) {
      case 'kalin': return `<path d="M${x - o} ${y + 1} Q${x} ${y - 5} ${x + o} ${y - 1}" fill="none" stroke="${c}" stroke-width="7.5" stroke-linecap="round"/>`;
      case 'ince': return `<path d="M${x - o} ${y + 1} Q${x} ${y - 6} ${x + o} ${y}" fill="none" stroke="${c}" stroke-width="2.8" stroke-linecap="round"/>`;
      case 'catik': return `<path d="M${x + o} ${y - 4} L${x - o * 0.9} ${y + 3}" fill="none" stroke="${c}" stroke-width="6" stroke-linecap="round"/>`;
      case 'duz': return `<path d="M${x - o} ${y} L${x + o} ${y - 1}" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`;
      default: return `<path d="M${x - o} ${y + 3} Q${x} ${y - 8} ${x + o} ${y + 2}" fill="none" stroke="${c}" stroke-width="4.5" stroke-linecap="round"/>`;
    }
  }).join('');
}

function nose(av, skin) {
  const y = CY + 10, dk = shade(skin, -0.28);
  switch (av.nose) {
    case 'kemerli': return `<path d="M${CX - 2} ${y - 6} Q${CX + 8} ${y + 2} ${CX + 6} ${y + 14} Q${CX + 2} ${y + 18} ${CX - 4} ${y + 15}" fill="${shade(skin, -0.08)}" stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
    case 'genis': return `<path d="M${CX - 3} ${y - 4} Q${CX} ${y + 6} ${CX - 10} ${y + 12} Q${CX - 12} ${y + 18} ${CX - 4} ${y + 18} Q${CX} ${y + 20} ${CX + 4} ${y + 18} Q${CX + 12} ${y + 18} ${CX + 10} ${y + 12}" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><circle cx="${CX - 5}" cy="${y + 15}" r="1.8" fill="${dk}"/><circle cx="${CX + 5}" cy="${y + 15}" r="1.8" fill="${dk}"/>`;
    case 'sivri': return `<path d="M${CX} ${y - 6} L${CX + 7} ${y + 14} L${CX - 3} ${y + 15}" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
    default: return `<ellipse cx="${CX + 1}" cy="${y + 10}" rx="6" ry="3" fill="${dk}" opacity=".35"/><path d="M${CX - 2} ${y} q6 8 -1 12" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
  }
}

function mouth(av, skin) {
  const y = CY + 34, lip = '#c25a50', lipDk = shade(skin, -0.35);
  switch (av.mouth) {
    case 'duz': return `<path d="M${CX - 10} ${y} H${CX + 10}" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>`;
    case 'dolgun': return `<path d="M${CX - 12} ${y} Q${CX - 5} ${y - 6} ${CX} ${y - 3} Q${CX + 5} ${y - 6} ${CX + 12} ${y} Q${CX} ${y + 9} ${CX - 12} ${y}Z" fill="${shade(lip, 0.15)}" stroke="${INK}" stroke-width="2.8" stroke-linejoin="round"/><path d="M${CX - 11} ${y} H${CX + 11}" stroke="${INK}" stroke-width="2"/>`;
    case 'ciddi': return `<path d="M${CX - 10} ${y + 2} Q${CX} ${y - 3} ${CX + 10} ${y + 2}" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>`;
    case 'sirit': return `<path d="M${CX - 13} ${y - 3} Q${CX} ${y + 14} ${CX + 13} ${y - 3}Z" fill="#fbf7ef" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><path d="M${CX - 12} ${y - 1} H${CX + 12}" stroke="${INK}" stroke-width="1.6" opacity=".5"/>`;
    default: return `<path d="M${CX - 11} ${y - 1} Q${CX} ${y + 9} ${CX + 11} ${y - 1}" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/><path d="M${CX - 6} ${y + 9} q6 3 12 0" stroke="${lipDk}" stroke-width="2" fill="none" opacity=".5"/>`;
  }
}

function beard(av, rx, ry, c) {
  const B = CY + ry;
  if (av.beard === 'yok') return '';
  if (av.beard === 'kirli') {
    let s = '';
    for (let i = 0; i < 52; i++) {
      const a = 0.25 + ((i * 2.399) % (Math.PI - 0.5)), r = 0.66 + ((i * 37) % 30) / 100;
      const x = CX + Math.cos(a) * rx * r * 0.95, y = CY + 16 + Math.sin(a) * (ry - 16) * r;
      s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.3" fill="${c}" opacity=".75"/>`;
    }
    return s;
  }
  const mus = `<path d="M${CX - 18} ${CY + 30} Q${CX - 8} ${CY + 20} ${CX} ${CY + 26} Q${CX + 8} ${CY + 20} ${CX + 18} ${CY + 30} Q${CX + 8} ${CY + 28} ${CX} ${CY + 30} Q${CX - 8} ${CY + 28} ${CX - 18} ${CY + 30}Z" fill="${c}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`;
  if (av.beard === 'biyik') return mus;
  if (av.beard === 'keci') return mus + `<path d="M${CX - 9} ${CY + 42} Q${CX} ${B + 22} ${CX + 9} ${CY + 42} Q${CX} ${CY + 46} ${CX - 9} ${CY + 42}Z" fill="${c}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`;
  const drop = av.beard === 'uzun' ? 48 : 16;
  return `<path d="M${CX - rx + 3} ${CY + 6} C${CX - rx + 4} ${B + drop * 0.6} ${CX - 22} ${B + drop} ${CX} ${B + drop}
    C${CX + 22} ${B + drop} ${CX + rx - 4} ${B + drop * 0.6} ${CX + rx - 3} ${CY + 6}
    C${CX + rx - 12} ${CY + 30} ${CX + 16} ${CY + 26} ${CX} ${CY + 42} C${CX - 16} ${CY + 26} ${CX - rx + 12} ${CY + 30} ${CX - rx + 3} ${CY + 6} Z"
    fill="${c}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>
    <path d="M${CX - 16} ${B - 4 + drop * 0.4} q4 8 0 14 M${CX + 14} ${B - 2 + drop * 0.4} q-4 8 0 14" fill="none" stroke="${shade(c, 0.25)}" stroke-width="3" stroke-linecap="round"/>` + mus;
}

function marks(av, skin) {
  const dk = shade(skin, -0.35);
  switch (av.mark) {
    case 'cil': return [[-28, 20], [-22, 24], [-32, 25], [-18, 19], [24, 22], [30, 18], [20, 25], [33, 24]].map(([dx, dy]) => `<circle cx="${CX + dx}" cy="${CY + dy}" r="1.5" fill="${dk}"/>`).join('');
    case 'ben': return `<circle cx="${CX + 22}" cy="${CY + 30}" r="2.6" fill="${shade(skin, -0.55)}"/>`;
    case 'yara': return `<path d="M${CX + 26} ${CY - 6} L${CX + 34} ${CY + 24}" stroke="${shade(skin, -0.22)}" stroke-width="3.5" stroke-linecap="round"/><path d="M${CX + 25} ${CY + 3} l9 -2 M${CX + 28} ${CY + 12} l9 -2" stroke="${shade(skin, -0.22)}" stroke-width="2" stroke-linecap="round"/>`;
    default: return '';
  }
}

function paint(av) {
  switch (av.paint) {
    case 'okra': return `<path d="M${CX - 38} ${CY + 14} l16 -2 M${CX - 38} ${CY + 21} l16 -2 M${CX + 22} ${CY + 12} l16 2 M${CX + 22} ${CY + 19} l16 2" stroke="#b5502a" stroke-width="4" stroke-linecap="round" opacity=".85"/>`;
    case 'alin': return [-12, 0, 12].map((d) => `<circle cx="${CX + d}" cy="${CY - 30}" r="3.2" fill="#e8dcc0" stroke="${INK}" stroke-width="1"/>`).join('');
    case 'maske': return `<path d="M${CX - 50} ${CY - 6} Q${CX} ${CY - 12} ${CX + 50} ${CY - 6} L${CX + 50} ${CY + 12} Q${CX} ${CY + 8} ${CX - 50} ${CY + 12}Z" fill="#2a1d16" opacity=".5"/>`;
    default: return '';
  }
}

function neckJewel(av) {
  switch (av.jewel) {
    case 'kemik': return `<path d="M64 168 Q100 196 136 168" fill="none" stroke="#5a4029" stroke-width="2.5"/>${[72, 86, 100, 114, 128].map((x, i) => { const y = 174 + (i === 2 ? 10 : i % 2 ? 7 : 2); return `<path d="M${x} ${y} l0 14" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M${x} ${y} l0 14" stroke="#efe6cf" stroke-width="4" stroke-linecap="round"/>`; }).join('')}`;
    case 'boncuk': return `<path d="M64 168 Q100 196 136 168" fill="none" stroke="#5a4029" stroke-width="2"/>${[70, 80, 90, 100, 110, 120, 130].map((x, i) => `<circle cx="${x}" cy="${(172 + Math.sin((i / 6) * Math.PI) * 13).toFixed(1)}" r="4.5" fill="${['#b5502a', '#3f7a86', '#e8c45a'][i % 3]}" stroke="${INK}" stroke-width="2"/>`).join('')}`;
    default: return '';
  }
}

function headJewel(av, rx, ry) {
  switch (av.jewel) {
    case 'tuy': return `<g transform="translate(${CX + rx - 8} ${CY - ry + 6}) rotate(28)"><path d="M0 0 Q14 -30 4 -62 Q-12 -30 0 0Z" fill="#e8dcc0" stroke="${INK}" stroke-width="3"/><path d="M2 -6 L4 -58" stroke="${INK}" stroke-width="2"/><path d="M4 -50 l-6 -6 M4 -40 l-8 -6 M4 -30 l7 -6" stroke="#8a6a4a" stroke-width="2"/></g>`;
    case 'kupe': return `<circle cx="${CX - rx - 3}" cy="${CY + 22}" r="5" fill="none" stroke="#e8c45a" stroke-width="3"/><circle cx="${CX + rx + 3}" cy="${CY + 22}" r="5" fill="none" stroke="#e8c45a" stroke-width="3"/>`;
    default: return '';
  }
}

// ---------- Kıyafet (çağa göre) ----------
export function outfitColors(era = 1) {
  if (era >= 3) return { base: '#3e5a78', dark: '#2a4058', light: '#6a8aa8', pattern: '#e8dcc0' };
  if (era === 2) return { base: '#b5653a', dark: '#8a4526', light: '#d98c5a', pattern: '#e8dcc0' };
  return { base: '#7b5a3a', dark: '#5a4029', light: '#a07850', pattern: '#a07850' };
}

function outfit(era) {
  const c = outfitColors(era);
  if (era >= 3) {
    return `<path d="M18 222 C22 182 50 164 100 164 C150 164 178 182 182 222 Z" fill="${c.base}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>
      <path d="M40 176 L150 222 L182 222 C180 200 170 184 156 176 Z" fill="${c.light}" stroke="${INK}" stroke-width="3" stroke-linejoin="round" opacity=".95"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M${46 + i * 14} ${179 + i * 5.8} l-4 12" stroke="${c.pattern}" stroke-width="4" stroke-linecap="round"/>`).join('')}
      <path d="M70 166 Q100 186 130 166" fill="none" stroke="${INK}" stroke-width="${W}"/>`;
  }
  if (era === 2) {
    return `<path d="M18 222 C22 182 50 164 100 164 C150 164 178 182 182 222 Z" fill="${c.base}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>
      <path d="M54 170 L134 222 M36 184 L100 222" stroke="${c.pattern}" stroke-width="6" opacity=".7"/>
      <path d="M118 176 l8 6 l-8 6 M136 188 l8 6 l-8 6 M154 200 l8 6 l-8 6" fill="none" stroke="${c.dark}" stroke-width="3"/>
      <path d="M70 166 Q100 186 130 166" fill="none" stroke="${INK}" stroke-width="${W}"/>`;
  }
  return `<path d="M18 222 C22 182 50 164 100 164 C150 164 178 182 182 222 Z" fill="${c.base}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>
    ${[[44, 186], [64, 176], [124, 176], [146, 186], [88, 198], [110, 208], [58, 206], [136, 204], [76, 214], [158, 212], [36, 210]].map(([x, y], i) => `<path d="M${x} ${y} l${i % 2 ? 9 : -9} -6" stroke="${c.dark}" stroke-width="3" stroke-linecap="round"/>`).join('')}
    <path d="M70 166 Q100 186 130 166" fill="none" stroke="${INK}" stroke-width="${W}"/>
    <path d="M26 214 q8 -6 14 0 q8 -6 14 0 M146 214 q8 -6 14 0 q8 -6 14 0" fill="none" stroke="${c.light}" stroke-width="3"/>`;
}

// ---------- Birleştirme ----------
export function avatarSVG(av, { era = 1, cls = '' } = {}) {
  return `<svg class="${cls}" viewBox="0 0 200 222" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${avatarParts(av, era)}</svg>`;
}

// Bir seçenek kartı için yalnızca baş bölgesi.
export function avatarThumb(av, era = 1) {
  return `<svg viewBox="26 14 148 166" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${avatarParts(av, era)}</svg>`;
}

export function avatarParts(avIn, era = 1) {
  const av = normalizeAvatar(avIn);
  const skin = SKIN[av.skin];
  const skinDk = shade(skin, -0.16);
  const hc = HAIR_COLORS[av.hairColor];
  const [rx, ry] = DIM[av.face] || DIM.oval;
  const hp = headPath(av.face);
  const hid = 'h' + (++uid);
  return `
    ${hairBack(av, rx, ry, hc)}
    <path d="M${CX - 17} ${CY + ry - 16} V${CY + ry + 16} H${CX + 17} V${CY + ry - 16}Z" fill="${skinDk}" stroke="${INK}" stroke-width="${W}"/>
    ${outfit(era)}
    ${neckJewel(av)}
    ${[-1, 1].map((d) => `<ellipse cx="${CX + d * (rx + 2)}" cy="${CY + 6}" rx="9.5" ry="13" fill="${skin}" stroke="${INK}" stroke-width="${W}"/><path d="M${CX + d * (rx + 3)} ${CY} q${d * 4} 6 0 12" fill="none" stroke="${skinDk}" stroke-width="2.5"/>`).join('')}
    <defs><clipPath id="${hid}"><path d="${hp}"/></clipPath></defs>
    <path d="${hp}" fill="${skin}"/>
    <g clip-path="url(#${hid})">
      <path d="M${CX + rx * 0.35} ${CY - ry - 4} C${CX + rx * 1.2} ${CY - ry * 0.4} ${CX + rx * 1.1} ${CY + ry} ${CX + rx * 0.1} ${CY + ry + 6} L${CX + rx + 10} ${CY + ry + 10} L${CX + rx + 10} ${CY - ry - 4}Z" fill="${skinDk}" opacity=".5"/>
      <ellipse cx="${CX - 27}" cy="${CY + 22}" rx="10" ry="6" fill="#e0705a" opacity=".22"/><ellipse cx="${CX + 27}" cy="${CY + 22}" rx="10" ry="6" fill="#e0705a" opacity=".22"/>
      ${paint(av)}
      ${marks(av, skin)}
    </g>
    <path d="${hp}" fill="none" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>
    ${eyes(av)}
    ${brows(av, shade(hc, -0.1))}
    ${nose(av, skin)}
    ${mouth(av, skin)}
    ${beard(av, rx, ry, hc)}
    ${hairTop(av, rx, ry, hc)}
    ${headJewel(av, rx, ry)}`;
}
