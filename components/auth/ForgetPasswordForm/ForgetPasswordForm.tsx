"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { AuthForm, AuthFormSubmitButton } from "../AuthForm";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { ForgetPasswordFormEmailField } from "./ForgetPasswordFormEmailField";

const initialState: ActionState = {
  status: null,
};

interface ForgetPasswordFormProps {
  action: ActionFn<ActionState, FormData>;
}

export function ForgetPasswordForm({ action }: ForgetPasswordFormProps) {
  const t = useTranslations("auth.ForgetPasswordForm");

  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <AuthForm action={formAction}>
      <ForgetPasswordFormEmailField />

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
