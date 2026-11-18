// Accords tirés de vault/profile/04_Personal/Parfumerie.md (« Les meilleurs combos dans ce que tu as »).
export type Accord = { name: string; pair: [string, string]; mood: string };

export const accords: Accord[] = [
  { name: 'Bureau', pair: ['YSL Y EDP', 'Boss Bottled'], mood: 'Propre, sérieux, premium.' },
  { name: 'Été', pair: ['Afnan Turathi Electric', 'Never-ending Summer'], mood: 'Chemise blanche sur un rooftop.' },
  { name: 'Hiver', pair: ['Afnan 9PM', 'Scandal Le Parfum'], mood: 'Chaud, sucré, impossible à ignorer.' },
];

// x / y en % d'une carte couvrant longitude -11 → 21 et latitude 57 → 35.
// `side` : où placer le nom quand on zoome (évite les chevauchements dans les voyages serrés)
// `via: 'vol'` : la ville est rejointe en avion depuis la précédente (tracé en pointillés)
export type City = {
  city: string;
  country: string;
  x: number;
  y: number;
  side?: 'left' | 'right' | 'below';
  via?: 'vol';
};
export type Trip = { name: string; year?: string; cities: City[] };

export const trips: Trip[] = [
  { name: 'Barcelone', year: '2024', cities: [{ city: 'Barcelone', country: 'Espagne', x: 41.2, y: 71.0 }] },
  {
    // Road trip en Andalousie, puis vol de Séville vers l'Italie
    name: 'Andalousie & Italie',
    year: '2025',
    cities: [
      { side: 'left', city: 'Malaga', country: 'Espagne', x: 20.6, y: 92.2 },
      { side: 'below', city: 'Nerja', country: 'Espagne', x: 22.3, y: 92.0 },
      { city: 'Grenade', country: 'Espagne', x: 23.1, y: 90.1 },
      { city: 'Cordoue', country: 'Espagne', x: 19.4, y: 86.9 },
      { side: 'left', city: 'Séville', country: 'Espagne', x: 15.7, y: 89.1 },
      { via: 'vol', city: 'Rome', country: 'Italie', x: 73.4, y: 68.6 },
      { city: 'Florence', country: 'Italie', x: 69.5, y: 60.1 },
      { city: 'Milan', country: 'Italie', x: 63.1, y: 52.5 },
    ],
  },
  {
    name: 'Europe centrale',
    year: '2025',
    cities: [
      { city: 'Amsterdam', country: 'Pays-Bas', x: 49.7, y: 21.0 },
      { city: 'Prague', country: 'Tchéquie', x: 79.4, y: 31.5 },
      { side: 'left', city: 'Vienne', country: 'Autriche', x: 85.5, y: 40.0 },
      { side: 'below', city: 'Bratislava', country: 'Slovaquie', x: 87.8, y: 40.2 },
      { city: 'Budapest', country: 'Hongrie', x: 93.9, y: 43.2 },
    ],
  },
  {
    name: 'Portugal',
    year: '2026',
    cities: [
      { city: 'Lisbonne', country: 'Portugal', x: 5.8, y: 83.1 },
      { city: 'Porto', country: 'Portugal', x: 7.5, y: 72.0 },
    ],
  },
];

export const screens = {
  games: ['God of War', 'Ratchet & Clank: Rift Apart', 'Shadow of Mordor'],
  series: ['Game of Thrones', 'The Walking Dead', 'Gintama'],
};
