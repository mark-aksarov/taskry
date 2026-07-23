"use client";

import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";
import { useUpdateClientPhoneNumber } from "../UpdateClientPhoneNumberContext";

export function UpdateClientPhoneNumberFormSubmitButton() {
  const t = useTranslations(
    "dashboard.clients.UpdateClientPhoneNumberForm",
  );

  const { isPending } = useUpdateClientPhoneNumber();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-client-phone-number-form"
      label={t("submitButtonLabel")}
    />
  );
}
