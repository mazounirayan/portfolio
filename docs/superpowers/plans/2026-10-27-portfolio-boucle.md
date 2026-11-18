# Portfolio « Boucle » — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire le portfolio one-page « Boucle » de Rayan Mazouni : sombre, cinématographique, animé au scroll, exportable en site statique pour GitHub Pages.

**Architecture:** Next.js App Router en `output: 'export'`. Tout le contenu vit dans `src/content/*.ts` (données typées, sans JSX) ; la logique pure (chemins, intro, boucle, Deezer, emplacements photo) dans `src/lib/*.ts`, testée avec Vitest ; chaque section de la page est un composant client dans `src/components/`. GSAP + ScrollTrigger pilotent les animations, Lenis le défilement fluide.

**Tech Stack:** Node 22, Next.js 16, React 19, TypeScript, GSAP 3.15 (+ ScrollTrigger), Lenis 1.3, Vitest 5, CSS Modules + variables CSS (pas de Tailwind).

**Spec:** `monportfolio/boucle/docs/superpowers/specs/2026-10-27-portfolio-boucle-design.md`

## Global Constraints

- Projet autonome dans `monportfolio/boucle/` ; ne rien modifier dans `monportfolio/portfolio/` ni `monportfolio/PhotoAIPortfolio/`.
- Couleurs : fond `#0b0b0c`, texte `#efe9df`, gris `#8f897f`, accent unique `#e8a33d`.
- Polices via `next/font/google` : Instrument Serif (titres), Inter (texte), JetBrains Mono (étiquettes).
- `basePath` lu dans `process.env.NEXT_PUBLIC_BASE_PATH` (vide par défaut) ; tout chemin vers `public/` passe par `assetPath()`.
- Aucune année de naissance ; la chaîne `2001` n'apparaît dans aucun contenu.
- Aucun son sans clic ; extraits Deezer de 30 s seulement.
- `prefers-reduced-motion: reduce` : pas d'intro animée, pas de Lenis, pas de boucle infinie, révélations instantanées.
- Contenu factuel uniquement (CV, v3.2 `monportfolio/portfolio/index.html`, `vault/profile`). Langue : français.
- Ne pas committer sans l'accord explicite de Rayan (les étapes « Commit » de ce plan sont remplacées par « vérifier `git status` »).

## Review Focus

- Deezer injoignable ou JSONP bloqué : la liste des titres reste affichée avec ses liens, le bouton lecture est désactivé proprement (test dans Task 8).
- Site servi sous `/<dépôt>/` : photo, CV et images résolus avec le préfixe (test `assetPath` Task 1 + build avec `NEXT_PUBLIC_BASE_PATH=/boucle` Task 10).
- Mouvement réduit : l'intro ne bloque pas, la boucle ne saute pas (tests `shouldPlayIntro` Task 3 et `computeLoopJump` Task 9).
- Entrée photo sans fichier : emplacement stylisé, jamais d'image cassée (test `photoSlots` Task 7).
- Écran tactile / 375 px : pas de curseur personnalisé, aucun débordement horizontal (vérification navigateur Task 10).

---

### Task 1: Socle du projet (config, thème, polices, chemins)

**Files:**
- Create: `boucle/package.json`, `boucle/next.config.ts`, `boucle/tsconfig.json`, `boucle/vitest.config.ts`, `boucle/.gitignore`
- Create: `boucle/src/app/layout.tsx`, `boucle/src/app/page.tsx`, `boucle/src/app/globals.css`
- Create: `boucle/src/lib/asset.ts`, `boucle/src/lib/asset.test.ts`
- Copy: `cv/photo_rayan.jpg` → `boucle/public/photo_rayan.jpg` ; `cv/CV_Mazouni_Rayan_Developpeur.pdf` → `boucle/public/cv/CV_Mazouni_Rayan_Developpeur.pdf`

**Interfaces:**
- Produces: `assetPath(path: string): string` ; variables CSS `--bg --ink --muted --accent --font-serif --font-sans --font-mono` ; `page.tsx` qui empile les sections dans l'ordre du spec.

