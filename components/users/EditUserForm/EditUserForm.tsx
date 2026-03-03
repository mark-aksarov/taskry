"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { DateValue } from "react-aria";
import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { useUpdateUser } from "../UpdateUserContext";
import { UserBioTextField } from "../UserBioTextField";
import { UserPositionSelect } from "../UserPositionSelect";
import { UserAddressTextField } from "../UserAddressTextField";
import { UserFullNameTextField } from "../UserFullNameTextField";
import { UserBirthdateDatePicker } from "../UserBirthdateDatePicker";
import { UserPublicLinkTextField } from "../UserPublicLinkTextField";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { UserPhoneNumberTextField } from "../UserPhoneNumberTextField";

interface EditUserFormProps {
  userId: string;
  userFullNameDefaultValue?: string;
  userBioDefaultValue?: string;
  userBirthdateDefaultValue?: DateValue;
  userPhoneNumberDefaultValue?: string;
  userPublicLinkDefaultValue?: string;
  userAddressDefaultValue?: string;
  userPositionSelectDefaultValue?: string;
  userPositionSelectItems: { id: number; name: string }[];
}

export function EditUserForm({
  userId,
  userFullNameDefaultValue,
  userBioDefaultValue,
  userBirthdateDefaultValue,
  userPhoneNumberDefaultValue,
  userPublicLinkDefaultValue,
  userAddressDefaultValue,
  userPositionSelectDefaultValue,
  userPositionSelectItems,
}: EditUserFormProps) {
  const t = useTranslations("users.EditUserForm");

  const { state, action, isPending } = useUpdateUser();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="edit-user-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        {userId && <input type="hidden" name="id" value={userId} />}
        <UserFullNameTextField defaultValue={userFullNameDefaultValue} />
        <UserBioTextField defaultValue={userBioDefaultValue} />
        <UserBirthdateDatePicker defaultValue={userBirthdateDefaultValue} />
        <UserPhoneNumberTextField defaultValue={userPhoneNumberDefaultValue} />
        <UserPublicLinkTextField defaultValue={userPublicLinkDefaultValue} />
        <UserAddressTextField defaultValue={userAddressDefaultValue} />
        <UserPositionSelect
          defaultSelectedKey={userPositionSelectDefaultValue}
          items={userPositionSelectItems}
        />

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
