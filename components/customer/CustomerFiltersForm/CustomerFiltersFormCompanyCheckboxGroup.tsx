import { useTranslations } from "next-intl";
import { Company } from "@/generated/prisma";
import { Checkbox, CheckboxGroup } from "@/components/ui";

export function CustomerFiltersFormCompanyCheckboxGroup({
  companies,
}: {
  companies: Pick<Company, "id" | "name">[];
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
