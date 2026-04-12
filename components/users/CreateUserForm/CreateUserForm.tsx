"use client";

import { startTransition } from "react";
import { useCreateUser } from "../CreateUserContext";
import { FormBase } from "@/components/common/FormBase";
import { UserEmailTextField } from "../UserEmailTextField";
import { UserFullNameTextField } from "../UserFullNameTextField";
import { UserPasswordTextField } from "../UserPasswordTextField";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

export function CreateUserForm() {
  const { state, action, isPending } = useCreateUser();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="create-user-form" onSubmit={handleSubmit} autoComplete="off">
      <UserFullNameTextField />
      <UserEmailTextField />
      <UserPasswordTextField />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
