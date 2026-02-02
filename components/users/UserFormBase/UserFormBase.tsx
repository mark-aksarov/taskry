"use client";

import {
  Form,
  DateValue,
  OverlayTriggerStateContext,
} from "react-aria-components";

import { ActionFn, ActionState } from "@/lib/actions/types";
import { FormErrorText } from "@/components/common/FormErrorText";
import { UserFormBaseBioTextField } from "./UserFormBaseBioTextField";
import { UserFormBaseEmailTextField } from "./UserFormBaseEmailTextField";
import { startTransition, useActionState, useContext, useEffect } from "react";
import { UserFormBaseFullNameTextField } from "./UserFormBaseFullNameTextField";
import { UserFormBasePublicLinkTextField } from "./UserFormBasePublicLinkTextField";
import { UserFormBaseBirthdateDatePicker } from "./UserFormBaseBirthdateDatePicker";
import { UserFormBasePhoneNumberTextField } from "./UserFormBasePhoneNumberTextField";
import { UserFormBaseAddressTextField } from "./UserFormBaseAddressTextField";

const initialState: ActionState = {
  status: null,
  message: null,
};

export interface UserFormBaseProps {
  id: string;
  userId?: string;
  fullNameDefaultValue?: string;
  bioDefaultValue?: string;
  birthdateDefaultValue?: DateValue;
  emailDefaultValue?: string;
  phoneNumberDefaultValue?: string;
  publicLinkDefaultValue?: string;
  addressDefaultValue?: string;
  passwordTextField?: React.ReactNode;
  positionSelect: React.ReactNode;
  formAction: ActionFn<ActionState, FormData>;
}

export function UserFormBase({
  id,
  userId,
  fullNameDefaultValue,
  bioDefaultValue,
  birthdateDefaultValue,
  emailDefaultValue,
  phoneNumberDefaultValue,
  publicLinkDefaultValue,
  addressDefaultValue,
  passwordTextField,
  positionSelect,
  formAction,
}: UserFormBaseProps) {
  const { close } = useContext(OverlayTriggerStateContext)!;

  const [state, action, pending] = useActionState(formAction, initialState);

  useEffect(() => {
    if (state.status === "success") {
      close();
    }
  }, [state, close]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => action(formData));
  }

  return (
    <Form id={id} onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        {state.status === "error" && (
          <FormErrorText>{state.message}</FormErrorText>
        )}

        {userId && <input type="hidden" name="id" value={userId} />}

        <UserFormBaseFullNameTextField defaultValue={fullNameDefaultValue} />
        <UserFormBaseBioTextField defaultValue={bioDefaultValue} />
        <UserFormBaseBirthdateDatePicker defaultValue={birthdateDefaultValue} />
        <UserFormBaseEmailTextField defaultValue={emailDefaultValue} />
        {passwordTextField}
        <UserFormBasePhoneNumberTextField
          defaultValue={phoneNumberDefaultValue}
        />
        <UserFormBasePublicLinkTextField
          defaultValue={publicLinkDefaultValue}
        />
        <UserFormBaseAddressTextField defaultValue={addressDefaultValue} />
        {positionSelect}
      </div>
    </Form>
  );
}
