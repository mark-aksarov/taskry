"use client";

import { Form } from "react-aria-components";
import { Button } from "@/components/ui/Button";
import { ProjectDeadline } from "../ProjectDeadline";
import { TextField } from "@/components/ui/TextField";
import { ProjectStatusCheckboxGroup } from "../ProjectStatusCheckboxGroup";

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
    <Form className="flex flex-col gap-8">
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
    </Form>
  );
}
