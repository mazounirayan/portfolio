'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { yearSequence } from '@/lib/intro';
import { markIntroDone } from '@/lib/introSignal';
import { prefersReducedMotion, shouldPlayIntro } from '@/lib/motion';
import styles from './Intro.module.css';

const SEEN_KEY = 'boucle-intro-seen';
const YEARS = yearSequence(2020, 2026);
const CIRC = 2 * Math.PI * 46;

function readSeen(): boolean {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function writeSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* navigation privée : on rejouera l'intro, sans gravité */
  }
}

// Écran d'ouverture : un compteur 2020 → 2026 dans l'anneau, puis le rideau se lève
export default function Intro() {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [year, setYear] = useState(YEARS[0]);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const finish = () => {
      writeSeen();
      setGone(true);
    };

    if (!shouldPlayIntro({ reduced: prefersReducedMotion(), seen: readSeen() })) {
      // Pas d'intro : simple fondu depuis le noir
      gsap.to(el, { autoAlpha: 0, duration: 0.6, ease: 'power2.out', onStart: markIntroDone, onComplete: finish });
      return;
    }

    document.documentElement.style.overflow = 'hidden';
    // Lenis est créé juste après ce composant : on le fige à la frame suivante,
    // seulement si l'intro joue encore (sinon le gel arriverait après la fin et bloquerait le scroll)
    const freeze = requestAnimationFrame(() => {
      if (tl.current && tl.current.progress() < 1) window.__lenis?.stop();
    });
    const counter = { i: 0 };
    const t = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = '';
        window.__lenis?.start();
        finish();
      },
    });
    tl.current = t;

    t.from(`.${styles.label}`, { autoAlpha: 0, y: 12, duration: 0.6, ease: 'power3.out' })
      .to(`.${styles.arc}`, { strokeDashoffset: 0, duration: 2.1, ease: 'power2.inOut' }, 0.1)
      .to(
        counter,
        {
          i: YEARS.length - 1,
          duration: 2.1,
          ease: 'power2.inOut',
          onUpdate: () => setYear(YEARS[Math.round(counter.i)]),
        },
        0.1,
      )
      .to(`.${styles.count}`, { yPercent: -110, duration: 0.7, ease: 'expo.in' }, '+=0.25')
      .to(`.${styles.ringWrap}`, { scale: 0.4, autoAlpha: 0, duration: 0.7, ease: 'expo.in' }, '<')
      .to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: 'expo.inOut' }, '-=0.15')
      .call(markIntroDone, [], '-=0.75');

    return () => {
      cancelAnimationFrame(freeze);
      t.kill();
      window.__lenis?.start();
      document.documentElement.style.overflow = '';
    };
  }, []);

  const skip = () => {
    tl.current?.progress(1);
  };

  if (gone) return null;

  return (
    <div ref={root} className={styles.intro} role="presentation">
      <div className={styles.ringWrap} aria-hidden="true">
        <svg viewBox="0 0 100 100" className={styles.ring}>
          <circle cx="50" cy="50" r="46" className={styles.track} />
          <circle
            cx="50"
            cy="50"
            r="46"
            className={styles.arc}
            style={{ strokeDasharray: CIRC, strokeDashoffset: CIRC }}
            transform="rotate(-90 50 50)"
          />
        </svg>
      </div>
      <div className={styles.countMask} aria-hidden="true">
        <span className={styles.count}>{year}</span>
      </div>
      <p className={`mono ${styles.label}`}>Chargement de la boucle</p>
      <button type="button" className={`mono ${styles.skip}`} onClick={skip}>
        Passer
      </button>
    </div>
  );
}
