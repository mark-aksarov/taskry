export function DetailCardHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg font-extrabold text-black dark:text-white">
      {children}
    </h3>
  );
}
