import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState } from 'react';
import { HeartIcon, ShoppingCart } from 'lucide-react';
import { Product } from '@/utils/api-requests';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import RatingStars from '@/components/ratingStars';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  return (
    <Card className="max-w-sm overflow-hidden">
      <CardHeader className="p-0 group">
        <figure className="group-hover:opacity-80 relative w-full aspect-[4/3] mb-4">
          <Image src={product.image} alt={product.name} layout="fill" objectFit="cover" />
          <Badge variant="secondary" className="absolute top-3 left-3 text-sm">
            {product.category}
          </Badge>
          <Button variant="ghost" size="icon" className="bg-white/70 absolute top-3 end-3 rounded-full dark:text-black">
            <HeartIcon className="size-4" />
          </Button>
        </figure>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <CardTitle>{product.name}</CardTitle>
          <div className="flex items-center mt-2 gap-1">
            <RatingStars rating={product.rating} />
            <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
          </div>
        </div>
        <CardDescription>{product.description}</CardDescription>
        <div className="flex flex-wrap gap-1 mt-4">
          {product.ingredients.map((ingredient) => (
            <Badge key={ingredient} variant="secondary" className="text-[0.5rem]">
              {ingredient}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center space-x-2">
        <Input type="number" min="1" value={quantity} onChange={handleQuantityChange} className="w-20" />
        <Button className="flex-grow">
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
