// Çağlar Boyu İnsan — kodla üretilen arka plan müziği.
// Hiç ses dosyası yok: her çağın müziği Web Audio ile anında, her seferinde biraz farklı çalınır.
// Ses bilerek kısık ve seyrek tutulur; oyunun önüne geçmemeli.

import { PROFILES } from './profiles.js';

const VOL = 0.34; // ana ses (kompresörden önce)
const mtof = (m) => 440 * 2 ** ((m - 69) / 12);
const rnd = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ---------------------------------------------------------------- ortak ses grafiği
const noiseCache = new WeakMap();
function noise(c) {
  let b = noiseCache.get(c);
  if (!b) {
    b = c.createBuffer(1, c.sampleRate, c.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    noiseCache.set(c, b);
  }
  return b;
}

function impulse(c, sec = 3.2) {
  const len = Math.floor(c.sampleRate * sec);
  const b = c.createBuffer(2, len, c.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = b.getChannelData(ch);
    let lp = 0;
    for (let i = 0; i < len; i++) {
      const t = i / len;
      lp += (Math.random() * 2 - 1 - lp) * (0.55 - 0.4 * t); // zamanla koyulaşan kuyruk
      d[i] = lp * (1 - t) ** 3.2 * (i < c.sampleRate * 0.012 ? i / (c.sampleRate * 0.012) : 1);
    }
  }
  return b;
}

export function buildGraph(c) {
  const master = c.createGain();
  master.gain.value = VOL;
  const hp = c.createBiquadFilter(); // en alt uğultuyu kes
  hp.type = 'highpass'; hp.frequency.value = 38;
  const comp = c.createDynamicsCompressor();
  comp.threshold.value = -20; comp.knee.value = 12; comp.ratio.value = 3; comp.attack.value = 0.02; comp.release.value = 0.4;
  master.connect(hp); hp.connect(comp); comp.connect(c.destination);
  const conv = c.createConvolver();
  conv.buffer = impulse(c);
  const wet = c.createGain(); wet.gain.value = 0.9;
  conv.connect(wet); wet.connect(master);
  return { master, conv };
}

function makeBus(c, g) {
  const dry = c.createGain(), wet = c.createGain();
  dry.gain.value = 0; wet.gain.value = 0;
  dry.connect(g.master); wet.connect(g.conv);
  return { dry, wet };
}

// Bir sesi panlayıp kuru + yankı yollarına bağla.
function route(c, node, bus, pan = 0, send = 0.3) {
  let n = node;
  if (pan && c.createStereoPanner) { const p = c.createStereoPanner(); p.pan.value = pan; node.connect(p); n = p; }
  n.connect(bus.dry);
  const s = c.createGain(); s.gain.value = send; n.connect(s); s.connect(bus.wet);
}

function osc(c, type, f, t, end) {
  const o = c.createOscillator();
  o.type = type; o.frequency.setValueAtTime(f, t);
  o.start(t); o.stop(end);
  return o;
}

function nz(c, t, end) {
  const s = c.createBufferSource();
  s.buffer = noise(c); s.loop = true;
  s.start(t, Math.random() * 0.9); s.stop(end);
  return s;
}

function amp(c, t, peak, attack, tau, endAt, relTau = 0.08) {
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(peak, t + attack);
  if (tau) g.gain.setTargetAtTime(0, t + attack, tau);
  if (endAt) g.gain.setTargetAtTime(0, endAt, relTau);
  return g;
}

// ---------------------------------------------------------------- çalgılar
// Her çalgı: (c, bus, t, frekans, süre, şiddet, ayar)
const INST = {
  // Telli, mızraplı: lir, kithara, ud, kanun, saz
  pluck(c, bus, t, f, dur, v, o = {}) {
    const dec = o.decay || 1.2, end = t + dec * 4;
    const a = osc(c, o.wave || 'sawtooth', f, t, end);
    const b = osc(c, 'triangle', f * 2.003, t, end);
    const bg = c.createGain(); bg.gain.value = o.shimmer ?? 0.25;
    const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.Q.value = o.q || 1.2;
    lp.frequency.setValueAtTime(Math.min(o.bright || 2600, 12000), t);
    lp.frequency.setTargetAtTime(Math.max(f * 1.3, 220), t + 0.005, dec * 0.18);
    const g = amp(c, t, v, 0.004, dec / 3, null);
    a.connect(lp); b.connect(bg); bg.connect(lp); lp.connect(g);
    route(c, g, bus, o.pan || 0, o.send ?? 0.35);
  },
  // Üflemeli: kemik flüt, ney, aulos (kamışlı)
  wind(c, bus, t, f, dur, v, o = {}) {
    const atk = o.attack || 0.09, end = t + dur + 0.6;
    const reed = o.kind === 'reed';
    const a = osc(c, reed ? 'sawtooth' : 'sine', f, t, end);
    a.frequency.setValueAtTime(f * (o.scoop || 0.985), t);
    a.frequency.linearRampToValueAtTime(f, t + 0.09);
    const lfo = osc(c, 'sine', o.vib || 5.2, t, end);
    const lg = c.createGain();
    lg.gain.setValueAtTime(0, t); lg.gain.linearRampToValueAtTime(f * (o.vibDepth || 0.006), t + Math.min(0.5, dur));
    lfo.connect(lg); lg.connect(a.frequency);
    const g = amp(c, t, v, atk, null, t + dur, o.rel || 0.12);
    let src = a;
    if (reed) {
      const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = o.cut || 1300; lp.Q.value = 0.8;
      a.connect(lp); src = lp;
    } else {
      const h = osc(c, 'triangle', f * 2, t, end); h.frequency.setValueAtTime(f * 2 * 0.985, t); h.frequency.linearRampToValueAtTime(f * 2, t + 0.09);
      lg.connect(h.frequency);
      const hg = c.createGain(); hg.gain.value = o.harm ?? 0.08; h.connect(hg); hg.connect(g);
    }
    src.connect(g);
    // nefes
    const n = nz(c, t, end), bp = c.createBiquadFilter();
    bp.type = 'bandpass'; bp.frequency.value = Math.min(f * 2.5, 6000); bp.Q.value = 1.6;
    const ng = amp(c, t, v * (o.breath ?? 0.22), 0.04, null, t + dur, 0.1);
    ng.gain.setTargetAtTime(v * (o.breath ?? 0.22) * 0.35, t + 0.12, 0.2);
    n.connect(bp); bp.connect(ng); ng.connect(g);
    route(c, g, bus, o.pan || 0, o.send ?? 0.4);
  },
  // Koro / insan sesi (Bizans ilahisi, ison)
  choir(c, bus, t, f, dur, v, o = {}) {
    const end = t + dur + 1.5;
    const mix = c.createGain(); mix.gain.value = 1;
    for (const d of [-6, 5]) {
      const a = osc(c, 'sawtooth', f, t, end); a.detune.value = d;
      const lfo = osc(c, 'sine', rnd(4.6, 5.4), t, end); const lg = c.createGain(); lg.gain.value = f * 0.005; lfo.connect(lg); lg.connect(a.frequency);
      a.connect(mix);
    }
    const out = c.createGain();
    for (const [ff, q, gg] of [[o.f1 || 650, 4, 6], [o.f2 || 1080, 5, 3.2], [2600, 6, 0.7]]) {
      const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = ff; bp.Q.value = q;
      const gn = c.createGain(); gn.gain.value = gg; mix.connect(bp); bp.connect(gn); gn.connect(out);
    }
    const g = amp(c, t, v, o.attack || 0.35, null, t + dur, o.rel || 0.35);
    out.connect(g);
    route(c, g, bus, o.pan || 0, o.send ?? 0.6);
  },
  // Yumuşak ses halısı
  pad(c, bus, t, f, dur, v, o = {}) {
    const end = t + dur + 3;
    const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = o.cut || 900; lp.Q.value = 0.6;
    for (const d of [-9, 0, 8]) { const a = osc(c, o.wave || 'sawtooth', f, t, end); a.detune.value = d; a.connect(lp); }
    const g = amp(c, t, v, o.attack || 1.4, null, t + dur, o.rel || 0.7);
    lp.connect(g);
    route(c, g, bus, o.pan || 0, o.send ?? 0.5);
  },
  // Dem sesi (kök + beşli)
  drone(c, bus, t, f, dur, v, o = {}) {
    const end = t + dur + 4;
    const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = o.cut || 700;
    const a = osc(c, 'sine', f, t, end), b = osc(c, 'triangle', f, t, end), cc = osc(c, 'sine', f * 1.5, t, end);
    const bg = c.createGain(); bg.gain.value = 0.35; const cg = c.createGain(); cg.gain.value = o.fifth ?? 0.3;
    a.connect(lp); b.connect(bg); bg.connect(lp); cc.connect(cg); cg.connect(lp);
    const g = amp(c, t, v, o.attack || 2.5, null, t + dur, 1.2);
    lp.connect(g);
    route(c, g, bus, 0, o.send ?? 0.3);
  },
  // Çan / cam (FM)
  bell(c, bus, t, f, dur, v, o = {}) {
    const dec = o.decay || 2.6, end = t + dec * 4;
    const car = osc(c, 'sine', f, t, end), mod = osc(c, 'sine', f * (o.ratio || 3.5), t, end);
    const mg = c.createGain(); mg.gain.setValueAtTime(f * (o.index || 1.6), t); mg.gain.setTargetAtTime(0, t, dec / 4);
    mod.connect(mg); mg.connect(car.frequency);
    const g = amp(c, t, v, 0.003, dec / 3, null);
    car.connect(g);
    route(c, g, bus, o.pan || 0, o.send ?? 0.5);
  },
  musicbox(c, bus, t, f, dur, v, o = {}) {
    const dec = o.decay || 1.3, end = t + dec * 4;
    const g = amp(c, t, v, 0.002, dec / 3, null);
    for (const [r, gg] of [[1, 1], [4.01, 0.18], [6.27, 0.05]]) { const a = osc(c, 'sine', f * r, t, end); const x = c.createGain(); x.gain.value = gg; a.connect(x); x.connect(g); }
    route(c, g, bus, o.pan || 0, o.send ?? 0.4);
  },
  piano(c, bus, t, f, dur, v, o = {}) {
    const dec = o.decay || 1.6, end = Math.min(t + dur + 0.4, t + dec * 4);
    const lp = c.createBiquadFilter(); lp.type = 'lowpass';
    lp.frequency.setValueAtTime(Math.min(f * 8, 5000), t); lp.frequency.setTargetAtTime(Math.max(f * 2, 500), t, dec / 2);
    for (const [w, r, gg] of [['triangle', 1, 1], ['sine', 2.002, 0.35], ['sine', 3.004, 0.12]]) { const a = osc(c, w, f * r, t, end); const x = c.createGain(); x.gain.value = gg; a.connect(x); x.connect(lp); }
    const g = amp(c, t, v, 0.003, dec / 3, t + dur, 0.12);
    lp.connect(g);
    route(c, g, bus, o.pan || 0, o.send ?? 0.3);
  },
  epiano(c, bus, t, f, dur, v, o = {}) {
    const end = Math.min(t + dur + 0.6, t + 6);
    const car = osc(c, 'sine', f, t, end), mod = osc(c, 'sine', f, t, end);
    const mg = c.createGain(); mg.gain.setValueAtTime(f * 1.1, t); mg.gain.setTargetAtTime(f * 0.15, t, 0.12);
    mod.connect(mg); mg.connect(car.frequency);
    const g = amp(c, t, v, 0.004, 0.9, t + dur, 0.2);
    car.connect(g);
    route(c, g, bus, o.pan || 0, o.send ?? 0.35);
  },
  organ(c, bus, t, f, dur, v, o = {}) {
    const end = t + dur + 0.5;
    const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = o.cut || 2200;
    for (const [r, gg] of [[1, 1], [2, 0.45], [3, 0.2], [4, 0.08]]) { const a = osc(c, 'sine', f * r, t, end); const x = c.createGain(); x.gain.value = gg; a.connect(x); x.connect(lp); }
    const g = amp(c, t, v, 0.03, null, t + dur, 0.08);
    lp.connect(g);
    route(c, g, bus, o.pan || 0, o.send ?? 0.35);
  },
  // Akordeon / bandoneon
  reed(c, bus, t, f, dur, v, o = {}) {
    const end = t + dur + 0.5;
    const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = o.cut || 1700; lp.Q.value = 0.7;
    for (const d of [-7, 7]) { const a = osc(c, 'square', f, t, end); a.detune.value = d; a.connect(lp); }
    const g = amp(c, t, v, o.attack || 0.05, null, t + dur, 0.09);
    lp.connect(g);
    route(c, g, bus, o.pan || 0, o.send ?? 0.3);
  },
  synth(c, bus, t, f, dur, v, o = {}) {
    const end = t + dur + 0.6;
    const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.Q.value = 2;
    lp.frequency.setValueAtTime(o.cut || 1800, t); lp.frequency.setTargetAtTime(o.cut ? o.cut / 3 : 600, t, 0.25);
    const a = osc(c, 'square', f, t, end); a.detune.value = -4; a.connect(lp);
    const b = osc(c, 'sawtooth', f, t, end); b.detune.value = 5; b.connect(lp);
    const g = amp(c, t, v, 0.01, null, t + dur, 0.15);
    lp.connect(g);
    route(c, g, bus, o.pan || 0, o.send ?? 0.45);
  },
  bass(c, bus, t, f, dur, v, o = {}) {
    const end = t + dur + 0.5;
    const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = o.cut || 520;
    lp.Q.value = o.q || 0.8;
    const a = osc(c, 'sine', f, t, end), b = osc(c, o.wave || 'triangle', f, t, end);
    const bg = c.createGain(); bg.gain.value = o.body ?? 0.6;
    a.connect(lp); b.connect(bg); bg.connect(lp);
    const g = amp(c, t, v, 0.008, o.tau || 0.6, t + dur, 0.08);
    lp.connect(g);
    route(c, g, bus, 0, o.send ?? 0.12);
  },
};

// ---------------------------------------------------------------- vurmalılar
const DRUM = {
  // bendir / def: düm
  D(c, bus, t, v) {
    const a = osc(c, 'sine', 120, t, t + 1); a.frequency.setTargetAtTime(58, t, 0.05);
    const g = amp(c, t, v * 0.5, 0.003, 0.2, null); a.connect(g);
    const n = nz(c, t, t + 0.2), bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 380; bp.Q.value = 1.4;
    const ng = amp(c, t, v * 0.12, 0.002, 0.03, null); n.connect(bp); bp.connect(ng); ng.connect(g);
    route(c, g, bus, 0, 0.25);
  },
  // tek
  t(c, bus, t, v) {
    const n = nz(c, t, t + 0.3), bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2100; bp.Q.value = 1.2;
    const g = amp(c, t, v * 0.16, 0.002, 0.035, null); n.connect(bp); bp.connect(g);
    const a = osc(c, 'sine', 520, t, t + 0.3); const ag = amp(c, t, v * 0.06, 0.002, 0.03, null); a.connect(ag); ag.connect(g);
    route(c, g, bus, 0.15, 0.3);
  },
  k(c, bus, t, v) {
    const a = osc(c, 'sine', 115, t, t + 0.8); a.frequency.setTargetAtTime(46, t, 0.035);
    const g = amp(c, t, v * 0.5, 0.002, 0.13, null); a.connect(g);
    route(c, g, bus, 0, 0.08);
  },
  h(c, bus, t, v) {
    const n = nz(c, t, t + 0.2), hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 7500;
    const g = amp(c, t, v * 0.06, 0.001, 0.018, null); n.connect(hp); hp.connect(g);
    route(c, g, bus, -0.25, 0.2);
  },
  s(c, bus, t, v) { // fırça trampet
    const n = nz(c, t, t + 0.5), bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2300; bp.Q.value = 0.7;
    const g = amp(c, t, v * 0.1, 0.004, 0.07, null); n.connect(bp); bp.connect(g);
    const a = osc(c, 'triangle', 190, t, t + 0.3); const ag = amp(c, t, v * 0.08, 0.002, 0.04, null); a.connect(ag); ag.connect(g);
    route(c, g, bus, 0.1, 0.3);
  },
  j(c, bus, t, v) { // zil / sistrum
    const g = c.createGain(); g.gain.value = 1;
    for (let i = 0; i < 3; i++) {
      const tt = t + i * 0.013;
      const n = nz(c, tt, tt + 0.3), bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 7200 + i * 600; bp.Q.value = 3;
      const x = amp(c, tt, v * 0.09 * (1 - i * 0.25), 0.001, 0.04, null); n.connect(bp); bp.connect(x); x.connect(g);
    }
    route(c, g, bus, -0.3, 0.35);
  },
  x(c, bus, t, v) { // kabak çıngırak
    const n = nz(c, t, t + 0.3), bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 5200; bp.Q.value = 1;
    const g = amp(c, t, v * 0.05, 0.012, 0.035, null); n.connect(bp); bp.connect(g);
    route(c, g, bus, 0.3, 0.3);
  },
};

// ---------------------------------------------------------------- besteci
class Player {
  constructor(c, prof, bus) {
    this.c = c; this.p = prof; this.bus = bus;
    this.bar = 0; this.phrase = []; this.motif = null;
    this.last = prof.lead ? (prof.lead.start ?? Math.floor((prof.lead.range[0] + prof.lead.range[1]) / 2)) : 0;
    this.spb = prof.meter * prof.sub;
  }
  get barDur() { return (this.p.meter * 60) / this.p.bpm; }
  get stepDur() { return 60 / this.p.bpm / this.p.sub; }
  freq(deg, oct = 0) {
    const s = this.p.scale, L = s.length;
    const o = Math.floor(deg / L);
    return mtof(this.p.root) * 2 ** ((s[((deg % L) + L) % L] + 1200 * (o + oct)) / 1200);
  }
  chord(bar) {
    const p = this.p;
    return p.prog[Math.floor(bar / (p.chordBars || 2)) % p.prog.length];
  }
  chordTones(root) { return this.p.scale.length >= 7 ? [root, root + 2, root + 4] : [root, root + 2, root + 3]; }
  snap(deg, root) {
    const L = this.p.scale.length;
    const ok = (d) => this.chordTones(root).some((x) => (((d - x) % L) + L) % L === 0);
    for (const k of [0, 1, -1, 2, -2]) if (ok(deg + k)) return deg + k;
    return deg;
  }

  genMotif(bar0, steps) {
    const L = this.p.lead, ev = [];
    const [lo, hi] = L.range;
    let d = this.last;
    for (let s = 0; s < steps; s++) {
      const inBar = s % this.spb;
      const w = inBar === 0 ? 1 : inBar % this.p.sub === 0 ? 0.62 : 0.28;
      const prob = s === 0 ? 0.75 : L.density * w * 1.6;
      if (Math.random() < prob) {
        d += pick(L.moves || [-2, -1, -1, 0, 1, 1, 2, 3, -3]);
        if (d < lo) d = lo + 1; if (d > hi) d = hi - 1;
        ev.push({ step: s, deg: d });
      }
    }
    if (ev.length < 2) ev.push({ step: Math.floor(steps / 2), deg: this.last });
    return ev;
  }

  genPhrase(bar0) {
    const L = this.p.lead;
    if (!L) return [];
    if (Math.random() < (L.rest ?? 0.3)) return []; // nefes payı
    const half = this.spb * 2;
    let motif;
    if (this.motif && Math.random() < 0.55) motif = this.motif.map((e) => ({ ...e }));
    else { motif = this.genMotif(bar0, half); this.motif = motif.map((e) => ({ ...e })); }
    const second = motif.map((e) => ({ ...e, step: e.step + half }));
    // ikinci yarının sonunu değiştir: soru → cevap
    const cut = Math.floor(second.length * 0.6);
    for (let i = cut; i < second.length; i++) second[i].deg += pick([-2, -1, 0, 1]);
    const all = motif.concat(second);
    const bars = (s) => bar0 + Math.floor(s / this.spb);
    for (const e of all) {
      if (e.step % this.p.sub === 0) e.deg = this.snap(e.deg, this.chord(bars(e.step)));
    }
    const lastE = all[all.length - 1];
    const r = this.chord(bars(lastE.step));
    const L7 = this.p.scale.length;
    lastE.deg = r + L7 * Math.round((lastE.deg - r) / L7);
    if (lastE.deg < L.range[0]) lastE.deg += L7;
    if (lastE.deg > L.range[1]) lastE.deg -= L7;
    for (let i = 0; i < all.length; i++) {
      const nx = i + 1 < all.length ? all[i + 1].step : this.spb * 4;
      all[i].len = Math.min(nx - all[i].step, L.maxLen || this.p.sub * 3);
    }
    this.last = lastE.deg;
    return all;
  }

  scheduleBar(t, mood) {
    const c = this.c, p = this.p, bus = this.bus, sd = this.stepDur, bd = this.barDur;
    const dark = mood === 'dark';
    const bar = this.bar++;
    const root = this.chord(bar);
    const hum = () => rnd(-0.008, 0.008);
    const chordStart = bar % (p.chordBars || 2) === 0;

    // dem
    if (p.drone && bar % (p.drone.bars || 4) === 0) {
      const D = p.drone;
      const f = this.freq(D.deg || 0, D.oct ?? -1);
      (INST[D.inst || 'drone'])(c, bus, t, f, bd * (D.bars || 4) + 1.4, D.vol ?? 0.07, D);
    }
    // ses halısı
    if (p.pad && chordStart) {
      const P = p.pad;
      const dur = bd * (p.chordBars || 2) + 0.2;
      this.chordTones(root).forEach((d, i) => {
        INST[P.inst || 'pad'](c, bus, t + i * 0.03, this.freq(d, P.oct ?? 0), dur, (P.vol ?? 0.035) * (dark ? 0.8 : 1), { ...P, pan: (i - 1) * 0.35 });
      });
    }
    // bas
    if (p.bass) {
      const B = p.bass, pat = B.pattern;
      const marks = [];
      for (let s = 0; s < pat.length; s++) if (pat[s] !== '.' && pat[s] !== '-') marks.push(s);
      marks.forEach((s, i) => {
        if (dark && s !== 0) return;
        const ch = pat[s];
        const d = ch === 'F' ? root + (p.scale.length >= 7 ? 4 : 3) : ch === 'O' ? root + p.scale.length : root;
        const len = ((marks[i + 1] ?? pat.length) - s) * sd;
        INST[B.inst || 'bass'](c, bus, t + s * sd + hum(), this.freq(d, B.oct ?? -1), dark ? bd : Math.min(len * 0.95, B.max || 9), (B.vol ?? 0.16) * rnd(0.9, 1.05), B);
      });
    }
    // eşlik
    if (p.harm && !dark) {
      const H = p.harm, pats = Array.isArray(H.pattern) ? H.pattern : [H.pattern];
      const pat = pats[bar % pats.length];
      const tones = this.chordTones(root);
      for (let s = 0; s < pat.length; s++) {
        const ch = pat[s];
        if (ch === '.') continue;
        if (Math.random() < (H.skip ?? 0.08)) continue;
        const tt = t + s * sd + hum();
        const v = (H.vol ?? 0.08) * rnd(0.85, 1.05);
        const len = sd * (H.len || 2);
        if (ch === 'c') tones.forEach((d, i) => INST[H.inst](c, bus, tt + i * (H.strum ?? 0.018), this.freq(d, H.oct ?? 0), len, v * 0.75, { ...H, pan: (i - 1) * 0.3 }));
        else {
          const idx = Number(ch) - 1;
          const d = idx === 3 ? tones[0] + p.scale.length : tones[idx];
          INST[H.inst](c, bus, tt, this.freq(d, H.oct ?? 0), len, v, { ...H, pan: H.pan ?? (s % 2 ? 0.25 : -0.25) });
        }
      }
    }
    // ezgi
    if (p.lead) {
      if (bar % 4 === 0) this.phrase = this.genPhrase(bar);
      const L = p.lead, off = (bar % 4) * this.spb;
      for (const e of this.phrase) {
        if (e.step < off || e.step >= off + this.spb) continue;
        if (dark && Math.random() < 0.55) continue;
        const tt = t + (e.step - off) * sd + hum();
        const v = (L.vol ?? 0.11) * (e.step % this.spb === 0 ? 1 : rnd(0.75, 0.95)) * (dark ? 0.7 : 1);
        INST[L.inst](c, bus, tt, this.freq(e.deg, L.oct ?? 1), e.len * sd * (L.legato ?? 0.92), v, L);
      }
    }
    // vurmalılar
    if (p.perc && !dark) {
      const pats = Array.isArray(p.perc.pattern) ? p.perc.pattern : [p.perc.pattern];
      const pat = pats[bar % pats.length];
      const vol = p.perc.vol ?? 1;
      for (let s = 0; s < pat.length; s++) {
        const ch = pat[s];
        if (!DRUM[ch]) continue;
        if ('thxj'.includes(ch) && Math.random() < 0.12) continue;
        const v = vol * (s % this.p.sub === 0 ? 1 : 0.7) * rnd(0.85, 1.05);
        DRUM[ch](c, bus, t + s * sd + hum(), v);
      }
    }
    // ara sıra uzak çan / zil vurgusu
    if (p.accent && bar % (p.accent.every || 8) === 0 && Math.random() < (p.accent.prob ?? 0.6)) {
      const A = p.accent;
      INST[A.inst || 'bell'](c, bus, t + rnd(0, bd * 0.5), this.freq(pick(this.chordTones(root)), A.oct ?? 1), bd, A.vol ?? 0.04, A);
    }
  }
}

// ---------------------------------------------------------------- çalar (gerçek zamanlı)
const S = { c: null, g: null, cur: null, timer: 0, enabled: true, era: 1, mood: 'calm', ready: false };
const LOOK = 0.6;

function profile(era) { return PROFILES[era] || PROFILES[1]; }

function tick() {
  const cur = S.cur;
  if (!cur || !S.c) return;
  const now = S.c.currentTime;
  if (cur.next < now - 0.5) cur.next = now + 0.05; // uzun duraklamadan sonra yeniden hizala
  while (cur.next < now + LOOK) {
    cur.player.scheduleBar(cur.next, S.mood);
    cur.next += cur.player.barDur;
  }
}

function fadeBus(bus, to, sec) {
  const now = S.c.currentTime;
  for (const n of [bus.dry, bus.wet]) {
    n.gain.cancelScheduledValues(now);
    n.gain.setValueAtTime(n.gain.value, now);
    n.gain.linearRampToValueAtTime(to, now + sec);
  }
}

function startEra(era, delay = 0.15) {
  const prof = profile(era);
  const bus = makeBus(S.c, S.g);
  const player = new Player(S.c, prof, bus);
  const now = S.c.currentTime;
  for (const [n, v] of [[bus.dry, 1], [bus.wet, prof.wet ?? 0.4]]) {
    n.gain.setValueAtTime(0, now);
    n.gain.linearRampToValueAtTime(v, now + delay + 2.5);
  }
  S.cur = { era, bus, player, next: now + delay };
  tick();
}

function stopCurrent(sec = 2.5) {
  const old = S.cur;
  if (!old) return;
  S.cur = null;
  fadeBus(old.bus, 0, sec);
  setTimeout(() => { try { old.bus.dry.disconnect(); old.bus.wet.disconnect(); } catch { /* zaten kopmuş */ } }, (sec + 6) * 1000);
}

function ensureContext() {
  if (S.c) return true;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return false;
  try {
    S.c = new AC({ latencyHint: 'playback' });
  } catch {
    S.c = new AC();
  }
  S.g = buildGraph(S.c);
  return true;
}

function play() {
  if (!S.enabled || !S.ready || !ensureContext()) return;
  if (S.c.state !== 'running') S.c.resume().catch(() => {});
  if (!S.cur) startEra(S.era);
  if (!S.timer) S.timer = setInterval(tick, 120);
}

/** Uygulama açılışında bir kez çağır. Ses, ilk dokunuşta başlar (tarayıcı kuralı). */
export function initMusic() {
  try { S.enabled = localStorage.getItem('muzik') !== '0'; } catch { S.enabled = true; }
  const unlock = () => {
    if (S.ready) return;
    S.ready = true;
    play();
    // iOS bazen ilk dokunuşta açmaz; birkaç dokunuş daha dene
    if (S.c && S.c.state !== 'running') { S.ready = false; }
  };
  for (const ev of ['pointerdown', 'touchend', 'click', 'keydown']) window.addEventListener(ev, unlock, { capture: true, passive: true });
  document.addEventListener('visibilitychange', () => (document.hidden ? pauseMusic() : resumeMusic()));
}

export function pauseMusic() {
  if (S.c && S.c.state === 'running') S.c.suspend().catch(() => {});
}

export function resumeMusic() {
  if (!S.c || !S.enabled || document.hidden) return;
  S.c.resume().catch(() => {});
}

/** Çağ değişince yumuşak geçiş. */
export function setEra(era) {
  era = Number(era) || 1;
  if (S.era === era && S.cur) return;
  S.era = era;
  if (!S.c || !S.enabled || !S.ready) return;
  if (S.cur && S.cur.era === era) return;
  stopCurrent(2.5);
  startEra(era, 1.6);
}

/** 'dark' : yangın, deprem, salgın gibi sahnelerde ezgi ve vurmalılar çekilir. */
export function setMood(m) { S.mood = m === 'dark' ? 'dark' : 'calm'; }

export function musicEnabled() { return S.enabled; }

export function setMusicEnabled(on) {
  S.enabled = !!on;
  try { localStorage.setItem('muzik', on ? '1' : '0'); } catch { /* yok */ }
  if (on) { S.ready = true; play(); }
  else { stopCurrent(0.8); }
  return S.enabled;
}

// ---------------------------------------------------------------- test için: çevrimdışı çal
export async function renderOffline(era, seconds = 40, mood = 'calm', sr = 44100, only = null) {
  const c = new OfflineAudioContext(2, Math.floor(sr * seconds), sr);
  const g = buildGraph(c);
  let prof = profile(era);
  if (only) { prof = { ...prof }; for (const k of ['drone', 'pad', 'bass', 'harm', 'lead', 'perc', 'accent']) if (k !== only) delete prof[k]; }
  const bus = makeBus(c, g);
  bus.dry.gain.value = 1; bus.wet.gain.value = prof.wet ?? 0.4;
  const pl = new Player(c, prof, bus);
  for (let t = 0.1; t < seconds - 0.5; t += pl.barDur) pl.scheduleBar(t, mood);
  return c.startRendering();
}
