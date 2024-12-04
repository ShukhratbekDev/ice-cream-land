'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface SkipLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  contentId?: string;
}

const SkipLink = forwardRef<HTMLAnchorElement, SkipLinkProps>(
  ({ className, contentId = 'main-content', children = 'Skip to content', ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={`#${contentId}`}
        className={cn('sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-background focus:p-4', className)}
        {...props}
      >
        {children}
      </a>
    );
  }
);

SkipLink.displayName = 'SkipLink';

export { SkipLink };
