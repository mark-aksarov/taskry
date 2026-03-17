"use client";

import { useTranslations } from "next-intl";
import { CreateCustomerMenuTrigger } from "./CreateCustomerMenuTrigger";
import { CreateNewButtonLarge } from "@/components/common/CreateNewButton";
import { useCreateCustomerButtonDisabled } from "./useCreateCustomerButtonDisabled";

export function CreateCustomerMenuTriggerLarge() {
  const t = useTranslations("customers.CreateCustomerMenuTrigger");

  const isDisabled = useCreateCustomerButtonDisabled();

  return (
    <CreateCustomerMenuTrigger
      renderButton={() => (
        <CreateNewButtonLarge
          data-test="create-customer-menu-trigger-large"
          label={t("label")}
          isDisabled={isDisabled}
        />
      )}
    />
  );
}
