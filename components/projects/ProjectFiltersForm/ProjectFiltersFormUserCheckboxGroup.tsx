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

import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";
import { twMerge } from "tailwind-merge";

interface Item {
  id: string;
  fullName: string;
}

interface Props {
  items: Item[];
  disableExpansion?: boolean;
}

export function ProjectFiltersFormUserCheckboxGroup({
  items,
  disableExpansion,
}: Props) {
  const t = useTranslations("projects.ProjectFiltersFormUserCheckboxGroup");
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
    filters.user,
    disableExpansion ? Number.MAX_VALUE : undefined,
  );

  const renderCheckbox = (item: Item, hidden = false) => (
    <Checkbox
      key={item.id}
      value={item.id}
      className={twMerge("font-normal capitalize", hidden && "hidden")}
      data-test={`user-${item.id}-checkbox`}
    >
      {item.fullName}
    </Checkbox>
  );

  return (
    <FilterCheckboxGroupWrapper>
      <CheckboxGroup
        name="user"
        label={t("label")}
        value={filters.user}
        onChange={(value) =>
          dispatch({ type: "setUser", payload: value as any })
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
