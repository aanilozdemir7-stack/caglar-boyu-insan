// Kaynak kuralları (enerji, para, akıl/beden izleri).
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
