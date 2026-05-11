export function AppFooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 text-base font-bold text-(--text-primary)">
      {children}
    </div>
  );
}
