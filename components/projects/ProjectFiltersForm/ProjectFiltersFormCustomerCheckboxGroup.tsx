import { Checkbox, CheckboxGroup } from "@/components/ui";

export function ProjectFiltersFormCustomerCheckboxGroup({
  customers,
}: {
  customers: { id: number; fullName: string }[];
}) {
  if (!customers.length) {
    return null;
  }

  return (
    <CheckboxGroup label="Customer">
      {customers.map((customer) => (
        <Checkbox
          key={customer.id}
          value={customer.id.toString()}
          className="font-normal capitalize"
        >
          {customer.fullName}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
