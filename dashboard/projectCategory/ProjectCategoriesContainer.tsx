import "server-only";

import { GuestModeModal } from "../common/GuestModeModal";
import { ProjectCategoryGrid } from "./ProjectCategoryGrid";
import { ProjectCategoryListItem } from "./ProjectCategoryListItem";
import { ModalManagerProvider } from "../../common/ModalManagerContext";
import { UpdateProjectCategoryModal } from "./UpdateProjectCategoryModal";
import { DeleteProjectCategoryModal } from "./DeleteProjectCategoryModal";
import { UpdateProjectCategoryProvider } from "./UpdateProjectCategoryProvider";
import { DeleteProjectCategoryProvider } from "./DeleteProjectCategoryProvider";
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

              <GuestModeModal />
            </DeleteProjectCategoryProvider>
          </UpdateProjectCategoryProvider>
        </ModalManagerProvider>
      ))}
    </ProjectCategoryGrid>
  );
}
