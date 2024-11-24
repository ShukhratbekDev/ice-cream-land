'use client';
import { useQuery } from '@tanstack/react-query';
import { getProduct } from '@/utils/api-requests';
import ProductCard from '@/components/ProductCard';

const ProductView = ({ id }: { id: number }) => {
  const { data } = useQuery({
    queryKey: ['hydrate-product', id],
    queryFn: () => getProduct(id),
    staleTime: 10 * 1000,
  });

  return data && <ProductCard product={data} />;
};

export default ProductView;
