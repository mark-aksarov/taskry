"use client";

import { startTransition } from "react";
import { UserBioTextField } from "../UserBioTextField";
import { FormBase } from "@/dashboard/common/FormBase";
import { useUpdateUserBio } from "../UpdateUserBioContext";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";

export interface UpdateUserBioFormProps {
  userId: string;
  bio?: string;
}

export function UpdateUserBioForm({ userId, bio }: UpdateUserBioFormProps) {
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
      {userId && <input type="hidden" name="id" value={userId} />}
      <UserBioTextField defaultValue={bio} />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
