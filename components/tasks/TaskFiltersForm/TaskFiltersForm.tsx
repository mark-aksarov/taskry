"use client";

import { RACForm } from "@/components/ui";
import { TextField } from "@/components/ui";
import { TaskFiltersDeadline } from "../TaskFiltersDeadline";

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
        <TextField label="Title" placeholder="Title" />
        <TaskFiltersDeadline />
        {statusCheckboxGroup}
        {categoryCheckboxGroup}
        {projectCheckboxGroup}
        {assigneeCheckboxGroup}
      </div>
    </RACForm>
  );
}
