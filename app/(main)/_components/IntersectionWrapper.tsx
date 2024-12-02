'use client';

import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';

interface IntersectionWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function IntersectionWrapper({ children, className }: IntersectionWrapperProps) {
  const { ref } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
