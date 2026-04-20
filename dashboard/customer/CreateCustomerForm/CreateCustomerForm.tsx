"use client";

import { startTransition } from "react";
import { FormBase } from "@/dashboard/common/FormBase";
import { CompanySelect } from "../../company/CompanySelect";
import { useCreateCustomer } from "../CreateCustomerContext";
import { CustomerBioTextField } from "../CustomerBioTextField";
import { CustomerEmailTextField } from "../CustomerEmailTextField";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { CustomerFullNameTextField } from "../CustomerFullNameTextField";
import { CustomerPublicLinkTextField } from "../CustomerPublicLinkTextField";
import { CustomerPhoneNumberTextField } from "../CustomerPhoneNumberTextField";

interface CreateCustomerFormProps {
  companySelectItems: { id: number; name: string }[];
}

export function CreateCustomerForm({
  companySelectItems,
}: CreateCustomerFormProps) {
  const { state, action, isPending } = useCreateCustomer();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="create-customer-form" onSubmit={handleSubmit}>
      <CustomerFullNameTextField />
      <CustomerBioTextField />
      <CustomerEmailTextField />
      <CustomerPhoneNumberTextField />
      <CustomerPublicLinkTextField />
      <CompanySelect items={companySelectItems} />
      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
