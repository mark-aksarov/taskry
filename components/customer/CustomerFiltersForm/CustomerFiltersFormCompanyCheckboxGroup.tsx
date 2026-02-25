"use client";

import {
  useCustomerFilters,
  useCustomerFiltersDispatch,
} from "../CustomerFiltersContext";

import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";
import { useExpandedItems } from "@/lib/hooks/useExpandedItems";
import { ExpandCollapseButton } from "@/components/common/ExpandCollapseButton";

interface CustomerFiltersFormCompanyCheckboxGroupProps {
  items: { id: number; name: string }[];
}

export function CustomerFiltersFormCompanyCheckboxGroup({
  items,
}: CustomerFiltersFormCompanyCheckboxGroupProps) {
  const t = useTranslations(
    "customers.CustomerFiltersFormCompanyCheckboxGroup",
  );
  const { isExpanded, setIsExpanded, expandedItems } = useExpandedItems(items);
  const filters = useCustomerFilters();
  const dispatch = useCustomerFiltersDispatch();

  return (
    <div>
      <CheckboxGroup
        name="company"
        label={t("label")}
        value={filters.company}
        onChange={(value) =>
          dispatch({ type: "setCompany", payload: value as any })
        }
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
    </div>
  );
}
