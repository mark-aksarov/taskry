import { CustomerFormBase, CustomerFormBaseProps } from "./CustomerFormBase";

export function NewCustomerForm(props: Omit<CustomerFormBaseProps, "id">) {
  return <CustomerFormBase id="new-customer-form" {...props} />;
}
