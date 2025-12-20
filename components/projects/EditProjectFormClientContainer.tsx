"use client";

import {
  ProjectFormDataDTO,
  ProjectCategorySummaryDTO,
} from "@/lib/dto/project";

import {
  ProjectFormBaseStatusSelect,
  ProjectFormBaseCategorySelect,
  ProjectFormBaseCustomerSelect,
} from "./ProjectFormBase";

import useSWR from "swr";
import { EditProjectForm } from "./EditProjectForm";
import { CalendarDate } from "@internationalized/date";
import { CustomerSummaryDTO } from "@/lib/dto/customers";
import { updateProject } from "@/lib/actions/updateProject";

export function EditProjectFormClientContainer({
  projectId,
}: {
  projectId: number;
}) {
  const { data: categories } = useSWR<ProjectCategorySummaryDTO[]>(
    `/api/project-categories`,
    { suspense: true },
  );

  const { data: customers } = useSWR<CustomerSummaryDTO[]>(`/api/customers`, {
    suspense: true,
  });

  const { data: project } = useSWR<ProjectFormDataDTO>(
    `/api/projects/${projectId}?view=edit`,
    {
      suspense: true,
    },
  );

  if (!categories || !customers || !project) return null;

  const d = new Date(project.deadline);
  const dateValue = new CalendarDate(
    d.getFullYear(),
    d.getMonth() + 1,
    d.getDate(),
  );

  return (
    <EditProjectForm
      projectId={projectId}
      projectTitleDefaultValue={project.title}
      projectDescriptionDefaultValue={project.description}
      projectDeadlineDefaultValue={dateValue}
      projectCategorySelect={
        <ProjectFormBaseCategorySelect
          defaultSelectedKey={project.categoryId.toString()}
          categories={categories}
        />
      }
      projectCustomerSelect={
        <ProjectFormBaseCustomerSelect
          defaultSelectedKey={project.customerId?.toString()}
          customers={customers}
        />
      }
      projectStatusSelect={
        <ProjectFormBaseStatusSelect defaultSelectedKey={project.status} />
      }
      formAction={updateProject}
    />
  );
}
