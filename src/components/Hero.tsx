'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { assetPath } from '@/lib/asset';
import { onIntroDone } from '@/lib/introSignal';
import { prefersReducedMotion } from '@/lib/motion';
import { profile } from '@/content/profile';
import Ring from './Ring';
import ScrollCue from './ScrollCue';
import styles from './Hero.module.css';

const NAV = [
  { href: '#travaux', label: 'Travaux' },
  { href: '#photos', label: 'Photos' },
  { href: '#playlist', label: 'Playlist' },
  { href: '#contact', label: 'Contact' },
];

function Letters({ word, className }: { word: string; className?: string }) {
  return (
    <span className={`line-mask ${className ?? ''}`} aria-hidden="true">
      {word.split('').map((ch, i) => (
        <span key={i} className={styles.letter}>
          {ch}
        </span>
      ))}
    </span>
  );
}

/** `clone` : copie statique du premier écran, posée en fin de page pour boucler sans coupure */
export default function Hero({ clone = false }: { clone?: boolean }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || clone) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduced) {
        el.dataset.state = 'in';
        return;
      }

      const enter = () => {
        el.dataset.state = 'in';
        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          .fromTo(`.${styles.letter}`, { yPercent: 115, rotate: 6 }, { yPercent: 0, rotate: 0, duration: 1.5, stagger: 0.035 })
          .fromTo(`.${styles.ring}`, { scale: 0.82, autoAlpha: 0, rotate: -40 }, { scale: 1, autoAlpha: 1, rotate: 0, duration: 2 }, 0.1)
          .fromTo(`.${styles.fade}`, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.08 }, 0.5);
      };
      const off = onIntroDone(enter);

      // En quittant le hero : le nom remonte, l'anneau tourne et grandit
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true } })
        .to(`.${styles.name}`, { yPercent: -28, ease: 'none' }, 0)
        .to(`.${styles.ring}`, { rotate: 70, scale: 1.18, ease: 'none' }, 0)
        .to(`.${styles.fadeOut}`, { autoAlpha: 0, ease: 'none' }, 0);

      // L'arc de l'anneau suit la progression dans toute la page
      gsap.to(`.${styles.ring} [data-ring]`, {
        '--p': 1,
        ease: 'none',
        // Calculé en dernier : dépend de la hauteur totale, épinglages compris
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.6, refreshPriority: -1 },
      });

      return off;
    }, el);

    return () => ctx.revert();
  }, [clone]);

  const Title = clone ? 'div' : 'h1';

  return (
    <header
      ref={root}
      className={styles.hero}
      data-state={clone ? 'in' : 'pre'}
      id={clone ? undefined : 'top'}
      aria-hidden={clone || undefined}
      inert={clone || undefined}
      data-hero-clone={clone || undefined}
    >
      <nav className={`${styles.nav} ${styles.fade}`} aria-label="Navigation principale">
        <a href="#top" className={`mono ${styles.mark}`}>
          R—M
        </a>
        <ul>
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="mono">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <p className={`mono ${styles.episode} ${styles.fade} ${styles.fadeOut}`}>Origine</p>

      <div className={styles.ring}>
        <Ring progress={clone ? 1 : 0.08} photoSrc={assetPath(profile.photo)} />
      </div>

      <Title className={styles.name}>
        {!clone && <span className="visually-hidden">{profile.name}</span>}
        <Letters word={profile.firstName} />
        <Letters word={profile.lastName} className={styles.last} />
      </Title>

      <div className={`${styles.meta} ${styles.fadeOut}`}>
        <p className={`${styles.role} ${styles.fade}`}>{profile.role}</p>
        <p className={`${styles.intro} ${styles.fade}`}>{profile.intro}</p>
      </div>

      <div className={`${styles.scroll} ${styles.fade} ${styles.fadeOut}`}>
        <ScrollCue target="#portail" label="Défiler pour entrer" />
      </div>
    </header>
  );
}
