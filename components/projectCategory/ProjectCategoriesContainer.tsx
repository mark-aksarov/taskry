import "server-only";

import { ProjectCategoryList } from "./ProjectCategoryList";
import { ProjectCategoryListItem } from "./ProjectCategoryListItem";
import { ProjectCategoryProviders } from "./ProjectCategoryProviders";
import { updateProjectCategory } from "@/lib/actions/projectCategory/updateProjectCategory";
import { getProjectCategorySummaries } from "@/lib/data/projectCategory/projectCategory.dal";

export async function ProjectCategoriesContainer() {
  const projectCategories = await getProjectCategorySummaries();

  return (
    <ProjectCategoryList>
      {projectCategories.map((projectCategory) => (
        <ProjectCategoryProviders>
          <ProjectCategoryListItem
            key={projectCategory.id}
            id={projectCategory.id}
            name={projectCategory.name}
            updateProjectCategory={updateProjectCategory}
          />
        </ProjectCategoryProviders>
      ))}
    </ProjectCategoryList>
  );
}
