export default function AppAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-[100dvh] justify-center max-md:items-start md:items-center">
      {children}
    </main>
  );
}
