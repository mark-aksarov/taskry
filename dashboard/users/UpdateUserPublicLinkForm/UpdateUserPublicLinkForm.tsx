"use client";

import { startTransition } from "react";
import { FormBase } from "@/dashboard/common/FormBase";
import { UserPublicLinkTextField } from "../UserPublicLinkTextField";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { useUpdateUserPublicLink } from "../UpdateUserPublicLinkContext";

export interface UpdateUserPublicLinkFormProps {
  userId: string;
  publicLink?: string;
}

export function UpdateUserPublicLinkForm({
  userId,
  publicLink,
}: UpdateUserPublicLinkFormProps) {
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
      {userId && <input type="hidden" name="id" value={userId} />}
      <UserPublicLinkTextField defaultValue={publicLink} />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
