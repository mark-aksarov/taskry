"use client";

import { useTranslations } from "next-intl";
import { useUpdateUserAddress } from "../UpdateUserAddressContext";
import { FormBaseSubmitButton } from "@/components/common/FormBase";

export function UpdateUserAddressFormSubmitButton() {
  const t = useTranslations("users.UpdateUserAddressForm");

  const { isPending } = useUpdateUserAddress();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-user-address-form"
      label={t("submitButtonLabel")}
    />
  );
}
