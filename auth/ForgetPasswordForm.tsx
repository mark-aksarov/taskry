"use client";

import { useActionState } from "react";
import { EmailField } from "./EmailField";
import { useTranslations } from "next-intl";
import { ActionState } from "@/lib/actions/types";
import { AuthForm, AuthFormSubmitButton } from "./AuthForm";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { forgetPassword } from "@/lib/actions/auth/forgetPassword";

const initialState: ActionState = {
  status: null,
};

export function ForgetPasswordForm() {
  const t = useTranslations("auth.ForgetPasswordForm");

  const [state, formAction, isPending] = useActionState(
    forgetPassword,
    initialState,
  );

  return (
    <AuthForm action={formAction}>
      <EmailField />

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
