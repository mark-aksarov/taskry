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
  name: string;
}

interface Props {
  items: Item[];
  disableExpansion?: boolean;
}

export function ProjectFiltersFormCategoryCheckboxGroup({
  items,
  disableExpansion,
}: Props) {
  const t = useTranslations("projects.ProjectFiltersFormCategoryCheckboxGroup");
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
    filters.category,
    disableExpansion ? Number.MAX_VALUE : undefined,
  );

  const renderCheckbox = (item: Item, hidden = false) => (
    <Checkbox
      key={item.id}
      value={item.id.toString()}
      className={twMerge("font-normal capitalize", hidden && "hidden")}
      data-test={`category-${item.id}-checkbox`}
    >
      {item.name}
    </Checkbox>
  );

  return (
    <FilterCheckboxGroupWrapper>
      <CheckboxGroup
        name="category"
        label={t("label")}
        value={filters.category}
        onChange={(value) =>
          dispatch({ type: "setCategory", payload: value as any })
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
