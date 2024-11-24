import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from '@/providers/Providers';
import ShoppingCartSidebar from '@/components/ShoppingCartSidebar';
import { ThemeProvider } from '@/components/ThemeProvider';
import { siteConfig } from '@/config/site';
import LikesSidebar from '@/components/LikesSidebar';
import Hydration from '@/providers/Hydration';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: siteConfig.name,
  // TODO: generated description
  description: siteConfig.description,
};

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col bg-background">
            <Providers>
              <Hydration>
                <Navbar />
                <ShoppingCartSidebar />
                <LikesSidebar />
                {children}
                <Footer />
              </Hydration>
            </Providers>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
