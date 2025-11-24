import { ProjectsPage } from "./ProjectsPage";
import { getProjectList } from "@/lib/queries/project";
import { ProjectsPageEmpty } from "./ProjectsPageEmpty";
import { ProjectsServerContainer } from "@/components/projects/ProjectsServerContainer";
import { NewProjectFormServerContainer } from "@/components/projects/NewProjectFormServerContainer";
import { ProjectFiltersFormServerContainer } from "@/components/projects/ProjectFiltersFormServerContainer";

export default async function AppProjectsPage() {
  const projects = await getProjectList();

  if (!projects.length) return <ProjectsPageEmpty />;

  return (
    <ProjectsPage
      ProjectFiltersFormContainer={ProjectFiltersFormServerContainer}
      ProjectsServerContainer={ProjectsServerContainer}
      NewProjectFormContainer={NewProjectFormServerContainer}
    />
  );
}
