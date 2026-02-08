"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ErrorBanner } from "@/components/common/ErrorBanner";
import { CustomerBioTextField } from "../CustomerBioTextField";
import { CustomerEmailTextField } from "../CustomerEmailTextField";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { CustomerFullNameTextField } from "../CustomerFullNameTextField";
import { CustomerPublicLinkTextField } from "../CustomerPublicLinkTextField";
import { CustomerPhoneNumberTextField } from "../CustomerPhoneNumberTextField";
import { useCloseOverlayOnActionSuccess } from "@/lib/hooks/useCloseOverlayOnActionSuccess";

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

  useCloseOverlayOnActionSuccess(state);

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
        {state.status === "error" && !pending && (
          <ErrorBanner>{t("creationError")}</ErrorBanner>
        )}
      </FormBaseBody>
      <FormBaseFooter>
        <FormBaseSubmitButton label={t("submitButtonLabel")} />
      </FormBaseFooter>
    </FormBase>
  );
}
