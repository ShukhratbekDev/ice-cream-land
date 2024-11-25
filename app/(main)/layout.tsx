import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from '@/providers/Providers';
import ShoppingCartSidebar from '@/components/ShoppingCartSidebar';
import Hydration from '@/providers/Hydration';

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Providers>
        <Hydration>
          <Navbar />
          <ShoppingCartSidebar />
          {children}
          <Footer />
        </Hydration>
      </Providers>
    </div>
  );
}
