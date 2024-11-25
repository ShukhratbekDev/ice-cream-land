'use client';
import { useQuery } from '@tanstack/react-query';
import { getProduct } from '@/utils/api-requests';
import React from 'react';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';

const ProductView = ({ id }: { id: number }) => {
  const { data: product } = useQuery({
    queryKey: ['hydrate-product', id],
    queryFn: () => getProduct(id),
    staleTime: 10 * 1000,
  });

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
