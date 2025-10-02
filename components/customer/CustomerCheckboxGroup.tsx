"use client";

import { CheckboxGroup } from "react-aria-components";
import { fieldStyles, Label } from "../ui/Field";
import { Checkbox } from "../ui/Checkbox";
import { Customer } from "@/generated/prisma";
import { use } from "react";

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
    <CheckboxGroup className={fieldStyles()}>
      <Label>Customer</Label>
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
