"use client";

import {
  FilterCheckboxGroupWrapper,
  useFilterCheckboxGroupExpansion,
  FilterCheckboxGroupExpandButton,
} from "@/components/common/FilterCheckboxGroup";

import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";
import { useTaskCategoryCheckboxGroup } from "./TaskCategoryCheckboxGroupContext";

interface Item {
  id: number;
  name: string;
}

interface Props {
  items: Item[];
  disableExpansion?: boolean;
}

export function TaskCategoryCheckboxGroup({ items, disableExpansion }: Props) {
  const t = useTranslations("taskCategories.TaskCategoryCheckboxGroup");

  const { value, updateValue } = useTaskCategoryCheckboxGroup();

  const {
    isExpanded,
    setIsExpanded,
    visibleItems,
    hiddenItems,
    hiddenSelectedItems,
  } = useFilterCheckboxGroupExpansion(
    items,
    value,
    disableExpansion ? Number.MAX_VALUE : undefined,
  );

  const renderCheckbox = (item: Item, hidden = false) => (
    <Checkbox
      key={item.id}
      value={item.id.toString()}
      className={twMerge("font-normal capitalize", hidden && "hidden")}
      data-test="task-category-checkbox"
      data-id={item.id}
    >
      {item.name}
    </Checkbox>
  );

  return (
    <FilterCheckboxGroupWrapper>
      <CheckboxGroup
        label={t("label")}
        name="categoryIds"
        value={value}
        onChange={updateValue}
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
