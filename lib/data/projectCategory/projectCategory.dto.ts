import { ProjectCategory } from "@/generated/prisma/browser";

export interface ProjectCategoryDTO {
  id: number;
  name: string;
}

export interface CreateProjectCategoryInputDTO {
  name: string;
}

export interface UpdateProjectCategoryInputDTO {
  id: number;
  name: string;
}

export function mapToProjectCategoryDTO(
  projectCategory: Pick<ProjectCategory, "id" | "name">,
): ProjectCategoryDTO {
  return {
    id: projectCategory.id,
    name: projectCategory.name,
  };
}
