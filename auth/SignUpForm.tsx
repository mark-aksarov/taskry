"use client";

import { NameField } from "./NameField";
import { EmailField } from "./EmailField";
import { useTranslations } from "next-intl";
import { TermsCheckbox } from "./TermsCheckbox";
import { PasswordField } from "./PasswordField";
import { useActionState, useState } from "react";
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
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <AuthForm action={formAction}>
      <NameField />
      <EmailField />
      <PasswordField minLength={8} maxLength={128} />
      <RememberMeCheckbox />

      <TermsCheckbox
        isSelected={acceptedTerms}
        onChange={setAcceptedTerms}
        isDisabled={isPending}
      />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>

      <AuthFormSubmitButton
        variant="accent"
        isPending={isPending}
        isDisabled={!acceptedTerms}
        label={t("submitButtonLabel")}
      />
    </AuthForm>
  );
}
