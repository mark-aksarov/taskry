"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
  useFormBaseActionState,
} from "@/components/common/FormBase";

import { DateValue } from "react-aria";
import { useTranslations } from "next-intl";
import { UserBioTextField } from "../UserBioTextField";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { UserAddressTextField } from "../UserAddressTextField";
import { UserFullNameTextField } from "../UserFullNameTextField";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { UserBirthdateDatePicker } from "../UserBirthdateDatePicker";
import { UserPublicLinkTextField } from "../UserPublicLinkTextField";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { UserPhoneNumberTextField } from "../UserPhoneNumberTextField";

interface EditUserFormProps {
  userId: string;
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

  const [state, action, isPending] = useFormBaseActionState(updateUser);

  return (
    <FormBase
      id="edit-user-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
      <FormBaseBody>
        {userId && <input type="hidden" name="id" value={userId} />}
        <UserFullNameTextField defaultValue={fullNameDefaultValue} />
        <UserBioTextField defaultValue={bioDefaultValue} />
        <UserBirthdateDatePicker defaultValue={birthdateDefaultValue} />
        <UserPhoneNumberTextField defaultValue={phoneNumberDefaultValue} />
        <UserPublicLinkTextField defaultValue={publicLinkDefaultValue} />
        <UserAddressTextField defaultValue={addressDefaultValue} />
        {positionSelect}

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
