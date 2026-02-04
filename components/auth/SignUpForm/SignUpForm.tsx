"use client";

import { useActionState } from "react";
import { AuthCardForm } from "../AuthCard";
import { useTranslations } from "next-intl";
import { ErrorBanner } from "@/components/common/ErrorBanner";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { SignUpFormNameField } from "./SignUpFormNameField";
import { SignUpFormEmailField } from "./SignUpFormEmailField";
import { SignUpFormSubmitButton } from "./SignUpFormSubmitButton";
import { SignUpFormPasswordField } from "./SignUpFormPasswordField";
import { SignUpFormRememberMeCheckbox } from "./SignUpFormRememberMeCheckbox";

const initialState: ActionState = {
  status: null,
};

interface SignUpFormProps {
  action: ActionFn<ActionState, FormData>;
}

export function SignUpForm({ action }: SignUpFormProps) {
  const t = useTranslations("auth.SignUpForm");
  const [state, formAction, isPending] = useActionState(action, initialState);

  let serverError = null;

  if (state.status === "error") {
    if (state.errorCode === "validationError") {
      serverError = t("validation.validationError");
    } else if (state.errorCode === "authServiceError" && state.message) {
      if (state.message.includes("not enabled")) {
        serverError = t("validation.registrationNotEnabled");
      } else if (state.message.includes("email address")) {
        serverError = t("validation.invalidEmail");
      } else if (state.message.includes("too short")) {
        serverError = t("validation.passwordTooShort");
      } else if (state.message.includes("too long")) {
        serverError = t("validation.passwordTooLong");
      } else if (state.message.includes("already exists")) {
        serverError = t("validation.userAlreadyExists");
      } else if (state.message.includes("create user")) {
        serverError = t("validation.userCreationFailed");
      } else if (state.message.includes("create session")) {
        serverError = t("validation.sessionCreationFailed");
      }
    } else {
      serverError = t("validation.internalServerError");
    }
  }

  return (
    <AuthCardForm action={formAction}>
      <SignUpFormNameField />
      <SignUpFormEmailField />
      <SignUpFormPasswordField />
      <SignUpFormRememberMeCheckbox />

      {serverError && <ErrorBanner>{serverError}</ErrorBanner>}

      <SignUpFormSubmitButton />
    </AuthCardForm>
  );
}
