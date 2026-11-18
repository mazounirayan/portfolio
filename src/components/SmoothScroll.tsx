'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

// Défilement fluide (Lenis) synchronisé avec ScrollTrigger ; inactif en mouvement réduit
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Ce composant parent monte après toutes les sections : on recalcule les déclencheurs
    // une fois les épinglages créés, puis quand les polices ont changé la mise en page
    ScrollTrigger.refresh();
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, anchors: true });
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
