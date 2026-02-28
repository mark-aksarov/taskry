import "server-only";

import { ProjectCategoryList } from "./ProjectCategoryList";
import { ProjectCategoryListItem } from "./ProjectCategoryListItem";
import { updateProjectCategory } from "@/lib/actions/projectCategory/updateProjectCategory";
import { getProjectCategorySummaries } from "@/lib/data/projectCategory/projectCategory.dal";
import { deleteProjectCategories } from "@/lib/actions/projectCategory/deleteProjectCategories";

export async function ProjectCategoriesContainer() {
  const projectCategories = await getProjectCategorySummaries();

  return (
    <ProjectCategoryList>
      {projectCategories.map((projectCategory) => (
        <ProjectCategoryListItem
          key={projectCategory.id}
          id={projectCategory.id}
          name={projectCategory.name}
          updateProjectCategory={updateProjectCategory}
          deleteProjectCategory={deleteProjectCategories}
        />
      ))}
    </ProjectCategoryList>
  );
}
