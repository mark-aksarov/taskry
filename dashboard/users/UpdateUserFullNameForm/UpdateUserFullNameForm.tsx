"use client";

import { startTransition } from "react";
import { FormBase } from "@/dashboard/common/FormBase";
import { UserFullNameTextField } from "../UserFullNameTextField";
import { useUpdateUserFullName } from "../UpdateUserFullNameContext";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";

export interface UpdateUserFullNameFormProps {
  userId: string;
  fullName?: string;
}

export function UpdateUserFullNameForm({
  userId,
  fullName,
}: UpdateUserFullNameFormProps) {
  const { state, action, isPending } = useUpdateUserFullName();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-user-full-name-form" onSubmit={handleSubmit}>
      {userId && <input type="hidden" name="id" value={userId} />}
      <UserFullNameTextField defaultValue={fullName} />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
