'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/motion';
import styles from './Ambient.module.css';

// Fond « salle de projection » : un faisceau de lumière chaude qui suit lentement la souris,
// un reflet rouge sombre en bas, et un vignettage. Remplace l'ancien grain qui grisait le noir.
export default function Ambient() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const target = { x: 0.68, y: 0.22 };
    const pos = { ...target };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      // La lumière ne suit qu'en partie le curseur : elle reste un éclairage, pas un projecteur de poursuite
      target.x = 0.5 + (e.clientX / window.innerWidth - 0.5) * 0.6;
      target.y = 0.3 + (e.clientY / window.innerHeight - 0.5) * 0.5;
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.03;
      pos.y += (target.y - pos.y) * 0.03;
      el.style.setProperty('--lx', `${(pos.x * 100).toFixed(2)}%`);
      el.style.setProperty('--ly', `${(pos.y * 100).toFixed(2)}%`);
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={styles.ambient} aria-hidden="true">
      <div className={styles.light} />
      <div className={styles.velvet} />
      <div className={styles.vignette} />
    </div>
  );
}
