// Oyun akışının kuralları (arayüzden bağımsız): sahne bulma, seçim sonrası hedef,
// rastgele olaylar ve "akşam" düzeni. Testler de bu dosyayı kullanır.
import { applyEffect } from './rules.js';

// Hedefler:
//  'sahne'            → doğrudan o sahne
//  '@olay' + then     → olay havuzundan görülmemiş bir olay, sonra then
//  '@don'             → olaydan ana hikâyeye dön
//  '@aksam' + then    → akşam düzeni (3 iş seç), ardından bir olay, sonra then
export const HUB = '__aksam';
export const HUB_RES = '__aksam_sonuc';
const HUB_ACTS = 3;

export function getScene(era, st) {
  if (st.scene === HUB) return hubScene(era, st);
  if (st.scene === HUB_RES) return hubResult(era, st);
  return era.scenes[st.scene];
}

function hubScene(era, st) {
  const h = era.hub, s = st.hub;
  const intro = h.intro[(st.day + s.left) % h.intro.length];
  // Her akşam, işlerin rastgele sıralanmış bir alt kümesi gösterilir (en fazla 3).
  let r = s.seed || 1;
  const rnd = () => ((r = (r * 9301 + 49297) % 233280) / 233280);
  const order = h.acts.map((a) => [rnd(), a]).sort((x, y) => x[0] - y[0]).map((x) => x[1]);
  const acts = order.filter((a) => !s.done.includes(a.id) && (!a.show || a.show(st))).slice(0, 3);
  return {
    bg: s.bg || h.bg, hands: 'dinlen', hub: true,
    lines: [intro, s.left === HUB_ACTS ? `Uyumadan önce *üç* iş yapabilirsin.` : `*${s.left}* işe daha vaktin var.`],
    choices: [
      ...acts.map((a) => ({ text: a.text, cost: a.cost, effect: a.effect, req: a.req, reqText: a.reqText, to: '@akt', act: a.id })),
      { text: 'Erken uyu', effect: { enerji: 10 }, to: '@uyu', info: '+10 enerji' },
    ],
  };
}

function hubResult(era, st) {
  const a = era.hub.acts.find((x) => x.id === st.hub.last.id);
  const res = a.res[st.hub.last.v % a.res.length];
  return { bg: st.hub.bg || era.hub.bg, hands: a.hands || 'uzan', hub: true, lines: res, choices: [{ text: 'Devam et', to: '@geri' }] };
}

function pickEvent(era, st, then, rnd) {
  st.seen = st.seen || [];
  const pool = (era.events || []).filter((e) => !st.seen.includes(e.id) && (!e.when || e.when(st)));
  if (!pool.length) return then;
  const e = pool[Math.floor(rnd() * pool.length)];
  st.seen.push(e.id);
  st.returnTo = then;
  return e.start;
}

function endHub(era, st, rnd) {
  const then = st.hub.then;
  st.hub = null;
  return pickEvent(era, st, then, rnd);
}

// Seçimin etkisini uygular ve bir sonraki sahnenin kimliğini st.scene'e yazar.
export function applyChoice(era, st, choiceIndex, rnd = Math.random) {
  const sc = getScene(era, st);
  const c = sc.choices[choiceIndex];
  applyEffect(st, c.effect);
  if (!sc.hub) st.history.push({ era: st.era, scene: st.scene, choice: choiceIndex });
  const curBg = sc.bg;
  switch (c.to) {
    case '@don': { const r = st.returnTo; st.returnTo = null; st.scene = r || era.start; break; }
    case '@olay': st.scene = pickEvent(era, st, c.then, rnd); break;
    case '@aksam':
      if (!era.hub) { st.scene = pickEvent(era, st, c.then, rnd); break; }
      st.hub = { then: c.then, left: HUB_ACTS, done: [], bg: era.hub.bg || curBg, last: null, seed: 1 + Math.floor(rnd() * 200000) };
      st.scene = HUB;
      break;
    case '@akt':
      st.hub.left -= 1;
      st.hub.done.push(c.act);
      st.hub.last = { id: c.act, v: Math.floor(rnd() * 1000) };
      st.scene = HUB_RES;
      break;
    case '@geri': st.scene = st.hub.left > 0 ? HUB : endHub(era, st, rnd); break;
    case '@uyu': st.scene = endHub(era, st, rnd); break;
    default: st.scene = c.to;
  }
  return c;
}
