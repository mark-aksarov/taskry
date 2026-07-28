"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { PasswordField } from "./PasswordField";
import { ActionState } from "@/lib/actions/types";
import { useSearchParams } from "next/navigation";
import { AuthForm, AuthFormSubmitButton } from "./AuthForm";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { resetPassword } from "@/lib/actions/auth/resetPassword";

const initialState: ActionState = {
  status: null,
};

export function ResetPasswordForm() {
  const t = useTranslations("auth.ResetPasswordForm");

  const searchParams = useSearchParams();
  const token = searchParams.get("token")!;

  const resetPasswordWithToken = resetPassword.bind(null, token);

  const [state, formAction, isPending] = useActionState(
    resetPasswordWithToken,
    initialState,
  );

  return (
    <AuthForm action={formAction}>
      <PasswordField minLength={8} maxLength={128} />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>

      <AuthFormSubmitButton
        variant="accent"
        isPending={isPending}
        label={t("submitButtonLabel")}
      />
    </AuthForm>
  );
}
