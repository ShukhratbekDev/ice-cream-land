'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';
import { siteConfig } from '@/config/site';
import { useAuth } from '@clerk/nextjs';
import { ScrollAwareHeader } from './ScrollAwareHeader';
import { UserActions } from './UserActions';
import { MobileMenu } from './MobileMenu';
import { NavMenus } from './NavMenus';

export function Navbar() {
  const { userId } = useAuth();
  const isSignedIn = !!userId;

  return (
    <ScrollAwareHeader>
      <div className="justify-items-center">
        <div className="container">
          <div className="w-full">
            <nav
              className="hidden justify-between items-center lg:flex h-16"
              role="navigation"
              aria-label="Main navigation"
            >
              <Link
                href="/"
                className="flex items-center transition-opacity hover:opacity-80"
                aria-label={`${siteConfig.name} home`}
              >
                <Logo className="fill-pink-500 dark:fill-pink-400" />
                <span className="ml-3 text-xl font-bold text-foreground dark:text-foreground">{siteConfig.name}</span>
              </Link>

              <div className="flex-1 px-8">
                <NavMenus />
              </div>

              <UserActions isSignedIn={isSignedIn} />
            </nav>

            <MobileMenu isSignedIn={isSignedIn} />
          </div>
        </div>
      </div>
    </ScrollAwareHeader>
  );
}
