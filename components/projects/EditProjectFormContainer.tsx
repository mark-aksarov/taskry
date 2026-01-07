"use client";

import {
  ProjectFormBaseStatusSelect,
  ProjectFormBaseCategorySelect,
  ProjectFormBaseCustomerSelect,
} from "./ProjectFormBase";

import useSWR from "swr";
import { EditProjectForm } from "./EditProjectForm";
import { CalendarDate } from "@internationalized/date";
import { updateProject } from "@/lib/actions/project/updateProject";
import { ProjectFormDataDTO } from "@/lib/data/project/project.dto";
import { CustomerSummaryDTO } from "@/lib/data/customer/customer.dto";
import { ProjectCategorySummaryDTO } from "@/lib/data/projectCategory/projectCategory.dto";

export function EditProjectFormContainer({ projectId }: { projectId: number }) {
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

  if (!categories || !customers || !project) {
    throw new Error("Project not found");
  }

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
