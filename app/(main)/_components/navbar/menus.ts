export const menus = [
  {
    name: 'Home',
    path: '/',
    description: 'Return to homepage',
    protected: false,
  },
  {
    name: 'Products',
    path: '/products',
    description: 'Browse our ice cream products',
    protected: false,
  },
  {
    name: 'Analytics',
    path: '/analytics',
    description: 'View sales analytics and insights',
    protected: true,
  },
  {
    name: 'About Us',
    path: '/about-us',
    description: 'Learn more about our company',
    protected: false,
  },
  {
    name: 'Contact Us',
    path: '/contact-us',
    description: 'Get in touch with us',
    protected: false,
  },
] as const;

export type Menu = (typeof menus)[number];
