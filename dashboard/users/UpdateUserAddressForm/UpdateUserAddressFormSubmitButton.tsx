"use client";

import { useTranslations } from "next-intl";
import { useUpdateUserAddress } from "../UpdateUserAddressContext";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";

export function UpdateUserAddressFormSubmitButton() {
  const t = useTranslations("dashboard.users.UpdateUserAddressForm");

  const { isPending } = useUpdateUserAddress();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-user-address-form"
      label={t("submitButtonLabel")}
    />
  );
}
