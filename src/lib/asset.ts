// Préfixe un chemin du dossier public/ avec le basePath (site servi sous /<dépôt>/ sur GitHub Pages)
export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${base}/${path.replace(/^\/+/, '')}`;
}
