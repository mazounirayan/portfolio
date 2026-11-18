'use client';

import { useEffect, useRef } from 'react';
import { useReveal } from '@/lib/useReveal';
import Chapter from '../Chapter';
import Equalizer from './Equalizer';
import { usePlayer } from './PlayerProvider';
import styles from './Playlist.module.css';

const pad = (n: number) => String(n).padStart(2, '0');

export default function Playlist() {
  const root = useRef<HTMLElement>(null);
  const { tracks, current, playing, progress, play, toggle, prefetch } = usePlayer();
  useReveal(root);

  // Charge les pochettes quand la section approche de l'écran
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          prefetch();
          io.disconnect();
        }
      },
      { rootMargin: '600px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [prefetch]);

  const track = current === null ? null : tracks[current];

  return (
    <section ref={root} id="playlist" className={styles.playlist} aria-labelledby="playlist-titre">
      <Chapter id="playlist-titre" number="05" label="Playlist" title={['En boucle,', 'toujours']} accent={1} />

      <div className={styles.layout}>
        <div className={styles.deck} data-reveal>
          <button
            type="button"
            className={`${styles.vinyl} ${playing ? styles.spinning : ''}`}
            onClick={toggle}
            aria-label={playing ? 'Mettre en pause' : 'Lancer la playlist'}
            data-cursor="lens"
            data-cursor-label={playing ? 'Pause' : 'Play'}
          >
            <span className={styles.grooves} aria-hidden="true" />
            <span className={styles.label} aria-hidden="true">
              {track?.cover ? (
                <img src={track.cover} alt="" />
              ) : (
                <span className={styles.labelText}>
                  <span className="mono">Face A</span>
                  <span className={styles.labelTitle}>Boucle</span>
                </span>
              )}
            </span>
            <span className={styles.spindle} aria-hidden="true" />
          </button>
          <svg className={`${styles.arm} ${playing ? styles.armOn : ''}`} viewBox="0 0 120 260" aria-hidden="true">
            <circle cx="96" cy="24" r="14" className={styles.armBase} />
            <path d="M96 24 L92 190 L70 230" className={styles.armBar} />
            <rect x="58" y="222" width="22" height="30" rx="3" transform="rotate(28 69 237)" className={styles.armHead} />
          </svg>
          <div className={styles.now}>
            <span className="mono">{track ? (playing ? 'Lecture en cours' : 'En pause') : 'Touchez le vinyle'}</span>
            <span className={styles.nowTitle}>{track ? track.title : 'Blues, jazz & Imagine Dragons'}</span>
            <span className={styles.nowArtist}>{track ? track.artist : 'Neuf titres, en boucle'}</span>
            <span className={styles.bar} aria-hidden="true">
              <span style={{ transform: `scaleX(${current === null ? 0 : progress})` }} />
            </span>
          </div>
        </div>

        <ol className={styles.credits}>
          {tracks.map((t, i) => {
            const isCurrent = current === i;
            return (
              <li key={`${t.artist}-${t.title}`} className={`${styles.row} ${isCurrent ? styles.current : ''}`} data-reveal>
                <button type="button" className={styles.rowBtn} onClick={() => play(i)} aria-pressed={isCurrent && playing}>
                  <span className={`mono ${styles.idx}`}>{isCurrent ? <Equalizer active={playing} /> : pad(i + 1)}</span>
                  <span className={styles.trackTitle}>{t.title}</span>
                  <span className={`mono ${styles.artist}`}>{t.artist}</span>
                  <span className={`mono ${styles.state}`}>
                    {t.status === 'loading' && isCurrent ? '…' : t.status === 'unavailable' ? 'Extrait indisponible' : isCurrent && playing ? 'Pause' : 'Écouter'}
                  </span>
                </button>
                <a href={t.link} target="_blank" rel="noreferrer" className={`mono ${styles.full}`} aria-label={`Écouter ${t.title} en entier sur Deezer`}>
                  ↗
                </a>
              </li>
            );
          })}
        </ol>
      </div>

      <p className={`mono ${styles.credit}`}>Extraits de 30 secondes fournis par Deezer · ↗ pour écouter le titre en entier</p>
    </section>
  );
}
