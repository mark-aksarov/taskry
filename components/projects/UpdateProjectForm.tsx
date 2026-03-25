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
import { ProjectTitleTextField } from "./ProjectTitleTextField";
import { CustomerSelect } from "@/components/customer/CustomerSelect";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { ProjectDeadlineDatePicker } from "./ProjectDeadlineDatePicker";
import { ProjectDescriptionTextField } from "./ProjectDescriptionTextField";
import { ProjectCategorySelect } from "../projectCategory/ProjectCategorySelect";

interface UpdateProjectFormProps {
  projectId: number;
  title: string;
  description?: string;
  deadline: string;
  status: ProjectStatus;
  categoryId?: number;
  customerId?: number;
  projectCategorySelectItems: { id: number; name: string }[];
  customerSelectItems: { id: number; fullName: string }[];
}

export function UpdateProjectForm({
  projectId,
  title,
  description,
  deadline,
  status,
  categoryId,
  customerId,
  projectCategorySelectItems,
  customerSelectItems,
}: UpdateProjectFormProps) {
  const t = useTranslations("projects.UpdateProjectForm");

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
        <CustomerSelect
          defaultSelectedKey={customerId?.toString()}
          items={customerSelectItems}
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
