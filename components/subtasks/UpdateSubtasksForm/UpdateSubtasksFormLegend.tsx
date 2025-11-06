import { fieldLabelStyles } from "@/components/ui";

export function UpdateSubtasksFormLegend({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <legend className={fieldLabelStyles({ className: "-ml-1 px-1" })}>
      {children}
    </legend>
  );
}
