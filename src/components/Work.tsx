'use client';

import { useRef } from 'react';
import { useReveal } from '@/lib/useReveal';
import { work } from '@/content/work';
import Chapter from './Chapter';
import Labo from './Labo';
import styles from './Work.module.css';

export default function Work() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} id="travaux" className={styles.work} aria-labelledby="travaux-titre">
      <Chapter id="travaux-titre" title={['Expérience', 'professionnelle']} offset={1} />

      {work.map((job) => (
        <article key={job.org} className={styles.job}>
          <span className={styles.rule} data-rule aria-hidden="true" />
          <div className={styles.side}>
            <span className={styles.period}>{job.period}</span>
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
            <ul className={styles.points}>
              {job.points.map((p) => (
                <li key={p} data-reveal>
                  {p}
                </li>
              ))}
            </ul>
            <ul className={styles.stack} aria-label="Technologies" data-reveal>
              {job.stack.map((s) => (
                <li key={s}>
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
