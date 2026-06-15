import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { B2BStoreProvider } from '@/hooks/use-b2b-store';
import { AdsPixel } from '@/components/ads/ads-pixel';
import { getSeoConfig } from '@/config/brand-config';

const seoConfig = getSeoConfig();

export const metadata: Metadata = {
  title: {
    default: seoConfig.siteTitle,
    template: `%s | Acmaoyi`,
  },
  description: seoConfig.siteDescription,
  keywords: seoConfig.keywords.split(', '),
  authors: [{ name: 'Acmaoyi' }],
  generator: 'Next.js',
  openGraph: {
    title: seoConfig.siteTitle,
    description: seoConfig.siteDescription,
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased min-h-screen flex flex-col bg-[#F8FAFC]`}>
        <AdsPixel />
        <B2BStoreProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </B2BStoreProvider>
      </body>
    </html>
  );
}