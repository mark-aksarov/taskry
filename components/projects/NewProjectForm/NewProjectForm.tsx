"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { FormBase } from "@/components/common/FormBase";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ProjectStatusSelect } from "../ProjectStatusSelect";
import { ErrorBanner } from "@/components/common/ErrorBanner";
import { ProjectTitleTextField } from "../ProjectTitleTextField";
import { ProjectDeadlineDatePicker } from "../ProjectDeadlineDatePicker";
import { ProjectDescriptionTextField } from "../ProjectDescriptionTextField";

const initialState: ActionState = {
  status: null,
};

interface NewProjectFormProps {
  projectCategorySelect: React.ReactNode;
  projectCustomerSelect: React.ReactNode;
  createProject: ActionFn<ActionState, FormData>;
}

export function NewProjectForm({
  projectCategorySelect,
  projectCustomerSelect,
  createProject,
}: NewProjectFormProps) {
  const t = useTranslations("projects.NewProjectForm");

  const [state, action, pending] = useActionState(createProject, initialState);

  return (
    <FormBase id="new-project-form" state={state} action={action}>
      <ProjectTitleTextField />
      <ProjectDescriptionTextField />
      <ProjectDeadlineDatePicker />
      <ProjectStatusSelect />
      {projectCategorySelect}
      {projectCustomerSelect}
      {state.status === "error" && (
        <ErrorBanner>{t("error.creationError")}</ErrorBanner>
      )}
    </FormBase>
  );
}
