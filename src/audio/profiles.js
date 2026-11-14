// Her çağın müzik kimliği: dizi (sent cinsinden), tempo, çalgılar ve ritim kalıpları.
// Kalıplarda her karakter bir adımdır. Vurmalılar: D düm, t tek, k bas davul, h zil, s fırça, j şıngırak, x çıngırak.
// Bas: R kök, F beşli, O oktav. Eşlik: c akor, 1-3 akor sesleri, 4 üst oktav kök.

const SC = {
  pentaMinor: [0, 300, 500, 700, 1000],
  pentaMajor: [0, 200, 400, 700, 900],
  dorian: [0, 200, 300, 500, 700, 900, 1000],
  phrygian: [0, 100, 300, 500, 700, 800, 1000],
  lydian: [0, 200, 400, 600, 700, 900, 1100],
  mixolydian: [0, 200, 400, 500, 700, 900, 1000],
  major: [0, 200, 400, 500, 700, 900, 1100],
  minor: [0, 200, 300, 500, 700, 800, 1000],
  harmMinor: [0, 200, 300, 500, 700, 800, 1100],
  // Bizans 1. ve plagal 1. ses (diyatonik; 72 morialık dizide 10-8-12)
  byzantine: [0, 167, 300, 500, 700, 867, 1000],
  // Türk makamları (yaklaşık koma değerleri)
  ussak: [0, 150, 294, 498, 702, 792, 996],
  hicaz: [0, 113, 384, 498, 702, 792, 996],
  rast: [0, 204, 384, 498, 702, 906, 1086],
};

