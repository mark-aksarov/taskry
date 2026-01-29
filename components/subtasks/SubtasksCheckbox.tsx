import { Checkbox, CheckboxProps } from "../ui/Checkbox";

interface SubtasksCheckboxProps extends CheckboxProps {
  actionMenuTrigger: React.ReactNode;
}

export function SubtasksCheckbox({
  actionMenuTrigger,
  ...props
}: SubtasksCheckboxProps) {
  return (
    <div className="flex items-start gap-2">
      <Checkbox className="font-normal" {...props} />
      {actionMenuTrigger}
    </div>
  );
}
