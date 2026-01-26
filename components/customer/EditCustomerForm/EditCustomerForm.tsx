import { CustomerFormBase, CustomerFormBaseProps } from "../CustomerFormBase";

export function EditCustomerForm(props: Omit<CustomerFormBaseProps, "formId">) {
  return <CustomerFormBase formId="edit-customer-form" {...props} />;
}
