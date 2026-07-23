"use client";

import { startTransition } from "react";
import { FormBase } from "@/dashboard/common/FormBase";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { ClientPhoneNumberTextField } from "../ClientPhoneNumberTextField";
import { useUpdateClientPhoneNumber } from "../UpdateClientPhoneNumberContext";

export interface UpdateClientPhoneNumberFormProps {
  clientId: number;
  phoneNumber?: string;
}

export function UpdateClientPhoneNumberForm({
  clientId,
  phoneNumber,
}: UpdateClientPhoneNumberFormProps) {
  const { state, action, isPending } = useUpdateClientPhoneNumber();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-client-phone-number-form" onSubmit={handleSubmit}>
      {clientId && <input type="hidden" name="id" value={clientId} />}
      <ClientPhoneNumberTextField defaultValue={phoneNumber} />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
