"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { AuthCardForm, AuthCardSubmitButton } from "../AuthCard";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { ResetPasswordFormPasswordField } from "./ResetPasswordFormPasswordField";

const initialState: ActionState = {
  status: null,
};

interface ResetPasswordFormProps {
  action: ActionFn<ActionState, FormData>;
}

export function ResetPasswordForm({ action }: ResetPasswordFormProps) {
  const t = useTranslations("auth.ResetPasswordForm");

  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <AuthCardForm action={formAction}>
      <ResetPasswordFormPasswordField />

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
