import { CustomerFormBase } from "../CustomerFormBase";
import { ActionFn, ActionState } from "@/lib/actions/types";

interface EditCustomerFormProps {
  customerId: number;
  fullNameDefaultValue: string;
  bioDefaultValue: string;
  emailDefaultValue: string;
  phoneNumberDefaultValue: string;
  publicLinkDefaultValue: string;
  companySelect: React.ReactNode;
  formAction: ActionFn<ActionState, FormData>;
}

export function EditCustomerForm({
  customerId,
  fullNameDefaultValue,
  bioDefaultValue,
  emailDefaultValue,
  phoneNumberDefaultValue,
  publicLinkDefaultValue,
  companySelect,
  formAction,
}: EditCustomerFormProps) {
  return (
    <CustomerFormBase
      customerId={customerId}
      fullNameDefaultValue={fullNameDefaultValue}
      bioDefaultValue={bioDefaultValue}
      emailDefaultValue={emailDefaultValue}
      phoneNumberDefaultValue={phoneNumberDefaultValue}
      publicLinkDefaultValue={publicLinkDefaultValue}
      companySelect={companySelect}
      formId="edit-customer-form"
      formAction={formAction}
    />
  );
}
