// Sources : CV développeur (cv/), portfolio v3.2 (monportfolio/portfolio/index.html), vault/profile.

export const profile = {
  name: 'Rayan Mazouni',
  firstName: 'Rayan',
  lastName: 'Mazouni',
  role: 'Développeur full-stack .NET, futur architecte logiciel',
  intro:
    'Trois ans d’alternance chez Novxtel sur un ERP en production, un Mastère en architecture logicielle, et une vingtaine de projets à côté. Je construis des produits, je documente mes choix, et je recommence en mieux.',
  tagline: 'Tout ce qui finit recommence.',
  email: 'mazounirayan@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rayan-mazouni',
  github: 'https://github.com/mazounirayan',
  cvPath: 'cv/CV_Rayan_Mazouni_Developpeur_NET_Angular.pdf',
  photo: 'rayan.webp',
};

export type Era = { year: string; title: string; detail: string };

export const eras: Era[] = [
  {
    year: '2020',
    title: 'Licence Informatique',
    detail: 'Université d’Angers. Programmation objet, systèmes d’exploitation, architecture des ordinateurs.',
  },
  {
    year: '2023',
    title: 'ESGI Paris & Novxtel',
    detail: 'Bachelor en alternance. Premier code en production : une application iOS en Swift avec paiement 3D Secure.',
  },
  {
    year: '2024',
    title: 'Mastère Architecture Logicielle',
    detail: 'Back-office React et .NET, messages télécoms via RabbitMQ, ERP Angular en production dans plus de dix établissements.',
  },
  {
    year: '2026',
    title: 'RT Solutions — SmartShelf AI',
    detail: 'Mémoire sur l’IA appliquée au merchandising en grande distribution. Fin de trois ans d’alternance chez Novxtel.',
  },
  {
    year: 'Après',
    title: 'Architecte logiciel',
    detail: 'Event-driven, systèmes distribués, observabilité. La boucle continue.',
  },
];
