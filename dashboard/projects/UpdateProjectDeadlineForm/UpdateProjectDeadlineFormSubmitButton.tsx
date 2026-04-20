import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";
import { useUpdateProjectDeadline } from "../UpdateProjectDeadlineContext";

export function UpdateProjectDeadlineFormSubmitButton() {
  const t = useTranslations("dashboard.projects.UpdateProjectDeadlineForm");

  const { isPending } = useUpdateProjectDeadline();

  return (
    <FormBaseSubmitButton
      form="update-project-deadline-form"
      isPending={isPending}
      label={t("submitButtonLabel")}
    />
  );
}
