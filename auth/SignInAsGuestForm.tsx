"use client";

import { LogIn } from "lucide-react";
import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { AuthForm, AuthFormSubmitButton } from "./AuthForm";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";

const initialState: ActionState = {
  status: null,
};

interface SignInAsGuestFormProps {
  signIn: ActionFn<ActionState, FormData>;
}

export function SignInAsGuestForm({ signIn }: SignInAsGuestFormProps) {
  const t = useTranslations("auth.SignInAsGuestForm");
  const locale = useLocale();

  const [state, formAction, isPending] = useActionState(signIn, initialState);

  return (
    <AuthForm action={formAction}>
      <input
        type="hidden"
        name="email"
        value={locale === "en" ? "bob.smith@corp.com" : "pavel@ws.com"}
      />
      <input type="hidden" name="password" value="12345abc" />
      <AuthFormSubmitButton
        iconLeft={
          !isPending ? (
            <LogIn size={16} strokeWidth={1.5} absoluteStrokeWidth />
          ) : undefined
        }
        isPending={isPending}
        variant="outlined"
        label={t("submitButtonLabel")}
      />
      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </AuthForm>
  );
}