export const PROFILES = {
  // 1 — Taş Devri, Göbeklitepe: kemik flüt, dem, tek tük bendir
  1: {
    bpm: 54, meter: 4, sub: 2, root: 50, scale: SC.pentaMinor, prog: [0], wet: 0.5,
    drone: { inst: 'drone', vol: 0.075, bars: 4, oct: -1, fifth: 0.35 },
    lead: { inst: 'wind', range: [0, 8], density: 0.22, rest: 0.4, vol: 0.09, oct: 1, maxLen: 6, breath: 0.35, vibDepth: 0.004, attack: 0.12, moves: [-1, -1, 1, 1, 2, -2, 0] },
    perc: { pattern: ['D.......', '....x...', 'D.....t.', '........'], vol: 0.8 },
  },
  // 2 — Yerleşik hayat, Çatalhöyük: sıcak, ev içi, basit ezgi
  2: {
    bpm: 62, meter: 4, sub: 2, root: 52, scale: SC.pentaMajor, prog: [0, 0, 3, 0], chordBars: 2, wet: 0.42,
    drone: { inst: 'drone', vol: 0.06, bars: 8, oct: -1 },
    harm: { inst: 'pluck', pattern: ['1...3...', '2.......'], vol: 0.06, oct: 0, decay: 1.6, wave: 'triangle', bright: 1500, skip: 0.15 },
    lead: { inst: 'wind', range: [0, 8], density: 0.26, rest: 0.35, vol: 0.085, oct: 1, maxLen: 5, breath: 0.3 },
    perc: { pattern: ['D...t...', 'D.....t.'], vol: 0.7 },
  },
  // 3 — Yazının gelişi, Kültepe/Kaniş: lir ve kamışlı nefesli
  3: {
    bpm: 68, meter: 4, sub: 2, root: 50, scale: SC.phrygian, prog: [0, 0, 6, 0], chordBars: 2, wet: 0.4,
    drone: { inst: 'drone', vol: 0.055, bars: 8, oct: -1 },
    harm: { inst: 'pluck', pattern: ['1.2.3...', '1...3.2.'], vol: 0.065, oct: 0, decay: 1.4, wave: 'triangle', bright: 2200, skip: 0.12 },
    lead: { inst: 'wind', kind: 'reed', range: [1, 9], density: 0.22, rest: 0.45, vol: 0.055, oct: 1, maxLen: 5, cut: 1200, breath: 0.12 },
    perc: { pattern: ['D...t...', 'D.t.....'], vol: 0.65 },
  },
  // 4 — Hititler: lir, flüt, sistrum ve def
  4: {
    bpm: 72, meter: 4, sub: 2, root: 50, scale: SC.dorian, prog: [0, 0, 3, 0], chordBars: 2, wet: 0.38,
    drone: { inst: 'drone', vol: 0.05, bars: 8, oct: -1 },
    harm: { inst: 'pluck', pattern: ['1.3.2.3.', '1...3...'], vol: 0.06, oct: 0, decay: 1.3, wave: 'triangle', bright: 2600, skip: 0.1 },
    lead: { inst: 'wind', range: [0, 9], density: 0.25, rest: 0.4, vol: 0.08, oct: 1, maxLen: 4, breath: 0.25 },
    perc: { pattern: ['D...t.j.', 'D.t...j.'], vol: 0.7 },
  },
  // 5 — Urartu, Frigya, Lidya: aulos ve kithara, Lidya dizisi
  5: {
    bpm: 76, meter: 4, sub: 2, root: 52, scale: SC.lydian, prog: [0, 1, 0, 0], chordBars: 2, wet: 0.36,
    drone: { inst: 'drone', vol: 0.045, bars: 8, oct: -1 },
    harm: { inst: 'pluck', pattern: ['1.2.3.2.', 'c.......'], vol: 0.06, oct: 0, decay: 1.3, wave: 'triangle', bright: 3000 },
    lead: { inst: 'wind', kind: 'reed', range: [0, 9], density: 0.24, rest: 0.4, vol: 0.05, oct: 1, maxLen: 4, cut: 1400, breath: 0.1 },
    perc: { pattern: ['D.t.D.t.', 'D.t...tt'], vol: 0.6 },
  },
  // 6 — Antik çağ: kithara, aulos, tef zilleri
  6: {
    bpm: 80, meter: 4, sub: 2, root: 52, scale: SC.dorian, prog: [0, 3, 0, 4], chordBars: 2, wet: 0.36,
    bass: { inst: 'pluck', pattern: 'R.......', vol: 0.07, oct: -1, decay: 1.8, wave: 'triangle', bright: 900 },
    harm: { inst: 'pluck', pattern: ['.1.2.3.2', '.1.3.2.1'], vol: 0.055, oct: 0, decay: 1.1, wave: 'sawtooth', bright: 2400, shimmer: 0.15 },
    lead: { inst: 'wind', kind: 'reed', range: [0, 9], density: 0.26, rest: 0.4, vol: 0.05, oct: 1, maxLen: 4, cut: 1500, breath: 0.1 },
    perc: { pattern: ['D.j.t.j.', 'D.j.D.j.'], vol: 0.55 },
  },
  // 7 — Bizans: ison üstünde ilahi, Ayasofya yankısı, uzak çan
  7: {
    bpm: 50, meter: 4, sub: 1, root: 50, scale: SC.byzantine, prog: [0], wet: 0.75,
    drone: { inst: 'choir', vol: 0.05, bars: 4, oct: -1, attack: 1.5, rel: 1.2, f1: 520, f2: 900, send: 0.7 },
    lead: { inst: 'choir', range: [0, 8], density: 0.42, rest: 0.3, vol: 0.06, oct: 0, maxLen: 3, legato: 1.05, attack: 0.25, f1: 700, f2: 1150, moves: [-1, -1, 1, 1, 0, 2, -2] },
    accent: { inst: 'bell', every: 16, prob: 0.7, vol: 0.035, oct: 0, decay: 5, ratio: 2.76, index: 1.2, send: 0.8 },
  },
  // 8 — Selçuklu ve Ahilik: ney, bendir, Uşşak
  8: {
    bpm: 64, meter: 4, sub: 2, root: 50, scale: SC.ussak, prog: [0, 0, 3, 0], chordBars: 4, wet: 0.5,
    drone: { inst: 'drone', vol: 0.06, bars: 8, oct: -1, fifth: 0.25 },
    lead: { inst: 'wind', range: [0, 9], density: 0.24, rest: 0.35, vol: 0.09, oct: 1, maxLen: 6, breath: 0.45, vibDepth: 0.008, vib: 4.6, attack: 0.18, scoop: 0.97, harm: 0.05 },
    perc: { pattern: ['D..tD.t.', 'D..t..t.'], vol: 0.75 },
  },
  // 9 — Lale Devri, matbaa: ud, kanun, ney; Rast, yürük semai havası
  9: {
    bpm: 88, meter: 3, sub: 2, root: 55, scale: SC.rast, prog: [0, 0, 3, 4], chordBars: 2, wet: 0.32,
    bass: { inst: 'pluck', pattern: 'R.....', vol: 0.07, oct: -1, decay: 1.6, wave: 'sawtooth', bright: 900 },
    harm: { inst: 'pluck', pattern: ['..1.2.', '..3.2.'], vol: 0.05, oct: 0, decay: 0.8, wave: 'sawtooth', bright: 3800, shimmer: 0.35 },
    lead: { inst: 'wind', range: [0, 9], density: 0.3, rest: 0.35, vol: 0.075, oct: 1, maxLen: 4, breath: 0.35, vibDepth: 0.007, scoop: 0.975 },
    perc: { pattern: ['D.t.t.', 'D.ttt.'], vol: 0.6 },
  },
  // 10 — Makine devri: salon valsi, müzik kutusu
  10: {
    bpm: 96, meter: 3, sub: 2, root: 55, scale: SC.major, prog: [0, 3, 4, 0], chordBars: 2, wet: 0.32,
    bass: { inst: 'piano', pattern: 'R.....', vol: 0.12, oct: -1, decay: 1.5 },
    harm: { inst: 'piano', pattern: '..c.c.', vol: 0.08, oct: 0, decay: 0.7, len: 1.5, strum: 0.006 },
    lead: { inst: 'musicbox', range: [2, 11], density: 0.32, rest: 0.3, vol: 0.12, oct: 1, maxLen: 4 },
  },
  // 11 — Cumhuriyet sanayisi: 1930'ların İstanbul tangosu, akordeon ve piyano
  11: {
    bpm: 100, meter: 4, sub: 2, root: 50, scale: SC.harmMinor, prog: [0, 3, 4, 0], chordBars: 2, wet: 0.25,
    bass: { inst: 'bass', pattern: 'R...F...', vol: 0.12, oct: -1, tau: 0.35, cut: 600 },
    harm: { inst: 'piano', pattern: ['..c...c.', '..c..c..'], vol: 0.04, oct: 0, decay: 0.5, len: 1, strum: 0.004 },
    lead: { inst: 'reed', range: [0, 9], density: 0.28, rest: 0.35, vol: 0.04, oct: 1, maxLen: 4, cut: 1600 },
    perc: { pattern: ['....s...', '....s..s'], vol: 0.5 },
  },
  // 12 — Kalkınma yılları: Anadolu pop/rock, elektro saz, org
  12: {
    bpm: 92, meter: 4, sub: 2, root: 52, scale: SC.phrygian, prog: [0, 1, 0, 6], chordBars: 2, wet: 0.25,
    bass: { inst: 'bass', pattern: 'R..R..F.', vol: 0.12, oct: -1, tau: 0.4, wave: 'sawtooth', body: 0.3, cut: 480 },
    pad: { inst: 'organ', vol: 0.022, oct: 0, cut: 1600 },
    lead: { inst: 'pluck', range: [0, 9], density: 0.32, rest: 0.35, vol: 0.06, oct: 1, maxLen: 3, decay: 0.9, wave: 'sawtooth', bright: 3200, shimmer: 0.4, send: 0.3 },
    perc: { pattern: ['k.h.s.h.', 'k.h.s.hk'], vol: 0.55 },
  },
  // 13 — Bilgi çağı: 90'lar/2000'ler, elektrikli piyano, yumuşak ritim, synth
  13: {
    bpm: 82, meter: 4, sub: 2, root: 57, scale: SC.minor, prog: [0, 5, 2, 6], chordBars: 2, wet: 0.35,
    bass: { inst: 'bass', pattern: 'R.....F.', vol: 0.12, oct: -2, tau: 0.8, cut: 380 },
    pad: { inst: 'pad', vol: 0.02, oct: 0, cut: 1100, attack: 0.8 },
    harm: { inst: 'epiano', pattern: ['c.......', '....c...'], vol: 0.05, oct: 0, len: 6, strum: 0.012 },
    lead: { inst: 'synth', range: [2, 11], density: 0.22, rest: 0.45, vol: 0.03, oct: 0, maxLen: 3, cut: 2000 },
    perc: { pattern: ['k...s...', 'k..ks...'], vol: 0.5 },
  },
  // 14 — Yakın gelecek: ortam müziği, cam çanlar, geniş yankı
  14: {
    bpm: 60, meter: 4, sub: 2, root: 53, scale: SC.lydian, prog: [0, 1], chordBars: 4, wet: 0.6,
    bass: { inst: 'bass', pattern: 'R.......', vol: 0.09, oct: -2, tau: 3, cut: 260, wave: 'sine' },
    pad: { inst: 'pad', vol: 0.028, oct: 0, cut: 1300, attack: 2.2, rel: 1.5 },
    lead: { inst: 'bell', range: [2, 12], density: 0.18, rest: 0.4, vol: 0.05, oct: 1, maxLen: 6, decay: 3, ratio: 3.5, index: 0.8, send: 0.7 },
  },
};

