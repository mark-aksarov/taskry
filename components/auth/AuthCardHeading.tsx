export function AuthCardHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl font-extrabold text-black dark:text-white">
      {children}
    </h2>
  );
}
