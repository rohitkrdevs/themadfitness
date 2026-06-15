import type { Metadata } from 'next';
import { Inter, Anton, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'The Mad Fitness | Madhukar Mishra - Fitness Coach in New Delhi',
  description: 'Personal fitness coaching by Madhukar Mishra, an NSDC Level 4 fitness coach specializing in strength and conditioning, weight loss, fitness assessment, group training, and nutrition counselling.',
  keywords: 'Madhukar Mishra, fitness coach New Delhi, personal trainer Delhi, strength and conditioning coach, weight loss coach, group fitness, nutrition counselling, NSDC Level 4 fitness coach, BWF coach, The Mad Fitness',
  authors: [{ name: 'Madhukar Mishra' }],
  creator: 'Madhukar Mishra',
  openGraph: {
    title: 'The Mad Fitness | Madhukar Mishra - Fitness Coach',
    description: 'Strength, conditioning, weight loss, group fitness, and personalized coaching by Madhukar Mishra in New Delhi.',
    url: 'https://themadfitness.com',
    siteName: 'The Mad Fitness',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Mad Fitness | Personal Trainer in New Delhi',
    description: 'Expert personal fitness coaching, strength and conditioning, fitness assessments, and nutrition counselling by Madhukar Mishra.',
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
