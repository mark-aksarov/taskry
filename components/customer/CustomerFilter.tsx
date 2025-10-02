import { getCustomers } from "@/lib/queries/customers";
import { CheckboxGroup } from "react-aria-components";
import { fieldStyles, Label } from "../ui/Field";
import { Checkbox } from "../ui/Checkbox";

export async function CustomerFilter() {
  const customers = await getCustomers(1);
  const itemClasses = "capitalize font-normal";

  if (!customers.length) {
    return null;
  }

  return (
    <CheckboxGroup className={fieldStyles()}>
      <Label>Customer</Label>
      {customers.map((customer) => (
        <Checkbox value={customer.id.toString()} className={itemClasses}>
          {customer.fullName}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
