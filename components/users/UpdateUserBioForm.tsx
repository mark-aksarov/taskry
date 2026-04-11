"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { UserBioTextField } from "./UserBioTextField";
import { useUpdateUserBio } from "./UpdateUserBioContext";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

export interface UpdateUserBioFormProps {
  userId: string;
  bio?: string;
}

export function UpdateUserBioForm({ userId, bio }: UpdateUserBioFormProps) {
  const t = useTranslations("users.UpdateUserForm");

  const { state, action, isPending } = useUpdateUserBio();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-user-bio-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        {userId && <input type="hidden" name="id" value={userId} />}
        <UserBioTextField defaultValue={bio} />

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
