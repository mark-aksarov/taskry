"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { CustomerPublicLinkTextField } from "./CustomerPublicLinkTextField";
import { useUpdateCustomerPublicLink } from "./UpdateCustomerPublicLinkContext";

export interface UpdateCustomerPublicLinkFormProps {
  customerId: number;
  publicLink?: string;
}

export function UpdateCustomerPublicLinkForm({
  customerId,
  publicLink,
}: UpdateCustomerPublicLinkFormProps) {
  const t = useTranslations("customers.UpdateCustomerPublicLinkForm");

  const { state, action, isPending } = useUpdateCustomerPublicLink();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-customer-public-link-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        {customerId && <input type="hidden" name="id" value={customerId} />}
        <CustomerPublicLinkTextField defaultValue={publicLink} />

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
