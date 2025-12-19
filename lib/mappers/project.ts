import {
  ProjectDetailDTO,
  ProjectSummaryDTO,
  ProjectListItemDTO,
  ProjectCategorySummaryDTO,
  ProjectFormDataDTO,
} from "../dto/project";

import {
  ProjectDetailType,
  ProjectSummaryType,
  ProjectListItemType,
  ProjectCategorySummaryType,
  ProjectFormDataType,
} from "../types/projects";

export function mapProjectSummaryToDTO(
  project: ProjectSummaryType,
): ProjectSummaryDTO {
  return {
    id: project.id,
    title: project.title,
  };
}

export const mapProjectFormDataToDTO = (
  project: ProjectFormDataType,
): ProjectFormDataDTO => {
  return {
    id: project.id,
    title: project.title,
    description: project.description ?? "",
    deadline: project.deadline,
    categoryId: project.categoryId,
    status: project.status,
    customerId: project.customerId ?? undefined,
  };
};

export function mapProjectDetailToDTO(
  project: ProjectDetailType,
): ProjectDetailDTO {
  return {
    id: project.id,
    title: project.title,
    description: project.description ?? undefined,
    deadline: project.deadline,
    status: project.status,
    creator: project.creator
      ? {
          id: project.creator.id,
          fullName: project.creator.fullName,
          imageUrl: project.creator.imageUrl ?? undefined,
        }
      : undefined,
    customer: project.customer ?? undefined,
    category: project.category,
    attachments: project.attachments,
  };
}

export function mapProjectListItemToDTO(
  project: ProjectListItemType,
): ProjectListItemDTO {
  const completedTasks = project.tasks.filter(
    (t: any) => t.status === "completed",
  ).length;

  return {
    id: project.id,
    title: project.title,
    deadline: project.deadline,
    status: project.status,

    creator: project.creator
      ? {
          id: project.creator.id,
          fullName: project.creator.fullName,
          imageUrl: project.creator.imageUrl ?? undefined,
        }
      : undefined,

    category: project.category,

    customer: project.customer
      ? {
          ...project.customer,
          imageUrl: project.customer.imageUrl ?? undefined,
          company: project.customer.company ?? undefined,
        }
      : undefined,

    commentsCount: project._count.comments,

    tasks: {
      total: project.tasks.length,
      completed: completedTasks,
    },
  };
}

export function mapProjectCategorySummaryToDTO(
  category: ProjectCategorySummaryType,
): ProjectCategorySummaryDTO {
  return {
    id: category.id,
    name: category.name,
  };
}
