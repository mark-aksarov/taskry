"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
  useFormBaseActionState,
} from "@/components/common/FormBase";

import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { CustomerBioTextField } from "../CustomerBioTextField";
import { CustomerEmailTextField } from "../CustomerEmailTextField";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { CustomerFullNameTextField } from "../CustomerFullNameTextField";
import { CustomerPublicLinkTextField } from "../CustomerPublicLinkTextField";
import { CustomerPhoneNumberTextField } from "../CustomerPhoneNumberTextField";

interface EditCustomerFormProps {
  customerId: number;
  fullNameDefaultValue: string;
  bioDefaultValue?: string;
  emailDefaultValue: string;
  phoneNumberDefaultValue?: string;
  publicLinkDefaultValue?: string;
  companySelect: React.ReactNode;
  updateCustomer: ActionFn<ActionState, FormData>;
}

export function EditCustomerForm({
  customerId,
  fullNameDefaultValue,
  bioDefaultValue,
  emailDefaultValue,
  phoneNumberDefaultValue,
  publicLinkDefaultValue,
  companySelect,
  updateCustomer,
}: EditCustomerFormProps) {
  const t = useTranslations("customers.EditCustomerForm");

  const [state, action, isPending] = useFormBaseActionState(updateCustomer);

  return (
    <FormBase
      id="edit-customer-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
      <FormBaseBody>
        {customerId && <input type="hidden" name="id" value={customerId} />}

        <CustomerFullNameTextField defaultValue={fullNameDefaultValue} />
        <CustomerBioTextField defaultValue={bioDefaultValue} />
        <CustomerEmailTextField defaultValue={emailDefaultValue} />
        <CustomerPhoneNumberTextField defaultValue={phoneNumberDefaultValue} />
        <CustomerPublicLinkTextField defaultValue={publicLinkDefaultValue} />
        {companySelect}
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
