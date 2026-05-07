export function AuthCardHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-center text-2xl font-extrabold text-(--text-primary)">
      {children}
    </h2>
  );
}
