"use client";

import { RACForm } from "@/components/ui";
import { TextField } from "@/components/ui";
import { ProjectDeadline } from "../ProjectDeadline";

interface ProjectFiltersFormProps {
  projectStatusCheckboxGroup: React.ReactNode;
  projectCategoryCheckboxGroup: React.ReactNode;
  customerCheckboxGroup: React.ReactNode;
  userCheckboxGroup: React.ReactNode;
}

export function ProjectFiltersForm({
  projectStatusCheckboxGroup,
  projectCategoryCheckboxGroup,
  customerCheckboxGroup,
  userCheckboxGroup,
}: ProjectFiltersFormProps) {
  return (
    <RACForm>
      <div className="flex flex-col gap-4">
        <TextField label="Title" placeholder="Title" />
        <ProjectDeadline />
        {projectStatusCheckboxGroup}
        {projectCategoryCheckboxGroup}
        {customerCheckboxGroup}
        {userCheckboxGroup}
      </div>
    </RACForm>
  );
}
