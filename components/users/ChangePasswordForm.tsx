"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { UserPasswordTextField } from "./UserPasswordTextField";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { useUpdateEntityActionState } from "@/lib/hooks/useUpdateEntityActionState";
import { useChangePasswordTransition } from "./ChangePasswordTransitionContext";

interface ChangePasswordFormProps {
  userId: string;
  changePassword: ActionFn<ActionState, FormData>;
}

export function ChangePasswordForm({
  userId,
  changePassword,
}: ChangePasswordFormProps) {
  const t = useTranslations("users.ChangePasswordForm");

  const { startTransition } = useChangePasswordTransition();
  const [state, action, isPending] = useUpdateEntityActionState({
    updateEntity: changePassword,
    successMessage: t("successMessage"),
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="change-password-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        {userId && <input type="hidden" name="id" value={userId} />}
        <UserPasswordTextField />

        <FormErrorBanner status={state.status} isPending={isPending}>
          {state.message}
        </FormErrorBanner>
      </FormBaseBody>
      <FormBaseFooter>
        <FormBaseSubmitButton
          isPending={isPending}
          label={t("submitButtonLabel")}
        />
      </FormBaseFooter>
    </FormBase>
  );
}
