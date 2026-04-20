"use client";

import { startTransition } from "react";
import { FormBase } from "@/dashboard/common/FormBase";
import { UserAddressTextField } from "../UserAddressTextField";
import { useUpdateUserAddress } from "../UpdateUserAddressContext";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";

export interface UpdateUserAddressFormProps {
  userId: string;
  address?: string;
}

export function UpdateUserAddressForm({
  userId,
  address,
}: UpdateUserAddressFormProps) {
  const { state, action, isPending } = useUpdateUserAddress();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-user-address-form" onSubmit={handleSubmit}>
      {userId && <input type="hidden" name="id" value={userId} />}
      <UserAddressTextField defaultValue={address} />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
