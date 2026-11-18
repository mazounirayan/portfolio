export type Job = {
  org: string;
  role: string;
  period: string;
  summary: string;
  points: string[];
  stack: string[];
};

export type LabItem = { name: string; kind: string; line: string };

export const work: Job[] = [
  {
    org: 'Novxtel',
    role: 'Développeur full-stack .NET / Angular — alternance',
    period: 'Nov. 2023 — Sept. 2026',
    summary: 'Un ERP de gestion de séjours en production : plus de 10 établissements, plus de 700 utilisateurs chaque jour.',
    points: [
      'Borne libre-service avec terminal de paiement intégré : transactions, annulations, timeouts, impression thermique.',
      'Participation à la conformité fiscale NF525 : signature RSA/SHA-256 et historique inaltérable des opérations.',
      'Factures, avoirs et tickets générés avec QuestPDF, procédures stockées SQL Server pour la clôture et le reporting.',
      'Application iOS en Swift connectée à l’ERP : authentification par token, scan de QR codes.',
      'Migrations Xamarin vers .NET 6 et Angular 11 vers 18.',
    ],
    stack: ['C#', 'ASP.NET', 'Angular', 'SQL Server', 'Swift', 'RabbitMQ'],
  },
  {
    org: 'RT Solutions',
    role: 'SmartShelf AI — projet de fin d’études',
    period: '2026',
    summary: 'Analyser automatiquement les rayons de supermarché à partir d’une photo.',
    points: [
      'Architecture de 5 microservices, backend Python / FastAPI.',
      'Détection des produits avec YOLOv11, reconnaissance des codes EAN par des modèles multimodaux.',
      'Prévision intégrant la météo et le calendrier scolaire.',
      'Dashboard Next.js et application mobile React Native.',
    ],
    stack: ['Python', 'FastAPI', 'YOLOv11', 'VLM / LLM', 'Next.js', 'React Native'],
  },
];

export const labo: LabItem[] = [
  { name: 'ShelfScan', kind: 'Vision · Retail', line: 'Lire un rayon comme un jeu de données : produits, facings, métriques.' },
  { name: 'ScentRadar', kind: 'Data · Découverte', line: 'Trouver un parfum proche par ses accords, son prix et sa saison.' },
  { name: 'DocPDF', kind: 'Outil · Document', line: 'Rendre le PDF moins définitif : comprendre, transformer, générer.' },
  { name: 'J.A.R.V.I.S', kind: 'IA · Assistant', line: 'Un assistant personnel fait de LLM, d’agents et de workflows n8n.' },
  { name: 'AutoTikTok', kind: 'Automatisation', line: 'Un pipeline qui crée et publie des vidéos sans intervention.' },
  { name: 'Agent Postulant', kind: 'IA · Emploi', line: 'Un agent qui prépare les candidatures à ma place.' },
  { name: 'Food Delivery', kind: 'Microservices', line: 'Une plateforme de livraison découpée en services Node.js et Docker.' },
  { name: 'MyAutoTrader', kind: 'Web3', line: 'Des smart contracts Solidity reliés au monde réel par Chainlink.' },
  { name: 'KapsuleKorp', kind: 'Infra · Mission', line: 'Automatisation d’une infrastructure Linux avec Ansible.' },
];
