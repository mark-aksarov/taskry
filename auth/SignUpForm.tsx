"use client";

import { useActionState } from "react";
import { NameField } from "./NameField";
import { EmailField } from "./EmailField";
import { useTranslations } from "next-intl";
import { PasswordField } from "./PasswordField";
import { RememberMeCheckbox } from "./RememberMeCheckbox";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { AuthForm, AuthFormSubmitButton } from "./AuthForm";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";

const initialState: ActionState = {
  status: null,
};

interface SignUpFormProps {
  action: ActionFn<ActionState, FormData>;
}

export function SignUpForm({ action }: SignUpFormProps) {
  const t = useTranslations("auth.SignUpForm");

  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <AuthForm action={formAction}>
      <NameField />
      <EmailField />
      <PasswordField minLength={8} maxLength={128} />
      <RememberMeCheckbox />

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
