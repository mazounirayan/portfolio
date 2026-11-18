'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Cursor.module.css';

type Mode = 'default' | 'link' | 'lens';

// Curseur personnalisé : seulement avec une souris (pas sur tactile)
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>('default');
  const [label, setLabel] = useState('');
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    setEnabled(fine.matches);
    const onChange = () => setEnabled(fine.matches);
    fine.addEventListener('change', onChange);
    return () => fine.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-cursor');

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
    };

    const onOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor], a, button');
      if (!el) {
        setMode('default');
        setLabel('');
        return;
      }
      if (el.dataset.cursor === 'lens') {
        setMode('lens');
        setLabel(el.dataset.cursorLabel || '');
      } else {
        setMode('link');
        setLabel('');
      }
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (ring.current) ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ring} className={`${styles.ring} ${styles[mode]}`} aria-hidden="true">
        <span className={styles.ringInner}>{label && <span className={styles.label}>{label}</span>}</span>
      </div>
      <div ref={dot} className={styles.dot} aria-hidden="true" />
    </>
  );
}
