"use client";

import { startTransition } from "react";
import { FormBase } from "@/dashboard/common/FormBase";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { CustomerPublicLinkTextField } from "../CustomerPublicLinkTextField";
import { useUpdateCustomerPublicLink } from "../UpdateCustomerPublicLinkContext";

export interface UpdateCustomerPublicLinkFormProps {
  customerId: number;
  publicLink?: string;
}

export function UpdateCustomerPublicLinkForm({
  customerId,
  publicLink,
}: UpdateCustomerPublicLinkFormProps) {
  const { state, action, isPending } = useUpdateCustomerPublicLink();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-customer-public-link-form" onSubmit={handleSubmit}>
      {customerId && <input type="hidden" name="id" value={customerId} />}
      <CustomerPublicLinkTextField defaultValue={publicLink} />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
