export function PageGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col max-md:gap-4 md:gap-6">
      {children}
    </div>
  );
}
