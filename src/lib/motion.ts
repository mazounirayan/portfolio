export function prefersReducedMotion(mql?: Pick<MediaQueryList, 'matches'>): boolean {
  if (mql) return mql.matches;
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// L'intro ne se joue qu'une fois par session, et jamais en mouvement réduit
export function shouldPlayIntro(opts: { reduced: boolean; seen: boolean }): boolean {
  return !opts.reduced && !opts.seen;
}
