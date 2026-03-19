import {
  UserCheckboxGroup,
  UserCheckboxGroupProps,
} from "@/components/users/UserCheckboxGroup";
import { useTranslations } from "next-intl";

export function ProjectCreatorCheckboxGroup({
  ...props
}: Omit<UserCheckboxGroupProps, "name" | "label">) {
  const t = useTranslations("projects.ProjectCreatorCheckboxGroup");

  return <UserCheckboxGroup {...props} name="creatorIds" label={t("label")} />;
}
