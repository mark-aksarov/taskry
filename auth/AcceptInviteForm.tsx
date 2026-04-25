"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { PasswordField } from "./PasswordField";
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

  return (
    <AuthForm action={formAction}>
      <input type="hidden" name="email" value={email} />
      <PasswordField minLength={8} maxLength={128} />

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
