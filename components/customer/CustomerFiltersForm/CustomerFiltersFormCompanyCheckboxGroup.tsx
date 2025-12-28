import { useTranslations } from "next-intl";
import { CustomerFilters } from "@/lib/types";
import { Checkbox, CheckboxGroup } from "@/components/ui";

interface CustomerFiltersFormCompanyCheckboxGroupProps {
  filters: CustomerFilters;
  companies: { id: number; name: string }[];
}

export function CustomerFiltersFormCompanyCheckboxGroup({
  filters,
  companies,
}: CustomerFiltersFormCompanyCheckboxGroupProps) {
  const t = useTranslations("customers.CustomerFiltersForm.company");

  return (
    <CheckboxGroup
      name="company"
      label={t("label")}
      defaultValue={filters.company.map((id) => id.toString())}
    >
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
