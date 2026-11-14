// Kayıt sistemi: her seçimde (checkpoint) oyun cihaza yazılır.
// Capacitor Preferences telefonda kalıcı depolamayı, tarayıcıda localStorage'ı kullanır.
import { Preferences } from '@capacitor/preferences';

const KEY = 'kayit_v1';

export function newGame(avatar) {
  return {
    version: 1,
    avatar,
    era: 1,
    scene: null,
    day: 1,
    para: 3,
    enerji: 70,
    akil: 0,
    beden: 0,
    eraBase: { akil: 0, beden: 0 },
    flags: [],
    history: [], // [{ scene, choice }] — oyun sonu "ya diğerini seçseydin" modu için
    finished: false,
  };
}

export async function load() {
  try {
    const { value } = await Preferences.get({ key: KEY });
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export async function save(st) {
  try {
    await Preferences.set({ key: KEY, value: JSON.stringify(st) });
  } catch {
    /* kayıt başarısız olsa da oyun devam eder */
  }
}

export async function wipe() {
  try { await Preferences.remove({ key: KEY }); } catch { /* yok say */ }
}

export function canAfford(st, cost = {}) {
  if (cost.enerji && st.enerji < cost.enerji) return false;
  if (cost.para && st.para < cost.para) return false;
  return true;
}

export function applyEffect(st, eff = {}) {
  if (eff.enerji) st.enerji = Math.max(0, Math.min(100, st.enerji + eff.enerji));
  if (eff.para) st.para = Math.max(0, st.para + eff.para);
  if (eff.akil) st.akil += eff.akil;
  if (eff.beden) st.beden += eff.beden;
  for (const f of eff.flags || []) if (!st.flags.includes(f)) st.flags.push(f);
}
