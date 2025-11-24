"use client";

import { Divider, RACForm } from "@/components/ui";
import { ProjectFiltersFormDeadlineRange } from "./ProjectFiltersFormDeadlineRange";
import { ProjectFiltersFormDeadlineCheckboxGroup } from "./ProjectFiltersFormDeadlineCheckboxGroup";
import { Switch } from "@/components/ui/Switch";

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
        <Switch className="justify-between">Has not active tasks</Switch>
        <Divider />

        <ProjectFiltersFormDeadlineCheckboxGroup />
        <Divider />

        <ProjectFiltersFormDeadlineRange />
        <Divider />

        {projectStatusCheckboxGroup}
        <Divider />

        {projectCategoryCheckboxGroup}
        <Divider />

        {customerCheckboxGroup}
        <Divider />

        {userCheckboxGroup}
      </div>
    </RACForm>
  );
}
