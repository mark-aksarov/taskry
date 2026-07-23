"use client";

import { startTransition } from "react";
import { FormBase } from "@/dashboard/common/FormBase";
import { ClientEmailTextField } from "../ClientEmailTextField";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { useUpdateClientEmail } from "../UpdateClientEmailContext";

export interface UpdateClientEmailFormProps {
  clientId: number;
  email?: string;
}

export function UpdateClientEmailForm({
  clientId,
  email,
}: UpdateClientEmailFormProps) {
  const { state, action, isPending } = useUpdateClientEmail();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-client-email-form" onSubmit={handleSubmit}>
      {clientId && <input type="hidden" name="id" value={clientId} />}
      <ClientEmailTextField defaultValue={email} />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
