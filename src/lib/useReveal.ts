'use client';

import { useEffect, type RefObject } from 'react';
import { gsap } from './gsap';
import { prefersReducedMotion } from './motion';

// Révèle au scroll les lignes masquées (.line-mask > span) et les blocs [data-reveal] d'une section
export function useReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.line-mask > span', el).forEach((line) => {
        gsap.from(line, {
          yPercent: 110,
          rotate: 3,
          duration: 1.3,
          ease: 'expo.out',
          scrollTrigger: { trigger: line, start: 'top 90%' },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal]', el).forEach((block) => {
        gsap.from(block, {
          y: 40,
          autoAlpha: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: block, start: 'top 88%' },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-rule]', el).forEach((rule) => {
        gsap.from(rule, {
          scaleX: 0,
          transformOrigin: 'left',
          duration: 1.4,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: rule, start: 'top 92%' },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [ref]);
}
