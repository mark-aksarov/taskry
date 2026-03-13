"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { CompanySelect } from "../company/CompanySelect";
import { useUpdateCustomer } from "./UpdateCustomerContext";
import { CustomerBioTextField } from "./CustomerBioTextField";
import { CustomerEmailTextField } from "./CustomerEmailTextField";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { CustomerFullNameTextField } from "./CustomerFullNameTextField";
import { CustomerPublicLinkTextField } from "./CustomerPublicLinkTextField";
import { CustomerPhoneNumberTextField } from "./CustomerPhoneNumberTextField";

interface EditCustomerFormProps {
  customerId: number;
  fullName: string;
  bio?: string;
  email: string;
  phoneNumber?: string;
  publicLink?: string;
  companyId?: number;
  companySelectItems: { id: number; name: string }[];
}

export function EditCustomerForm({
  customerId,
  fullName,
  bio,
  email,
  phoneNumber,
  publicLink,
  companyId,
  companySelectItems,
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

        <CustomerFullNameTextField defaultValue={fullName} />
        <CustomerBioTextField defaultValue={bio} />
        <CustomerEmailTextField defaultValue={email} />
        <CustomerPhoneNumberTextField defaultValue={phoneNumber} />
        <CustomerPublicLinkTextField defaultValue={publicLink} />
        <CompanySelect
          defaultSelectedKey={companyId?.toString()}
          items={companySelectItems}
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
