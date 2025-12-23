import { ProjectCategorySummaryDTO } from "./projectCategory.dto";
import { ProjectCategorySummaryType } from "./projectCategory.select";

export const mapProjectCategorySummaryToDTO = (
  category: ProjectCategorySummaryType,
): ProjectCategorySummaryDTO => ({
  id: category.id,
  name: category.name,
});