- [ ] **Step 1:** `package.json` avec scripts `dev`, `build` (`next build`), `test` (`vitest run`), dépendances `next@16`, `react@19`, `react-dom@19`, `gsap@3.15`, `lenis@1.3`, dev `typescript`, `@types/react`, `@types/node`, `vitest@5`. `npm install`.
- [ ] **Step 2:** `next.config.ts` : `output: 'export'`, `basePath: process.env.NEXT_PUBLIC_BASE_PATH || ''`, `images: { unoptimized: true }`, `trailingSlash: true`.
- [ ] **Step 3: Test qui échoue** `asset.test.ts` :
  ```ts
  it('préfixe avec le basePath', () => { process.env.NEXT_PUBLIC_BASE_PATH = '/boucle'; expect(assetPath('/photo_rayan.jpg')).toBe('/boucle/photo_rayan.jpg') })
  it('sans basePath', () => { process.env.NEXT_PUBLIC_BASE_PATH = ''; expect(assetPath('cv/x.pdf')).toBe('/cv/x.pdf') })
  ```
- [ ] **Step 4:** `npm test` → FAIL ; implémenter `assetPath` (normalise le `/` initial) ; `npm test` → PASS.
- [ ] **Step 5:** `globals.css` (variables, reset, `body` fond `--bg`, sélection ambre, `@media (prefers-reduced-motion)`), `layout.tsx` (polices, `lang="fr"`, métadonnées titre « Rayan Mazouni — Portfolio » + description), `page.tsx` temporaire avec le nom.
- [ ] **Step 6:** `npm run build` → dossier `out/` généré sans erreur.

### Task 2: Contenu typé

**Files:**
- Create: `boucle/src/content/profile.ts`, `work.ts`, `interests.ts`, `photos.ts`, `playlist.ts`, `boucle/src/content/content.test.ts`

**Interfaces:**
- Produces :
  - `profile: { name: string; role: string; tagline: string; email: string; linkedin: string; github: string; cvPath: string; photo: string }`
  - `eras: Era[]` avec `type Era = { year: string; title: string; detail: string }` — 5 entrées : `2020`, `2023`, `2024`, `2026`, `Après` (textes du spec §5.3).
  - `work: Job[]` (`{ org; role; period; summary; points: string[]; stack: string[] }`) — Novxtel, SmartShelf AI (RT Solutions) ; `labo: LabItem[]` (`{ name; kind; line }`) — les 9 projets du spec §5.4.
  - `accords: Accord[]` (`{ name; pair: [string, string]; mood }`), `travels: Travel[]` (`{ city; country; x; y }` en % sur la carte), `screens: { games: string[]; series: string[] }`.
  - `photos: PhotoEntry[]` (`{ src?: string; city: string; year: string; caption?: string }`) — une entrée sans `src` par ville de voyage.
  - `tracks: Track[]` (`{ artist: string; title: string }`) — les 9 titres du spec §5.7, dans cet ordre.

- [ ] **Step 1: Tests qui échouent** `content.test.ts` :
  ```ts
  it('aucune année de naissance', () => { expect(JSON.stringify([profile, eras, work, labo, accords, travels, screens, photos, tracks])).not.toContain('2001') })
  it('7 villes de voyage', () => { expect(travels.map(t => t.city)).toEqual(['Barcelone','Malaga','Amsterdam','Prague','Bratislava','Lisbonne','Porto']) })
  it('9 titres, Believer en premier', () => { expect(tracks).toHaveLength(9); expect(tracks[0]).toEqual({ artist: 'Imagine Dragons', title: 'Believer' }) })
  it('ères dans l’ordre', () => { expect(eras.map(e => e.year)).toEqual(['2020','2023','2024','2026','Après']) })
  ```
- [ ] **Step 2:** `npm test` → FAIL ; écrire les modules à partir des sources (CV, v3.2, `vault/profile/04_Personal/*`) ; accords : 3 associations de `Parfumerie.md` (« Les meilleurs combos dans ce que tu as »). `npm test` → PASS.

