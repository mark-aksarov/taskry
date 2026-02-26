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

interface NewCustomerFormProps {
  companySelectItems: { id: number; name: string }[];
  createCustomer: ActionFn<ActionState, FormData>;
}

export function NewCustomerForm({
  companySelectItems,
  createCustomer,
}: NewCustomerFormProps) {
  const t = useTranslations("customers.NewCustomerForm");

  // The ref is used inside reducerAction in useFormBaseActionState.
  // ref.current in useFormBaseActionState is null on unmount, preventing programmatic modal close when opening another form.
  const ref = useRef<HTMLFormElement>(null);

  const [state, action, isPending] = useFormBaseActionState(
    createCustomer,
    ref,
    t("successMessage"),
  );

  return (
    <FormBase
      ref={ref}
      id="new-customer-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
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
