import { CustomerFormBase, CustomerFormBaseProps } from "../CustomerFormBase";

export function EditCustomerForm(props: Omit<CustomerFormBaseProps, "id">) {
  return <CustomerFormBase id="edit-customer-form" {...props} />;
}
