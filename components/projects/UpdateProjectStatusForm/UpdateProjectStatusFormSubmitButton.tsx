import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/components/common/FormBase";
import { useUpdateProjectStatusAlt } from "../UpdateProjectStatusAltContext";

export function UpdateProjectStatusFormSubmitButton() {
  const t = useTranslations("projects.UpdateProjectStatusForm");

  const { isPending } = useUpdateProjectStatusAlt();

  return (
    <FormBaseSubmitButton
      form="update-project-status-form"
      isPending={isPending}
      label={t("submitButtonLabel")}
    />
  );
}
