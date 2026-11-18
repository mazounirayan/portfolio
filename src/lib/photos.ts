import type { PhotoEntry } from '@/content/photos';
import { assetPath } from './asset';

export type Slot =
  | { kind: 'image'; src: string; label: string; frame: string }
  | { kind: 'placeholder'; label: string; frame: string };

// Transforme la liste des photos en plans de pellicule ; sans fichier, un emplacement stylisé
export function photoSlots(entries: PhotoEntry[]): Slot[] {
  return entries.map((e, i) => {
    const label = e.year ? `${e.city} · ${e.year}` : e.city;
    const frame = String(i + 1).padStart(2, '0');
    const src = e.src?.trim();
    return src ? { kind: 'image', src: assetPath(src), label, frame } : { kind: 'placeholder', label, frame };
  });
}
