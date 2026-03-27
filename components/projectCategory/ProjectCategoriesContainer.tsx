import "server-only";

import { ProjectCategoryList } from "./ProjectCategoryList";
import { ProjectCategoryListItem } from "./ProjectCategoryListItem";
import { ProjectCategoryProviders } from "./ProjectCategoryProviders";
import { UpdateProjectCategoryModal } from "./UpdateProjectCategoryModal";
import { DeleteProjectCategoryModal } from "./DeleteProjectCategoryModal";
import { getProjectCategorySummaries } from "@/lib/data/projectCategory/projectCategory.dal";

export async function ProjectCategoriesContainer() {
  const projectCategories = await getProjectCategorySummaries();

  return (
    <ProjectCategoryList>
      {projectCategories.map((projectCategory) => (
        <ProjectCategoryProviders key={projectCategory.id}>
          <ProjectCategoryListItem
            id={projectCategory.id}
            name={projectCategory.name}
          />

          <UpdateProjectCategoryModal
            projectCategoryId={projectCategory.id}
            projectCategoryName={projectCategory.name}
          />

          <DeleteProjectCategoryModal
            projectCategoryId={projectCategory.id}
            projectCategoryName={projectCategory.name}
          />
        </ProjectCategoryProviders>
      ))}
    </ProjectCategoryList>
  );
}
