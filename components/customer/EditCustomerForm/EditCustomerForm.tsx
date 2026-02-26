"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
  useFormBaseActionState,
} from "@/components/common/FormBase";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { CustomerBioTextField } from "../CustomerBioTextField";
import { CustomerCompanySelect } from "../CustomerCompanySelect";
import { CustomerEmailTextField } from "../CustomerEmailTextField";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { CustomerFullNameTextField } from "../CustomerFullNameTextField";
import { CustomerPublicLinkTextField } from "../CustomerPublicLinkTextField";
import { CustomerPhoneNumberTextField } from "../CustomerPhoneNumberTextField";

interface EditCustomerFormProps {
  customerId: number;
  customerFullNameDefaultValue: string;
  customerBioDefaultValue?: string;
  customerEmailDefaultValue: string;
  customerPhoneNumberDefaultValue?: string;
  customerPublicLinkDefaultValue?: string;
  customerCompanyDefaultValue?: string;
  customerCompanySelectItems: { id: number; name: string }[];
  updateCustomer: ActionFn<ActionState, FormData>;
}

export function EditCustomerForm({
  customerId,
  customerFullNameDefaultValue,
  customerBioDefaultValue,
  customerEmailDefaultValue,
  customerPhoneNumberDefaultValue,
  customerPublicLinkDefaultValue,
  customerCompanyDefaultValue,
  customerCompanySelectItems,
  updateCustomer,
}: EditCustomerFormProps) {
  const t = useTranslations("customers.EditCustomerForm");

  // The ref is used inside reducerAction in useFormBaseActionState.
  // ref.current in useFormBaseActionState is null on unmount, preventing programmatic modal close when opening another form.
  const ref = useRef<HTMLFormElement>(null);

  const [state, action, isPending] = useFormBaseActionState(
    updateCustomer,
    ref,
    t("successMessage"),
  );

  return (
    <FormBase
      ref={ref}
      id="edit-customer-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
      <FormBaseBody>
        {customerId && <input type="hidden" name="id" value={customerId} />}

        <CustomerFullNameTextField
          defaultValue={customerFullNameDefaultValue}
        />
        <CustomerBioTextField defaultValue={customerBioDefaultValue} />
        <CustomerEmailTextField defaultValue={customerEmailDefaultValue} />
        <CustomerPhoneNumberTextField
          defaultValue={customerPhoneNumberDefaultValue}
        />
        <CustomerPublicLinkTextField
          defaultValue={customerPublicLinkDefaultValue}
        />
        <CustomerCompanySelect
          defaultSelectedKey={customerCompanyDefaultValue}
          items={customerCompanySelectItems}
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
