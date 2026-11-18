import styles from './Equalizer.module.css';

export default function Equalizer({ active }: { active: boolean }) {
  return (
    <span className={`${styles.eq} ${active ? styles.on : ''}`} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}
