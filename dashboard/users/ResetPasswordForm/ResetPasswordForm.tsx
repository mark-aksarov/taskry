"use client";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { FormBase } from "@/dashboard/common/FormBase";
import { useResetPassword } from "../ResetPasswordContext";
import { UserPasswordTextField } from "../UserPasswordTextField";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";

interface ResetPasswordFormProps {
  userId: string;
}

export function ResetPasswordForm({ userId }: ResetPasswordFormProps) {
  const t = useTranslations("dashboard.users.ResetPasswordForm");

  const { state, isPending, action } = useResetPassword();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="reset-password-form" onSubmit={handleSubmit}>
      {userId && <input type="hidden" name="id" value={userId} />}
      <UserPasswordTextField
        name="newPassword"
        label={t("newPassword.label")}
        placeholder={t("newPassword.placeholder")}
      />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
