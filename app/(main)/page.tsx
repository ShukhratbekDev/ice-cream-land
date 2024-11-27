'use client';

import React from 'react';
import Image from 'next/image';
import { ButtonWithLoading } from '@/components/ui/button-with-loading';
import { ArrowRight } from 'lucide-react';
import backgroundImage from '@/public/background_home.jpg';

const HomePage = () => {
  return (
    <main className="relative min-h-screen">
      <div className="relative h-screen w-full overflow-hidden bg-neutral-100">
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt="Ice cream scoops stacked"
            fill
            priority
            quality={100}
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-12 lg:px-24">
          <div className="max-w-2xl space-y-6">
            <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl lg:text-7xl">
              Welcome to <br />
              Ice Cream Land!
            </h1>

            <p className="text-xl text-white/90 md:text-2xl">Where every scoop is a delight.</p>

            <ButtonWithLoading
              variant="default"
              size="lg"
              className="bg-emerald-500 text-white hover:bg-emerald-600"
              onClick={() => console.log('Start Order clicked')}
            >
              Start Order
              <ArrowRight className="ml-2" />
            </ButtonWithLoading>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
