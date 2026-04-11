"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { UserAddressTextField } from "./UserAddressTextField";
import { useUpdateUserAddress } from "./UpdateUserAddressContext";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

export interface UpdateUserAddressFormProps {
  userId: string;
  address?: string;
}

export function UpdateUserAddressForm({
  userId,
  address,
}: UpdateUserAddressFormProps) {
  const t = useTranslations("users.UpdateUserAddressForm");

  const { state, action, isPending } = useUpdateUserAddress();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-user-address-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        {userId && <input type="hidden" name="id" value={userId} />}
        <UserAddressTextField defaultValue={address} />

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
