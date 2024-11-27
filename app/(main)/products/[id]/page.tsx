import ProductView from '@/components/ProductView';

const ProductViewPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const productId = Number((await params).id);

  return <ProductView productId={productId} />;
};

export default ProductViewPage;
