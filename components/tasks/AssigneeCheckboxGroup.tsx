import {
  UserCheckboxGroup,
  UserCheckboxGroupProps,
} from "@/components/users/UserCheckboxGroup";
import { useTranslations } from "next-intl";

export function AssigneeCheckboxGroup({
  ...props
}: Omit<UserCheckboxGroupProps, "name" | "label">) {
  const t = useTranslations("tasks.AssigneeCheckboxGroup");

  return <UserCheckboxGroup {...props} name="assigneeIds" label={t("label")} />;
}
