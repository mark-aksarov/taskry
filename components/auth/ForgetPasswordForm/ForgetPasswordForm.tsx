"use client";

import { useActionState } from "react";
import { AuthCardForm } from "../AuthCard";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { ForgetPasswordFormEmailField } from "./ForgetPasswordFormEmailField";
import { ForgetPasswordFormSubmitButton } from "./ForgetPasswordFormSubmitButton";

const initialState: ActionState = {
  status: null,
};

interface ForgetPasswordFormProps {
  action: ActionFn<ActionState, FormData>;
}

export function ForgetPasswordForm({ action }: ForgetPasswordFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <AuthCardForm action={formAction}>
      <ForgetPasswordFormEmailField />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>

      <ForgetPasswordFormSubmitButton />
    </AuthCardForm>
  );
}
