'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';
import { Flame } from 'lucide-react';

const HomePage = () => {
  const { data } = useProducts();
  const hotProducts = data?.filter((product) => product.isHot === true);
  return (
    <div>
      <section className="relative overflow-hidden w-full">
        <div className="relative">
          <div className="absolute left-0 z-10 hidden h-full w-1/2 bg-[linear-gradient(to_right,hsl(var(--background))_85%,transparent_100%)] md:block"></div>
          <div className="md:-space-x-26 relative flex flex-col items-start md:flex-row md:items-center">
            <div className="z-20 -mx-[calc(theme(container.padding))] w-[calc(100%+2*theme(container.padding))] shrink-0 bg-background px-[calc(theme(container.padding))] pt-32 pl-32 md:w-1/2 md:bg-transparent md:pb-32">
              <div className="flex flex-col items-start text-left">
                <div className="max-w-sm">
                  <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">Where every scoop is a delight</h1>
                  <Button asChild>
                    <Link href="/products">Start Order</Link>
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-16 pb-8 pt-12 md:py-32">
                <Image src="/bg.jpg" alt="" className="object-cover" fill sizes="100vw" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="justify-items-center py-3 my-16">
        <div className="container">
          <div className="inline-flex flex-row gap-2">
            <h2 className="flex mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Hot products
              <Flame className="size-4" fill="red" color="red" />
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {hotProducts?.map((product) => product && <ProductCard product={product} key={product.productId} />)}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
