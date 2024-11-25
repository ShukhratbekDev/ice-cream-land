'use client';

import React from 'react';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { useProduct } from '@/hooks/useProduct';

const ProductView = ({ id }: { id: number }) => {
  const { data: product } = useProduct(id);

  return (
    product && (
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative">
          <Image src={product.imageUrl!} alt={product.name} className="object-cover" fill sizes="100vw" />
        </div>
        <div>
          <ProductCard product={product} />
        </div>
      </div>
    )
  );
};

export default ProductView;
