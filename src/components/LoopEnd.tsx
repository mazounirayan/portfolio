'use client';

import { useEffect, useRef } from 'react';
import { ScrollTrigger } from '@/lib/gsap';
import { computeLoopJump } from '@/lib/loop';
import { prefersReducedMotion } from '@/lib/motion';
import Hero from './Hero';

// Fin de page : une copie du premier écran. Quand elle atteint le haut de l'écran,
// on revient en haut de la page sur une image identique : la boucle est bouclée.
export default function LoopEnd() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    // Lenis pilote le scroll natif : l'événement `scroll` de window suffit
    // (et Lenis n'existe pas encore quand ce composant enfant monte)
    const onScroll = () => {
      const lenis = window.__lenis;
      if (!lenis) return;
      const jump = computeLoopJump({ scrollY: window.scrollY, maxScroll: el.offsetTop, reduced: prefersReducedMotion() });
      if (jump === null) return;
      lenis.scrollTo(jump, { immediate: true, force: true });
      ScrollTrigger.update();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={root} data-loop-end>
      <Hero clone />
    </div>
  );
}
