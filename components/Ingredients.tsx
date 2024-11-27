import { Product } from '@/db/schema';
import { Badge } from '@/components/ui/badge';
import React from 'react';

type IngredientsProps = {
  product: Product;
};

const Ingredients = ({ product }: IngredientsProps) => {
  return (
    <div className="flex flex-wrap gap-1 mt-4">
      {(product?.ingredients ?? []).map((ingredient) => (
        <Badge key={ingredient.id} variant="outline">
          {ingredient.name}
        </Badge>
      ))}
    </div>
  );
};

export default Ingredients;
