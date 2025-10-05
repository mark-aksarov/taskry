export function PageSectionHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className="text-base font-bold text-black dark:text-white">
      {children}
    </h2>
  );
}
