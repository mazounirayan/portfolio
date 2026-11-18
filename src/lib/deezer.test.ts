import { describe, expect, it } from 'vitest';
import { deezerSearchUrl, fallbackLink, pickResult } from './deezer';

describe('deezer', () => {
  it('URL de recherche JSONP encodée', () => {
    const url = deezerSearchUrl({ artist: 'Nina Simone', title: 'Feeling Good' });
    expect(url.startsWith('https://api.deezer.com/search?q=')).toBe(true);
    expect(url).toContain('output=jsonp');
    // La syntaxe avancée artist:"…" track:"…" renvoie 0 résultat via JSONP : recherche simple
    expect(url).toContain(`q=${encodeURIComponent('Nina Simone Feeling Good')}&`);
  });

  it('résultat valide', () => {
    expect(pickResult({ data: [{ preview: 'p.mp3', album: { cover_medium: 'c.jpg' }, link: 'l' }] })).toEqual({
      preview: 'p.mp3',
      cover: 'c.jpg',
      link: 'l',
    });
  });

  it('prend le premier résultat qui a un extrait', () => {
    expect(pickResult({ data: [{ preview: '' }, { preview: 'b.mp3', link: 'lb' }] })).toEqual({ preview: 'b.mp3', cover: '', link: 'lb' });
  });

  it('réponse vide → null', () => expect(pickResult({ data: [] })).toBeNull());
  it('preview vide → null', () => expect(pickResult({ data: [{ preview: '' }] })).toBeNull());
  it('réponse invalide → null', () => {
    expect(pickResult(null)).toBeNull();
    expect(pickResult({ error: { code: 4 } })).toBeNull();
  });

  it('lien de secours vers la recherche Deezer', () => {
    expect(fallbackLink({ artist: 'B.B. King', title: 'The Thrill Is Gone' })).toBe(
      `https://www.deezer.com/search/${encodeURIComponent('B.B. King The Thrill Is Gone')}`,
    );
  });
});
