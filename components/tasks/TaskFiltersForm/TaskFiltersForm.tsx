"use client";

import { RACForm } from "@/components/ui";
import { TextField } from "@/components/ui";
import { TaskStatusCheckboxGroup } from "../TaskStatusCheckboxGroup";
import { TaskFiltersDeadline } from "../TaskFiltersDeadline";

interface TaskFiltersFormProps {
  categoryCheckboxGroup: React.ReactNode;
  projectCheckboxGroup: React.ReactNode;
  creatorCheckboxGroup: React.ReactNode;
}

export function TaskFiltersForm({
  categoryCheckboxGroup,
  projectCheckboxGroup,
  creatorCheckboxGroup,
}: TaskFiltersFormProps) {
  return (
    <RACForm>
      <div className="flex flex-col gap-4">
        <TextField label="Title" placeholder="Title" />
        <TaskFiltersDeadline />
        <TaskStatusCheckboxGroup />
        {categoryCheckboxGroup}
        {projectCheckboxGroup}
        {creatorCheckboxGroup}
      </div>
    </RACForm>
  );
}
