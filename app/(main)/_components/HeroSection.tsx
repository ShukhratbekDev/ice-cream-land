import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = memo(() => (
  <section className="relative min-h-[calc(100vh-4rem)] bg-[#FCFCFC] dark:bg-background overflow-hidden">
    {/* Fresh Modern Pattern Background */}
    <div className="absolute inset-0">
      {/* Base Pattern Layer */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='360' height='360' viewBox='0 0 360 360' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='rgb(var(--primary-rgb))'%3E%3C!-- Abstract Ice Cream Shapes --%3E%3Cpath d='M60 140c0-30 24-54 54-54s54 24 54 54c0 40-54 60-54 60s-54-20-54-60zM60 140h108M87 98l54 84M141 98l-54 84'/%3E%3Cpath d='M240 80c0-25 20-45 45-45s45 20 45 45c0 35-45 50-45 50s-45-15-45-50zM240 80h90M263 45l45 70M308 45l-45 70'/%3E%3C!-- Floating Elements --%3E%3Ccircle cx='120' cy='280' r='40' fill='none' stroke='rgb(var(--primary-rgb))' stroke-width='2' stroke-dasharray='8 8'/%3E%3Ccircle cx='280' cy='200' r='30' fill='none' stroke='rgb(var(--primary-rgb))' stroke-width='2' stroke-dasharray='6 6'/%3E%3C!-- Dynamic Lines --%3E%3Cpath d='M20 220c30-30 60-30 90 0s60 30 90 0' fill='none' stroke='rgb(var(--primary-rgb))' stroke-width='2'/%3E%3Cpath d='M180 260c20-20 40-20 60 0s40 20 60 0' fill='none' stroke='rgb(var(--primary-rgb))' stroke-width='2'/%3E%3C!-- Decorative Dots --%3E%3Ccircle cx='40' cy='40' r='4'/%3E%3Ccircle cx='320' cy='320' r='4'/%3E%3Ccircle cx='180' cy='180' r='4'/%3E%3C!-- Modern Accents --%3E%3Cpath d='M280 120l12-12 12 12-12 12z'/%3E%3Cpath d='M80 200l10-10 10 10-10 10z'/%3E%3Cpath d='M200 300l8-8 8 8-8 8z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '360px 360px',
          backgroundPosition: 'center',
          transform: 'rotate(-4deg)',
        }}
      ></div>

      {/* Dynamic Gradient Layer */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-primary/[0.02] animate-gradient-shift"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(var(--primary-rgb),0.03)_0%,transparent_50%)] animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(var(--primary-rgb),0.025)_0%,transparent_50%)] animate-pulse-slow-reverse"></div>
      </div>

      {/* Interactive Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/3 w-72 h-72">
          <div className="absolute inset-0 bg-gradient-radial from-primary/[0.04] via-transparent to-transparent rounded-full animate-float-slow"></div>
        </div>
        <div className="absolute bottom-1/3 left-1/4 w-60 h-60">
          <div className="absolute inset-0 bg-gradient-radial from-primary/[0.035] via-transparent to-transparent rounded-full animate-float-delayed-slow"></div>
        </div>
      </div>

      {/* Modern Line Accents */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full">
          <div className="absolute top-1/4 left-1/3 w-[2px] h-20 bg-gradient-to-b from-transparent via-primary/[0.07] to-transparent transform rotate-45 animate-line-fade"></div>
          <div className="absolute bottom-1/3 right-1/4 w-[2px] h-20 bg-gradient-to-b from-transparent via-primary/[0.06] to-transparent transform -rotate-45 animate-line-fade-delayed"></div>
        </div>
      </div>

      {/* Enhanced Glass Effect */}
      <div className="absolute inset-0 backdrop-blur-[180px] opacity-[0.015]"></div>
    </div>

    {/* Decorative Elements */}
    <div className="absolute inset-0">
      {/* Top Right Decoration */}
      <div className="absolute -top-20 -right-20 w-96 h-96">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl"></div>
          <svg className="absolute inset-0 w-full h-full text-primary/10 animate-slow-spin" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'currentColor', stopOpacity: 0.2 }} />
                <stop offset="100%" style={{ stopColor: 'currentColor', stopOpacity: 0.05 }} />
              </linearGradient>
            </defs>
            <path
              d="M100,10 C120,10 140,20 160,40 C180,60 190,80 190,100 C190,120 180,140 160,160 C140,180 120,190 100,190 C80,190 60,180 40,160 C20,140 10,120 10,100 C10,80 20,60 40,40 C60,20 80,10 100,10 Z"
              fill="url(#gradient)"
            />
          </svg>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="container relative px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 min-h-[calc(100vh-4rem)] items-center justify-items-center py-8 sm:py-12 lg:py-16">
        {/* Left Content */}
        <div className="relative z-10 space-y-6 sm:space-y-8 text-center lg:text-left max-w-xl w-full">
          {/* Badge */}
          <div className="inline-flex items-center justify-center lg:justify-start">
            <span className="relative flex h-2.5 sm:h-3 w-2.5 sm:w-3 mr-2 sm:mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 sm:h-3 w-2.5 sm:w-3 bg-primary"></span>
            </span>
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent text-xs sm:text-sm font-medium px-2.5 sm:px-3 py-1 rounded-full border border-primary/20">
              New Flavors Available
            </span>
          </div>

          {/* Heading */}
          <div className="relative">
            <div className="absolute -inset-3 bg-gradient-to-r from-primary/10 to-transparent blur-2xl -z-10"></div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
              Where every scoop is a delight
            </h1>
          </div>

          {/* Description */}
          <p className="text-lg sm:text-xl text-muted-foreground">
            Experience the magic of handcrafted ice cream with our unique flavors and premium ingredients
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
            <Button
              asChild
              size="lg"
              className="relative bg-primary hover:bg-primary/90 transition-all duration-300 group text-base sm:text-lg"
            >
              <Link href="/products" className="flex items-center gap-2">
                Start Order
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="relative pt-8 sm:pt-12">
            <div className="grid grid-cols-2 gap-4 sm:gap-8">
              {[
                { value: '20+', label: 'Unique Flavors' },
                { value: '100%', label: 'Natural Ingredients' },
              ].map((stat, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl -z-10"></div>
                  <div className="p-3 sm:p-4">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative h-[40vh] sm:h-[50vh] lg:h-[85vh] order-first lg:order-last w-full">
          <div className="absolute inset-0 lg:-right-20">
            <div className="relative h-full w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-[1rem] sm:rounded-[1.5rem] lg:rounded-[2rem] blur-3xl -z-10 opacity-30"></div>
              <div className="relative h-full rounded-[1rem] sm:rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden border border-primary/10 shadow-2xl shadow-primary/5">
                <Image
                  src="/bg2.jpg"
                  alt="Delicious ice cream varieties showcasing our premium flavors"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  fill
                  priority
                  quality={90}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
));

HeroSection.displayName = 'HeroSection';

export default HeroSection;
