"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { AuthForm, AuthFormSubmitButton } from "../AuthForm";
import { SignInFormEmailField } from "./SignInFormEmailField";
import { SignInFormPasswordField } from "./SignInFormPasswordField";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { SignInFormRememberMeCheckbox } from "./SignInFormRememberMeCheckbox";

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
      <SignInFormEmailField />
      <SignInFormPasswordField />
      <SignInFormRememberMeCheckbox />

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
