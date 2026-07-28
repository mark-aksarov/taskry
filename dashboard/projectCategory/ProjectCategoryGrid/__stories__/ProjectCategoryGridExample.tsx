import { ProjectCategoryGrid } from "../ProjectCategoryGrid";
import { ProjectCategoryListItem } from "../../ProjectCategoryListItem";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { UpdateProjectCategoryProvider } from "../../UpdateProjectCategoryContext";
import { DeleteProjectCategoryProvider } from "../../DeleteProjectCategoryContext";

export function ProjectCategoryGridExample() {
  return (
    <ProjectCategoryGrid>
      {mockedProjectCategorySummaries.map((projectCategory) => (
        <UpdateProjectCategoryProvider key={projectCategory.id}>
          <DeleteProjectCategoryProvider>
            <ProjectCategoryListItem {...projectCategory} />
          </DeleteProjectCategoryProvider>
        </UpdateProjectCategoryProvider>
      ))}
    </ProjectCategoryGrid>
  );
}
