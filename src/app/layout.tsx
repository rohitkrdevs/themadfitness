import type { Metadata } from 'next';
import { Inter, Anton, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'The Mad Fitness | Expert Personal Trainer & Fitness Coach in Noida & Ranchi',
  description: 'Top-rated personal fitness coach and diet plan personal trainer by Madhukar Mishra. Specializing in physical transformation, badminton coaching, and biomechanics in Ranchi and Noida.',
  keywords: 'Fitness coach, diet plan personal trainer, badminton coach, personal coach, fitness trainer Noida, fitness trainer Ranchi, Madhukar Mishra, The Mad Fitness, personal trainer near me, fat loss coach',
  authors: [{ name: 'Madhukar Mishra' }],
  creator: 'Madhukar Mishra',
  openGraph: {
    title: 'The Mad Fitness | Personal Coach in Noida & Ranchi',
    description: 'Transform your body with expert fitness, diet coaching, and badminton training by Madhukar Mishra. Available in Noida and Ranchi.',
    url: 'https://themadfitness.com',
    siteName: 'The Mad Fitness',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Mad Fitness | Personal Trainer & Badminton Coach',
    description: 'Expert fitness coaching, custom diet plans, and badminton coaching in Ranchi and Noida.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${anton.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-background text-on-surface transition-colors duration-300 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
