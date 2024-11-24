export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="relative flex min-h-screen flex-col bg-background">{children}</div>;
}
