import { getAllProjectCategories } from "./projectCategory.dal";
import { ProjectCategorySummaryDTO } from "./projectCategory.dto";

export const getProjectCategorySummaries = async (): Promise<
  ProjectCategorySummaryDTO[]
> => {
  const projectCategories = await getAllProjectCategories();

  return projectCategories.map((p) => {
    return {
      id: p.id,
      name: p.name,
    };
  });
};
