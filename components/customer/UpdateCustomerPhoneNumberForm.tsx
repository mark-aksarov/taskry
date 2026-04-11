"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { CustomerPhoneNumberTextField } from "./CustomerPhoneNumberTextField";
import { useUpdateCustomerPhoneNumber } from "./UpdateCustomerPhoneNumberContext";

export interface UpdateCustomerPhoneNumberFormProps {
  customerId: number;
  phoneNumber?: string;
}

export function UpdateCustomerPhoneNumberForm({
  customerId,
  phoneNumber,
}: UpdateCustomerPhoneNumberFormProps) {
  const t = useTranslations("customers.UpdateCustomerPhoneNumberForm");

  const { state, action, isPending } = useUpdateCustomerPhoneNumber();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-customer-phone-number-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        {customerId && <input type="hidden" name="id" value={customerId} />}
        <CustomerPhoneNumberTextField defaultValue={phoneNumber} />

        <FormErrorBanner status={state.status} isPending={isPending}>
          {state.message}
        </FormErrorBanner>
      </FormBaseBody>

      <FormBaseFooter>
        <FormBaseSubmitButton
          isPending={isPending}
          label={t("submitButtonLabel")}
        />
      </FormBaseFooter>
    </FormBase>
  );
}
