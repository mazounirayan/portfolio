import { describe, expect, it } from 'vitest';
import { eras, profile } from './profile';
import { labo, work } from './work';
import { accords, screens, trips } from './interests';
import { photos } from './photos';
import { tracks } from './playlist';

describe('contenu', () => {
  it('aucune année de naissance', () => {
    expect(JSON.stringify([profile, eras, work, labo, accords, trips, screens, photos, tracks])).not.toContain('2001');
  });

  it('4 voyages dans l’ordre', () => {
    expect(trips.map((t) => t.name)).toEqual(['Barcelone', 'Andalousie & Italie', 'Europe centrale', 'Portugal']);
  });

  it('l’Italie est rejointe en avion depuis Séville', () => {
    const cities = trips[1].cities;
    const rome = cities.findIndex((c) => c.city === 'Rome');
    expect(cities[rome - 1].city).toBe('Séville');
    expect(cities[rome].via).toBe('vol');
    expect(trips[1].year).toBe('2025');
  });

  it('séries : Dark et Black Mirror retirées', () => {
    expect(screens.series).toEqual(['Game of Thrones', 'The Walking Dead', 'Gintama']);
  });

  it('16 villes, dans l’ordre des itinéraires', () => {
    expect(trips.flatMap((t) => t.cities.map((c) => c.city))).toEqual([
      'Barcelone',
      'Malaga', 'Nerja', 'Grenade', 'Cordoue', 'Séville',
      'Rome', 'Florence', 'Milan',
      'Amsterdam', 'Prague', 'Vienne', 'Bratislava', 'Budapest',
      'Lisbonne', 'Porto',
    ]);
  });

  it('chaque ville tient dans la carte', () => {
    for (const c of trips.flatMap((t) => t.cities)) {
      expect(c.x).toBeGreaterThanOrEqual(0);
      expect(c.x).toBeLessThanOrEqual(100);
      expect(c.y).toBeGreaterThanOrEqual(0);
      expect(c.y).toBeLessThanOrEqual(100);
    }
  });

  it('9 titres, Believer en premier', () => {
    expect(tracks).toHaveLength(9);
    expect(tracks[0]).toEqual({ artist: 'Imagine Dragons', title: 'Believer' });
  });

  it('ères dans l’ordre', () => {
    expect(eras.map((e) => e.year)).toEqual(['2020', '2023', '2024', '2026', 'Après']);
  });

  it('une photo provisoire par voyage, sans fichier', () => {
    expect(photos.map((p) => p.city)).toEqual(trips.map((t) => t.name));
    expect(photos.every((p) => p.src === undefined)).toBe(true);
  });
});
