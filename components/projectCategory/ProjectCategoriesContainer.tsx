import { ProjectCategoryList } from "./ProjectCategoryList";
import { ProjectCategoryListItem } from "./ProjectCategoryListItem";
import { getProjectCategorySummaries } from "@/lib/data/projectCategory/projectCategory.dal";
import { ProjectCategoryItemActionMenuTrigger } from "./ProjectCategoryItemActionMenuTrigger";

export async function ProjectCategoriesContainer() {
  const projectCategories = await getProjectCategorySummaries();

  return (
    <ProjectCategoryList>
      {projectCategories.map((projectCategory) => (
        <ProjectCategoryListItem
          key={projectCategory.id}
          id={projectCategory.id}
          name={projectCategory.name}
          menuTrigger={
            <ProjectCategoryItemActionMenuTrigger
              guestMode={false}
              projectId={projectCategory.id}
              projectCategoryName={projectCategory.name}
            />
          }
        />
      ))}
    </ProjectCategoryList>
  );
}
