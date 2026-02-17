"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { AuthCardForm, AuthCardSubmitButton } from "../AuthCard";
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
    <AuthCardForm action={formAction}>
      <ForgetPasswordFormEmailField />

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
