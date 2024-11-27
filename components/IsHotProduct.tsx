import { Product } from '@/db/schema';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Flame } from 'lucide-react';
import React from 'react';

type IsHotProductProps = {
  product: Product;
};

const IsHotProduct = ({ product }: IsHotProductProps) => {
  return (
    product?.isHot && (
      <Tooltip>
        <TooltipTrigger>
          <Flame className="size-4" fill="red" color="red" />
        </TooltipTrigger>
        <TooltipContent>Hot Sale</TooltipContent>
      </Tooltip>
    )
  );
};

export default IsHotProduct;
