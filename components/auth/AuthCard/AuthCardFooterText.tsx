export function AuthCardFooterText({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-sm font-normal text-black dark:text-white">
      {children}
    </div>
  );
}
