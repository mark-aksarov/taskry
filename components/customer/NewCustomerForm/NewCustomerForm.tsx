"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { useTranslations } from "next-intl";
import { startTransition, useRef } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { CustomerBioTextField } from "../CustomerBioTextField";
import { CustomerCompanySelect } from "../CustomerCompanySelect";
import { CustomerEmailTextField } from "../CustomerEmailTextField";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { CustomerFullNameTextField } from "../CustomerFullNameTextField";
import { CustomerPublicLinkTextField } from "../CustomerPublicLinkTextField";
import { CustomerPhoneNumberTextField } from "../CustomerPhoneNumberTextField";
import { useCreateEntityActionState } from "@/lib/hooks/useCreateEntityActionState";

interface NewCustomerFormProps {
  companySelectItems: { id: number; name: string }[];
  createCustomer: ActionFn<ActionState, FormData>;
}

export function NewCustomerForm({
  companySelectItems,
  createCustomer,
}: NewCustomerFormProps) {
  const t = useTranslations("customers.NewCustomerForm");

  // The ref is used inside reducerAction
  // ref.current is null on unmount, preventing programmatic modal close when opening another form in the same modal
  const ref = useRef<HTMLFormElement>(null);

  const [state, action, isPending] = useCreateEntityActionState({
    createEntity: createCustomer,
    formRef: ref,
    successMessage: t("successMessage"),
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase ref={ref} id="new-customer-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <CustomerFullNameTextField />
        <CustomerBioTextField />
        <CustomerEmailTextField />
        <CustomerPhoneNumberTextField />
        <CustomerPublicLinkTextField />
        <CustomerCompanySelect items={companySelectItems} />
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
