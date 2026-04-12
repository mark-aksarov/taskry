"use client";

import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/components/common/FormBase";
import { useUpdateUserPhoneNumber } from "../UpdateUserPhoneNumberContext";

export function UpdateUserPhoneNumberFormSubmitButton() {
  const t = useTranslations("users.UpdateUserPhoneNumberForm");

  const { isPending } = useUpdateUserPhoneNumber();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-user-phone-number-form"
      label={t("submitButtonLabel")}
    />
  );
}
