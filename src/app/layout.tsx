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
  title: 'Ship Jet — Shippin\' At Jet Speed',
  description:
    'Ship Jet Courier connects Jamaica to the world with air & sea freight forwarding, transparent per-pound pricing, and Monday & Friday flight arrivals.',
  keywords: 'shipping Jamaica, courier Jamaica, freight forwarding, Ship Jet, air freight, sea freight',
  openGraph: {
    title: 'Ship Jet — Shippin\' At Jet Speed',
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
        {/* Inline script to apply dark/light class before first paint — no flicker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-[#08071f] font-sans">
        {children}
      </body>
    </html>
  );
}
