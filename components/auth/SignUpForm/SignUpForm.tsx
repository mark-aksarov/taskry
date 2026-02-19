"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { SignUpFormNameField } from "./SignUpFormNameField";
import { AuthForm, AuthFormSubmitButton } from "../AuthForm";
import { SignUpFormEmailField } from "./SignUpFormEmailField";
import { SignUpFormPasswordField } from "./SignUpFormPasswordField";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { SignUpFormRememberMeCheckbox } from "./SignUpFormRememberMeCheckbox";

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
      <SignUpFormNameField />
      <SignUpFormEmailField />
      <SignUpFormPasswordField />
      <SignUpFormRememberMeCheckbox />

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
