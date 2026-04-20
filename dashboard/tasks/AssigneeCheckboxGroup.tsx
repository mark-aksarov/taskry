import {
  UserCheckboxGroup,
  UserCheckboxGroupProps,
} from "@/dashboard/users/UserCheckboxGroup";
import { useTranslations } from "next-intl";

export function AssigneeCheckboxGroup({
  ...props
}: Omit<UserCheckboxGroupProps, "name" | "label">) {
  const t = useTranslations("dashboard.tasks.AssigneeCheckboxGroup");

  return <UserCheckboxGroup {...props} name="assigneeIds" label={t("label")} />;
}
