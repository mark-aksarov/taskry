"use client";

import { DateValue } from "react-aria";
import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { UserBioTextField } from "../UserBioTextField";
import { FormBase } from "@/components/common/FormBase";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ErrorBanner } from "@/components/common/ErrorBanner";
import { UserAddressTextField } from "../UserAddressTextField";
import { UserFullNameTextField } from "../UserFullNameTextField";
import { UserBirthdateDatePicker } from "../UserBirthdateDatePicker";
import { UserPublicLinkTextField } from "../UserPublicLinkTextField";
import { UserPhoneNumberTextField } from "../UserPhoneNumberTextField";

const initialState: ActionState = {
  status: null,
};

interface EditUserFormProps {
  userId?: string;
  fullNameDefaultValue?: string;
  bioDefaultValue?: string;
  birthdateDefaultValue?: DateValue;
  emailDefaultValue?: string;
  phoneNumberDefaultValue?: string;
  publicLinkDefaultValue?: string;
  addressDefaultValue?: string;
  positionSelect: React.ReactNode;
  updateUser: ActionFn<ActionState, FormData>;
}

export function EditUserForm({
  userId,
  fullNameDefaultValue,
  bioDefaultValue,
  birthdateDefaultValue,
  phoneNumberDefaultValue,
  publicLinkDefaultValue,
  addressDefaultValue,
  positionSelect,
  updateUser,
}: EditUserFormProps) {
  const t = useTranslations("users.EditUserForm");

  const [state, action, pending] = useActionState(updateUser, initialState);

  return (
    <FormBase id="edit-user-form" state={state} action={action}>
      {userId && <input type="hidden" name="id" value={userId} />}
      <UserFullNameTextField defaultValue={fullNameDefaultValue} />
      <UserBioTextField defaultValue={bioDefaultValue} />
      <UserBirthdateDatePicker defaultValue={birthdateDefaultValue} />
      <UserPhoneNumberTextField defaultValue={phoneNumberDefaultValue} />
      <UserPublicLinkTextField defaultValue={publicLinkDefaultValue} />
      <UserAddressTextField defaultValue={addressDefaultValue} />
      {positionSelect}

      {state.status === "error" && (
        <ErrorBanner>{t("error.updateError")}</ErrorBanner>
      )}
    </FormBase>
  );
}
