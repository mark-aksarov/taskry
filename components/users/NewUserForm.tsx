"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
  useFormBaseActionState,
} from "@/components/common/FormBase";

import { useTranslations } from "next-intl";
import { UserEmailTextField } from "./UserEmailTextField";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { UserFullNameTextField } from "./UserFullNameTextField";
import { UserPasswordTextField } from "./UserPasswordTextField";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { useRef } from "react";

interface NewUserFormProps {
  createUser: ActionFn<ActionState, FormData>;
}

export function NewUserForm({ createUser }: NewUserFormProps) {
  const t = useTranslations("users.NewUserForm");

  // The ref is used inside reducerAction in useFormBaseActionState.
  // ref.current in useFormBaseActionState is null on unmount, preventing programmatic modal close when opening another form.
  const ref = useRef<HTMLFormElement>(null);

  const [state, action, isPending] = useFormBaseActionState(
    createUser,
    ref,
    t("successMessage"),
  );

  return (
    <FormBase
      ref={ref}
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
