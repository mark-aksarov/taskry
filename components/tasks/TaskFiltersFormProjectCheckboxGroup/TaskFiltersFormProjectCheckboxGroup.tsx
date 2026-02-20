"use client";

import { TaskFilters } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";
import { useExpandedItems } from "@/lib/hooks/useExpandedItems";
import { ExpandCollapseButton } from "@/components/common/ExpandCollapseButton";

export function TaskFiltersFormProjectCheckboxGroup({
  filters,
  projects,
}: {
  filters?: TaskFilters;
  projects: { id: number; title: string }[];
}) {
  const t = useTranslations("tasks.TaskFiltersFormProjectCheckboxGroup");
  const defaultValue = filters?.project?.map((id) => id.toString());
  const { isExpanded, setIsExpanded, expandedItems } =
    useExpandedItems(projects);

  return (
    <>
      <CheckboxGroup
        label={t("label")}
        name="project"
        defaultValue={defaultValue}
      >
        {expandedItems.map((item) => (
          <Checkbox
            data-test={`project-${item.id}-checkbox`}
            key={item.id}
            value={item.id.toString()}
            className="font-normal capitalize"
          >
            {item.title}
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
