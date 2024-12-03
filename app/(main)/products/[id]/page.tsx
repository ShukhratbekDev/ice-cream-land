import { getProduct } from '@/utils/api-requests';
import { Suspense } from 'react';
import ProductView from '@/components/ProductView';
import { ProductSkeleton } from '@/components/ProductView';

async function ProductViewPage({ params }: { params: { id: string } }) {
  const productId = Number(params.id);
  const product = await getProduct(productId);

  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductView product={product} />
    </Suspense>
  );
}

export default ProductViewPage;
