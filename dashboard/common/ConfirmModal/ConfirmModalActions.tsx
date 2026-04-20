export function ConfirmModalActions({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 flex items-center justify-end gap-4">{children}</div>
  );
}
