import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RatingStars from '@/components/RatingStars';
import useBasicStore from '@/hooks/useBasicStore';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import LikeButton from '@/components/LikeButton';
import { Product } from '@/db/schema';
import AddItemToCart from '@/components/AddItemToCart';
import Ingredients from '@/components/Ingredients';
import IsHotProduct from '@/components/IsHotProduct';
import { setCurrency } from '@/lib/setCurrency';
import UpdateItemInCart from '@/components/UpdateItemInCart';
import RemoveItemFromCart from '@/components/RemoveItemFromCart';
import { useCart } from '@/hooks/useCart';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { isSignedIn } = useUser();
  const { selectedRegion } = useBasicStore();
  const regionalPrice = selectedRegion
    ? product?.regionalPrices?.find((item) => item.regionId === selectedRegion.regionId)
    : undefined;
  const price = regionalPrice?.price ?? product.price;
  const { data } = useCart(isSignedIn);
  const itemInCart = data?.find((item) => item.productId === product.productId);

  return (
    <Card className="w-full overflow-hidden group" role="listitem">
      <CardHeader className="p-0">
        <figure
          className="group-hover:opacity-80 relative w-full aspect-[4/3] mb-4"
          aria-label={`Image of ${product.name}`}
        >
          <Image
            src={product.imageUrl!}
            alt={`${product.name} ice cream`}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
          <Badge
            variant="secondary"
            className="absolute top-3 left-3 text-sm"
            aria-label={`Product category: ${product.category.name}`}
          >
            {product.category.name}
          </Badge>
          {isSignedIn && <LikeButton product={product} />}
        </figure>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <CardTitle>
            <Link
              href={`/products/${product.productId}`}
              className="flex gap-2 hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded-sm"
              aria-label={`${product.name}${product.isHot ? ', Hot Product' : ''} - Click to view details`}
            >
              {product.name}
              <IsHotProduct product={product} />
            </Link>
          </CardTitle>
          <div className="flex items-center mt-2 gap-1" aria-label="Product rating">
            <RatingStars rating={product.rating} />
            <Badge variant="secondary" aria-label={`Rating: ${product.rating} out of 5`}>
              {product.rating}
            </Badge>
          </div>
        </div>
        <CardDescription className="text-base">
          <span id={`desc-${product.productId}`}>{product.description}</span>
        </CardDescription>
        <Ingredients product={product} />
        <div className="flex justify-between items-center mt-4">
          <span
            className="text-3xl font-bold"
            aria-label={`Price: ${setCurrency({ price, locale: selectedRegion?.regionId, currency: selectedRegion?.currency })}`}
          >
            {setCurrency({ price, locale: selectedRegion?.regionId, currency: selectedRegion?.currency })}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center space-x-2">
        {isSignedIn ? (
          <>
            {itemInCart ? (
              <>
                <UpdateItemInCart itemInCart={itemInCart} />
                <RemoveItemFromCart productId={product.productId} />
              </>
            ) : (
              <AddItemToCart product={product} />
            )}
          </>
        ) : (
          <Button
            variant="default"
            className="flex-grow gap-2"
            asChild
            aria-label={`Sign in to add ${product.name} to cart`}
          >
            <Link href="/sign-in">
              <ShoppingCart className="h-4 w-4" aria-hidden="true" />
              Add to Cart
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
