export function UpdateSubtasksFormFieldset({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <fieldset className="flex flex-col gap-3 border border-gray-300 p-3 dark:border-gray-600">
      {children}
    </fieldset>
  );
}
