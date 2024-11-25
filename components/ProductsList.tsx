'use client';

import React from 'react';
import { getProducts } from '@/utils/api-requests';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from '@/components/ProductCard';
import { useQuery } from '@tanstack/react-query';

const defaultTab = 'All';

const ProductsList = () => {
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
    staleTime: 10 * 1000,
  });
  const categories = [defaultTab, ...new Set(data?.map((product) => product.category.name))].sort();

  return (
    <div className="hidden flex-col md:flex">
      <div className="flex-1 space-y-4 pt-6">
        <Tabs defaultValue={defaultTab} className="space-y-8">
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={`tab-trigger-${category}`} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((category) => (
            <TabsContent key={`tab-content-${category}`} value={category} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {(category === 'All' ? data : data?.filter((product) => product.category.name === category))?.map(
                  (product) => <ProductCard product={product} key={category + product.id} />
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ProductsList;
