export type Job = {
  org: string;
  role: string;
  period: string;
  summary: string;
  points: string[];
  stack: string[];
};

// hidden : projet masqué du site (gardé ici pour pouvoir le réafficher)
export type LabItem = { name: string; kind: string; line: string; hidden?: boolean };

export const work: Job[] = [
  {
    org: 'PistaPart',
    role: 'Développeur freelance — catalogue e-commerce Shopify',
    period: 'Oct. 2026 — aujourd’hui',
    summary: 'La mise en ligne d’un catalogue de pneumatiques sur Shopify.',
    points: [
      'Structuration des données produits pneumatiques.',
      'Scripts Python pour préparer et transformer le catalogue.',
      'Imports CSV dans Shopify.',
    ],
    stack: ['Python', 'Shopify', 'CSV'],
  },
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
  { name: 'Évasion Mystique', kind: 'Web · Réservation', line: 'Une vitrine d’escape game et son espace de gestion, en démo en ligne.' },
  { name: 'Passerelle', kind: 'Web · Associatif', line: 'Un site associatif et son backoffice : événements, demandes d’accompagnement, dons.' },
  { name: 'ShelfScan', kind: 'Vision · Retail', line: 'Lire un rayon comme un jeu de données : produits, facings, métriques.' },
  { name: 'ScentRadar', kind: 'Data · Découverte', line: 'Trouver un parfum proche par ses accords, son prix et sa saison.', hidden: true },
  { name: 'DocPDF', kind: 'Outil · Document', line: 'Rendre le PDF moins définitif : comprendre, transformer, générer.', hidden: true },
  { name: 'J.A.R.V.I.S', kind: 'IA · Assistant', line: 'Un assistant personnel fait de LLM, d’agents et de workflows n8n.', hidden: true },
  { name: 'AutoTikTok', kind: 'Automatisation', line: 'Un pipeline qui crée et publie des vidéos sans intervention.', hidden: true },
  { name: 'Agent Postulant', kind: 'IA · Emploi', line: 'Un agent qui prépare les candidatures à ma place.', hidden: true },
  { name: 'Food Delivery', kind: 'Microservices', line: 'Une plateforme de livraison découpée en services Node.js et Docker.' },
  { name: 'MyAutoTrader', kind: 'Web3', line: 'Des smart contracts Solidity reliés au monde réel par Chainlink.' },
  { name: 'KapsuleKorp', kind: 'Infra · Mission', line: 'Automatisation d’une infrastructure Linux avec Ansible.' },
];

/** Projets du labo affichés sur le site */
export const visibleLabo = labo.filter((item) => !item.hidden);
