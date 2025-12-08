import { useActionState } from "react";
import { Button, TextField } from "../ui";
import { useTranslations } from "next-intl";
import { toCamelCase } from "@/lib/utils/toCamelCase";
import { AuthCardForm, AuthCardFormErrorText } from "./AuthCard";
import { ForgetPasswordAction, ForgetPasswordState } from "@/lib/actions/types";

const initialState: ForgetPasswordState = {
  error: null,
  payload: null,
};

interface ForgetPasswordFormProps {
  action: ForgetPasswordAction;
}

export function ForgetPasswordForm({ action }: ForgetPasswordFormProps) {
  const t = useTranslations("auth.ForgetPasswordForm");
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
      <Button
        type="submit"
        size="medium"
        label={t("submit.label")}
        className="justify-center py-4"
      />
    </AuthCardForm>
  );
}
