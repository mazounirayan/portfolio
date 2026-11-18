'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { deezerSearchUrl, fallbackLink, jsonp, pickResult, type ResolvedTrack } from '@/lib/deezer';
import { tracks, type Track } from '@/content/playlist';

export type TrackStatus = 'idle' | 'loading' | 'ready' | 'unavailable';

export type PlayerTrack = Track & {
  status: TrackStatus;
  cover: string;
  /** Lien vers le titre complet (Deezer) ou, à défaut, vers la recherche */
  link: string;
};

type PlayerContext = {
  tracks: PlayerTrack[];
  current: number | null;
  playing: boolean;
  progress: number;
  play: (i: number) => void;
  toggle: () => void;
  next: () => void;
  prefetch: () => void;
};

const Ctx = createContext<PlayerContext | null>(null);

export function usePlayer(): PlayerContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('usePlayer doit être utilisé dans <PlayerProvider>');
  return ctx;
}

// Un seul lecteur pour toute la page : extraits de 30 s Deezer, lecture uniquement après un clic
export default function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const resolved = useRef<Map<number, Promise<ResolvedTrack | null>>>(new Map());
  const [meta, setMeta] = useState<Record<number, { status: TrackStatus; data?: ResolvedTrack }>>({});
  const [current, setCurrent] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const currentRef = useRef<number | null>(null);

  const resolve = useCallback((i: number) => {
    const known = resolved.current.get(i);
    if (known) return known;
    setMeta((m) => ({ ...m, [i]: { status: 'loading' } }));
    const p = jsonp(deezerSearchUrl(tracks[i]))
      .then(pickResult)
      .catch(() => null)
      .then((data) => {
        setMeta((m) => ({ ...m, [i]: data ? { status: 'ready', data } : { status: 'unavailable' } }));
        if (!data) resolved.current.delete(i); // nouvel essai possible plus tard
        return data;
      });
    resolved.current.set(i, p);
    return p;
  }, []);

  const play = useCallback(
    (i: number) => {
      const el = audio.current;
      if (!el) return;
      // Même titre déjà chargé : pause / reprise ; sinon (y compris extrait indisponible) on (re)charge
      if (currentRef.current === i && el.src) {
        if (el.paused) void el.play().catch(() => setPlaying(false));
        else el.pause();
        return;
      }
      currentRef.current = i;
      setCurrent(i);
      setProgress(0);
      el.pause();
      el.removeAttribute('src');
      void resolve(i).then((data) => {
        if (currentRef.current !== i) return;
        if (!data) {
          setPlaying(false);
          return;
        }
        el.src = data.preview;
        void el.play().catch(() => setPlaying(false));
      });
    },
    [resolve],
  );

  const next = useCallback(() => {
    const i = currentRef.current === null ? 0 : (currentRef.current + 1) % tracks.length;
    play(i);
  }, [play]);

  const toggle = useCallback(() => {
    if (currentRef.current === null) play(0);
    else play(currentRef.current);
  }, [play]);

  const prefetch = useCallback(() => {
    tracks.forEach((_, i) => void resolve(i));
  }, [resolve]);

  useEffect(() => {
    const el = new Audio();
    el.preload = 'none';
    audio.current = el;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTime = () => setProgress(el.duration ? el.currentTime / el.duration : 0);
    const onEnded = () => {
      const i = currentRef.current === null ? 0 : (currentRef.current + 1) % tracks.length;
      currentRef.current = null; // force le chargement du titre suivant
      play(i);
    };
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);
    el.addEventListener('timeupdate', onTime);
    el.addEventListener('ended', onEnded);
    return () => {
      el.pause();
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('timeupdate', onTime);
      el.removeEventListener('ended', onEnded);
    };
  }, [play]);

  const value = useMemo<PlayerContext>(
    () => ({
      tracks: tracks.map((t, i) => {
        const m = meta[i];
        return {
          ...t,
          status: m?.status ?? 'idle',
          cover: m?.data?.cover ?? '',
          link: m?.data?.link || fallbackLink(t),
        };
      }),
      current,
      playing,
      progress,
      play,
      toggle,
      next,
      prefetch,
    }),
    [meta, current, playing, progress, play, toggle, next, prefetch],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
