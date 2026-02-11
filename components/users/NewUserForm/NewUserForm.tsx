"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { UserEmailTextField } from "../UserEmailTextField";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { UserFullNameTextField } from "../UserFullNameTextField";
import { UserPasswordTextField } from "../UserPasswordTextField";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { useCloseOverlayOnActionSuccess } from "@/lib/hooks/useCloseOverlayOnActionSuccess";

const initialState: ActionState = {
  status: null,
};

interface NewUserFormProps {
  createUser: ActionFn<ActionState, FormData>;
}

export function NewUserForm({ createUser }: NewUserFormProps) {
  const t = useTranslations("users.NewUserForm");

  const [state, action, isPending] = useActionState(createUser, initialState);

  useCloseOverlayOnActionSuccess(state);

  let serverError = null;

  if (state.status === "error") {
    if (state.errorCode === "authServiceError" && state.message) {
      if (state.message.includes("not allowed")) {
        serverError = t("error.accessDenied");
      } else if (state.message.includes("Invalid email")) {
        serverError = t("error.invalidEmail");
      } else if (state.message.includes("already exists")) {
        serverError = t("error.userAlreadyExists");
      } else if (state.message.includes("Failed to create")) {
        serverError = t("error.userCreationFailed");
      }
    } else {
      serverError = t("error.internalServerError");
    }
  }

  return (
    <FormBase
      id="new-user-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
      <FormBaseBody>
        <UserFullNameTextField />
        <UserEmailTextField />
        <UserPasswordTextField />

        <FormErrorBanner status={state.status} isPending={isPending}>
          {serverError}
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
