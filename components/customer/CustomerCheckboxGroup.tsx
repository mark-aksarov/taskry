import { use } from "react";
import { Customer } from "@/generated/prisma";
import { Checkbox, CheckboxGroup } from "@/components/ui";

export function CustomerCheckboxGroup({
  customersPromise,
}: {
  customersPromise: Promise<Customer[]>;
}) {
  const customers = use(customersPromise);
  const itemClasses = "capitalize font-normal";

  if (!customers.length) {
    return null;
  }

  return (
    <CheckboxGroup label="Customer">
      {customers.map((customer) => (
        <Checkbox
          key={customer.id}
          value={customer.id.toString()}
          className={itemClasses}
        >
          {customer.fullName}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
