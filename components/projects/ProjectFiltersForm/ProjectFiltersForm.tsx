"use client";

import { RACForm } from "@/components/ui";
import { Button, TextField } from "@/components/ui";
import { ProjectStatusCheckboxGroup } from "../ProjectStatusCheckboxGroup";
import { ProjectDeadline } from "../ProjectDeadline";

interface ProjectFiltersFormProps {
  projectCategoryCheckboxGroup: React.ReactNode;
  customerCheckboxGroup: React.ReactNode;
  userCheckboxGroup: React.ReactNode;
}

export function ProjectFiltersForm({
  projectCategoryCheckboxGroup,
  customerCheckboxGroup,
  userCheckboxGroup,
}: ProjectFiltersFormProps) {
  return (
    <RACForm className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <TextField label="Title" placeholder="Title" />
        <ProjectStatusCheckboxGroup />
        {projectCategoryCheckboxGroup}
        {customerCheckboxGroup}
        {userCheckboxGroup}
        <ProjectDeadline />
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
