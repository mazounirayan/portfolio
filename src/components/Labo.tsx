import { visibleLabo } from '@/content/work';
import styles from './Labo.module.css';

// Le labo : projets personnels, présentés comme une liste éditoriale
export default function Labo() {
  return (
    <div className={styles.labo}>
      <div className={styles.head} data-reveal>
        <h3 className={styles.title}>Le labo</h3>
        <p className={styles.note}>Certains deviennent des produits. D’autres font simplement progresser la prochaine idée.</p>
      </div>
      <ul className={styles.list}>
        {visibleLabo.map((item) => (
          <li key={item.name} className={styles.row} data-reveal>
            <span className={styles.name}>{item.name}</span>
            <span className={styles.kind}>{item.kind}</span>
            <span className={styles.line}>{item.line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
