import { useTranslations } from "next-intl";
import { Checkbox, CheckboxGroup } from "@/components/ui";
import { CustomerFilters } from "@/lib/data/customer/customer.dto";

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
