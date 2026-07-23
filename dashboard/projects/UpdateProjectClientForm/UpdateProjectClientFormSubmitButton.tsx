import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";
import { useUpdateProjectClient } from "../UpdateProjectClientContext";

export function UpdateProjectClientFormSubmitButton() {
  const t = useTranslations("dashboard.projects.UpdateProjectClientForm");

  const { isPending } = useUpdateProjectClient();

  return (
    <FormBaseSubmitButton
      form="update-project-client-form"
      isPending={isPending}
      label={t("submitButtonLabel")}
    />
  );
}
