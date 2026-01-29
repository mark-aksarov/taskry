import {
  CheckboxGroup,
  CheckboxGroupProps,
} from "@/components/ui/CheckboxGroup";
import { useTranslations } from "next-intl";

interface SubtasksCheckboxGroupProps extends Omit<CheckboxGroupProps, "label"> {
  children: React.ReactNode;
}

export function SubtasksCheckboxGroup({
  children,
  ...props
}: SubtasksCheckboxGroupProps) {
  const t = useTranslations("subtasks.SubtasksCheckboxGroup");

  return (
    <CheckboxGroup label={t("label")} {...props}>
      {children}
    </CheckboxGroup>
  );
}
