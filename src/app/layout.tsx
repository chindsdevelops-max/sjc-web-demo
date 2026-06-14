import type { Metadata } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AuraShip — Shippin\' At Aura Speed',
  description:
    'AuraShip Courier connects Jamaica to the world with air & sea freight forwarding, transparent per-pound pricing, and Monday & Friday flight arrivals.',
  keywords: 'shipping Jamaica, courier Jamaica, freight forwarding, AuraShip, air freight, sea freight',
  openGraph: {
    title: 'AuraShip — Shippin\' At Aura Speed',
    description:
      'Reliable international logistics connecting Jamaica to the world. Transparent per-pound pricing, Monday & Friday flights.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b34cc" />
      </head>
      <body className="min-h-full flex flex-col bg-white font-sans">
        {children}
      </body>
    </html>
  );
}
