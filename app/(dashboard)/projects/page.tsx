import { ProjectsPage } from "./ProjectsPage";
import { getProjects } from "@/lib/queries/project";
import { ProjectsPageEmpty } from "./ProjectsPageEmpty";
import { ProjectsServerContainer } from "@/components/projects/ProjectsServerContainer";
import { NewTaskFormServerContainer } from "@/components/tasks/NewTaskFormServerContainer";
import { NewProjectFormServerContainer } from "@/components/projects/NewProjectFormServerContainer";
import { ProjectFiltersFormServerContainer } from "@/components/projects/ProjectFiltersFormServerContainer";

export default async function AppProjectsPage() {
  const projects = await getProjects();

  if (!projects.length) return <ProjectsPageEmpty />;

  return (
    <ProjectsPage
      ProjectFiltersFormContainer={ProjectFiltersFormServerContainer}
      NewTaskFormContainer={NewTaskFormServerContainer}
      ProjectsServerContainer={ProjectsServerContainer}
      NewProjectFormContainer={NewProjectFormServerContainer}
    />
  );
}
