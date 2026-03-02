"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { useUpdateCustomer } from "../UpdateCustomerContext";
import { CustomerBioTextField } from "../CustomerBioTextField";
import { CustomerCompanySelect } from "../CustomerCompanySelect";
import { CustomerEmailTextField } from "../CustomerEmailTextField";
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
}: EditCustomerFormProps) {
  const t = useTranslations("customers.EditCustomerForm");

  const { state, isPending, action } = useUpdateCustomer();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="edit-customer-form" onSubmit={handleSubmit}>
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
