import { CustomerFormBase } from "../CustomerFormBase";
import { ActionFn, ActionState } from "@/lib/actions/types";

interface NewCustomerFormProps {
  companySelect: React.ReactNode;
  formAction: ActionFn<ActionState, FormData>;
}

export function NewCustomerForm({
  companySelect,
  formAction,
}: NewCustomerFormProps) {
  return (
    <CustomerFormBase
      formId="new-customer-form"
      companySelect={companySelect}
      formAction={formAction}
    />
  );
}
