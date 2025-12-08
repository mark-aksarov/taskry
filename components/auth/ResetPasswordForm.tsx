"use client";

import { useActionState } from "react";
import { Button, TextField } from "../ui";
import { useTranslations } from "next-intl";
import { toCamelCase } from "@/lib/utils/toCamelCase";
import { AuthCardForm, AuthCardFormErrorText } from "./AuthCard";
import { ResetPasswordAction, ResetPasswordState } from "@/lib/actions/types";

const initialState: ResetPasswordState = {
  error: null,
};

interface ResetPasswordFormProps {
  action: ResetPasswordAction;
}

export function ResetPasswordForm({ action }: ResetPasswordFormProps) {
  const t = useTranslations("auth.ResetPasswordForm");
  const tServerError = useTranslations("auth.ServerError");

  const [state, formAction, isPending] = useActionState(action, initialState);

  let errorTranslationKey;

  if (state.error) {
    if (state.error.status === "UnknownError") {
      errorTranslationKey = "internalServerError";
    } else if (state.error.status === "InvalidInputData") {
      errorTranslationKey = "invalidInputData";
    } else {
      errorTranslationKey = toCamelCase(state.error.message!);
    }
  }

  return (
    <AuthCardForm action={formAction}>
      {state.error && (
        <AuthCardFormErrorText>
          {tServerError(errorTranslationKey!)}
        </AuthCardFormErrorText>
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
