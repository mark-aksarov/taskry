"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { AuthForm, AuthFormSubmitButton } from "../AuthForm";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { ResetPasswordFormPasswordField } from "./ResetPasswordFormPasswordField";

const initialState: ActionState = {
  status: null,
};

interface ResetPasswordFormProps {
  resetPassword: ActionFn<ActionState, FormData>;
}

export function ResetPasswordForm({ resetPassword }: ResetPasswordFormProps) {
  const t = useTranslations("auth.ResetPasswordForm");

  const [state, formAction, isPending] = useActionState(
    resetPassword,
    initialState,
  );

  return (
    <AuthForm action={formAction}>
      <ResetPasswordFormPasswordField />

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
