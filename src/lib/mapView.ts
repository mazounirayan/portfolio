export type Point = { x: number; y: number };
export type View = { s: number; tx: number; ty: number };

const PAD = 7; // marge autour du voyage, en % de la carte
const MAX_SCALE = 4;
const SINGLE_SCALE = 2.5;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

// Cadrage de la carte sur un voyage : échelle `s` et translation (tx, ty) en % de la carte,
// à appliquer en `translate(tx%, ty%) scale(s)` avec un transform-origin en haut à gauche.
export function tripView(points: Point[]): View {
  if (points.length === 0) return { s: 1, tx: 0, ty: 0 };

  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const s =
    points.length === 1
      ? SINGLE_SCALE
      : clamp(Math.min(100 / (maxX - minX + PAD * 2), 100 / (maxY - minY + PAD * 2)), 1, MAX_SCALE);

  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const edge = 100 - 100 * s;

  return { s, tx: clamp(50 - cx * s, edge, 0), ty: clamp(50 - cy * s, edge, 0) };
}

const MIN_GAP = 6; // distance minimale entre deux noms, en % de la largeur de la carte affichée
const ASPECT = 110 / 160; // hauteur / largeur de la carte

// Pour un zoom donné, indique quels noms de ville afficher sans qu'ils se chevauchent
// (les autres restent visibles au survol de leur point)
export function visibleLabels(points: Point[], s: number): boolean[] {
  const kept: Point[] = [];
  return points.map((p) => {
    const free = kept.every((k) => Math.hypot(p.x - k.x, (p.y - k.y) * ASPECT) * s >= MIN_GAP);
    if (free) kept.push(p);
    return free;
  });
}
