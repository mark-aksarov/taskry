"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ProjectStatusSelect } from "../ProjectStatusSelect";
import { ErrorBanner } from "@/components/common/ErrorBanner";
import { ProjectTitleTextField } from "../ProjectTitleTextField";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { ProjectDeadlineDatePicker } from "../ProjectDeadlineDatePicker";
import { ProjectDescriptionTextField } from "../ProjectDescriptionTextField";
import { useCloseOverlayOnActionSuccess } from "@/lib/hooks/useCloseOverlayOnActionSuccess";

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

  useCloseOverlayOnActionSuccess(state);

  return (
    <FormBase
      id="new-project-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
      <FormBaseBody>
        <ProjectTitleTextField />
        <ProjectDescriptionTextField />
        <ProjectDeadlineDatePicker />
        <ProjectStatusSelect />
        {projectCategorySelect}
        {projectCustomerSelect}
        {state.status === "error" && (
          <ErrorBanner>{t("error.creationError")}</ErrorBanner>
        )}
      </FormBaseBody>
      <FormBaseFooter>
        <FormBaseSubmitButton label={t("submitButtonLabel")} />
      </FormBaseFooter>
    </FormBase>
  );
}
