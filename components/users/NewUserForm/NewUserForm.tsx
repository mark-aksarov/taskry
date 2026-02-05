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

  let serverError = null;

  if (state.status === "error") {
    if (state.errorCode === "authServiceError" && state.message) {
      if (state.message.includes("not allowed")) {
        serverError = t("error.accessDenied");
      } else if (state.message.includes("No data")) {
        serverError = t("error.noDataToUpdate");
      }
    } else {
      serverError = t("error.internalServerError");
    }
  }

  return (
    <FormBase id="new-user-form" state={state} action={action}>
      <UserFullNameTextField />
      <UserEmailTextField />
      <UserPasswordTextField />

      {state.status === "error" && <ErrorBanner>{serverError}</ErrorBanner>}
    </FormBase>
  );
}
