"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { Button, Checkbox, TextField } from "../ui";
import { toCamelCase } from "@/lib/utils/toCamelCase";
import { SignInAction, SignInState } from "@/lib/actions/types";
import { AuthCardForm, AuthCardFormErrorText } from "./AuthCard";

const initialState: SignInState = {
  error: null,
  payload: null,
};

interface SignInFormProps {
  action: SignInAction;
}

export function SignInForm({ action }: SignInFormProps) {
  const t = useTranslations("auth.SignInForm");
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
        label={t("email.label")}
        type="email"
        placeholder={t("email.placeholder")}
        isRequired
        maxLength={254}
        name="email"
        defaultValue={state.payload?.get("email") as string}
        errorMessage={(validation) => {
          const details = validation.validationDetails;

          if (details.valueMissing) {
            return t("validation.email.required");
          }
          if (details.tooLong) {
            return t("validation.email.tooLong", { maxLength: 254 });
          }
          if (details.typeMismatch) {
            return t("validation.email.format");
          }

          return "";
        }}
      />
      <TextField
        label={t("password.label")}
        type="password"
        placeholder={t("password.placeholder")}
        name="password"
        isRequired
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
      <Checkbox
        className="font-normal"
        name="rememberMe"
        defaultSelected={state.payload?.get("rememberMe") === "on"}
      >
        {t("rememberMe")}
      </Checkbox>
      <Button
        type="submit"
        size="medium"
        label={t("submit.label")}
        className="justify-center py-4"
      />
    </AuthCardForm>
  );
}
