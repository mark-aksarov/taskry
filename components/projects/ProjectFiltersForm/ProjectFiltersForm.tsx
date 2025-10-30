"use client";

import { RACForm } from "@/components/ui";
import { TextField } from "@/components/ui";
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
    <RACForm>
      <div className="flex flex-col gap-4">
        <TextField label="Title" placeholder="Title" />
        <ProjectDeadline />
        <ProjectStatusCheckboxGroup />
        {projectCategoryCheckboxGroup}
        {customerCheckboxGroup}
        {userCheckboxGroup}
      </div>
    </RACForm>
  );
}
