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

export function ProjectFiltersFormCategoryCheckboxGroup({
  categories,
}: {
  categories: { id: number; name: string }[];
}) {
  const t = useTranslations("projects.ProjectFiltersFormCategoryCheckboxGroup");
  const { isExpanded, setIsExpanded, expandedItems } =
    useExpandedItems(categories);
  const filters = useProjectFilters();
  const dispatch = useProjectFiltersDispatch();

  return (
    <div>
      <CheckboxGroup
        name="category"
        label={t("label")}
        value={filters.category}
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
    </div>
  );
}
