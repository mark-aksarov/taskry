"use client";

import { Button, TextField } from "../ui";
import { useTranslations } from "next-intl";
import { startTransition, useActionState } from "react";
import { AuthCardForm, AuthCardFormErrorText } from "./AuthCard";
import { ActionFn, ResetPasswordState } from "@/lib/actions/types";

const initialState: ResetPasswordState = {
  status: null,
  message: null,
};

interface ResetPasswordFormProps {
  action: ActionFn<ResetPasswordState, FormData>;
}

export function ResetPasswordForm({ action }: ResetPasswordFormProps) {
  const t = useTranslations("auth.ResetPasswordForm");

  const [state, formAction, isPending] = useActionState(action, initialState);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  }

  return (
    <AuthCardForm onSubmit={handleSubmit}>
      {state.status === "error" && state.message && (
        <AuthCardFormErrorText>{state.message}</AuthCardFormErrorText>
      )}
      <TextField
        label={t("password.label")}
        type="password"
        name="password"
        placeholder={t("password.placeholder")}
        isRequired
        minLength={8}
        maxLength={128}
        errorMessage={(validation) => {
          const details = validation.validationDetails;

          if (details.valueMissing) {
            return t("validation.password.required");
          }
          if (details.tooShort) {
            return t("validation.password.tooShort", { minLength: 8 });
          }
          if (details.tooLong) {
            return t("validation.password.tooLong", { minLength: 128 });
          }

          return "";
        }}
      />
      <Button
        type="submit"
        size="medium"
        label={t("submit.label")}
        className="justify-center py-4"
      />
    </AuthCardForm>
  );
}
