import { ClerkProvider } from '@clerk/nextjs';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <ClerkProvider>{children}</ClerkProvider>
    </div>
  );
}
