"use client";

import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/Switch";
import { Divider, RACForm } from "@/components/ui";
import { ProjectFiltersFormDeadlineRange } from "./ProjectFiltersFormDeadlineRange";
import { ProjectFiltersFormDeadlineCheckboxGroup } from "./ProjectFiltersFormDeadlineCheckboxGroup";

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
  const t = useTranslations("projects.ProjectFiltersForm");

  return (
    <RACForm>
      <div className="flex flex-col gap-4">
        <Switch className="justify-between">{t("switchText")}</Switch>
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
