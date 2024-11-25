import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import { Flame, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import RatingStars from '@/components/RatingStars';
import { useCart } from 'react-use-cart';
import useBasicStore from '@/hooks/useBasicStore';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useUser } from '@clerk/nextjs';
import LikeButton from '@/components/LikeButton';
import { Product } from '@/db/schema';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { isSignedIn } = useUser();
  const [quantity, setQuantity] = useState(1);
  const { items, updateItemQuantity, addItem, removeItem } = useCart();
  const { selectedRegion } = useBasicStore();
  const regionalPrice = selectedRegion
    ? product?.regionalPrices?.find((item) => item.regionId === selectedRegion.regionId)
    : undefined;

  const price = regionalPrice
    ? `${regionalPrice.price.toFixed(2)} ${regionalPrice.currency}`
    : `$ ${product.price.toFixed(2)}`;

  const itemInCart = items.find((item) => item.id === String(product.productId));

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const handleAddToCart = () => {
    if (itemInCart) {
      updateItemQuantity(String(product.productId), quantity);
    } else {
      addItem({ ...product, id: String(product.productId) }, quantity);
    }
  };

  const handleRemoveItem = () => {
    removeItem(String(product.productId));
    setQuantity(1);
  };

  useEffect(() => {
    if (itemInCart && itemInCart.quantity) {
      setQuantity(itemInCart.quantity);
    }
  }, [itemInCart, product.productId]);

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
              {product.isHot && (
                <Tooltip>
                  <TooltipTrigger>
                    <Flame className="size-4" fill="red" color="red" />
                  </TooltipTrigger>
                  <TooltipContent>Hot Sale</TooltipContent>
                </Tooltip>
              )}
            </Link>
          </CardTitle>
          <div className="flex items-center mt-2 gap-1">
            <RatingStars rating={product.rating} />
            <Badge variant="secondary">{product.rating}</Badge>
          </div>
        </div>
        <CardDescription>{product.description}</CardDescription>
        <div className="flex flex-wrap gap-1 mt-4">
          {product.ingredients.map((ingredient) => (
            <Badge key={ingredient.id} variant="outline">
              {ingredient.name}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-3xl font-bold">{price}</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center space-x-2">
        {itemInCart && (
          <Input type="number" min="1" value={quantity} onChange={handleQuantityChange} className="w-20" />
        )}
        <Button className="flex-grow" onClick={handleAddToCart} disabled={itemInCart?.quantity === quantity}>
          <ShoppingCart className="mr-2 h-4 w-4" /> {itemInCart ? 'Update' : 'Add to Cart'}
        </Button>
        {itemInCart && (
          <Button className="flex" onClick={handleRemoveItem} variant="secondary">
            <Trash2 />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
