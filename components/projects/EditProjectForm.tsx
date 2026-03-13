"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { CalendarDate } from "@internationalized/date";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useUpdateProject } from "./UpdateProjectContext";
import { ProjectStatusSelect } from "./ProjectStatusSelect";
import { ProjectCategorySelect } from "./ProjectCategorySelect";
import { ProjectCustomerSelect } from "./ProjectCustomerSelect";
import { ProjectTitleTextField } from "./ProjectTitleTextField";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { ProjectDeadlineDatePicker } from "./ProjectDeadlineDatePicker";
import { ProjectDescriptionTextField } from "./ProjectDescriptionTextField";

interface EditProjectFormProps {
  projectId: number;
  title: string;
  description?: string;
  deadline: string;
  status: ProjectStatus;
  categoryId?: number;
  customerId?: number;
  projectCategorySelectItems: { id: number; name: string }[];
  projectCustomerSelectItems: { id: number; fullName: string }[];
}

export function EditProjectForm({
  projectId,
  title,
  description,
  deadline,
  status,
  categoryId,
  customerId,
  projectCategorySelectItems,
  projectCustomerSelectItems,
}: EditProjectFormProps) {
  const t = useTranslations("projects.EditProjectForm");

  const { state, isPending, action } = useUpdateProject();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  const d = new Date(deadline);
  const deadlineValue = new CalendarDate(
    d.getFullYear(),
    d.getMonth() + 1,
    d.getDate(),
  );

  return (
    <FormBase id="edit-project-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        {projectId && <input type="hidden" name="id" value={projectId} />}
        <ProjectTitleTextField defaultValue={title} />
        <ProjectDescriptionTextField defaultValue={description} />
        <ProjectDeadlineDatePicker defaultValue={deadlineValue} />
        <ProjectStatusSelect defaultSelectedKey={status} />
        <ProjectCategorySelect
          defaultSelectedKey={categoryId?.toString()}
          items={projectCategorySelectItems}
        />
        <ProjectCustomerSelect
          defaultSelectedKey={customerId?.toString()}
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
