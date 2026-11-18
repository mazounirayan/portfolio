# Portfolio « Boucle » — Rayan Mazouni

Document de conception, 2026-10-27. Validé par morceaux en conversation ; les choix marqués *(mon choix)* sont des décisions de conception que Rayan peut contester.

## 1. Intention

Rayan veut qu'un visiteur — recruteur, client ou simple curieux — ferme le site en se disant **« ah, stylé »**, **« original »** ou **« intéressant, j'ai envie de visiter »**. Le CV reste le document sérieux ; le portfolio sert à se démarquer et à montrer la personne derrière le développeur : ses projets, ses photos, ses goûts, sa musique.

Niveau visé : un site qui pourrait figurer sur Awwwards (Site of the Day). La maquette statique a été jugée « pas assez wow » : **l'effet doit venir du mouvement**, pas d'une image figée.

## 2. Direction artistique : « Boucle »

Choisie par Rayan parmi trois pistes. Inspirée de la série *Dark* (« nourri mon obsession sur la cyclicité du temps ») : sombre, cinématographique, éditorial.

- Fond quasi noir `#0b0b0c`, texte ivoire `#efe9df`, gris chaud `#8f897f`, **une seule couleur d'accent ambre `#e8a33d`**.
- Grandes lettres serif à fort contraste pour les titres (référence : *Instrument Serif*), une sans-serif sobre pour le texte, une monospace pour les petites étiquettes (années, coordonnées, numéros de plan).
- Grain de pellicule animé sur tout le site, discret.
- Motif central : **l'anneau** (frise circulaire du temps, portail de *Dark*).
- Ton des textes : direct, première personne, phrases courtes. Aucune formule creuse.

## 3. Objectifs, non-objectifs, anti-objectifs

**Objectifs**
- Effet wow dès les 5 premières secondes (intro + hero animés).
- Qu'un recruteur pressé comprenne en un écran qui est Rayan et ce qu'il cherche.
- Montrer la personnalité : photos, parfumerie, voyages, jeux/séries, playlist.
- Simple à mettre à jour : photos, morceaux, projets dans des fichiers de données.

**Non-objectifs (v1)**
- Pas de version anglaise.
- Pas de blog, pas de CMS, pas de back-end.
- Pas de formulaire de contact qui envoie des e-mails (un lien `mailto:` suffit).

**Anti-objectifs (échec même si « ça marche »)**
- Un rendu « template » ou générique.
- Un site si artistique qu'on ne trouve pas le rôle, les projets et le contact.
- Un chargement lent ou saccadé, ou un site cassé sur mobile.
- Un son qui démarre tout seul.
- Un fait inventé : tout le contenu vient des CV de Rayan, de sa v3.2 (`monportfolio/portfolio/index.html`) ou de `vault/profile`.
- **Aucune année de naissance** affichée nulle part (demande explicite).

## 4. Contraintes

- **Dossier** : projet autonome `monportfolio/boucle/`. Ne rien modifier dans `monportfolio/portfolio/` ni `monportfolio/PhotoAIPortfolio/`.
- **Hébergement** : GitHub Pages (site statique) ; doit aussi fonctionner tel quel sur Vercel. Le chemin de base (`basePath`) doit être configurable, car le site peut être servi sous `/<nom-du-dépôt>/`.
- **Pile** *(mon choix, non contesté)* : Next.js (App Router) en export statique, TypeScript, GSAP + ScrollTrigger pour les animations au scroll, Lenis pour le défilement fluide, WebGL léger (three.js ou OGL) pour le portail et le grain si nécessaire.
- **Accessibilité** : respecter `prefers-reduced-motion` (animations réduites, pas de boucle infinie), navigation clavier, contrastes suffisants, textes alternatifs.
- **Performance** : rester fluide (objectif 60 i/s) sur un portable moyen ; premier affichage utile rapide ; images optimisées.
- **Mobile** : expérience complète mais simplifiée (portail allégé, bande de film au glisser).

## 5. Parcours de la page (une seule page, de haut en bas)

1. **Intro (loader)** — un compteur fait défiler les années **2020 → 2026** (2020 = entrée en Licence), puis le nom « Rayan Mazouni » se révèle lettre par lettre en très grand. Bouton « Passer » visible. Rejouée seulement à la première visite de la session *(mon choix)*.
2. **Hero** — nom, titre « Développeur full-stack .NET, futur architecte logiciel », photo de Rayan (`cv/photo_rayan.jpg`) dans l'anneau (traitement noir et blanc / sépia), pastille du lecteur « En boucle » en bas à droite, navigation discrète (Travaux · Photos · Playlist · Contact).
3. **Le portail** — l'anneau devient un portail qu'on traverse en scrollant ; chaque passage révèle une époque :
   - 2020 — Licence Informatique, Université d'Angers
   - 2023 — Bachelor ESGI Paris, début de l'alternance chez Novxtel
   - 2024 — Mastère Architecture Logicielle (ESGI)
   - 2026 — Mémoire avec RT Solutions (SmartShelf AI), fin de l'alternance
   - Après — architecte logiciel (en cours)
