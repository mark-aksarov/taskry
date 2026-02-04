"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { FormBase } from "@/components/common/FormBase";
import { UserEmailTextField } from "../UserEmailTextField";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ErrorBanner } from "@/components/common/ErrorBanner";
import { UserFullNameTextField } from "../UserFullNameTextField";
import { UserPasswordTextField } from "../UserPasswordTextField";

const initialState: ActionState = {
  status: null,
};

interface NewUserFormProps {
  createUser: ActionFn<ActionState, FormData>;
}

export function NewUserForm({ createUser }: NewUserFormProps) {
  const t = useTranslations("users.NewUserForm");

  const [state, action, pending] = useActionState(createUser, initialState);

  return (
    <FormBase id="new-user-form" state={state} action={action}>
      <UserFullNameTextField />
      <UserEmailTextField />
      <UserPasswordTextField />

      {state.status === "error" && (
        <ErrorBanner>{t("error.creationError")}</ErrorBanner>
      )}
    </FormBase>
  );
}
