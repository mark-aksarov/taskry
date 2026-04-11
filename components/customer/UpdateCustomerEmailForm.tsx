"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { CustomerEmailTextField } from "./CustomerEmailTextField";
import { useUpdateCustomerEmail } from "./UpdateCustomerEmailContext";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

export interface UpdateCustomerEmailFormProps {
  customerId: number;
  email?: string;
}

export function UpdateCustomerEmailForm({
  customerId,
  email,
}: UpdateCustomerEmailFormProps) {
  const t = useTranslations("customers.UpdateCustomerEmailForm");

  const { state, action, isPending } = useUpdateCustomerEmail();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-customer-email-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        {customerId && <input type="hidden" name="id" value={customerId} />}
        <CustomerEmailTextField defaultValue={email} />

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
