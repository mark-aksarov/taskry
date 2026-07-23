"use client";

import { startTransition } from "react";
import { FormBase } from "@/dashboard/common/FormBase";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { ClientPublicLinkTextField } from "../ClientPublicLinkTextField";
import { useUpdateClientPublicLink } from "../UpdateClientPublicLinkContext";

export interface UpdateClientPublicLinkFormProps {
  clientId: number;
  publicLink?: string;
}

export function UpdateClientPublicLinkForm({
  clientId,
  publicLink,
}: UpdateClientPublicLinkFormProps) {
  const { state, action, isPending } = useUpdateClientPublicLink();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-client-public-link-form" onSubmit={handleSubmit}>
      {clientId && <input type="hidden" name="id" value={clientId} />}
      <ClientPublicLinkTextField defaultValue={publicLink} />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
