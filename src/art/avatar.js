// Katmanlı 2D avatar. Her parça ayrı seçilir; çizim tamamen koddur.
export const INK = '#1a1410';

export const SKIN = ['#f3d2b3', '#e8b98f', '#d29b6c', '#b47a4e', '#8d5a35', '#5e3a22'];
export const HAIR_COLORS = ['#1f1612', '#4a2e1c', '#7a4a24', '#b07a3c', '#d9b36a', '#8a8a8a'];

export const OPTIONS = {
  face: [['yuvarlak', 'Yuvarlak'], ['oval', 'Oval'], ['koseli', 'Köşeli']],
  hair: [['kisa', 'Kısa'], ['uzun', 'Uzun'], ['orgu', 'Örgülü'], ['daginik', 'Dağınık'], ['kel', 'Kel']],
  eyes: [['yuvarlak', 'Yuvarlak'], ['badem', 'Badem'], ['iri', 'İri']],
  brows: [['duz', 'Düz'], ['kalin', 'Kalın'], ['kavisli', 'Kavisli']],
  beard: [['yok', 'Yok'], ['kisa', 'Kısa'], ['uzun', 'Uzun']],
};

export const DEFAULT_AVATAR = {
  skin: 2, hairColor: 1, face: 'oval', hair: 'kisa', eyes: 'yuvarlak', brows: 'duz', beard: 'yok',
};

const CX = 100, CY = 96;
const DIM = { yuvarlak: [52, 54], oval: [46, 60], koseli: [50, 56] };

function headShape(face, fill) {
  const [rx, ry] = DIM[face];
  if (face === 'koseli') {
    return `<rect x="${CX - rx}" y="${CY - ry}" width="${rx * 2}" height="${ry * 2}" rx="24" fill="${fill}" stroke="${INK}" stroke-width="4"/>`;
  }
  return `<ellipse cx="${CX}" cy="${CY}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${INK}" stroke-width="4"/>`;
}

function hairCap(rx, ry, color) {
  const L = CX - rx - 3, R = CX + rx + 3, T = CY - ry - 30, f = CY - ry * 0.42;
  return `<path d="M${L} ${CY - 6} C${L} ${T} ${R} ${T} ${R} ${CY - 6}
    L${R - 8} ${f} Q${CX + rx * 0.5} ${f + 14} ${CX + rx * 0.2} ${f - 4}
    Q${CX} ${f + 12} ${CX - rx * 0.3} ${f - 4} Q${CX - rx * 0.6} ${f + 14} ${L + 8} ${f} Z"
    fill="${color}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
}

function hairBack(style, rx, ry, color) {
  if (style === 'uzun') {
    return `<path d="M${CX - rx - 8} ${CY - 10} C${CX - rx - 14} ${CY + 50} ${CX - rx - 6} ${CY + 90} ${CX - rx + 6} ${CY + 104}
      L${CX + rx - 6} ${CY + 104} C${CX + rx + 6} ${CY + 90} ${CX + rx + 14} ${CY + 50} ${CX + rx + 8} ${CY - 10} Z"
      fill="${color}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
  }
  if (style === 'orgu') {
    let s = '';
    for (let i = 0; i < 5; i++) {
      s += `<ellipse cx="${CX + rx + 2 - i * 2}" cy="${CY + 10 + i * 16}" rx="9" ry="10" fill="${color}" stroke="${INK}" stroke-width="3.5"/>`;
    }
    return s;
  }
  return '';
}

