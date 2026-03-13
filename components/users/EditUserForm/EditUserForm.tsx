"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { useUpdateUser } from "../UpdateUserContext";
import { CalendarDate } from "@internationalized/date";
import { UserBioTextField } from "../UserBioTextField";
import { UserPositionSelect } from "../UserPositionSelect";
import { UserAddressTextField } from "../UserAddressTextField";
import { UserFullNameTextField } from "../UserFullNameTextField";
import { UserBirthdateDatePicker } from "../UserBirthdateDatePicker";
import { UserPublicLinkTextField } from "../UserPublicLinkTextField";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { UserPhoneNumberTextField } from "../UserPhoneNumberTextField";

export interface EditUserFormProps {
  userId: string;
  fullName?: string;
  bio?: string;
  birthdate?: string;
  phoneNumber?: string;
  publicLink?: string;
  address?: string;
  positionId?: number;
  userPositionSelectItems: { id: number; name: string }[];
}

export function EditUserForm({
  userId,
  fullName,
  bio,
  birthdate,
  phoneNumber,
  publicLink,
  address,
  positionId,
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

  let birthdateValue;
  if (birthdate) {
    const d = new Date(birthdate);
    birthdateValue = new CalendarDate(
      d.getFullYear(),
      d.getMonth() + 1,
      d.getDate(),
    );
  }

  return (
    <FormBase id="edit-user-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        {userId && <input type="hidden" name="id" value={userId} />}
        <UserFullNameTextField defaultValue={fullName} />
        <UserBioTextField defaultValue={bio} />
        <UserBirthdateDatePicker defaultValue={birthdateValue} />
        <UserPhoneNumberTextField defaultValue={phoneNumber} />
        <UserPublicLinkTextField defaultValue={publicLink} />
        <UserAddressTextField defaultValue={address} />
        <UserPositionSelect
          defaultSelectedKey={positionId?.toString()}
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
