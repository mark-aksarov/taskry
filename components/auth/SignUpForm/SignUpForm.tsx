"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { SignUpFormNameField } from "./SignUpFormNameField";
import { SignUpFormEmailField } from "./SignUpFormEmailField";
import { AuthCardForm, AuthCardSubmitButton } from "../AuthCard";
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
    <AuthCardForm action={formAction}>
      <SignUpFormNameField />
      <SignUpFormEmailField />
      <SignUpFormPasswordField />
      <SignUpFormRememberMeCheckbox />

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
