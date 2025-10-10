import { use } from "react";
import { Company } from "@/generated/prisma";
import { Checkbox, CheckboxGroup } from "@/components/ui";

export function CompanyCheckboxGroup({
  companiesPromise,
}: {
  companiesPromise: Promise<Company[]>;
}) {
  const companies = use(companiesPromise);
  const itemClasses = "capitalize font-normal";

  if (!companies.length) {
    return null;
  }

  return (
    <CheckboxGroup label="Company">
      {companies.map((customer) => (
        <Checkbox
          key={customer.id}
          value={customer.id.toString()}
          className={itemClasses}
        >
          {customer.name}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
