'use client';

import { HeartIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';
import { Product } from '@/db/schema';
import { useLikeProduct } from '@/hooks/useLikeProduct';
import { useUnlikeProduct } from '@/hooks/useUnlikeProduct';

type LikeButtonProps = {
  product: Product;
};

const LikeButton = ({ product }: LikeButtonProps) => {
  const { mutate: likeProduct, isPending: isPendingLike } = useLikeProduct();
  const { mutate: unlikeProduct, isPending: isPendingUnlike } = useUnlikeProduct();

  const handleLike = async () => {
    if (product.isLiked) {
      await unlikeProduct(product);
    } else {
      likeProduct(product);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="absolute top-3 end-3 rounded-full"
      onClick={handleLike}
      disabled={isPendingLike || isPendingUnlike}
    >
      <HeartIcon
        className="size-4"
        fill={product.isLiked ? 'red' : 'none'}
        color={product.isLiked ? 'red' : 'currentColor'}
      />
    </Button>
  );
};

export default LikeButton;
