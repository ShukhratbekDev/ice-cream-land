'use client';

import React from 'react';
import Image from 'next/image';
import { getProducts } from '@/utils/api-requests';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProductsList = () => {
  const { data } = useQuery({
    queryKey: ['hydrate-products'],
    queryFn: () => getProducts(),
    staleTime: 10 * 1000,
  });
  const categories = ['All', ...new Set(data?.map((product) => product.category))].sort();

  return (
    <div className="flex">
      <Tabs defaultValue="All">
        <TabsList>
          {categories.map((category) => (
            <TabsTrigger key={`tab-trigger-${category}`} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={`tab-content-${category}`} value={category}>
            <div className="grid grid-cols-4 gap-4">
              {(category === 'All' ? data : data?.filter((product) => product.category === category))?.map(
                (product) => (
                  <Card key={category + product.id}>
                    <CardHeader>
                      <div className="relative h-full w-full">
                        <Image
                          src="/image-placeholder.png"
                          alt={product.name}
                          sizes="100vw"
                          style={{
                            width: '100%',
                            height: 'auto',
                          }}
                          width={500}
                          height={300}
                          className="object-cover"
                          placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                        />
                      </div>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{product.ingredients.join(', ')}</p>
                    </CardContent>
                    <CardFooter>
                      <p>{product.price}</p>
                    </CardFooter>
                  </Card>
                )
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ProductsList;
