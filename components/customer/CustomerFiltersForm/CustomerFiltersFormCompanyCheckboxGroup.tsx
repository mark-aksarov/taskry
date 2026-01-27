import { useTranslations } from "next-intl";
import { CustomerFilters } from "@/lib/types";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";

interface CustomerFiltersFormCompanyCheckboxGroupProps {
  filters?: CustomerFilters;
  companies: { id: number; name: string }[];
}

export function CustomerFiltersFormCompanyCheckboxGroup({
  filters,
  companies,
}: CustomerFiltersFormCompanyCheckboxGroupProps) {
  const t = useTranslations(
    "customers.CustomerFiltersFormCompanyCheckboxGroup",
  );

  const defaultValue = filters?.company?.map((id) => id.toString());

  return (
    <CheckboxGroup
      name="company"
      label={t("label")}
      defaultValue={defaultValue}
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
