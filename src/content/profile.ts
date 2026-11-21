// Sources : CV développeur (cv/), portfolio v3.2 (monportfolio/portfolio/index.html), vault/profile.

export const profile = {
  name: 'Rayan Mazouni',
  firstName: 'Rayan',
  lastName: 'Mazouni',
  role: 'Développeur full-stack .NET / Angular',
  intro:
    'Trois ans d’alternance chez Novxtel sur un ERP utilisé chaque jour par plus de 700 personnes, et un Mastère en architecture logicielle à l’ESGI. Je travaille surtout en C#, ASP.NET, Angular et SQL Server.',
  tagline: 'Merci de votre visite.',
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
    detail: 'Université d’Angers. Bases en programmation objet, systèmes d’exploitation et architecture des ordinateurs.',
  },
  {
    year: '2023',
    title: 'ESGI Paris & Novxtel',
    detail: 'Début du Bachelor en alternance chez Novxtel. Première mise en production : une application iOS en Swift avec paiement 3D Secure.',
  },
  {
    year: '2024',
    title: 'Mastère Architecture Logicielle',
    detail: 'Entrée en Mastère. Chez Novxtel : back-office React et .NET, messages télécoms via RabbitMQ, ERP Angular déployé dans plus de dix établissements.',
  },
  {
    year: '2026',
    title: 'RT Solutions — SmartShelf AI',
    detail: 'Mémoire avec RT Solutions sur l’IA pour analyser les rayons en supermarché. Fin de l’alternance chez Novxtel.',
  },
  {
    year: 'Après',
    title: 'Architecte logiciel',
    detail: 'Ce que je veux approfondir : architectures orientées événements, systèmes distribués et observabilité.',
  },
];
