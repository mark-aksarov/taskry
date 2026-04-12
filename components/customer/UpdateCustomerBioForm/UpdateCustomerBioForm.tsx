"use client";

import { startTransition } from "react";
import { FormBase } from "@/components/common/FormBase";
import { CustomerBioTextField } from "../CustomerBioTextField";
import { useUpdateCustomerBio } from "../UpdateCustomerBioContext";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

export interface UpdateCustomerBioFormProps {
  customerId: number;
  bio?: string;
}

export function UpdateCustomerBioForm({
  customerId,
  bio,
}: UpdateCustomerBioFormProps) {
  const { state, action, isPending } = useUpdateCustomerBio();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-customer-bio-form" onSubmit={handleSubmit}>
      {customerId && <input type="hidden" name="id" value={customerId} />}
      <CustomerBioTextField defaultValue={bio} />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
