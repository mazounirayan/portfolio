# Boucle — portfolio de Rayan Mazouni

One-page sombre et cinématographique, inspiré de *Dark* : intro animée, portail des époques, travaux, hors cadre (parfums, voyages, jeux & séries), bande de film photo, playlist sur vinyle, et une fin qui reboucle sur le début.

Next.js (export statique) · GSAP + ScrollTrigger · Lenis · Vitest.

## Lancer en local

```bash
npm install
npm run dev     # http://localhost:3210
npm test        # tests de la logique (chemins, playlist, boucle, photos…)
npm run build   # site statique dans out/
```

## Modifier le contenu

Tout le texte est dans `src/content/` :

| Fichier | Contenu |
|---|---|
| `profile.ts` | nom, titre, accroche, liens, époques du portail |
| `work.ts` | expériences et projets du labo |
| `interests.ts` | accords de parfum, villes visitées, jeux & séries |
| `photos.ts` | photos de la bande de film (voir `public/photos/README.md`) |
| `playlist.ts` | titres de la playlist (extraits Deezer de 30 s, chargés au clic) |

## Ajouter tes photos

Dépose les fichiers dans `public/photos/`, puis renseigne `src` dans `src/content/photos.ts`. Sans `src`, un emplacement stylisé s'affiche.

## Publier

**GitHub Pages** : `npm run deploy` lance les tests, construit le site sous `/portfolio/` et pousse le dossier `out/` sur la branche `gh-pages`. Site en ligne : https://mazounirayan.github.io/portfolio/

**Vercel** : importe le dépôt, aucune configuration nécessaire.

## Accessibilité

Avec le réglage système « réduire les animations », l'intro, le défilement fluide, les épinglages et la boucle sont désactivés : le contenu s'affiche en liste simple. Aucun son ne démarre sans clic.
