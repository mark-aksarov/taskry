"use client";

import { TaskFilters } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";

export function TaskFiltersFormAssigneeCheckboxGroup({
  filters,
  users,
}: {
  filters: TaskFilters;
  users: { id: string; fullName: string }[];
}) {
  const t = useTranslations("tasks.TaskFiltersFormAssigneeCheckboxGroup");

  return (
    <CheckboxGroup
      label={t("label")}
      name="assignee"
      defaultValue={filters.assignee?.map((id) => id.toString())}
    >
      {users.map((user) => (
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
  );
}
