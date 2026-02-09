"use client";

import { useActionState } from "react";
import { AuthCardForm } from "../AuthCard";
import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { ForgetPasswordFormEmailField } from "./ForgetPasswordFormEmailField";
import { ForgetPasswordFormSubmitButton } from "./ForgetPasswordFormSubmitButton";

const initialState: ActionState = {
  status: null,
  message: undefined,
};

interface ForgetPasswordFormProps {
  action: ActionFn<ActionState, FormData>;
}

export function ForgetPasswordForm({ action }: ForgetPasswordFormProps) {
  const t = useTranslations("auth.ForgetPasswordForm");

  const [state, formAction, isPending] = useActionState(action, initialState);

  let serverError = null;

  if (state.status === "error") {
    if (state.errorCode === "validationError") {
      serverError = t("validation.validationError");
    } else if (
      state.errorCode === "authServiceError" &&
      state.message &&
      state.message.includes("reset")
    ) {
      serverError = t("validation.resetNotEnabled");
    } else {
      serverError = t("validation.internalServerError");
    }
  }

  return (
    <AuthCardForm action={formAction}>
      <ForgetPasswordFormEmailField />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {serverError}
      </FormErrorBanner>

      <ForgetPasswordFormSubmitButton />
    </AuthCardForm>
  );
}
