"use client";

import { useActionState } from "react";
import { AuthCardForm } from "../AuthCard";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { SignUpFormNameField } from "./SignUpFormNameField";
import { SignUpFormEmailField } from "./SignUpFormEmailField";
import { SignUpFormSubmitButton } from "./SignUpFormSubmitButton";
import { SignUpFormPasswordField } from "./SignUpFormPasswordField";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { SignUpFormRememberMeCheckbox } from "./SignUpFormRememberMeCheckbox";

const initialState: ActionState = {
  status: null,
};

interface SignUpFormProps {
  action: ActionFn<ActionState, FormData>;
}

export function SignUpForm({ action }: SignUpFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <AuthCardForm action={formAction}>
      <SignUpFormNameField />
      <SignUpFormEmailField />
      <SignUpFormPasswordField />
      <SignUpFormRememberMeCheckbox />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>

      <SignUpFormSubmitButton />
    </AuthCardForm>
  );
}
