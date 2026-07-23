"use client";

import { startTransition } from "react";
import { FormBase } from "@/dashboard/common/FormBase";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { ClientFullNameTextField } from "../ClientFullNameTextField";
import { useUpdateClientFullName } from "../UpdateClientFullNameContext";

export interface UpdateClientFullNameFormProps {
  clientId: number;
  fullName?: string;
}

export function UpdateClientFullNameForm({
  clientId,
  fullName,
}: UpdateClientFullNameFormProps) {
  const { state, action, isPending } = useUpdateClientFullName();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-client-full-name-form" onSubmit={handleSubmit}>
      {clientId && <input type="hidden" name="id" value={clientId} />}
      <ClientFullNameTextField defaultValue={fullName} />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
