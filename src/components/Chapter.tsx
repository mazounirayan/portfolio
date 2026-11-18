import styles from './Chapter.module.css';

type Props = {
  number: string;
  label: string;
  /** Lignes du titre ; la ligne à l'index `accent` passe en italique ambre */
  title: string[];
  accent?: number;
  id?: string;
};

// En-tête de chapitre commun à toutes les sections
export default function Chapter({ number, label, title, accent, id }: Props) {
  return (
    <div className={styles.chapter}>
      <p className={`mono ${styles.label}`}>
        <span>Chapitre {number}</span>
        <span className={styles.dash} aria-hidden="true" />
        <span>{label}</span>
      </p>
      <h2 id={id} className={styles.title}>
        {title.map((line, i) => (
          <span key={line} className={`line-mask ${i === accent ? styles.accent : ''}`}>
            <span>{line}</span>
          </span>
        ))}
      </h2>
    </div>
  );
}
