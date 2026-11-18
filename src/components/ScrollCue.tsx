'use client';

import styles from './ScrollCue.module.css';

type Props = { target: string; label: string; className?: string };

// Bouton « défiler » : montre qu'il faut scroller, et emmène à la section suivante au clic
export default function ScrollCue({ target, label, className = '' }: Props) {
  const go = () => {
    const el = document.querySelector<HTMLElement>(target);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.6 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button type="button" className={`${styles.cue} ${className}`} onClick={go}>
      <span className={styles.mouse} aria-hidden="true">
        <span className={styles.wheel} />
      </span>
      <span className="mono">{label}</span>
      <span className={styles.arrow} aria-hidden="true">
        ↓
      </span>
    </button>
  );
}
