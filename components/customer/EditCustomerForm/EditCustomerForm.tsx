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

  useCloseOverlayOnActionSuccess(state);

  return (
    <FormBase
      id="edit-customer-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
      <FormBaseBody>
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
      </FormBaseBody>
      <FormBaseFooter>
        <FormBaseSubmitButton label={t("submitButtonLabel")} />
      </FormBaseFooter>
    </FormBase>
  );
}
