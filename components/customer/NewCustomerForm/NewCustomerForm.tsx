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

interface NewCustomerFormProps {
  companySelect: React.ReactNode;
  createCustomer: ActionFn<ActionState, FormData>;
}

export function NewCustomerForm({
  companySelect,
  createCustomer,
}: NewCustomerFormProps) {
  const t = useTranslations("customers.NewCustomerForm");

  const [state, action, pending] = useActionState(createCustomer, initialState);

  return (
    <FormBase id="new-customer-form" state={state} action={action}>
      <CustomerFullNameTextField />
      <CustomerBioTextField />
      <CustomerEmailTextField />
      <CustomerPhoneNumberTextField />
      <CustomerPublicLinkTextField />
      {companySelect}
      {state.status === "error" && (
        <ErrorBanner>{t("creationError")}</ErrorBanner>
      )}
    </FormBase>
  );
}
