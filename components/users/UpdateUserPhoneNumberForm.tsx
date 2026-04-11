"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { UserPhoneNumberTextField } from "./UserPhoneNumberTextField";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { useUpdateUserPhoneNumber } from "./UpdateUserPhoneNumberContext";

export interface UpdateUserPhoneNumberFormProps {
  userId: string;
  phoneNumber?: string;
}

export function UpdateUserPhoneNumberForm({
  userId,
  phoneNumber,
}: UpdateUserPhoneNumberFormProps) {
  const t = useTranslations("users.UpdateUserPhoneNumberForm");

  const { state, action, isPending } = useUpdateUserPhoneNumber();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-user-phone-number-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        {userId && <input type="hidden" name="id" value={userId} />}
        <UserPhoneNumberTextField defaultValue={phoneNumber} />

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
