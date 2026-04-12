"use client";

import { startTransition } from "react";
import { FormBase } from "@/components/common/FormBase";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { CustomerFullNameTextField } from "../CustomerFullNameTextField";
import { useUpdateCustomerFullName } from "../UpdateCustomerFullNameContext";

export interface UpdateCustomerFullNameFormProps {
  customerId: number;
  fullName?: string;
}

export function UpdateCustomerFullNameForm({
  customerId,
  fullName,
}: UpdateCustomerFullNameFormProps) {
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
      {customerId && <input type="hidden" name="id" value={customerId} />}
      <CustomerFullNameTextField defaultValue={fullName} />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
