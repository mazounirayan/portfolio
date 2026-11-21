'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';
import { eras } from '@/content/profile';
import Ring from './Ring';
import styles from './Portal.module.css';

// Le portail : on traverse l'anneau une fois par époque
export default function Portal() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    el.dataset.motion = 'on';

    const ctx = gsap.context(() => {
      const years = gsap.utils.toArray<HTMLElement>(`.${styles.year}`);
      const captions = gsap.utils.toArray<HTMLElement>(`.${styles.caption}`);
      const n = eras.length;

      gsap.set([...years, ...captions], { autoAlpha: 0 });
      // Centrage géré par GSAP (le CSS `translate` serait écrasé par les transformations)
      gsap.set([`.${styles.portal}`, `.${styles.glow}`], { xPercent: -50, yPercent: -50 });
      gsap.set(years, { xPercent: -50, yPercent: -20, scale: 0.9 });
      gsap.set(captions, { y: 40 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: `+=${(n + 0.5) * 100}%`,
          pin: `.${styles.stage}`,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      for (let i = 0; i < n; i++) {
        const at = i;
        // Entrée de l'époque
        tl.to(years[i], { autoAlpha: 1, yPercent: -50, scale: 1, duration: 0.35, ease: 'power2.out' }, at)
          .to(captions[i], { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' }, at + 0.08)
          // On traverse l'anneau
          .fromTo(`.${styles.portal}`, { scale: 0.62, rotate: i * 40 }, { scale: 1.9, rotate: i * 40 + 40, duration: 1 }, at)
          .fromTo(`.${styles.glow}`, { autoAlpha: 0.2, scale: 0.6 }, { autoAlpha: 0.9, scale: 1.4, duration: 1 }, at)
          .to(`.${styles.bar}`, { scaleX: (i + 1) / n, duration: 0.3 }, at);
        // Sortie (sauf la dernière, qui reste à l'écran)
        if (i < n - 1) {
          tl.to(years[i], { autoAlpha: 0, yPercent: -80, scale: 1.08, duration: 0.3, ease: 'power2.in' }, at + 0.7).to(
            captions[i],
            { autoAlpha: 0, y: -30, duration: 0.25, ease: 'power2.in' },
            at + 0.72,
          );
        }
      }
      // Le rappel « continuer à défiler » disparaît sur la dernière époque
      tl.to(`.${styles.hint}`, { autoAlpha: 0, duration: 0.3 }, n - 1);
      tl.to({}, { duration: 0.5 });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="portail" className={styles.portal_section} aria-labelledby="portail-titre">
      <div className={styles.stage}>
        <div className={styles.head}>
          <p id="portail-titre" className="mono">Mon parcours</p>
          <div className={styles.track} aria-hidden="true">
            <span className={styles.bar} />
          </div>
        </div>

        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.portal} aria-hidden="true">
          <Ring progress={1} />
        </div>

        <p className={`mono ${styles.hint}`} aria-hidden="true">
          Continuer à défiler <span>↓</span>
        </p>

        <ol className={styles.list}>
          {eras.map((era) => (
            <li key={era.year} className={styles.item}>
              <span className={styles.year} aria-hidden="true">
                {era.year}
              </span>
              <div className={styles.caption}>
                <span className="mono">{era.year}</span>
                <h3>{era.title}</h3>
                <p>{era.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
