"use client";

import {
  useProjectFilters,
  useProjectFiltersDispatch,
} from "../ProjectFiltersContext";

import {
  FilterCheckboxGroupExpandButton,
  FilterCheckboxGroupWrapper,
  useFilterCheckboxGroupExpansion,
} from "@/components/common/FilterCheckboxGroup";

import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";

interface Item {
  id: number;
  fullName: string;
}

interface Props {
  items: Item[];
  disableExpansion?: boolean;
}

export function ProjectFiltersFormCustomerCheckboxGroup({
  items,
  disableExpansion,
}: Props) {
  const t = useTranslations("projects.ProjectFiltersFormCustomerCheckboxGroup");
  const filters = useProjectFilters();
  const dispatch = useProjectFiltersDispatch();

  const {
    isExpanded,
    setIsExpanded,
    visibleItems,
    hiddenItems,
    hiddenSelectedItems,
  } = useFilterCheckboxGroupExpansion(
    items,
    filters.customer,
    disableExpansion ? Number.MAX_VALUE : undefined,
  );

  const renderCheckbox = (item: Item, hidden = false) => (
    <Checkbox
      key={item.id}
      value={item.id.toString()}
      className={twMerge("font-normal capitalize", hidden && "hidden")}
      data-test={`customer-${item.id}-checkbox`}
    >
      {item.fullName}
    </Checkbox>
  );

  return (
    <FilterCheckboxGroupWrapper>
      <CheckboxGroup
        name="customer"
        label={t("label")}
        value={filters.customer}
        onChange={(value) =>
          dispatch({ type: "setCustomer", payload: value as any })
        }
      >
        {visibleItems.map((item) => renderCheckbox(item))}
        {hiddenItems.map((item) => renderCheckbox(item, true))}
      </CheckboxGroup>

      <FilterCheckboxGroupExpandButton
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        hiddenSelectedItemNames={hiddenSelectedItems.map(
          (item) => item.fullName,
        )}
      />
    </FilterCheckboxGroupWrapper>
  );
}
