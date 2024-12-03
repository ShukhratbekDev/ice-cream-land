'use client';

import { Button } from '@/components/ui/button';
import { HeartIcon } from 'lucide-react';
import React from 'react';
import useBasicStore from '@/hooks/useBasicStore';
import { useLikedProducts } from '@/hooks/useLikedProducts';
import LikesSidebar from '@/components/LikesSidebar';

const LikesSidebarToggle = () => {
  const { setLikesSidebarState } = useBasicStore();
  const { data: likedProducts, isPending } = useLikedProducts();

  return (
    <>
      <div className="relative inline-block">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setLikesSidebarState(true)}
          disabled={isPending}
          aria-label={`Open liked products sidebar${likedProducts?.length ? `. You have ${likedProducts.length} liked products` : ''}`}
          className="hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <HeartIcon className="size-4" aria-hidden="true" />
        </Button>
        {likedProducts && likedProducts?.length > 0 && (
          <div
            className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full min-w-5 h-5 px-1.5 text-xs font-medium flex items-center justify-center"
            role="status"
            aria-live="polite"
          >
            <span className="sr-only">Number of liked products:</span>
            {likedProducts?.length}
          </div>
        )}
      </div>
      <LikesSidebar />
    </>
  );
};

export default LikesSidebarToggle;
