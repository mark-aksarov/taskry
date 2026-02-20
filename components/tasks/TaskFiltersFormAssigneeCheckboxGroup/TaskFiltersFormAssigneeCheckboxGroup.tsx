"use client";

import { TaskFilters } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";
import { useExpandedItems } from "@/lib/hooks/useExpandedItems";
import { ExpandCollapseButton } from "@/components/common/ExpandCollapseButton";

export function TaskFiltersFormAssigneeCheckboxGroup({
  filters,
  users,
}: {
  filters?: TaskFilters;
  users: { id: string; fullName: string }[];
}) {
  const t = useTranslations("tasks.TaskFiltersFormAssigneeCheckboxGroup");
  const defaultValue = filters?.assignee?.map((id) => id.toString());
  const { isExpanded, setIsExpanded, expandedItems } = useExpandedItems(users);

  return (
    <>
      <CheckboxGroup
        label={t("label")}
        name="assignee"
        defaultValue={defaultValue}
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
