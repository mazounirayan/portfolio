import styles from './Chapter.module.css';

type Props = {
  /** Lignes du titre ; la ligne à l'index `offset` est décalée vers la droite */
  title: string[];
  offset?: number;
  id?: string;
};

// En-tête de chapitre commun à toutes les sections
export default function Chapter({ title, offset, id }: Props) {
  return (
    <div className={styles.chapter}>
      <h2 id={id} className={styles.title}>
        {title.map((line, i) => (
          <span key={line} className={`line-mask ${i === offset ? styles.offset : ''}`}>
            <span>{line}</span>
          </span>
        ))}
      </h2>
    </div>
  );
}
