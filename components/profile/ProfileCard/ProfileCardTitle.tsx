export function ProfileCardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-extrabold text-black dark:text-white">
      {children}
    </h2>
  );
}
