export function AppFooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-4 text-base font-bold text-(--text-primary)">
      {children}
    </h4>
  );
}
