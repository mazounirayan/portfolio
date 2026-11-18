'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { tripView, visibleLabels } from '@/lib/mapView';
import { prefersReducedMotion } from '@/lib/motion';
import { trips, type City } from '@/content/interests';
import styles from './EuropeMap.module.css';

const W = 160;
const H = 110;
const pt = (c: City) => ({ x: (c.x / 100) * W, y: (c.y / 100) * H });

type Segment = { d: string; flight: boolean };

// Itinéraire d'un voyage : un arc par étape ; les vols sont plus bombés et en pointillés
function segments(cities: City[]): Segment[] {
  const p = cities.map(pt);
  return p.slice(1).map((c, i) => {
    const prev = p[i];
    const flight = cities[i + 1].via === 'vol';
    const bend = flight ? 0.35 : 0.25;
    const mx = (prev.x + c.x) / 2;
    const my = (prev.y + c.y) / 2 - Math.hypot(c.x - prev.x, c.y - prev.y) * bend;
    return { d: `M ${prev.x} ${prev.y} Q ${mx} ${my} ${c.x} ${c.y}`, flight };
  });
}

// Dessine les étapes d'un voyage l'une après l'autre (les vols apparaissent en fondu)
function drawTrip(group: Element | null, duration: number) {
  if (!group) return gsap.timeline();
  const tl = gsap.timeline();
  group.querySelectorAll<SVGPathElement>('path').forEach((path) => {
    if (path.dataset.flight) {
      tl.fromTo(path, { opacity: 0 }, { opacity: 1, duration: duration * 0.8, ease: 'power2.out' });
      return;
    }
    const len = path.getTotalLength();
    tl.fromTo(
      path,
      { strokeDasharray: len, strokeDashoffset: len },
      { strokeDashoffset: 0, duration: duration, ease: 'power2.inOut' },
    );
  });
  return tl;
}

type Props = {
  active: number | null;
  onActivate: (i: number | null) => void;
};

// Carte en constellation : vue d'ensemble des voyages, zoom sur le voyage choisi
export default function EuropeMap({ active, onActivate }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const view = tripView(active === null ? [] : trips[active].cities);
  const shown = active === null ? [] : visibleLabels(trips[active].cities, view.s);

  // À l'entrée dans l'écran : tous les trajets se dessinent d'un coup, sans dépendre du scroll
  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const all = gsap.timeline({ paused: true });
      el.querySelectorAll('[data-trip-routes]').forEach((g) => all.add(drawTrip(g, 0.45), 0));
      all.progress(0);
      // onEnterBack : si la page est rechargée plus bas, le tracé se joue en remontant
      gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 75%', onEnter: () => all.play(), onEnterBack: () => all.play() } });
      gsap.from(`.${styles.dot}`, {
        scale: 0,
        stagger: 0.04,
        duration: 0.7,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: el, start: 'top 75%' },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  // Choisir un voyage rejoue le tracé de son itinéraire
  useEffect(() => {
    const el = root.current;
    if (!el || active === null || prefersReducedMotion()) return;
    const tl = drawTrip(el.querySelector(`[data-trip-routes="${active}"]`), 0.35);
    tl.delay(0.4);
    return () => {
      tl.progress(1).kill();
    };
  }, [active]);

  return (
    <div ref={root} className={styles.map} data-zoomed={active !== null || undefined}>
      <div
        className={styles.camera}
        style={{ transform: `translate(${view.tx}%, ${view.ty}%) scale(${view.s})`, ['--inv' as string]: 1 / view.s }}
      >
        <svg viewBox={`0 0 ${W} ${H}`} className={styles.svg} aria-hidden="true">
          {Array.from({ length: 7 }, (_, i) => (
            <line key={`m${i}`} x1={i * 25 + 5} y1="0" x2={i * 25 + 5} y2={H} className={styles.grid} />
          ))}
          {Array.from({ length: 5 }, (_, i) => (
            <line key={`p${i}`} x1="0" y1={i * 25 + 5} x2={W} y2={i * 25 + 5} className={styles.grid} />
          ))}
          {trips.map((t, i) => (
            <g key={t.name} data-trip-routes={i} className={active !== null && active !== i ? styles.dim : ''}>
              {segments(t.cities).map((seg, j) => (
                <path
                  key={j}
                  d={seg.d}
                  className={seg.flight ? styles.flight : styles.route}
                  data-flight={seg.flight || undefined}
                />
              ))}
            </g>
          ))}
        </svg>

        {trips.map((t, ti) => {
          const isActive = active === ti;
          const dim = active !== null && !isActive;
          const first = t.cities[0];
          return (
            <div key={t.name} className={`${styles.trip} ${dim ? styles.dim : ''}`}>
              <span
                className={`mono ${styles.tripLabel} ${active !== null ? styles.hidden : ''}`}
                style={{ left: `${first.x}%`, top: `${first.y}%` }}
                aria-hidden="true"
              >
                {t.name}
              </span>
              {t.cities.map((c, ci) => (
                <span key={c.city} className={styles.city} style={{ left: `${c.x}%`, top: `${c.y}%` }}>
                  <button
                    type="button"
                    className={styles.dot}
                    aria-label={`${c.city}, ${c.country} — voyage ${t.name}${t.year ? `, ${t.year}` : ''}`}
                    onMouseEnter={() => onActivate(ti)}
                    onFocus={() => onActivate(ti)}
                    onClick={() => onActivate(isActive ? null : ti)}
                  />
                  <span
                    className={`${styles.label} ${styles[c.side ?? 'right']} ${isActive && shown[ci] ? styles.on : ''}`}
                    aria-hidden="true"
                  >
                    {c.city}
                  </span>
                </span>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
