import { describe, expect, it } from 'vitest';
import { tripView } from './mapView';

const close = (a: number, b: number) => expect(Math.abs(a - b)).toBeLessThan(0.01);

describe('tripView (cadrage de la carte sur un voyage)', () => {
  it('vue complète sans voyage actif', () => {
    expect(tripView([])).toEqual({ s: 1, tx: 0, ty: 0 });
  });

  it('centre le voyage dans la carte', () => {
    const v = tripView([{ x: 40, y: 40 }, { x: 60, y: 60 }]);
    close(50 * v.s + v.tx, 50); // centre de la boîte → centre de l'écran
    close(50 * v.s + v.ty, 50);
  });

  it('zoome davantage sur un voyage resserré, plafonné', () => {
    const wide = tripView([{ x: 10, y: 50 }, { x: 90, y: 50 }]);
    const tight = tripView([{ x: 20, y: 90 }, { x: 23, y: 92 }]);
    expect(tight.s).toBeGreaterThan(wide.s);
    expect(tight.s).toBeLessThanOrEqual(4);
  });

  it('une seule ville : zoom fixe', () => {
    expect(tripView([{ x: 41, y: 71 }]).s).toBe(2.5);
  });

  it('ne sort jamais des bords de la carte', () => {
    for (const pts of [[{ x: 2, y: 2 }], [{ x: 98, y: 98 }], [{ x: 20, y: 90 }, { x: 23, y: 92 }]]) {
      const v = tripView(pts);
      expect(v.tx).toBeLessThanOrEqual(0);
      expect(v.ty).toBeLessThanOrEqual(0);
      expect(v.tx).toBeGreaterThanOrEqual(100 - 100 * v.s - 1e-9);
      expect(v.ty).toBeGreaterThanOrEqual(100 - 100 * v.s - 1e-9);
    }
  });
});

import { visibleLabels } from './mapView';

describe('visibleLabels (noms affichés sans chevauchement)', () => {
  it('garde un nom isolé', () => {
    expect(visibleLabels([{ x: 10, y: 10 }, { x: 60, y: 60 }], 1)).toEqual([true, true]);
  });

  it('masque un nom trop proche du précédent', () => {
    expect(visibleLabels([{ x: 20.6, y: 92.2 }, { x: 22.3, y: 92.0 }], 1.4)).toEqual([true, false]);
  });

  it('un zoom plus fort laisse de la place', () => {
    expect(visibleLabels([{ x: 20.6, y: 92.2 }, { x: 22.3, y: 92.0 }], 4)).toEqual([true, true]);
  });
});
