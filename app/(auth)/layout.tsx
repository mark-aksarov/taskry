export default function AppAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mx-auto flex h-[100dvh] items-center justify-center">
      {children}
    </main>
  );
}
