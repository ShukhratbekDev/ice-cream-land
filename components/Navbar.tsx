'use client';

import { HeartIcon, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Logo from './Logo';
import NavMenus from '@/components/NavMenus';
import React from 'react';
import CartButton from '@/components/CartButton';
import ModeSwitcher from '@/components/ModeSwitcher';
import { siteConfig } from '@/config/site';
import LikesButton from '@/components/LikesButton';
import RegionDropdownMenu from '@/components/RegionDropdownMenu';

import { SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { SignInButton } from '@clerk/clerk-react';

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <section className="justify-items-center py-3">
      <div className="container">
        <nav className="hidden justify-between items-center lg:flex">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="font-bold">{siteConfig.name}</span>
            </div>
            <div className="flex items-center">
              <NavMenus />
            </div>
          </div>
          <div className="flex gap-2">
            <RegionDropdownMenu />
            <ModeSwitcher />
            {isSignedIn && (
              <>
                <LikesButton />
                <CartButton />
              </>
            )}
            <UserButton />
            {!isSignedIn && (
              <>
                <SignInButton />
                <SignUpButton />
              </>
            )}
          </div>
        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="text-xl font-bold">{siteConfig.name}</span>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={'outline'} size={'icon'}>
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex items-center gap-2">
                      <Logo />
                      <span className="text-xl font-bold">{siteConfig.name}</span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-8 flex flex-row gap-4">
                  <NavMenus />
                </div>
                <div className="border-t pt-4">
                  <div className="mt-2 flex flex-col gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-white/70 absolute top-3 end-3 rounded-full dark:text-black"
                    >
                      <HeartIcon className="size-4" />
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
