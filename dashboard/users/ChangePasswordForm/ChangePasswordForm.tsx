"use client";

import { startTransition } from "react";
import { FormBase } from "@/dashboard/common/FormBase";
import { useChangePassword } from "../ChangePasswordContext";
import { UserPasswordTextField } from "../UserPasswordTextField";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";

interface ChangePasswordFormProps {
  userId: string;
}

export function ChangePasswordForm({ userId }: ChangePasswordFormProps) {
  const { state, isPending, action } = useChangePassword();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="change-password-form" onSubmit={handleSubmit}>
      {userId && <input type="hidden" name="id" value={userId} />}
      <UserPasswordTextField />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
