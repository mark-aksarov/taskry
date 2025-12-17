import { useTranslations } from "next-intl";
import { Checkbox, CheckboxGroup } from "@/components/ui";

export function CustomerFiltersFormCompanyCheckboxGroup({
  companies,
}: {
  companies: { id: number; name: string }[];
}) {
  const t = useTranslations("customers.CustomerFiltersForm.company");

  return (
    <CheckboxGroup label={t("label")}>
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
