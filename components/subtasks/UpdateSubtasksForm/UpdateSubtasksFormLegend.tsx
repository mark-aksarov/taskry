import { fieldLabelStyles } from "@/components/ui";

export function UpdateSubtasksFormLegend({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <legend className={fieldLabelStyles({ className: "px-1" })}>
      {children}
    </legend>
  );
}
