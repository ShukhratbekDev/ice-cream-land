'use client';

import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from 'react-use-cart';
import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import { ClerkProvider } from '@clerk/nextjs';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function Providers({
  children,
  ...props
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider {...props}>
      <ClerkProvider>
        <TooltipProvider>
          <CartProvider>
            <QueryClientProvider client={queryClient}>
              {children}
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </CartProvider>
        </TooltipProvider>
      </ClerkProvider>
    </ThemeProvider>
  );
}
