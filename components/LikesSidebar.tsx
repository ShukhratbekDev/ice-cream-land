'use client';

import React from 'react';
import Image from 'next/image';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import useBasicStore from '@/hooks/useBasicStore';
import { HeartIcon, Trash2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/utils/api-requests';

const LikesSidebar = () => {
  const { likes, removeLike, isLikesSidebarOpen, setLikesSidebarState } = useBasicStore();
  const { data } = useQuery({
    queryKey: ['hydrate-products'],
    queryFn: () => getProducts(),
    staleTime: 10 * 1000,
  });

  const likedProducts = data?.filter((product) => likes.includes(product.id));

  return (
    <Sheet open={isLikesSidebarOpen} onOpenChange={() => setLikesSidebarState(false)}>
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <HeartIcon />
            Likes
          </SheetTitle>
        </SheetHeader>

        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto">
            <div className="grid grid-flow-row auto-rows-max gap-4">
              {likedProducts?.length === 0 ? (
                <h1 className="py-6">You do not have any items</h1>
              ) : (
                likedProducts?.map((product) => (
                  <div key={product.id} className="flex items-center space-x-4 overflow-hidden">
                    <div className="flex-none w-[100px] group">
                      <figure className="group-hover:opacity-80 relative w-full aspect-[4/3]">
                        <Image src={product.image} alt={product.name} className="object-cover" fill sizes="100vw" />
                      </figure>
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                    </div>
                    <div>
                      <Button onClick={() => removeLike(product.id)} variant="ghost" size="icon">
                        <Trash2 />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default LikesSidebar;
