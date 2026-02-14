"use client";

import { useActionState } from "react";
import { AuthCardForm } from "../AuthCard";
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
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <AuthCardForm action={formAction}>
      <SignInFormEmailField />
      <SignInFormPasswordField />
      <SignInFormRememberMeCheckbox />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>

      <SignInFormSubmitButton />
    </AuthCardForm>
  );
}
