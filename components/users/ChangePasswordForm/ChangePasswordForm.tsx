"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
  useFormBaseActionState,
} from "@/components/common/FormBase";

import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { UserPasswordTextField } from "../UserPasswordTextField";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

interface ChangePasswordFormProps {
  userId: string;
  changePassword: ActionFn<ActionState, FormData>;
}

export function ChangePasswordForm({
  userId,
  changePassword,
}: ChangePasswordFormProps) {
  const t = useTranslations("users.ChangePasswordForm");

  const [state, action, isPending] = useFormBaseActionState(changePassword);

  return (
    <FormBase
      id="change-password-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
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
