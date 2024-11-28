'use client';

import React from 'react';
import Image from 'next/image';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ButtonWithLoading } from '@/components/ui/button-with-loading';
import useBasicStore from '@/hooks/useBasicStore';
import { HeartIcon, Trash2 } from 'lucide-react';
import { useUnlikeProduct } from '@/hooks/useUnlikeProduct';
import { Product } from '@/db/schema';
import { useLikedProducts } from '@/hooks/useLikedProducts';

const LikesSidebar = () => {
  const { isLikesSidebarOpen, setLikesSidebarState } = useBasicStore();
  const { mutate: unlikeProduct, isPending: isPendingUnlike } = useUnlikeProduct();

  const { data: likedProducts } = useLikedProducts();

  const handleUnlike = async (product: Product) => {
    unlikeProduct(product);
  };

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
              {likedProducts && likedProducts?.length === 0 ? (
                <h1 className="py-6">You do not have any items</h1>
              ) : (
                likedProducts?.map((product) => (
                  <div key={product.productId} className="flex items-center space-x-4 overflow-hidden">
                    <div className="flex-none w-[100px] group">
                      <figure className="group-hover:opacity-80 relative w-full aspect-[4/3]">
                        <Image src={product.imageUrl} alt={product.name} className="object-cover" fill sizes="100vw" />
                      </figure>
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                    </div>
                    <div>
                      <ButtonWithLoading
                        onClick={() => handleUnlike(product)}
                        variant="ghost"
                        size="icon"
                        disabled={isPendingUnlike}
                      >
                        <Trash2 />
                      </ButtonWithLoading>
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
