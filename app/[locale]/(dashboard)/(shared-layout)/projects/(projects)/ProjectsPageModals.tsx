import { CreateProjectModal } from "@/components/projects/CreateProjectModal";
import { ProjectSearchModal } from "@/components/projects/ProjectSearchModal";
import { ProjectFiltersModal } from "@/components/projects/ProjectFiltersModal";
import { CreateProjectFormContainer } from "@/components/projects/CreateProjectFormContainer";
import { ProjectFiltersFormContainer } from "@/components/projects/ProjectFiltersFormContainer";
import { ProjectCustomerFiltersModal } from "@/components/projects/ProjectCustomerFiltersModal";
import { ProjectRouterSearchContainer } from "@/components/projects/ProjectRouterSearchContainer";
import { CreateProjectCategoryModal } from "@/components/projectCategory/CreateProjectCategoryModal";
import { ProjectCreatorFiltersFormContainer } from "@/components/projects/ProjectCreatorFiltersFormContainer";
import { ProjectCustomerFiltersFormContainer } from "@/components/projects/ProjectCustomerFiltersFormContainer";
import { ProjectCategoryFiltersFormContainer } from "@/components/projects/ProjectCategoryFiltersFormContainer";
import { ProjectCreatorFiltersModal } from "@/components/projects/ProjectCreatorFiltersModal/ProjectCreatorFiltersModal";
import { ProjectCategoryFiltersModal } from "@/components/projects/ProjectCategoryFiltersModal/ProjectCategoryFiltersModal";

export function ProjectsPageModals() {
  return (
    <>
      <ProjectSearchModal searchContainer={<ProjectRouterSearchContainer />} />
      <CreateProjectModal
        createProjectFormContainer={<CreateProjectFormContainer />}
      />
      <CreateProjectCategoryModal />
      <ProjectFiltersModal
        filtersFormContainer={<ProjectFiltersFormContainer />}
      />
      <ProjectCustomerFiltersModal
        filtersFormContainer={<ProjectCustomerFiltersFormContainer />}
      />
      <ProjectCategoryFiltersModal
        filtersFormContainer={<ProjectCategoryFiltersFormContainer />}
      />
      <ProjectCreatorFiltersModal
        filtersFormContainer={<ProjectCreatorFiltersFormContainer />}
      />
    </>
  );
}
