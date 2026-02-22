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

export function TaskFiltersFormProjectCheckboxGroup({
  projects,
}: {
  projects: { id: number; title: string }[];
}) {
  const t = useTranslations("tasks.TaskFiltersFormProjectCheckboxGroup");
  const { isExpanded, setIsExpanded, expandedItems } =
    useExpandedItems(projects);
  const filters = useTaskFilters();
  const dispatch = useTaskFiltersDispatch();

  return (
    <>
      <CheckboxGroup
        label={t("label")}
        name="project"
        value={filters?.project}
        onChange={(value) =>
          dispatch({ type: "setProject", payload: value as any })
        }
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
