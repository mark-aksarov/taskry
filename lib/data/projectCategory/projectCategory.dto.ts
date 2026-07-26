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
