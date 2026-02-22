"use client";

import {
  useTaskFilters,
  useTaskFiltersDispatch,
} from "@/components/tasks/TaskFiltersContext/TaskFiltersContext";

import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";
import { useExpandedItems } from "@/lib/hooks/useExpandedItems";
import { ExpandCollapseButton } from "@/components/common/ExpandCollapseButton";

export function TaskFiltersFormCategoryCheckboxGroup({
  categories,
}: {
  categories: { id: number; name: string }[];
}) {
  const t = useTranslations("tasks.TaskFiltersFormCategoryCheckboxGroup");
  const { isExpanded, setIsExpanded, expandedItems } =
    useExpandedItems(categories);
  const filters = useTaskFilters();
  const dispatch = useTaskFiltersDispatch();

  return (
    <>
      <CheckboxGroup
        label={t("label")}
        name="category"
        value={filters?.category}
        onChange={(value) =>
          dispatch({ type: "setCategory", payload: value as any })
        }
      >
        {expandedItems.map((item) => (
          <Checkbox
            data-test={`category-${item.id}-checkbox`}
            key={item.id}
            value={item.id.toString()}
            className="font-normal capitalize"
          >
            {item.name}
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
