"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { SignInFormEmailField } from "./SignInFormEmailField";
import { AuthCardForm, AuthCardSubmitButton } from "../AuthCard";
import { SignInFormPasswordField } from "./SignInFormPasswordField";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { SignInFormRememberMeCheckbox } from "./SignInFormRememberMeCheckbox";

const initialState: ActionState = {
  status: null,
};

interface SignInFormProps {
  action: ActionFn<ActionState, FormData>;
}

export function SignInForm({ action }: SignInFormProps) {
  const t = useTranslations("auth.SignInForm");

  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <AuthCardForm action={formAction}>
      <SignInFormEmailField />
      <SignInFormPasswordField />
      <SignInFormRememberMeCheckbox />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>

      <AuthCardSubmitButton
        isPending={isPending}
        label={t("submitButtonLabel")}
      />
    </AuthCardForm>
  );
}
