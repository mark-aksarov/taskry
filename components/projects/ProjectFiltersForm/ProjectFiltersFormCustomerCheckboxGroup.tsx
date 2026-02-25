"use client";

import {
  useProjectFilters,
  useProjectFiltersDispatch,
} from "../ProjectFiltersContext";

import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";
import { useExpandedItems } from "@/lib/hooks/useExpandedItems";

import { ExpandCollapseButton } from "@/components/common/ExpandCollapseButton";

export function ProjectFiltersFormCustomerCheckboxGroup({
  items,
}: {
  items: { id: number; fullName: string }[];
}) {
  const t = useTranslations("projects.ProjectFiltersFormCustomerCheckboxGroup");
  const { isExpanded, setIsExpanded, expandedItems } = useExpandedItems(items);
  const filters = useProjectFilters();
  const dispatch = useProjectFiltersDispatch();

  return (
    <div>
      <CheckboxGroup
        name="customer"
        label={t("label")}
        value={filters.customer}
        onChange={(value) =>
          dispatch({ type: "setCustomer", payload: value as any })
        }
      >
        {expandedItems.map((customer) => (
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

      <ExpandCollapseButton
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
    </div>
  );
}
