"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { UserFullNameTextField } from "./UserFullNameTextField";
import { useUpdateUserFullName } from "./UpdateUserFullNameContext";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

export interface UpdateUserFullNameFormProps {
  userId: string;
  fullName?: string;
}

export function UpdateUserFullNameForm({
  userId,
  fullName,
}: UpdateUserFullNameFormProps) {
  const t = useTranslations("users.UpdateUserFullNameForm");

  const { state, action, isPending } = useUpdateUserFullName();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-user-full-name-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        {userId && <input type="hidden" name="id" value={userId} />}
        <UserFullNameTextField defaultValue={fullName} />

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