### Task 3: Fondations du mouvement (scroll, grain, curseur, mouvement réduit)

**Files:**
- Create: `boucle/src/lib/motion.ts`, `motion.test.ts`, `boucle/src/components/SmoothScroll.tsx`, `Grain.tsx` + `.module.css`, `Cursor.tsx` + `.module.css`

**Interfaces:**
- Produces : `prefersReducedMotion(mql?: Pick<MediaQueryList,'matches'>): boolean` ; `shouldPlayIntro(opts: { reduced: boolean; seen: boolean }): boolean` ; `<SmoothScroll>` (enveloppe la page, synchronise Lenis ↔ ScrollTrigger, inactif si réduit, expose `window.__lenis` pour la boucle) ; `<Grain />` (bruit animé plein écran, `pointer-events:none`) ; `<Cursor />` (rendu seulement si `(hover: hover) and (pointer: fine)` ; agrandi sur `[data-cursor="lens"]` et liens).

- [ ] **Step 1: Tests qui échouent** :
  ```ts
  it('intro jouée si première visite', () => expect(shouldPlayIntro({ reduced:false, seen:false })).toBe(true))
  it('pas d’intro en mouvement réduit', () => expect(shouldPlayIntro({ reduced:true, seen:false })).toBe(false))
  it('pas d’intro si déjà vue', () => expect(shouldPlayIntro({ reduced:false, seen:true })).toBe(false))
  ```
- [ ] **Step 2:** implémenter, `npm test` → PASS ; brancher les trois composants dans `layout.tsx`/`page.tsx`.

### Task 4: Intro et Hero (anneau + photo)

**Files:**
- Create: `boucle/src/lib/intro.ts`, `intro.test.ts`, `boucle/src/components/Intro.tsx`, `Hero.tsx`, `Ring.tsx` (+ `.module.css`)

**Interfaces:**
- Consumes : `shouldPlayIntro`, `profile`, `assetPath`.
- Produces : `yearSequence(from: number, to: number): number[]` ; `<Intro onDone={() => void} />` (compteur, révélation du nom lettre par lettre, bouton « Passer », `sessionStorage['boucle-intro-seen']`) ; `<Ring progress={number} photoSrc={string} />` (SVG : cercle, arc ambre proportionnel à `progress` 0..1, graduations 2020/2023/2026/∞).

- [ ] **Step 1: Test qui échoue** : `expect(yearSequence(2020, 2026)).toEqual([2020,2021,2022,2023,2024,2025,2026])`.
- [ ] **Step 2:** implémenter ; `npm test` → PASS.
- [ ] **Step 3:** Hero : nom géant Instrument Serif (prénom ivoire, nom italique ambre), titre du spec, anneau tournant lentement avec la photo désaturée, navigation (Travaux · Photos · Playlist · Contact, ancres `#travaux #photos #playlist #contact`), révélation masquée des lignes à la fin de l'intro.
- [ ] **Step 4:** vérifier au navigateur : intro → hero, « Passer » fonctionne, intro absente au rechargement de l'onglet.

### Task 5: Le portail (ères)

**Files:**
- Create: `boucle/src/components/Portal.tsx` + `.module.css`

**Interfaces:**
- Consumes : `eras`, `<Ring>`.

- [ ] **Step 1:** section épinglée (ScrollTrigger `pin`, ~`eras.length * 100vh`) ; l'anneau grandit jusqu'à remplir l'écran puis on « passe au travers » à chaque ère ; année géante en fond, titre + détail en avant-plan ; mouvement réduit → liste verticale statique.
- [ ] **Step 2:** vérifier au navigateur : les 5 ères défilent dans l'ordre, pas de saut à la sortie de l'épinglage.

### Task 6: Travaux, labo et hors cadre

