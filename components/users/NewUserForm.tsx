"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { useCreateUser } from "./CreateUserContext";
import { UserEmailTextField } from "./UserEmailTextField";
import { UserFullNameTextField } from "./UserFullNameTextField";
import { UserPasswordTextField } from "./UserPasswordTextField";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

export function NewUserForm() {
  const t = useTranslations("users.NewUserForm");

  const { state, action, isPending } = useCreateUser();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="new-user-form" onSubmit={handleSubmit} autoComplete="off">
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
