'use client';

import { usePlayer } from './PlayerProvider';
import Equalizer from './Equalizer';
import styles from './NowPlaying.module.css';

// Pastille « En boucle », visible partout sur la page
export default function NowPlaying() {
  const { tracks, current, playing, toggle, next } = usePlayer();
  const track = current === null ? null : tracks[current];
  const unavailable = track?.status === 'unavailable';

  return (
    <div className={styles.pill} role="region" aria-label="Lecteur audio">
      <button type="button" className={styles.main} onClick={toggle} aria-label={playing ? 'Mettre en pause' : 'Lancer la playlist'}>
        <Equalizer active={playing} />
        <span className={styles.text}>
          <span className="mono">{playing ? 'En boucle' : track ? 'En pause' : 'Playlist'}</span>
          <span className={styles.title}>
            {track ? (unavailable ? `${track.title} — extrait indisponible` : `${track.title} · ${track.artist}`) : 'Blues, jazz & Imagine Dragons'}
          </span>
        </span>
      </button>
      <button type="button" className={`mono ${styles.next}`} onClick={next} aria-label="Titre suivant">
        →
      </button>
    </div>
  );
}