**Files:**
- Create: `boucle/src/components/Work.tsx`, `Labo.tsx`, `Interests.tsx` (+ `.module.css`), `boucle/src/components/EuropeMap.tsx`

**Interfaces:**
- Consumes : `work`, `labo`, `accords`, `travels`, `screens`.

- [ ] **Step 1:** Work : un « plan » par expérience (numéro de plan en mono, organisation, rôle, période, points, stack) avec révélations au scroll ; Labo : liste éditoriale de 9 lignes, survol = ligne ambre + type de projet.
- [ ] **Step 2:** Interests : trois blocs — accords (nom + duo de parfums + humeur), carte (SVG Europe stylisée, points ambre pulsants positionnés via `x/y`, nom au survol/focus), jeux & séries (listes typographiques).
- [ ] **Step 3:** vérifier au navigateur : tout le texte lisible, contrastes OK, focus clavier visible sur les points de la carte.

### Task 7: Bande de film (photos)

**Files:**
- Create: `boucle/src/lib/photos.ts`, `photos.test.ts`, `boucle/src/components/FilmStrip.tsx` + `.module.css`, `boucle/public/photos/README.md`

**Interfaces:**
- Consumes : `photos`, `assetPath`.
- Produces : `photoSlots(entries: PhotoEntry[]): Slot[]` avec `type Slot = { kind: 'image'; src: string; label: string; frame: string } | { kind: 'placeholder'; label: string; frame: string }` ; `label = "Ville · Année"`, `frame = "01".."NN"`.

- [ ] **Step 1: Tests qui échouent** :
  ```ts
  it('emplacement si pas de fichier', () => expect(photoSlots([{ city:'Porto', year:'2026' }])[0]).toEqual({ kind:'placeholder', label:'Porto · 2026', frame:'01' }))
  it('image si fichier', () => expect(photoSlots([{ src:'photos/a.jpg', city:'Prague', year:'2025' }])[0]).toMatchObject({ kind:'image', frame:'01' }))
  ```
- [ ] **Step 2:** implémenter (`src` passé par `assetPath`) ; `npm test` → PASS.
- [ ] **Step 3:** FilmStrip : défilement horizontal piloté par le scroll vertical (épinglé) sur ordinateur, glisser natif (`overflow-x:auto; scroll-snap`) sur tactile ; perforations de pellicule, numéro de plan ; inclinaison légère selon la vitesse ; `data-cursor="lens"` ; emplacements = dégradé sombre + grain + nom de ville en serif.
- [ ] **Step 4:** `public/photos/README.md` : comment ajouter une photo (déposer le fichier, renseigner `src` dans `src/content/photos.ts`).

### Task 8: Playlist (vinyle + lecteur global)

**Files:**
- Create: `boucle/src/lib/deezer.ts`, `deezer.test.ts`, `boucle/src/components/player/PlayerProvider.tsx`, `NowPlaying.tsx`, `Vinyl.tsx`, `Playlist.tsx` (+ `.module.css`)

**Interfaces:**
- Consumes : `tracks`.
- Produces :
  - `deezerSearchUrl(t: Track): string` → `https://api.deezer.com/search?q=artist:"<artist>" track:"<title>"&limit=1&output=jsonp` (encodé).
  - `pickResult(json: unknown): ResolvedTrack | null` avec `ResolvedTrack = { preview: string; cover: string; link: string }` (premier `data[0]` ayant un `preview` non vide).
  - `fallbackLink(t: Track): string` → `https://www.deezer.com/search/<artist title encodé>`.
  - `jsonp(url: string, timeoutMs = 6000): Promise<unknown>` (script + callback unique, rejet au délai).
  - Contexte `usePlayer(): { tracks: PlayerTrack[]; current: number | null; playing: boolean; play(i: number): void; toggle(): void; next(): void }`.

