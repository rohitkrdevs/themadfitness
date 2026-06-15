import type { Metadata } from 'next';
import { Inter, Anton, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

const siteUrl = 'https://themadfitness.netlify.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Madhukar Mishra | Fitness Coach in New Delhi',
  description: 'Train with Madhukar Mishra, a New Delhi fitness coach specializing in strength, weight loss, personal training, Pilates and nutrition guidance.',
  keywords: 'Madhukar Mishra, fitness coach New Delhi, personal trainer Delhi, strength and conditioning coach, weight loss coach, group fitness, nutrition counselling, NSDC Level 4 fitness coach, BWF coach, The Mad Fitness',
  authors: [{ name: 'Madhukar Mishra' }],
  creator: 'Madhukar Mishra',
  publisher: 'The Mad Fitness',
  category: 'Fitness Coaching',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'Madhukar Mishra | Fitness Coach & Consultant',
    description: 'Strength, conditioning, weight loss, group fitness, and personalized coaching by Madhukar Mishra in New Delhi.',
    url: '/',
    siteName: 'The Mad Fitness',
    locale: 'en_IN',
    images: [
      {
        url: '/images/madhukar-mishra-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Madhukar Mishra - Fitness Coach and Consultant at The Mad Fitness',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Madhukar Mishra | Fitness Coach in New Delhi',
    description: 'Expert personal fitness coaching, strength and conditioning, fitness assessments, and nutrition counselling by Madhukar Mishra.',
    images: ['/images/madhukar-mishra-og.jpg'],
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#madhukar-mishra`,
      name: 'Madhukar Mishra',
      jobTitle: 'Fitness Coach & Consultant',
      url: siteUrl,
      image: `${siteUrl}/images/madhukar-mishra.jpg`,
      telephone: '+91 9572727348',
      email: 'samnouske14@gmail.com',
      sameAs: ['https://www.instagram.com/_themadfit_/'],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'B6, House No. 116, Mayur Vihar Extension',
        addressLocality: 'New Delhi',
        postalCode: '110091',
        addressCountry: 'IN',
      },
      knowsAbout: [
        'Strength and conditioning',
        'Personal training',
        'Weight loss coaching',
        'Pilates group classes',
        'Fitness assessment',
        'Nutrition counselling',
      ],
    },
    {
      '@type': 'HealthAndBeautyBusiness',
      '@id': `${siteUrl}/#business`,
      name: 'The Mad Fitness',
      url: siteUrl,
      image: `${siteUrl}/images/madhukar-mishra-og.jpg`,
      founder: { '@id': `${siteUrl}/#madhukar-mishra` },
      telephone: '+91 9572727348',
      email: 'samnouske14@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'B6, House No. 116, Mayur Vihar Extension',
        addressLocality: 'New Delhi',
        postalCode: '110091',
        addressCountry: 'IN',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${anton.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-background text-on-surface transition-colors duration-300 antialiased font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
