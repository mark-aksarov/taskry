import { Company } from "@/generated/prisma";
import { Checkbox, CheckboxGroup } from "@/components/ui";

export function CustomerFiltersFormCompanyCheckboxGroup({
  companies,
}: {
  companies: Pick<Company, "id" | "name">[];
}) {
  if (!companies.length) {
    return null;
  }

  return (
    <CheckboxGroup label="Company">
      {companies.map((customer) => (
        <Checkbox
          key={customer.id}
          value={customer.id.toString()}
          className="font-normal capitalize"
        >
          {customer.name}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
