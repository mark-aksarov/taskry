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

interface NewCustomerFormProps {
  companySelect: React.ReactNode;
  createCustomer: ActionFn<ActionState, FormData>;
}

export function NewCustomerForm({
  companySelect,
  createCustomer,
}: NewCustomerFormProps) {
  const t = useTranslations("customers.NewCustomerForm");

  const [state, action, isPending] = useFormBaseActionState(createCustomer);

  return (
    <FormBase
      id="new-customer-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
      <FormBaseBody>
        <CustomerFullNameTextField />
        <CustomerBioTextField />
        <CustomerEmailTextField />
        <CustomerPhoneNumberTextField />
        <CustomerPublicLinkTextField />
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
