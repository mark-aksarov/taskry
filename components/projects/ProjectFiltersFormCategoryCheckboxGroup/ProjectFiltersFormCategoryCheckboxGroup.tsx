"use client";

import { useTranslations } from "next-intl";
import { ProjectFilters } from "@/lib/types";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";
import { useExpandedItems } from "@/lib/hooks/useExpandedItems";
import { ExpandCollapseButton } from "@/components/common/ExpandCollapseButton";

export function ProjectFiltersFormCategoryCheckboxGroup({
  filters,
  categories,
}: {
  filters?: ProjectFilters;
  categories: { id: number; name: string }[];
}) {
  const t = useTranslations("projects.ProjectFiltersFormCategoryCheckboxGroup");
  const defaultValue = filters?.category?.map((id) => id.toString());
  const { isExpanded, setIsExpanded, expandedItems } =
    useExpandedItems(categories);

  return (
    <>
      <CheckboxGroup
        name="category"
        label={t("label")}
        defaultValue={defaultValue}
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
