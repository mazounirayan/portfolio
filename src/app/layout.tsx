import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Inter } from 'next/font/google';
import './globals.css';
import Ambient from '@/components/Ambient';
import Cursor from '@/components/Cursor';

const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif' });
const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Rayan Mazouni — Portfolio',
  description: 'Développeur full-stack .NET, futur architecte logiciel. Projets, photos, voyages et une playlist en boucle.',
};

export const viewport: Viewport = {
  themeColor: '#080706',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <Ambient />
        {children}
        <Cursor />
      </body>
    </html>
  );
}
