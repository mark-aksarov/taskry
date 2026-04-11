"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { UserPublicLinkTextField } from "./UserPublicLinkTextField";
import { useUpdateUserPublicLink } from "./UpdateUserPublicLinkContext";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

export interface UpdateUserPublicLinkFormProps {
  userId: string;
  publicLink?: string;
}

export function UpdateUserPublicLinkForm({
  userId,
  publicLink,
}: UpdateUserPublicLinkFormProps) {
  const t = useTranslations("users.UpdateUserPublicLinkForm");

  const { state, action, isPending } = useUpdateUserPublicLink();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-user-public-link-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        {userId && <input type="hidden" name="id" value={userId} />}
        <UserPublicLinkTextField defaultValue={publicLink} />

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
