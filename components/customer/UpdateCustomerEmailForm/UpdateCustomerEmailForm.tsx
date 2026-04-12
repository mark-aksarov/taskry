"use client";

import { startTransition } from "react";
import { FormBase } from "@/components/common/FormBase";
import { CustomerEmailTextField } from "../CustomerEmailTextField";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { useUpdateCustomerEmail } from "../UpdateCustomerEmailContext";

export interface UpdateCustomerEmailFormProps {
  customerId: number;
  email?: string;
}

export function UpdateCustomerEmailForm({
  customerId,
  email,
}: UpdateCustomerEmailFormProps) {
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
      {customerId && <input type="hidden" name="id" value={customerId} />}
      <CustomerEmailTextField defaultValue={email} />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
