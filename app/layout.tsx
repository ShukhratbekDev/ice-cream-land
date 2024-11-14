import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Providers from '@/utils/providers';

import './globals.css';

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
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
