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
import { CustomerFullNameTextField } from "./CustomerFullNameTextField";
import { useUpdateCustomerFullName } from "./UpdateCustomerFullNameContext";

export interface UpdateCustomerFullNameFormProps {
  customerId: number;
  fullName?: string;
}

export function UpdateCustomerFullNameForm({
  customerId,
  fullName,
}: UpdateCustomerFullNameFormProps) {
  const t = useTranslations("customers.UpdateCustomerForm");

  const { state, action, isPending } = useUpdateCustomerFullName();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-customer-full-name-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        {customerId && <input type="hidden" name="id" value={customerId} />}
        <CustomerFullNameTextField defaultValue={fullName} />

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
