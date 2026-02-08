"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { DateValue } from "react-aria";
import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { ProjectStatus } from "@/generated/prisma/enums";
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

interface EditProjectFormProps {
  projectId: number;
  projectTitleDefaultValue: string;
  projectDescriptionDefaultValue?: string;
  projectDeadlineDefaultValue: DateValue;
  projectStatusDefaultValue: ProjectStatus;
  projectCategorySelect: React.ReactNode;
  projectCustomerSelect?: React.ReactNode;
  updateProject: ActionFn<ActionState, FormData>;
}

export function EditProjectForm({
  projectId,
  projectTitleDefaultValue,
  projectDescriptionDefaultValue,
  projectDeadlineDefaultValue,
  projectStatusDefaultValue,
  projectCategorySelect,
  projectCustomerSelect,
  updateProject,
}: EditProjectFormProps) {
  const t = useTranslations("projects.EditProjectForm");

  const [state, action, pending] = useActionState(updateProject, initialState);

  useCloseOverlayOnActionSuccess(state);

  return (
    <FormBase
      id="edit-project-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
      <FormBaseBody>
        {projectId && <input type="hidden" name="id" value={projectId} />}
        <ProjectTitleTextField defaultValue={projectTitleDefaultValue} />
        <ProjectDescriptionTextField
          defaultValue={projectDescriptionDefaultValue}
        />
        <ProjectDeadlineDatePicker defaultValue={projectDeadlineDefaultValue} />
        <ProjectStatusSelect defaultSelectedKey={projectStatusDefaultValue} />
        {projectCategorySelect}
        {projectCustomerSelect}
        {state.status === "error" && (
          <ErrorBanner>{t("error.updateError")}</ErrorBanner>
        )}
      </FormBaseBody>
      <FormBaseFooter>
        <FormBaseSubmitButton label={t("submitButtonLabel")} />
      </FormBaseFooter>
    </FormBase>
  );
}
