"use client";

import { useActionState } from "react";
import { EmailField } from "./EmailField";
import { useTranslations } from "next-intl";
import { PasswordField } from "./PasswordField";
import { AuthForgotPassword } from "./AuthForgotPassword";
import { RememberMeCheckbox } from "./RememberMeCheckbox";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { AuthForm, AuthFormSubmitButton } from "./AuthForm";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

const initialState: ActionState = {
  status: null,
};

interface SignInFormProps {
  signIn: ActionFn<ActionState, FormData>;
}

export function SignInForm({ signIn }: SignInFormProps) {
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
        isPending={isPending}
        label={t("submitButtonLabel")}
      />
    </AuthForm>
  );
}
