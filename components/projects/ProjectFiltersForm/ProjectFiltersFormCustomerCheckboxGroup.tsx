import { Checkbox, CheckboxGroup } from "@/components/ui";
import { useTranslations } from "next-intl";

export function ProjectFiltersFormCustomerCheckboxGroup({
  customers,
}: {
  customers: { id: number; fullName: string }[];
}) {
  const t = useTranslations(
    "projects.ProjectFiltersForm.ProjectFiltersFormCustomerCheckboxGroup",
  );

  return (
    <CheckboxGroup label={t("label")}>
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
