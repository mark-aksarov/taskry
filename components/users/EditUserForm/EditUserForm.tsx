"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { DateValue } from "react-aria";
import { useActionState } from "react";
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
import { useCloseOverlayOnActionSuccess } from "@/lib/hooks/useCloseOverlayOnActionSuccess";

const initialState: ActionState = {
  status: null,
};

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

  const [state, action, isPending] = useActionState(updateUser, initialState);

  useCloseOverlayOnActionSuccess(state);

  let serverError = null;

  if (state.status === "error") {
    if (state.errorCode === "authServiceError" && state.message) {
      if (state.message.includes("not allowed")) {
        serverError = t("error.accessDenied");
      } else if (state.message.includes("No data")) {
        serverError = t("error.noDataToUpdate");
      }
    } else {
      serverError = t("error.internalServerError");
    }
  }

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
          {serverError}
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
