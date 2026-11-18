'use client';

import { useRef, useState } from 'react';
import { assetPath } from '@/lib/asset';
import { useReveal } from '@/lib/useReveal';
import { profile } from '@/content/profile';
import Chapter from './Chapter';
import styles from './Contact.module.css';

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  useReveal(root);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section ref={root} id="contact" className={styles.contact} aria-labelledby="contact-titre">
      <Chapter id="contact-titre" title={['Écrivons', 'la suite.']} offset={1} />

      <div className={styles.mail} data-reveal>
        <a href={`mailto:${profile.email}`} className={styles.address}>
          {profile.email}
        </a>
        <button type="button" className={`mono ${styles.copy}`} onClick={copy} aria-live="polite">
          {copied ? 'Copié ✓' : 'Copier'}
        </button>
      </div>

      <ul className={styles.links} data-reveal>
        <li>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </li>
        <li>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </li>
        <li>
          <a href={assetPath(profile.cvPath)} download>
            Télécharger le CV <span aria-hidden="true">↓</span>
          </a>
        </li>
      </ul>

      <footer className={styles.footer}>
        <p className="mono">© 2026 Rayan Mazouni — conçu et codé à la main</p>
        <p className={styles.tagline}>{profile.tagline}</p>
        <a href="#top" className="mono">
          Revenir au début ↑
        </a>
      </footer>
    </section>
  );
}
