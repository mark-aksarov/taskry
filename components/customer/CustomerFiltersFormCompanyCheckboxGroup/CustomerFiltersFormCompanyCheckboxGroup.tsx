"use client";

import { useTranslations } from "next-intl";
import { CustomerFilters } from "@/lib/types";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";
import { useExpandedItems } from "@/lib/hooks/useExpandedItems";
import { ExpandCollapseButton } from "@/components/common/ExpandCollapseButton";

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
  const { isExpanded, setIsExpanded, expandedItems } =
    useExpandedItems(companies);

  return (
    <>
      <CheckboxGroup
        name="company"
        label={t("label")}
        defaultValue={defaultValue}
      >
        {expandedItems.map((customer) => (
          <Checkbox
            key={customer.id}
            value={customer.id.toString()}
            className="font-normal capitalize"
          >
            {customer.name}
          </Checkbox>
        ))}
      </CheckboxGroup>

      <ExpandCollapseButton
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
    </>
  );
}
