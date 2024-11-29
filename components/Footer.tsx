import Logo from '@/components/Logo';
import { siteConfig } from '@/config/site';
import React from 'react';

const sections = [
  {
    title: 'Product categories',
    links: [
      { name: 'All', href: '/products' },
      { name: 'Classic', href: '/products' },
      { name: 'Limited Edition', href: '/products' },
      { name: 'Seasonal', href: '/products' },
      { name: 'Special Dietary Options', href: '/products' },
      { name: 'Vegan', href: '/products' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '/about-us' },
      { name: 'Contact', href: '/contact-us' },
      { name: 'Privacy', href: '#' },
    ],
  },
  {
    title: 'Social',
    links: [
      { name: 'Twitter', href: '#' },
      { name: 'Instagram', href: '#' },
      { name: 'LinkedIn', href: '#' },
    ],
  },
];

const Footer = () => {
  return (
    <section className="justify-items-center py-10">
      <div className="container">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-3 mb-8 lg:mb-0">
              <div className="flex gap-2 mb-2">
                <Logo /> <span className="font-bold flex-grow text-2xl text-nowrap">{siteConfig.name}</span>
              </div>
              <p className="font-bold text-sm">Indulge in a Scoop of Happiness - Your Ice Cream Land Awaits!</p>
            </div>
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="font-medium hover:text-primary">
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <p>© 2024 Ice Cream Land. All rights reserved.</p>
            <ul className="flex gap-4">
              <li className="underline hover:text-primary">
                <a href="#"> Terms and Conditions</a>
              </li>
              <li className="underline hover:text-primary">
                <a href="#"> Privacy Policy</a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Footer;
