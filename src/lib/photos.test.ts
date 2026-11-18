import { afterEach, expect, it } from 'vitest';
import { photoSlots } from './photos';

afterEach(() => { process.env.NEXT_PUBLIC_BASE_PATH = ''; });

it('emplacement si pas de fichier', () => {
  expect(photoSlots([{ city: 'Porto', year: '2026' }])[0]).toEqual({ kind: 'placeholder', label: 'Porto · 2026', frame: '01' });
});

it('image si fichier, chemin préfixé par le basePath', () => {
  process.env.NEXT_PUBLIC_BASE_PATH = '/boucle';
  expect(photoSlots([{ src: 'photos/a.jpg', city: 'Prague', year: '2025' }])[0]).toEqual({
    kind: 'image',
    src: '/boucle/photos/a.jpg',
    label: 'Prague · 2025',
    frame: '01',
  });
});

it('numérote les plans dans l’ordre', () => {
  const slots = photoSlots([{ city: 'A', year: '1' }, { city: 'B', year: '2' }]);
  expect(slots.map((s) => s.frame)).toEqual(['01', '02']);
});

it('src vide traité comme absent', () => {
  expect(photoSlots([{ src: '  ', city: 'Porto', year: '2026' }])[0].kind).toBe('placeholder');
});

it('année inconnue : étiquette sans séparateur', () => {
  expect(photoSlots([{ city: 'Italie', year: '' }])[0].label).toBe('Italie');
});
