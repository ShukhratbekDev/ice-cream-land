'use client';

import { memo } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { siteConfig } from '@/config/site';
import { FacebookIcon, InstagramIcon, TiktokIcon, TwitterIcon } from '@/components/ui/social-icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { Navigation } from './Footer.types';

const navigation: Navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about-us' },
    { name: 'Products', href: '/products' },
    { name: 'Contact', href: '/contact-us' },
  ],
  social: [
    {
      name: 'Facebook',
      href: 'https://facebook.com/icecreamland.uz',
      icon: FacebookIcon,
      username: '@icecreamland.uz',
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/icecreamland_uz',
      icon: TwitterIcon,
      username: '@icecreamland_uz',
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/icecreamland.uz',
      icon: InstagramIcon,
      username: '@icecreamland.uz',
    },
    {
      name: 'TikTok',
      href: 'https://tiktok.com/@icecreamland.uz',
      icon: TiktokIcon,
      username: '@icecreamland.uz',
    },
  ],
};

const Footer = memo(function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative bg-gradient-to-b from-background via-muted/50 to-muted dark:from-background dark:via-muted/10 dark:to-muted/20 overflow-hidden"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Modern mesh gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Light mode mesh */}
        <div className="absolute inset-0 dark:opacity-0">
          <div className="absolute inset-0 bg-[radial-gradient(at_top_left,rgba(255,182,255,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(at_top_right,rgba(159,159,255,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(at_bottom_left,rgba(255,182,255,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(at_bottom_right,rgba(159,159,255,0.1),transparent_50%)]" />
          <div className="absolute inset-0 backdrop-blur-[100px] opacity-50" />
        </div>

        {/* Dark mode mesh */}
        <div className="absolute inset-0 opacity-0 dark:opacity-100">
          <div className="absolute inset-0 bg-[radial-gradient(at_top_left,rgba(124,58,237,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(at_top_right,rgba(99,102,241,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(at_bottom_left,rgba(124,58,237,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(at_bottom_right,rgba(99,102,241,0.1),transparent_50%)]" />
          <div className="absolute inset-0 backdrop-blur-[100px] opacity-50" />
        </div>

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 bg-repeat mix-blend-soft-light opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '150px 150px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Branding section */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
              <Logo className="fill-pink-500 dark:fill-pink-400" />
              <span className="ml-3 text-xl font-bold text-foreground dark:text-foreground">{siteConfig.name}</span>
            </Link>
            <p className="text-sm text-muted-foreground dark:text-muted-foreground max-w-md">
              Crafting moments of joy with our artisanal ice cream. Made with love and the finest ingredients for an
              unforgettable taste experience.
            </p>
            <nav aria-label="Social media">
              <ul className="flex space-x-6" role="list">
                {navigation.social.map((item) => (
                  <li key={item.name}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            href={item.href}
                            className="text-muted-foreground opacity-70 hover:opacity-100 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm relative group"
                            aria-label={`Visit our ${item.name} page at ${item.username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <item.icon
                              className="h-6 w-6 dark:invert transform transition-transform duration-300 group-hover:scale-110"
                              aria-hidden="true"
                            />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm">{item.username}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Navigation sections */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <nav className="space-y-4" aria-label="Quick links">
              <h2 className="text-sm font-semibold text-foreground tracking-wider uppercase dark:text-foreground">
                Quick Links
              </h2>
              <ul className="space-y-3" role="list">
                {navigation.main.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 dark:text-muted-foreground dark:hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-foreground tracking-wider uppercase dark:text-foreground">
                Opening Hours
              </h2>
              <ul className="space-y-3 text-sm text-muted-foreground dark:text-muted-foreground" role="list">
                <li>Monday - Friday: 10AM - 10PM</li>
                <li>Saturday: 11AM - 11PM</li>
                <li>Sunday: 11AM - 9PM</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-foreground tracking-wider uppercase dark:text-foreground">
                Newsletter
              </h2>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                Subscribe for sweet updates and special offers!
              </p>
              <form
                className="space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  // Add newsletter subscription logic here
                }}
                aria-label="Newsletter subscription form"
              >
                <div>
                  <label htmlFor="email-input" className="sr-only">
                    Email address
                  </label>
                  <Input
                    id="email-input"
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="bg-background/60 dark:bg-background-dark/60"
                    aria-label="Email address for newsletter"
                  />
                </div>
                <Button type="submit" className="w-full" aria-label="Subscribe to newsletter">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-border dark:border-border-dark">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-muted-foreground dark:text-muted-foreground text-center sm:text-left">
              {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <nav aria-label="Legal">
              <ul className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 text-xs" role="list">
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 dark:text-muted-foreground dark:hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 dark:text-muted-foreground dark:hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 dark:text-muted-foreground dark:hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                  >
                    Cookies
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
