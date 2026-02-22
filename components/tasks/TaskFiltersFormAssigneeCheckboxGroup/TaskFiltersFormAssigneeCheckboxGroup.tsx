"use client";

import {
  useTaskFilters,
  useTaskFiltersDispatch,
} from "@/components/tasks/TaskFiltersContext";

import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";
import { useExpandedItems } from "@/lib/hooks/useExpandedItems";
import { ExpandCollapseButton } from "@/components/common/ExpandCollapseButton";

export function TaskFiltersFormAssigneeCheckboxGroup({
  users,
}: {
  users: { id: string; fullName: string }[];
}) {
  const t = useTranslations("tasks.TaskFiltersFormAssigneeCheckboxGroup");
  const { isExpanded, setIsExpanded, expandedItems } = useExpandedItems(users);
  const filters = useTaskFilters();
  const dispatch = useTaskFiltersDispatch();

  return (
    <>
      <CheckboxGroup
        label={t("label")}
        name="assignee"
        value={filters?.assignee}
        onChange={(value) =>
          dispatch({ type: "setAssignee", payload: value as any })
        }
      >
        {expandedItems.map((user) => (
          <Checkbox
            data-test={`assignee-${user.id}-checkbox`}
            key={user.id}
            value={user.id.toString()}
            className="font-normal capitalize"
          >
            {user.fullName}
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
