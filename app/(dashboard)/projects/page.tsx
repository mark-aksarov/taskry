import { ProjectsPage } from "./ProjectsPage";
import { getProjects } from "@/lib/queries/project";
import { ProjectsPageEmpty } from "./ProjectsPageEmpty";
import { NewProjectFormContainer } from "@/components/projects/NewProjectForm";
import { ProjectDetailContainerProvider } from "@/components/projects/ProjectDetail";
import { ProjectFiltersFormContainer } from "@/components/projects/ProjectFiltersForm";
import { ProjectViewModeContainer } from "@/components/projects/ProjectViewModeContainer";

export default async function AppProjectsPage() {
  const projects = await getProjects();

  if (!projects) return <ProjectsPageEmpty />;

  return (
    <ProjectDetailContainerProvider>
      <ProjectsPage
        ProjectFiltersFormContainer={ProjectFiltersFormContainer}
        ProjectViewModeContainer={ProjectViewModeContainer}
        NewProjectFormContainer={NewProjectFormContainer}
      />
    </ProjectDetailContainerProvider>
  );
}
