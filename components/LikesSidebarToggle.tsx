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
        <Button variant="ghost" size="icon" onClick={() => setLikesSidebarState(true)} disabled={isPending}>
          <HeartIcon className="size-4" />
        </Button>
        {likedProducts && likedProducts?.length > 0 && (
          <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full px-2 py-1 text-[.5rem] font-medium flex items-center justify-center">
            {likedProducts?.length}
          </div>
        )}
      </div>
      <LikesSidebar />
    </>
  );
};

export default LikesSidebarToggle;
