"use client";

import { useTranslations } from "next-intl";
import { CreateCustomerMenuTrigger } from "./CreateCustomerMenuTrigger";
import { CreateNewButtonMobile } from "@/dashboard/common/CreateNewButton";
import { useCreateCustomerButtonDisabled } from "./useCreateCustomerButtonDisabled";

export function CreateCustomerMenuTriggerMobile() {
  const t = useTranslations("dashboard.customers.CreateCustomerMenuTrigger");

  const isDisabled = useCreateCustomerButtonDisabled();

  return (
    <CreateCustomerMenuTrigger
      renderButton={() => (
        <CreateNewButtonMobile
          data-test="create-customer-menu-trigger-mobile"
          aria-label={t("label")}
          isDisabled={isDisabled}
        />
      )}
    />
  );
}
