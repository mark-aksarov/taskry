import "server-only";

import { ProjectCategoryList } from "./ProjectCategoryList";
import { ProjectCategoryListItem } from "./ProjectCategoryListItem";
import { ModalManagerProvider } from "../common/ModalManagerContext";
import { UpdateProjectCategoryModal } from "./UpdateProjectCategoryModal";
import { DeleteProjectCategoryModal } from "./DeleteProjectCategoryModal";
import { UpdateProjectCategoryProvider } from "./UpdateProjectCategoryProvider";
import { DeleteProjectCategoryProvider } from "./DeleteProjectCategoryProvider";
import { getProjectCategorySummaries } from "@/lib/data/projectCategory/projectCategory.dal";

export async function ProjectCategoriesContainer() {
  const projectCategories = await getProjectCategorySummaries();

  return (
    <ProjectCategoryList>
      {projectCategories.map((projectCategory) => (
        <ModalManagerProvider key={projectCategory.id}>
          <UpdateProjectCategoryProvider>
            <DeleteProjectCategoryProvider>
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
            </DeleteProjectCategoryProvider>
          </UpdateProjectCategoryProvider>
        </ModalManagerProvider>
      ))}
    </ProjectCategoryList>
  );
}
