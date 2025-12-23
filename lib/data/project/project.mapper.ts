import * as DTO from "./project.dto";
import * as Type from "./project.select";

/**
 * Common sub-mappers to avoid repetition
 */
const mapCreator = (creator: any) =>
  creator
    ? {
        id: creator.id,
        fullName: creator.fullName,
        imageUrl: creator.imageUrl ?? undefined,
      }
    : undefined;

const mapCustomer = (customer: any) =>
  customer
    ? {
        id: customer.id,
        fullName: customer.fullName,
        imageUrl: customer.imageUrl ?? undefined,
        company: customer.company ?? undefined,
      }
    : undefined;

// --- Mappers ---

export const mapProjectSummaryToDTO = (
  project: Type.ProjectSummaryType,
): DTO.ProjectSummaryDTO => ({
  id: project.id,
  title: project.title,
});

export const mapProjectFormDataToDTO = (
  project: Type.ProjectFormDataType,
): DTO.ProjectFormDataDTO => ({
  ...project,
  description: project.description ?? "",
  customerId: project.customerId ?? undefined,
});

export const mapProjectDetailToDTO = (
  project: Type.ProjectDetailType,
): DTO.ProjectDetailDTO => ({
  ...project,
  description: project.description ?? undefined,
  creator: mapCreator(project.creator),
  customer: project.customer ?? undefined,
});

export const mapProjectListItemToDTO = (
  project: Type.ProjectListItemType,
): DTO.ProjectListItemDTO => {
  const totalTasks = project.tasks.length;
  const completedTasks = project.tasks.filter(
    (t: any) => t.status === "completed",
  ).length;

  return {
    id: project.id,
    title: project.title,
    deadline: project.deadline,
    status: project.status,
    category: project.category,
    creator: mapCreator(project.creator),
    customer: mapCustomer(project.customer),
    commentsCount: project._count.comments,
    tasks: {
      total: totalTasks,
      completed: completedTasks,
    },
  };
};
