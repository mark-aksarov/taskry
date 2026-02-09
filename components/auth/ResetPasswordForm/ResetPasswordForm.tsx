"use client";

import { useActionState } from "react";
import { AuthCardForm } from "../AuthCard";
import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { ResetPasswordFormSubmitButton } from "./ResetPasswordFormSubmitButton";
import { ResetPasswordFormPasswordField } from "./ResetPasswordFormPasswordField";

const initialState: ActionState = {
  status: null,
  message: undefined,
};

interface ResetPasswordFormProps {
  action: ActionFn<ActionState, FormData>;
}

export function ResetPasswordForm({ action }: ResetPasswordFormProps) {
  const t = useTranslations("auth.ResetPasswordForm");

  const [state, formAction, isPending] = useActionState(action, initialState);

  let serverError = null;

  if (state.status === "error") {
    if (state.errorCode === "validationError") {
      serverError = t("validation.validationError");
    } else if (state.errorCode === "authServiceError" && state.message) {
      if (state.message.includes("reset")) {
        serverError = t("validation.invalidToken");
      } else if (state.message.includes("too short")) {
        serverError = t("validation.passwordTooShort");
      } else if (state.message.includes("too long")) {
        serverError = t("validation.passwordTooLong");
      }
    } else {
      serverError = t("validation.internalServerError");
    }
  }

  return (
    <AuthCardForm action={formAction}>
      <ResetPasswordFormPasswordField />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {serverError}
      </FormErrorBanner>

      <ResetPasswordFormSubmitButton />
    </AuthCardForm>
  );
}
