"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { FormBase } from "@/components/common/FormBase";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ErrorBanner } from "@/components/common/ErrorBanner";
import { UserPasswordTextField } from "../UserPasswordTextField";

const initialState: ActionState = {
  status: null,
};

interface ChangePasswordFormProps {
  userId: string;
  changePassword: ActionFn<ActionState, FormData>;
}

export function ChangePasswordForm({
  userId,
  changePassword,
}: ChangePasswordFormProps) {
  const t = useTranslations("users.ChangePasswordForm");

  const [state, action, pending] = useActionState(changePassword, initialState);

  let serverError = null;

  if (state.status === "error") {
    if (state.errorCode === "authServiceError" && state.message) {
      if (state.message.includes("not allowed")) {
        serverError = t("error.accessDenied");
      } else if (state.message.includes("too short")) {
        serverError = t("error.passwordTooShort");
      } else if (state.message.includes("too long")) {
        serverError = t("error.passwordTooLong");
      }
    } else {
      serverError = t("error.internalServerError");
    }
  }

  return (
    <FormBase id="change-password-form" state={state} action={action}>
      {userId && <input type="hidden" name="id" value={userId} />}
      <UserPasswordTextField />

      {state.status === "error" && <ErrorBanner>{serverError}</ErrorBanner>}
    </FormBase>
  );
}
