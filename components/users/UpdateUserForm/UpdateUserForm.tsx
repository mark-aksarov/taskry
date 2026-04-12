"use client";

import { startTransition } from "react";
import { useUpdateUser } from "../UpdateUserContext";
import { CalendarDate } from "@internationalized/date";
import { UserBioTextField } from "../UserBioTextField";
import { FormBase } from "@/components/common/FormBase";
import { PositionSelect } from "../../position/PositionSelect";
import { UserAddressTextField } from "../UserAddressTextField";
import { UserFullNameTextField } from "../UserFullNameTextField";
import { UserBirthdateDatePicker } from "../UserBirthdateDatePicker";
import { UserPublicLinkTextField } from "../UserPublicLinkTextField";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { UserPhoneNumberTextField } from "../UserPhoneNumberTextField";

export interface UpdateUserFormProps {
  userId: string;
  fullName?: string;
  bio?: string;
  birthdate?: string;
  phoneNumber?: string;
  publicLink?: string;
  address?: string;
  positionId?: number;
  positionSelectItems: { id: number; name: string }[];
}

export function UpdateUserForm({
  userId,
  fullName,
  bio,
  birthdate,
  phoneNumber,
  publicLink,
  address,
  positionId,
  positionSelectItems,
}: UpdateUserFormProps) {
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
    <FormBase id="update-user-form" onSubmit={handleSubmit}>
      {userId && <input type="hidden" name="id" value={userId} />}
      <UserFullNameTextField defaultValue={fullName} />
      <UserBioTextField defaultValue={bio} />
      <UserBirthdateDatePicker defaultValue={birthdateValue} />
      <UserPhoneNumberTextField defaultValue={phoneNumber} />
      <UserPublicLinkTextField defaultValue={publicLink} />
      <UserAddressTextField defaultValue={address} />
      <PositionSelect
        defaultSelectedKey={positionId?.toString()}
        items={positionSelectItems}
      />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
