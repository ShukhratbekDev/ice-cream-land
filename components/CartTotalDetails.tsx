'use client';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronsUpDown } from 'lucide-react';
import { setCurrency } from '@/lib/setCurrency';
import { Badge } from '@/components/ui/badge';
import React from 'react';
import { useCart } from '@/hooks/useCart';
import { useProducts } from '@/hooks/useProducts';
import useBasicStore from '@/hooks/useBasicStore';
import { useCalculateFinalPrice } from '@/hooks/useCalculateFinalPrice';

type CartTotalDetailsProps = {
  openCollapse?: boolean;
};

const CartTotalDetails = ({ openCollapse }: CartTotalDetailsProps) => {
  const [isOpen, setIsOpen] = React.useState(openCollapse);
  const { data: items } = useCart();
  const { data: products } = useProducts();
  const { selectedRegion } = useBasicStore();

  const getCartTotal = () => {
    return (items ?? []).reduce((acc, itemInCart) => {
      const product = products?.find((item) => itemInCart.productId === item.productId);

      if (!product) {
        return acc;
      }

      const regionalPrice = selectedRegion
        ? product?.regionalPrices?.find((item) => item.regionId === selectedRegion.regionId)
        : undefined;
      acc += Number(regionalPrice?.price ?? product.price) * (itemInCart?.quantity ?? 1);

      return acc;
    }, 0);
  };

  const cartTotal = getCartTotal();
  const { data: finalPrice } = useCalculateFinalPrice(selectedRegion?.regionId ?? 'UZB', cartTotal);

  if (cartTotal <= 0) {
    return <div className="text-sm text-muted-foreground text-center py-4">Add items to cart to see total</div>;
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center justify-between space-x-4 mb-2">
          <h4 className="text-sm font-semibold">Details</h4>
          <ChevronsUpDown className="h-4 w-4" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex justify-between mb-2 text-sm">
          <div>Subtotal</div>
          <div>
            {setCurrency({
              price: cartTotal,
              locale: selectedRegion?.regionId,
              currency: selectedRegion?.currency,
            })}
          </div>
        </div>
        <div className="flex justify-between mb-2 text-sm">
          <div>
            Discount{' '}
            {finalPrice?.discountPercentage && (
              <Badge variant="secondary">{`${finalPrice?.discountPercentage}%`}</Badge>
            )}
          </div>
          <div>
            -{' '}
            {setCurrency({
              price: finalPrice?.discountAmount,
              locale: selectedRegion?.regionId,
              currency: selectedRegion?.currency,
            })}
          </div>
        </div>
        <div className="flex justify-between mb-2 text-sm">
          <div>
            Tax {finalPrice?.taxPercentage && <Badge variant="secondary">{`${finalPrice?.taxPercentage}%`}</Badge>}
          </div>
          <div>
            {setCurrency({
              price: finalPrice?.taxAmount,
              locale: selectedRegion?.regionId,
              currency: selectedRegion?.currency,
            })}
          </div>
        </div>
        <div className="flex justify-between mb-4 text-sm">
          <div>Shipping</div>
          <div>Free</div>
        </div>
      </CollapsibleContent>
      <div className="flex justify-between font-bold">
        <div>Total</div>
        <div>
          {setCurrency({
            price: finalPrice?.finalAmount,
            locale: selectedRegion?.regionId,
            currency: selectedRegion?.currency,
          })}
        </div>
      </div>
    </Collapsible>
  );
};

export default CartTotalDetails;