function hairFront(style, rx, ry, color) {
  if (style === 'kel') {
    return `<path d="M${CX - 18} ${CY - ry + 14} q10 -6 22 -2" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="5" stroke-linecap="round"/>`;
  }
  if (style === 'daginik') {
    const pts = [];
    const n = 9;
    for (let i = 0; i <= n; i++) {
      const a = Math.PI + (Math.PI * i) / n;
      const r = i % 2 === 0 ? 1.18 : 0.98;
      pts.push(`${(CX + Math.cos(a) * (rx + 4) * r).toFixed(1)} ${(CY - 8 + Math.sin(a) * (ry + 4) * r).toFixed(1)}`);
    }
    const f = CY - ry * 0.4;
    return `<path d="M${pts.join(' L')} L${CX + rx - 6} ${f} L${CX + 10} ${f + 10} L${CX - 8} ${f - 2} L${CX - rx + 6} ${f + 6} Z"
      fill="${color}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
  }
  return hairCap(rx, ry, color);
}

function eyes(type) {
  const y = CY + 4, xs = [CX - 20, CX + 20];
  return xs.map((x) => {
    if (type === 'badem') return `<ellipse cx="${x}" cy="${y}" rx="7.5" ry="3.6" fill="${INK}"/>`;
    if (type === 'iri') return `<circle cx="${x}" cy="${y}" r="8.5" fill="#fff" stroke="${INK}" stroke-width="3"/><circle cx="${x + 1.5}" cy="${y + 1}" r="4" fill="${INK}"/>`;
    return `<circle cx="${x}" cy="${y}" r="5" fill="${INK}"/>`;
  }).join('');
}

function brows(type, color) {
  const y = CY - 12;
  return [-1, 1].map((d) => {
    const x = CX + d * 20;
    if (type === 'kalin') return `<path d="M${x - 11} ${y} L${x + 11} ${y - d * 0 - 2}" stroke="${color}" stroke-width="7" stroke-linecap="round"/>`;
    if (type === 'kavisli') return `<path d="M${x - 11} ${y + 2} Q${x} ${y - 9} ${x + 11} ${y + 2}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round"/>`;
    return `<path d="M${x - 10} ${y} L${x + 10} ${y}" stroke="${color}" stroke-width="4" stroke-linecap="round"/>`;
  }).join('');
}

function beard(type, rx, ry, color) {
  if (type === 'yok') return '';
  const drop = type === 'uzun' ? 46 : 16;
  return `<path d="M${CX - rx + 4} ${CY + 8} C${CX - rx + 6} ${CY + ry + drop * 0.6} ${CX - 20} ${CY + ry + drop} ${CX} ${CY + ry + drop}
    C${CX + 20} ${CY + ry + drop} ${CX + rx - 6} ${CY + ry + drop * 0.6} ${CX + rx - 4} ${CY + 8}
    C${CX + rx - 14} ${CY + 30} ${CX + 14} ${CY + 24} ${CX} ${CY + 30} C${CX - 14} ${CY + 24} ${CX - rx + 14} ${CY + 30} ${CX - rx + 4} ${CY + 8} Z"
    fill="${color}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
}

// Çağa göre kıyafet. Şimdilik Taş Devri: hayvan postu.
export function outfitColors(era = 1) {
  return { base: '#7b5a3a', dark: '#5a4029', light: '#a07850' };
}

function outfit(era) {
  const c = outfitColors(era);
  return `<path d="M20 222 C24 182 52 164 100 164 C148 164 176 182 180 222 Z" fill="${c.base}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M44 186 l10 -6 M66 176 l10 -5 M124 176 l10 5 M146 186 l10 6 M90 196 l8 -4 M110 206 l8 -4 M60 206 l8 -4 M136 204 l8 -4" stroke="${c.dark}" stroke-width="3" stroke-linecap="round"/>
    <path d="M70 166 Q100 186 130 166" fill="none" stroke="${INK}" stroke-width="4"/>`;
}

export function avatarSVG(av, { era = 1, cls = '' } = {}) {
  return `<svg class="${cls}" viewBox="0 0 200 222" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${avatarParts(av, era)}</svg>`;
}

// Sadece çizim parçaları (başka bir SVG'nin içine gömmek için).
export function avatarParts(av, era = 1) {
  const skin = SKIN[av.skin] ?? SKIN[2];
  const hc = HAIR_COLORS[av.hairColor] ?? HAIR_COLORS[1];
  const [rx, ry] = DIM[av.face] ?? DIM.oval;
  return `
    ${hairBack(av.hair, rx, ry, hc)}
    <rect x="${CX - 16}" y="${CY + ry - 14}" width="32" height="30" fill="${skin}" stroke="${INK}" stroke-width="4"/>
    ${outfit(era)}
    <ellipse cx="${CX - rx - 2}" cy="${CY + 6}" rx="9" ry="12" fill="${skin}" stroke="${INK}" stroke-width="4"/>
    <ellipse cx="${CX + rx + 2}" cy="${CY + 6}" rx="9" ry="12" fill="${skin}" stroke="${INK}" stroke-width="4"/>
    ${headShape(av.face, skin)}
    ${beard(av.beard, rx, ry, hc)}
    ${eyes(av.eyes)}
    ${brows(av.brows, hc)}
    <path d="M${CX - 3} ${CY + 12} q4 8 -1 12" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    ${av.beard === 'uzun' ? '' : `<path d="M${CX - 9} ${CY + 33} q9 6 18 0" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>`}
    ${hairFront(av.hair, rx, ry, hc)}`;
}
