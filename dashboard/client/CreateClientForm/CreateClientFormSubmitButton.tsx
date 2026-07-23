import { useTranslations } from "next-intl";
import { useCreateClient } from "../CreateClientContext";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";

export function CreateClientFormSubmitButton() {
  const t = useTranslations("dashboard.clients.CreateClientForm");

  const { isPending } = useCreateClient();

  return (
    <FormBaseSubmitButton
      form="create-client-form"
      isPending={isPending}
      label={t("submitButtonLabel")}
    />
  );
}
