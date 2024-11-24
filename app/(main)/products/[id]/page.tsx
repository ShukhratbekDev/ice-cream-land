import ProductView from '@/components/ProductView';

const ProductViewPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = Number((await params).id);

  return <ProductView id={id} />;
};

export default ProductViewPage;
