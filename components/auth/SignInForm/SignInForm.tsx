"use client";

import { useActionState } from "react";
import { AuthCardForm } from "../AuthCard";
import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { SignInFormEmailField } from "./SignInFormEmailField";
import { SignInFormSubmitButton } from "./SignInFormSubmitButton";
import { SignInFormPasswordField } from "./SignInFormPasswordField";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { SignInFormRememberMeCheckbox } from "./SignInFormRememberMeCheckbox";

const initialState: ActionState = {
  status: null,
};

interface SignInFormProps {
  action: ActionFn<ActionState, FormData>;
}

export function SignInForm({ action }: SignInFormProps) {
  const t = useTranslations("auth.SignInForm");

  const [state, formAction, isPending] = useActionState(action, initialState);

  let serverError = null;

  if (state.status === "error") {
    if (state.errorCode === "validationError") {
      serverError = t("validation.validationError");
    } else if (state.errorCode === "authServiceError" && state.message) {
      if (state.message.includes("not enabled")) {
        serverError = t("validation.authNotEnabled");
      } else if (state.message.includes("email address")) {
        serverError = t("validation.invalidEmail");
      } else if (state.message.includes("email or password")) {
        serverError = t("validation.invalidCredentials");
      } else if (state.message.includes("not verified")) {
        serverError = t("validation.emailNotVerified");
      } else if (state.message.includes("session")) {
        serverError = t("validation.sessionCreationFailed");
      }
    } else {
      serverError = t("validation.internalServerError");
    }
  }

  return (
    <AuthCardForm action={formAction}>
      <SignInFormEmailField />
      <SignInFormPasswordField />
      <SignInFormRememberMeCheckbox />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {serverError}
      </FormErrorBanner>

      <SignInFormSubmitButton />
    </AuthCardForm>
  );
}
