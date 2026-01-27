import { useTranslations } from "next-intl";
import { ProjectFilters } from "@/lib/types";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";

export function ProjectFiltersFormCustomerCheckboxGroup({
  filters,
  customers,
}: {
  filters?: ProjectFilters;
  customers: { id: number; fullName: string }[];
}) {
  const t = useTranslations("projects.ProjectFiltersFormCustomerCheckboxGroup");

  const defaultValue = filters?.customer?.map((id) => id.toString());

  return (
    <CheckboxGroup
      name="customer"
      label={t("label")}
      defaultValue={defaultValue}
    >
      {customers.map((customer) => (
        <Checkbox
          data-test={`customer-${customer.id}-checkbox`}
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
