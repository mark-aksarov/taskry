"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { DateValue } from "react-aria";
import { useTranslations } from "next-intl";
import { ProjectStatus } from "@/generated/prisma/enums";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ProjectStatusSelect } from "../ProjectStatusSelect";
import { ProjectCategorySelect } from "../ProjectCategorySelect";
import { ProjectCustomerSelect } from "../ProjectCustomerSelect";
import { ProjectTitleTextField } from "../ProjectTitleTextField";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { ProjectDeadlineDatePicker } from "../ProjectDeadlineDatePicker";
import { ProjectDescriptionTextField } from "../ProjectDescriptionTextField";
import { useUpdateProjectTransition } from "../UpdateProjectTransitionContext";
import { useUpdateEntityActionState } from "@/lib/hooks/useUpdateEntityActionState";

interface EditProjectFormProps {
  projectId: number;
  projectTitleDefaultValue: string;
  projectDescriptionDefaultValue?: string;
  projectDeadlineDefaultValue: DateValue;
  projectStatusDefaultValue: ProjectStatus;
  projectCategorySelectDefaultValue?: string;
  projectCustomerSelectDefaultValue?: string;
  projectCategorySelectItems: { id: number; name: string }[];
  projectCustomerSelectItems: { id: number; fullName: string }[];
  updateProject: ActionFn<ActionState, FormData>;
  mutate: () => void;
}

export function EditProjectForm({
  projectId,
  projectTitleDefaultValue,
  projectDescriptionDefaultValue,
  projectDeadlineDefaultValue,
  projectStatusDefaultValue,
  projectCategorySelectDefaultValue,
  projectCustomerSelectDefaultValue,
  projectCategorySelectItems,
  projectCustomerSelectItems,
  updateProject,
  mutate,
}: EditProjectFormProps) {
  const t = useTranslations("projects.EditProjectForm");

  const { startTransition } = useUpdateProjectTransition();

  const [state, action, isPending] = useUpdateEntityActionState({
    updateEntity: updateProject,
    onSuccess: mutate,
    successMessage: t("successMessage"),
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="edit-project-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        {projectId && <input type="hidden" name="id" value={projectId} />}
        <ProjectTitleTextField defaultValue={projectTitleDefaultValue} />
        <ProjectDescriptionTextField
          defaultValue={projectDescriptionDefaultValue}
        />
        <ProjectDeadlineDatePicker defaultValue={projectDeadlineDefaultValue} />
        <ProjectStatusSelect defaultSelectedKey={projectStatusDefaultValue} />
        <ProjectCategorySelect
          defaultSelectedKey={projectCategorySelectDefaultValue}
          items={projectCategorySelectItems}
        />
        <ProjectCustomerSelect
          defaultSelectedKey={projectCustomerSelectDefaultValue}
          items={projectCustomerSelectItems}
        />

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
