import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from '@/utils/providers';

import './globals.css';
import ShoppingCartModal from '@/components/ShoppingCartModal';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ice Cream Land',
  // TODO: generated description
  description: 'Some description',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative flex min-h-screen flex-col bg-background">
          <Providers>
            <Navbar />
            <ShoppingCartModal />
            {children}
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}
