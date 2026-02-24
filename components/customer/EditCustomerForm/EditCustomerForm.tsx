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
import { CustomerCompanySelect } from "../CustomerCompanySelect";

interface EditCustomerFormProps {
  customerId: number;
  customerFullNameDefaultValue: string;
  customerBioDefaultValue?: string;
  customerEmailDefaultValue: string;
  customerPhoneNumberDefaultValue?: string;
  customerPublicLinkDefaultValue?: string;
  customerCompanyDefaultValue?: string;
  customerCompanySelectItems: { id: number; name: string }[];
  updateCustomer: ActionFn<ActionState, FormData>;
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
  updateCustomer,
}: EditCustomerFormProps) {
  const t = useTranslations("customers.EditCustomerForm");

  const [state, action, isPending] = useFormBaseActionState(updateCustomer);

  return (
    <FormBase
      id="edit-customer-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
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
