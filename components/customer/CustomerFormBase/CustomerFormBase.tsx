"use client";

import { ActionFn, ActionState } from "@/lib/actions/types";
import { FormErrorText } from "@/components/common/FormErrorText";
import { Form, OverlayTriggerStateContext } from "react-aria-components";
import { CustomerFormBaseBioTextField } from "./CustomerFormBaseBioTextField";
import { startTransition, useActionState, useContext, useEffect } from "react";
import { CustomerFormBaseEmailTextField } from "./CustomerFormBaseEmailTextField";
import { CustomerFormBaseFullNameTextField } from "./CustomerFormBaseFullNameTextField";
import { CustomerFormBasePublicLinkTextField } from "./CustomerFormBasePublicLinkTextField";
import { CustomerFormBasePhoneNumberTextField } from "./CustomerFormBasePhoneNumberTextField";

const initialState: ActionState = {
  status: null,
  message: null,
};

export interface CustomerFormBaseProps {
  id: string;
  customerId?: number;
  fullNameDefaultValue?: string;
  bioDefaultValue?: string;
  emailDefaultValue?: string;
  phoneNumberDefaultValue?: string;
  publicLinkDefaultValue?: string;
  companySelect: React.ReactNode;
  formAction: ActionFn<ActionState, FormData>;
}

export function CustomerFormBase({
  id,
  customerId,
  fullNameDefaultValue,
  bioDefaultValue,
  emailDefaultValue,
  phoneNumberDefaultValue,
  publicLinkDefaultValue,
  companySelect,
  formAction,
}: CustomerFormBaseProps) {
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

        {customerId && <input type="hidden" name="id" value={customerId} />}

        <CustomerFormBaseFullNameTextField
          defaultValue={fullNameDefaultValue}
        />
        <CustomerFormBaseBioTextField defaultValue={bioDefaultValue} />
        <CustomerFormBaseEmailTextField defaultValue={emailDefaultValue} />
        <CustomerFormBasePhoneNumberTextField
          defaultValue={phoneNumberDefaultValue}
        />
        <CustomerFormBasePublicLinkTextField
          defaultValue={publicLinkDefaultValue}
        />
        {companySelect}
      </div>
    </Form>
  );
}
