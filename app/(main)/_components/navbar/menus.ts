export const menus = [
  {
    name: 'Home',
    path: '/',
    description: 'Return to homepage',
  },
  {
    name: 'Products',
    path: '/products',
    description: 'Browse our ice cream products',
  },
  {
    name: 'About Us',
    path: '/about-us',
    description: 'Learn more about our company',
  },
  {
    name: 'Contact Us',
    path: '/contact-us',
    description: 'Get in touch with us',
  },
] as const;

export type Menu = (typeof menus)[number];
