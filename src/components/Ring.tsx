import styles from './Ring.module.css';

const R = 190;
const CIRC = 2 * Math.PI * R;
const TICKS = Array.from({ length: 72 }, (_, i) => i * 5);
const MARKS: Array<{ angle: number; label: string }> = [
  { angle: -90, label: '2020' },
  { angle: 0, label: '2023' },
  { angle: 90, label: '2026' },
  { angle: 180, label: '∞' },
];

type Props = {
  /** 0..1, longueur de l'arc ambre ; modifiable ensuite via la variable CSS --p */
  progress?: number;
  photoSrc?: string;
  className?: string;
};

// L'anneau du temps : graduations, arc de progression, photo au centre
export default function Ring({ progress = 0, photoSrc, className = '' }: Props) {
  return (
    <div
      className={`${styles.ring} ${className}`}
      style={{ ['--p' as string]: progress, ['--circ' as string]: CIRC }}
      data-ring
    >
      <svg viewBox="0 0 400 400" className={styles.svg} aria-hidden="true">
        <g className={styles.ticks}>
          {TICKS.map((a) => (
            <line
              key={a}
              x1="200"
              y1={a % 30 === 0 ? 2 : 6}
              x2="200"
              y2="14"
              transform={`rotate(${a} 200 200)`}
              className={a % 30 === 0 ? styles.tickMajor : styles.tick}
            />
          ))}
        </g>
        <circle cx="200" cy="200" r={R} className={styles.track} />
        <circle cx="200" cy="200" r={R} className={styles.arc} transform="rotate(-90 200 200)" />
        {MARKS.map(({ angle, label }) => {
          const rad = (angle * Math.PI) / 180;
          const x = 200 + Math.cos(rad) * 168;
          const y = 200 + Math.sin(rad) * 168 + 3;
          return (
            <text key={label} x={x} y={y} className={styles.mark} textAnchor="middle">
              {label}
            </text>
          );
        })}
      </svg>
      {photoSrc && (
        <div className={styles.photo}>
          <img src={photoSrc} alt="Rayan Mazouni" />
        </div>
      )}
    </div>
  );
}
