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
import AddToCart from '@/components/AddToCart';
import Ingredients from '@/components/Ingredients';
import IsHotProduct from '@/components/IsHotProduct';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { isSignedIn } = useUser();
  const { selectedRegion } = useBasicStore();
  const regionalPrice = selectedRegion
    ? product?.regionalPrices?.find((item) => item.regionId === selectedRegion.regionId)
    : undefined;

  const price = regionalPrice
    ? `${regionalPrice.price.toFixed(2)} ${regionalPrice.currency}`
    : `$ ${product.price.toFixed(2)}`;

  return (
    <Card className="max-w-sm overflow-hidden group">
      <CardHeader className="p-0">
        <figure className="group-hover:opacity-80 relative w-full aspect-[4/3] mb-4">
          <Image src={product.imageUrl!} alt={product.name} className="object-cover" fill sizes="100vw" />
          <Badge variant="secondary" className="absolute top-3 left-3 text-sm">
            {product.category.name}
          </Badge>
          {isSignedIn && <LikeButton product={product} />}
        </figure>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <CardTitle>
            <Link href={`/products/${product.productId}`} className="flex gap-2">
              {product.name}
              <IsHotProduct product={product} />
            </Link>
          </CardTitle>
          <div className="flex items-center mt-2 gap-1">
            <RatingStars rating={product.rating} />
            <Badge variant="secondary">{product.rating}</Badge>
          </div>
        </div>
        <CardDescription>{product.description}</CardDescription>
        <Ingredients product={product} />
        <div className="flex justify-between items-center mt-4">
          <span className="text-3xl font-bold">{price}</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center space-x-2">
        <AddToCart product={product} />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
