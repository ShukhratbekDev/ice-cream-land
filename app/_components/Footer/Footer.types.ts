import { ComponentType } from 'react';

export type SocialLink = {
  name: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  username: string;
};

export type MainLink = {
  name: string;
  href: string;
};

export type Navigation = {
  main: MainLink[];
  social: SocialLink[];
};
