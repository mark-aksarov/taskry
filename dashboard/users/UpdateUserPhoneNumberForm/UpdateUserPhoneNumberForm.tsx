"use client";

import { startTransition } from "react";
import { FormBase } from "@/dashboard/common/FormBase";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { UserPhoneNumberTextField } from "../UserPhoneNumberTextField";
import { useUpdateUserPhoneNumber } from "../UpdateUserPhoneNumberContext";

export interface UpdateUserPhoneNumberFormProps {
  userId: string;
  phoneNumber?: string;
}

export function UpdateUserPhoneNumberForm({
  userId,
  phoneNumber,
}: UpdateUserPhoneNumberFormProps) {
  const { state, action, isPending } = useUpdateUserPhoneNumber();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-user-phone-number-form" onSubmit={handleSubmit}>
      {userId && <input type="hidden" name="id" value={userId} />}
      <UserPhoneNumberTextField defaultValue={phoneNumber} />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
