import {
  UserFormBase,
  UserFormBaseBioTextField,
  UserFormBaseAddressTextField,
  UserFormBaseFullNameTextField,
  UserFormBaseBirthdateDatePicker,
  UserFormBasePublicLinkTextField,
  UserFormBasePhoneNumberTextField,
} from "../UserFormBase";

import { DateValue } from "react-aria";
import { ActionFn, ActionState } from "@/lib/actions/types";

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
  formAction: ActionFn<ActionState, FormData>;
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
  formAction,
}: EditUserFormProps) {
  return (
    <UserFormBase id="edit-user-form" formAction={formAction}>
      {userId && <input type="hidden" name="id" value={userId} />}
      <UserFormBaseFullNameTextField defaultValue={fullNameDefaultValue} />
      <UserFormBaseBioTextField defaultValue={bioDefaultValue} />
      <UserFormBaseBirthdateDatePicker defaultValue={birthdateDefaultValue} />
      <UserFormBasePhoneNumberTextField
        defaultValue={phoneNumberDefaultValue}
      />
      <UserFormBasePublicLinkTextField defaultValue={publicLinkDefaultValue} />
      <UserFormBaseAddressTextField defaultValue={addressDefaultValue} />
      {positionSelect}
    </UserFormBase>
  );
}
