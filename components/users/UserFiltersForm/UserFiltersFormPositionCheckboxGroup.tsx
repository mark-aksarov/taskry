"use client";

import {
  FilterCheckboxGroupExpandButton,
  FilterCheckboxGroupWrapper,
  useFilterCheckboxGroupExpansion,
} from "@/components/common/FilterCheckboxGroup";

import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";
import { useUserFilters, useUserFiltersDispatch } from "../UserFiltersContext";

interface Item {
  id: number;
  name: string;
}

interface Props {
  items: Item[];
  disableExpansion?: boolean;
}

export function UserFiltersFormPositionCheckboxGroup({
  items,
  disableExpansion,
}: Props) {
  const t = useTranslations("users.UserFiltersFormPositionCheckboxGroup");
  const filters = useUserFilters();
  const dispatch = useUserFiltersDispatch();

  const {
    isExpanded,
    setIsExpanded,
    visibleItems,
    hiddenItems,
    hiddenSelectedItems,
  } = useFilterCheckboxGroupExpansion(
    items,
    filters.position,
    disableExpansion ? Number.MAX_VALUE : undefined,
  );

  const renderCheckbox = (item: Item, hidden = false) => (
    <Checkbox
      key={item.id}
      value={item.id.toString()}
      className={twMerge("font-normal capitalize", hidden && "hidden")}
      data-test={`position-${item.id}-checkbox`}
    >
      {item.name}
    </Checkbox>
  );

  return (
    <FilterCheckboxGroupWrapper>
      <CheckboxGroup
        name="position"
        label={t("label")}
        value={filters.position}
        onChange={(value) =>
          dispatch({ type: "setPosition", payload: value as any })
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
