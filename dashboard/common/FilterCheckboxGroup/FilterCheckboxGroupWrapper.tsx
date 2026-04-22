export function FilterCheckboxGroupWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col items-start gap-3">{children}</div>;
}
