export function ConfirmModalError({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 text-sm text-red-600 dark:text-red-400">{children}</p>
  );
}
