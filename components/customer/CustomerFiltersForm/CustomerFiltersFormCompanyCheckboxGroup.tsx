"use client";

import {
  useCustomerFilters,
  useCustomerFiltersDispatch,
} from "../CustomerFiltersContext";

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
  name: string;
}

interface Props {
  items: Item[];
  disableExpansion?: boolean;
}

export function CustomerFiltersFormCompanyCheckboxGroup({
  items,
  disableExpansion,
}: Props) {
  const t = useTranslations(
    "customers.CustomerFiltersFormCompanyCheckboxGroup",
  );
  const filters = useCustomerFilters();
  const dispatch = useCustomerFiltersDispatch();

  const {
    isExpanded,
    setIsExpanded,
    visibleItems,
    hiddenItems,
    hiddenSelectedItems,
  } = useFilterCheckboxGroupExpansion(
    items,
    filters.company,
    disableExpansion ? Number.MAX_VALUE : undefined,
  );

  const renderCheckbox = (item: Item, hidden = false) => (
    <Checkbox
      key={item.id}
      value={item.id.toString()}
      className={twMerge("font-normal capitalize", hidden && "hidden")}
      data-test={`company-${item.id}-checkbox`}
    >
      {item.name}
    </Checkbox>
  );

  return (
    <FilterCheckboxGroupWrapper>
      <CheckboxGroup
        name="company"
        label={t("label")}
        value={filters.company}
        onChange={(value) =>
          dispatch({ type: "setCompany", payload: value as any })
        }
      >
        {visibleItems.map((item) => renderCheckbox(item))}
        {hiddenItems.map((item) => renderCheckbox(item, true))}
      </CheckboxGroup>

      <FilterCheckboxGroupExpandButton
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        hiddenSelectedItemNames={hiddenSelectedItems.map((item) => item.name)}
      />
    </FilterCheckboxGroupWrapper>
  );
}
