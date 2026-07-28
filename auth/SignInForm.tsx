"use client";

import { useActionState } from "react";
import { EmailField } from "./EmailField";
import { useTranslations } from "next-intl";
import { PasswordField } from "./PasswordField";
import { ActionState } from "@/lib/actions/types";
import { signIn } from "@/lib/actions/auth/signIn";
import { AuthForgotPassword } from "./AuthForgotPassword";
import { RememberMeCheckbox } from "./RememberMeCheckbox";
import { AuthForm, AuthFormSubmitButton } from "./AuthForm";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";

const initialState: ActionState = {
  status: null,
};

export function SignInForm() {
  const t = useTranslations("auth.SignInForm");

  const [state, formAction, isPending] = useActionState(signIn, initialState);

  return (
    <AuthForm action={formAction}>
      <EmailField />
      <PasswordField />

      <div className="flex items-center justify-between">
        <RememberMeCheckbox />
        <AuthForgotPassword />
      </div>

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
