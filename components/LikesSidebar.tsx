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
      <SheetContent className="sm:max-w-lg w-[90vw]" side="right" role="dialog" aria-label="Liked products sidebar">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <HeartIcon className="size-5" aria-hidden="true" />
            <span>Liked Products</span>
          </SheetTitle>
        </SheetHeader>
        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto" role="list" aria-label="List of liked products">
            <div className="grid grid-flow-row auto-rows-max gap-4">
              {likedProducts && likedProducts?.length === 0 ? (
                <p className="py-6 text-muted-foreground" role="status">
                  You do not have any liked products
                </p>
              ) : (
                likedProducts?.map((product) => (
                  <div
                    key={product.productId}
                    className="flex items-center space-x-4 overflow-hidden p-2 rounded-lg hover:bg-accent transition-colors"
                    role="listitem"
                  >
                    <div className="flex-none w-[100px] group">
                      <figure
                        className="group-hover:opacity-80 relative w-full aspect-[4/3]"
                        aria-label={`Image of ${product.name}`}
                      >
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          className="object-cover rounded-md"
                          fill
                          sizes="(max-width: 768px) 100px, 100px"
                          loading="lazy"
                        />
                      </figure>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-none truncate">{product.name}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
                    </div>
                    <div className="flex-none">
                      <ButtonWithLoading
                        onClick={() => handleUnlike(product)}
                        variant="ghost"
                        size="icon"
                        disabled={isPendingUnlike}
                        className="hover:bg-destructive hover:text-destructive-foreground rounded-full"
                        aria-label={`Remove ${product.name} from liked products`}
                      >
                        <Trash2 className="size-4" aria-hidden="true" />
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
