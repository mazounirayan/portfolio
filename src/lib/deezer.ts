import type { Track } from '@/content/playlist';

export type ResolvedTrack = { preview: string; cover: string; link: string };

type DeezerItem = { preview?: string; link?: string; album?: { cover_medium?: string } };

// L'API publique de Deezer n'autorise pas le CORS : on passe par JSONP (output=jsonp)
export function deezerSearchUrl(t: Track): string {
  const q = encodeURIComponent(`${t.artist} ${t.title}`);
  return `https://api.deezer.com/search?q=${q}&limit=5&output=jsonp`;
}

export function pickResult(json: unknown): ResolvedTrack | null {
  const data = (json as { data?: unknown } | null)?.data;
  if (!Array.isArray(data)) return null;
  const hit = (data as DeezerItem[]).find((d) => typeof d?.preview === 'string' && d.preview.length > 0);
  if (!hit?.preview) return null;
  return { preview: hit.preview, cover: hit.album?.cover_medium ?? '', link: hit.link ?? '' };
}

export function fallbackLink(t: Track): string {
  return `https://www.deezer.com/search/${encodeURIComponent(`${t.artist} ${t.title}`)}`;
}

let seq = 0;

export function jsonp(url: string, timeoutMs = 6000): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const name = `__deezer_cb_${Date.now()}_${seq++}`;
    const script = document.createElement('script');
    const w = window as unknown as Record<string, unknown>;

    const cleanup = () => {
      clearTimeout(timer);
      delete w[name];
      script.remove();
    };

    const timer = setTimeout(() => {
      cleanup();
      reject(new Error('deezer: délai dépassé'));
    }, timeoutMs);

    w[name] = (data: unknown) => {
      cleanup();
      resolve(data);
    };
    script.onerror = () => {
      cleanup();
      reject(new Error('deezer: indisponible'));
    };
    script.src = `${url}&callback=${name}`;
    document.head.appendChild(script);
  });
}
