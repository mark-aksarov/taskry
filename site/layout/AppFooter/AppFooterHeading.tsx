export function AppFooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-4 text-base font-bold text-black dark:text-white">
      {children}
    </h4>
  );
}
