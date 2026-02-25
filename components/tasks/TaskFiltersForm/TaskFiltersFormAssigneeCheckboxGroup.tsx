"use client";

import {
  useTaskFilters,
  useTaskFiltersDispatch,
} from "@/components/tasks/TaskFiltersContext";

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
  id: string;
  fullName: string;
}

export function TaskFiltersFormAssigneeCheckboxGroup({
  items,
}: {
  items: Item[];
}) {
  const t = useTranslations("tasks.TaskFiltersFormAssigneeCheckboxGroup");
  const filters = useTaskFilters();
  const dispatch = useTaskFiltersDispatch();

  const {
    isExpanded,
    setIsExpanded,
    visibleItems,
    hiddenItems,
    hiddenSelectedItems,
  } = useFilterCheckboxGroupExpansion(items, filters.assignee);

  const renderCheckbox = (item: Item, hidden = false) => (
    <Checkbox
      key={item.id}
      value={item.id}
      className={twMerge("font-normal capitalize", hidden && "hidden")}
      data-test={`assignee-${item.id}-checkbox`}
    >
      {item.fullName}
    </Checkbox>
  );

  return (
    <FilterCheckboxGroupWrapper>
      <CheckboxGroup
        label={t("label")}
        name="assignee"
        value={filters?.assignee}
        onChange={(value) =>
          dispatch({ type: "setAssignee", payload: value as any })
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
