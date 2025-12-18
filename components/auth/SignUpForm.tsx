"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { ActionFn, SignUpState } from "@/lib/actions/types";
import { Button, Checkbox, TextField } from "@/components/ui";
import { AuthCardForm, AuthCardFormErrorText } from "./AuthCard";

const initialState: SignUpState = {
  status: null,
  message: null,
  payload: null,
};

interface SignUpFormProps {
  action: ActionFn<SignUpState>;
}

export function SignUpForm({ action }: SignUpFormProps) {
  const t = useTranslations("auth.SignUpForm");
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <AuthCardForm action={formAction}>
      {state.status === "error" && state.message && (
        <AuthCardFormErrorText>{state.message}</AuthCardFormErrorText>
      )}
      <TextField
        label={t("name.label")}
        name="name"
        placeholder={t("name.placeholder")}
        isRequired
        minLength={5}
        maxLength={50}
        defaultValue={state.payload?.get("name") as string}
        errorMessage={(validation) => {
          const details = validation.validationDetails;

          if (details.valueMissing) {
            return t("validation.name.required");
          }
          if (details.tooShort) {
            return t("validation.name.tooShort", { minLength: 5 });
          }
          if (details.tooLong) {
            return t("validation.name.tooLong", { maxLength: 50 });
          }

          return "";
        }}
      />

      <TextField
        label={t("email.label")}
        type="email"
        name="email"
        placeholder={t("email.placeholder")}
        isRequired
        maxLength={254}
        defaultValue={state.payload?.get("email") as string}
        errorMessage={(validation) => {
          const details = validation.validationDetails;

          if (details.valueMissing) {
            return t("validation.email.required");
          }
          if (details.tooLong) {
            return t("validation.email.tooLong", { minLength: 254 });
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
