import { useActionState } from "react";
import { Button, TextField } from "../ui";
import { useTranslations } from "next-intl";
import { AuthCardForm, AuthCardFormErrorText } from "./AuthCard";
import { ActionFn, ForgetPasswordState } from "@/lib/actions/types";

const initialState: ForgetPasswordState = {
  status: null,
  message: null,
  payload: null,
};

interface ForgetPasswordFormProps {
  action: ActionFn<ForgetPasswordState>;
}

export function ForgetPasswordForm({ action }: ForgetPasswordFormProps) {
  const t = useTranslations("auth.ForgetPasswordForm");

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
      <Button
        type="submit"
        size="medium"
        label={t("submit.label")}
        className="justify-center py-4"
      />
    </AuthCardForm>
  );
}
