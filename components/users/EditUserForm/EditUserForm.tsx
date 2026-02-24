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
import { UserPositionSelect } from "../UserPositionSelect";

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
  updateUser: ActionFn<ActionState, FormData>;
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
