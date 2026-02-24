"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
  useFormBaseActionState,
} from "@/components/common/FormBase";

import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ProjectStatusSelect } from "../ProjectStatusSelect";
import { ProjectTitleTextField } from "../ProjectTitleTextField";
import { ProjectCategorySelect } from "../ProjectCategorySelect";
import { ProjectCustomerSelect } from "../ProjectCustomerSelect";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { ProjectDeadlineDatePicker } from "../ProjectDeadlineDatePicker";
import { ProjectDescriptionTextField } from "../ProjectDescriptionTextField";

interface NewProjectFormProps {
  projectCategorySelectItems: { id: number; name: string }[];
  projectCustomerSelectItems: { id: number; fullName: string }[];
  createProject: ActionFn<ActionState, FormData>;
}

export function NewProjectForm({
  projectCategorySelectItems,
  projectCustomerSelectItems,
  createProject,
}: NewProjectFormProps) {
  const t = useTranslations("projects.NewProjectForm");

  const [state, action, isPending] = useFormBaseActionState(createProject);

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
        <ProjectCategorySelect items={projectCategorySelectItems} />
        <ProjectCustomerSelect items={projectCustomerSelectItems} />
        <FormErrorBanner status={state.status} isPending={isPending}>
          {state.message}
        </FormErrorBanner>
      </FormBaseBody>
      <FormBaseFooter>
        <FormBaseSubmitButton
          isPending={isPending}
          label={t("submitButtonLabel")}
        />
      </FormBaseFooter>
    </FormBase>
  );
}
