import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';

const NavMenus = () => {
  const menus = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Products',
      path: '/products',
    },
    {
      name: 'About Us',
      path: '/about-us',
    },
    {
      name: 'Contact Us',
      path: '/contact-us',
    },
  ];
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {menus.map((menu, index) => (
          <NavigationMenuItem key={index}>
            <Link href={menu.path} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>{menu.name}</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavMenus;