// Ses dengesi: her parçanın düzeyi tek tek ölçülerek ayarlandı (ezgi önde, dem ve vurmalılar geride).
const MIX = {
  1: { drone: 0.034, lead: 0.1 },
  2: { drone: 0.03, harm: 0.17, perc: 0.5 },
  3: { drone: 0.035, harm: 0.145, lead: 0.16, perc: 0.46 },
  4: { drone: 0.032, harm: 0.15, lead: 0.14, perc: 0.45 },
  5: { drone: 0.032, harm: 0.15, lead: 0.2, perc: 0.34 },
  6: { bass: 0.155, harm: 0.17, lead: 0.1, perc: 0.35 },
  7: { drone: 0.04, lead: 0.035 },
  8: { drone: 0.038, perc: 0.42 },
  9: { bass: 0.175, harm: 0.2, lead: 0.12, perc: 0.34 },
  10: { harm: 0.13, lead: 0.17 },
  11: { bass: 0.085, harm: 0.14, lead: 0.065, perc: 2.5 },
  12: { bass: 0.095, lead: 0.24, perc: 0.45 },
  13: { bass: 0.068, harm: 0.1, lead: 0.07 },
  14: { bass: 0.036, lead: 0.2 },
};
for (const [era, parts] of Object.entries(MIX)) {
  for (const [part, vol] of Object.entries(parts)) PROFILES[era][part].vol = vol;
}
