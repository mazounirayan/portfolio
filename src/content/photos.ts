// Pour ajouter une photo : déposer le fichier dans public/photos/ puis renseigner `src`, ex. src: 'photos/porto.jpg'.
// Sans `src`, la bande de film affiche un emplacement stylisé. Une entrée par voyage, à compléter librement.
export type PhotoEntry = { src?: string; city: string; year: string; caption?: string };

export const photos: PhotoEntry[] = [
  { city: 'Barcelone', year: '2024' },
  { city: 'Andalousie & Italie', year: '2025' },
  { city: 'Europe centrale', year: '2025' },
  { city: 'Portugal', year: '2026' },
];
