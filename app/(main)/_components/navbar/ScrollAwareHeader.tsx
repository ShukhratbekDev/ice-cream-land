'use client';

import { useCallback, useEffect, useState } from 'react';

interface ScrollAwareHeaderProps {
  children: React.ReactNode;
}

export function ScrollAwareHeader({ children }: ScrollAwareHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-background'
      }`}
      role="banner"
    >
      {children}
    </header>
  );
}
