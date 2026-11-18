'use client';

import { useRef } from 'react';
import { useReveal } from '@/lib/useReveal';
import { work } from '@/content/work';
import Chapter from './Chapter';
import Labo from './Labo';
import styles from './Work.module.css';

const pad = (n: number) => String(n).padStart(2, '0');

export default function Work() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} id="travaux" className={styles.work} aria-labelledby="travaux-titre">
      <Chapter id="travaux-titre" number="02" label="Travaux" title={['Ce que', 'je construis']} accent={1} />

      {work.map((job, i) => (
        <article key={job.org} className={styles.job}>
          <span className={styles.rule} data-rule aria-hidden="true" />
          <div className={styles.side}>
            <span className={`mono ${styles.plan}`}>Plan {pad(i + 1)}</span>
            <span className="mono">{job.period}</span>
          </div>
          <div className={styles.body}>
            <h3 className={styles.org}>
              <span className="line-mask">
                <span>{job.org}</span>
              </span>
            </h3>
            <p className={styles.role} data-reveal>
              {job.role}
            </p>
            <p className={styles.summary} data-reveal>
              {job.summary}
            </p>
            <ol className={styles.points}>
              {job.points.map((p, j) => (
                <li key={p} data-reveal>
                  <span className="mono">{pad(j + 1)}</span>
                  <span>{p}</span>
                </li>
              ))}
            </ol>
            <ul className={styles.stack} aria-label="Technologies" data-reveal>
              {job.stack.map((s) => (
                <li key={s} className="mono">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}

      <Labo />
    </section>
  );
}
