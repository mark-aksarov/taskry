"use client";

import { startTransition } from "react";
import { FormBase } from "@/dashboard/common/FormBase";
import { CompanySelect } from "../../company/CompanySelect";
import { useCreateClient } from "../CreateClientContext";
import { ClientBioTextField } from "../ClientBioTextField";
import { ClientEmailTextField } from "../ClientEmailTextField";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { ClientFullNameTextField } from "../ClientFullNameTextField";
import { ClientPublicLinkTextField } from "../ClientPublicLinkTextField";
import { ClientPhoneNumberTextField } from "../ClientPhoneNumberTextField";

interface CreateClientFormProps {
  companySelectItems: { id: number; name: string }[];
}

export function CreateClientForm({
  companySelectItems,
}: CreateClientFormProps) {
  const { state, action, isPending } = useCreateClient();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="create-client-form" onSubmit={handleSubmit}>
      <ClientFullNameTextField />
      <ClientBioTextField />
      <ClientEmailTextField />
      <ClientPhoneNumberTextField />
      <ClientPublicLinkTextField />
      <CompanySelect items={companySelectItems} />
      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
