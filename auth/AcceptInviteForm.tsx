"use client";

import { useTranslations } from "next-intl";
import { PasswordField } from "./PasswordField";
import { TermsCheckbox } from "./TermsCheckbox";
import { useActionState, useState } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { AuthForm, AuthFormSubmitButton } from "./AuthForm";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";

const initialState: ActionState = {
  status: null,
};

interface AcceptInviteFormProps {
  email: string;
  acceptInvite: ActionFn<ActionState, FormData>;
}

export function AcceptInviteForm({
  email,
  acceptInvite,
}: AcceptInviteFormProps) {
  const t = useTranslations("auth.AcceptInviteForm");

  const [state, formAction, isPending] = useActionState(
    acceptInvite,
    initialState,
  );

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <AuthForm action={formAction}>
      <input type="hidden" name="email" value={email} />

      <PasswordField minLength={8} maxLength={128} />

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
