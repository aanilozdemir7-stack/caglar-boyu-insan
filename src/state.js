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

export { canAfford, applyEffect } from './rules.js';
