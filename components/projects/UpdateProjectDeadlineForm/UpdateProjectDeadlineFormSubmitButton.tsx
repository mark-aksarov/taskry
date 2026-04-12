import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/components/common/FormBase";
import { useUpdateProjectDeadline } from "../UpdateProjectDeadlineContext";

export function UpdateProjectDeadlineFormSubmitButton() {
  const t = useTranslations("projects.UpdateProjectDeadlineForm");

  const { isPending } = useUpdateProjectDeadline();

  return (
    <FormBaseSubmitButton
      form="update-project-deadline-form"
      isPending={isPending}
      label={t("submitButtonLabel")}
    />
  );
}
