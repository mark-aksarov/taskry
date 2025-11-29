export function AuthCardFooterText({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="text-sm font-normal text-black dark:text-white">
      {children}
    </span>
  );
}
