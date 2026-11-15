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

// "Bu gece" olayları: o akşama özgü, bir kez yaşanan işler (story/geceler.js).
const nightKey = (st, id) => `${st.era}:${id}`;
function findAct(era, id) {
  return era.hub.acts.find((x) => x.id === id) || (era.hub.nights || []).find((x) => x.id === id);
}

// Akşam başlarken bu geceye özgü iki olay seçilir: yere uyan, daha önce yapılmamış;
// daha önce önerilmemiş olanlar öne alınır.
function pickNights(era, st, rnd) {
  const done = st.nightsDone || [], offered = st.nightsOffered || [];
  const pool = (era.hub.nights || []).filter((n) => !done.includes(nightKey(st, n.id)) && (!n.show || n.show(st)));
  return pool
    .map((n) => [(offered.includes(nightKey(st, n.id)) ? 1 : 0) + rnd(), n.id])
    .sort((a, b) => a[0] - b[0])
    .slice(0, 2)
    .map((x) => x[1]);
}

function hubScene(era, st) {
  const h = era.hub, s = st.hub;
  const intros = typeof h.intro === 'function' ? h.intro(st) : h.intro;
  const intro = intros[(st.day + s.left) % intros.length];
  const nights = (s.nights || []).filter((id) => !s.done.includes(id)).map((id) => findAct(era, id)).filter(Boolean);
  // Her akşam, sıradan işlerin rastgele sıralanmış bir alt kümesi de gösterilir (toplam en fazla 3).
  let r = s.seed || 1;
  const rnd = () => ((r = (r * 9301 + 49297) % 233280) / 233280);
  const order = h.acts.map((a) => [rnd(), a]).sort((x, y) => x[0] - y[0]).map((x) => x[1]);
  const acts = order.filter((a) => !s.done.includes(a.id) && (!a.show || a.show(st))).slice(0, Math.max(1, 3 - nights.length));
  // Akşamın havasını o geceye özgü olaylar verir; sabit giriş cümlesi yalnızca eksik kalırsa kullanılır.
  const hints = nights.map((n) => n.hint).filter(Boolean);
  const lines = s.left === HUB_ACTS
    ? [...(hints.length < 2 ? [intro] : []), ...hints, `Uyumadan önce *üç* iş yapabilirsin.`]
    : [hints[0] || intro, `*${s.left}* işe daha vaktin var.`];
  return {
    bg: s.bg || h.bg, hands: 'dinlen', hub: true,
    lines,
    choices: [
      ...nights.map((n) => ({ text: n.text, cost: n.cost, effect: n.effect, to: '@akt', act: n.id, night: true, info: n.cost ? undefined : 'bu gece' })),
      ...acts.map((a) => ({ text: a.text, cost: a.cost, effect: a.effect, req: a.req, reqText: a.reqText, to: '@akt', act: a.id })),
      { text: 'Erken uyu', effect: { enerji: 10 }, to: '@uyu', info: '+10 enerji' },
    ],
  };
}

function hubResult(era, st) {
  const a = findAct(era, st.hub.last.id);
  const res = typeof a.res[0] === 'string' ? a.res : a.res[st.hub.last.v % a.res.length];
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
  st.nightsOffered = [...new Set([...(st.nightsOffered || []), ...(st.hub.nights || []).map((id) => nightKey(st, id))])];
  st.hub = null;
  return pickEvent(era, st, then, rnd);
}

// Seçimin etkisini uygular ve bir sonraki sahnenin kimliğini st.scene'e yazar.
export function applyChoice(era, st, choiceIndex, rnd = Math.random, { free = false } = {}) {
  const sc = getScene(era, st);
  const c = sc.choices[choiceIndex];
  if (!free) applyEffect(st, c.effect);
  if (!sc.hub) st.history.push({ era: st.era, scene: st.scene, choice: choiceIndex });
  const curBg = sc.bg;
  switch (c.to) {
    case '@don': { const r = st.returnTo; st.returnTo = null; st.scene = r || era.start; break; }
    case '@olay': st.scene = pickEvent(era, st, c.then, rnd); break;
    case '@aksam':
      if (!era.hub) { st.scene = pickEvent(era, st, c.then, rnd); break; }
      st.hub = { then: c.then, left: HUB_ACTS, done: [], bg: era.hub.bg || curBg, last: null, seed: 1 + Math.floor(rnd() * 200000) };
      st.hub.nights = pickNights(era, st, rnd);
      st.scene = HUB;
      break;
    case '@akt':
      st.hub.left -= 1;
      st.hub.done.push(c.act);
      if (c.night) st.nightsDone = [...(st.nightsDone || []), nightKey(st, c.act)];
      st.hub.last = { id: c.act, v: Math.floor(rnd() * 1000) };
      st.scene = HUB_RES;
      break;
    case '@geri': st.scene = st.hub.left > 0 ? HUB : endHub(era, st, rnd); break;
    case '@uyu': st.scene = endHub(era, st, rnd); break;
    default: st.scene = c.to;
  }
  return c;
}
