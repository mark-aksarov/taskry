"use client";

import { startTransition } from "react";
import { FormBase } from "@/dashboard/common/FormBase";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { CustomerPhoneNumberTextField } from "../CustomerPhoneNumberTextField";
import { useUpdateCustomerPhoneNumber } from "../UpdateCustomerPhoneNumberContext";

export interface UpdateCustomerPhoneNumberFormProps {
  customerId: number;
  phoneNumber?: string;
}

export function UpdateCustomerPhoneNumberForm({
  customerId,
  phoneNumber,
}: UpdateCustomerPhoneNumberFormProps) {
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
      {customerId && <input type="hidden" name="id" value={customerId} />}
      <CustomerPhoneNumberTextField defaultValue={phoneNumber} />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
