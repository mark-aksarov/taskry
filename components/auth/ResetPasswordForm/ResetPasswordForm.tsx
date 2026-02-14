"use client";

import { useActionState } from "react";
import { AuthCardForm } from "../AuthCard";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { ResetPasswordFormSubmitButton } from "./ResetPasswordFormSubmitButton";
import { ResetPasswordFormPasswordField } from "./ResetPasswordFormPasswordField";

const initialState: ActionState = {
  status: null,
};

interface ResetPasswordFormProps {
  action: ActionFn<ActionState, FormData>;
}

export function ResetPasswordForm({ action }: ResetPasswordFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <AuthCardForm action={formAction}>
      <ResetPasswordFormPasswordField />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>

      <ResetPasswordFormSubmitButton />
    </AuthCardForm>
  );
}
