"use client";

import { startTransition } from "react";
import { FormBase } from "@/dashboard/common/FormBase";
import { CompanySelect } from "../../company/CompanySelect";
import { useUpdateClient } from "../UpdateClientContext";
import { ClientBioTextField } from "../ClientBioTextField";
import { ClientEmailTextField } from "../ClientEmailTextField";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { ClientFullNameTextField } from "../ClientFullNameTextField";
import { ClientPublicLinkTextField } from "../ClientPublicLinkTextField";
import { ClientPhoneNumberTextField } from "../ClientPhoneNumberTextField";

interface UpdateClientFormProps {
  clientId: number;
  fullName: string;
  bio?: string;
  email: string;
  phoneNumber?: string;
  publicLink?: string;
  companyId?: number;
  companySelectItems: { id: number; name: string }[];
}

export function UpdateClientForm({
  clientId,
  fullName,
  bio,
  email,
  phoneNumber,
  publicLink,
  companyId,
  companySelectItems,
}: UpdateClientFormProps) {
  const { state, isPending, action } = useUpdateClient();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-client-form" onSubmit={handleSubmit}>
      {clientId && <input type="hidden" name="id" value={clientId} />}

      <ClientFullNameTextField defaultValue={fullName} />
      <ClientBioTextField defaultValue={bio} />
      <ClientEmailTextField defaultValue={email} />
      <ClientPhoneNumberTextField defaultValue={phoneNumber} />
      <ClientPublicLinkTextField defaultValue={publicLink} />
      <CompanySelect
        defaultSelectedKey={companyId?.toString()}
        items={companySelectItems}
      />
      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