4. **Travaux**
   - *Novxtel* (nov. 2023 – sept. 2026, alternance) : ERP/PMS de gestion de séjours (10+ établissements, 700+ utilisateurs quotidiens), borne libre-service avec terminal de paiement, conformité NF525, génération de documents QuestPDF, application iOS en Swift, migrations (Xamarin → .NET 6, Angular 11 → 18), messages via RabbitMQ.
   - *SmartShelf AI* (RT Solutions, 2026) : analyse de rayons, 5 microservices Python/FastAPI, YOLOv11, VLM/LLM, dashboard Next.js, app React Native.
   - *Le labo* : projets personnels repris de la v3.2 — ShelfScan, ScentRadar, DocPDF, J.A.R.V.I.S, pipeline AutoTikTok, Agent Postulant, microservices Food Delivery, MyAutoTrader (Web3), mission Ansible KapsuleKorp.
5. **Hors cadre**
   - *Parfumerie* : collection, layering, chasse aux dupes, présentée comme des « accords du moment » (associations tirées de `vault/profile/04_Personal/Parfumerie.md`).
   - *Voyages* : carte stylisée de l'Europe avec Barcelone, Malaga, Amsterdam, Prague, Bratislava, Lisbonne, Porto.
   - *Jeux & séries* : God of War, Ratchet & Clank, Shadow of Mordor ; *Dark*, *Black Mirror*, *Gintama*.
6. **Photos** — bande de film horizontale (images numérotées comme des plans, ville + année sous chaque cliché, légère déformation au survol, curseur « loupe »). **En attendant les photos de Rayan** : emplacements stylisés (un par ville de voyage). Les vraies photos s'ajoutent en déposant les fichiers dans un dossier et en complétant un fichier de données (fichier, ville, année, légende).
7. **Playlist** — un vinyle qui tourne pendant la lecture ; liste des titres présentée comme un générique de film. Lecture **uniquement au clic**, extraits officiels de 30 s fournis par l'API publique de Deezer, avec lien « écouter en entier ». Si l'API ne répond pas, la liste reste affichée avec ses liens. Le lecteur reste accessible (pastille « En boucle ») partout sur la page.
   - Sélection de départ *(mon choix, sur la consigne « blues, jazz et Imagine Dragons »)* : Imagine Dragons — *Believer*, *Demons*, *Bones* ; Nina Simone — *Feeling Good* ; Miles Davis — *So What* ; Dave Brubeck — *Take Five* ; B.B. King — *The Thrill Is Gone* ; Gary Clark Jr. — *Bright Lights* ; John Lee Hooker — *Boom Boom*.
8. **Contact** — e-mail `mazounirayan@gmail.com`, LinkedIn `linkedin.com/in/rayan-mazouni`, GitHub `github.com/mazounirayan`, téléchargement du CV développeur (`cv/CV_Mazouni_Rayan_Developpeur.pdf`). Pas de numéro de téléphone sur un site public *(mon choix)*.
9. **Retour en boucle** — arrivé en bas, le scroll ramène au début sans coupure (« Tout ce qui finit recommence »). Un lien « Revenir au début » existe aussi ; la boucle est désactivée en mouvement réduit.

## 6. Mouvement (là où se joue le « wow »)

- Défilement fluide global ; révélations au scroll (masques, lignes de texte qui montent, images qui se dévoilent).
- Curseur personnalisé sur ordinateur (cercle discret qui grossit en « loupe » sur les photos et les liens) ; curseur normal sur tactile.
- Transitions entre sections pensées comme des coupes de montage.
- Anneau/portail animé en continu, lié à la progression du scroll.
- Grain animé sur tout le site.
- Tout est désactivé ou simplifié avec `prefers-reduced-motion`.

## 7. Laissé à la personne qui construit

- Le choix précis des polices (dans l'esprit décrit), des bibliothèques WebGL et de la structure du code.
- Le détail chorégraphique des animations, tant qu'il sert le parcours ci-dessus.
- Les textes exacts, à condition de rester fidèles aux sources et au ton.
- Le visuel des emplacements photo provisoires.

## 8. Points ouverts (non bloquants)

- Photos : fournies plus tard par Rayan.
- Playlist : Rayan peut remplacer les titres proposés.
- Accords de parfum affichés : à confirmer par Rayan.