- [ ] **Step 1: Tests qui échouent** :
  ```ts
  it('URL de recherche', () => expect(deezerSearchUrl({ artist:'Nina Simone', title:'Feeling Good' })).toContain('output=jsonp'))
  it('résultat valide', () => expect(pickResult({ data:[{ preview:'p.mp3', album:{ cover_medium:'c.jpg' }, link:'l' }] })).toEqual({ preview:'p.mp3', cover:'c.jpg', link:'l' }))
  it('réponse vide → null', () => expect(pickResult({ data:[] })).toBeNull())
  it('preview vide → null', () => expect(pickResult({ data:[{ preview:'' }] })).toBeNull())
  ```
- [ ] **Step 2:** implémenter ; `npm test` → PASS.
- [ ] **Step 3:** PlayerProvider : un seul `<audio>`, résolution paresseuse au premier clic, enchaînement au titre suivant ; si résolution impossible → titre marqué « extrait indisponible » + lien `fallbackLink`. NowPlaying : pastille fixe « En boucle — artiste · titre » + égaliseur, visible après la première lecture ou au survol. Vinyl/Playlist : disque qui tourne (pochette Deezer au centre, sinon étiquette ambre), liste en générique de film, mention « Extraits fournis par Deezer ».
- [ ] **Step 4:** vérifier au navigateur : clic → son ; coupure réseau simulée → liste + liens restent utilisables.

### Task 9: Contact et retour en boucle

**Files:**
- Create: `boucle/src/lib/loop.ts`, `loop.test.ts`, `boucle/src/components/Contact.tsx`, `LoopEnd.tsx` (+ `.module.css`)

**Interfaces:**
- Consumes : `profile`, `assetPath`, `window.__lenis`.
- Produces : `computeLoopJump(p: { scrollY: number; maxScroll: number; reduced: boolean; threshold?: number }): number | null` → `0` quand `scrollY >= maxScroll - (threshold ?? 2)` et `!reduced`, sinon `null`.

- [ ] **Step 1: Tests qui échouent** :
  ```ts
  it('saute en haut en fin de page', () => expect(computeLoopJump({ scrollY: 999, maxScroll: 1000, reduced:false })).toBe(0))
  it('pas de saut avant la fin', () => expect(computeLoopJump({ scrollY: 500, maxScroll: 1000, reduced:false })).toBeNull())
  it('jamais en mouvement réduit', () => expect(computeLoopJump({ scrollY: 1000, maxScroll: 1000, reduced:true })).toBeNull())
  ```
- [ ] **Step 2:** implémenter ; `npm test` → PASS.
- [ ] **Step 3:** Contact : grand « Écrivons la suite. » en serif, e-mail (copier au clic), LinkedIn, GitHub, bouton « Télécharger le CV ». LoopEnd : dernier écran qui reprend visuellement le hero (« Tout ce qui finit recommence »), puis saut invisible en haut via Lenis `scrollTo(0, { immediate: true })` ; lien « Revenir au début » toujours présent.
- [ ] **Step 4:** vérifier au navigateur : arrivée en bas → retour au hero sans flash ; clavier : Tab atteint tous les liens du contact.

### Task 10: Publication et vérification finale

**Files:**
- Create: `boucle/.github/workflows/deploy.yml`, `boucle/README.md`, `.claude/launch.json` (entrée `boucle`, `npm run dev --prefix monportfolio/boucle`, port 3210)

- [ ] **Step 1:** workflow GitHub Pages (build avec `NEXT_PUBLIC_BASE_PATH=/${{ github.event.repository.name }}`, ajout de `out/.nojekyll`, `actions/upload-pages-artifact` + `deploy-pages`) ; README : lancer, ajouter photos/titres, publier sur GitHub Pages ou Vercel.
- [ ] **Step 2:** `NEXT_PUBLIC_BASE_PATH=/boucle npm run build` puis contrôle que `out/index.html` référence `/boucle/photo_rayan.jpg` et `/boucle/cv/...`.
- [ ] **Step 3:** `npm test` → tous verts ; `npm run build` → OK.
- [ ] **Step 4:** navigateur, 1440 px et 375 px : parcours complet, console sans erreur, pas de débordement horizontal, captures d'écran pour Rayan.
