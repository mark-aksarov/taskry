import { ProjectCategoryGrid } from "../ProjectCategoryGrid";
import { ProjectCategoryListItem } from "../../ProjectCategoryListItem";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { MockedUpdateProjectCategoryProvider } from "../../UpdateProjectCategoryProvider/__stories__";
import { MockedDeleteProjectCategoryProvider } from "../../DeleteProjectCategoryProvider/__stories__";

export function ProjectCategoryGridExample() {
  return (
    <ProjectCategoryGrid>
      {mockedProjectCategorySummaries.map((projectCategory) => (
        <MockedUpdateProjectCategoryProvider key={projectCategory.id}>
          <MockedDeleteProjectCategoryProvider>
            <ProjectCategoryListItem {...projectCategory} />
          </MockedDeleteProjectCategoryProvider>
        </MockedUpdateProjectCategoryProvider>
      ))}
    </ProjectCategoryGrid>
  );
}
