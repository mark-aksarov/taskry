export default function AppAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex justify-center max-md:items-start md:min-h-[100dvh] md:items-center">
      {children}
    </main>
  );
}
