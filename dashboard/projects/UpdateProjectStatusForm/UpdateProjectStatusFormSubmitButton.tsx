import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";
import { useUpdateProjectStatusAlt } from "../UpdateProjectStatusAltContext";

export function UpdateProjectStatusFormSubmitButton() {
  const t = useTranslations("dashboard.projects.UpdateProjectStatusForm");

  const { isPending } = useUpdateProjectStatusAlt();

  return (
    <FormBaseSubmitButton
      form="update-project-status-form"
      isPending={isPending}
      label={t("submitButtonLabel")}
    />
  );
}
