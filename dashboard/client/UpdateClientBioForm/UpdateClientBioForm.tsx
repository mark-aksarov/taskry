"use client";

import { startTransition } from "react";
import { FormBase } from "@/dashboard/common/FormBase";
import { ClientBioTextField } from "../ClientBioTextField";
import { useUpdateClientBio } from "../UpdateClientBioContext";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";

export interface UpdateClientBioFormProps {
  clientId: number;
  bio?: string;
}

export function UpdateClientBioForm({
  clientId,
  bio,
}: UpdateClientBioFormProps) {
  const { state, action, isPending } = useUpdateClientBio();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-client-bio-form" onSubmit={handleSubmit}>
      {clientId && <input type="hidden" name="id" value={clientId} />}
      <ClientBioTextField defaultValue={bio} />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
