import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from '@/utils/providers';

import './globals.css';
import ShoppingCartModal from '@/components/ShoppingCartModal';
import { ThemeProvider } from '@/components/ThemeProvider';
import { siteConfig } from '@/config/site';
import { QueryClient } from '@tanstack/query-core';
import { getRegions } from '@/utils/api-requests';
import LikesSidebar from '@/components/LikesSidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: siteConfig.name,
  // TODO: generated description
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['hydrate-regions'],
    queryFn: getRegions,
  });

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col bg-background">
            <Providers>
              <Navbar />
              <ShoppingCartModal />
              <LikesSidebar />
              {children}
              <Footer />
            </Providers>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
