"use client";

import { RACForm } from "@/components/ui";
import { Button, TextField } from "@/components/ui";
import { TaskStatusCheckboxGroup } from "../TaskStatusCheckboxGroup";
import { TaskDeadline } from "../TaskDeadline";

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
    <RACForm className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <TextField label="Title" placeholder="Title" />
        <TaskStatusCheckboxGroup />
        {categoryCheckboxGroup}
        {projectCheckboxGroup}
        {creatorCheckboxGroup}
        <TaskDeadline />
      </div>
      <Button
        variant="primary"
        size="medium"
        label="Apply Filters"
        className="justify-center"
      />
    </RACForm>
  );
}
