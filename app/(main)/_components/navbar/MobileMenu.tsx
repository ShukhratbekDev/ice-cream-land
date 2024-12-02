'use client';

import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Logo from '@/components/Logo';
import { useState, useEffect } from 'react';
import CartButton from '@/components/CartButton';
import ModeSwitcher from '@/components/ModeSwitcher';
import { siteConfig } from '@/config/site';
import LikesSidebarToggle from '@/components/LikesSidebarToggle';
import RegionDropdownMenu from '@/components/RegionDropdownMenu';
import { SignUpButton, UserButton, useAuth } from '@clerk/nextjs';
import { SignInButton } from '@clerk/clerk-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavMenus } from './NavMenus';

interface MobileMenuProps {
  isSignedIn: boolean;
}

export function MobileMenu({ isSignedIn }: MobileMenuProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { isLoaded, userId } = useAuth();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname, isLoaded, userId]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsSidebarOpen(false);
    }
  };

  const handleAuthClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="block lg:hidden">
      <div className="flex items-center justify-between h-16">
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Open menu" className="mr-2 hover:bg-accent">
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[280px] sm:w-[320px] overflow-y-auto flex flex-col"
            onKeyDown={handleKeyDown}
          >
            <SheetHeader className="border-b pb-4">
              <SheetTitle>
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Logo />
                  <span className="text-xl font-bold">{siteConfig.name}</span>
                </Link>
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 flex flex-col py-6">
              <nav className="flex-1">
                <NavMenus />
              </nav>

              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center justify-between">
                  <RegionDropdownMenu />
                </div>
                {isSignedIn ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <LikesSidebarToggle />
                      <CartButton />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <SignInButton mode="modal">
                      <Button variant="outline" className="w-full" onClick={handleAuthClick}>
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button className="w-full" onClick={handleAuthClick}>
                        Sign Up
                      </Button>
                    </SignUpButton>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex transition-opacity hover:opacity-80" aria-label={`${siteConfig.name} home`}>
          <Logo />
          <span className="ml-2 text-xl font-bold">{siteConfig.name}</span>
        </Link>

        <div className="flex items-center gap-2">
          {isSignedIn && <UserButton />}
          <ModeSwitcher />
        </div>
      </div>
    </div>
  );
}
