'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { photoSlots } from '@/lib/photos';
import { useReveal } from '@/lib/useReveal';
import { photos } from '@/content/photos';
import Chapter from './Chapter';
import styles from './FilmStrip.module.css';

const slots = photoSlots(photos);

// Bande de film : le scroll vertical fait défiler la pellicule (ordinateur), glisser natif sur tactile
export default function FilmStrip() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add('(min-width: 821px) and (prefers-reduced-motion: no-preference)', () => {
      el.dataset.motion = 'on';
      const track = el.querySelector<HTMLElement>(`.${styles.track}`);
      const viewport = el.querySelector<HTMLElement>(`.${styles.viewport}`);
      if (!track || !viewport) return;
      const distance = () => track.scrollWidth - viewport.clientWidth;
      const skew = gsap.quickTo(track, 'skewX', { duration: 0.5, ease: 'power3' });

      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: viewport,
          start: 'center center',
          end: () => `+=${distance()}`,
          pin: el,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => skew(gsap.utils.clamp(-6, 6, self.getVelocity() / -400)),
          onLeave: () => skew(0),
          onLeaveBack: () => skew(0),
        },
      });

      return () => {
        delete el.dataset.motion;
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="photos" className={styles.film} aria-labelledby="photos-titre">
      <div className={styles.head}>
        <Chapter id="photos-titre" number="04" label="Photos" title={['Cadrage,', 'lumière, structure']} accent={1} />
        <p className={styles.note}>La photo, c’est aussi de l’architecture. Une pellicule par voyage, en attendant les tirages.</p>
      </div>

      <div className={styles.viewport}>
        <ol className={styles.track}>
          {slots.map((slot) => (
            <li key={slot.frame} className={styles.cell}>
              <div className={styles.frame} data-cursor="lens" data-cursor-label="Voir">
                {slot.kind === 'image' ? (
                  <img src={slot.src} alt={slot.label} loading="lazy" />
                ) : (
                  <div className={styles.placeholder} role="img" aria-label={`${slot.label}, photo à venir`}>
                    <span className={styles.city}>{slot.label.split(' · ')[0]}</span>
                    <span className="mono">En attente du tirage</span>
                  </div>
                )}
              </div>
              <div className={styles.caption}>
                <span className="mono">Plan {slot.frame}</span>
                <span>{slot.label}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
