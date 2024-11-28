'use client';

import React from 'react';
import { HeartIcon } from 'lucide-react';
import { ButtonWithLoading } from '@/components/ui/button-with-loading';
import { Product } from '@/db/schema';
import { useLikeProduct } from '@/hooks/useLikeProduct';
import { useUnlikeProduct } from '@/hooks/useUnlikeProduct';

type LikeButtonProps = {
  product: Product;
};

const LikeButton = ({ product }: LikeButtonProps) => {
  const { mutate: likeProduct, isPending: isPendingLike } = useLikeProduct();
  const { mutate: unlikeProduct, isPending: isPendingUnlike } = useUnlikeProduct();

  const handleLike = () => {
    if (product.isLiked) {
      unlikeProduct(product);
    } else {
      likeProduct(product);
    }
  };

  return (
    <ButtonWithLoading
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
    </ButtonWithLoading>
  );
};

export default LikeButton;
