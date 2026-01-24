import { CustomerFormBase } from "../CustomerFormBase";
import { CustomerFormBaseProps } from "../CustomerFormBase/CustomerFormBase";

export function EditCustomerForm(props: Omit<CustomerFormBaseProps, "formId">) {
  return <CustomerFormBase formId="edit-customer-form" {...props} />;
}
