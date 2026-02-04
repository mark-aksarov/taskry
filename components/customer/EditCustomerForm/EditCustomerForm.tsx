"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { FormBase } from "@/components/common/FormBase";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ErrorBanner } from "@/components/common/ErrorBanner";
import { CustomerBioTextField } from "../CustomerBioTextField";
import { CustomerEmailTextField } from "../CustomerEmailTextField";
import { CustomerFullNameTextField } from "../CustomerFullNameTextField";
import { CustomerPublicLinkTextField } from "../CustomerPublicLinkTextField";
import { CustomerPhoneNumberTextField } from "../CustomerPhoneNumberTextField";

const initialState: ActionState = {
  status: null,
};

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

  const [state, action, pending] = useActionState(updateCustomer, initialState);

  return (
    <FormBase id="edit-customer-form" state={state} action={action}>
      {customerId && <input type="hidden" name="id" value={customerId} />}

      <CustomerFullNameTextField defaultValue={fullNameDefaultValue} />
      <CustomerBioTextField defaultValue={bioDefaultValue} />
      <CustomerEmailTextField defaultValue={emailDefaultValue} />
      <CustomerPhoneNumberTextField defaultValue={phoneNumberDefaultValue} />
      <CustomerPublicLinkTextField defaultValue={publicLinkDefaultValue} />
      {companySelect}
      {state.status === "error" && (
        <ErrorBanner>{t("error.updateError")}</ErrorBanner>
      )}
    </FormBase>
  );
}
