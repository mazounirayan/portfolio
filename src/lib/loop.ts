// « Tout ce qui finit recommence » : arrivé tout en bas, on renvoie en haut de la page
export function computeLoopJump(p: { scrollY: number; maxScroll: number; reduced: boolean; threshold?: number }): number | null {
  if (p.reduced || p.maxScroll <= 0) return null;
  return p.scrollY >= p.maxScroll - (p.threshold ?? 2) ? 0 : null;
}
