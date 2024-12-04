import { Navbar } from '@/app/(main)/_components/navbar';
import Footer from '@/app/_components/Footer';
import Providers from '@/providers/Providers';
import Hydration from '@/providers/Hydration';
import { SkipLink } from '@/components/ui/skip-link';

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Providers>
        <Hydration>
          <SkipLink />
          <Navbar />
          <div id="main-content" className="flex-1">
            {children}
          </div>
          <Footer />
        </Hydration>
      </Providers>
    </div>
  );
}
