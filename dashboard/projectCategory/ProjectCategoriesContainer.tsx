import "server-only";

import { ProjectCategoryGrid } from "./ProjectCategoryGrid";
import { ProjectCategoryListItem } from "./ProjectCategoryListItem";
import { ModalManagerProvider } from "../../common/ModalManagerContext";
import { UpdateProjectCategoryModal } from "./UpdateProjectCategoryModal";
import { DeleteProjectCategoryModal } from "./DeleteProjectCategoryModal";
import { UpdateProjectCategoryProvider } from "./UpdateProjectCategoryContext";
import { DeleteProjectCategoryProvider } from "./DeleteProjectCategoryContext";
import { getProjectCategories } from "@/lib/data/projectCategory/projectCategory.dal";

export async function ProjectCategoriesContainer() {
  const projectCategories = await getProjectCategories();

  return (
    <ProjectCategoryGrid>
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
    </ProjectCategoryGrid>
  );
}
