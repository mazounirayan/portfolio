import { labo } from '@/content/work';
import styles from './Labo.module.css';

const pad = (n: number) => String(n).padStart(2, '0');

// Le labo : projets personnels, présentés comme une liste éditoriale
export default function Labo() {
  return (
    <div className={styles.labo}>
      <div className={styles.head} data-reveal>
        <p className="mono">Le labo — projets personnels</p>
        <p className={styles.note}>Certains deviennent des produits. D’autres font simplement progresser la prochaine idée.</p>
      </div>
      <ul className={styles.list}>
        {labo.map((item, i) => (
          <li key={item.name} className={styles.row} data-reveal>
            <span className={`mono ${styles.index}`}>{pad(i + 1)}</span>
            <span className={styles.name}>{item.name}</span>
            <span className={`mono ${styles.kind}`}>{item.kind}</span>
            <span className={styles.line}>{item.line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
