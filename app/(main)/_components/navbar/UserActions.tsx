'use client';

import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import CartButton from '@/components/CartButton';
import ModeSwitcher from '@/components/ModeSwitcher';
import LikesSidebarToggle from '@/components/LikesSidebarToggle';
import RegionDropdownMenu from '@/components/RegionDropdownMenu';

interface UserActionsProps {
  isSignedIn: boolean;
}

export function UserActions({ isSignedIn }: UserActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <RegionDropdownMenu />
      <ModeSwitcher />
      {isSignedIn && (
        <>
          <LikesSidebarToggle />
          <CartButton />
        </>
      )}
      <UserButton afterSignOutUrl="/" />
      {!isSignedIn && (
        <>
          <SignInButton mode="modal" />
          <SignUpButton mode="modal" />
        </>
      )}
    </div>
  );
}
