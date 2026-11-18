'use client';

import { useRef, useState } from 'react';
import { useReveal } from '@/lib/useReveal';
import { accords, screens, trips } from '@/content/interests';
import Chapter from './Chapter';
import EuropeMap from './EuropeMap';
import styles from './Interests.module.css';

const pad = (n: number) => String(n).padStart(2, '0');
const cityCount = trips.reduce((n, t) => n + t.cities.length, 0);

export default function Interests() {
  const root = useRef<HTMLElement>(null);
  const [trip, setTrip] = useState<number | null>(null);
  useReveal(root);

  return (
    <section ref={root} id="hors-cadre" className={styles.interests} aria-labelledby="hors-cadre-titre">
      <Chapter id="hors-cadre-titre" title={['Ce qui ne rentre', 'pas dans un CV']} offset={1} />

      {/* ---------- Parfumerie : chaque accord est un mélange de deux parfums ---------- */}
      <div className={styles.perfume}>
        <div className={styles.intro} data-reveal>
          <h3>Deux parfums, un troisième</h3>
          <p>Je collectionne, je superpose, je chasse les dupes. Mes mélanges du moment :</p>
        </div>

        <ol className={styles.accords}>
          {accords.map((a) => (
            <li key={a.name} className={styles.accord} data-reveal>
              <div className={styles.blend} aria-hidden="true">
                <span className={`${styles.drop} ${styles.dropA}`} />
                <span className={`${styles.drop} ${styles.dropB}`} />
              </div>
              <div className={styles.formula}>
                <span className={`mono ${styles.no}`}>
                  {a.name}
                </span>
                <p className={styles.notes}>
                  <span>{a.pair[0]}</span>
                  <span className={styles.plus}>+</span>
                  <span>{a.pair[1]}</span>
                </p>
                <p className={styles.mood}>{a.mood}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* ---------- Voyages : liste des itinéraires + carte qui zoome ---------- */}
      <div className={styles.travel}>
        <div className={styles.travelSide}>
          <div className={styles.intro} data-reveal>
            <h3>
              {cityCount} villes,
              <br />
              {trips.length} voyages.
            </h3>
            <p>De Barcelone à Budapest. Choisissez un voyage pour suivre son itinéraire.</p>
          </div>

          <ol className={styles.trips} onMouseLeave={() => setTrip(null)} data-reveal>
            {trips.map((t, i) => (
              <li key={t.name}>
                <button
                  type="button"
                  className={`${styles.tripRow} ${trip === i ? styles.tripOn : ''}`}
                  aria-pressed={trip === i}
                  onMouseEnter={() => setTrip(i)}
                  onFocus={() => setTrip(i)}
                  onClick={() => setTrip(trip === i ? null : i)}
                >
                  <span className={`mono ${styles.tripYear}`}>{t.year ?? '—'}</span>
                  <span className={styles.tripName}>{t.name}</span>
                  <span className={styles.tripCities}>
                    {t.cities.map((c, j) => (j === 0 ? c.city : `${c.via === 'vol' ? ' ✈ ' : ' → '}${c.city}`)).join('')}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.mapWrap} data-reveal>
          <EuropeMap active={trip} onActivate={setTrip} />
        </div>
      </div>

      {/* ---------- Écrans ---------- */}
      <div className={styles.screens}>
        <div data-reveal>
          <h3 className={styles.listTitle}>Manette en main</h3>
          <ul className={styles.titles}>
            {screens.games.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
        <div data-reveal>
          <h3 className={styles.listTitle}>Séries</h3>
          <ul className={styles.titles}>
            {screens.series.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
