"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { CustomerBioTextField } from "./CustomerBioTextField";
import { useUpdateCustomerBio } from "./UpdateCustomerBioContext";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

export interface UpdateCustomerBioFormProps {
  customerId: number;
  bio?: string;
}

export function UpdateCustomerBioForm({
  customerId,
  bio,
}: UpdateCustomerBioFormProps) {
  const t = useTranslations("customers.UpdateCustomerForm");

  const { state, action, isPending } = useUpdateCustomerBio();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-customer-bio-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        {customerId && <input type="hidden" name="id" value={customerId} />}
        <CustomerBioTextField defaultValue={bio} />

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
