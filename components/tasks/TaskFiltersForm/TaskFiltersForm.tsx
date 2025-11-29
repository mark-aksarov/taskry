"use client";

import { Divider, RACForm } from "@/components/ui";
import { TaskFiltersFormDeadlineRange } from "./TaskFiltersFormDeadlineRange";
import { TaskFiltersFormDeadlineCheckboxGroup } from "./TaskFiltersFormDeadlineCheckboxGroup";

interface TaskFiltersFormProps {
  statusCheckboxGroup: React.ReactNode;
  categoryCheckboxGroup: React.ReactNode;
  projectCheckboxGroup: React.ReactNode;
  assigneeCheckboxGroup: React.ReactNode;
}

export function TaskFiltersForm({
  statusCheckboxGroup,
  categoryCheckboxGroup,
  projectCheckboxGroup,
  assigneeCheckboxGroup,
}: TaskFiltersFormProps) {
  return (
    <RACForm>
      <div className="flex flex-col gap-4">
        <TaskFiltersFormDeadlineCheckboxGroup />
        <Divider />

        <TaskFiltersFormDeadlineRange />
        <Divider />

        {statusCheckboxGroup}
        <Divider />

        {categoryCheckboxGroup}
        <Divider />

        {projectCheckboxGroup}
        <Divider />

        {assigneeCheckboxGroup}
      </div>
    </RACForm>
  );
}
