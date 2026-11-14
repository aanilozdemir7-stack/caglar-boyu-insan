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
    seen: [], // görülen rastgele olaylar
    returnTo: null,
    history: [], // [{ era, scene, choice }] — oyun sonu "ya diğerini seçseydin" modu için
    eraLog: [], // her çağın sonunda { era, akil, beden, para, karar }
    eraStarts: {}, // her çağın başındaki durum (yeniden deneme için)
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

// Bir durumun, geçmiş ve kayıt kopyaları olmadan anlık görüntüsü (çağ başlangıcı için).
export function snapshot(st) {
  const { history, eraStarts, eraLog, ...rest } = st;
  void history; void eraStarts; void eraLog;
  return JSON.parse(JSON.stringify(rest));
}

export async function save(st) {
  if (st && st.sandbox) return; // "Ya diğerini seçseydin" denemeleri asıl kaydı bozmaz
  try {
    await Preferences.set({ key: KEY, value: JSON.stringify(st) });
  } catch {
    /* kayıt başarısız olsa da oyun devam eder */
  }
}

export async function wipe() {
  try { await Preferences.remove({ key: KEY }); } catch { /* yok say */ }
}

export { canAfford, applyEffect } from './rules.js';
