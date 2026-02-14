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
