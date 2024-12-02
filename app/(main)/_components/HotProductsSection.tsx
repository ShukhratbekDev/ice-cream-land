import { memo } from 'react';
import { Flame } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';
import { cn } from '@/lib/utils';

interface HotProductsSectionProps {
  products: Product[];
  className?: string;
}

const HotProductsSection = memo<HotProductsSectionProps>(({ products, className }) => {
  return (
    <section className={cn('py-16 sm:py-20 w-full scroll-mt-20', className)} aria-labelledby="hot-products-heading">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="flex items-center gap-2 mb-8 sm:mb-10" role="presentation">
          <h2 id="hot-products-heading" className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
            Hot Products
            <Flame
              className="inline-block ml-2 size-5 sm:size-6 lg:size-7 animate-pulse"
              aria-hidden="true"
              fill="red"
              color="red"
            />
          </h2>
        </div>

        {products?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.productId}
                className="transform transition-transform duration-300 hover:scale-[1.02] focus-within:scale-[1.02]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8" role="status">
            No hot products available at the moment.
          </p>
        )}
      </div>
    </section>
  );
});

HotProductsSection.displayName = 'HotProductsSection';

export default HotProductsSection;
