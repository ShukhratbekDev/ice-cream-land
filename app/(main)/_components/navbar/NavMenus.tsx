'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { menus } from './menus';

interface NavMenusProps {
  onSelect?: () => void;
}

export function NavMenus({ onSelect }: NavMenusProps) {
  const pathname = usePathname();

  return (
    <NavigationMenu className="max-w-full lg:max-w-none">
      <NavigationMenuList className="lg:flex-row flex-col items-center justify-center space-y-2 lg:space-y-0">
        {menus.map((menu, index) => {
          const isActive = pathname === menu.path;

          return (
            <NavigationMenuItem key={index}>
              <Link href={menu.path} legacyBehavior passHref onClick={() => onSelect?.()}>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'w-full justify-center lg:w-auto',
                    isActive && 'bg-accent text-accent-foreground'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={menu.description}
                >
                  {menu.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
