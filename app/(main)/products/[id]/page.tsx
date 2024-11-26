import ProductView from '@/components/ProductView';

const ProductViewPage = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const productId = Number((await params).productId);

  return <ProductView productId={productId} />;
};

export default ProductViewPage;
