"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { Button, Checkbox, TextField } from "../ui";
import { ActionFn, SignInState } from "@/lib/actions/types";
import { AuthCardForm, AuthCardFormErrorText } from "./AuthCard";

const initialState: SignInState = {
  status: null,
  message: null,
  payload: null,
};

interface SignInFormProps {
  action: ActionFn<SignInState>;
}

export function SignInForm({ action }: SignInFormProps) {
  const t = useTranslations("auth.SignInForm");

  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <AuthCardForm action={formAction}>
      {state.status === "error" && state.message && (
        <AuthCardFormErrorText>{state.message}</AuthCardFormErrorText>
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
            return t("validation.password.tooLong", { maxLength: 128 });
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
